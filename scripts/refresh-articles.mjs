import fs from "node:fs/promises";

const FILE = new URL("../src/content/articles.json", import.meta.url);

function getMeta(html, prop) {
    const r1 = new RegExp(`<meta[^>]+property=["']${prop}["'][^>]+content=["']([^"']+)["'][^>]*>`, "i");
    const r2 = new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+property=["']${prop}["'][^>]*>`, "i");
    const m = html.match(r1) || html.match(r2);
    return m ? m[1].trim() : "";
}

function getTitleFallback(html) {
    const m = html.match(/<title>([^<]+)<\/title>/i);
    return m ? m[1].trim() : "";
}

async function fetchHtml(url) {
    const res = await fetch(url, {
        headers: {
            // Helps Medium/LinkedIn return OG tags more consistently
            "User-Agent": "Mozilla/5.0",
            "Accept-Language": "en-US,en;q=0.9",
        },
    });
    return await res.text();
}

async function main() {
    const raw = await fs.readFile(FILE, "utf-8");
    const data = JSON.parse(raw);

    for (const a of data) {
        try {
            const html = await fetchHtml(a.url);

            const ogTitle = getMeta(html, "og:title");
            const ogDesc = getMeta(html, "og:description");
            const ogImg = getMeta(html, "og:image");

            if (!a.title) a.title = ogTitle || getTitleFallback(html);
            if (!a.preview) a.preview = ogDesc || "";
            if (!a.image) a.image = ogImg || "";

            console.log("✓", a.platform, "-", a.title);
        } catch (e) {
            console.log("✗", a.url, e.message);
        }
    }

    await fs.writeFile(FILE, JSON.stringify(data, null, 2) + "\n");
    console.log("\nDone. Updated:", FILE.pathname);
}

main();