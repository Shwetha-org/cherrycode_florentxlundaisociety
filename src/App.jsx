import { useState } from "react";
import ProfileForm from "./components/ProfileForm";
import ProfileAnalysisCard from "./components/ProfileAnalysisCard";
import ProductForm from "./components/ProductForm";
import ResultSwipeCard from "./components/ResultSwipeCard";

const API_URL = import.meta.env.VITE_API_URL;

export default function App() {
  const [step, setStep] = useState(1);

  const [profileData, setProfileData] = useState({
    frontImage: null,
    sideImage: null,
    skinTone: "",
    vibe: "",
    fitPreference: "",
  });

  const [analysisResult, setAnalysisResult] = useState(null);
  const [productUrl, setProductUrl] = useState("");
  const [productResult, setProductResult] = useState(null);

  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadingProduct, setLoadingProduct] = useState(false);

  async function handleProfileSubmit(e) {
    e.preventDefault();
    setLoadingProfile(true);

    try {
      const formData = new FormData();
      formData.append("front_image", profileData.frontImage);
      formData.append("side_image", profileData.sideImage);
      formData.append("skin_tone", profileData.skinTone);
      formData.append("vibe", profileData.vibe);
      formData.append("fit_preference", profileData.fitPreference);

      const response = await fetch(`${API_URL}/analyze-body`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Profile analysis failed");
      }

      setAnalysisResult(data);
      setStep(3);
    } catch (error) {
      console.error("Profile analysis error:", error);
      alert(error.message || "Could not analyze profile");
    } finally {
      setLoadingProfile(false);
    }
  }

  async function handleProductSubmit() {
    setLoadingProduct(true);

    try {
      const response = await fetch(`${API_URL}/analyze-product`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product_url: productUrl,
          body_profile: analysisResult,
          style_preferences: {
            skin_tone: profileData.skinTone,
            vibe: profileData.vibe,
            fit_preference: profileData.fitPreference,
          },
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Product analysis failed");
      }

      setProductResult(data);
      setStep(5);
    } catch (error) {
      console.error("Product analysis error:", error);
      alert(error.message || "Could not analyze product");
    } finally {
      setLoadingProduct(false);
    }
  }

  function goToLanding() {
    setStep(1);
    setProductUrl("");
    setAnalysisResult(null);
    setProductResult(null);
    setProfileData({
      frontImage: null,
      sideImage: null,
      skinTone: "",
      vibe: "",
      fitPreference: "",
    });
  }

  function goToProductStep() {
    setStep(4);
  }

  return (
    <div className="page">
      {step === 1 && (
        <>
          <section className="hero">
            <p className="eyebrow">CURATE · PERSONAL STYLE INTELLIGENCE</p>

            <h1 className="hero-title">
              Paste a fashion link.
              <br />
              <span>Know if it’s yours.</span>
            </h1>

            <p className="hero-subtitle">
              Reduce shopping decision fatigue with style analysis built around
              your body shape, proportions, and style direction.
            </p>

            <button className="cta-button" onClick={() => setStep(2)}>
              START MY STYLE PROFILE
            </button>
          </section>

          <section className="steps-preview">
            <div className="steps-preview-inner">
              <div className="preview-card">
                <div className="preview-top">
                  <span className="preview-number">01</span>
                </div>
                <h3>Upload your photos</h3>
                <p>Front and side body shots.</p>
              </div>

              <div className="preview-card">
                <div className="preview-top">
                  <span className="preview-number">02</span>
                </div>
                <h3>See your profile</h3>
                <p>Shape, silhouette notes, and guidance.</p>
              </div>

              <div className="preview-card">
                <div className="preview-top">
                  <span className="preview-number">03</span>
                </div>
                <h3>Analyze any product</h3>
                <p>Paste a link, get a verdict.</p>
              </div>
            </div>
          </section>

          <footer className="landing-footer">
            <p>CURATE · STYLE INTELLIGENCE DEMO</p>
          </footer>
        </>
      )}

      {step === 2 && (
        <section className="wizard-page">
          <header className="wizard-header">
            <h2 className="brand">Curate</h2>
            <p className="wizard-header-right">STYLE INTELLIGENCE</p>
          </header>

          <div className="wizard-body">
            <div className="wizard-steps">
              <div className="wizard-step active">
                <span>1</span>
                <p>PHOTOS</p>
              </div>
              <div className="wizard-line"></div>
              <div className="wizard-step">
                <span>2</span>
                <p>PROFILE</p>
              </div>
              <div className="wizard-line"></div>
              <div className="wizard-step">
                <span>3</span>
                <p>PRODUCT</p>
              </div>
              <div className="wizard-line"></div>
              <div className="wizard-step">
                <span>4</span>
                <p>VERDICT</p>
              </div>
            </div>

            <ProfileForm
              profileData={profileData}
              setProfileData={setProfileData}
              onSubmit={handleProfileSubmit}
              loading={loadingProfile}
            />
          </div>
        </section>
      )}

      {step === 3 && (
        <section className="wizard-page">
          <header className="wizard-header">
            <h2 className="brand">Curate</h2>
            <p className="wizard-header-right">STYLE INTELLIGENCE</p>
          </header>

          <div className="wizard-body">
            <div className="wizard-steps">
              <div className="wizard-step done">
                <span>1</span>
                <p>PHOTOS</p>
              </div>
              <div className="wizard-line"></div>
              <div className="wizard-step active">
                <span>2</span>
                <p>PROFILE</p>
              </div>
              <div className="wizard-line"></div>
              <div className="wizard-step">
                <span>3</span>
                <p>PRODUCT</p>
              </div>
              <div className="wizard-line"></div>
              <div className="wizard-step">
                <span>4</span>
                <p>VERDICT</p>
              </div>
            </div>

            <ProfileAnalysisCard
              analysisResult={analysisResult}
              onContinue={() => setStep(4)}
              onBack={() => setStep(2)}
            />
          </div>
        </section>
      )}

      {step === 4 && (
        <section className="wizard-page">
          <header className="wizard-header">
            <h2 className="brand">Curate</h2>
            <p className="wizard-header-right">STYLE INTELLIGENCE</p>
          </header>

          <div className="wizard-body">
            <div className="wizard-steps">
              <div className="wizard-step done">
                <span>1</span>
                <p>PHOTOS</p>
              </div>
              <div className="wizard-line"></div>
              <div className="wizard-step done">
                <span>2</span>
                <p>PROFILE</p>
              </div>
              <div className="wizard-line"></div>
              <div className="wizard-step active">
                <span>3</span>
                <p>PRODUCT</p>
              </div>
              <div className="wizard-line"></div>
              <div className="wizard-step">
                <span>4</span>
                <p>VERDICT</p>
              </div>
            </div>

            <div className="step-shell product-step-shell">
              <ProductForm
                url={productUrl}
                setUrl={setProductUrl}
                onSubmit={handleProductSubmit}
                loading={loadingProduct}
              />
            </div>
          </div>
        </section>
      )}

      {step === 5 && (
        <section className="wizard-page">
          <header className="wizard-header">
            <h2 className="brand">Curate</h2>
            <p className="wizard-header-right">STYLE INTELLIGENCE</p>
          </header>

          <div className="wizard-body">
            <div className="wizard-steps">
              <div className="wizard-step done">
                <span>1</span>
                <p>PHOTOS</p>
              </div>
              <div className="wizard-line"></div>
              <div className="wizard-step done">
                <span>2</span>
                <p>PROFILE</p>
              </div>
              <div className="wizard-line"></div>
              <div className="wizard-step done">
                <span>3</span>
                <p>PRODUCT</p>
              </div>
              <div className="wizard-line"></div>
              <div className="wizard-step active">
                <span>4</span>
                <p>VERDICT</p>
              </div>
            </div>

            <ResultSwipeCard
              onRestart={goToLanding}
              onTryAnother={goToProductStep}
              result={productResult}
            />
          </div>
        </section>
      )}
    </div>
  );
}