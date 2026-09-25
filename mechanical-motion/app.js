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
  function arrow(x1, y1, x2, y2, label = "", labelX = null, labelY = null) {
    const angle = Math.atan2(y2-y1, x2-x1), cosine = Math.cos(angle), sine = Math.sin(angle);
    const baseX = x2 - 15*cosine, baseY = y2 - 15*sine;
    const leftX = baseX + 7*sine, leftY = baseY - 7*cosine;
    const rightX = baseX - 7*sine, rightY = baseY + 7*cosine;
    const tx = labelX ?? (x1+x2)/2;
    const ty = labelY ?? (y1+y2)/2-11;
    return `${line(x1,y1,x2,y2,"motion-line")}<path d="M ${x2} ${y2} L ${leftX} ${leftY} L ${rightX} ${rightY} Z" fill="#1f6e9a"/>${label ? text(tx,ty,label,"diagram-tiny","middle") : ""}`;
  }
  function gear(cx, cy, r, angle, className = "machine-accent", teeth = 12) {
    const points = [];
    for (let i = 0; i < teeth * 2; i++) { const a = angle + (Math.PI * 2 * i / (teeth * 2)); const rr = i % 2 ? r * .86 : r; points.push(`${cx + Math.cos(a)*rr},${cy + Math.sin(a)*rr}`); }
    return `<polygon class="${className}" points="${points.join(" ")}"/><circle class="machine-metal" cx="${cx}" cy="${cy}" r="${r*.28}"/>`;
  }
  function labelBox(x, y, width, label, color) { return `<rect class="callout" x="${x}" y="${y}" width="${width}" height="38" rx="5"/><rect x="${x}" y="${y}" width="7" height="38" fill="${color}"/><text class="diagram-small" x="${x+16}" y="${y+25}">${label}</text>`; }

  function drawMotionTypes(t) {
    const a = t * Math.PI * 2;
    const linearX = 285 + ((t * .38) % 1) * 145;
    const reciprocalX = 565 + Math.sin(a) * 74;
    const pivotX = 790, pivotY = 150, armLength = 122, swing = Math.sin(a) * .68;
    const tipX = pivotX + Math.sin(swing) * armLength, tipY = pivotY + Math.cos(swing) * armLength;
    const leftX = pivotX - Math.sin(.68) * armLength, rightX = pivotX + Math.sin(.68) * armLength, arcY = pivotY + Math.cos(.68) * armLength;
    return `${text(125,52,"Rotary", "diagram-label", "middle")}${text(360,52,"Linear", "diagram-label", "middle")}${text(585,52,"Reciprocating", "diagram-label", "middle")}${text(790,52,"Oscillating", "diagram-label", "middle")}
      <circle class="machine-fill" cx="125" cy="190" r="72"/><line class="machine-line" x1="125" y1="190" x2="125" y2="112" transform="rotate(${a*180/Math.PI} 125 190)"/><circle class="input-color" cx="125" cy="112" r="13" transform="rotate(${a*180/Math.PI} 125 190)"/>${text(125,330,"turns around an axis", "diagram-small", "middle")}
      ${arrow(285,248,430,248,"one direction",360,238)}<circle class="input-color" cx="${linearX}" cy="190" r="16"/>${text(360,330,"moves in a straight line", "diagram-small", "middle")}
      <rect class="machine-fill" x="${reciprocalX-25}" y="164" width="50" height="52" rx="6"/>${arrow(490,248,680,248,"back and forth",585,238)}${text(585,330,"repeats along a line", "diagram-small", "middle")}
      <line class="support" x1="${pivotX}" y1="90" x2="${pivotX}" y2="${pivotY}"/><line class="machine-line" x1="${pivotX}" y1="${pivotY}" x2="${tipX}" y2="${tipY}"/><circle class="input-color" cx="${tipX}" cy="${tipY}" r="16"/>${text(pivotX,330,"repeats through an arc", "diagram-small", "middle")}`;
  }

  function drawInputOutput(t) {
    const a = t*Math.PI*2, cx = 330, cy = 225, crankRadius = 78;
    const [pinX,pinY] = pointOnCircle(cx,cy,crankRadius,a);
    const sliderX = 610 + Math.cos(a)*88;
    return `${labelBox(42,42,190,"Input: rotary motor", "#d96d33")}${labelBox(650,42,205,"Output: reciprocating piston", "#367a5a")}
      <rect class="machine-fill" x="66" y="161" width="108" height="128" rx="12"/><circle class="input-color" cx="174" cy="225" r="46"/><circle class="machine-metal" cx="174" cy="225" r="12"/><line class="machine-line" x1="174" y1="225" x2="330" y2="225"/>
      <circle class="machine-fill" cx="${cx}" cy="${cy}" r="96"/><line class="machine-line" x1="${cx}" y1="${cy}" x2="${pinX}" y2="${pinY}"/><circle class="input-color" cx="${pinX}" cy="${pinY}" r="14"/><circle class="machine-metal" cx="${cx}" cy="${cy}" r="18"/>
      ${line(pinX,pinY,sliderX,225)}<line class="ground" x1="490" y1="152" x2="748" y2="152"/><line class="ground" x1="490" y1="298" x2="748" y2="298"/><rect class="output-color" x="${sliderX-33}" y="166" width="66" height="118" rx="8"/>${arrow(495,340,730,340)}
      <rect class="callout" x="105" y="392" width="300" height="36" rx="5"/>${text(255,416,"Motor rotation drives the crank", "diagram-small","middle")}<rect class="callout" x="475" y="392" width="300" height="36" rx="5"/>${text(625,416,"Piston moves back and forth", "diagram-small","middle")}`;
  }

  function drawGears(t) {
    const a = t*Math.PI*2, driverX = 265, drivenX = 515, y = 220, driverR = 75, drivenR = 175;
    return `${labelBox(65,42,220,"Driving gear: 12 teeth", "#d96d33")}${labelBox(590,42,230,"Driven gear: 36 teeth", "#367a5a")}
      ${gear(driverX,y,driverR,a,"input-color",12)}${gear(drivenX,y,drivenR,-a/3,"output-color",36)}<circle class="machine-metal" cx="${driverX}" cy="${y}" r="20"/><circle class="machine-metal" cx="${drivenX}" cy="${y}" r="28"/>
      ${text(driverX,y+7,"12", "diagram-label","middle")}${text(drivenX,y+8,"36", "diagram-label","middle")}
      <rect class="callout" x="710" y="166" width="170" height="122" rx="6"/>${text(724,200,"Gear ratio = 36 ÷ 12", "diagram-tiny")}${text(724,231,"= 3 : 1", "diagram-label")}${text(724,262,"Output: slower, stronger", "diagram-tiny")}
      ${text(390,425,"The 12-tooth driver turns 3 times while the 36-tooth driven gear turns once.","diagram-small","middle")}`;
  }

  function drawBeltDrive(t) {
    const a = t*Math.PI*2, driverX = 235, drivenX = 620, y = 220, driverR = 78, drivenR = 128;
    const tilt = Math.asin((drivenR-driverR)/(drivenX-driverX));
    const topDriver = [driverX-driverR*Math.sin(tilt), y-driverR*Math.cos(tilt)];
    const topDriven = [drivenX-drivenR*Math.sin(tilt), y-drivenR*Math.cos(tilt)];
    const bottomDriver = [driverX+driverR*Math.sin(tilt), y+driverR*Math.cos(tilt)];
    const bottomDriven = [drivenX+drivenR*Math.sin(tilt), y+drivenR*Math.cos(tilt)];
    const driverAngle = a*.72, outputAngle = driverAngle*driverR/drivenR;
    return `${labelBox(65,42,180,"Driving pulley", "#d96d33")}${labelBox(660,42,180,"Driven pulley", "#367a5a")}
      <line x1="${topDriver[0]}" y1="${topDriver[1]}" x2="${topDriven[0]}" y2="${topDriven[1]}" stroke="#596b75" stroke-width="18"/><line x1="${bottomDriver[0]}" y1="${bottomDriver[1]}" x2="${bottomDriven[0]}" y2="${bottomDriven[1]}" stroke="#596b75" stroke-width="18"/>
      <circle class="input-color" cx="${driverX}" cy="${y}" r="${driverR}"/><circle class="output-color" cx="${drivenX}" cy="${y}" r="${drivenR}"/><circle class="machine-metal" cx="${driverX}" cy="${y}" r="16"/><circle class="machine-metal" cx="${drivenX}" cy="${y}" r="22"/>
      <line class="machine-line" x1="${driverX}" y1="${y}" x2="${driverX}" y2="${y-driverR+9}" transform="rotate(${driverAngle*180/Math.PI} ${driverX} ${y})"/><line class="machine-line" x1="${drivenX}" y1="${y}" x2="${drivenX}" y2="${y-drivenR+9}" transform="rotate(${outputAngle*180/Math.PI} ${drivenX} ${y})"/>
      ${text(driverX,348,"smaller driver", "diagram-small","middle")}${text(drivenX,386,"larger driven pulley", "diagram-small","middle")}${text(430,426,"Open belt: both pulleys turn in the same direction. The larger pulley turns more slowly.","diagram-small","middle")}`;
  }

  function drawLiftingPulley(t) {
    const phase = Math.sin(t*Math.PI*2);
    const loadY=258 - phase*22, handY=303 + phase*44;
    const movingX=480, movingRadius=50, fixedX=580, fixedY=145, fixedRadius=50;
    const leftRopeX=movingX-movingRadius, rightRopeX=movingX+movingRadius, freeRopeX=fixedX+fixedRadius;
    return `${labelBox(48,48,176,"Input: pull rope down", "#d96d33")}${labelBox(656,48,185,"Output: load rises", "#367a5a")}
      ${line(300,80,760,80,"support")}<rect x="${leftRopeX-14}" y="93" width="28" height="${loadY-98}" rx="12" fill="#e4f3fa"/><rect x="${rightRopeX-14}" y="${fixedY+10}" width="28" height="${loadY-fixedY-6}" rx="12" fill="#e4f3fa"/>
      <circle class="machine-metal" cx="${fixedX}" cy="${fixedY}" r="${fixedRadius}"/><circle class="machine-metal" cx="${movingX}" cy="${loadY}" r="${movingRadius}"/>
      <path d="M ${leftRopeX} 80 L ${leftRopeX} ${loadY} A ${movingRadius} ${movingRadius} 0 0 0 ${rightRopeX} ${loadY} L ${rightRopeX} ${fixedY} A ${fixedRadius} ${fixedRadius} 0 0 1 ${freeRopeX} ${fixedY} L ${freeRopeX} ${handY}" fill="none" stroke="#755235" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
      <circle class="machine-accent" cx="${leftRopeX}" cy="80" r="9"/><circle class="machine-fill" cx="${fixedX}" cy="${fixedY}" r="11"/><circle class="machine-fill" cx="${movingX}" cy="${loadY}" r="11"/><rect class="output-color" x="${movingX-60}" y="${loadY+47}" width="120" height="76" rx="6"/><circle class="input-color" cx="${freeRopeX}" cy="${handY}" r="15"/>
      ${arrow(330,loadY+34,330,loadY-35)}${arrow(freeRopeX+68,handY-92,freeRopeX+68,handY-28)}
      <rect class="callout" x="72" y="398" width="354" height="38" rx="5"/><rect x="72" y="398" width="8" height="38" fill="#d96d33"/>${text(249,423,"Pull the free end down 2 units", "diagram-small","middle")}<rect class="callout" x="468" y="398" width="354" height="38" rx="5"/><rect x="468" y="398" width="8" height="38" fill="#367a5a"/>${text(645,423,"The load rises 1 unit", "diagram-small","middle")}`;
  }

  function drawCrankSlider(t) {
    const a=t*Math.PI*2, cx=285, cy=235, r=95, [px,py]=pointOnCircle(cx,cy,r,a), sliderX=570 + Math.cos(a)*105;
    return `${labelBox(85,48,174,"Input: rotary crank", "#d96d33")}${labelBox(645,48,184,"Output: reciprocating slider", "#367a5a")}
      <circle class="machine-metal" cx="${cx}" cy="${cy}" r="103"/><line class="machine-line" x1="${cx}" y1="${cy}" x2="${px}" y2="${py}"/><circle class="input-color" cx="${px}" cy="${py}" r="15"/><circle class="machine-metal" cx="${cx}" cy="${cy}" r="18"/>
      ${line(px,py,sliderX,235)}<rect class="output-color" x="${sliderX-35}" y="185" width="70" height="100" rx="6"/>${line(470,178,470,292,"ground")}${line(735,178,735,292,"ground")}${line(450,178,755,178,"ground")}${line(450,292,755,292,"ground")}
      <rect class="callout" x="90" y="392" width="330" height="36" rx="5"/>${text(255,416,"Crank turns in a circle", "diagram-small","middle")}<rect class="callout" x="470" y="392" width="330" height="36" rx="5"/>${text(635,416,"Slider moves back and forth", "diagram-small","middle")}`;
  }

  function drawCamFollower(t) {
    const a=t*Math.PI*2, cx=300, cy=282;
    const points=[]; for(let i=0;i<96;i++){const theta=i*Math.PI*2/96;const radius=78+27*Math.cos(theta-a);points.push(`${cx+Math.cos(theta)*radius},${cy+Math.sin(theta)*radius}`);}
    const contactRadius=78+27*Math.cos(-Math.PI/2-a), contactY=cy-contactRadius, followerTop=contactY-106;
    return `${labelBox(72,42,180,"Input: rotary cam", "#d96d33")}${labelBox(630,42,205,"Output: reciprocating follower", "#367a5a")}
      <polygon class="input-color" points="${points.join(" ")}"/><circle class="machine-metal" cx="${cx}" cy="${cy}" r="18"/>
      <line class="support" x1="${cx-48}" y1="72" x2="${cx-48}" y2="348"/><line class="support" x1="${cx+48}" y1="72" x2="${cx+48}" y2="348"/><rect class="output-color" x="${cx-28}" y="${followerTop}" width="56" height="106" rx="6"/>${line(cx,followerTop,cx,75,"machine-line")}
      ${arrow(520,305,520,112)}
      <rect class="callout" x="112" y="392" width="320" height="36" rx="5"/>${text(272,416,"Cam rotates in a circle", "diagram-small","middle")}<rect class="callout" x="470" y="392" width="320" height="36" rx="5"/>${text(630,416,"Follower moves up and down", "diagram-small","middle")}`;
  }

  function drawLinkage(t) {
    const a = t*Math.PI*2, inputX = 205, inputY = 258, crankR = 58, outputX = 610, outputY = 258, rodLength = 360, rockerLength = 125;
    const [pinX,pinY] = pointOnCircle(inputX,inputY,crankR,a);
    const dx = outputX-pinX, dy = outputY-pinY, distance = Math.hypot(dx,dy);
    const along = (rodLength*rodLength-rockerLength*rockerLength+distance*distance)/(2*distance);
    const offset = Math.sqrt(Math.max(0,rodLength*rodLength-along*along));
    const baseX = pinX + along*dx/distance, baseY = pinY + along*dy/distance;
    const jointX = baseX + offset*dy/distance, jointY = baseY - offset*dx/distance;
    const rockerAngle = Math.atan2(jointY-outputY,jointX-outputX);
    const tipX = outputX + Math.cos(rockerAngle)*205, tipY = outputY + Math.sin(rockerAngle)*205;
    return `${labelBox(56,42,186,"Input: rotary crank", "#d96d33")}${labelBox(633,42,205,"Output: oscillating arm", "#367a5a")}
      <circle class="machine-fill" cx="${inputX}" cy="${inputY}" r="76"/><line class="machine-line" x1="${inputX}" y1="${inputY}" x2="${pinX}" y2="${pinY}"/><circle class="input-color" cx="${pinX}" cy="${pinY}" r="14"/><circle class="machine-metal" cx="${inputX}" cy="${inputY}" r="18"/>
      ${line(pinX,pinY,jointX,jointY)}<circle class="machine-accent" cx="${jointX}" cy="${jointY}" r="14"/>${line(outputX,outputY,tipX,tipY,"machine-line")}<circle class="machine-metal" cx="${outputX}" cy="${outputY}" r="19"/>
      <rect class="callout" x="92" y="392" width="340" height="36" rx="5"/>${text(262,416,"Rotary crank moves the linkage", "diagram-small","middle")}<rect class="callout" x="472" y="392" width="340" height="36" rx="5"/>${text(642,416,"Output arm sweeps through an arc", "diagram-small","middle")}`;
  }

  function drawTorque(t) {
    const y = 265, nearPivot = 150, nearForce = 270, nearEnd = 410, farPivot = 510, farForce = 770, farEnd = 810;
    return `${labelBox(62,42,270,"Same downward force", "#f3b544")}
      ${line(nearPivot,y,nearEnd,y,"machine-line")}${line(farPivot,y,farEnd,y,"machine-line")}<line class="support" x1="${nearPivot}" y1="${y}" x2="${nearPivot}" y2="338"/><line class="support" x1="${farPivot}" y1="${y}" x2="${farPivot}" y2="338"/><line class="ground" x1="78" y1="338" x2="222" y2="338"/><line class="ground" x1="438" y1="338" x2="582" y2="338"/>
      <circle class="machine-metal" cx="${nearPivot}" cy="${y}" r="19"/><circle class="machine-metal" cx="${farPivot}" cy="${y}" r="19"/><circle class="input-color" cx="${nearForce}" cy="${y}" r="12"/><circle class="input-color" cx="${farForce}" cy="${y}" r="12"/>
      ${arrow(nearForce,108,nearForce,252,"same force",nearForce,96)}${arrow(farForce,108,farForce,252,"same force",farForce,96)}
      <rect class="callout" x="66" y="384" width="360" height="42" rx="5"/>${text(246,409,"Force close to pivot → less torque", "diagram-small","middle")}<rect class="callout" x="474" y="384" width="360" height="42" rx="5"/>${text(654,409,"Force far from pivot → more torque", "diagram-small","middle")}`;
  }

  function drawDesignChoice(t) {
    const a=t*Math.PI*2, small=48, large=96, c1=[185,230],c2=[329,230], c3=[570,230],c4=[714,230];
    return `${text(255,56,"Design A: lift a heavy load", "diagram-label","middle")}${text(650,56,"Design B: spin quickly", "diagram-label","middle")}
      ${gear(c1[0],c1[1],small,a*1.2,"input-color",12)}${gear(c2[0],c2[1],large,-a*.6,"output-color",24)}${gear(c3[0],c3[1],large,a*.6,"input-color",24)}${gear(c4[0],c4[1],small,-a*1.2,"output-color",12)}
      <rect class="callout" x="70" y="360" width="370" height="58" rx="5"/>${text(255,385,"Small driver → large driven", "diagram-small","middle")}${text(255,408,"Slower output · greater torque", "diagram-tiny","middle")}
      <rect class="callout" x="465" y="360" width="370" height="58" rx="5"/>${text(650,385,"Large driver → small driven", "diagram-small","middle")}${text(650,408,"Faster output · less torque", "diagram-tiny","middle")}`;
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
