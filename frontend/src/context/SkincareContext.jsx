import { useEffect, useMemo, useState } from "react";

import { SkincareContext } from "./skincare-context";

const STORAGE_KEY = "auraskin-session";

const initialProfile = {
  name: "",
  age: "",
  sensitiveSkin: false,
  sleepDuration: "",
};
export function SkincareProvider({ children }) {
  const [userProfile, setUserProfile] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      return saved.userProfile || initialProfile;
    } catch {
      return initialProfile;
    }
  });
  const [uploads, setUploads] = useState({});
  const [analysisResult, setAnalysisResult] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      return saved.analysisResult || null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        userProfile,
        analysisResult,
      }),
    );
  }, [analysisResult, userProfile]);

  const value = useMemo(
    () => ({
      userProfile,
      uploads,
      analysisResult,
      saveUserProfile: (payload) => setUserProfile(payload),
      saveUploads: (payload) => {
        setUploads(payload);
        setAnalysisResult(null);
      },
      saveAnalysisResult: (payload) => setAnalysisResult(payload),
      resetJourney: () => {
        setUserProfile(initialProfile);
        setUploads({});
        setAnalysisResult(null);
        localStorage.removeItem(STORAGE_KEY);
      },
    }),
    [analysisResult, uploads, userProfile],
  );

  return <SkincareContext.Provider value={value}>{children}</SkincareContext.Provider>;
}
