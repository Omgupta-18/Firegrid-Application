const phases = {
  initial: {
    label: "Initial attack",
    detail: "First 15 minutes",
    priorities: [
      {
        title: "Clear the human path",
        body: "Freeze vehicle movement, push voice alarms, and move people toward the cleanest protected stair."
      },
      {
        title: "SCBA casualty rescue",
        body: "Treat the unconscious person as toxic gas exposed and remove them only with respiratory protection."
      },
      {
        title: "Remote isolation",
        body: "Trip EV chargers, affected ESS feeds, and exposed electrical distribution without entering the hazard core."
      },
      {
        title: "Stop propagation",
        body: "Cool adjacent vehicles, chargers, cable trays, and battery cabinets before thermal runaway spreads."
      }
    ]
  },
  stabilize: {
    label: "Stabilization",
    detail: "15 to 45 minutes",
    priorities: [
      {
        title: "Deep cooling",
        body: "Use sustained water on the battery zone and confirm temperature trends with thermal imaging."
      },
      {
        title: "Smoke steering",
        body: "Use exhaust, makeup air, and stair pressurization to keep escape paths tenable."
      },
      {
        title: "Gas confirmation",
        body: "Track CO, oxygen, flammable gases, and battery-fire gas indicators where available."
      },
      {
        title: "Defensive perimeter",
        body: "Hold a hard exclusion zone and keep non-essential personnel out of the basement."
      }
    ]
  },
  recovery: {
    label: "Recovery",
    detail: "Post knockdown",
    priorities: [
      {
        title: "Reignition watch",
        body: "Continue thermal scans because damaged lithium-ion batteries can reignite after visible fire is out."
      },
      {
        title: "Quarantine the EV",
        body: "Move the damaged vehicle to a remote open area when safe, away from structures and other vehicles."
      },
      {
        title: "Clear the air",
        body: "Keep smoke extraction running until gas readings are safe throughout the basement and stairs."
      },
      {
        title: "Close the loop",
        body: "Record charger status, detection timing, evacuation performance, and suppression limits."
      }
    ]
  }
};

const playbook = {
  evacuation: [
    {
      icon: "E",
      title: "Occupant Movement",
      items: [
        "Evacuate on foot and stop all basement vehicle movement.",
        "Use floor-level lighting, tactile handrails, and voice announcements.",
        "Route people against smoke flow and toward protected stairwells."
      ],
      note: "No re-entry without respiratory protection."
    },
    {
      icon: "R",
      title: "Rescue",
      items: [
        "Treat the unconscious person as a toxic gas exposure case.",
        "SCBA crews move the casualty to clean air before EMS handoff.",
        "EMS monitors for carbon monoxide and hydrogen fluoride exposure signs."
      ],
      note: "Human rescue outranks vehicle preservation."
    },
    {
      icon: "S",
      title: "Stair Control",
      items: [
        "Keep fire doors closed and stair doors controlled.",
        "Pressurize stairs and refuge lobbies where provided.",
        "Switch to alternate exits if smoke breaches the primary stair."
      ],
      note: "A smoke-filled stair is not a usable route."
    }
  ],
  suppression: [
    {
      icon: "W",
      title: "Water Cooling",
      items: [
        "Use sustained, high-volume water to cool the battery pack.",
        "Target exposed battery areas where access is possible.",
        "Use thermal imaging to confirm temperatures trend downward."
      ],
      note: "Sprinklers help exposures but rarely stop pack thermal runaway alone."
    },
    {
      icon: "I",
      title: "Isolation",
      items: [
        "Use charger emergency shutoff devices.",
        "De-energize nearby EVSE, ESS, and electrical rooms.",
        "Use vehicle-specific emergency response guides before extrication."
      ],
      note: "Treat high-voltage components as energized."
    },
    {
      icon: "D",
      title: "Defensive Mode",
      items: [
        "If direct attack is unsafe, isolate and protect exposures.",
        "Cool nearby vehicles and storage systems.",
        "Maintain a safety zone for venting, flare-up, or reignition."
      ],
      note: "Foam, CO2, and dry chemical cannot provide deep battery cooling."
    }
  ],
  ventilation: [
    {
      icon: "X",
      title: "Exhaust",
      items: [
        "Run smoke extraction for the affected fire zone.",
        "Pull smoke toward exhaust shafts or ramps, away from stairs.",
        "Balance extraction with makeup air to avoid uncontrolled spread."
      ],
      note: "Airflow direction matters as much as fan capacity."
    },
    {
      icon: "P",
      title: "Pressurization",
      items: [
        "Pressurize stairs, lift lobbies, and refuge areas.",
        "Check that doors can still be opened by occupants.",
        "Avoid pushing smoke from the fire zone into egress routes."
      ],
      note: "Protected exits buy evacuation time."
    },
    {
      icon: "G",
      title: "Gas Monitoring",
      items: [
        "Track CO, oxygen, flammable gases, and HF where sensors are available.",
        "Continue ventilation after knockdown.",
        "Confirm safe readings before reoccupation."
      ],
      note: "Battery smoke can remain dangerous after flames drop."
    }
  ],
  prevention: [
    {
      icon: "L",
      title: "Layout",
      items: [
        "Prefer EV charging on open or ground levels.",
        "Separate charging areas with fire-rated construction.",
        "Keep ESS rooms remote from vehicle charging bays."
      ],
      note: "Good placement reduces response complexity."
    },
    {
      icon: "D",
      title: "Detection",
      items: [
        "Use heat, smoke, gas, and thermal camera monitoring.",
        "Connect charger faults to the fire alarm panel.",
        "Trigger automatic EVSE shutdown on fire alarm."
      ],
      note: "Early warning is critical underground."
    },
    {
      icon: "M",
      title: "Management",
      items: [
        "Maintain a facility EV fire pre-plan.",
        "Train staff on charger shutoff and evacuation control.",
        "Keep damaged EV storage at least 50 ft from structures where practical."
      ],
      note: "Plans need drills, not just binders."
    }
  ]
};

