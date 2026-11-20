export default function SuccessMessage({ application, onNewApplication }) {
  return (
    <section className="success-card">
      <div className="success-icon">✓</div>

      <h1>Application Submitted!</h1>

      <p>
        Thank you, {application.fullName}. Your application has
        been submitted successfully.
      </p>

      <div className="reference-box">
        <span>Application Reference</span>
        <strong>{application.id}</strong>
      </div>

      <div className="success-details">
        <p>
          <strong>Position:</strong> {application.jobTitle}
        </p>

        <p>
          <strong>Company:</strong> {application.company}
        </p>

        <p>
          <strong>Submitted:</strong>{" "}
          {new Date(application.submittedAt).toLocaleString()}
        </p>
      </div>

      <button className="primary-button" onClick={onNewApplication}>
        Apply Again
      </button>
    </section>
  );
}