const skinToneOptions = ["Warm", "Cool", "Neutral", "Not sure"];
const vibeOptions = [
  "Minimalist",
  "Clean Girl",
  "Old Money",
  "Streetwear",
  "Soft Feminine",
  "Edgy",
  "Classic",
  "Trendy",
];
const fitOptions = ["Fitted", "Relaxed", "Oversized", "No preference"];

export default function ProfileForm({
  profileData,
  setProfileData,
  onSubmit,
  loading,
}) {
  function handleFileChange(e) {
    const { name, files } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: files[0] || null,
    }));
  }

  function setField(name, value) {
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <div className="profile-card">
      <div className="profile-head">
        <p className="profile-step-label">STEP 01</p>
        <h1>Create your style profile</h1>
        <p className="profile-subtitle">
          Photos stay on your device. We use them only to read your silhouette.
        </p>
      </div>

      <form onSubmit={onSubmit} className="profile-form">
        <div className="upload-grid refined-upload-grid">
          <div className="upload-block">
            <div className="upload-meta">
              <span className="upload-label">FRONT PHOTO</span>
              <span className="upload-hint">FULL BODY, ARMS RELAXED</span>
            </div>

            <label className="upload-dropzone">
              <input
                type="file"
                name="frontImage"
                accept="image/*"
                onChange={handleFileChange}
                hidden
              />
              <div className="upload-icon-wrap">⬆</div>
              <p className="dropzone-title">
                {profileData.frontImage
                  ? profileData.frontImage.name
                  : "Drop or click to upload"}
              </p>
              <p className="dropzone-subtitle">JPG or PNG, up to 10MB</p>
            </label>
          </div>

          <div className="upload-block">
            <div className="upload-meta">
              <span className="upload-label">SIDE PHOTO</span>
              <span className="upload-hint">PROFILE, NEUTRAL POSE</span>
            </div>

            <label className="upload-dropzone">
              <input
                type="file"
                name="sideImage"
                accept="image/*"
                onChange={handleFileChange}
                hidden
              />
              <div className="upload-icon-wrap">⬆</div>
              <p className="dropzone-title">
                {profileData.sideImage
                  ? profileData.sideImage.name
                  : "Drop or click to upload"}
              </p>
              <p className="dropzone-subtitle">JPG or PNG, up to 10MB</p>
            </label>
          </div>
        </div>

        <div className="option-section">
          <p className="option-title">SKIN TONE / UNDERTONE</p>
          <div className="pill-row">
            {skinToneOptions.map((option) => (
              <button
                key={option}
                type="button"
                className={`pill-option ${
                  profileData.skinTone === option ? "selected" : ""
                }`}
                onClick={() => setField("skinTone", option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="option-section">
          <p className="option-title">VIBE</p>
          <div className="pill-row">
            {vibeOptions.map((option) => (
              <button
                key={option}
                type="button"
                className={`pill-option ${
                  profileData.vibe === option ? "selected" : ""
                }`}
                onClick={() => setField("vibe", option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="option-section">
          <p className="option-title">FIT PREFERENCE</p>
          <div className="pill-row">
            {fitOptions.map((option) => (
              <button
                key={option}
                type="button"
                className={`pill-option ${
                  profileData.fitPreference === option ? "selected" : ""
                }`}
                onClick={() => setField("fitPreference", option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="profile-cta-row">
          <button type="submit" className="primary-btn large-center" disabled={loading}>
            {loading ? "CREATING..." : "CREATE MY PROFILE"}
          </button>
        </div>
      </form>
    </div>
  );
}