const smokeNames = ["Low", "Moderate", "High", "Severe", "Extreme"];
const heatNames = ["Warm", "Rising", "High", "Runaway", "Critical"];

const priorityList = document.querySelector("#priorityList");
const modeLabel = document.querySelector("#modeLabel");
const modeDetail = document.querySelector("#modeDetail");
const phaseTabs = document.querySelectorAll(".phase-tab");
const contentTabs = document.querySelectorAll(".content-tab");
const tabContent = document.querySelector("#tabContent");
const smokeRange = document.querySelector("#smokeRange");
const heatRange = document.querySelector("#heatRange");
const smokeLevel = document.querySelector("#smokeLevel");
const heatIndex = document.querySelector("#heatIndex");
const stairA = document.querySelector("#stairA");
const stairB = document.querySelector("#stairB");
const pressurized = document.querySelector("#pressurized");
const victimLocated = document.querySelector("#victimLocated");
const essExposure = document.querySelector("#essExposure");
const routeDecision = document.querySelector("#routeDecision");
const routeRationale = document.querySelector("#routeRationale");
const egressScore = document.querySelector("#egressScore");
const scoreBar = document.querySelector("#scoreBar");
const planFeed = document.querySelector("#planFeed");
const riskState = document.querySelector("#riskState");
const incidentFingerprint = document.querySelector("#incidentFingerprint");
const canvas = document.querySelector("#incidentCanvas");
const ctx = canvas.getContext("2d");

let activePhase = "initial";
let activeTab = "evacuation";
let animationFrame = 0;

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function currentState() {
  return {
    smoke: Number(smokeRange.value),
    heat: Number(heatRange.value),
    aBlocked: stairA.checked,
    bBlocked: stairB.checked,
    pressurized: pressurized.checked,
    casualty: victimLocated.checked,
    ess: essExposure.checked
  };
}

function renderPriorities() {
  const phase = phases[activePhase];
  modeLabel.textContent = phase.label;
  modeDetail.textContent = phase.detail;
  priorityList.innerHTML = phase.priorities
    .map(
      (item) => `
        <li>
          <strong>${item.title}</strong>
          <span>${item.body}</span>
        </li>
      `
    )
    .join("");
}

