export default function JobInfo() {
  return (
    <section className="job-card">
      <div className="job-top">
        <div className="company-logo">C</div>

        <div>
          <p className="company-name">CodeWave Technologies</p>
          <h1>Frontend React Developer</h1>
        </div>
      </div>

      <div className="job-tags">
        <span>Full Time</span>
        <span>Remote</span>
        <span>Entry Level</span>
      </div>

      <div className="job-meta">
        <div>
          <small>Salary</small>
          <strong>₹3.5L – ₹6L per year</strong>
        </div>

        <div>
          <small>Location</small>
          <strong>Remote, India</strong>
        </div>

        <div>
          <small>Experience</small>
          <strong>0–1 Years</strong>
        </div>
      </div>

      <h3>Job Description</h3>

      <p>
        We are looking for a passionate React Developer to join our
        frontend team. You will help build responsive and user-friendly
        web applications.
      </p>

      <h3>Responsibilities</h3>

      <ul>
        <li>Build responsive web applications using React.</li>
        <li>Work with reusable components and React Hooks.</li>
        <li>Integrate APIs and manage application state.</li>
        <li>Collaborate with designers and other developers.</li>
      </ul>

      <h3>Requirements</h3>

      <ul>
        <li>Knowledge of HTML, CSS and JavaScript.</li>
        <li>Basic React knowledge.</li>
        <li>Understanding of responsive design.</li>
        <li>Problem-solving and communication skills.</li>
      </ul>
    </section>
  );
}