import ModalShell from "./ModalShell";
import PdfDeck from "./PdfDeck";
import Gallery from "./Gallery";

export default function PortfolioModal({ active, onClose }) {
  if (!active) return null;

  return (
    <ModalShell
      open={!!active}
      onClose={onClose}
      title={active.title}
      subtitle={active.type === "pdf" ? "PDF case study" : "Build assets"}
    >
      {active.type === "pdf" ? (
        <PdfDeck pdfUrl={active.pdf} title={active.title} />
      ) : (
        <Gallery images={active.gallery || []} />
      )}
    </ModalShell>
  );
}