import { ContactServices } from "@/components/ContactServices";
import { ContactStrip } from "@/components/ContactStrip";

export const metadata = {
  title: "Ping",
};

export default function ContactPage() {
  return (
    <main className="mx-auto min-w-0 w-full max-w-3xl flex-1 space-y-10 px-4 py-12">
      <header className="space-y-2">
        <p className="mono-label">Ping</p>
        <h1 className="h2-section text-[var(--fg)]">Contact</h1>
      </header>
      <ContactStrip variant="full" />
      <ContactServices />
    </main>
  );
}
