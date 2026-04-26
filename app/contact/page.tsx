export const metadata = {
  title: "Ping",
};

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-3xl flex-1 space-y-6 px-4 py-12">
      <header className="space-y-2">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-cyan-500/90">
          Ping
        </p>
        <h1 className="font-mono text-2xl text-slate-50">Contact</h1>
        <p className="text-sm text-slate-400">
          Replace this block with your preferred links (email, LinkedIn, etc.).
        </p>
      </header>
      <ul className="space-y-3 font-mono text-sm text-cyan-200/90">
        <li>
          <a className="hover:text-cyan-100" href="mailto:mo.aldokimi@gmail.com">
            mo.aldokimi@gmail.com
          </a>
        </li>
        <li>
          <a
            className="hover:text-cyan-100"
            href="https://www.linkedin.com/in/mohammed-al-dokimi-98ba411a5"
            rel="noreferrer"
            target="_blank"
          >
            LinkedIn
          </a>
        </li>
      </ul>
    </main>
  );
}
