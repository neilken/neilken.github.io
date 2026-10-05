/* Mechanical Systems Motion Lab — deterministic SVG diagrams, no image-frame animation. */
const $ = (id) => document.getElementById(id);
const svg = $('systemSvg');
const nav = $('systemNav');
let activeIndex = 0;
let running = true;
let speed = 0.45;
let elapsed = 0;
let lastFrame = null;

const palette = { ink:'#142b3a', muted:'#56707d', input:'#e47d26', transfer:'#246a8b', output:'#27865f', metal:'#9eb3bf', darkMetal:'#657d8b', yellow:'#f0bb36', ground:'#dce8df', red:'#c65645' };
const deg = (r) => r * 180 / Math.PI;
const pt = (x, y, r, a) => [x + r * Math.cos(a), y + r * Math.sin(a)];
const esc = (value) => String(value).replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' })[c]);

function defs() {
  return `<defs>
    <marker id="arrowInput" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto"><path d="M0,0 L9,3 L0,6 Z" fill="${palette.input}"/></marker>
    <marker id="arrowTransfer" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto"><path d="M0,0 L9,3 L0,6 Z" fill="${palette.transfer}"/></marker>
    <marker id="arrowOutput" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto"><path d="M0,0 L9,3 L0,6 Z" fill="${palette.output}"/></marker>
    <style>
      .s-text{font-family:Arial,Helvetica,sans-serif;fill:${palette.ink}} .s-small{font-size:16px}.s-label{font-size:17px;font-weight:700}.s-title{font-size:22px;font-weight:800}.s-muted{fill:${palette.muted}} .frame{fill:#f9fcfd;stroke:#d2e0e6;stroke-width:2}.metal{fill:${palette.metal};stroke:${palette.ink};stroke-width:4}.dark{fill:${palette.darkMetal};stroke:${palette.ink};stroke-width:4}.mechanism{fill:${palette.transfer};stroke:${palette.ink};stroke-width:4}.input{fill:${palette.input};stroke:${palette.ink};stroke-width:4}.output{fill:${palette.output};stroke:${palette.ink};stroke-width:4}.link{stroke:${palette.ink};stroke-width:9;stroke-linecap:round}.thin{stroke:${palette.ink};stroke-width:4;stroke-linecap:round}.road{stroke:#7d9098;stroke-width:10;stroke-linecap:round}.ground{stroke:#8eae96;stroke-width:5}.motion-in{stroke:${palette.input};stroke-width:5;fill:none;marker-end:url(#arrowInput)}.motion-transfer{stroke:${palette.transfer};stroke-width:5;fill:none;marker-end:url(#arrowTransfer)}.motion-out{stroke:${palette.output};stroke-width:5;fill:none;marker-end:url(#arrowOutput)}
    </style>
  </defs>`;
}
function label(x, y, lines, color = palette.ink, align = 'middle') {
  const list = Array.isArray(lines) ? lines : [lines];
  return `<text class="s-text s-label" style="fill:${color}" text-anchor="${align}" x="${x}" y="${y}">${list.map((line,i)=>`<tspan x="${x}" dy="${i ? 20 : 0}">${esc(line)}</tspan>`).join('')}</text>`;
}
function small(x, y, text, anchor='middle') { return `<text class="s-text s-small s-muted" text-anchor="${anchor}" x="${x}" y="${y}">${esc(text)}</text>`; }
function arrow(x1,y1,x2,y2,type) { return `<path class="motion-${type}" d="M${x1} ${y1} L${x2} ${y2}"/>`; }
function gear(cx, cy, r, teeth, rotation, fill=palette.transfer) {
  const points = [];
  for (let i=0; i<teeth*4; i++) {
    const a = rotation + i * Math.PI * 2 / (teeth*4);
    const outer = i % 4 === 0 || i % 4 === 1;
    points.push(pt(cx,cy,outer?r+7:r,a).map(n=>n.toFixed(1)).join(','));
  }
  return `<polygon class="mechanism" style="fill:${fill}" points="${points.join(' ')}"/><circle class="metal" cx="${cx}" cy="${cy}" r="${Math.max(11,r*.22)}"/>`;
}
function wheel(cx,cy,r,rotation,fill=palette.metal,spokes=6) {
  let inside = `<circle class="metal" style="fill:${fill}" cx="${cx}" cy="${cy}" r="${r}"/><circle fill="#fff" stroke="${palette.ink}" stroke-width="4" cx="${cx}" cy="${cy}" r="${Math.max(9,r*.13)}"/>`;
  for(let i=0;i<spokes;i++){ const [x,y]=pt(cx,cy,r-5,rotation+i*Math.PI*2/spokes); inside += `<line class="thin" x1="${cx}" y1="${cy}" x2="${x}" y2="${y}"/>`; }
  return inside;
}
function support(x,y,w,h) { return `<rect class="dark" x="${x}" y="${y}" width="${w}" height="${h}" rx="5"/>`; }
function background() {
  // The page header already names and explains the system. Keeping the SVG free
  // of a second title prevents labels from covering the animated mechanism.
  return `${defs()}<rect class="frame" x="9" y="9" width="982" height="517" rx="10"/>`;
}

