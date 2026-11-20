import { useState } from "react";

const STORAGE_KEY = "careerhub_applications";

function readApplications() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export default function useApplications() {
  const [applications, setApplications] = useState(readApplications);

  function saveApplication(application) {
    const updated = [application, ...readApplications()];

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setApplications(updated);
  }

  function deleteApplication(id) {
    const updated = readApplications().filter(
      (application) => application.id !== id
    );

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setApplications(updated);
  }

  function refreshApplications() {
    setApplications(readApplications());
  }

  return {
    applications,
    saveApplication,
    deleteApplication,
    refreshApplications,
  };
}