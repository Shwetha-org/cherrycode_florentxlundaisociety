export default function ResultCard({ onRestart, onTryAnother }) {
  return (
    <div className="result-card">
      <div className="result-media">
        <div className="result-image-placeholder">
          <span>PRODUCT PREVIEW</span>
        </div>
      </div>

      <div className="result-content">
        <p className="result-step-label">VERDICT</p>

        <div className="verdict-badge yes">YES</div>

        <h1 className="result-title">This works for your profile</h1>

        <p className="result-subtitle">
          The silhouette aligns well with your selected vibe, and the tone feels
          compatible with your profile choices.
        </p>

        <div className="result-tags">
          <span className="result-tag">Warm undertone</span>
          <span className="result-tag">Soft feminine</span>
          <span className="result-tag">Relaxed fit</span>
        </div>

        <div className="result-section">
          <h3>Why it works</h3>
          <ul>
            <li>The shape complements your preferred fit direction.</li>
            <li>The color family feels harmonious with your undertone.</li>
            <li>The overall styling matches your selected vibe.</li>
          </ul>
        </div>

        <div className="result-section">
          <h3>Styling tip</h3>
          <p>
            Pair it with cleaner accessories and a more structured bottom piece
            to keep the outfit polished and balanced.
          </p>
        </div>

        <div className="result-actions">
          <button type="button" className="secondary-btn" onClick={onTryAnother}>
            TRY ANOTHER PRODUCT
          </button>
          <button type="button" className="primary-btn" onClick={onRestart}>
            START OVER
          </button>
        </div>
      </div>
    </div>
  );
}