function winch(t) {
  const swing = Math.sin(t*.75); // reversible demonstration: all connected parts reverse together.
  const a = swing * .95;
  const loadY = 408 - 85 * ((swing + 1) / 2);
  const crankEnd = pt(175,286,72,a);
  const smallGear = gear(300,286,42,10,-a*1.5);
  const bigGear = gear(405,286,68,16,a*.95);
  return `${background()}
    <line class="ground" x1="55" y1="449" x2="945" y2="449"/>
    ${support(80,120,28,329)}${support(545,120,28,329)}<line class="link" x1="94" y1="130" x2="560" y2="130"/>
    <line class="link" x1="175" y1="286" x2="300" y2="286"/>${wheel(175,286,24,a,palette.input,4)}
    <line class="link" x1="175" y1="286" x2="${crankEnd[0]}" y2="${crankEnd[1]}"/><circle class="input" cx="${crankEnd[0]}" cy="${crankEnd[1]}" r="13"/>
    ${smallGear}${bigGear}<rect class="dark" x="480" y="250" width="92" height="72" rx="14"/>${wheel(526,286,38,a*.95,palette.transfer,8)}
    <line class="thin" x1="526" y1="248" x2="526" y2="124"/><line class="thin" x1="526" y1="124" x2="735" y2="124"/><line class="thin" x1="735" y1="124" x2="735" y2="${loadY}"/>
    <rect class="output" x="680" y="${loadY}" width="110" height="66" rx="6"/><text class="s-text s-label" x="735" y="${loadY+40}" text-anchor="middle" fill="#fff">LOAD</text>
    ${arrow(75,236,132,236,'input')}${label(70,210,['Input','crank'],palette.input,'start')}
    ${arrow(345,370,398,370,'transfer')}${label(370,400,['gear pair +','drum'],palette.transfer)}
    ${arrow(846,405,846,340,'output')}${label(846,433,['linear output:','load moves up'],palette.output)}
    ${small(265,150,'small driver gear')} ${small(404,190,'larger driven gear')} ${small(526,347,'drum')}`;
}