function renderTab() {
  tabContent.innerHTML = playbook[activeTab]
    .map(
      (card) => `
        <article class="play-card">
          <div>
            <header>
              <span class="play-icon" aria-hidden="true">${card.icon}</span>
              <h3>${card.title}</h3>
            </header>
            <ul>
              ${card.items.map((item) => `<li>${item}</li>`).join("")}
            </ul>
          </div>
          <footer>${card.note}</footer>
        </article>
      `
    )
    .join("");
}

function scoreEgress(state) {
  let score = 94;
  score -= state.smoke * 10;
  score -= state.heat * 4;
  score -= state.aBlocked ? 13 : 0;
  score -= state.bBlocked ? 16 : 0;
  score += state.pressurized ? 12 : -10;
  score -= state.casualty ? 4 : 0;
  score -= state.ess ? 4 : 0;
  if (state.aBlocked && state.bBlocked) score -= 25;
  return clamp(score, 6, 96);
}

function routeForState(state) {
  if (state.aBlocked && state.bBlocked) {
    return {
      decision: "Shelter in protected refuge and run SCBA-led evacuation",
      rationale:
        "Both stair paths are smoke affected. Hold occupants behind fire doors, pressurize refuge areas if available, and let equipped responders control movement."
    };
  }

  if (state.bBlocked) {
    return {
      decision: "Commit occupants to Stair A with smoke-control support",
      rationale:
        "Stair B is compromised. Pull smoke toward exhaust points, keep Stair A pressurized, and send a separate SCBA team for the casualty."
    };
  }

  if (state.aBlocked) {
    return {
      decision: "Commit occupants to Stair B as the primary clean route",
      rationale:
        "Stair A is smoke affected. Close its doors, pressurize Stair B, and guide occupants with voice messages and floor-level lighting."
    };
  }

  if (state.smoke >= 4 && !state.pressurized) {
    return {
      decision: "Use controlled evacuation to the nearest verified clean stair",
      rationale:
        "Smoke density is severe without stair pressurization. Verify the route before moving people from refuge points."
    };
  }

  if (state.casualty) {
    return {
      decision: "Evacuate occupants and dispatch SCBA rescue to the casualty",
      rationale:
        "General occupants can move through clear stairs while trained responders remove the unconscious person from the toxic zone."
    };
  }

  return {
    decision: "Evacuate by the nearest protected stair",
    rationale:
      "Both stairs are usable. Keep people moving against smoke flow and maintain stair door control."
  };
}

function buildPlan(state) {
  const moves = [];

  if (state.aBlocked && state.bBlocked) {
    moves.push("Hold occupants in refuge zones; do not push them into smoke-filled stairs.");
  } else if (state.aBlocked) {
    moves.push("Close Stair A doors and route all evacuees toward Stair B.");
  } else if (state.bBlocked) {
    moves.push("Close Stair B doors and route all evacuees toward Stair A.");
  } else {
    moves.push("Move occupants to the nearest confirmed clean stair while traffic stays frozen.");
  }

  if (state.casualty) {
    moves.push("Assign an SCBA rescue pair to remove the unconscious person to fresh air.");
  }

  if (state.heat >= 4) {
    moves.push("Establish sustained water supply and cool the battery enclosure continuously.");
  } else {
    moves.push("Cool the EV pack and adjacent vehicles while thermal imaging tracks heat rise.");
  }

  if (state.smoke >= 4) {
    moves.push("Run smoke extraction with makeup air so smoke moves away from egress routes.");
  }

  if (state.ess) {
    moves.push("Protect the battery storage boundary and isolate its power feed.");
  }

  return moves.slice(0, 3);
}

function updateDecision() {
  const state = currentState();
  const score = scoreEgress(state);
  const route = routeForState(state);
  const heatPressure = state.heat * 16 + (state.ess ? 12 : 0) + state.smoke * 3;
  const risk =
    score < 28 || state.heat >= 5 ? "Extreme" : score < 48 || heatPressure > 80 ? "Critical" : "Guarded";
  const fingerprint = `EVT-${activePhase.slice(0, 3).toUpperCase()}-${state.smoke}${state.heat}-${state.aBlocked ? "A" : "a"}${state.bBlocked ? "B" : "b"}-${score}`;

  smokeLevel.textContent = smokeNames[state.smoke - 1];
  heatIndex.textContent = heatNames[state.heat - 1];
  routeDecision.textContent = route.decision;
  routeRationale.textContent = route.rationale;
  egressScore.textContent = `${score}%`;
  scoreBar.style.width = `${score}%`;
  riskState.textContent = risk;
  incidentFingerprint.textContent = fingerprint;
  planFeed.innerHTML = buildPlan(state).map((move) => `<li>${move}</li>`).join("");

  drawTwin();
}

