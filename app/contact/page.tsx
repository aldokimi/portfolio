import { ContactServices } from "@/components/ContactServices";
import { ContactStrip } from "@/components/ContactStrip";

export const metadata = {
  title: "Ping",
};

export default function ContactPage() {
  return (
    <main className="mx-auto min-w-0 w-full max-w-3xl flex-1 space-y-10 px-4 py-12">
      <header className="space-y-2">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-cyan-500/90">
          Ping
        </p>
        <h1 className="font-mono text-2xl text-slate-50">Contact</h1>
      </header>
      <ContactStrip variant="full" />
      <ContactServices />
    </main>
  );
}