function bicycle(t) {
  // A deliberately uncluttered side view: the drivetrain is larger than the
  // frame so students can trace the same motion through every connected part.
  const a = t * 1.15;
  const rearA = a * (50 / 26);
  const pedal = pt(430,340,82,a);
  const roadShift = (t * 36) % 130;
  const topLinks = Array.from({length:7}, (_,i) => {
    const f = ((i * 47 + roadShift) % 290) / 290;
    const x = 430 + 290 * f, y = 290 + 24 * f;
    return `<rect x="${x-10}" y="${y-3}" width="20" height="6" rx="2" fill="#f6d46a" transform="rotate(4.7 ${x} ${y})"/>`;
  }).join('');
  const bottomLinks = Array.from({length:7}, (_,i) => {
    const f = ((i * 47 + roadShift) % 290) / 290;
    const x = 720 - 290 * f, y = 366 + 24 * f;
    return `<rect x="${x-10}" y="${y-3}" width="20" height="6" rx="2" fill="#f6d46a" transform="rotate(4.7 ${x} ${y})"/>`;
  }).join('');
  return `${background()}
    <line class="ground" x1="52" y1="455" x2="948" y2="455"/>
    <path d="M${60-roadShift} 462 h78 M${190-roadShift} 462 h78 M${320-roadShift} 462 h78 M${450-roadShift} 462 h78 M${580-roadShift} 462 h78 M${710-roadShift} 462 h78 M${840-roadShift} 462 h78" stroke="#8eae96" stroke-width="5"/>
    ${wheel(170,340,104,rearA,'#dce7eb',8)}${wheel(720,340,104,rearA,'#dff0e7',8)}
    <path d="M170 340 L350 205 L535 205 L430 340 L535 205 L720 340 L430 340" fill="none" stroke="#26566e" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
    <line x1="350" y1="205" x2="322" y2="167" class="link"/><line x1="298" y1="167" x2="346" y2="167" class="link"/>
    <line x1="535" y1="205" x2="507" y2="158" class="link"/><line x1="483" y1="158" x2="532" y2="158" class="link"/>
    <line x1="535" y1="205" x2="170" y2="340" class="link"/>
    <path d="M430 290 L720 314 A26 26 0 0 1 720 366 L430 390 A50 50 0 0 1 430 290Z" fill="none" stroke="#405661" stroke-width="15" stroke-linejoin="round"/>
    ${topLinks}${bottomLinks}
    ${gear(430,340,50,18,a,palette.input)}${gear(720,340,26,12,rearA,palette.transfer)}
    <line class="link" x1="430" y1="340" x2="${pedal[0]}" y2="${pedal[1]}"/><rect class="input" x="${pedal[0]-25}" y="${pedal[1]-7}" width="50" height="14" rx="6" transform="rotate(${deg(a)} ${pedal[0]} ${pedal[1]})"/>
    ${small(430,425,'front chainring')}${small(720,402,'rear sprocket')}`;
}

function wiper(t) {
  // Crank-rocker four-bar: all three bars below are rigid. The pin at P turns
  // around O, the rod P–R stays one fixed length, and the rocker Q–R swings.
  const crankAngle = t * 1.25;
  const O = {x:195, y:328}, Q = {x:590, y:360};
  const crankLength = 46, rockerLength = 86, rodLength = 370;
  const [px,py] = pt(O.x,O.y,crankLength,crankAngle);
  const dx = px-Q.x, dy = py-Q.y, distance = Math.hypot(dx,dy);
  const ux = dx/distance, uy = dy/distance;
  const along = (rockerLength*rockerLength - rodLength*rodLength + distance*distance)/(2*distance);
  const height = Math.sqrt(Math.max(0,rockerLength*rockerLength-along*along));
  const baseX = Q.x + along*ux, baseY = Q.y + along*uy;
  const r1 = {x:baseX-height*uy, y:baseY+height*ux};
  const r2 = {x:baseX+height*uy, y:baseY-height*ux};
  const R = r1.y < r2.y ? r1 : r2; // retain the upper, continuous assembly branch.
  const rockerAngle = Math.atan2(R.y-Q.y,R.x-Q.x);
  const [tipX,tipY] = pt(Q.x,Q.y,174,rockerAngle);
  const [bladeA1,bladeA2] = [pt(tipX,tipY,40,rockerAngle+Math.PI/2),pt(tipX,tipY,40,rockerAngle-Math.PI/2)];
  return `${background()}
    <path d="M375 112 Q640 44 900 112 L870 395 Q640 442 402 395Z" fill="#dcecf3" stroke="${palette.ink}" stroke-width="5"/>
    <rect class="dark" x="116" y="263" width="92" height="130" rx="13"/>${wheel(O.x,O.y,32,crankAngle,palette.input,6)}
    <circle class="input" cx="${px}" cy="${py}" r="11"/><line class="link" x1="${px}" y1="${py}" x2="${R.x}" y2="${R.y}"/>
    <line class="link" x1="${Q.x}" y1="${Q.y}" x2="${R.x}" y2="${R.y}"/><circle class="mechanism" cx="${Q.x}" cy="${Q.y}" r="18"/><circle class="mechanism" cx="${R.x}" cy="${R.y}" r="11"/>
    <line stroke="#1d3543" stroke-width="12" stroke-linecap="round" x1="${Q.x}" y1="${Q.y}" x2="${tipX}" y2="${tipY}"/>
    <line stroke="#1d3543" stroke-width="9" stroke-linecap="round" x1="${bladeA1[0]}" y1="${bladeA1[1]}" x2="${bladeA2[0]}" y2="${bladeA2[1]}"/>
    ${arrow(51,328,100,328,'input')}${label(45,294,'motor input',palette.input,'start')}
    ${arrow(334,192,448,192,'transfer')}${label(391,162,'rigid crank + connecting rod',palette.transfer)}
    ${arrow(820,326,885,284,'output')}${label(814,364,'oscillating wiper arm',palette.output)}
    ${small(637,91,'windshield')}${small(O.x,430,'motor shaft')} ${small(Q.x,430,'fixed wiper pivot')}`;
}

