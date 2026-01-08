import { useCallback, useState } from "react";

export default function usePortfolioModal() {
  const [active, setActive] = useState(null);

  const close = useCallback(() => setActive(null), []);

  const openItem = useCallback((item) => {
    // Mobile: open PDFs directly in a new tab (modal feels too small)
    if (
      item?.type === "pdf" &&
      typeof window !== "undefined" &&
      window.innerWidth < 640
    ) {
      window.open(item.pdf, "_blank", "noopener,noreferrer");
      return;
    }

    setActive(item);
  }, []);

  return { active, openItem, close };
}