import { describe, expect, it } from "vitest";
import {
  excerptFromBody,
  slugify,
  validatePostInput,
} from "@/lib/post-utils";

describe("slugify", () => {
  it("lowercases and hyphenates", () => {
    expect(slugify("Hello World")).toBe("hello-world");
  });

  it("strips special chars", () => {
    expect(slugify("Go & Kubernetes!")).toBe("go-kubernetes");
  });

  it("returns untitled for empty", () => {
    expect(slugify("   ")).toBe("untitled");
  });
});

describe("excerptFromBody", () => {
  it("uses first paragraph", () => {
    expect(excerptFromBody("First para.\n\nSecond.")).toBe("First para.");
  });
});

describe("validatePostInput", () => {
  it("rejects empty title", () => {
    expect(validatePostInput({ title: "", slug: "x", body: "y" })).toBe(
      "Title is required.",
    );
  });

  it("rejects empty body on publish", () => {
    expect(
      validatePostInput({ title: "T", slug: "t", body: "" }, "published"),
    ).toBe("Body is required to publish.");
  });
});
