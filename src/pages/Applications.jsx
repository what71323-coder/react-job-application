import { useState } from "react";

export default function Applications({
  applications,
  onDelete,
}) {
  const [search, setSearch] = useState("");

  const filteredApplications = applications.filter((application) => {
    const query = search.toLowerCase();

    return (
      application.jobTitle.toLowerCase().includes(query) ||
      application.company.toLowerCase().includes(query) ||
      application.fullName.toLowerCase().includes(query)
    );
  });

  function exportApplications() {
    const data = JSON.stringify(applications, null, 2);

    const blob = new Blob([data], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "my-applications.json";
    link.click();

    URL.revokeObjectURL(url);
  }

  return (
    <section className="applications-page">
      <div className="applications-header">
        <div>
          <h1>My Applications</h1>
          <p>View and manage your submitted job applications.</p>
        </div>

        <button
          className="secondary-button"
          onClick={exportApplications}
          disabled={applications.length === 0}
        >
          ↓ Export JSON
        </button>
      </div>

      <div className="applications-toolbar">
        <input
          type="search"
          placeholder="Search by job, company or applicant..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <span>{filteredApplications.length} application(s)</span>
      </div>

      {applications.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📂</div>
          <h2>No applications yet</h2>
          <p>Your submitted applications will appear here.</p>
        </div>
      ) : filteredApplications.length === 0 ? (
        <div className="empty-state">
      <h2>No matching applications</h2>
      <p>Try a different search term.</p>
        </div>
      ) : (
        <div className="application-list">
          {filteredApplications.map((application) => (
            <article className="application-item" key={application.id}>
              <div className="application-item-main">
                <div className="company-logo small-logo">C</div>

                <div>
                  <h3>{application.jobTitle}</h3>
                  <p>{application.company}</p>
                  <small>
                    {new Date(application.submittedAt).toLocaleDateString()}
                  </small>
                </div>
              </div>

              <div className="application-item-right">
                <span className="status-badge">Submitted</span>

                <small className="application-id">{application.id}</small>

                <button
                  className="delete-button"
                  onClick={() => onDelete(application.id)}
                >
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}