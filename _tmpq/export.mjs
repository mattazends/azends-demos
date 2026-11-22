// Runs in the Base44 sandbox: renders every route from the dev server and writes a static copy for /novus on Vercel.
import fs from "fs";
import path from "path";
import { load } from "cheerio";

const OUT = "/tmp/out/novus";
const BASE = "/novus";
const ROUTES = ["/", "/services", "/services/pre-storm-anti-icing", "/services/commercial-snow-plowing", "/services/sidewalk-snow-removal", "/services/de-icing-salting", "/services/snow-shoveling", "/services/snow-hauling", "/services/seasonal-snow-contracts", "/areas", "/areas/manhattan", "/areas/brooklyn", "/areas/queens", "/areas/bronx", "/areas/staten-island", "/industries", "/industries/retail-storefronts", "/industries/hotels", "/industries/hospitals-healthcare", "/industries/warehouses-distribution", "/industries/apartment-buildings", "/industries/corporate-offices", "/industries/property-managers", "/industries/construction-sites", "/industries/cultural-venues", "/industries/gyms-fitness", "/how-it-works", "/guides", "/guides/nyc-sidewalk-snow-removal-law", "/guides/anti-icing-vs-de-icing", "/guides/commercial-winter-readiness-checklist", "/quote"];
const NEED = { "pre-storm-anti-icing": "Pre-storm anti-icing", "commercial-snow-plowing": "Snow plowing", "sidewalk-snow-removal": "Sidewalk clearing", "de-icing-salting": "De-icing", "snow-shoveling": "Shoveling", "snow-hauling": "Snow hauling", "seasonal-snow-contracts": "Full season cover" };
const WHERE = { manhattan: "Manhattan", brooklyn: "Brooklyn", queens: "Queens", bronx: "The Bronx", "staten-island": "Staten Island" };

const M = "https://media.base44.com/images/public/6b002b0a52f746ee078dd98f/";
const px = (id) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1800`;
const MAP = {
  "78d19799b_svc-plowing.jpeg": px(29210013), "032ea3244_svc-deicing.jpeg": px(6675103), "72acc718c_svc-sidewalks.jpeg": px(38428261),
  "aa9a7f76b_svc-shoveling.jpeg": px(35422450), "2dda683dd_svc-hauling.jpeg": px(35540158), "86d5460df_coverage.jpeg": px(36278805),
  "c287c1b70_cta.jpeg": px(36278804), "9a7d90f30_brooklyn-street-snow.jpg": px(36278806), "bf9aecd48_brownstone-steps-snow.jpg": px(36275919),
  "e60ce6c87_sidewalk-shoveling-brooklyn.jpg": px(36275911), "bc4dd34c5_nyc-street-crossing-snow.jpg": px(9708527), "9f3f3c288_manhattan-night-snow.jpg": px(30640275),
  "8e2685d40_construction-site-snow.jpg": px(14822653), "ef4b4196e_parking-lot-snow-aerial.jpg": px(7582404), "b53572653_truck-yard-snow-aerial.jpg": px(7329704),
  "a7a961687_hand-crew-shoveling.jpg": px(19374522), "339864b84_queens-street-snow.jpg": px(10585386), "a08d328a4_snow-blower-sidewalk.jpg": px(10930882),
  "14aaee91a_novus-hero.png": "https://d8j0ntlcm91z4.cloudfront.net/user_3ENLM0AKeKmvf4tDqddMsnHGEvu/hf_20261118_110720_a75cebf1-54cc-4e1c-8870-61380373448a.png",
};
const LOGOS = ["5afcd59f5_logo-target.png", "a61fd5309_logo-verizon.png", "275fc890b_logo-schwab.png", "1280b5a52_logo-patagonia.png", "b7756ef5b_logo-puma.png", "ec889f328_logo-tdameritrade.png", "f9441abd5_logo-frick.png", "20d41fe47_logo-triton.png", "25a8ec7fd_logo-nakefit.webp"];
const VIDEO_FROM = "https://media.base44.com/videos/public/6b002b0a52f746ee078dd98f/77b017dd8_novus-hero.mp4";
const VIDEO_TO = "https://d8j0ntlcm91z4.cloudfront.net/user_3ENLM0AKeKmvf4tDqddMsnHGEvu/hf_20261118_110952_4406f543-2d72-4396-932e-da4f9143ec16.mp4";

function media(s, amp) {
  for (const [k, v] of Object.entries(MAP)) s = s.split(M + k).join(amp ? v.replace(/&/g, "&amp;") : v);
  for (const l of LOGOS) s = s.split(M + l).join(BASE + "/img/" + l.replace(/^[0-9a-f]+_/, ""));
  return s.split(VIDEO_FROM).join(VIDEO_TO);
}

fs.rmSync("/tmp/out", { recursive: true, force: true });
fs.mkdirSync(OUT + "/img", { recursive: true });

const homeHtml = await (await fetch("http://localhost:5173/")).text();

for (const r of ROUTES) {
  const html = r === "/" ? homeHtml : await (await fetch("http://localhost:5173" + r)).text();
  const $ = load(html);
  $("script").each((_, el) => { if ($(el).attr("type") !== "application/ld+json") $(el).remove(); });
  $('link[rel="modulepreload"], link[href^="/src/"], link[href^="/@"], link[data-tanstack-router-dev-styles]').remove();
  $("head").append(`<link rel="stylesheet" href="${BASE}/novus.css"/><link rel="stylesheet" href="${BASE}/pages.css"/><meta name="robots" content="noindex"/>`);
  if (r === "/") $("body").append(`<script src="${BASE}/home.js" defer></script>`);
  $("body").append(`<script src="${BASE}/site.js" defer></script>`);
  $("body").removeAttr("data-react-root");
  const seg = r.split("/");
  if (seg[1] === "services" && NEED[seg[2]]) $("body").attr("data-need", NEED[seg[2]]);
  if (seg[1] === "areas" && WHERE[seg[2]]) $("body").attr("data-where", WHERE[seg[2]]);
  $("a[href], link[href]").each((_, el) => {
    const h = $(el).attr("href");
    if (h && h.startsWith("/") && !h.startsWith("//") && !h.startsWith(BASE)) $(el).attr("href", BASE + (h === "/" ? "/" : h));
  });
  const out = media($.html(), true);
  const dir = path.join(OUT, r === "/" ? "" : r);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), out);
  console.log(r, out.length, (out.match(/base44/g) || []).length);
}

for (const f of ["novus.css", "pages.css"]) fs.writeFileSync(path.join(OUT, f), media(fs.readFileSync("src/styles/" + f, "utf8"), false));
let init = fs.readFileSync("src/lib/novus-init.js", "utf8").replace("export function initNovus", "window.initNovus = function initNovus");
fs.writeFileSync(path.join(OUT, "home.js"), init);
for (const l of LOGOS) {
  const buf = Buffer.from(await (await fetch(M + l)).arrayBuffer());
  fs.writeFileSync(path.join(OUT, "img", l.replace(/^[0-9a-f]+_/, "")), buf);
}
console.log("done");
