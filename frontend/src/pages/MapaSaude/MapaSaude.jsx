import { useEffect } from "react";

export default function MapaSaude() {
  useEffect(() => {
    window.open(
      "https://www.google.com/maps/search/maps+hospitais+publico+e+upas/@-12.9172834,-38.6040061,12z?entry=ttu&g_ep=EgoyMDI1MDgyNC4wIKXMDSoASAFQAw%3D%3D",
      "_blank",
      "noopener,noreferrer"
    );
  }, []);

  return null;
}