function sewing(t) {
  const a=t*1.35; const pin=pt(245,258,48,a); const needleY=292+78*(1-Math.cos(a))/2; const bobbinY=needleY+74;
  return `${background()}
    <path d="M110 400 H790 V340 H595 V230 H350 V400Z" fill="#d8e7eb" stroke="${palette.ink}" stroke-width="5" stroke-linejoin="round"/>
    <rect class="dark" x="130" y="202" width="95" height="112" rx="14"/>${wheel(245,258,68,a,palette.input,8)}<circle class="input" cx="${pin[0]}" cy="${pin[1]}" r="11"/>
    <path d="M245 190 C330 166 435 178 520 204" fill="none" stroke="#415866" stroke-width="13" stroke-linecap="round"/><path d="M245 326 C330 350 435 338 520 312" fill="none" stroke="#415866" stroke-width="13" stroke-linecap="round"/>
    ${wheel(520,258,54,a,palette.transfer,7)}
    <line class="link" x1="${pin[0]}" y1="${pin[1]}" x2="610" y2="${needleY}"/><rect class="mechanism" x="590" y="${needleY-24}" width="40" height="48" rx="5"/>
    <line class="thin" x1="610" y1="${needleY+24}" x2="610" y2="${bobbinY}"/><path d="M605 ${bobbinY} L610 ${bobbinY+22} L615 ${bobbinY}" fill="none" stroke="${palette.ink}" stroke-width="4"/>
    <rect x="475" y="405" width="275" height="24" rx="6" fill="#9ab0ba" stroke="${palette.ink}" stroke-width="4"/>
    ${arrow(80,258,115,258,'input')}${label(55,229,['Input','handwheel'],palette.input,'start')}
    ${arrow(366,114,440,114,'transfer')}${label(404,85,['belt + crank-slider'],palette.transfer)}
    ${arrow(700,355,700,310,'output')}${label(770,333,['reciprocating','needle'],palette.output)}
    ${small(518,337,'belt pulley')}${small(610,450,'fabric')}`;
}

function garage(t) {
  const a=t*1.1; const progress=(Math.sin(a)+1)/2; const trolleyX=330+300*progress; const doorY=333-164*progress;
  const sprocket = gear(205,170,35,12,a,palette.input); const markers=[0,1,2,3,4,5].map(i=>`<rect x="${265+((i*58+t*42)%340)}" y="161" width="26" height="8" rx="3" fill="#d8e5ea"/>`).join('');
  return `${background()}
    <rect x="55" y="410" width="890" height="38" fill="#dce8df"/><path d="M740 410 V125 Q740 100 765 100 H925" fill="none" stroke="#657d8b" stroke-width="14" stroke-linecap="round"/>
    <rect class="dark" x="140" y="115" width="130" height="110" rx="14"/>${sprocket}<path d="M243 170 H650" fill="none" stroke="#415866" stroke-width="14" stroke-linecap="round"/>${markers}
    <rect class="mechanism" x="${trolleyX-30}" y="146" width="60" height="48" rx="7"/><line class="link" x1="${trolleyX}" y1="194" x2="760" y2="${doorY+15}"/>
    <rect class="output" x="765" y="${doorY}" width="150" height="${410-doorY}"/><line x1="765" y1="${doorY+42}" x2="915" y2="${doorY+42}" stroke="#d8ebe0" stroke-width="5"/><line x1="765" y1="${doorY+84}" x2="915" y2="${doorY+84}" stroke="#d8ebe0" stroke-width="5"/>
    ${arrow(77,171,126,171,'input')}${label(61,142,['Input','motor'],palette.input,'start')}
    ${arrow(395,95,478,95,'transfer')}${label(436,66,['chain + trolley'],palette.transfer)}
    ${arrow(945,350,945,280,'output')}${label(925,385,['linear output:','door rises'],palette.output)}
    ${small(520,221,'overhead chain rail')}`;
}

