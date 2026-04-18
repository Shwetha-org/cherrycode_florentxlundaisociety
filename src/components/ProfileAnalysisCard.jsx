export default function ProfileAnalysisCard({
  analysisResult,
  onContinue,
  onBack,
}) {
  return (
    <div className="analysis-card">
      <div className="analysis-head">
        <p className="profile-step-label">STEP 02</p>
        <h1>Your profile analysis</h1>
        <p className="profile-subtitle">
          This result is generated from your uploaded photos and your selected
          style preferences.
        </p>
      </div>

      <div className="analysis-grid">
        <div className="analysis-block">
          <h3>Body shape</h3>
          <p>{analysisResult?.body_shape || "—"}</p>
        </div>

        <div className="analysis-block">
          <h3>Confidence</h3>
          <p>{analysisResult?.confidence ?? "—"}%</p>
        </div>

        <div className="analysis-block">
          <h3>Proportion notes</h3>
          <ul>
            {(analysisResult?.proportion_notes || []).map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="analysis-block">
          <h3>Recommended silhouettes</h3>
          <ul>
            {(analysisResult?.recommended_silhouettes || []).map(
              (item, index) => (
                <li key={index}>{item}</li>
              )
            )}
          </ul>
        </div>

        <div className="analysis-block">
          <h3>Avoid notes</h3>
          <ul>
            {(analysisResult?.avoid_notes || []).map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="analysis-actions">
        <button type="button" className="secondary-btn" onClick={onBack}>
          BACK TO PHOTOS
        </button>

        <button type="button" className="primary-btn" onClick={onContinue}>
          CONTINUE TO PRODUCT
        </button>
      </div>
    </div>
  );
}