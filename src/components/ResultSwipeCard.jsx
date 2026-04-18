export default function ResultSwipeCard({
  onRestart,
  onTryAnother,
  result,
}) {
  return (
    <div className="swipe-result-shell">
      <div className="swipe-card verdict-text-only-card">
        <div className="swipe-card-content full-width">
          <p className="result-step-label">CURATE VERDICT</p>
          <div className="verdict-badge yes">{result?.verdict || "Result"}</div>

          <h1 className="swipe-title">
            {result?.summary || "Analysis complete"}
          </h1>

          <p className="swipe-subtitle">
            Confidence: {result?.confidence ?? "—"}% · Fit:{" "}
            {result?.fit_score ?? "—"}% · Color:{" "}
            {result?.color_score ?? "—"}% · Vibe:{" "}
            {result?.vibe_score ?? "—"}%
          </p>

          <div className="decision-sections">
            <div className="decision-block">
              <h3>Body shape note</h3>
              <p>{result?.body_shape_note || "—"}</p>
            </div>

            <div className="decision-block">
              <h3>Color note</h3>
              <p>{result?.color_note || "—"}</p>
            </div>

            <div className="decision-block">
              <h3>Vibe note</h3>
              <p>{result?.vibe_note || "—"}</p>
            </div>

            <div className="decision-block">
              <h3>Styling tip</h3>
              <p>{result?.styling_tip || "—"}</p>
            </div>

            <div className="decision-block">
              <h3>Warning</h3>
              <p>{result?.warning || "—"}</p>
            </div>

            <div className="decision-block">
              <h3>Accessories</h3>
              <ul>
                {(result?.accessories || []).map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="decision-actions">
            <button
              type="button"
              className="secondary-btn"
              onClick={onTryAnother}
            >
              TRY ANOTHER PRODUCT
            </button>

            <button
              type="button"
              className="primary-btn"
              onClick={onRestart}
            >
              BACK TO HOME
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}