function eggbeater(t) {
  const a=t*1.55; const handle=pt(180,270,70,a); const leftA=-a*.75, rightA=a*.75;
  function beater(cx,cy,rotation) { const arms=[0,Math.PI].map(k=>{const b=rotation+k;const [x1,y1]=pt(cx,cy,12,b),[x2,y2]=pt(cx,cy,76,b);return `<line stroke="#536d79" stroke-width="9" stroke-linecap="round" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/><ellipse cx="${x2}" cy="${y2}" rx="18" ry="34" fill="none" stroke="#536d79" stroke-width="6" transform="rotate(${deg(b)} ${x2} ${y2})"/>`;}).join(''); return arms; }
  return `${background()}
    <rect x="92" y="390" width="800" height="49" fill="#dce8df"/><rect class="dark" x="106" y="205" width="92" height="125" rx="13"/>${wheel(180,270,28,a,palette.input,5)}
    <line class="link" x1="180" y1="270" x2="${handle[0]}" y2="${handle[1]}"/><circle class="input" cx="${handle[0]}" cy="${handle[1]}" r="13"/>
    <line class="link" x1="208" y1="270" x2="280" y2="270"/>${gear(280,270,48,14,a,palette.input)}${gear(404,270,62,18,-a*.75)}${gear(542,270,62,18,a*.75)}
    <line class="link" x1="404" y1="270" x2="404" y2="384"/><line class="link" x1="542" y1="270" x2="542" y2="384"/>
    ${beater(404,384,leftA)}${beater(542,384,rightA)}
    ${arrow(46,270,94,270,'input')}${label(42,238,['Input','crank'],palette.input,'start')}
    ${arrow(312,145,450,145,'transfer')}${label(382,112,['meshed gear','train'],palette.transfer)}
    ${arrow(692,348,792,348,'output')}${label(792,379,['opposite rotary','beater output'],palette.output)}
    ${small(466,473,'mixing bowl')}`;
}

