import { useState } from "react";
import FormField from "./FormField";
import {
  validateApplication,
  hasErrors,
} from "../utils/validation";

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  education: "",
  skills: "",
  coverLetter: "",
  resumeFile: null,
  confirmed: false,
};

export default function ApplicationForm({ onReview }) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  function handleChange(event) {
    const { name, value, type, checked, files } = event.target;

    const newValue =
      type === "checkbox"
        ? checked
        : type === "file"
        ? files?.[0] || null
        : value;

    setForm((previous) => ({
      ...previous,
      [name]: newValue,
    }));

    if (errors[name]) {
      setErrors((previous) => ({
        ...previous,
        [name]: "",
      }));
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = validateApplication(form);
    setErrors(validationErrors);

    if (hasErrors(validationErrors)) {
      return;
    }

    onReview(form, resetForm);
  }

  function resetForm() {
  setForm(initialForm);
  setErrors({});

  const fileInput = document.getElementById("resumeFile");

  if (fileInput) {
    fileInput.value = "";
  }
}
  return (
    <section className="form-card">
      <div className="section-heading">
        <h2>Job Application Form</h2>
        <p>Fill in your details to apply for this position.</p>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-grid">
          <FormField
            label="Full Name"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            error={errors.fullName}
            placeholder="Enter your full name"
            required
          />

          <FormField
            label="Email Address"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            error={errors.email}
            placeholder="example@email.com"
            required
          />

          <FormField
            label="Phone Number"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            error={errors.phone}
            placeholder="+91 9876543210"
            required
          />

          <FormField
            label="Education"
            name="education"
            value={form.education}
            onChange={handleChange}
            error={errors.education}
            placeholder="e.g. BCA, MCA, B.Tech"
            required
          />

          <div className="full-width">
            <FormField
              label="Skills"
              name="skills"
              value={form.skills}
              onChange={handleChange}
              error={errors.skills}
              placeholder="React, JavaScript, HTML, CSS..."
              required
            />
          </div>

          <div className="full-width">
            <FormField
              label="Cover Letter"
              name="coverLetter"
              type="textarea"
              value={form.coverLetter}
              onChange={handleChange}
              error={errors.coverLetter}
              placeholder="Tell us why you are suitable for this job..."
              rows={6}
              required
              maxLength={1000}
            />

            <div className="character-count">
              {form.coverLetter.length}/1000 characters
              <span>
                {form.coverLetter.trim().length < 100
                  ? `${Math.max(
                      0,
                      100 - form.coverLetter.trim().length
                    )} more required`
                  : "Minimum reached"}
              </span>
            </div>
          </div>

          <div className="full-width">
            <FormField
              label="Resume (PDF only, maximum 2 MB)"
              name="resumeFile"
              type="file"
              onChange={handleChange}
              error={errors.resume}
              accept=".pdf,application/pdf"
              required
            />

            {form.resumeFile && (
              <div className="file-preview">
                <span>📄 {form.resumeFile.name}</span>

                <button
                  type="button"
                  className="remove-file"
                  onClick={() => {
                    setForm((previous) => ({
                      ...previous,
                      resumeFile: null,
                    }));

                    setErrors((previous) => ({
                      ...previous,
                      resume: "",
                    }));
                  }}
                >
                  Remove
                </button>
              </div>
            )}
          </div>
        </div>

        <div className={`confirmation ${errors.confirmation ? "has-error" : ""}`}>
          <label>
            <input
              type="checkbox"
              name="confirmed"
              checked={form.confirmed}
              onChange={handleChange}
            />

            <span>
              I confirm that all the information provided is correct.
            </span>
          </label>

          {errors.confirmation && (
            <p className="error-message">{errors.confirmation}</p>
          )}
        </div>

        <button type="submit" className="primary-button">
          Review Application →
        </button>
      </form>
    </section>
  );
}