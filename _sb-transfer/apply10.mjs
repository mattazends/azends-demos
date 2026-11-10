import fs from "fs"; import crypto from "crypto";
const md5=s=>crypto.createHash("md5").update(s).digest("hex");
const d=JSON.parse(fs.readFileSync("/tmp/sb/p10.json","utf8"));
fs.copyFileSync("src/content/pages.js","/tmp/sb/cur10.mjs");
const {PAGES}=await import("/tmp/sb/cur10.mjs");
const S={html:PAGES[""].html, js:fs.readFileSync("public/assets/js/home.js","utf8"), css:fs.readFileSync("public/assets/css/home.css","utf8")};
for(const [k,o,n] of d.patch){ const c=S[k].split(o).length-1; if(c!==1){ console.log("FAIL",k,c,o.slice(0,50)); process.exit(1);} S[k]=S[k].replace(o,()=>n.replace("__CSS__",()=>d.css)); }
const chk=S.html.replaceAll("https://surreybuilding.com","https://designbuildsurrey.co.uk");
if(md5(chk)!==d.md5.html||md5(S.js)!==d.md5.js||md5(S.css)!==d.md5.css){ console.log("MISMATCH"); process.exit(1); }
PAGES[""].html=S.html;
PAGES[""].css=PAGES[""].css.map(u=>u.startsWith("/assets/css/home.css")?"/assets/css/home.css?v=10":u);
PAGES[""].js=PAGES[""].js.map(u=>u.startsWith("/assets/js/home.js")?"/assets/js/home.js?v=10":u);
fs.writeFileSync("src/content/pages.js","// Generated. Every page of the site: meta, schema and HTML.\nexport const PAGES = "+JSON.stringify(PAGES)+";\n");
fs.writeFileSync("public/assets/js/home.js",S.js); fs.writeFileSync("public/assets/css/home.css",S.css); console.log("written");
