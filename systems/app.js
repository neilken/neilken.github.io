/* Mechanical Systems Motion Lab — deterministic SVG diagrams, no image-frame animation. */
const $ = (id) => document.getElementById(id);
const svg = $('systemSvg');
const nav = $('systemNav');
let activeIndex = 0;
let running = true;
let speed = 0.6;
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
function background(title, subtitle) { return `${defs()}<rect class="frame" x="9" y="9" width="982" height="517" rx="10"/>${label(500,43,title)}${small(500,67,subtitle)}`; }

function winch(t) {
  const swing = Math.sin(t*.75); // reversible demonstration: all connected parts reverse together.
  const a = swing * .95;
  const loadY = 408 - 85 * ((swing + 1) / 2);
  const crankEnd = pt(175,286,72,a);
  const smallGear = gear(300,286,42,10,-a*1.5);
  const bigGear = gear(405,286,68,16,a*.95);
  return `${background('Hand-Cranked Winch','Rotary input is transferred through gears to a drum that lifts a load.')}
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
  const a=t*1.5; const rearA=a*1.9; const xTravel=(t*34)%130;
  const chainA = `<path d="M365 274 C365 243 620 243 620 274 C620 305 365 305 365 274Z" fill="none" stroke="#415866" stroke-width="13" stroke-linecap="round"/>`;
  const links = [0,1,2,3,4,5,6,7].map(i=>{const x=385+((i*39+xTravel)%220); const y=i%2?299:249; return `<rect x="${x}" y="${y}" width="23" height="6" rx="2" fill="#d7e5eb"/>`;}).join('');
  const pedal = pt(382,274,78,a);
  return `${background('Bicycle Drivetrain','Pedal input drives a crank, chain, sprocket, and rear wheel to create forward travel.')}
    <line class="ground" x1="50" y1="443" x2="950" y2="443"/>
    <path d="M70 449 h70 M260 449 h70 M450 449 h70 M640 449 h70 M830 449 h70" stroke="#8eae96" stroke-width="5"/>
    ${wheel(265,342,93,a*.23,'#d7e3e8',8)}${wheel(730,342,93,rearA,'#d7e3e8',8)}
    <path d="M265 342 L410 215 L526 342 L340 342 L470 255 L595 342 L730 342" fill="none" stroke="${palette.ink}" stroke-width="10" stroke-linejoin="round"/>
    <line class="link" x1="410" y1="215" x2="378" y2="184"/><line class="link" x1="378" y1="184" x2="348" y2="184"/>
    <line class="link" x1="470" y1="255" x2="452" y2="195"/><line class="link" x1="435" y1="195" x2="474" y2="195"/>
    ${gear(382,274,45,18,a,palette.input)}${gear(620,274,25,12,a*1.9,palette.transfer)}${chainA}${links}
    <line class="link" x1="382" y1="274" x2="${pedal[0]}" y2="${pedal[1]}"/><rect class="input" x="${pedal[0]-24}" y="${pedal[1]-7}" width="48" height="14" rx="6" transform="rotate(${deg(a)} ${pedal[0]} ${pedal[1]})"/>
    ${arrow(112,260,172,260,'input')}${label(74,235,['Input','pedals'],palette.input,'start')}
    ${arrow(490,158,548,158,'transfer')}${label(520,126,['crank → chain →','rear sprocket'],palette.transfer)}
    ${arrow(856,397,927,397,'output')}${label(858,430,['rotary wheel +','linear travel'],palette.output)}
    ${small(382,350,'front chainring')}${small(620,324,'rear sprocket')}`;
}

function wiper(t) {
  const s=Math.sin(t*1.35); const crankA=t*1.35; const pin=pt(210,280,38,crankA); const sliderX=345+s*70;
  const leftAngle=-1.16+s*.42, rightAngle=-1.98-s*.42;
  const leftTip=pt(510,360,132,leftAngle), rightTip=pt(735,360,132,rightAngle);
  return `${background('Windshield-Wiper System','A motor, crank, and linkage transform rotary motion into oscillating wiper motion.')}
    <path d="M420 130 Q625 60 870 130 L850 380 Q625 435 440 380Z" fill="#dcecf3" stroke="${palette.ink}" stroke-width="5"/>
    <rect class="dark" x="135" y="230" width="82" height="100" rx="13"/>${wheel(210,280,30,crankA,palette.input,6)}<circle class="input" cx="${pin[0]}" cy="${pin[1]}" r="10"/>
    <line class="link" x1="${pin[0]}" y1="${pin[1]}" x2="${sliderX}" y2="300"/><rect class="mechanism" x="${sliderX-18}" y="282" width="36" height="36" rx="5"/>
    <line class="link" x1="${sliderX}" y1="300" x2="510" y2="360"/><line class="link" x1="${sliderX}" y1="300" x2="735" y2="360"/>
    <circle class="mechanism" cx="510" cy="360" r="18"/><circle class="mechanism" cx="735" cy="360" r="18"/>
    <line stroke="#1d3543" stroke-width="13" stroke-linecap="round" x1="510" y1="360" x2="${leftTip[0]}" y2="${leftTip[1]}"/><line stroke="#1d3543" stroke-width="13" stroke-linecap="round" x1="735" y1="360" x2="${rightTip[0]}" y2="${rightTip[1]}"/>
    ${arrow(88,279,124,279,'input')}${label(58,250,['Input','motor'],palette.input,'start')}
    ${arrow(298,190,420,190,'transfer')}${label(350,160,['crank +','linkage'],palette.transfer)}
    ${arrow(885,325,924,287,'output')}${label(878,365,['oscillating','wipers'],palette.output)}
    ${small(625,104,'windshield')} ${small(355,334,'moving linkage')}`;
}

function sewing(t) {
  const a=t*1.35; const pin=pt(245,258,48,a); const needleY=292+78*(1-Math.cos(a))/2; const bobbinY=needleY+74;
  return `${background('Sewing-Machine Drive','A wheel and crank-slider convert rotary motion into a needle that moves up and down.')}
    <path d="M110 400 H790 V340 H595 V230 H350 V400Z" fill="#d8e7eb" stroke="${palette.ink}" stroke-width="5" stroke-linejoin="round"/>
    <rect class="dark" x="130" y="202" width="95" height="112" rx="14"/>${wheel(245,258,68,a,palette.input,8)}<circle class="input" cx="${pin[0]}" cy="${pin[1]}" r="11"/>
    <path d="M245 190 C330 130 453 130 520 190" fill="none" stroke="#415866" stroke-width="13" stroke-linecap="round"/><path d="M245 326 C330 386 453 386 520 326" fill="none" stroke="#415866" stroke-width="13" stroke-linecap="round"/>
    ${wheel(520,258,42,a,palette.transfer,7)}
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
  return `${background('Garage-Door Opener','A motor and chain drive a trolley; the trolley pulls the door upward along its track.')}
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
  const a=t*1.55; const handle=pt(190,270,70,a); const leftA=-a*.75, rightA=a*.75;
  function beater(cx,cy,rotation) { const arms=[0,Math.PI].map(k=>{const b=rotation+k;const [x1,y1]=pt(cx,cy,12,b),[x2,y2]=pt(cx,cy,76,b);return `<line stroke="#536d79" stroke-width="9" stroke-linecap="round" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/><ellipse cx="${x2}" cy="${y2}" rx="18" ry="34" fill="none" stroke="#536d79" stroke-width="6" transform="rotate(${deg(b)} ${x2} ${y2})"/>`;}).join(''); return arms; }
  return `${background('Egg-Beater System','A hand crank drives gears and two shafts so both beaters rotate in opposite directions.')}
    <rect x="92" y="390" width="800" height="49" fill="#dce8df"/><rect class="dark" x="116" y="205" width="95" height="125" rx="13"/>${wheel(190,270,28,a,palette.input,5)}
    <line class="link" x1="190" y1="270" x2="${handle[0]}" y2="${handle[1]}"/><circle class="input" cx="${handle[0]}" cy="${handle[1]}" r="13"/>
    ${gear(315,270,55,14,a,palette.input)}${gear(448,270,78,20,-a*.75)}${gear(585,270,78,20,a*.75)}
    <line class="link" x1="448" y1="270" x2="448" y2="384"/><line class="link" x1="585" y1="270" x2="585" y2="384"/>
    ${beater(448,384,leftA)}${beater(585,384,rightA)}
    ${arrow(52,270,103,270,'input')}${label(45,239,['Input','crank'],palette.input,'start')}
    ${arrow(342,143,459,143,'transfer')}${label(400,114,['gear train +','two shafts'],palette.transfer)}
    ${arrow(770,349,846,349,'output')}${label(820,382,['two rotary','beaters'],palette.output)}
    ${small(516,205,'meshed gears')} ${small(516,473,'mixing bowl')}`;
}

const systems = [
  { title:'Hand-Cranked Winch', badge:'Rotary → linear', description:'A person turns the crank. A gear pair changes the turning motion and a drum winds rope to lift a load.', draw:winch, trace:[['Input','A hand turns the crank.','input'],['Mechanisms','Crank shaft → small gear → large gear → drum → rope.','transfer'],['Output','The load moves upward in a straight line.','output']], identify:[['Crank','accepts the input rotary motion'],['Gear pair','transfers rotation and can trade speed for turning force'],['Drum and rope','turn rotation into linear lifting motion']], prompt:'Which part directly changes the drum’s rotary motion into the load’s linear upward motion?' },
  { title:'Bicycle Drivetrain', badge:'Rotary → rotary + linear', description:'Pedaling rotates the front chainring. The chain transfers rotation to the rear wheel, and the wheel produces forward travel.', draw:bicycle, trace:[['Input','A rider pushes the pedals.','input'],['Mechanisms','Crank and chainring → chain → rear sprocket.','transfer'],['Output','The rear wheel rotates and the bicycle moves forward.','output']], identify:[['Crank','changes pedal force into rotary motion'],['Chain and sprockets','transfer rotary motion across a distance'],['Rear wheel','uses rotation to create linear travel']], prompt:'Why is the chain a mechanism in this system even though it does not create the input or the final output?' },
  { title:'Windshield Wipers', badge:'Rotary → oscillating', description:'An electric motor turns continuously. A crank and linkage make the wipers sweep back and forth through an arc.', draw:wiper, trace:[['Input','The motor shaft rotates.','input'],['Mechanisms','Motor crank → moving linkage → wiper pivots.','transfer'],['Output','The wiper arms oscillate through repeated arcs.','output']], identify:[['Motor','provides continuous rotary input'],['Crank','moves a connection point in a circle'],['Linkage','transfers motion to both wiper pivots'],['Wiper arms','oscillate to clear the glass']], prompt:'What motion transformation occurs between the continuously rotating motor shaft and the wiper arms?' },
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
