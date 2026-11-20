import { useState } from "react";
import JobInfo from "./components/JobInfo";
import ApplicationForm from "./components/ApplicationForm";
import ReactHookFormApplicationForm from "./components/ReactHookFormApplicationForm";
import ApplicationReview from "./components/ApplicationReview";
import SuccessMessage from "./components/SuccessMessage";
import Applications from "./pages/Applications";
import useApplications from "./hooks/useApplications";

const JOB_TITLE = "Frontend React Developer";
const COMPANY = "CodeWave Technologies";

function createApplicationId() {
  return "APP-" + Date.now().toString(36).toUpperCase();
}

export default function App() {
  const [page, setPage] = useState("home");
  const [formVersion, setFormVersion] = useState("controlled");
  const [reviewData, setReviewData] = useState(null);
  const [resetForm, setResetForm] = useState(null);
  const [submittedApplication, setSubmittedApplication] = useState(null);

  const {
    applications,
    saveApplication,
    deleteApplication,
  } = useApplications();

  function handleReview(data, resetFunction) {
    setReviewData(data);
    setResetForm(() => resetFunction);
    setPage("review");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleEdit() {
    setPage("home");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleConfirm() {
    const application = {
      id: createApplicationId(),
      jobTitle: JOB_TITLE,
      company: COMPANY,
      fullName: reviewData.fullName.trim(),
      email: reviewData.email.trim(),
      phone: reviewData.phone.trim(),
      education: reviewData.education.trim(),
      skills: reviewData.skills.trim(),
      coverLetter: reviewData.coverLetter.trim(),
      resumeName: reviewData.resumeFile.name,
      submittedAt: new Date().toISOString(),
    };

    saveApplication(application);
    setSubmittedApplication(application);

    if (resetForm) {
      resetForm();
    }

    setReviewData(null);
    setPage("success");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleNewApplication() {
    setSubmittedApplication(null);
    setReviewData(null);
    setPage("home");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="app">
      <header className="navbar">
        <div className="nav-inner">
          <button
            className="brand"
            onClick={() => setPage("home")}
          >
            <span className="brand-icon">C</span>
            CareerHub
          </button>

          <nav>
            <button
              className={page === "home" ? "nav-active" : ""}
              onClick={() => setPage("home")}
            >
              Jobs
            </button>

            <button
              className={page === "applications" ? "nav-active" : ""}
              onClick={() => setPage("applications")}
            >
              My Applications
              <span className="nav-count">{applications.length}</span>
            </button>
          </nav>
        </div>
      </header>

      <main className="container">
        {page === "home" && (
          <>
            <div className="page-heading">
              <p className="eyebrow">CAREER OPPORTUNITY</p>
              <h1>Find your next opportunity</h1>
              <p>Explore jobs and apply with CareerHub.</p>
            </div>

            <JobInfo />

            <div className="version-selector">
              <div>
                <h3>Application Form</h3>
                <p>Choose your form handling method.</p>
              </div>

              <div className="version-buttons">
                <button
                  className={
                    formVersion === "controlled"
                      ? "version-active"
                      : ""
                  }
                  onClick={() => setFormVersion("controlled")}
                >
                  useState
                </button>

                <button
                  className={
                    formVersion === "hookform"
                      ? "version-active"
                      : ""
                  }
                  onClick={() => setFormVersion("hookform")}
                >
                  React Hook Form
                </button>
              </div>
            </div>

            {formVersion === "controlled" ? (
              <ApplicationForm onReview={handleReview} />
            ) : (
              <ReactHookFormApplicationForm
                onReview={handleReview}
              />
            )}
          </>
        )}

        {page === "review" && reviewData && (
          <ApplicationReview
            data={reviewData}
            onEdit={handleEdit}
            onConfirm={handleConfirm}
          />
        )}

        {page === "success" && submittedApplication && (
          <SuccessMessage
            application={submittedApplication}
            onNewApplication={handleNewApplication}
          />
        )}

        {page === "applications" && (
          <Applications
            applications={applications}
            onDelete={deleteApplication}
          />
        )}
      </main>

      <footer className="footer">
        <p>© 2026 CareerHub. Job Application Portal Project.</p>
        <p>Built with React + Vite</p>
      </footer>
    </div>
  );
}