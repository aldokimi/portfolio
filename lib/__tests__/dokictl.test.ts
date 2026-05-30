import { describe, expect, it } from "vitest";
import { DOKICTL_ONLY_ERROR, runDokictl } from "@/lib/dokictl";

describe("runDokictl", () => {
  it("rejects non-dokictl commands", () => {
    const r = runDokictl("kubectl get pods");
    expect(r.kind).toBe("error");
    if (r.kind === "error") expect(r.message).toBe(DOKICTL_ONLY_ERROR);
  });

  it("rejects bare shell commands", () => {
    expect(runDokictl("whoami").kind).toBe("error");
    expect(runDokictl("ls -la").kind).toBe("error");
  });

  it("shows help for dokictl with no subcommand args", () => {
    expect(runDokictl("dokictl").kind).toBe("help");
  });

  it("shows help for invalid dokictl usage", () => {
    expect(runDokictl("dokictl apply -f site.yaml").kind).toBe("help");
    expect(runDokictl("dokictl get pods").kind).toBe("help");
    expect(runDokictl("dokictl get certs --namespace career").kind).toBe(
      "help",
    );
  });

  it("lists certs", () => {
    const r = runDokictl("dokictl get certs");
    expect(r.kind).toBe("output");
    if (r.kind === "output") {
      const text = r.lines.join("\n");
      expect(text).toContain("RHCA");
      expect(text).toContain("VALID_UNTIL");
    }
  });

  it("lists roles", () => {
    const r = runDokictl("dokictl get roles");
    expect(r.kind).toBe("output");
    if (r.kind === "output") {
      const text = r.lines.join("\n");
      expect(text).toContain("genesys");
      expect(text).toContain("Genesys");
    }
  });

  it("describes a role by id", () => {
    const r = runDokictl("dokictl describe role/redhat");
    expect(r.kind).toBe("output");
    if (r.kind === "output") {
      expect(r.lines.join("\n")).toContain("Red Hat");
    }
  });

  it("returns profile data", () => {
    const r = runDokictl("dokictl get profile");
    expect(r.kind).toBe("output");
    if (r.kind === "output") {
      expect(r.lines.join("\n")).toContain("Mohammed Al-Dokimi");
    }
  });
});