function drawRoundedRect(x, y, w, h, r, fill, stroke) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
  if (fill) {
    ctx.fillStyle = fill;
    ctx.fill();
  }
  if (stroke) {
    ctx.strokeStyle = stroke;
    ctx.stroke();
  }
}

function drawVehicle(x, y, w, h, color, label, isBurning) {
  drawRoundedRect(x, y, w, h, 8, color, "rgba(255,255,255,0.18)");
  ctx.fillStyle = "rgba(255,255,255,0.72)";
  ctx.font = "700 11px Inter, sans-serif";
  ctx.fillText(label, x + 9, y + h / 2 + 4);

  if (isBurning) {
    const pulse = 6 + Math.sin(animationFrame / 14) * 3;
    const gradient = ctx.createRadialGradient(x + w / 2, y + h / 2, 2, x + w / 2, y + h / 2, 70 + pulse);
    gradient.addColorStop(0, "rgba(217,63,33,0.95)");
    gradient.addColorStop(0.42, "rgba(215,135,18,0.42)");
    gradient.addColorStop(1, "rgba(217,63,33,0)");
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x + w / 2, y + h / 2, 72 + pulse, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawLabel(text, x, y, color = "rgba(249,247,239,0.7)") {
  ctx.fillStyle = color;
  ctx.font = "800 11px Inter, sans-serif";
  ctx.fillText(text, x, y);
}

function drawTwin() {
  const state = currentState();
  const rect = canvas.getBoundingClientRect();
  const width = rect.width || canvas.width;
  const height = rect.height || canvas.height;
  const dpr = window.devicePixelRatio || 1;

  if (canvas.width !== Math.round(width * dpr) || canvas.height !== Math.round(height * dpr)) {
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
  }

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, width, height);

  ctx.fillStyle = "#0c100d";
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = "rgba(255,255,255,0.055)";
  ctx.lineWidth = 1;
  for (let x = 24; x < width; x += 42) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = 24; y < height; y += 42) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  const pad = 34;
  drawRoundedRect(pad, 46, width - pad * 2, height - 88, 18, "rgba(255,255,255,0.035)", "rgba(255,255,255,0.12)");

  ctx.strokeStyle = "rgba(255,255,255,0.11)";
  ctx.setLineDash([8, 8]);
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(pad + 24, height * 0.47);
  ctx.lineTo(width - pad - 24, height * 0.47);
  ctx.stroke();
  ctx.setLineDash([]);

  const stairAX = width * 0.13;
  const stairAY = height * 0.18;
  const stairBX = width * 0.82;
  const stairBY = height * 0.78;
  const fireX = width * 0.47;
  const fireY = height * 0.5;
  const essX = width * 0.73;
  const essY = height * 0.25;

  drawRoundedRect(stairAX - 42, stairAY - 30, 92, 58, 8, state.aBlocked ? "rgba(217,63,33,0.34)" : "rgba(0,163,138,0.22)", "rgba(255,255,255,0.2)");
  drawLabel("STAIR A", stairAX - 31, stairAY + 5, "#ffffff");

  drawRoundedRect(stairBX - 42, stairBY - 30, 92, 58, 8, state.bBlocked ? "rgba(217,63,33,0.34)" : "rgba(0,163,138,0.22)", "rgba(255,255,255,0.2)");
  drawLabel("STAIR B", stairBX - 31, stairBY + 5, "#ffffff");

  const carW = Math.min(86, width * 0.11);
  const carH = 42;
  drawVehicle(width * 0.28, height * 0.3, carW, carH, "rgba(73,105,232,0.42)", "EV", false);
  drawVehicle(width * 0.39, height * 0.31, carW, carH, "rgba(73,105,232,0.42)", "EV", false);
  drawVehicle(fireX, fireY, carW, carH, "rgba(217,63,33,0.7)", "EV FIRE", true);
  drawVehicle(width * 0.58, height * 0.55, carW, carH, "rgba(215,135,18,0.4)", "SUV", false);
  drawVehicle(width * 0.31, height * 0.66, carW, carH, "rgba(255,255,255,0.16)", "CAR", false);

  drawRoundedRect(essX, essY, 112, 74, 8, state.ess ? "rgba(215,135,18,0.44)" : "rgba(255,255,255,0.11)", "rgba(255,255,255,0.22)");
  drawLabel("ESS BANK", essX + 20, essY + 41, "#ffffff");

  const smokeRadius = 70 + state.smoke * 38 + Math.sin(animationFrame / 18) * 8;
  const smokeGradient = ctx.createRadialGradient(fireX + 20, fireY, 12, fireX + 20, fireY, smokeRadius);
  smokeGradient.addColorStop(0, `rgba(150,143,134,${0.18 + state.smoke * 0.06})`);
  smokeGradient.addColorStop(0.55, `rgba(150,143,134,${0.16 + state.smoke * 0.05})`);
  smokeGradient.addColorStop(1, "rgba(150,143,134,0)");
  ctx.fillStyle = smokeGradient;
  ctx.beginPath();
  ctx.ellipse(fireX + 42, fireY - 18, smokeRadius * 1.22, smokeRadius * 0.72, -0.22, 0, Math.PI * 2);
  ctx.fill();

  if (state.casualty) {
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(width * 0.22, height * 0.2, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "rgba(217,63,33,0.9)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(width * 0.22, height * 0.2, 16, 0, Math.PI * 2);
    ctx.stroke();
    drawLabel("CASUALTY", width * 0.24, height * 0.205, "#ffffff");
  }

  const target = state.aBlocked && !state.bBlocked ? { x: stairBX, y: stairBY } : { x: stairAX, y: stairAY };
  const start = { x: width * 0.22, y: height * 0.68 };
  const bothBlocked = state.aBlocked && state.bBlocked;
  ctx.strokeStyle = bothBlocked ? "rgba(215,135,18,0.9)" : "rgba(0,163,138,0.95)";
  ctx.lineWidth = 5;
  ctx.setLineDash([12, 10]);
  ctx.beginPath();
  ctx.moveTo(start.x, start.y);
  ctx.quadraticCurveTo(width * 0.38, height * 0.72, target.x, target.y);
  ctx.stroke();
  ctx.setLineDash([]);
  drawLabel(bothBlocked ? "REFUGE HOLD" : "EGRESS FLOW", start.x - 24, start.y - 16, "#ffffff");

  ctx.strokeStyle = "rgba(73,105,232,0.72)";
  ctx.lineWidth = 3;
  ctx.setLineDash([6, 9]);
  ctx.beginPath();
  ctx.moveTo(width * 0.12, height * 0.9);
  ctx.lineTo(width * 0.86, height * 0.18);
  ctx.stroke();
  ctx.setLineDash([]);
  drawLabel("EXHAUST VECTOR", width * 0.67, height * 0.19, "rgba(249,247,239,0.78)");

  ctx.fillStyle = "rgba(255,255,255,0.74)";
  ctx.font = "800 12px Inter, sans-serif";
  ctx.fillText(`Smoke ${smokeNames[state.smoke - 1]} | Heat ${heatNames[state.heat - 1]}`, 24, 28);
}

function tick() {
  animationFrame += 1;
  drawTwin();
  requestAnimationFrame(tick);
}

phaseTabs.forEach((button) => {
  button.addEventListener("click", () => {
    activePhase = button.dataset.phase;
    phaseTabs.forEach((tab) => {
      const isActive = tab === button;
      tab.classList.toggle("active", isActive);
      tab.setAttribute("aria-selected", String(isActive));
    });
    renderPriorities();
    updateDecision();
  });
});

contentTabs.forEach((button) => {
  button.addEventListener("click", () => {
    activeTab = button.dataset.tab;
    contentTabs.forEach((tab) => tab.classList.toggle("active", tab === button));
    renderTab();
  });
});

[stairA, stairB, pressurized, victimLocated, essExposure, smokeRange, heatRange].forEach((control) => {
  control.addEventListener("input", updateDecision);
});

window.addEventListener("resize", drawTwin);

renderPriorities();
renderTab();
updateDecision();
requestAnimationFrame(tick);
