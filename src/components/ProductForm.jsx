export default function ProductForm({ url, setUrl, onSubmit, loading }) {
  function handleSubmit(e) {
    e.preventDefault();
    onSubmit();
  }

  return (
    <div className="step-panel">
      <div className="panel-header">
        <p className="section-label">STEP 3</p>
        <h2>Analyze a piece before you buy</h2>
        <p>
          Paste a product page and let Curate evaluate fit, tone, and overall
          style compatibility.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="form-grid">
        <div className="field-group">
          <label>Product URL</label>
          <input
            type="url"
            placeholder="Paste a Zara, H&M, ASOS, or similar product page"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>

        <div className="chip-row">
          {[
            "Black blazer",
            "Satin slip dress",
            "Oversized cardigan",
            "Straight-leg jeans",
          ].map((label) => (
            <button
              key={label}
              type="button"
              className="chip"
              onClick={() =>
                setUrl(
                  `https://demo.example.com/${label
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`
                )
              }
            >
              {label}
            </button>
          ))}
        </div>

        <div className="button-row">
          <button
            type="submit"
            className="primary-btn"
            disabled={loading || !url}
          >
            {loading ? "ANALYZING..." : "GET MY VERDICT"}
          </button>
        </div>
      </form>
    </div>
  );
}