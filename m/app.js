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
      notice: "Notice: meshed gears always turn in opposite directions. A small driving gear turning a large driven gear makes the output slower but increases its available torque.",
      evidence: [["Input motion", "Rotary."], ["Output motion", "Rotary."], ["Gear ratio", "Driven teeth ÷ driving teeth."], ["Trade-off", "More torque usually means less output speed."]],
      draw: drawGears
    },
    {
      id: "belt-drive", group: "Mechanisms", title: "Belt-and-pulley drive",
      definition: "A flexible belt transfers rotary motion from one pulley to another. The pulleys can be the same size or different sizes.",
      notice: "Notice: an open belt makes the pulleys turn in the same direction; a crossed belt makes them turn in opposite directions. Changing pulley diameter trades speed for torque.",
      evidence: [["Input motion", "Rotary."], ["Output motion", "Rotary."], ["Visible clue", "A belt loops around wheels."], ["Direction", "Open belt = same direction; crossed belt = opposite direction."]],
      draw: drawBeltDrive
    },
    {
      id: "lifting-pulley", group: "Mechanisms", title: "Lifting pulley and mechanical advantage",
      definition: "A lifting pulley uses rope and grooved wheels to lift a load. Supporting rope segments can reduce the force needed, but more rope must be pulled.",
      notice: "Notice: one fixed pulley only changes the direction of a pull. A moving pulley with two supporting rope segments needs about half the force, but the hand must pull twice as much rope.",
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
  const knowledgeCheck = document.getElementById("knowledgeCheck");
  const checkAnswers = document.getElementById("checkAnswers");
  const resetQuestions = document.getElementById("resetQuestions");
  const checkFeedback = document.getElementById("checkFeedback");
  const checkInstructions = document.getElementById("checkInstructions");
  const trackerForm = document.getElementById("trackerForm");
  const studentName = document.getElementById("studentName");
  const studentPeriod = document.getElementById("studentPeriod");
  const trackerStatus = document.getElementById("trackerStatus");
  const LOGGER_URL = "https://script.google.com/macros/s/AKfycbxc0lcjHaTv2Q_NanwJ_5NquwnAQhnWh28DHX62v3zFWKPFTXOa6-OGYPhotzbSUK9f0g/exec";
  const tracking = { studentName: "", period: "", sessionId: "", pending: 0, failed: 0 };
  const completedTopics = new Set();
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
    updateTopicButtons();
    renderKnowledgeCheck();
    checkFeedback.className = "check-feedback";
    checkFeedback.textContent = "";
    render(0);
  }

  function updateTopicButtons() {
    document.querySelectorAll(".topic-button").forEach(button => {
      const isComplete = completedTopics.has(button.dataset.topic);
      button.setAttribute("aria-selected", String(button.dataset.topic === active.id));
      button.classList.toggle("is-complete", isComplete);
      button.setAttribute("aria-label", `${button.textContent}${isComplete ? " — completed" : ""}`);
    });
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
      ${arrow(190,128,248,115,"clockwise ↻",218,100)}${arrow(605,125,546,111,"counterclockwise ↺",580,96)}
      <rect class="callout" x="710" y="166" width="170" height="122" rx="6"/>${text(724,200,"Gear ratio = 36 ÷ 12", "diagram-tiny")}${text(724,231,"= 3 : 1", "diagram-label")}${text(724,262,"Output: slower, stronger", "diagram-tiny")}
      <rect class="callout" x="120" y="388" width="540" height="42" rx="5"/>${text(390,414,"Meshed teeth reverse rotation: driver clockwise → driven counterclockwise.","diagram-small","middle")}`;
  }

  function drawBeltDrive(t) {
    const a = t*Math.PI*2;
    const pulley = (driverX, drivenX, y, driverR, drivenR, crossed) => {
      const driverAngle = a*.72;
      const outputAngle = (crossed ? -1 : 1) * driverAngle * driverR/drivenR;
      let belt;
      if (crossed) {
        // A crossed belt connects the upper run of one pulley to the lower run of the other.
        // The two runs visibly cross, so the driven pulley reverses direction.
        belt = `<line x1="${driverX+20}" y1="${y-driverR+5}" x2="${drivenX-28}" y2="${y+drivenR-7}" stroke="#596b75" stroke-width="14"/><line x1="${driverX+20}" y1="${y+driverR-5}" x2="${drivenX-28}" y2="${y-drivenR+7}" stroke="#596b75" stroke-width="14"/>`;
      } else {
        const tilt = Math.asin((drivenR-driverR)/(drivenX-driverX));
        const topDriver = [driverX-driverR*Math.sin(tilt), y-driverR*Math.cos(tilt)];
        const topDriven = [drivenX-drivenR*Math.sin(tilt), y-drivenR*Math.cos(tilt)];
        const bottomDriver = [driverX+driverR*Math.sin(tilt), y+driverR*Math.cos(tilt)];
        const bottomDriven = [drivenX+drivenR*Math.sin(tilt), y+drivenR*Math.cos(tilt)];
        belt = `<line x1="${topDriver[0]}" y1="${topDriver[1]}" x2="${topDriven[0]}" y2="${topDriven[1]}" stroke="#596b75" stroke-width="14"/><line x1="${bottomDriver[0]}" y1="${bottomDriver[1]}" x2="${bottomDriven[0]}" y2="${bottomDriven[1]}" stroke="#596b75" stroke-width="14"/>`;
      }
      return `${belt}<circle class="input-color" cx="${driverX}" cy="${y}" r="${driverR}"/><circle class="output-color" cx="${drivenX}" cy="${y}" r="${drivenR}"/><circle class="machine-metal" cx="${driverX}" cy="${y}" r="13"/><circle class="machine-metal" cx="${drivenX}" cy="${y}" r="18"/><line class="machine-line" x1="${driverX}" y1="${y}" x2="${driverX}" y2="${y-driverR+8}" transform="rotate(${driverAngle*180/Math.PI} ${driverX} ${y})"/><line class="machine-line" x1="${drivenX}" y1="${y}" x2="${drivenX}" y2="${y-drivenR+8}" transform="rotate(${outputAngle*180/Math.PI} ${drivenX} ${y})"/>`;
    };
    return `${text(235,52,"Open belt", "diagram-label", "middle")}${text(665,52,"Crossed belt", "diagram-label", "middle")}
      ${pulley(160,325,215,55,78,false)}${pulley(590,755,215,55,78,true)}
      ${arrow(120,125,158,112,"clockwise ↻",140,98)}${arrow(282,123,319,111,"clockwise ↻",304,98)}${arrow(550,125,588,112,"clockwise ↻",570,98)}${arrow(800,112,760,126,"counterclockwise ↺",784,98)}
      ${text(235,328,"Same direction", "diagram-small", "middle")}${text(665,328,"Opposite directions", "diagram-small", "middle")}
      <rect class="callout" x="76" y="362" width="748" height="56" rx="5"/>${text(450,386,"A belt transfers rotary motion. Its path determines direction:","diagram-small","middle")}${text(450,408,"open belt = same direction · crossed belt = opposite directions","diagram-tiny","middle")}`;
  }

  function drawLiftingPulley(t) {
    const phase = Math.sin(t*Math.PI*2);
    // Left: a fixed pulley changes pull direction only. Equal rope travel gives equal load travel.
    const fixedX=215, fixedY=172, fixedR=48, fixedLoadY=262-phase*24, fixedHandY=310+phase*24;
    // Right: a movable pulley has two vertical supporting strands. The free end travels twice as far as the load.
    const movingX=620, movingR=48, moveLoadY=250-phase*18, freeX=770, topY=116, topR=48, moveHandY=315+phase*36;
    const moveLeft=movingX-movingR, moveRight=movingX+movingR;
    return `${text(220,52,"One supporting rope segment", "diagram-label", "middle")}${text(650,52,"Two supporting rope segments", "diagram-label", "middle")}
      ${line(75,105,370,105,"support")}${line(485,105,835,105,"support")}
      <path d="M ${fixedX-fixedR} ${fixedLoadY} L ${fixedX-fixedR} ${fixedY} A ${fixedR} ${fixedR} 0 0 1 ${fixedX+fixedR} ${fixedY} L ${fixedX+fixedR} ${fixedHandY}" fill="none" stroke="#755235" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
      <circle class="machine-metal" cx="${fixedX}" cy="${fixedY}" r="${fixedR}"/><circle class="machine-fill" cx="${fixedX}" cy="${fixedY}" r="11"/><rect class="output-color" x="${fixedX-fixedR-34}" y="${fixedLoadY}" width="68" height="58" rx="6"/><circle class="input-color" cx="${fixedX+fixedR}" cy="${fixedHandY}" r="13"/>
      ${arrow(112,fixedLoadY+54,112,fixedLoadY+10,"load rises",112,fixedLoadY+80)}${arrow(323,fixedHandY-72,323,fixedHandY-24,"pull down",323,fixedHandY-84)}
      <path d="M ${moveLeft} ${topY-12} L ${moveLeft} ${moveLoadY} A ${movingR} ${movingR} 0 0 0 ${moveRight} ${moveLoadY} L ${moveRight} ${topY} A ${topR} ${topR} 0 0 1 ${freeX} ${topY} L ${freeX} ${moveHandY}" fill="none" stroke="#755235" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
      <circle class="machine-accent" cx="${moveLeft}" cy="${topY-12}" r="9"/><circle class="machine-metal" cx="${movingX}" cy="${moveLoadY}" r="${movingR}"/><circle class="machine-metal" cx="${movingX+96}" cy="${topY}" r="${topR}"/><circle class="machine-fill" cx="${movingX}" cy="${moveLoadY}" r="11"/><circle class="machine-fill" cx="${movingX+96}" cy="${topY}" r="11"/><rect class="output-color" x="${movingX-42}" y="${moveLoadY+47}" width="84" height="58" rx="6"/><circle class="input-color" cx="${freeX}" cy="${moveHandY}" r="13"/>
      ${arrow(520,moveLoadY+52,520,moveLoadY+10,"load rises",520,moveLoadY+79)}${arrow(836,moveHandY-104,836,moveHandY-24,"pull down",836,moveHandY-116)}
      <rect class="callout" x="45" y="382" width="355" height="48" rx="5"/>${text(222,404,"Same force; pull 1 unit → load rises 1 unit", "diagram-tiny","middle")}<rect class="callout" x="500" y="382" width="355" height="48" rx="5"/>${text(677,404,"About half the force; pull 2 units → load rises 1 unit", "diagram-tiny","middle")}`;
  }

  function mechanismComparison(t, focus) {
    const a = t * Math.PI * 2;
    const focusName = { crank: "crank + slider", cam: "cam + follower", linkage: "linkage" }[focus];
    const sliderX = 189 + Math.sin(a) * 28;
    // The follower's lower face stays on the cam's changing top edge.
    const camTopRadius = Math.sqrt(20 * 20 * Math.sin(a) * Math.sin(a) + 14 * 14 * Math.cos(a) * Math.cos(a));
    const followerY = 400 - camTopRadius - 26;
    const rockerAngle = Math.sin(a) * .38 - Math.PI / 2;
    const rockerTipX = 725 + Math.cos(rockerAngle) * 34;
    const rockerTipY = 408 + Math.sin(rockerAngle) * 34;
    return `<rect class="callout" x="40" y="344" width="820" height="88" rx="6"/>
      ${text(450,366,`In these examples, rotary input creates different outputs — this tab: ${focusName}`,"diagram-tiny","middle")}
      <circle class="machine-metal" cx="120" cy="399" r="15"/><line class="machine-line" x1="120" y1="399" x2="132" y2="399" transform="rotate(${a*180/Math.PI} 120 399)"/><line class="machine-line" x1="135" y1="399" x2="${sliderX}" y2="399"/><rect class="output-color" x="${sliderX}" y="389" width="26" height="20" rx="3"/>${text(175,425,"Crank: reciprocating", "diagram-tiny","middle")}
      <ellipse class="input-color" cx="430" cy="400" rx="20" ry="14" transform="rotate(${a*180/Math.PI} 430 400)"/><rect class="output-color" x="420" y="${followerY}" width="20" height="26" rx="3"/>${text(455,425,"Cam: reciprocating", "diagram-tiny","middle")}
      <circle class="machine-metal" cx="725" cy="408" r="10"/><line class="machine-line" x1="725" y1="408" x2="${rockerTipX}" y2="${rockerTipY}"/><circle class="output-color" cx="${rockerTipX}" cy="${rockerTipY}" r="8"/>${text(735,425,"Linkage: oscillating", "diagram-tiny","middle")}`;
  }

  function drawCrankSlider(t) {
    const a=t*Math.PI*2, cx=285, cy=235, r=95, [px,py]=pointOnCircle(cx,cy,r,a), sliderX=570 + Math.cos(a)*105;
    return `${labelBox(85,48,174,"Input: rotary crank", "#d96d33")}${labelBox(645,48,184,"Output: reciprocating slider", "#367a5a")}
      <circle class="machine-metal" cx="${cx}" cy="${cy}" r="103"/><line class="machine-line" x1="${cx}" y1="${cy}" x2="${px}" y2="${py}"/><circle class="input-color" cx="${px}" cy="${py}" r="15"/><circle class="machine-metal" cx="${cx}" cy="${cy}" r="18"/>
      ${line(px,py,sliderX,235)}<rect class="output-color" x="${sliderX-35}" y="185" width="70" height="100" rx="6"/>${line(470,178,470,292,"ground")}${line(735,178,735,292,"ground")}${line(450,178,755,178,"ground")}${line(450,292,755,292,"ground")}
      ${mechanismComparison(t,"crank")}`;
  }

  function drawCamFollower(t) {
    const a=t*Math.PI*2, cx=300, cy=282;
    const points=[]; for(let i=0;i<96;i++){const theta=i*Math.PI*2/96;const radius=78+27*Math.cos(theta-a);points.push(`${cx+Math.cos(theta)*radius},${cy+Math.sin(theta)*radius}`);}
    const contactRadius=78+27*Math.cos(-Math.PI/2-a), contactY=cy-contactRadius, followerTop=contactY-106;
    return `${labelBox(72,42,180,"Input: rotary cam", "#d96d33")}${labelBox(630,42,205,"Output: reciprocating follower", "#367a5a")}
      <polygon class="input-color" points="${points.join(" ")}"/><circle class="machine-metal" cx="${cx}" cy="${cy}" r="18"/>
      <line class="support" x1="${cx-48}" y1="72" x2="${cx-48}" y2="348"/><line class="support" x1="${cx+48}" y1="72" x2="${cx+48}" y2="348"/><rect class="output-color" x="${cx-28}" y="${followerTop}" width="56" height="106" rx="6"/>${line(cx,followerTop,cx,75,"machine-line")}
      ${arrow(520,305,520,112)}
      ${mechanismComparison(t,"cam")}`;
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
      ${mechanismComparison(t,"linkage")}`;
  }

  function drawTorque(t) {
    // Both levers receive the same downward force.  The farther push creates a
    // larger turning response, which is deliberately animated for comparison.
    const pivotY = 265, leverLength = 275;
    const near = { pivotX: 145, forceDistance: 105, angle: Math.sin(t * Math.PI * 2) * 0.07 };
    const far = { pivotX: 535, forceDistance: 230, angle: Math.sin(t * Math.PI * 2) * 0.30 };
    const position = (lever, distance) => ({
      x: lever.pivotX + Math.cos(lever.angle) * distance,
      y: pivotY + Math.sin(lever.angle) * distance
    });
    const nearEnd = position(near, leverLength), farEnd = position(far, leverLength);
    const nearForce = position(near, near.forceDistance), farForce = position(far, far.forceDistance);
    return `${labelBox(64,42,245,"Same downward force", "#f3b544")}${labelBox(510,42,274,"Same downward force", "#f3b544")}
      ${line(near.pivotX,pivotY,nearEnd.x,nearEnd.y,"machine-line")}${line(far.pivotX,pivotY,farEnd.x,farEnd.y,"machine-line")}
      <line class="support" x1="${near.pivotX}" y1="${pivotY}" x2="${near.pivotX}" y2="338"/><line class="support" x1="${far.pivotX}" y1="${pivotY}" x2="${far.pivotX}" y2="338"/><line class="ground" x1="72" y1="338" x2="218" y2="338"/><line class="ground" x1="462" y1="338" x2="608" y2="338"/>
      <circle class="machine-metal" cx="${near.pivotX}" cy="${pivotY}" r="19"/><circle class="machine-metal" cx="${far.pivotX}" cy="${pivotY}" r="19"/><circle class="input-color" cx="${nearForce.x}" cy="${nearForce.y}" r="12"/><circle class="input-color" cx="${farForce.x}" cy="${farForce.y}" r="12"/>
      ${arrow(nearForce.x,nearForce.y-142,nearForce.x,nearForce.y-18)}${arrow(farForce.x,farForce.y-142,farForce.x,farForce.y-18)}
      <rect class="callout" x="48" y="384" width="315" height="42" rx="5"/>${text(205,409,"Force close to pivot → less torque", "diagram-small","middle")}<rect class="callout" x="482" y="384" width="335" height="42" rx="5"/>${text(650,409,"Force farther from pivot → more torque", "diagram-small","middle")}`;
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

  const q = (prompt, options, answer, correction) => ({ prompt, options, answer, correction });
  const topicQuestions = {
    "motion-types": [
      q("A bicycle wheel turns around its axle. What type of motion does the wheel have?", ["Rotary", "Linear", "Oscillating"], "Rotary", "The wheel turns around an axis, so it has rotary motion."),
      q("An elevator travels upward in one straight path. What type of motion does it have while moving up?", ["Linear", "Reciprocating", "Rotary"], "Linear", "A single straight-line movement in one direction is linear motion."),
      q("A sewing-machine needle repeatedly moves up and down in a straight line. What type of motion does it have?", ["Oscillating", "Reciprocating", "Rotary"], "Reciprocating", "Repeated back-and-forth motion along a line is reciprocating motion."),
      q("A windshield wiper arm sweeps back and forth around its pivot. What type of motion does it have?", ["Linear", "Oscillating", "Reciprocating"], "Oscillating", "A repeated back-and-forth path through an arc is oscillating motion.")
    ],
    "input-output": [
      q("In a motor-driven fan, which part provides the input motion to the blades?", ["The motor shaft", "The air moved by the fan", "The fan guard"], "The motor shaft", "The driver is the part that first receives and supplies the motion; here it is the motor shaft."),
      q("A motor rotates a crank that moves a piston. What is the piston’s output motion?", ["Rotary", "Reciprocating", "Oscillating"], "Reciprocating", "The piston moves back and forth in a line, so its output is reciprocating."),
      q("A mechanism has rotary input and reciprocating output. What does the mechanism do to the motion?", ["Transfers it without changing type", "Transforms it into a different type", "Creates new energy"], "Transforms it into a different type", "When the input and output types differ, the mechanism transforms motion."),
      q("Which description correctly identifies a driven part?", ["The part that receives the mechanism’s output motion", "The part that first receives input force", "Any part that does not move"], "The part that receives the mechanism’s output motion", "The driven part receives the output after motion moves through the mechanism.")
    ],
    "gears": [
      q("What feature allows two gears to transfer rotary motion without slipping?", ["Their meshing teeth", "A smooth rope", "A sliding track"], "Their meshing teeth", "Gear teeth mesh together to transfer rotation."),
      q("A 12-tooth driving gear turns a 36-tooth driven gear. What is the gear ratio, driven teeth ÷ driving teeth?", ["1:3", "3:1", "48:1"], "3:1", "36 ÷ 12 = 3, so the driven-to-driving ratio is 3:1."),
      q("A small driving gear turns a larger driven gear. Which output change is expected?", ["Faster output with less torque", "Slower output with more torque", "No change in speed or torque"], "Slower output with more torque", "A small driver and large driven gear trade output speed for greater available torque."),
      q("A large driving gear turns a smaller driven gear. Which output change is expected?", ["Faster output with less torque", "Slower output with more torque", "Reciprocating output"], "Faster output with less torque", "A large driver and smaller driven gear make the output turn faster with less torque.")
    ],
    "belt-drive": [
      q("Which clue shows that a mechanism is a belt-and-pulley drive?", ["A flexible belt loops around wheels", "Teeth on two meshing wheels", "A piston slides in a cylinder"], "A flexible belt loops around wheels", "A belt-and-pulley drive uses a flexible belt around pulleys."),
      q("With an open belt, the input pulley turns clockwise. Which way does the output pulley turn?", ["Clockwise", "Counterclockwise", "Back and forth"], "Clockwise", "An open belt makes the pulleys rotate in the same direction."),
      q("What happens to the direction of rotation when a belt is crossed between two pulleys?", ["The pulleys turn in opposite directions", "The pulleys turn in the same direction", "Both pulleys stop"], "The pulleys turn in opposite directions", "Crossing a belt reverses the output pulley’s direction."),
      q("A small driving pulley turns a larger driven pulley. What is the typical output trade-off?", ["Slower output with more torque", "Faster output with more torque", "No change in speed"], "Slower output with more torque", "A larger driven pulley turns more slowly and can provide more turning force.")
    ],
    "lifting-pulley": [
      q("In a lifting-pulley system, what is the input motion when a person pulls the free end of the rope?", ["Linear pull", "Rotary spin", "Oscillating sweep"], "Linear pull", "Pulling a rope moves it along a straight path, which is linear input motion."),
      q("What output motion does the lifted load have?", ["Linear lifting motion", "Rotary motion", "Oscillating motion"], "Linear lifting motion", "The load moves upward along a straight path."),
      q("Why can more supporting rope segments reduce the input force needed?", ["They share the load’s weight", "They create energy", "They remove gravity"], "They share the load’s weight", "Supporting segments share the load, reducing the force required from one pull."),
      q("What trade-off occurs when a pulley system reduces the force needed to lift a load?", ["More rope must be pulled", "The load becomes weightless", "The load rises farther than the rope moves"], "More rope must be pulled", "Mechanical advantage trades more input distance for less input force.")
    ],
    "crank-slider": [
      q("In a crank-and-slider, what kind of input motion usually turns the crank?", ["Rotary", "Reciprocating", "Oscillating"], "Rotary", "The crank turns around a shaft, so its input is rotary motion."),
      q("What kind of output motion does the slider or piston usually have?", ["Reciprocating", "Rotary", "Oscillating"], "Reciprocating", "The slider travels back and forth along a straight guide."),
      q("What is the crank pin in this mechanism?", ["An off-center connection on the rotating crank", "A gear tooth", "A rope support"], "An off-center connection on the rotating crank", "The off-center pin makes the connecting rod push and pull as the crank turns."),
      q("Which familiar machine commonly uses a crank-and-slider?", ["An engine piston", "A bicycle wheel only", "A fixed wall bracket"], "An engine piston", "Engine pistons move back and forth because a rotating crank drives them.")
    ],
    "cam-follower": [
      q("What is a cam?", ["A specially shaped rotating part", "A flexible belt", "A straight bar that never pivots"], "A specially shaped rotating part", "A cam is a rotating piece with a shape that controls another part’s motion."),
      q("What is the follower in a cam-and-follower mechanism?", ["The part that contacts and moves because of the cam", "The part that provides the electrical power", "The stationary support only"], "The part that contacts and moves because of the cam", "The follower touches the cam and follows its changing edge."),
      q("What does the cam’s shape control?", ["When and how far the follower moves", "The color of the mechanism", "Whether gravity exists"], "When and how far the follower moves", "The changing edge of the cam controls the follower’s timing and travel."),
      q("A rotating cam lifts and lowers a follower. What is the usual follower output motion?", ["Reciprocating", "Rotary only", "One-way linear only"], "Reciprocating", "The follower repeatedly moves up and down in a line.")
    ],
    "linkage": [
      q("What is a linkage?", ["Rigid bars connected at pivots", "A loop of flexible belt", "A set of meshing gear teeth"], "Rigid bars connected at pivots", "Linkages use connected rigid bars and pivot joints."),
      q("A motor turns a linkage that makes a windshield wiper sweep through an arc. What is the wiper’s output motion?", ["Oscillating", "Rotary", "Linear"], "Oscillating", "The wiper moves back and forth through an arc around a pivot."),
      q("What can a linkage change as it transfers motion?", ["The direction or path of motion", "The amount of energy created", "The material of the bars"], "The direction or path of motion", "Linkages transfer motion and can redirect or reshape its path."),
      q("Which feature is most useful for identifying a linkage in a diagram?", ["Straight bars joined by pivots", "A rope over grooved wheels", "A single disk with teeth"], "Straight bars joined by pivots", "Bars connected at pivot points are the key visible clue for a linkage.")
    ],
    "torque": [
      q("What is torque?", ["The turning effect of a force around an axis", "The speed of an object in a line", "The amount of energy created"], "The turning effect of a force around an axis", "Torque describes how effectively a force causes rotation around a pivot or axis."),
      q("With the same push, where should you push a door to produce more torque?", ["Near the handle, far from the hinge", "Near the hinge", "At the center of the door"], "Near the handle, far from the hinge", "A force applied farther from the pivot creates more torque."),
      q("Which change increases torque if the force stays the same?", ["Increase the distance from the axis", "Move the force closer to the axis", "Remove the axis"], "Increase the distance from the axis", "A longer lever arm increases the turning effect of the same force."),
      q("Why might a machine use a gear system with greater torque?", ["To turn or lift a heavier load", "To create energy", "To make every part stop"], "To turn or lift a heavier load", "More torque helps a mechanism overcome resistance from a heavier load.")
    ],
    "design-choice": [
      q("A machine must lift a heavy load slowly and safely. Which output should the design prioritize?", ["Greater torque", "Greater speed only", "No output force"], "Greater torque", "A heavy load needs sufficient turning force or mechanical advantage."),
      q("A machine must spin a light display quickly. Which output should the design prioritize?", ["Greater output speed", "Greatest possible torque", "Reciprocating motion only"], "Greater output speed", "For a light load that must spin quickly, output speed is the primary goal."),
      q("Which statement best describes a design criterion?", ["A measurable goal the design should meet", "A limit such as cost or available space", "A random preference with no purpose"], "A measurable goal the design should meet", "Criteria are measurable goals, such as a required speed or lifting force."),
      q("Which statement best describes a design constraint?", ["A limit the design must work within", "A mechanism that creates energy", "The final answer to every design"], "A limit the design must work within", "Constraints are limits such as cost, safety, space, or available materials.")
    ]
  };

  function makeId() {
    if (window.crypto && typeof window.crypto.randomUUID === "function") return window.crypto.randomUUID().replace(/-/g, "");
    return `${Date.now()}${Math.random().toString(16).slice(2)}`;
  }

  function setTrackerStatus(message, style = "") {
    trackerStatus.className = `tracker-status${style ? ` ${style}` : ""}`;
    trackerStatus.textContent = message;
  }

  function beginTracking() {
    const name = studentName.value.trim().replace(/\s+/g, " ");
    const period = studentPeriod.value;
    if (!/^\S+\s+\S+/.test(name) || !["6th period", "7th period"].includes(period)) {
      setTrackerStatus("Enter your first and last name and choose 6th or 7th period before checking answers.", "error");
      return false;
    }
    tracking.studentName = name;
    tracking.period = period;
    tracking.sessionId = makeId();
    setTrackerStatus(`Tracking is active for ${name} — ${period}. Your checked answers will be saved.`, "ready");
    return true;
  }

  function verifySaved(eventId) {
    return new Promise(resolve => {
      const callback = `motionAck_${eventId.replace(/[^A-Za-z0-9_]/g, "")}`;
      const script = document.createElement("script");
      let done = false;
      const finish = found => {
        if (done) return;
        done = true;
        clearTimeout(timer);
        delete window[callback];
        script.remove();
        resolve(found);
      };
      const timer = setTimeout(() => finish(false), 6000);
      window[callback] = result => finish(Boolean(result && result.found));
      script.onerror = () => finish(false);
      script.src = `${LOGGER_URL}?eventId=${encodeURIComponent(eventId)}&prefix=${callback}`;
      document.head.appendChild(script);
    });
  }

  async function sendRecord(payload, attempt = 0) {
    try {
      await fetch(LOGGER_URL, { method: "POST", mode: "no-cors", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(payload), keepalive: true });
      if (!await verifySaved(payload.eventId)) throw new Error("Save was not confirmed");
      tracking.pending -= 1;
      setTrackerStatus(`Saved: ${payload.topicTitle} — ${payload.score} / ${payload.outOf}. ${payload.completedCount} / ${topics.length} tabs completed.`, "ready");
    } catch (_) {
      if (attempt < 2) {
        setTimeout(() => sendRecord(payload, attempt + 1), 1200 * (attempt + 1));
        return;
      }
      tracking.pending -= 1;
      tracking.failed += 1;
      setTrackerStatus("Your score could not be saved yet. Check your connection, then check answers again.", "error");
    }
  }

  function recordKnowledgeCheck(score, answers, correctness) {
    const questions = topicQuestions[active.id];
    const payload = {
      eventType: "knowledge_check",
      eventId: makeId(),
      sessionId: tracking.sessionId,
      studentName: tracking.studentName,
      period: tracking.period,
      topicId: active.id,
      topicTitle: active.title,
      score,
      outOf: questions.length,
      completedCount: completedTopics.size,
      answers,
      correct: correctness
    };
    tracking.pending += 1;
    setTrackerStatus("Saving your score and answers…");
    sendRecord(payload);
  }

  trackerForm.addEventListener("submit", event => {
    event.preventDefault();
    beginTracking();
  });

  function renderKnowledgeCheck() {
    const questions = topicQuestions[active.id];
    checkInstructions.textContent = `${active.title}: answer all four multiple-choice questions. A tab turns green after all four are correct.`;
    knowledgeCheck.innerHTML = questions.map((question, index) => `
      <fieldset class="knowledge-question">
        <legend>${index + 1}. ${question.prompt}</legend>
        ${question.options.map(option => `<label class="answer-option"><input type="radio" name="check-${active.id}-${index}" value="${option}"> ${option}</label>`).join("")}
      </fieldset>
    `).join("");
  }

  checkAnswers.addEventListener("click", () => {
    if (!tracking.sessionId) {
      checkFeedback.className = "check-feedback show needs-review";
      checkFeedback.innerHTML = "<h3>Check in first.</h3><p>Enter your full name and class period in the Student check-in section so your score can be saved.</p>";
      document.getElementById("tracker-heading").scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    const questions = topicQuestions[active.id];
    let correct = 0;
    const corrections = [];
    const answers = [];
    const correctness = [];
    questions.forEach((question, index) => {
      const selected = knowledgeCheck.querySelector(`input[name="check-${active.id}-${index}"]:checked`);
      const isCorrect = Boolean(selected && selected.value === question.answer);
      answers.push(selected ? selected.value : "No answer");
      correctness.push(isCorrect);
      if (isCorrect) correct += 1;
      else corrections.push(`<li><strong>${index + 1}.</strong> ${question.correction}</li>`);
    });
    if (!corrections.length) {
      completedTopics.add(active.id);
      updateTopicButtons();
    }
    recordKnowledgeCheck(correct, answers, correctness);
    checkFeedback.className = `check-feedback show${corrections.length ? " needs-review" : ""}`;
    if (!corrections.length) {
      checkFeedback.innerHTML = `<h3>4 / 4 — Tab completed.</h3><p><strong>${active.title}</strong> is now green. Choose another tab and complete its four questions.</p>`;
      return;
    }
    checkFeedback.innerHTML = `<h3>${correct} / ${questions.length} correct</h3><p>Use the corrections below, revisit this tab’s animation, then revise your answers. The tab turns green only when all four are correct.</p><ul>${corrections.join("")}</ul>`;
  });

  resetQuestions.addEventListener("click", () => {
    knowledgeCheck.reset();
    checkFeedback.className = "check-feedback";
    checkFeedback.textContent = "";
  });

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) playPause.click();
  selectTopic(topics[0]);
  requestAnimationFrame(tick);
})();
