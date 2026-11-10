import fs from "fs"; import crypto from "crypto";
const md5=s=>crypto.createHash("md5").update(s).digest("hex");
const d=JSON.parse(fs.readFileSync("/tmp/sb/p9.json","utf8"));
fs.copyFileSync("src/content/pages.js","/tmp/sb/cur9.mjs");
const {PAGES}=await import("/tmp/sb/cur9.mjs");
const S={html:PAGES[""].html, js:fs.readFileSync("public/assets/js/home.js","utf8"), css:fs.readFileSync("public/assets/css/home.css","utf8")};
for(const [k,o,n] of d.patch){ const c=S[k].split(o).length-1; if(c!==1){ console.log("FAIL",k,c,o.slice(0,50)); process.exit(1);} S[k]=S[k].replace(o,()=>n.replace("__CSS__",()=>d.css)); }
if(S.html.split(d.old_sheet).length!==2){ console.log("FAIL sheet home"); process.exit(1); }
const chk=S.html.replace(d.old_sheet,()=>d.new_sheet).replaceAll("https://surreybuilding.com","https://designbuildsurrey.co.uk");
if(md5(chk)!==d.md5.html||md5(S.js)!==d.md5.js||md5(S.css)!==d.md5.css){ console.log("MISMATCH",md5(chk),md5(S.js),md5(S.css)); process.exit(1); }
PAGES[""].html=S.html; let n=0;
for(const k in PAGES){ const p=PAGES[k]; if(p.html.includes(d.old_sheet)){ p.html=p.html.replace(d.old_sheet,()=>d.new_sheet); n++; }
  p.css=(p.css||[]).map(u=>u.startsWith("/assets/css/shared.css")?"/assets/css/shared.css?v=2":u.startsWith("/assets/css/home.css")?"/assets/css/home.css?v=9":u);
  p.js=(p.js||[]).map(u=>u.startsWith("/assets/js/home.js")?"/assets/js/home.js?v=9":u); }
console.log("sheets replaced",n,"of",Object.keys(PAGES).length);
fs.writeFileSync("src/content/pages.js","// Generated. Every page of the site: meta, schema and HTML.\nexport const PAGES = "+JSON.stringify(PAGES)+";\n");
fs.writeFileSync("public/assets/js/home.js",S.js); fs.writeFileSync("public/assets/css/home.css",S.css);
const sh=fs.readFileSync("public/assets/css/shared.css","utf8"); if(!sh.includes("menu v2")) fs.writeFileSync("public/assets/css/shared.css",sh+d.menucss);
console.log("written");
