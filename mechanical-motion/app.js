(() => {
  const topics = [
    {
      id: "motion-types", group: "Motion vocabulary", title: "Four types of mechanical motion",
      definition: "Motion is described by the path a specific part follows: rotary turns around an axis, linear moves in a line, reciprocating repeats along a line, and oscillating repeats through an arc.",
      notice: "Notice: a part can move back and forth without reciprocating. If its path is an arc around a pivot, it is oscillating.",
      evidence: [["Rotary", "Turns around an axis."], ["Linear", "Moves in one straight direction."], ["Reciprocating", "Repeats back and forth in a straight line."], ["Oscillating", "Repeats back and forth through an arc."]],
      draw: drawMotionTypes
    },
    {
      id: "input-output", group: "System analysis", title: "Input motion and output motion",
      definition: "Input motion is the motion entering a mechanism from the driver. Output motion is the motion produced by the driven part.",
      notice: "Notice: trace the power from the driver to the driven part. The machine may transfer the same motion type or transform it.",
      evidence: [["Driver", "The part that first receives force or motion."], ["Mechanism", "The connected parts that transfer or change motion."], ["Driven part", "The part that receives the output."], ["Example", "Motor rotation → crank and slider → piston reciprocation."]],
      draw: drawInputOutput
    },
    {
      id: "gears", group: "Mechanisms", title: "Gear train and gear ratio",
      definition: "Gears are toothed wheels that mesh to transfer rotary motion. Gear size changes the relationship between output speed and turning force.",
      notice: "Notice: a small driving gear turning a large driven gear makes the output slower but increases its available torque.",
      evidence: [["Input motion", "Rotary."], ["Output motion", "Rotary."], ["Gear ratio", "Driven teeth ÷ driving teeth."], ["Trade-off", "More torque usually means less output speed."]],
      draw: drawGears
    },
    {
      id: "belt-drive", group: "Mechanisms", title: "Belt-and-pulley drive",
      definition: "A flexible belt transfers rotary motion from one pulley to another. The pulleys can be the same size or different sizes.",
      notice: "Notice: an open belt makes the pulleys turn in the same direction. Changing pulley diameter trades speed for torque.",
      evidence: [["Input motion", "Rotary."], ["Output motion", "Rotary."], ["Visible clue", "A belt loops around wheels."], ["Direction", "Open belt = same direction; crossed belt = opposite direction."]],
      draw: drawBeltDrive
    },
    {
      id: "lifting-pulley", group: "Mechanisms", title: "Lifting pulley and mechanical advantage",
      definition: "A lifting pulley uses rope and grooved wheels to lift a load. Supporting rope segments can reduce the force needed, but more rope must be pulled.",
      notice: "Notice: the load rises a shorter distance than the hand pulls the rope. This is the force-distance trade-off.",
      evidence: [["Input motion", "Linear pull on the rope."], ["Output motion", "Linear lifting motion of the load."], ["Mechanical advantage", "Output force ÷ input force."], ["Trade-off", "Less input force requires more input distance."]],
      draw: drawLiftingPulley
    },
    {
      id: "crank-slider", group: "Mechanisms", title: "Crank and slider",
      definition: "A crank is an off-center arm on a rotating shaft. A slider is constrained to move in a straight path. Together they commonly change rotary motion into reciprocating motion.",
      notice: "Notice: the circular crank pin pushes and pulls the connecting rod, so the piston travels back and forth in a line.",
      evidence: [["Input motion", "Rotary."], ["Output motion", "Reciprocating."], ["Visible clue", "Off-center crank pin connected to a rod."], ["Examples", "Engine piston and sewing-machine needle."]],
      draw: drawCrankSlider
    },
    {
      id: "cam-follower", group: "Mechanisms", title: "Cam and follower",
      definition: "A cam is a specially shaped rotating part. A follower touches the cam and moves as it follows the cam’s changing edge.",
      notice: "Notice: the cam’s shape controls when, how far, and how quickly the follower moves.",
      evidence: [["Input motion", "Rotary."], ["Output motion", "Usually reciprocating; sometimes oscillating."], ["Visible clue", "A shaped rotating piece presses on another part."], ["Example", "An engine valve train."]],
      draw: drawCamFollower
    },
    {
      id: "linkage", group: "Mechanisms", title: "Linkage",
      definition: "A linkage is a set of rigid bars joined at pivots. It transfers motion and can change its direction or path.",
      notice: "Notice: the input motor turns in a circle, but the connected bars make the wiper blade sweep through an arc.",
      evidence: [["Input motion", "Rotary."], ["Output motion", "Often oscillating."], ["Visible clue", "Straight bars connected at pivots."], ["Examples", "Windshield wipers, pump handles, and door closers."]],
      draw: drawLinkage
    },
    {
      id: "torque", group: "Force and design", title: "Torque: useful turning force",
      definition: "Torque is the turning effect of a force around an axis. The same force produces more torque when it is applied farther from the pivot.",
      notice: "Notice: pushing a door near its handle is easier than pushing near its hinge because the handle is farther from the pivot.",
      evidence: [["Axis", "The point or line the object turns around."], ["Force", "A push or pull."], ["Lever arm", "The perpendicular distance from the axis."], ["Design use", "Gears and wheel-and-axle systems can increase useful torque."]],
      draw: drawTorque
    },
    {
      id: "design-choice", group: "Force and design", title: "Design choice: force or speed?",
      definition: "Engineers choose a mechanism by comparing its output with a goal. A design that increases force or torque usually gives up some speed or distance.",
      notice: "Notice: neither design is automatically better. The right design is the one that meets the stated goal and constraints.",
      evidence: [["Heavy load", "Choose greater torque or mechanical advantage."], ["Fast spin", "Choose greater output speed."], ["Criteria", "Measurable goals, such as required force or speed."], ["Constraints", "Limits such as space, safety, cost, or materials."]],
      draw: drawDesignChoice
    }
  ];

  const nav = document.getElementById("topicNav");
  const title = document.getElementById("topicTitle");
  const group = document.getElementById("topicGroup");
  const definition = document.getElementById("topicDefinition");
  const notice = document.getElementById("topicNotice");
  const evidenceList = document.getElementById("evidenceList");
  const diagram = document.getElementById("diagram");
  const svgTitle = document.getElementById("svgTitle");
  const svgDescription = document.getElementById("svgDescription");
  const playPause = document.getElementById("playPause");
  const reset = document.getElementById("reset");
  const speed = document.getElementById("speed");
  const speedValue = document.getElementById("speedValue");
  const statusText = document.getElementById("statusText");
  let active = topics[0];
  let running = true;
  let speedFactor = 0.5;
  let startTime = performance.now();
  let pausedAt = 0;

  topics.forEach(topic => {
    const button = document.createElement("button");
    button.className = "topic-button";
    button.type = "button";
    button.textContent = topic.title;
    button.dataset.topic = topic.id;
    button.setAttribute("aria-selected", "false");
    button.addEventListener("click", () => selectTopic(topic));
    nav.appendChild(button);
  });

  function selectTopic(topic) {
    active = topic;
    startTime = performance.now();
    pausedAt = 0;
    group.textContent = topic.group;
    title.textContent = topic.title;
    definition.textContent = topic.definition;
    notice.textContent = topic.notice;
    svgTitle.textContent = `${topic.title} animation`;
    svgDescription.textContent = topic.definition;
    evidenceList.innerHTML = "";
    topic.evidence.forEach(([term, explanation]) => {
      const dt = document.createElement("dt");
      const dd = document.createElement("dd");
      dt.textContent = term;
      dd.textContent = explanation;
      evidenceList.append(dt, dd);
    });
    document.querySelectorAll(".topic-button").forEach(button => button.setAttribute("aria-selected", String(button.dataset.topic === topic.id)));
    render(0);
  }

  function pointOnCircle(cx, cy, radius, angle) { return [cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius]; }
  function line(x1, y1, x2, y2, className = "machine-line") { return `<line class="${className}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/>`; }
  function text(x, y, value, className = "diagram-small", anchor = "start") { return `<text class="${className}" x="${x}" y="${y}" text-anchor="${anchor}">${value}</text>`; }
  function arrow(x1, y1, x2, y2, label) { return `${line(x1,y1,x2,y2,"motion-line")}<path d="M ${x2} ${y2} l -13 -7 l 0 14 z" fill="#1f6e9a"/>${label ? text((x1+x2)/2,(y1+y2)/2-11,label,"diagram-tiny","middle") : ""}`; }
  function gear(cx, cy, r, angle, className = "machine-accent") {
    const teeth = 12, points = [];
    for (let i = 0; i < teeth * 2; i++) { const a = angle + (Math.PI * 2 * i / (teeth * 2)); const rr = i % 2 ? r * .86 : r; points.push(`${cx + Math.cos(a)*rr},${cy + Math.sin(a)*rr}`); }
    return `<polygon class="${className}" points="${points.join(" ")}"/><circle class="machine-metal" cx="${cx}" cy="${cy}" r="${r*.28}"/>`;
  }
  function labelBox(x, y, width, label, color) { return `<rect class="callout" x="${x}" y="${y}" width="${width}" height="38" rx="5"/><rect x="${x}" y="${y}" width="7" height="38" fill="${color}"/><text class="diagram-small" x="${x+16}" y="${y+25}">${label}</text>`; }

  function drawMotionTypes(t) {
    const a = t * Math.PI * 2;
    const r = 51;
    const linearX = 350 + ((t * .42) % 1) * 120;
    const y = 325 + Math.sin(a) * 48;
    const angle = Math.sin(a) * .72;
    const swingRadius = 122;
    const swingLeftX = 800 - Math.sin(.72) * swingRadius;
    const swingY = 165 + Math.cos(.72) * swingRadius;
    const swingRightX = 800 + Math.sin(.72) * swingRadius;
    return `${text(150,54,"Rotary", "diagram-label", "middle")}${text(410,54,"Linear", "diagram-label", "middle")}${text(650,54,"Reciprocating", "diagram-label", "middle")}${text(800,54,"Oscillating", "diagram-label", "middle")}
      <circle class="machine-fill" cx="150" cy="180" r="67"/><line class="machine-line" x1="150" y1="180" x2="150" y2="105" transform="rotate(${a*180/Math.PI} 150 180)"/><circle class="input-color" cx="150" cy="105" r="13" transform="rotate(${a*180/Math.PI} 150 180)"/>${text(150,290,"turns around an axis","diagram-tiny","middle")}
      ${line(350,183,470,183,"motion-path")}${arrow(350,183,470,183,"straight path")}<circle class="input-color" cx="${linearX}" cy="183" r="14"/>${text(410,290,"moves one direction","diagram-tiny","middle")}
      ${line(580,325,720,325,"motion-path")}<circle class="input-color" cx="${650 + Math.sin(a)*70}" cy="325" r="14"/>${text(650,390,"repeats along a line","diagram-tiny","middle")}
      <line class="support" x1="800" y1="125" x2="800" y2="165"/><path class="motion-path" d="M ${swingLeftX} ${swingY} A ${swingRadius} ${swingRadius} 0 0 1 ${swingRightX} ${swingY}"/><line class="machine-line" x1="800" y1="165" x2="${800 + Math.sin(angle)*swingRadius}" y2="${165 + Math.cos(angle)*swingRadius}"/><circle class="input-color" cx="${800 + Math.sin(angle)*swingRadius}" cy="${165 + Math.cos(angle)*swingRadius}" r="15"/>${text(800,390,"repeats through an arc","diagram-tiny","middle")}`;
  }

  function drawInputOutput(t) {
    const a=t*Math.PI*2, crankAngle=-a, cx=328, cy=232, r=75;
    const [px,py]=pointOnCircle(cx,cy,r,crankAngle); const sliderX=570 + Math.cos(a)*88;
    return `${labelBox(55,52,160,"Input: rotary motor", "#d96d33")}${labelBox(655,52,175,"Output: reciprocating piston", "#367a5a")}
      <circle class="machine-metal" cx="174" cy="230" r="72"/><circle class="input-color" cx="174" cy="230" r="22"/><line class="machine-line" x1="174" y1="230" x2="174" y2="161" transform="rotate(${a*360} 174 230)"/><circle class="machine-accent" cx="174" cy="161" r="14" transform="rotate(${a*360} 174 230)"/>
      ${arrow(250,230,286,230,"motion enters")}<circle class="machine-fill" cx="${cx}" cy="${cy}" r="90"/>${gear(cx,cy,75,a,"machine-accent")}<circle class="machine-metal" cx="${cx}" cy="${cy}" r="18"/>
      <circle class="input-color" cx="${px}" cy="${py}" r="13"/>${line(px,py,sliderX,232)}<rect class="output-color" x="${sliderX-30}" y="190" width="60" height="84" rx="7"/>${line(495,175,495,290,"support")}${line(650,175,650,290,"support")}${line(475,180,670,180,"ground")}${line(475,290,670,290,"ground")}${arrow(700,232,815,232,"output moves back and forth")}
      ${text(174,350,"driver", "diagram-label", "middle")}${text(328,350,"mechanism", "diagram-label", "middle")}${text(570,350,"driven part", "diagram-label", "middle")}`;
  }

  function drawGears(t) {
    const a=t*Math.PI*2, small=60, big=110, c1=[285,230],c2=[455,230], teeth1=10,teeth2=30;
    return `${labelBox(105,48,180,"Driving gear: 10 teeth", "#d96d33")}${labelBox(585,48,196,"Driven gear: 30 teeth", "#367a5a")}
      ${gear(c1[0],c1[1],small,a*3,"input-color")}${gear(c2[0],c2[1],big,-a,"output-color")}${text(c1[0],c1[1]+8,"10", "diagram-label","middle")}${text(c2[0],c2[1]+8,"30", "diagram-label","middle")}
      ${arrow(150,354,338,354,"3 driver turns")} ${arrow(530,354,591,354,"1 output turn")}
      <rect class="callout" x="610" y="170" width="220" height="123" rx="6"/>${text(625,200,"Gear ratio = 30 ÷ 10 = 3:1", "diagram-small")}${text(625,231,"Output speed: slower", "diagram-small")}${text(625,261,"Output torque: greater", "diagram-small")}
      ${text(365,430,"Meshing gears turn in opposite directions.","diagram-small","middle")}`;
  }

  function drawBeltDrive(t) {
    const a=t*Math.PI*2, c1=[260,225],c2=[590,225], r1=72,r2=112;
    const driverAngle=a*2, outputAngle=driverAngle*r1/r2;
    return `${labelBox(115,48,155,"Input pulley", "#d96d33")}${labelBox(625,48,160,"Output pulley", "#367a5a")}
      <path d="M ${c1[0]} ${c1[1]-r1} L ${c2[0]} ${c2[1]-r2} A ${r2} ${r2} 0 0 1 ${c2[0]} ${c2[1]+r2} L ${c1[0]} ${c1[1]+r1} A ${r1} ${r1} 0 0 1 ${c1[0]} ${c1[1]-r1}" fill="none" stroke="#506873" stroke-width="22"/>
      <circle class="input-color" cx="${c1[0]}" cy="${c1[1]}" r="${r1}"/><circle class="output-color" cx="${c2[0]}" cy="${c2[1]}" r="${r2}"/><line class="machine-line" x1="${c1[0]}" y1="${c1[1]}" x2="${c1[0]}" y2="${c1[1]-r1+10}" transform="rotate(${driverAngle*180/Math.PI} ${c1[0]} ${c1[1]})"/><line class="machine-line" x1="${c2[0]}" y1="${c2[1]}" x2="${c2[0]}" y2="${c2[1]-r2+10}" transform="rotate(${outputAngle*180/Math.PI} ${c2[0]} ${c2[1]})"/>
      ${text(425,365,"Open belt: both pulleys rotate in the same direction.","diagram-small","middle")}${text(425,397,"Because the output pulley is larger, it turns more slowly.","diagram-tiny","middle")}`;
  }

  function drawLiftingPulley(t) {
    const phase = Math.sin(t*Math.PI*2);
    const loadY=220 - phase*20, handY=300 + phase*40;
    return `${labelBox(55,48,178,"Input: pull rope down", "#d96d33")}${labelBox(665,48,165,"Output: load rises", "#367a5a")}
      ${line(205,100,760,100,"support")}<circle class="machine-metal" cx="680" cy="100" r="45"/><circle class="machine-metal" cx="445" cy="${loadY}" r="45"/>
      <path d="M 400 100 L 400 ${loadY} A 45 45 0 0 0 490 ${loadY} L 490 100 L 635 100 A 45 45 0 0 0 725 100 L 725 ${handY}" fill="none" stroke="#49606d" stroke-width="10" stroke-linecap="round"/>
      <rect class="output-color" x="385" y="${loadY+47}" width="120" height="76" rx="6"/>${text(445,loadY+93,"LOAD","diagram-small","middle")}<circle class="input-color" cx="725" cy="${handY}" r="15"/>
      ${text(445,389,"Two rope segments support the movable pulley.","diagram-small","middle")}${text(445,416,"The hand moves twice as far as the load in this ideal 2:1 system.","diagram-tiny","middle")}`;
  }

  function drawCrankSlider(t) {
    const a=t*Math.PI*2, cx=285, cy=235, r=95, [px,py]=pointOnCircle(cx,cy,r,a), sliderX=570 + Math.cos(a)*105;
    return `${labelBox(85,48,174,"Input: rotary crank", "#d96d33")}${labelBox(645,48,184,"Output: reciprocating slider", "#367a5a")}
      <circle class="machine-metal" cx="${cx}" cy="${cy}" r="103"/><line class="machine-line" x1="${cx}" y1="${cy}" x2="${px}" y2="${py}"/><circle class="input-color" cx="${px}" cy="${py}" r="15"/><circle class="machine-metal" cx="${cx}" cy="${cy}" r="18"/>
      ${line(px,py,sliderX,235)}<rect class="output-color" x="${sliderX-35}" y="185" width="70" height="100" rx="6"/>${line(470,178,470,292,"ground")}${line(735,178,735,292,"ground")}${line(450,178,755,178,"ground")}${line(450,292,755,292,"ground")}
      ${text(cx,395,"off-center crank pin", "diagram-small","middle")}${text(605,395,"slider moves in a straight line", "diagram-small","middle")}`;
  }

  function drawCamFollower(t) {
    const a=t*Math.PI*2, cx=315,cy=270;
    const points=[]; for(let i=0;i<80;i++){const theta=i*Math.PI*2/80;const rr=78+28*Math.cos(theta-a);points.push(`${cx+Math.cos(theta)*rr},${cy+Math.sin(theta)*rr}`);}
    const topRadius=78+28*Math.cos(-Math.PI/2-a), contactY=cy-topRadius, followerTop=contactY-104;
    return `${labelBox(100,48,165,"Input: rotary cam", "#d96d33")}${labelBox(627,48,182,"Output: follower rises", "#367a5a")}
      <polygon class="input-color" points="${points.join(" ")}"/><circle class="machine-metal" cx="${cx}" cy="${cy}" r="17"/><rect class="output-color" x="${cx-27}" y="${followerTop}" width="54" height="104" rx="5"/>${line(cx,followerTop,cx,55,"machine-line")}${line(535,104,535,315,"support")}${line(355,315,725,315,"ground")}
      ${arrow(655,290,655,120,"follower moves up and down")}${text(470,384,"The rotating cam stays in contact with the follower.","diagram-small","middle")}`;
  }

  function drawLinkage(t) {
    const a=t*Math.PI*2, cx=210,cy=245,r=58,[pinX,pinY]=pointOnCircle(cx,cy,r,a); const pivotX=690,pivotY=268; const wiperAngle=-2.12+Math.sin(a)*.48; const jointX=pivotX+Math.cos(wiperAngle)*88,jointY=pivotY+Math.sin(wiperAngle)*88; const tipX=pivotX+Math.cos(wiperAngle)*175,tipY=pivotY+Math.sin(wiperAngle)*175;
    return `${labelBox(58,48,165,"Input: rotary motor", "#d96d33")}${labelBox(632,48,195,"Output: wiper oscillates", "#367a5a")}
      <circle class="machine-metal" cx="${cx}" cy="${cy}" r="68"/><circle class="input-color" cx="${pinX}" cy="${pinY}" r="14"/><circle class="machine-metal" cx="${cx}" cy="${cy}" r="18"/>${line(pinX,pinY,jointX,jointY)}<circle class="machine-accent" cx="${jointX}" cy="${jointY}" r="15"/>${line(pivotX,pivotY,tipX,tipY,"machine-line")}<circle class="machine-metal" cx="${pivotX}" cy="${pivotY}" r="18"/><path class="motion-path" d="M 530 118 A 220 220 0 0 1 560 390"/>
      ${text(450,393,"The connecting rod turns the pivoted wiper arm.", "diagram-small","middle")}`;
  }

  function drawTorque(t) {
    const a=-.9+Math.sin(t*Math.PI*2)*.45;
    return `${labelBox(70,48,188,"Same force, different torque", "#f3b544")}
      <line class="support" x1="215" y1="320" x2="215" y2="365"/><line class="support" x1="640" y1="320" x2="640" y2="365"/><circle class="machine-metal" cx="215" cy="320" r="18"/><circle class="machine-metal" cx="640" cy="320" r="18"/>
      <line class="machine-line" x1="215" y1="320" x2="305" y2="${320+Math.sin(a)*90}"/><line class="machine-line" x1="640" y1="320" x2="835" y2="${320+Math.sin(a)*195}"/>
      ${arrow(300,170,300,242,"same force")}${arrow(825,170,825,242,"same force")}<path class="motion-path" d="M 160 288 A 66 66 0 0 1 270 250"/><path class="motion-path" d="M 510 280 A 170 170 0 0 1 770 180"/>
      ${text(215,405,"short lever arm → less torque", "diagram-small","middle")}${text(640,405,"long lever arm → more torque", "diagram-small","middle")}`;
  }

  function drawDesignChoice(t) {
    const a=t*Math.PI*2, c1=[252,230],c2=[412,230], c3=[590,230],c4=[750,230];
    return `${text(335,56,"Design A: lift a heavy load", "diagram-label","middle")}${text(675,56,"Design B: spin quickly", "diagram-label","middle")}
      ${gear(c1[0],c1[1],52,a*3,"input-color")}${gear(c2[0],c2[1],108,-a,"output-color")}${gear(c3[0],c3[1],108,a,"input-color")}${gear(c4[0],c4[1],52,-a*3,"output-color")}
      <rect class="callout" x="152" y="360" width="368" height="55" rx="5"/>${text(336,385,"small driver → large driven", "diagram-small","middle")}${text(336,406,"slower output · greater torque", "diagram-tiny","middle")}
      <rect class="callout" x="560" y="360" width="280" height="55" rx="5"/>${text(700,385,"large driver → small driven", "diagram-small","middle")}${text(700,406,"faster output · less torque", "diagram-tiny","middle")}`;
  }

  function render(now) {
    const elapsed = running ? (now - startTime) / 1000 * speedFactor : pausedAt;
    diagram.innerHTML = active.draw(elapsed);
  }
  function tick(now) { render(now); requestAnimationFrame(tick); }

  playPause.addEventListener("click", () => {
    if (running) {
      pausedAt = (performance.now() - startTime) / 1000 * speedFactor;
      running = false;
      playPause.textContent = "Play animation";
      playPause.setAttribute("aria-pressed", "false");
      statusText.textContent = "Animation paused";
    } else {
      startTime = performance.now() - pausedAt / speedFactor * 1000;
      running = true;
      playPause.textContent = "Pause animation";
      playPause.setAttribute("aria-pressed", "true");
      statusText.textContent = "Animation playing";
    }
  });
  reset.addEventListener("click", () => { startTime = performance.now(); pausedAt = 0; render(0); });
  speed.addEventListener("input", () => {
    const current = running ? (performance.now() - startTime) / 1000 * speedFactor : pausedAt;
    speedFactor = Number(speed.value);
    pausedAt = current;
    startTime = performance.now() - current / speedFactor * 1000;
    speedValue.value = `${speedFactor.toFixed(2).replace(".00", "")}×`;
  });
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) playPause.click();
  selectTopic(topics[0]);
  requestAnimationFrame(tick);
})();
