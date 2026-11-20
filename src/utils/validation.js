export const MAX_RESUME_SIZE = 2 * 1024 * 1024;

export function validateName(name) {
  if (!name.trim()) {
    return "Full name is required.";
  }

  if (name.trim().length < 3) {
    return "Name must contain at least 3 characters.";
  }

  return "";
}

export function validateEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email.trim()) {
    return "Email is required.";
  }

  if (!emailPattern.test(email)) {
    return "Enter a valid email address.";
  }

  return "";
}

export function validatePhone(phone) {
  const phonePattern = /^\+?[0-9\s()-]{10,15}$/;

  if (!phone.trim()) {
    return "Phone number is required.";
  }

  if (!phonePattern.test(phone)) {
    return "Enter a valid phone number.";
  }

  const digits = phone.replace(/\D/g, "");

  if (digits.length < 10 || digits.length > 15) {
    return "Phone must contain 10 to 15 digits.";
  }

  return "";
}

export function validateEducation(education) {
  if (!education.trim()) {
    return "Education is required.";
  }

  return "";
}

export function validateSkills(skills) {
  if (!skills.trim()) {
    return "Skills are required.";
  }

  if (skills.trim().length < 3) {
    return "Please enter your skills.";
  }

  return "";
}

export function validateCoverLetter(letter) {
  if (!letter.trim()) {
    return "Cover letter is required.";
  }

  if (letter.trim().length < 100) {
    return "Cover letter must contain at least 100 characters.";
  }

  return "";
}

export function validateResume(file) {
  if (!file) {
    return "Please upload your resume.";
  }

  if (file.type !== "application/pdf") {
    return "Only PDF files are allowed.";
  }

  if (file.size > MAX_RESUME_SIZE) {
    return "Resume size must be less than 2 MB.";
  }

  return "";
}

export function validateConfirmation(confirmed) {
  if (!confirmed) {
    return "Please confirm your information.";
  }

  return "";
}

export function validateApplication(data) {
  return {
    fullName: validateName(data.fullName || ""),
    email: validateEmail(data.email || ""),
    phone: validatePhone(data.phone || ""),
    education: validateEducation(data.education || ""),
    skills: validateSkills(data.skills || ""),
    coverLetter: validateCoverLetter(data.coverLetter || ""),
    resume: validateResume(data.resumeFile),
    confirmation: validateConfirmation(data.confirmed),
  };
}

export function hasErrors(errors) {
  return Object.values(errors).some((error) => Boolean(error));
}