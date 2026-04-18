from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
from anthropic import Anthropic
import os
import base64
import json
import tempfile


load_dotenv()

app = Flask(__name__)
CORS(app)

client = Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))


def encode_file_to_base64(file_path):
    with open(file_path, "rb") as f:
        return base64.b64encode(f.read()).decode("utf-8")


def get_media_type(filename):
    filename = filename.lower()
    if filename.endswith(".png"):
        return "image/png"
    if filename.endswith(".jpg") or filename.endswith(".jpeg"):
        return "image/jpeg"
    if filename.endswith(".webp"):
        return "image/webp"
    if filename.endswith(".gif"):
        return "image/gif"
    return "image/png"


@app.route("/health", methods=["GET"])
def health():
    return jsonify({
        "status": "ok",
        "message": "Backend is running"
    })


@app.route("/analyze-body", methods=["POST"])
def analyze_body():
    front_image = request.files.get("front_image")
    side_image = request.files.get("side_image")
    skin_tone = request.form.get("skin_tone")
    vibe = request.form.get("vibe")
    fit_preference = request.form.get("fit_preference")

    if not front_image:
        return jsonify({"error": "front_image is required"}), 400

    if not side_image:
        return jsonify({"error": "side_image is required"}), 400

    if not os.getenv("ANTHROPIC_API_KEY"):
        return jsonify({"error": "ANTHROPIC_API_KEY is missing"}), 500

    front_path = None
    side_path = None

    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix=os.path.splitext(front_image.filename)[1]) as f1:
            front_image.save(f1.name)
            front_path = f1.name

        with tempfile.NamedTemporaryFile(delete=False, suffix=os.path.splitext(side_image.filename)[1]) as f2:
            side_image.save(f2.name)
            side_path = f2.name

        front_base64 = encode_file_to_base64(front_path)
        side_base64 = encode_file_to_base64(side_path)

        front_media_type = get_media_type(front_image.filename)
        side_media_type = get_media_type(side_image.filename)

        prompt = f"""
You are a fashion styling assistant.

Analyze these two user-uploaded body photos conservatively and return JSON only.

User context:
- skin_tone: {skin_tone}
- vibe: {vibe}
- fit_preference: {fit_preference}

Instructions:
- Infer a likely broad body shape from visible proportions.
- Focus on silhouette and styling guidance only.
- Do not make medical, health, or sensitive claims.
- Be cautious and not overconfident.
- Return valid JSON only with this exact schema:

{{
  "body_shape": "string",
  "confidence": 0,
  "proportion_notes": ["string"],
  "recommended_silhouettes": ["string"],
  "avoid_notes": ["string"]
}}
"""

        message = client.messages.create(
            max_tokens=800,
            model="claude-sonnet-4-6",
            messages=[
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "image",
                            "source": {
                                "type": "base64",
                                "media_type": front_media_type,
                                "data": front_base64
                            }
                        },
                        {
                            "type": "image",
                            "source": {
                                "type": "base64",
                                "media_type": side_media_type,
                                "data": side_base64
                            }
                        },
                        {
                            "type": "text",
                            "text": prompt
                        }
                    ]
                }
            ]
        )

        text_blocks = [
            block.text for block in message.content
            if getattr(block, "type", None) == "text"
        ]
        raw_text = "\n".join(text_blocks).strip()

        if raw_text.startswith("```json"):
            raw_text = raw_text.removeprefix("```json").removesuffix("```").strip()
        elif raw_text.startswith("```"):
            raw_text = raw_text.removeprefix("```").removesuffix("```").strip()

        result = json.loads(raw_text)
        return jsonify(result)

    except json.JSONDecodeError:
        return jsonify({
            "error": "Claude returned invalid JSON"
        }), 500

    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500

    finally:
        try:
            if front_path and os.path.exists(front_path):
                os.remove(front_path)
            if side_path and os.path.exists(side_path):
                os.remove(side_path)
        except Exception:
            pass


@app.route("/analyze-product", methods=["POST"])
def analyze_product():
    data = request.get_json()

    if not data:
        return jsonify({"error": "JSON body is required"}), 400

    product_url = data.get("product_url")
    body_profile = data.get("body_profile", {})
    style_preferences = data.get("style_preferences", {})

    if not product_url:
        return jsonify({"error": "product_url is required"}), 400

    if not os.getenv("ANTHROPIC_API_KEY"):
        return jsonify({"error": "ANTHROPIC_API_KEY is missing"}), 500

    prompt = f"""
You are a fashion styling assistant.

A user wants a quick style verdict for a fashion product URL.

You do NOT have full product page scraping here, so infer cautiously from:
1. the product URL text
2. the user's body profile
3. the user's style preferences

Product URL:
{product_url}

Body profile JSON:
{json.dumps(body_profile, indent=2)}

Style preferences JSON:
{json.dumps(style_preferences, indent=2)}

Instructions:
- Use the URL text as a weak signal only.
- Be cautious and not overconfident.
- Focus only on fashion fit, silhouette, color direction, and vibe alignment.
- Do not make medical, health, or sensitive claims.
- Return valid JSON only with this exact schema:

{{
  "product_url": "string",
  "verdict": "Buy | Maybe | Skip",
  "confidence": 0,
  "fit_score": 0,
  "color_score": 0,
  "vibe_score": 0,
  "summary": "string",
  "body_shape_note": "string",
  "color_note": "string",
  "vibe_note": "string",
  "accessories": ["string"],
  "styling_tip": "string",
  "warning": "string"
}}
"""

    try:
        message = client.messages.create(
            max_tokens=900,
            model="claude-sonnet-4-6",
            messages=[
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "text",
                            "text": prompt
                        }
                    ]
                }
            ]
        )

        text_blocks = [
            block.text for block in message.content
            if getattr(block, "type", None) == "text"
        ]
        raw_text = "\n".join(text_blocks).strip()

        if raw_text.startswith("```json"):
            raw_text = raw_text.removeprefix("```json").removesuffix("```").strip()
        elif raw_text.startswith("```"):
            raw_text = raw_text.removeprefix("```").removesuffix("```").strip()

        result = json.loads(raw_text)
        return jsonify(result)

    except json.JSONDecodeError:
        return jsonify({
            "error": "Claude returned invalid JSON for product analysis"
        }), 500

    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500


if __name__ == "__main__":
    app.run(debug=True)