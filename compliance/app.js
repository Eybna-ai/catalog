/* Terpene Compliance Index - Eybna. Loader for eybna.com. Data files are in the same folder. */
(function(){
var SELF=(document.currentScript&&document.currentScript.src)||'';
var DEFAULT_BASE=SELF?SELF.replace(/[^\/]*$/,''):'https://eybna-ai.github.io/catalog/compliance/';
var LIBS=['https://cdn.jsdelivr.net/npm/d3@7.9.0/dist/d3.min.js','https://cdn.jsdelivr.net/npm/topojson-client@3.1.0/dist/topojson-client.min.js'];
var FONT='https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300..700&display=swap';
var CSS="/* Layout: globe stage left, jurisdiction panel right, timeline strip below. Light theme aligned with eybna.com: white canvas, #F5F5F7 surfaces, near-black ink, Inter throughout. */\n:host{\n  display:block;width:100%;color-scheme:light;background:var(--void);color:var(--ink);font:400 15px/1.5 var(--sans);font-optical-sizing:auto;-webkit-font-smoothing:antialiased;text-align:left;\n  --void:#ffffff; --deep:#f5f5f7; --glass:#ffffff; --glass-2:#f5f5f7;\n  --line:#eaeaee; --line-2:#dcdce2; --tint:rgba(5,5,55,.04); --tint-2:rgba(5,5,55,.08);\n  --ink:#050505; --ink-2:rgba(5,5,5,.7); --muted:rgba(5,5,5,.6); --faint:#85838a;\n  --accent:#050505; --accent-2:#489887; --on-accent:#ffffff; --link:#489887;\n  --open:#8fe0a8; --cond:#f4b740; --restr:#f08a5d; --closed:#e8688e; --unk:#9a93c2; --na:#2f2a4a;\n  --shadow:0 10px 36px rgba(0,0,0,.08);\n  --display:\"Inter\",Helvetica,Arial,sans-serif;\n  --sans:\"Inter\",\"Helvetica Neue\",Helvetica,Arial,sans-serif;\n  --mono:\"Inter\",\"Helvetica Neue\",Helvetica,Arial,sans-serif;\n}\n*{box-sizing:border-box}\n#sky{display:none}\n.app{position:relative;z-index:1;max-width:1440px;margin:0 auto;padding-inline:16px;padding-block:28px 40px;display:flex;flex-direction:column;gap:20px;min-height:100%}\nheader{display:grid;grid-template-columns:minmax(0,1fr) auto;align-items:center;gap:18px 18px;padding-bottom:4px}\n.brand{grid-column:1/-1;min-width:0}\nheader .ctrls{grid-column:1;grid-row:2}\nheader .seg{grid-column:2;grid-row:2;justify-self:end}\n.brand .eyebrow{font:500 12px var(--sans);letter-spacing:.06em;text-transform:uppercase;color:var(--ink)}\n.brand h1{font:500 clamp(30px,3.6vw,44px)/1.08 var(--display);margin:10px 0 8px;letter-spacing:-.022em;text-wrap:balance}\n.brand h1 span{color:var(--faint)}\n.brand p{margin:0;font:400 14px/1.4 var(--sans);color:var(--muted)}\n.seg{display:inline-flex;flex-wrap:wrap;gap:6px}\n.seg button{font:500 13px var(--sans);border:0;box-shadow:inset 0 0 0 1px var(--line);background:#fff;color:var(--ink);padding:8px 14px;border-radius:8px;cursor:pointer}\n.seg button:hover{background:var(--tint)}\n.seg button[aria-pressed=\"true\"]{background:var(--ink);color:#fff;box-shadow:none}\n.field{font:400 14px var(--sans);padding:8px 12px;border:0;box-shadow:inset 0 0 0 1px var(--line-2);border-radius:8px;background:#fff;color:var(--ink)}\n.field::placeholder{color:var(--faint)}\n#prod{max-width:260px;-webkit-appearance:none;appearance:none;padding-right:38px;background:#fff url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M2.5 4.5 6 8l3.5-3.5' fill='none' stroke='%23050505' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\") no-repeat right 13px center;cursor:pointer}\n.combo{position:relative;width:260px;max-width:100%}\n.combo #q{width:100%;padding-right:40px}\n.combo-btn{position:absolute;right:5px;top:50%;transform:translateY(-50%);width:30px;height:30px;border:0;border-radius:6px;background:transparent url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M2.5 4.5 6 8l3.5-3.5' fill='none' stroke='%23050505' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\") no-repeat center;cursor:pointer}\n.combo-btn:hover{background-color:var(--tint)}\n.combo[data-open] .combo-btn{transform:translateY(-50%) rotate(180deg)}\n.combo-list{position:absolute;z-index:30;left:0;right:0;top:calc(100% + 6px);max-height:340px;overflow:auto;margin:0;padding:4px;list-style:none;background:#fff;border-radius:10px;box-shadow:var(--shadow),inset 0 0 0 1px var(--line)}\n.combo-list li{padding:7px 10px;border-radius:6px;font-size:14px;cursor:pointer;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\n.combo-list li:hover,.combo-list li.act{background:var(--tint-2)}\n.combo-list li.cur{font-weight:600}\n.combo-list li.none{color:var(--muted);cursor:default;background:none}\nbutton:focus-visible,input:focus-visible,select:focus-visible,a:focus-visible{outline:2px solid var(--ink);outline-offset:2px}\n.main{display:grid;grid-template-columns:minmax(0,1fr) 420px;gap:16px;flex:1}\n.stage{position:relative;height:clamp(460px,calc(100vh - 290px),780px);border-radius:20px;overflow:hidden;background:radial-gradient(90% 80% at 50% 45%,#8e8e9c 0%,#777786 55%,#5f5f6e 100%)}\n#globe{position:absolute;inset:0;width:100%;height:100%;display:block;cursor:grab;touch-action:none}\n#globe:active{cursor:grabbing}\n.hint{position:absolute;left:16px;top:16px;font:500 12px var(--sans);color:rgba(255,255,255,.78)}\n.zoom{position:absolute;right:14px;top:14px;display:flex;flex-direction:column;gap:6px}\n.zoom button{width:36px;height:36px;border-radius:8px;border:0;box-shadow:inset 0 0 0 1px var(--line);background:#fff;color:var(--ink);font:500 17px var(--sans);cursor:pointer}\n.zoom button:hover{background:#fafafb}\n.legend{position:absolute;left:14px;right:14px;bottom:14px;display:flex;flex-wrap:nowrap;gap:5px;align-items:center}\n.chip{display:inline-flex;align-items:center;gap:6px;flex:none;white-space:nowrap;font:500 11px var(--sans);padding:5px 10px;border-radius:999px;border:0;box-shadow:inset 0 0 0 1px var(--line);background:#fff;color:var(--ink);cursor:pointer}\n.chip i{width:8px;height:8px;border-radius:50%;display:inline-block}\n.chip em{font:400 10.5px var(--sans);font-style:normal;color:var(--muted);font-variant-numeric:tabular-nums}\n.chip[aria-pressed=\"true\"]{box-shadow:inset 0 0 0 1.5px var(--ink)}\n.links-key{display:inline-flex;flex:none;white-space:nowrap;gap:12px;align-items:center;font:500 11px var(--sans);color:var(--muted);margin-left:auto;padding:5px 11px;border-radius:999px;background:#fff;box-shadow:inset 0 0 0 1px var(--line)}\n.links-key b{display:inline-block;width:18px;height:2px;border-radius:2px;vertical-align:middle;margin-right:6px}\n.tip{position:absolute;pointer-events:none;background:#fff;box-shadow:var(--shadow),inset 0 0 0 1px var(--line);color:var(--ink);font:500 12px var(--sans);padding:7px 11px;border-radius:8px;white-space:nowrap;transform:translate(14px,-50%)}\n.tip small{font:400 11px var(--sans);color:var(--muted);margin-left:8px}\naside{display:flex;flex-direction:column;gap:14px;min-width:0}\n.card{background:#fff;border-radius:20px;padding:24px;box-shadow:var(--shadow),inset 0 0 0 1px var(--line);min-width:0}\n.panel{overflow:auto;height:clamp(460px,calc(100vh - 290px),780px)}\n.crumb{font:500 12px var(--sans);letter-spacing:.06em;color:var(--muted);text-transform:uppercase}\n.crumb button{font:inherit;color:var(--ink);background:none;border:0;padding:0;cursor:pointer;text-transform:uppercase;letter-spacing:inherit;text-decoration:underline;text-underline-offset:3px;text-decoration-color:var(--line-2)}\n.panel h2{font:500 32px/1.15 var(--display);letter-spacing:-.02em;margin:8px 0 16px;text-wrap:balance}\n.tabs{display:flex;gap:2px;border-bottom:1px solid var(--line);margin:0 0 18px}\n.tabs button{font:500 14px var(--sans);background:none;border:0;border-bottom:2px solid transparent;color:var(--muted);padding:8px 10px;cursor:pointer;margin-bottom:-1px}\n.tabs button[aria-selected=\"true\"]{color:var(--ink);border-bottom-color:var(--ink)}\n.tabs button em{font:400 11px var(--sans);font-style:normal;color:var(--faint);margin-left:5px;background:var(--tint);padding:1px 6px;border-radius:999px}\n.status{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:16px}\n.st{border-radius:16px;padding:12px 13px;display:flex;flex-direction:column;gap:5px;background:var(--deep);position:relative;overflow:hidden}\n.st::before{content:\"\";position:absolute;inset:0 0 auto 0;height:3px;background:var(--c)}\n.st.on{background:#fff;box-shadow:inset 0 0 0 1px var(--line-2)}\n.k,.lbl{font:500 11px var(--sans);letter-spacing:.06em;text-transform:uppercase;color:var(--muted)}\n.st .v{font-weight:600;font-size:14px;color:var(--ink);display:flex;align-items:center;gap:7px}\n.st .v::before{content:\"\";width:8px;height:8px;border-radius:50%;background:var(--c);flex:none}\n.st .d{font-size:13px;color:var(--muted);line-height:1.4}\n.lead{font-size:15px;margin:0 0 18px;color:var(--ink)}\ndl{margin:0;display:flex;flex-direction:column;gap:14px}\ndt{font:500 11px var(--sans);letter-spacing:.06em;text-transform:uppercase;color:var(--muted);margin-bottom:3px}\ndd{margin:0;font-size:14px;color:var(--ink-2)}\n.watch{background:var(--deep);border-radius:12px;padding:12px 14px}\n.watch dt{color:var(--ink)}\n.codes{display:flex;flex-wrap:wrap;gap:6px;margin-top:4px}\n.code{font:500 12px var(--sans);background:var(--tint);border-radius:999px;padding:3px 9px;cursor:help;color:var(--ink)}\n.srcs{margin:0;padding-left:18px;font-size:13px}\na{color:var(--link);text-decoration-thickness:1px;text-underline-offset:2px}\n.empty{color:var(--muted);font-size:14px;background:var(--deep);border-radius:12px;padding:14px}\n.foot{font:400 12px var(--sans);color:var(--faint);margin-top:18px;padding-top:12px;border-top:1px solid var(--line)}\n/* limits table */\n.tools{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:10px;align-items:center}\n.tools input{flex:1 1 140px;min-width:0;font:400 13px var(--sans);padding:7px 10px;border:0;box-shadow:inset 0 0 0 1px var(--line-2);border-radius:8px;background:#fff;color:var(--ink)}\n.grp{font:500 12px var(--sans);padding:5px 11px;border-radius:999px;border:0;background:var(--tint);color:var(--ink);cursor:pointer}\n.grp[aria-pressed=\"true\"]{background:var(--ink);color:#fff}\n.grp em{font:400 10px var(--sans);font-style:normal;opacity:.65;margin-left:3px}\n.tbl{overflow-x:auto;border-radius:12px;box-shadow:inset 0 0 0 1px var(--line)}\ntable{border-collapse:collapse;width:100%;font-size:13px}\nth{font:500 10.5px var(--sans);letter-spacing:.06em;text-transform:uppercase;color:var(--muted);text-align:left;padding:9px 8px;background:var(--deep);position:sticky;top:0;white-space:nowrap}\nth.n{text-align:right}\ntd{padding:8px;border-top:1px solid var(--line);vertical-align:top;color:var(--ink)}\ntd.n{font:500 12.5px var(--sans);font-variant-numeric:tabular-nums;text-align:right;white-space:nowrap;color:var(--ink)}\ntd small{display:block;color:var(--faint);font-size:11.5px;line-height:1.3}\n.nd{font:600 11px var(--sans);color:#c23a62}\ntable.sec td.n{white-space:normal;width:38%;min-width:120px}\ntable.sec td.n small{word-break:break-word}\n.meta{font-size:12.5px;color:var(--muted);margin:10px 0 0}\n.meta b{color:var(--ink);font-weight:500}\n/* products */\n.pintro{display:flex;align-items:baseline;justify-content:space-between;gap:10px;margin-bottom:12px}\n.pcount{font:500 44px/1 var(--display);letter-spacing:-.03em;color:var(--ink);font-variant-numeric:tabular-nums}\n.line-g{margin-top:16px}\n.line-g h4{margin:0 0 8px;font:500 11px var(--sans);letter-spacing:.06em;text-transform:uppercase;color:var(--muted);display:flex;justify-content:space-between}\n.pills{display:flex;flex-wrap:wrap;gap:6px}\n.pill{font:500 13px var(--sans);padding:6px 12px;border-radius:999px;background:var(--tint);color:var(--ink)}\n.pill{text-decoration:none;transition:background .15s,color .15s}\na.pill:hover,a.pill:focus-visible{background:var(--tint-2);color:var(--ink);outline:none}\n.pill.hl{background:var(--ink);color:#fff}\n.cta-row{display:flex;flex-wrap:wrap;gap:8px;margin-top:20px}\n.cta{display:inline-flex;align-items:center;gap:8px;padding:10px 16px;border-radius:8px;text-decoration:none;font:500 14px var(--sans)}\n.cta.pri{background:var(--ink);color:#fff}\n.cta.pri:hover{background:#26252b}\n.cta.sec{background:var(--tint-2);color:var(--ink)}\n.cta.sec:hover{background:rgba(5,5,55,.12)}\n.note{font-size:13px;color:var(--muted);margin:14px 0 0}\n.why-box{border-radius:16px;padding:16px;background:var(--deep)}\n.why-box .lbl{color:var(--ink)}\n.why-box p{margin:8px 0 0;font-size:14.5px;color:var(--ink-2)}\n.why-rule{display:flex;flex-direction:column;gap:3px;padding-top:10px;border-top:1px solid var(--line-2)}\n.why-rule span:last-child{font-size:13.5px;color:var(--muted)}\n/* timeline: sticky strip pinned to the bottom of the viewport */\n.tlbar{position:sticky;bottom:0;z-index:5;margin-inline:-16px;padding:10px 16px calc(10px + env(safe-area-inset-bottom,0px));background:rgba(255,255,255,.94);backdrop-filter:saturate(1.4) blur(8px);-webkit-backdrop-filter:saturate(1.4) blur(8px);box-shadow:0 -1px 0 var(--line),0 -8px 24px rgba(5,5,55,.05);display:flex;align-items:center;gap:14px}\n.timeline{display:flex;gap:8px;overflow-x:auto;padding:2px;flex:1;min-width:0;scrollbar-width:thin}\n.tl{flex:0 0 auto;display:flex;flex-direction:column;gap:2px;padding:7px 12px;border-radius:12px;border:0;box-shadow:inset 0 0 0 1px var(--line);background:#fff;cursor:pointer;color:var(--ink);font:inherit;text-align:left;width:250px;transition:background .15s}\n.tl:hover{background:var(--deep)}\n.tl .row{display:flex;justify-content:space-between;gap:8px;align-items:baseline}\n.tl .dt{font:600 11.5px var(--sans);color:var(--ink)}\n.tl .t{font-size:12.5px;line-height:1.3;color:var(--ink-2);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\n.tl .in{font:500 10.5px var(--sans);color:var(--faint);white-space:nowrap}\n.tl.soon .in{color:#fff;background:var(--ink);padding:1px 7px;border-radius:999px}\n.tl.past{opacity:.5}\n.tl-h{flex:none;font:500 11px/1.3 var(--sans);letter-spacing:.06em;text-transform:uppercase;color:var(--ink);margin:0;width:84px}\n@media (max-width:1320px){.legend{flex-wrap:wrap}.links-key{margin-left:0}}\n@media (max-width:1000px){\n  .hint{display:none}\n  header{grid-template-columns:1fr}\n  header .ctrls,header .seg{grid-column:1;justify-self:stretch}\n  header .seg{grid-row:2}\n  header .ctrls{grid-row:3}\n  .main{grid-template-columns:1fr}\n  .stage{height:62vh;max-height:620px;min-height:380px}\n  .panel{height:auto;max-height:none;min-height:0}\n  .tl-h{display:none}\n  .tl{width:220px}\n  #prod,.combo{width:100%;max-width:none}\n  .ctrls{flex:1 1 100%;display:flex;flex-wrap:wrap;gap:8px}\n  .ctrls>*{flex:1 1 180px}\n  .links-key{display:none}\n}\n@media (prefers-reduced-motion:reduce){*{transition:none!important;animation:none!important}}";
var HTML="<canvas id=\"sky\" aria-hidden=\"true\"></canvas>\n<div class=\"app\">\n  <header>\n    <div class=\"brand\">\n      <div class=\"eyebrow\">Eybna \u00b7 Regulatory atlas</div>\n      <h1>Terpene <span>Compliance Index</span></h1>\n      <p id=\"asof\">Terpene and flavor rules for cannabis products, mapped worldwide</p>\n    </div>\n    <div class=\"seg\" role=\"group\" aria-label=\"Product type\">\n      <button data-mode=\"vape\" aria-pressed=\"true\">Vapes &amp; concentrates</button>\n      <button data-mode=\"preroll\" aria-pressed=\"false\">Pre-rolls</button>\n      <button data-mode=\"fnb\" aria-pressed=\"false\">Food &amp; beverage</button>\n      <button data-mode=\"cosm\" aria-pressed=\"false\">Cosmetics</button>\n    </div>\n    <div class=\"ctrls\" style=\"display:flex;gap:8px;flex-wrap:wrap\">\n      <select id=\"prod\" class=\"field\" aria-label=\"Highlight where an Eybna blend fits\"><option value=\"\">Highlight a blend\u2026</option></select>\n      <div class=\"combo\" id=\"qwrap\"><input id=\"q\" class=\"field\" role=\"combobox\" aria-expanded=\"false\" aria-controls=\"qlist\" aria-autocomplete=\"list\" placeholder=\"Find a state or country\" aria-label=\"Find a state or country\" autocomplete=\"off\"><button type=\"button\" class=\"combo-btn\" id=\"qbtn\" tabindex=\"-1\" aria-label=\"Show all states and countries\"></button><ul class=\"combo-list\" id=\"qlist\" role=\"listbox\" aria-label=\"States and countries\" hidden></ul></div>\n    </div>\n  </header>\n\n  <div class=\"main\">\n    <section class=\"stage\" aria-label=\"Globe\">\n      <canvas id=\"globe\" aria-label=\"Interactive globe. Drag to rotate, scroll to zoom, click a state or country.\"></canvas>\n      <div class=\"hint\">Drag to orbit \u00b7 scroll to zoom \u00b7 click a region</div>\n      <div class=\"zoom\">\n        <button id=\"zin\" aria-label=\"Zoom in\">+</button>\n        <button id=\"zout\" aria-label=\"Zoom out\">&minus;</button>\n        <button id=\"zreset\" aria-label=\"Reset view\" style=\"font-size:13px\">&#8634;</button>\n      </div>\n      <div class=\"legend\" id=\"legend\" aria-label=\"Legend\"></div>\n      <div class=\"tip\" id=\"tip\" hidden></div>\n    </section>\n    <aside>\n      <article class=\"card panel\" id=\"panel\" aria-live=\"polite\"></article>\n    </aside>\n  </div>\n\n  <section class=\"tlbar\" aria-labelledby=\"tlh\">\n    <h3 class=\"tl-h\" id=\"tlh\">Regulatory timeline</h3>\n    <div class=\"timeline\" id=\"timeline\"></div>\n  </section>\n</div>";
function lib(u){return new Promise(function(ok,no){var s=document.querySelector('script[data-eci="'+u+'"]');if(s){if(s.dataset.done)return ok();s.addEventListener('load',ok);s.addEventListener('error',no);return;}s=document.createElement('script');s.src=u;s.dataset.eci=u;s.onload=function(){s.dataset.done='1';ok();};s.onerror=no;document.head.appendChild(s);});}
async function run(root,BASE){
const STATUS={open:"Open",cond:"Conditional",restr:"Restricted",closed:"Closed",unk:"Unclear",na:"No market"};
const STATUS_DESC={open:"Natural botanical blends allowed with standard documentation",cond:"Allowed with approval, flavor limits or grade requirements",restr:"Cannabis-derived only, or cannabis flavor only",closed:"A rule specifically bars added terpenes or additives",unk:"Rules not found or not verified",na:"Product type not permitted or no legal market"};
const GROUPS={pesticide:"Pesticides",residual_solvent:"Solvents",heavy_metal:"Metals",mycotoxin:"Mycotoxins",other:"Other"};
const CATALOG='https://eybna-ai.github.io/catalog/';
const C={};['open','cond','restr','closed','unk','na','accent','accent-2'].forEach(k=>C[k]=getComputedStyle(root.host).getPropertyValue('--'+k).trim());
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;

const get=u=>fetch(BASE+u).then(r=>{if(!r.ok)throw new Error(u);return r.json();});
const [world,us,canada,D,L,FIT,PRODS,LINKS,CDOL,SEC]=await Promise.all(['countries-lite.json','states.json','canada-lite.json','data.json','limits.json','fit.json','products.json','links.json','why.json','limits-sector.json'].map(get));const FNBL0=await get('fnb.json').catch(()=>null);const CX0=await get('cosm-excl.json').catch(()=>null);const COSMX=CX0?{z:new Set(CX0.zones),c:new Set(CX0.codes),l:null}:null;const CDO=new Set(CDOL);const ECIG=new Set(['c:410','c:442','c:470','c:710','c:724','c:688']);const FNB=new Set(['c:688','c:578','c:528','c:764','c:724','c:276','c:356','us:15','c:710','c:410','c:442','c:470']);
const J=D.j,EU=new Set(D.euMembers),LZ=L.zones;
const PBY=new Map(PRODS.map(p=>[p.code,p]));
root.getElementById('asof').textContent='Rules as of '+fmtDate(D.asOf)+' · action limits as of '+fmtDate(L.asOf);

// the lite world file lost Antarctica's mainland ring; swap in the full outline when available
const ANT=await get('antarctica.json').catch(()=>null);
const countries=topojson.feature(world,world.objects.countries).features.map(f=>({f:ANT&&f.id==='010'?ANT:f,key:'c:'+f.id,name:f.properties.name}));
const states=topojson.feature(us,us.objects.states).features.map(f=>({f,key:'us:'+f.id,name:f.properties.name}));
const provs=canada.features.map(f=>({f,key:'ca:'+f.id,name:f.properties.name.replace('Québec','Quebec')}));
const subs=[...states,...provs],all=[...subs,...countries];
const byKey=new Map(all.map(x=>[x.key,x]));
const countryBorders=topojson.mesh(world,world.objects.countries,(a,b)=>a!==b);
const coast=topojson.mesh(world,world.objects.countries,(a,b)=>a===b&&!(ANT&&a.id==='010'));
const stateBorders=topojson.mesh(us,us.objects.states,(a,b)=>a!==b);
all.forEach(x=>{x.b=d3.geoBounds(x.f);});
const centroid=k=>{if(k==='eu')return [10,50];if(k==='c:840')return [-98,39];if(k==='c:124')return [-100,56];if(k==='us:02')return [-152,63];if(k==='c:250')return [2.5,46.6];if(k==='c:528')return [5.3,52.2];if(k==='c:554')return [172,-41.5];const x=byKey.get(k);return x?d3.geoCentroid(x.f):null;};

// ---- data helpers
const norm=s=>String(s||'').toLowerCase().replace(/[^a-z0-9]/g,'');
function parentOf(z){const d=LZ[z];if(d&&d.status==='inherits'&&d.inherits_from)return d.inherits_from;if(!d&&z.startsWith('ca:'))return 'c:124';if(!d&&z.startsWith('c:')&&EU.has(z.slice(2)))return 'eu';return null;}
function limitsZone(z){const d=LZ[z];if(d&&d.status!=='inherits')return z;const p=parentOf(z);return p&&LZ[p]?p:null;}
function resolve(key){
  const x=byKey.get(key);
  if(J[key])return {...J[key],key};
  if(key.startsWith('us:'))return {key,name:x?x.name:(LZ[key]||{}).name||key,parent:'United States',vape:['unk','Not yet mapped'],preroll:['unk','Not yet mapped'],summary:'Ingredient rules for this state are not mapped yet. See the action limits tab for its lab-testing limits.',up:'c:840'};
  if(key.startsWith('ca:')){const f=J['c:124'];return {...f,key,name:x?x.name:key,parent:'Canada',summary:'No provincial overlay found; federal Cannabis Regulations apply. '+f.summary,inherit:'c:124',watch:null};}
  if(key.startsWith('c:')&&EU.has(key.slice(2))){const e=J.eu;return {...e,key,name:x?x.name:key,parent:'European Union',summary:'No national review yet; EU baseline shown. '+e.summary,inherit:'eu'};}
  if(key==='eu')return {...J.eu,key};
  return {key,name:x?x.name:key,vape:['na','Not mapped'],preroll:['na','Not mapped'],summary:'Not covered in this map yet.',none:true};
}
const NONCAN={fnb:'food & beverage',cosm:'cosmetics'};let ALLC=null,FNBL=FNBL0;
function ruleStatus(key){if(NONCAN[st.mode])return null;if(J[key])return J[key][st.mode][0];if(key.startsWith('ca:'))return J['c:124'][st.mode][0];if(key.startsWith('c:')&&EU.has(key.slice(2)))return J.eu[st.mode][0];return null;}
const fitList=k=>{if(st.mode==='fnb'&&FNBL)return FNBL;if(st.mode==='cosm'&&COSMX&&COSMX.z.has(k)){ALLC=ALLC||[...PRODS].sort((a,b)=>a.name.localeCompare(b.name)).map(p=>p.code);return COSMX.l||(COSMX.l=ALLC.filter(c=>!COSMX.c.has(c)));}if(NONCAN[st.mode])return ALLC||(ALLC=[...PRODS].sort((a,b)=>a.name.localeCompare(b.name)).map(p=>p.code));const f=FIT[k]||(parentOf(k)&&FIT[parentOf(k)]);return f?f[st.mode]||[]:null;};
function colorKey(key){
  if(NONCAN[st.mode])return st.prod&&!fitList(key).includes(st.prod)?'na':'open';
  if(st.prod){const l=fitList(key);if(l==null)return ruleStatus(key)?'unk':null;return l.includes(st.prod)?'open':'na';}
  return ruleStatus(key);
}

// ---- state
const st={mode:'vape',sel:'us:06',hover:null,filter:null,k:1,rot:[100,-30,0],tab:'rules',prod:'',lgroup:'all',lq:'',pq:'',idle:0};
try{const m=localStorage.getItem('ecg-mode');if(['vape','preroll','fnb','cosm'].includes(m))st.mode=m;}catch(e){}

const SPR={};function sprite(col){if(SPR[col])return SPR[col];const m=col.match(/\d+(\.\d+)?/g).slice(0,3).join(',');const c=document.createElement('canvas');c.width=c.height=32;const x=c.getContext('2d');const g=x.createRadialGradient(16,16,0,16,16,16);g.addColorStop(0,`rgba(${m},1)`);g.addColorStop(.22,`rgba(${m},.6)`);g.addColorStop(.55,`rgba(${m},.15)`);g.addColorStop(1,`rgba(${m},0)`);x.fillStyle=g;x.fillRect(0,0,32,32);return SPR[col]=c;}
const rgbOf=hex=>{const n=parseInt(hex.replace('#',''),16);return `rgb(${n>>16&255},${n>>8&255},${n&255})`;};
// ---- background: plain light page (sky canvas kept hidden for structure)
function buildSky(){}
function drawSky(){}

// ---- globe
const canvas=root.getElementById('globe'),ctx=canvas.getContext('2d');const tip=root.getElementById('tip'),panel=root.getElementById('panel');
const proj=d3.geoOrthographic().clipAngle(90).precision(0.6);const path=d3.geoPath(proj,ctx);const grat=d3.geoGraticule10();
let W=0,H=0,R=0,dpr=1;
function size(){const r=canvas.getBoundingClientRect();dpr=Math.min(2,devicePixelRatio||1);W=r.width;H=r.height;canvas.width=W*dpr;canvas.height=H*dpr;R=Math.min(W,H)/2*0.8;}
function alpha(hex,a){const h=hex.replace('#','');const n=parseInt(h.length===3?h.split('').map(c=>c+c).join(''):h,16);return `rgba(${n>>16&255},${n>>8&255},${n&255},${a})`;}
const LAND='#ffffff';let cache=new Map();function recolor(){cache=new Map();}
function fillFor(key){let s=cache.get(key);if(s===undefined){s=colorKey(key)||null;cache.set(key,s);}
  if(!s)return LAND;const a=st.filter&&st.filter!==s?0.12:(s==='na'?0.55:0.85);return alpha(C[s],a);}
// 3D point for lifted arcs
const rad=Math.PI/180;
function p3(lonlat,h){const rot=d3.geoRotation(proj.rotate())(lonlat);const l=rot[0]*rad,p=rot[1]*rad;const s=(1+h);return [s*Math.cos(p)*Math.sin(l),s*Math.sin(p),s*Math.cos(p)*Math.cos(l)];}
const LINKC=LINKS.map(l=>({...l,ca:centroid(l.a),cb:centroid(l.b)})).filter(l=>l.ca&&l.cb);
LINKC.forEach(l=>{l.interp=d3.geoInterpolate(l.ca,l.cb);l.dist=d3.geoDistance(l.ca,l.cb);l.ph=Math.random();});
const NODES=[...new Set([...Object.keys(J),...Object.keys(LZ)])].filter(k=>k!=='c:840'&&k!=='c:124'||true).map(k=>({k,c:centroid(k)})).filter(n=>n.c);
function drawArc(l,t,hot){
  const k=R*st.k,cx=W/2,cy=H/2,N=40,h=Math.min(.2,.05+l.dist*.12);const pts=[];
  for(let i=0;i<=N;i++){const u=i/N;const q=p3(l.interp(u),h*Math.sin(Math.PI*u));const vis=q[2]>0;pts.push([cx+k*q[0],cy-k*q[1],vis]);}
  const col=l.kind==='inherits'?'72,152,135':'5,5,5';const base=(hot?.85:(st.sel&&(l.a===st.sel||l.b===st.sel)?.7:.22+l.w*.2))*(l.kind==='inherits'?1:.55);
  ctx.beginPath();let pen=false;for(const [x,y,v] of pts){if(v){pen?ctx.lineTo(x,y):ctx.moveTo(x,y);pen=true;}else pen=false;}
  ctx.lineWidth=hot?4:3;ctx.strokeStyle=`rgba(${col},${base*.12})`;ctx.stroke();
  ctx.lineWidth=hot?1.6:1;ctx.strokeStyle=`rgba(${col},${base})`;ctx.stroke();
  if(!reduce){const u=((t*.00018/(.3+l.dist))+l.ph)%1;const i=Math.floor(u*N);const pp=pts[i];if(pp&&pp[2]){ctx.beginPath();ctx.arc(pp[0],pp[1],hot?3:2.2,0,6.283);ctx.fillStyle=`rgb(${col})`;ctx.fill();}}
}
// starfield behind the globe: fixed seeded field, drifts with longitude for a sense of orbit
let STARS=[],starsFor='';
function buildStars(){const rnd=d3.randomLcg(7),n=Math.round(W*H/2400),SW=W*1.6;
  STARS=d3.range(n).map(()=>{const big=rnd()<.06;return {x:rnd()*SW,y:rnd()*H,r:big?1.2+rnd()*1.1:.45+rnd()*.8,a:big?.8+rnd()*.2:.5+rnd()*.45,tw:rnd()*6.28,big};});starsFor=W+'x'+H;}
function drawStars(t){if(starsFor!==W+'x'+H)buildStars();const SW=W*1.6,off=((st.rot[0]*1.2)%SW+SW)%SW;
  for(const s of STARS){let x=s.x-off;if(x<0)x+=SW;if(x>W)continue;const a=reduce?s.a:s.a*(.7+.3*Math.sin(t*.0012+s.tw));
    ctx.fillStyle=`rgba(255,255,255,${a})`;ctx.beginPath();ctx.arc(x,s.y,s.r,0,6.283);ctx.fill();
    if(s.big){ctx.strokeStyle=`rgba(255,255,255,${a*.55})`;ctx.lineWidth=.6;const L=s.r*4;ctx.beginPath();ctx.moveTo(x-L,s.y);ctx.lineTo(x+L,s.y);ctx.moveTo(x,s.y-L);ctx.lineTo(x,s.y+L);ctx.stroke();}}}
function render(t){
  if(!W)return;proj.translate([W/2,H/2]).scale(R*st.k).rotate(st.rot);const k=R*st.k,cx=W/2,cy=H/2;
  ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,W,H);
  drawStars(t);
  // soft drop shadow under the sphere
  ctx.save();ctx.shadowColor='rgba(5,5,40,.22)';ctx.shadowBlur=44;ctx.shadowOffsetY=12;ctx.beginPath();path({type:'Sphere'});ctx.fillStyle='#ffffff';ctx.fill();ctx.restore();
  // ocean: white with a faint grey falloff to the limb
  let g=ctx.createRadialGradient(cx-k*.3,cy-k*.35,k*.1,cx,cy,k);g.addColorStop(0,'#efeff3');g.addColorStop(.7,'#e3e3e9');g.addColorStop(1,'#d5d5dd');ctx.fillStyle=g;ctx.beginPath();path({type:'Sphere'});ctx.fill();
  ctx.beginPath();path(grat);ctx.strokeStyle='rgba(5,5,5,.06)';ctx.lineWidth=.6;ctx.stroke();
  // land
  for(const c of countries){ctx.beginPath();path(c.f);ctx.fillStyle=(c.key==='c:840'||c.key==='c:124')?LAND:fillFor(c.key);ctx.fill();}
  for(const s of subs){ctx.beginPath();path(s.f);ctx.fillStyle=fillFor(s.key);ctx.fill();}
  // borders
  ctx.beginPath();path(stateBorders);for(const p of provs)path(p.f);ctx.strokeStyle='rgba(5,5,5,.22)';ctx.lineWidth=.5;ctx.stroke();
  ctx.beginPath();path(countryBorders);ctx.strokeStyle='rgba(5,5,5,.4)';ctx.lineWidth=.6;ctx.stroke();
  ctx.beginPath();path(coast);if(ANT)path(ANT);ctx.strokeStyle='rgba(5,5,5,.7)';ctx.lineWidth=.7;ctx.stroke();
  // hover/selection
  if(st.hover&&st.hover!==st.sel){const h=byKey.get(st.hover);if(h){ctx.beginPath();path(h.f);ctx.strokeStyle='rgba(5,5,5,.75)';ctx.lineWidth=1.2;ctx.stroke();}}
  const s=byKey.get(st.sel);if(s){ctx.beginPath();path(s.f);ctx.strokeStyle='rgba(5,5,5,.14)';ctx.lineWidth=6;ctx.stroke();ctx.strokeStyle='#050505';ctx.lineWidth=1.8;ctx.stroke();}
  // nodes
  for(const n of NODES){const q=p3(n.c,0);if(q[2]<=0.05)continue;const x=cx+k*q[0],y=cy-k*q[1];const ck=colorKey(n.k);if(!ck||ck==='na')continue;
    const pulse=reduce?1:.85+.15*Math.sin(t*.003+n.c[0]);const r=(n.k===st.sel?5:3.2)*pulse;ctx.beginPath();ctx.arc(x,y,r,0,6.283);ctx.fillStyle=C[ck];ctx.fill();ctx.lineWidth=1.2;ctx.strokeStyle='#fff';ctx.stroke();}
  // arcs
  if(!st.prod&&st.hover)for(const l of LINKC)if(l.a===st.hover||l.b===st.hover)drawArc(l,t,true);
}
function inBounds(b,[lon,lat]){if(lat<b[0][1]-0.01||lat>b[1][1]+0.01)return false;return b[0][0]<=b[1][0]?(lon>=b[0][0]-0.01&&lon<=b[1][0]+0.01):(lon>=b[0][0]||lon<=b[1][0]);}
function pick(px,py){const ll=proj.invert([px,py]);if(!ll||isNaN(ll[0]))return null;const r=proj.rotate();if(d3.geoDistance(ll,[-r[0],-r[1]])>Math.PI/2)return null;
  for(const s of subs)if(inBounds(s.b,ll)&&d3.geoContains(s.f,ll))return s.key;for(const c of countries)if(inBounds(c.b,ll)&&d3.geoContains(c.f,ll))return c.key;return null;}
let lastT=d3.zoomIdentity,prog=false;const touch=()=>{st.idle=performance.now();};
const zoom=d3.zoom().scaleExtent([1,14]).on('zoom',e=>{const t=e.transform;if(!prog){touch();if(t.k!==lastT.k)st.k=t.k;else{const f=180/Math.PI/(R*st.k);st.rot[0]+=(t.x-lastT.x)*f;st.rot[1]=Math.max(-89,Math.min(89,st.rot[1]-(t.y-lastT.y)*f));}}lastT=t;tip.hidden=true;});
const sel=d3.select(canvas).call(zoom).on('dblclick.zoom',null);
function setK(k){prog=true;st.k=k;sel.call(zoom.transform,d3.zoomIdentity.scale(k));prog=false;}
let anim=null;
function animateTo(rot,k){touch();if(anim)anim.stop();const r0=st.rot.slice(),k0=st.k;const ir=d3.interpolate(r0,[r0[0]+(((rot[0]-r0[0])%360+540)%360-180),rot[1],0]);const ik=d3.interpolate(k0,k);
  if(reduce){st.rot=ir(1);setK(k);return;}anim=d3.timer(el=>{const t=Math.min(1,el/1100),e=d3.easeCubicInOut(t);st.rot=ir(e);prog=true;st.k=ik(e);sel.call(zoom.transform,d3.zoomIdentity.scale(st.k));prog=false;touch();if(t>=1){anim.stop();anim=null;}});}
function flyTo(key){if(key==='eu'){animateTo([-12,-50,0],3);return;}const x=byKey.get(key);if(!x)return;const c=centroid(key);const a=Math.sqrt(d3.geoArea(x.f));const big=key==='c:840'?0.29:key==='c:124'?0.3:a;animateTo([-c[0],-c[1],0],Math.max(1.2,Math.min(10,0.42/Math.max(big,0.004))));}
root.getElementById('zin').onclick=()=>animateTo(st.rot,Math.min(14,st.k*1.6));
root.getElementById('zout').onclick=()=>animateTo(st.rot,Math.max(1,st.k/1.6));
root.getElementById('zreset').onclick=()=>animateTo([-10,-25,0],1);
canvas.addEventListener('click',e=>{const r=canvas.getBoundingClientRect();const k=pick(e.clientX-r.left,e.clientY-r.top);if(k)select(k,false);});
canvas.addEventListener('pointermove',e=>{if(e.buttons)return;const r=canvas.getBoundingClientRect();const x=e.clientX-r.left,y=e.clientY-r.top;const k=pick(x,y);st.hover=k;
  if(k){const d=resolve(k);tip.innerHTML='';tip.append(d.name);const sm=document.createElement('small');
    if(NONCAN[st.mode]){sm.textContent=st.prod?(fitList(k).includes(st.prod)?'Available':'Not listed'):'Available · '+fitList(k).length+' blends';}else if(st.prod){const l=fitList(k);sm.textContent=l&&l.includes(st.prod)?'Available':'Not listed';}else{const s=ruleStatus(k);const l=fitList(k);sm.textContent=(s?STATUS[s]:'Limits mapped')+(l&&l.length?` · ${l.length} blends`:'');}
    tip.append(sm);tip.style.left=x+'px';tip.style.top=y+'px';tip.hidden=false;canvas.style.cursor='pointer';}else{tip.hidden=true;canvas.style.cursor='';}});
canvas.addEventListener('pointerleave',()=>{tip.hidden=true;st.hover=null;});

let lastF=0;function frame(t){requestAnimationFrame(frame);
  if(t-lastF<30)return;const dt=Math.min(100,t-lastF);lastF=t;
  if(!reduce&&!anim&&performance.now()-st.idle>6000){st.rot[0]+=0.0035*dt;}
  drawSky(t);render(t);}

// ---- panel
function fmtDate(s){const d=new Date(s+'T12:00:00Z');return d.toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric',timeZone:'UTC'});}
function el(t,cls,txt){const e=document.createElement(t);if(cls)e.className=cls;if(txt!=null)e.textContent=txt;return e;}
function select(key,fly=true){st.sel=key;st.picked=true;renderPanel();if(typeof syncQ==='function')syncQ();if(fly)flyTo(key);try{history.replaceState(null,'','#'+key.replace(':','.'));}catch(e){}}
function renderPanel(){
  const d=resolve(st.sel);panel.innerHTML='';
  const crumb=el('div','crumb');
  if(d.parent){const up=d.parent==='United States'?'c:840':d.parent==='Canada'?'c:124':d.parent==='European Union'?'eu':null;if(up){const b=el('button',null,d.parent);b.onclick=()=>select(up);crumb.append(b,' ›');}else crumb.append(d.parent);}
  else crumb.textContent=st.sel.startsWith('c:')||st.sel==='eu'?'National / regional':'';
  panel.append(crumb,el('h2',null,d.name));
  const lzk=limitsZone(st.sel),lz=lzk?LZ[lzk]:null;const fl=fitList(st.sel);
  const tabs=el('div','tabs');tabs.setAttribute('role','tablist');
  [['rules','Regulations'],['limits','Action limits',NONCAN[st.mode]?(secFrames(st.sel).reduce((n,f)=>n+SEC[st.mode].frameworks[f].analytes.length,0)||null):lz?lz.analytes.length:null],['products','Eybna blends',fl?fl.length:null]].forEach(([k,l,n])=>{
    const b=el('button',null,l);b.setAttribute('role','tab');b.setAttribute('aria-selected',st.tab===k);if(n!=null)b.append(el('em',null,String(n)));
    b.onclick=()=>{st.tab=k;try{localStorage.setItem('ecg-tab',k);}catch(e){}renderPanel();};tabs.append(b);});
  panel.append(tabs);
  if(st.tab==='rules')renderRules(d);else if(st.tab==='limits')renderLimits(d,lz,lzk);else renderProducts(d,fl);
  const f=el('div','foot');f.textContent='Research, not legal advice · confirm requirements with your compliance team before launch';panel.append(f);
}
function renderIfra(d){
  const box=el('div','st on');box.style.setProperty('--c',C.open);box.append(el('span','k','Cosmetics standard'),el('span','v','IFRA Standards'),el('span','d','Applied to every market on this map'));
  const grid=el('div','status');grid.style.gridTemplateColumns='1fr';grid.append(box);panel.append(grid);
  panel.append(el('p','lead',`For cosmetics and personal care, our blends follow the IFRA Standards, the global safety code of the International Fragrance Association, in ${d.name} and every other market. The Standards are based on safety assessments by the Research Institute for Fragrance Materials (RIFM) and reviewed by an independent expert panel.`));
  const dl=el('dl');const row=(t,v)=>{const w=el('div');w.append(el('dt',null,t),el('dd',null,v));dl.append(w);};
  row('What the Standards cover','Each IFRA Standard prohibits a material, restricts how much of it can be used, or sets purity specifications it must meet. Members of IFRA commit to applying them worldwide.');
  row('Product categories','Limits are set per IFRA product category, from lip products and leave-on skin care to rinse-off products like shampoo and soap, reflecting how much of the product reaches the skin.');
  row('IFRA statement for every blend','Each blend is supplied with an IFRA conformity statement giving its maximum use level in the finished product for every category, calculated from the full recipe under the current IFRA Amendment.');
  row('Allergen labelling','Where the EU Cosmetics Regulation (EC) No 1223/2009 applies, we supply the fragrance allergen data needed for labelling, including the expanded allergen list added by Regulation (EU) 2023/1545.');
  row('How our blends are matched','All catalog blends can be used in cosmetic and personal-care products within the IFRA limits for each category, and come with full documentation.');
  const w=el('div');w.append(el('dt',null,'Sources'));const ol=el('ol','srcs');[['IFRA: International Fragrance Association','https://ifrafragrance.org/'],['RIFM: Research Institute for Fragrance Materials','https://www.rifm.org/'],['Regulation (EC) No 1223/2009 (cosmetic products)','https://eur-lex.europa.eu/eli/reg/2009/1223/oj'],['Regulation (EU) 2023/1545 (fragrance allergen labelling)','https://eur-lex.europa.eu/eli/reg/2023/1545/oj']].forEach(([t,u])=>{const li=el('li');const a=el('a',null,t);a.href=u;a.target='_blank';a.rel='noopener';li.append(a);ol.append(li);});const dd=el('dd');dd.append(ol);w.append(dd);dl.append(w);
  panel.append(dl);
}
function renderEfsa(d){
  const box=el('div','st on');box.style.setProperty('--c',C.open);box.append(el('span','k','Food & beverage standard'),el('span','v','EU flavouring rules (EFSA)'),el('span','d','Applied to every market on this map'));
  const grid=el('div','status');grid.style.gridTemplateColumns='1fr';grid.append(box);panel.append(grid);
  panel.append(el('p','lead',`For food and beverage, we hold our blends to the European Union's flavouring rules, among the strictest in the world, and apply them in ${d.name} and every other market. Flavourings in the EU are evaluated for safety by the European Food Safety Authority (EFSA), and only substances that pass are authorised.`));
  const dl=el('dl');const row=(t,v)=>{const w=el('div');w.append(el('dt',null,t),el('dd',null,v));dl.append(w);};
  row('Flavouring framework','Regulation (EC) No 1334/2008 sets the rules for flavourings and food ingredients with flavouring properties used in and on foods, including which source materials may be used.');
  row('Authorised substances','Every flavouring substance must appear on the EU Union list (Regulation (EU) No 872/2012, Annex I), built from EFSA safety evaluations.');
  row('Restricted constituents','Annex III of 1334/2008 bars certain substances from being added as such and caps naturally occurring ones, such as pulegone or estragole, in finished foods.');
  row('Food safety & traceability','Regulation (EC) No 178/2002, the General Food Law, sets the food safety, traceability and documentation requirements our supply chain follows.');
  row('How our blends are matched','Each recipe is reviewed substance by substance against these rules for use at up to 0.2% in the finished food or beverage. Blends listed under Eybna blends meet them and come with full food-grade documentation.');
  const w=el('div');w.append(el('dt',null,'Sources'));const ol=el('ol','srcs');[['Regulation (EC) No 1334/2008 (flavourings)','https://eur-lex.europa.eu/eli/reg/2008/1334/oj'],['Regulation (EU) No 872/2012 (Union list)','https://eur-lex.europa.eu/eli/reg_impl/2012/872/oj'],['Regulation (EC) No 178/2002 (General Food Law)','https://eur-lex.europa.eu/eli/reg/2002/178/oj'],['EFSA: Flavourings','https://www.efsa.europa.eu/en/topics/topic/flavourings']].forEach(([t,u])=>{const li=el('li');const a=el('a',null,t);a.href=u;a.target='_blank';a.rel='noopener';li.append(a);ol.append(li);});const dd=el('dd');dd.append(ol);w.append(dd);dl.append(w);
  panel.append(dl);
}
function renderRules(d){
  if(st.mode==='fnb')return renderEfsa(d);
  if(st.mode==='cosm')return renderIfra(d);
  const grid=el('div','status');
  [['vape','Vapes & concentrates'],['preroll','Pre-rolls']].forEach(([m,l])=>{const s=d[m][0];const box=el('div','st'+(st.mode===m?' on':''));box.style.setProperty('--c',C[s]);box.append(el('span','k',l),el('span','v',STATUS[s]),el('span','d',d[m][1]));grid.append(box);});
  panel.append(grid,el('p','lead',d.summary));
  const dl=el('dl');const row=(t,v,cls)=>{if(!v)return;const w=el('div',cls);w.append(el('dt',null,t),el('dd',null,v));dl.append(w);};
  if(d.watch)row('Watch',d.watch,'watch');
  row('E-cigarette & vape liquids',d.ecig);
  row('Terpene source & flavor',d.source);row('Banned additives & caps',d.additives);row('Disclosure & testing',d.disclosure);
  if(d.codes&&d.codes.length){const w=el('div');w.append(el('dt',null,'Restriction types'));const cs=el('dd','codes');d.codes.forEach(c=>{const s=el('span','code',c);s.title=D.codes[c];s.tabIndex=0;cs.append(s);});const leg=el('dd',null,d.codes.map(c=>c+': '+D.codes[c]).join('. ')+'.');leg.style.fontSize='12px';leg.style.color='var(--muted)';w.append(cs,leg);dl.append(w);}
  if(d.inherit){const w=el('div');w.append(el('dt',null,'Follows'));const b=el('button','chip',resolve(d.inherit).name);b.onclick=()=>select(d.inherit);const dd=el('dd');dd.append(b);w.append(dd);dl.append(w);}
  const lk=LINKC.filter(l=>l.kind==='shared'&&(l.a===st.sel||l.b===st.sel));
  if(lk.length){const w=el('div');w.append(el('dt',null,'Shares most of its limit table with'));const dd=el('dd','codes');lk.forEach(l=>{const o=l.a===st.sel?l.b:l.a;const b=el('button','chip',(LZ[o]||{}).name||resolve(o).name);b.onclick=()=>select(o);dd.append(b);});w.append(dd);dl.append(w);}
  if(d.sources&&d.sources.length){const w=el('div');w.append(el('dt',null,'Sources'));const ol=el('ol','srcs');d.sources.forEach(([t,u])=>{const li=el('li');const a=el('a',null,t);a.href=u;a.target='_blank';a.rel='noopener';li.append(a);ol.append(li);});const dd=el('dd');dd.append(ol);w.append(dd);dl.append(w);}
  panel.append(dl);
}
const SGROUPS={other:'Restricted substances',heavy_metal:'Metals',pesticide:'Pesticides',residual_solvent:'Solvents',mycotoxin:'Mycotoxins'};
function secFrames(z){const S=SEC[st.mode];let f=S.zones[z];
  if(!f){if(z.startsWith('us:'))f=['us'];else if(z.startsWith('ca:'))f=['ca'];else if(z.startsWith('c:')&&EU.has(z.slice(2)))f=['eu'];else f=S.frameworks.codex&&S.frameworks.codex.analytes.length?['codex']:[];}
  return f.filter(k=>S.frameworks[k]).sort((a,b)=>(b.includes('_')?1:0)-(a.includes('_')?1:0)||0);}
function fmtLim(a){if(a.basis==='prohibited')return ['Prohibited','nd'];const v=a.limit==null?'Not set':(a.limit+' '+a.unit);if(a.basis==='label_threshold')return ['Label above '+v,''];if(a.basis==='guidance')return [v+' (guidance)',''];return [v,''];}
function renderSectorLimits(d){
  const S=SEC[st.mode];const fr=secFrames(st.sel);const label=st.mode==='fnb'?'food & beverage':'cosmetics';
  if(!fr.length){panel.append(el('div','empty',`No national ${label} limits are mapped for ${d.name}. For fragrance, the IFRA Standards are the common industry reference.`));return;}
  const intro=el('p','meta');intro.style.margin='0 0 12px';intro.append(el('b',null,'Limits for '+label+': '),fr.map(k=>S.frameworks[k].name).join(' + '));panel.append(intro);
  const rows=fr.flatMap(k=>S.frameworks[k].analytes.map(a=>({...a,fw:k})));
  const counts={};rows.forEach(a=>counts[a.group]=(counts[a.group]||0)+1);
  const tools=el('div','tools');
  [['all','All',rows.length],...Object.entries(SGROUPS).filter(([g])=>counts[g]).map(([g,l])=>[g,l,counts[g]])].forEach(([g,l,n])=>{const b=el('button','grp',l);b.append(el('em',null,String(n)));b.setAttribute('aria-pressed',st.lgroup===g);b.onclick=()=>{st.lgroup=g;renderPanel();};tools.append(b);});
  const inp=el('input');inp.id='lq';inp.placeholder='Filter substance or CAS';inp.value=st.lq;inp.setAttribute('aria-label','Filter substances');tools.append(inp);panel.append(tools);
  const wrap=el('div','tbl');const t=el('table','sec');t.innerHTML='<thead><tr><th>Substance</th><th class="n">Limit</th></tr></thead>';const tb=el('tbody');t.append(tb);wrap.append(t);panel.append(wrap);
  const multi=fr.length>1;
  const fill=()=>{tb.innerHTML='';const q=norm(st.lq);
    rows.filter(a=>(st.lgroup==='all'||a.group===st.lgroup)&&(!q||norm(a.analyte).includes(q)||norm(a.cas).includes(q))).forEach(a=>{
      const tr=el('tr');const td=el('td',null,a.analyte);const sub=[a.cas,a.applies_to,multi?S.frameworks[a.fw].name:null].filter(Boolean).join(' · ');if(sub)td.append(el('small',null,sub));
      const [v,c]=fmtLim(a);const n=el('td','n');const sp=el('span',c||null,v);n.append(sp);if(a.citation)n.append(el('small',null,a.citation));tr.append(td,n);tb.append(tr);});
    if(!tb.children.length){const tr=el('tr');const td=el('td',null,'No substances match this filter.');td.colSpan=2;tr.append(td);tb.append(tr);}};
  inp.oninput=()=>{st.lq=inp.value;fill();};fill();
  fr.forEach(k=>{const f=S.frameworks[k];if(f.rules_effective){const m=el('p','meta');m.append(el('b',null,f.name+': '),f.rules_effective);panel.append(m);}if(f.pending_changes){const m=el('p','meta');m.append(el('b',null,'Coming up: '),f.pending_changes);panel.append(m);}});
  const src=fr.flatMap(k=>S.frameworks[k].sources||[]);if(src.length){const ol=el('ol','srcs');ol.style.marginTop='10px';src.slice(0,12).forEach(([tt,u])=>{const li=el('li');const a=el('a',null,tt);a.href=u;a.target='_blank';a.rel='noopener';li.append(a);ol.append(li);});panel.append(ol);}
}
function renderLimits(d,lz,lzk){
  if(NONCAN[st.mode])return renderSectorLimits(d);
  if(!lz){panel.append(el('div','empty','Action limits are not mapped for '+d.name+' yet.'));return;}
  if(lzk!==st.sel){const w=el('p','meta');w.style.margin='0 0 10px';const own=LZ[st.sel];w.append(el('b',null,'Follows '+lz.name+' limits.'));panel.append(w);}
  if(lz.status==='no_limits'||!lz.analytes.length){panel.append(el('div','empty','No numeric action limits are published for this market.'));return;}
  const counts={};lz.analytes.forEach(a=>counts[a.group]=(counts[a.group]||0)+1);
  const tools=el('div','tools');
  [['all','All',lz.analytes.length],...Object.entries(GROUPS).filter(([g])=>counts[g]).map(([g,l])=>[g,l,counts[g]])].forEach(([g,l,n])=>{const b=el('button','grp',l);b.append(el('em',null,String(n)));b.setAttribute('aria-pressed',st.lgroup===g);b.onclick=()=>{st.lgroup=g;renderPanel();};tools.append(b);});
  const inp=el('input');inp.id='lq';inp.placeholder='Filter analyte or CAS';inp.value=st.lq;inp.setAttribute('aria-label','Filter analytes');tools.append(inp);panel.append(tools);
  const wrap=el('div','tbl');const t=el('table');t.innerHTML='<thead><tr><th>Analyte</th><th class="n">Inhalable</th><th class="n">Other</th></tr></thead>';const tb=el('tbody');t.append(tb);wrap.append(t);panel.append(wrap);
  const fill=()=>{tb.innerHTML='';const q=norm(st.lq);
    lz.analytes.filter(a=>(st.lgroup==='all'||a.group===st.lgroup)&&(!q||norm(a.analyte).includes(q)||norm(a.cas).includes(q))).forEach(a=>{
      const tr=el('tr');const td=el('td',null,a.analyte);const sub=[a.cas,GROUPS[a.group]].filter(Boolean).join(' · ');if(sub)td.append(el('small',null,sub));
      const v=x=>{const c=el('td','n');if(a.basis==='non_detect'){c.append(el('span','nd','ND'));if(x!=null)c.append(el('small',null,'LOQ '+x+' '+a.unit));}else c.textContent=x==null?'–':x+' '+(a.unit==='%'?'%':'µg/g');return c;};
      tr.append(td,v(a.inhalable_limit),v(a.other_limit));tb.append(tr);});
    if(!tb.children.length){const tr=el('tr');const td=el('td',null,'No analytes match this filter.');td.colSpan=3;tr.append(td);tb.append(tr);}};
  inp.oninput=()=>{st.lq=inp.value;fill();};fill();
  const m=el('p','meta');m.append(el('b',null,'Rule version: '),lz.rules_effective||'–');panel.append(m);
  if(lz.pending_changes){const p=el('p','meta');p.append(el('b',null,'Coming up: '),lz.pending_changes);panel.append(p);}
  if(lz.sources&&lz.sources.length){const ol=el('ol','srcs');ol.style.marginTop='10px';lz.sources.forEach(([tt,u])=>{const li=el('li');const a=el('a',null,tt);a.href=u;a.target='_blank';a.rel='noopener';li.append(a);ol.append(li);});panel.append(ol);}
}
function whyEmpty(d,fl,mode){
  const box=el('div','why-box');const rs=ruleStatus(st.sel);const desc=d[st.mode]&&d[st.mode][1];const cdo=CDO.has(st.sel)||(parentOf(st.sel)&&CDO.has(parentOf(st.sel)));
  let title,body;
  if(fl==null||d.none){title='No regulated market to match';body=`${d.name} doesn't have a regulated cannabis market for ${mode} that we track, so there are no product rules to match our blends against. If you sell hemp, CBD or other legal products here, our team can review the local requirements with you.`;}
  else if(rs==='na'){title='No legal market for this product type';body=`There's no legal channel for ${mode} in ${d.name} right now, so no blends are listed. This list updates as the rules change.`;}
  else if(rs==='closed'){title='Added terpenes aren\'t allowed';body=`${d.name}'s rules don't allow added terpenes or flavors in ${mode}, so no blends are listed.`;}
  else if(cdo){title='Cannabis-derived terpenes only';body=`${d.name} only allows terpenes and flavors that come from cannabis or hemp. Our catalog blends are botanical, so none qualify as they are. Our custom team can build a cannabis-derived formulation for this market.`;}
  else{title='No catalog blend fits yet';body=`None of our catalog blends currently meet ${d.name}'s rules for ${mode}. Our custom team can formulate to these rules.`;}
  box.append(el('div','lbl',title),el('p',null,body));
  if(desc&&!(fl==null||d.none)){const r=el('p','why-rule');r.append(el('span','k','What the rules say'),el('span',null,desc));box.append(r);}
  return box;
}
function renderProducts(d,fl){
  const mode=NONCAN[st.mode]||(st.mode==='vape'?'vapes and concentrates':'pre-rolls');
  if(fl==null||!fl.length){panel.append(whyEmpty(d,fl,mode));panel.append(ctas(false));return;}
  const nc=!!NONCAN[st.mode];const ec=st.mode==='vape'&&ECIG.has(st.sel);const fnb=!nc&&!ec&&FNB.has(st.sel);const head=el('div','pintro');const l=el('div');l.append(el('div','lbl',ec?'Catalog blends for e-liquids':fnb?'Catalog blends for aroma and flavor':'Catalog blends for '+mode),el('div',null,d.name));head.append(l,el('div','pcount',String(fl.length)));panel.append(head);
  const inp=el('input','field');inp.id='pq';inp.placeholder='Search blends';inp.value=st.pq;inp.style.width='100%';inp.setAttribute('aria-label','Search blends');panel.append(inp);
  const box=el('div');panel.append(box);
  const fill=()=>{box.innerHTML='';const q=norm(st.pq);const groups=new Map();
    fl.map(c=>PBY.get(c)).filter(p=>p&&(!q||norm(p.name+p.line).includes(q))).forEach(p=>{if(!groups.has(p.line))groups.set(p.line,[]);groups.get(p.line).push(p);});
    if(!groups.size){box.append(el('p','note','No blends match this search.'));return;}
    [...groups.entries()].sort((a,b)=>b[1].length-a[1].length).forEach(([line,ps])=>{const g=el('div','line-g');const h=el('h4');h.append(el('span',null,line),el('span',null,String(ps.length)));g.append(h);const pl=el('div','pills');ps.sort((a,b)=>a.name.localeCompare(b.name)).forEach(p=>{const a=el('a','pill'+(p.code===st.prod?' hl':''),p.name);a.href=p.url||'https://eybna.com/shop';a.target='_blank';a.rel='noopener';a.title='View '+p.name+' on eybna.com';pl.append(a);});g.append(pl);box.append(g);});};
  inp.oninput=()=>{st.pq=inp.value;fill();};fill();
  if(st.mode==='fnb')panel.append(el('p','note','These blends meet EU flavouring rules (EFSA) at up to 0.2% in the finished food or beverage, made to food-grade standards with full documentation.'));
  else if(st.mode==='cosm')panel.append(el('p','note',COSMX&&COSMX.z.has(st.sel)?'Catalog blends for cosmetic and personal-care applications, supplied with full documentation. Blends containing hemp-derived CBD are not offered here for cosmetics.':'All catalog blends are available for cosmetic and personal-care applications, supplied with full documentation.'));
  else if(ec)panel.append(el('p','note','Supplied as flavourings for e-cigarette and vape liquids under local e-cigarette rules, with full documentation for product notification.'));
  else if(fnb)panel.append(el('p','note','Our blends are supplied here for aroma and flavor uses, made to food-grade standards with full documentation.'));
  else panel.append(el('p','note','Matched at a 10% dose in the finished product, using our batch testing history and formulation review. Some markets need extra documentation; our team will supply it with your order.'));
  panel.append(el('p','note',"Didn't find what you're looking for? Contact our team and we'll offer a compliant solution with a fast turnaround."));
  panel.append(ctas(true));
}
function ctas(has){const r=el('div','cta-row');const a=el('a','cta pri',has?'Request samples →':'Talk to our team →');a.href=D.ctaUrl||CATALOG;a.target='_blank';a.rel='noopener';const b=el('a','cta sec','Browse the catalog');b.href=CATALOG;b.target='_blank';b.rel='noopener';r.append(a);if(has){const c=el('a','cta sec','Request a custom formulation');c.href='https://eybna.com/custom-solutions';c.target='_blank';c.rel='noopener';r.append(c);}r.append(b);return r;}
function renderLegend(){
  const lg=root.getElementById('legend');lg.innerHTML='';
  const nc=!!NONCAN[st.mode];const keys=nc?(st.prod&&!fitList(st.sel).includes(st.prod)?['na']:['open']):st.prod?['open','na']:['open','cond','restr','closed','unk','na'];
  const label=s=>nc?'Available everywhere':st.prod?({open:'Available',na:'Not listed'})[s]:STATUS[s];
  const counts={};const zs=new Set([...Object.keys(J),...Object.keys(LZ)]);zs.forEach(k=>{const s=colorKey(k);if(s)counts[s]=(counts[s]||0)+1;});
  keys.forEach(s=>{const b=el('button','chip');b.setAttribute('aria-pressed',st.filter===s);b.title=st.prod?'':STATUS_DESC[s];const i=el('i');i.style.background=C[s];i.style.color=C[s];b.append(i,label(s));if(!nc)b.append(el('em',null,String(counts[s]||0)));b.onclick=()=>{st.filter=st.filter===s?null:s;recolor();renderLegend();};lg.append(b);});
  if(!st.prod){const k=el('span','links-key');const a=el('span');const ab=el('b');ab.style.background=C.accent;ab.style.boxShadow='0 0 8px '+C.accent;a.append(ab,'Shared limit tables');const b=el('span');const bb=el('b');bb.style.background=C['accent-2'];bb.style.boxShadow='0 0 8px '+C['accent-2'];b.append(bb,'Follows parent rules');k.append(a,b);lg.append(k);}
}
function renderTimeline(){const box=root.getElementById('timeline');box.innerHTML='';const today=new Date();today.setUTCHours(12,0,0,0);
  D.dates.forEach(([d,t,k])=>{const days=Math.round((new Date(d+'T12:00:00Z')-today)/864e5);const b=el('button','tl'+(days<0?' past':days<=30?' soon':''));b.title=t;const r=el('span','row');r.append(el('span','dt',fmtDate(d)),el('span','in',days<0?'passed':days===0?'today':'in '+days+' days'));b.append(r,el('span','t',t));b.onclick=()=>select(k);box.append(b);});
  // open on the next upcoming date rather than the oldest past one
  requestAnimationFrame(()=>{const nx=box.querySelector('.tl:not(.past)');if(nx)box.scrollLeft=Math.max(0,nx.offsetLeft-box.offsetLeft-60);});}
function setMode(m){st.mode=m;try{localStorage.setItem('ecg-mode',m);}catch(e){}root.querySelectorAll('.seg button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.mode===m));recolor();renderLegend();renderPanel();}
root.querySelectorAll('.seg button').forEach(b=>b.onclick=()=>setMode(b.dataset.mode));
const ps=root.getElementById('prod');
[...PRODS].sort((a,b)=>a.name.localeCompare(b.name)).forEach(p=>{const o=el('option',null,p.name+' · '+p.line);o.value=p.code;ps.append(o);});
ps.onchange=()=>{st.prod=ps.value;st.filter=null;if(st.prod)st.tab='products';recolor();renderLegend();renderPanel();};

// search
const names=new Map();Object.keys(J).forEach(k=>names.set(J[k].name,k));Object.keys(LZ).forEach(k=>{if(![...names.values()].includes(k))names.set(LZ[k].name,k);});
subs.forEach(s=>{if(![...names.values()].includes(s.key))names.set(s.name+(s.key.startsWith('us:')?' (US)':' (Canada)'),s.key);});
countries.forEach(c=>{if(![...names.values()].includes(c.key)&&!names.has(c.name))names.set(c.name,c.key);});
// search combobox: full list from the chevron or on focus, filtered as you type
const q=root.getElementById('q'),qlist=root.getElementById('qlist'),qbtn=root.getElementById('qbtn'),qwrap=root.getElementById('qwrap');
const ALLN=[...names.keys()].sort((a,b)=>a.localeCompare(b));let qitems=[],qact=-1;
function openList(filtered){const f=filtered?norm(q.value):'';
  qitems=f?ALLN.filter(n=>norm(n).includes(f)).sort((a,b)=>(norm(b).startsWith(f)?1:0)-(norm(a).startsWith(f)?1:0)):ALLN.slice();
  qlist.innerHTML='';
  if(!qitems.length){const li=el('li','none','No matches');qlist.append(li);}
  qitems.forEach((n,i)=>{const li=el('li',names.get(n)===st.sel?'cur':null,n);li.id='qo'+i;li.setAttribute('role','option');li.onmousedown=e=>{e.preventDefault();pickQ(n);};qlist.append(li);});
  qlist.hidden=false;qwrap.dataset.open='';q.setAttribute('aria-expanded','true');
  setAct(filtered?(qitems.length?0:-1):qitems.findIndex(n=>names.get(n)===st.sel),!filtered);}
function closeList(){qlist.hidden=true;delete qwrap.dataset.open;q.setAttribute('aria-expanded','false');q.removeAttribute('aria-activedescendant');qact=-1;}
function setAct(i,center){const old=qlist.querySelector('.act');if(old)old.classList.remove('act');qact=i;if(i<0){q.removeAttribute('aria-activedescendant');return;}
  const li=root.getElementById('qo'+i);if(!li)return;li.classList.add('act');q.setAttribute('aria-activedescendant',li.id);
  if(center)qlist.scrollTop=li.offsetTop-qlist.clientHeight/2+li.offsetHeight/2;else li.scrollIntoView({block:'nearest'});}
function pickQ(n){const k=names.get(n);closeList();if(k)select(k);q.blur();}
qbtn.onmousedown=e=>e.preventDefault();
qbtn.onclick=()=>{if(!qlist.hidden){closeList();return;}q.focus();q.select();openList(false);};
q.addEventListener('focus',()=>{q.select();if(qlist.hidden)openList(false);});
q.addEventListener('input',()=>openList(true));
q.addEventListener('keydown',e=>{
  if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();if(qlist.hidden){openList(false);return;}const d=e.key==='ArrowDown'?1:-1;setAct(Math.max(0,Math.min(qitems.length-1,qact+d)));}
  else if(e.key==='Enter'){e.preventDefault();const n=qitems[qact>=0?qact:0];if(n)pickQ(n);}
  else if(e.key==='Escape'){closeList();syncQ();q.select();}});
q.addEventListener('blur',()=>{closeList();syncQ();});
// keep the search field showing the current selection (map click, timeline, breadcrumb, search)
function syncQ(){if(!st.picked){q.value='';return;}let n=null;for(const [nm,key] of names)if(key===st.sel){n=nm;break;}q.value=n||resolve(st.sel).name||'';}

try{const t=localStorage.getItem('ecg-tab');if(t==='rules'||t==='limits'||t==='products')st.tab=t;}catch(e){}
const h=location.hash.slice(1).replace('.',':');if(h&&(J[h]||LZ[h]||byKey.has(h)))st.sel=h;
buildSky();size();addEventListener('resize',()=>{buildSky();size();});new ResizeObserver(size).observe(canvas);
setMode(st.mode);renderTimeline();
if(st.sel==='us:06'){st.rot=[105,-33,0];setK(1.15);}else flyTo(st.sel);
requestAnimationFrame(frame);
}
function mount(host,opts){
  opts=opts||{};if(host.__eci)return host.__eci;
  var base=opts.base||DEFAULT_BASE;var libs=opts.libs||LIBS;
  if(!document.querySelector('link[data-eci-font]')){var l=document.createElement('link');l.rel='stylesheet';l.href=FONT;l.setAttribute('data-eci-font','');document.head.appendChild(l);}
  var root=host.shadowRoot||host.attachShadow({mode:'open'});
  root.innerHTML='<style>'+CSS+'</style>'+HTML;
  host.__eci=libs.reduce(function(p,u){return p.then(function(){return lib(u);});},Promise.resolve()).then(function(){return run(root,base);}).catch(function(err){var p=root.getElementById('panel');if(p)p.textContent='The map data did not load. Reload the page to try again.';console.error(err);});
  return host.__eci;
}
window.EybnaComplianceIndex={mount:mount};
})();
