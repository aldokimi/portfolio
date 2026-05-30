export type TerminalLine =
  | { type: "input"; text: string }
  | { type: "output"; text: string }
  | { type: "error"; text: string }
  | { type: "help"; text: string };

export type TerminalSession = {
  lines: TerminalLine[];
  history: string[];
};

export const TERMINAL_STORAGE_KEY = "portfolio:dokictl-terminal";

export const WELCOME_LINES: TerminalLine[] = [
  "Interactive dokictl shell — type commands below.",
  "Try: dokictl get certs",
  "     dokictl get roles",
  "     dokictl describe role/genesys",
  "",
].map((text) => ({ type: "output" as const, text }));

function isTerminalLine(value: unknown): value is TerminalLine {
  if (!value || typeof value !== "object") return false;
  const line = value as TerminalLine;
  return (
    typeof line.text === "string" &&
    (line.type === "input" ||
      line.type === "output" ||
      line.type === "error" ||
      line.type === "help")
  );
}

export function loadTerminalSession(): TerminalSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(TERMINAL_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as TerminalSession;
    if (!Array.isArray(parsed.lines) || !Array.isArray(parsed.history)) {
      return null;
    }
    const lines = parsed.lines.filter(isTerminalLine);
    const history = parsed.history.filter(
      (item): item is string => typeof item === "string",
    );
    if (lines.length === 0) return null;
    return { lines, history };
  } catch {
    return null;
  }
}

export function saveTerminalSession(session: TerminalSession): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(TERMINAL_STORAGE_KEY, JSON.stringify(session));
  } catch {
    // Ignore quota / private mode errors.
  }
}

export function clearTerminalSession(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(TERMINAL_STORAGE_KEY);
  } catch {
    // Ignore.
  }
}
