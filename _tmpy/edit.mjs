import fs from "fs";
const P = "src/components/novus/NovusMarkup.jsx";
let s = fs.readFileSync(P, "utf8");
const rep = (a, b) => { if (!s.includes(a)) { console.error("MISSING:", a.slice(0, 80)); process.exit(1); } s = s.replace(a, b); };
const M = "https://media.base44.com/images/public/6b002b0a52f746ee078dd98f/";

// 1. nav -> shared nav
const navStart = s.indexOf("{/* NAV */}"), heroStart = s.indexOf("{/* HERO */}");
if (navStart < 0 || heroStart < 0) { console.error("nav markers"); process.exit(1); }
s = s.slice(0, navStart) + "{/* NAV */}\n      <SiteNav solidAt={0.75} home />\n      " + s.slice(heroStart);
s = s.replace('import { memo } from "react";', 'import { memo } from "react";\nimport { SiteNav, SiteFooter } from "@/components/novus/site/Shell";');

// 2. hero copy
rep('<div className="chip rv"><span className="pulse" />Crews on standby 24/7 across all five boroughs</div>', '<div className="chip rv"><span className="pulse" />Pre-treating sites before every storm · 24/7</div>');
rep('Open on time.<br /><b>Every storm.</b>', 'There before<br /><b>the first flake.</b>');
rep("<p className=\"sub rv d2\">Plowing, de-icing, sidewalks and hauling for businesses across Manhattan, Brooklyn, Queens, the Bronx and Staten Island. Commercial only. Snow only.</p>", "<p className=\"sub rv d2\">We treat your lots, sidewalks and entrances before the storm, so snow can't bond and your site opens on time. Then we plow, clear and haul. Commercial only, all five boroughs.</p>");

// 3. fines
rep('<div className="n">up to <b>$350</b></div><div className="t">per DSNY violation for repeat misses</div>', '<div className="n">up to <b>$250</b></div><div className="t">per DSNY violation for repeat misses</div>');
rep("Fines run from $100 up to $350 for repeat violations.", "DSNY fines are $100 for a first offense, $150 for a second and $250 for a third.");

