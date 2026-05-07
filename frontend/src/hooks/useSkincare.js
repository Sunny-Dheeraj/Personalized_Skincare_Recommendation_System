import { useContext } from "react";

import { SkincareContext } from "../context/skincare-context";


export function useSkincare() {
  const context = useContext(SkincareContext);
  if (!context) {
    throw new Error("useSkincare must be used inside SkincareProvider");
  }
  return context;
}