const systems = [
  { title:'Hand-Cranked Winch', badge:'Rotary → linear', description:'A person turns the crank. A gear pair changes the turning motion and a drum winds rope to lift a load.', draw:winch, trace:[['Input','A hand turns the crank.','input'],['Mechanisms','Crank shaft → small gear → large gear → drum → rope.','transfer'],['Output','The load moves upward in a straight line.','output']], identify:[['Crank','accepts the input rotary motion'],['Gear pair','transfers rotation and can trade speed for turning force'],['Drum and rope','turn rotation into linear lifting motion']], prompt:'Which part directly changes the drum’s rotary motion into the load’s linear upward motion?' },
  { title:'Bicycle Drivetrain', badge:'Rotary → rotary + linear', description:'Pedaling rotates the front chainring. The chain transfers rotation to the rear wheel, and the wheel produces forward travel.', draw:bicycle, trace:[['Input','A rider pushes the pedals.','input'],['Mechanisms','Crank and chainring → chain → rear sprocket.','transfer'],['Output','The rear wheel rotates and the bicycle moves forward.','output']], identify:[['Crank','changes pedal force into rotary motion'],['Chain and sprockets','transfer rotary motion across a distance'],['Rear wheel','uses rotation to create linear travel']], prompt:'Why is the chain a mechanism in this system even though it does not create the input or the final output?' },
  { title:'Windshield-Wiper System', badge:'Rotary → oscillating', description:'An electric motor turns continuously. A crank, rigid connecting rod, and rocker make a wiper arm sweep through an arc.', draw:wiper, trace:[['Input','The motor shaft rotates.','input'],['Mechanisms','Motor crank → rigid connecting rod → rocker at a fixed pivot.','transfer'],['Output','The wiper arm oscillates through a repeated arc.','output']], identify:[['Motor','provides continuous rotary input'],['Crank','moves a connection point in a circle'],['Connecting rod','is a rigid link that transfers the crank’s motion'],['Rocker and wiper arm','rotate together around the fixed wiper pivot']], prompt:'What motion transformation occurs between the continuously rotating motor shaft and the wiper arm?' },
  { title:'Sewing-Machine Drive', badge:'Rotary → reciprocating', description:'A wheel and belt deliver rotation to a crank-slider. The crank-slider moves the needle repeatedly up and down.', draw:sewing, trace:[['Input','The handwheel rotates.','input'],['Mechanisms','Handwheel → belt → pulley → crank-slider.','transfer'],['Output','The needle reciprocates vertically.','output']], identify:[['Belt and pulleys','transfer rotary motion between shafts'],['Crank-slider','converts rotation into straight-line back-and-forth motion'],['Needle','makes the useful reciprocating output']], prompt:'Which mechanism is responsible for changing rotary motion into the needle’s straight-line motion?' },
  { title:'Garage-Door Opener', badge:'Rotary → linear', description:'A motor turns a sprocket. A chain moves a trolley, which pulls the door upward along its track.', draw:garage, trace:[['Input','The electric motor rotates.','input'],['Mechanisms','Motor sprocket → chain → trolley → door arm.','transfer'],['Output','The door moves upward along a guided path.','output']], identify:[['Motor sprocket','drives the chain'],['Chain','transfers pulling motion along the rail'],['Trolley','moves along the rail and pulls the door'],['Track','constrains the door’s movement']], prompt:'What component keeps the door moving in a controlled path instead of swinging freely?' },
  { title:'Egg-Beater System', badge:'Rotary → rotary', description:'Turning one crank drives a train of meshed gears. The gear train turns two beaters in opposite directions.', draw:eggbeater, trace:[['Input','A hand rotates the crank.','input'],['Mechanisms','Crank shaft → gear train → two vertical shafts.','transfer'],['Output','Two beaters rotate in opposite directions.','output']], identify:[['Crank','provides rotary input'],['Gear train','transfers motion and reverses direction between meshed gears'],['Shafts','deliver rotation to the beaters'],['Beaters','produce the useful mixing output']], prompt:'Why do the two beaters rotate in opposite directions when their gears mesh?' }
];

function renderInfo() {
  const system = systems[activeIndex];
  $('systemNumber').textContent = `System ${activeIndex + 1} of ${systems.length}`;
  $('systemTitle').textContent = system.title;
  $('systemDescription').textContent = system.description;
  $('motionBadge').textContent = system.badge;
  $('trace').innerHTML = system.trace.map(([head,body,type]) => `<div class="trace-step ${type}"><strong>${head}</strong>${body}</div>`).join('');
  $('identifyList').innerHTML = system.identify.map(([term,desc]) => `<dt>${term}</dt><dd>${desc}</dd>`).join('');
  $('prompt').textContent = system.prompt;
  [...nav.querySelectorAll('button')].forEach((button,i)=>button.classList.toggle('active',i===activeIndex));
}
function render() { svg.innerHTML = systems[activeIndex].draw(elapsed); }
function selectSystem(index) { activeIndex=index; elapsed=0; renderInfo(); render(); }
systems.forEach((system,index) => { const button=document.createElement('button'); button.type='button'; button.textContent=system.title; button.addEventListener('click',()=>selectSystem(index)); nav.append(button); });

$('playButton').addEventListener('click',()=>{ running=!running; $('playButton').textContent=running?'Pause':'Play'; });
$('resetButton').addEventListener('click',()=>{ elapsed=0; render(); });
$('speed').addEventListener('input',(event)=>{ speed=Number(event.target.value); $('speedValue').textContent=`${speed.toFixed(2)}×`; });
function tick(now) { if(lastFrame===null) lastFrame=now; const delta=Math.min(.05,(now-lastFrame)/1000); lastFrame=now; if(running) { elapsed+=delta*speed; render(); } requestAnimationFrame(tick); }
renderInfo(); render(); requestAnimationFrame(tick);