// 4. services list (6 items, prevention first)
const SV = [
  ["Pre-storm anti-icing", "pre-storm-anti-icing", "Surfaces treated before the first flake, so snow and ice can't bond to the pavement. Crews lift it clean instead of chipping at ice.", ["Before the storm", "Entrances & walkways", "Lot lanes"], "2dda683dd_svc-hauling.jpeg", "Salt spreader truck treating a snowy city street"],
  ["Snow plowing", "commercial-snow-plowing", "Lots, loading bays and access roads pushed clear during the storm on a plan we set before the season, so deliveries and staff keep moving.", ["Parking lots", "Loading bays", "Access roads"], "78d19799b_svc-plowing.jpeg", "Snowplow truck clearing a snowy city street"],
  ["De-icing", "de-icing-salting", "Premium, less corrosive de-icing during and after the storm. It stops ice building up and keeps melt from refreezing overnight.", ["During & after", "Anti-refreeze", "Less corrosive"], "032ea3244_svc-deicing.jpeg", "Snow covered city street with traffic lights"],
  ["Sidewalk clearing", "sidewalk-snow-removal", "Frontages, corners and curb cuts cleared to a safe path inside the city's window, so customers walk straight in and your liability stays low.", ["Storefronts", "Corners & curb cuts", "Hydrants"], "72acc718c_svc-sidewalks.jpeg", "People walking on a snowy New York City street"],
  ["Hand shoveling", "snow-shoveling", "Fully trained hand crews for the tight spots machines can't reach: stairs, ramps, doorways and fire exits.", ["Stairs & ramps", "Fire exits", "Tight spaces"], "a7a961687_hand-crew-shoveling.jpg", "Worker in high-visibility gear shoveling a city sidewalk"],
  ["Snow hauling", "snow-hauling", "No room to stack it, or piles getting dangerous? We load it, haul it off site and manage every step, so you keep every parking space.", ["Off-site removal", "Pile management", "Overnight loading"], "b53572653_truck-yard-snow-aerial.jpg", "Aerial view of trucks in a snowy yard"],
];
const plus = '<span className="plus"><svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M7 1v12M1 7h12" /></svg></span>';
const esc = (t) => t.replace(/&/g, "&amp;").replace(/'/g, "&apos;");
const listHtml = SV.map((v, i) => `              <div className="svc-item${i === 0 ? " on" : ""}" data-i={${i}}>
                <span className="no">0${i + 1}</span>
                <div><h3>${v[0]}</h3></div>
                ${plus}
                <div className="svc-body"><div><p>${esc(v[2])}</p><div className="tags">${v[3].map((t) => `<span>${esc(t)}</span>`).join("")}</div><a className="svc-more" href="/services/${v[1]}">How ${v[0].toLowerCase()} works <span className="arr">→</span></a></div></div>
              </div>`).join("\n");
const visHtml = SV.map((v, i) => `              <img ${i === 0 ? 'className="on" ' : ""}src="${M}${v[4]}" alt="${v[5]}"${i ? ' loading="lazy"' : ""} />`).join("\n");
const a = s.indexOf('<div className="svc-list" id="svcList">'), b = s.indexOf('<div className="svc-cap">');
if (a < 0 || b < 0) { console.error("svc markers"); process.exit(1); }
s = s.slice(0, a) + '<div className="svc-list" id="svcList">\n' + listHtml + '\n            </div>\n            <div className="svc-vis rv" id="svcVis">\n' + visHtml + "\n              " + s.slice(b);
rep('Everything a commercial site needs. <b>Nothing it doesn\'t.</b>', 'It starts <b>before it snows.</b>');
rep("One team for the whole storm, from the first flake on the lot to the last pile hauled away.", "One team for the whole storm, from the treatment that goes down before the first flake to the last pile hauled away.");
rep('Lots and roads, <b>pushed clear</b></div>', 'Ice stopped <b>before it forms</b></div>');

// 5. storm step 3 -> prevention
rep('<div className="when">Snow starts falling</div>', '<div className="when">Before the first flake</div>');
rep("<h3>Surfaces get <b>treated early.</b></h3>", "<h3>Surfaces get <b>pre-treated.</b></h3>");
rep("De-icing goes down on walkways, entrances and lots to stop ice bonding to the surface. Less ice now means a faster, cleaner clear later.", "A treatment layer goes down on walkways, entrances and lots before the snow starts, so ice can't bond to the pavement. Less ice now means a faster, cleaner clear later.");

// 6. boroughs -> links
for (const [n, slug] of [["Manhattan", "manhattan"], ["Brooklyn", "brooklyn"], ["Queens", "queens"], ["The Bronx", "bronx"], ["Staten Island", "staten-island"]])
  rep(`<span className="boro"><i />${n}</span>`, `<a className="boro" href="/areas/${slug}"><i />${n}</a>`);
rep('<span className="boro"><i />Long Island City</span>', '<a className="boro" href="/areas/queens"><i />Long Island City</a>');

// 7. industries line -> links
rep("<p className=\"inds rv\"><b>Who we clear for:</b> retail chains and storefronts, corporate offices, property and facilities managers, construction sites, banks, museums and cultural venues, gyms and fitness studios.</p>",
  "<p className=\"inds rv\"><b>Who we clear for:</b> <a href=\"/industries/retail-storefronts\">retail chains and storefronts</a>, <a href=\"/industries/corporate-offices\">corporate offices and banks</a>, <a href=\"/industries/property-managers\">property and facilities managers</a>, <a href=\"/industries/construction-sites\">construction sites</a>, <a href=\"/industries/cultural-venues\">museums and cultural venues</a>, <a href=\"/industries/gyms-fitness\">gyms and fitness studios</a>.</p>");

// 8. quote form option
const fc = '<button type="button" className="cardopt">Full season cover';
rep(fc, '<button type="button" className="cardopt">Pre-storm anti-icing<span className="tick"><svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={2}><path d="m2 6 3 3 5-6" /></svg></span></button>\n                  ' + fc);

// 9. footer -> shared footer
const f1 = s.indexOf("<footer>"), f2 = s.indexOf("</footer>");
if (f1 < 0 || f2 < 0) { console.error("footer"); process.exit(1); }
s = s.slice(0, f1) + "<SiteFooter home />" + s.slice(f2 + "</footer>".length);

fs.writeFileSync(P, s);
console.log("ok");

// 10. prevention section before the clock
{
  let s2 = fs.readFileSync(P, "utf8");
  const mark = '<section className="sec" id="clock"';
  if (!s2.includes(mark)) { console.error("clock marker"); process.exit(1); }
  const sec = `<section className="sec phases-sec" id="prevent" data-rail="Prevention">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <span className="eyebrow rv"><span className="dot" />Prevention first</span>
              <h2 className="h2 words" data-words>We do our best work <b>before it snows.</b></h2>
            </div>
            <p className="lead rv d1">Snow that never bonds to the pavement lifts clean. So every Novus storm starts hours before the first flake, not after the last one.</p>
          </div>
          <div className="phases">
            <div className="phase rv"><div className="pk">Before</div><h3>Pre-treated</h3><p>Entrances, sidewalks and lot lanes treated ahead of the storm so snow and ice can't bond to the surface.</p></div>
            <div className="phase rv d1"><div className="pk">During</div><h3>Cleared as it falls</h3><p>Plows and hand crews work the storm at the depths set in your plan, so nothing packs down into ice.</p></div>
            <div className="phase rv d2"><div className="pk">After</div><h3>Re-treated against refreeze</h3><p>Melt treated before overnight temperatures turn it into black ice. Piles hauled if space runs out.</p></div>
          </div>
          <a className="btn btn-ink rv" href="/how-it-works" style={{ marginTop: 48 }}>See the full storm protocol <span className="arr">→</span></a>
        </div>
      </section>
      `;
  s2 = s2.replace(mark, sec + mark);
  fs.writeFileSync(P, s2);
  console.log("prevent ok");
}

// 11. init script: shared nav handles itself; six services
{
  const I = "src/lib/novus-init.js";
  let t = fs.readFileSync(I, "utf8");
  const r2 = (a, b) => { if (!t.includes(a)) { console.error("INIT MISSING:", a.slice(0, 70)); process.exit(1); } t = t.replace(a, b); };
  r2("    nav.classList.toggle('solid',y>window.innerHeight*0.75);\n", "");
  r2("  var burger=document.getElementById('burger'),mm=document.getElementById('mmenu');\n  burger.addEventListener('click',function(){mm.classList.toggle('open')});\n  mm.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){mm.classList.remove('open')})});\n", "  void nav; /* the shared SiteNav component handles the nav and mobile menu */\n");
  r2("var caps=['Lots and roads, <b>pushed clear</b>','Ice stopped <b>before it sets</b>','Frontages <b>safe and passable</b>','Stairs, ramps, <b>every doorway</b>','Piles <b>gone, spaces back</b>'];",
     "var caps=['Ice stopped <b>before it forms</b>','Lots and roads, <b>pushed clear</b>','Melt that <b>never refreezes</b>','Frontages <b>safe and passable</b>','Stairs, ramps, <b>every doorway</b>','Piles <b>gone, spaces back</b>'];");
  fs.writeFileSync(I, t);
  console.log("init ok");
}
