import { useState } from "react";
import { useForm } from "react-hook-form";
import FormField from "./FormField";
import {
  validateResume,
  validateCoverLetter,
} from "../utils/validation";

export default function ReactHookFormApplicationForm({ onReview }) {
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeError, setResumeError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      education: "",
      skills: "",
      coverLetter: "",
      confirmed: false,
    },
  });

  const coverLetter = watch("coverLetter", "");

  const nameRules = {
    required: "Full name is required.",
    minLength: {
      value: 3,
      message: "Name must contain at least 3 characters.",
    },
  };

  const emailRules = {
    required: "Email is required.",
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Enter a valid email address.",
    },
  };

  const phoneRules = {
    required: "Phone number is required.",
    pattern: {
      value: /^\+?[0-9\s()-]{10,15}$/,
      message: "Enter a valid phone number.",
    },
    validate: (value) => {
      const digits = value.replace(/\D/g, "");

      return (
        (digits.length >= 10 && digits.length <= 15) ||
        "Phone must contain 10 to 15 digits."
      );
    },
  };

  function handleResumeChange(event) {
    const file = event.target.files?.[0] || null;

    const error = validateResume(file);

    setResumeFile(file);
    setResumeError(error);

    if (error) {
      event.target.value = "";
      setResumeFile(null);
    }
  }

  function handleValidSubmit(data) {
    if (!resumeFile) {
      setResumeError("Please upload your resume.");
      return;
    }

    const resumeValidation = validateResume(resumeFile);

    if (resumeValidation) {
      setResumeError(resumeValidation);
      return;
    }

    const coverLetterValidation = validateCoverLetter(data.coverLetter);

    if (coverLetterValidation) {
      return;
    }

    onReview(
      {
        ...data,
        resumeFile,
      },
      resetForm
    );
  }

  function resetForm() {
    reset();
    setResumeFile(null);
    setResumeError("");
  }

  return (
    <section className="form-card">
      <div className="section-heading">
        <h2>Job Application Form</h2>
        <p>React Hook Form version</p>
      </div>

      <form onSubmit={handleSubmit(handleValidSubmit)} noValidate>
        <div className="form-grid">
          <div className="form-field">
            <label htmlFor="rhf-fullName">
              Full Name <span className="required">*</span>
            </label>

            <input
              id="rhf-fullName"
              placeholder="Enter your full name"
              {...register("fullName", nameRules)}
            />

            {errors.fullName && (
              <p className="error-message">
                {errors.fullName.message}
              </p>
            )}
          </div>

          <div className="form-field">
            <label htmlFor="rhf-email">
              Email Address <span className="required">*</span>
            </label>

            <input
              id="rhf-email"
              type="email"
              placeholder="example@email.com"
              {...register("email", emailRules)}
            />

            {errors.email && (
              <p className="error-message">{errors.email.message}</p>
            )}
          </div>

          <div className="form-field">
            <label htmlFor="rhf-phone">
              Phone Number <span className="required">*</span>
            </label>

            <input
              id="rhf-phone"
              type="tel"
              placeholder="+91 9876543210"
              {...register("phone", phoneRules)}
            />

            {errors.phone && (
              <p className="error-message">{errors.phone.message}</p>
            )}
          </div>

          <div className="form-field">
            <label htmlFor="rhf-education">
              Education <span className="required">*</span>
            </label>

            <input
              id="rhf-education"
              placeholder="BCA, MCA, B.Tech..."
              {...register("education", {
                required: "Education is required.",
              })}
            />

            {errors.education && (
              <p className="error-message">
                {errors.education.message}
              </p>
            )}
          </div>

          <div className="full-width form-field">
            <label htmlFor="rhf-skills">
              Skills <span className="required">*</span>
            </label>

            <input
              id="rhf-skills"
              placeholder="React, JavaScript, HTML, CSS..."
              {...register("skills", {
                required: "Skills are required.",
                minLength: {
                  value: 3,
                  message: "Please enter your skills.",
                },
              })}
            />

            {errors.skills && (
              <p className="error-message">{errors.skills.message}</p>
            )}
          </div>

          <div className="full-width form-field">
            <label htmlFor="rhf-coverLetter">
              Cover Letter <span className="required">*</span>
            </label>

            <textarea
              id="rhf-coverLetter"
              rows={6}
              maxLength={1000}
              placeholder="Tell us why you are suitable for this job..."
              {...register("coverLetter", {
                required: "Cover letter is required.",
                validate: (value) =>
                  value.trim().length >= 100 ||
                  "Cover letter must contain at least 100 characters.",
              })}
            />

            {errors.coverLetter && (
              <p className="error-message">
                {errors.coverLetter.message}
              </p>
            )}

            <div className="character-count">
              {coverLetter.length}/1000 characters
              <span>
                {coverLetter.trim().length < 100
                  ? `${Math.max(
                      0,
                      100 - coverLetter.trim().length
                    )} more required`
                  : "Minimum reached"}
              </span>
            </div>
          </div>

          <div className="full-width form-field">
            <label htmlFor="rhf-resume">
              Resume (PDF only, maximum 2 MB){" "}
              <span className="required">*</span>
            </label>

            <input
              id="rhf-resume"
              type="file"
              accept=".pdf,application/pdf"
              onChange={handleResumeChange}
            />

            {resumeError && (
              <p className="error-message">{resumeError}</p>
            )}

            {resumeFile && (
              <div className="file-preview">
                <span>📄 {resumeFile.name}</span>

                <button
                  type="button"
                  className="remove-file"
                  onClick={() => {
                    setResumeFile(null);
                    setResumeError("");

                    const input = document.getElementById("rhf-resume");

                    if (input) {
                      input.value = "";
                    }
                  }}
                >
                  Remove
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="confirmation">
          <label>
            <input
              type="checkbox"
              {...register("confirmed", {
                required: "Please confirm your information.",
              })}
            />

            <span>
              I confirm that all the information provided is correct.
            </span>
          </label>

          {errors.confirmed && (
            <p className="error-message">
              {errors.confirmed.message}
            </p>
          )}
        </div>

        <button type="submit" className="primary-button">
          Review Application →
        </button>
      </form>
    </section>
  );
}