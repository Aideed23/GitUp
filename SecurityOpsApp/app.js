const state = {
  checkins: load("checkins"),
  shifts: load("shifts"),
  patrols: load("patrols"),
  incidents: load("incidents"),
};

const checkinForm = document.getElementById("checkinForm");
const shiftForm = document.getElementById("shiftForm");
const patrolForm = document.getElementById("patrolForm");
const incidentForm = document.getElementById("incidentForm");
const clearData = document.getElementById("clearData");

checkinForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("staffName").value.trim();
  const status = document.getElementById("status").value;
  if (!name) return;
  state.checkins.unshift({
    name,
    status,
    timestamp: new Date().toISOString(),
  });
  saveAndRender("checkins");
  checkinForm.reset();
});

shiftForm.addEventListener("submit", (e) => {
  e.preventDefault();
  state.shifts.unshift({
    staff: field("shiftStaff"),
    location: field("shiftLocation"),
    start: field("shiftStart"),
    end: field("shiftEnd"),
    createdAt: new Date().toISOString(),
  });
  saveAndRender("shifts");
  shiftForm.reset();
});

patrolForm.addEventListener("submit", (e) => {
  e.preventDefault();
  state.patrols.unshift({
    area: field("patrolArea"),
    assignee: field("patrolAssignee"),
    due: field("patrolDue"),
    createdAt: new Date().toISOString(),
  });
  saveAndRender("patrols");
  patrolForm.reset();
});

incidentForm.addEventListener("submit", (e) => {
  e.preventDefault();
  state.incidents.unshift({
    location: field("incidentLocation"),
    severity: field("incidentSeverity"),
    description: field("incidentDescription"),
    createdAt: new Date().toISOString(),
  });
  saveAndRender("incidents");
  incidentForm.reset();
});

clearData.addEventListener("click", () => {
  if (!confirm("Clear all locally stored demo data?")) return;
  Object.keys(state).forEach((key) => {
    state[key] = [];
    localStorage.removeItem(key);
  });
  renderAll();
});

function field(id) {
  return document.getElementById(id).value.trim();
}

function load(key) {
  try {
    return JSON.parse(localStorage.getItem(key) || "[]");
  } catch {
    return [];
  }
}

function saveAndRender(key) {
  localStorage.setItem(key, JSON.stringify(state[key]));
  renderAll();
}

function renderAll() {
  renderList(
    "checkinList",
    state.checkins,
    (item) => `<strong>${escape(item.name)}</strong> - ${escape(item.status)}\n<div class="meta">${fmt(item.timestamp)}</div>`
  );
  renderList(
    "shiftList",
    state.shifts,
    (item) => `<strong>${escape(item.staff)}</strong> @ ${escape(item.location)}\n<div class="meta">${item.start}-${item.end} | Added ${fmt(item.createdAt)}</div>`
  );
  renderList(
    "patrolList",
    state.patrols,
    (item) => `<strong>${escape(item.area)}</strong> - ${escape(item.assignee)}\n<div class="meta">Due ${fmt(item.due)} | Added ${fmt(item.createdAt)}</div>`
  );
  renderList(
    "incidentList",
    state.incidents,
    (item) => `<strong>${escape(item.severity)}</strong> @ ${escape(item.location)}\n<div>${escape(item.description)}</div>\n<div class="meta">${fmt(item.createdAt)}</div>`
  );
}

function renderList(id, items, template) {
  const el = document.getElementById(id);
  if (!items.length) {
    el.innerHTML = '<li class="meta">No records yet.</li>';
    return;
  }
  el.innerHTML = items
    .slice(0, 20)
    .map((item) => `<li>${template(item)}</li>`)
    .join("");
}

function fmt(input) {
  const d = new Date(input);
  return Number.isNaN(d.getTime()) ? escape(String(input)) : d.toLocaleString();
}

function escape(text) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

renderAll();
