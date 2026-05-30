import { describe, expect, it, beforeEach, vi } from "vitest";
import {
  TERMINAL_STORAGE_KEY,
  WELCOME_LINES,
  clearTerminalSession,
  loadTerminalSession,
  saveTerminalSession,
} from "@/lib/dokictl-terminal-storage";

describe("dokictl terminal storage", () => {
  beforeEach(() => {
    const store = new Map<string, string>();
    const localStorage = {
      getItem: (key: string) => store.get(key) ?? null,
      setItem: (key: string, value: string) => store.set(key, value),
      removeItem: (key: string) => store.delete(key),
      clear: () => store.clear(),
    };
    vi.stubGlobal("window", { localStorage });
    vi.stubGlobal("localStorage", localStorage);
  });

  it("saves and loads session", () => {
    const lines = [
      ...WELCOME_LINES,
      { type: "input" as const, text: "$ dokictl get certs" },
    ];
    saveTerminalSession({ lines, history: ["dokictl get certs"] });
    const loaded = loadTerminalSession();
    expect(loaded?.history).toEqual(["dokictl get certs"]);
    expect(loaded?.lines).toHaveLength(lines.length);
  });

  it("clears session from storage", () => {
    saveTerminalSession({ lines: WELCOME_LINES, history: [] });
    clearTerminalSession();
    expect(localStorage.getItem(TERMINAL_STORAGE_KEY)).toBeNull();
  });
});
