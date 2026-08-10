import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html", host: "localhost" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the Nautikos presentation", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Nautikos Caspian/);
  assert.match(html, /Каспий,/);
  assert.match(html, /Доля воды/);
  assert.match(html, /Прогноз 2027/);
  assert.match(html, /90-дневный пилот/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Your site is taking shape/i);
});

test("removes the starter and keeps presentation interaction accessible", async () => {
  const [page, css, layout, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  await assert.rejects(access(new URL("../app/_sites-preview/SkeletonPreview.tsx", import.meta.url)));
  assert.match(page, /^"use client"/);
  assert.match(page, /aria-label=\{t\("Граница сравнения снимков 2020 и 2026"\)\}/);
  assert.match(page, /role="tablist"/);
  assert.match(page, /Демонстрационный расчёт показывает формат ответа/);
  assert.match(page, /Русский/);
  assert.match(page, /Қазақша/);
  assert.match(page, /English/);
  assert.match(page, /nautikos-language/);
  assert.match(css, /scroll-snap-type:\s*y mandatory/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(layout, /Nautikos Caspian/);
  assert.match(layout, /og\.png/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
});
