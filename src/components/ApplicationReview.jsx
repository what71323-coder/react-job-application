export default function ApplicationReview({ data, onEdit, onConfirm }) {
  return (
    <section className="review-card">
      <div className="section-heading">
        <h2>Review Your Application</h2>
        <p>Please verify your information before submitting.</p>
      </div>

      <div className="review-section">
        <h3>Personal Information</h3>

        <div className="review-row">
          <span>Full Name</span>
          <strong>{data.fullName}</strong>
        </div>

        <div className="review-row">
          <span>Email</span>
          <strong>{data.email}</strong>
        </div>

        <div className="review-row">
          <span>Phone</span>
          <strong>{data.phone}</strong>
        </div>

        <div className="review-row">
          <span>Education</span>
          <strong>{data.education}</strong>
        </div>

        <div className="review-row">
          <span>Skills</span>
          <strong>{data.skills}</strong>
        </div>
      </div>

      <div className="review-section">
        <h3>Cover Letter</h3>
        <p className="review-cover-letter">{data.coverLetter}</p>
      </div>

      <div className="review-section">
        <h3>Resume</h3>
        <p className="review-file">📄 {data.resumeFile?.name}</p>
      </div>

      <div className="review-actions">
        <button type="button" className="secondary-button" onClick={onEdit}>
          ← Edit Application
        </button>

        <button type="button" className="primary-button" onClick={onConfirm}>
          Confirm & Submit
        </button>
      </div>
    </section>
  );
}