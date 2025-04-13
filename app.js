const dailyHabits = [
  "6 uur gefocust gewerkt",
  "30+ min buiten geweest",
  "10+ min gelezen",
  "Iets opgeruimd",
  "Max 1,5 uur tv gekeken",
  "Niet gesnoozed"
];

const weeklyHabits = [
  "Minimaal 4x sporten",
  "30 uur gefocust gewerkt",
  "Dagelijks 30+ min buitenlucht",
  "Dagelijks 10+ min lezen",
  "Max 1x onbeperkt alcohol",
  "Max 1x max 2 glazen wijn",
  "5x iets opgeruimd"
];

function createCheckboxList(habits, containerId, type) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";
  habits.forEach((habit, i) => {
    const label = document.createElement("label");
    label.className = "flex items-center space-x-2 mb-2";
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.onchange = () => updateProgress(type);
    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(habit));
    container.appendChild(label);
  });
}

function updateProgress(type) {
  const containerId = type === "daily" ? "daily-container" : "weekly-container";
  const container = document.getElementById(containerId);
  const checkboxes = container.querySelectorAll("input[type='checkbox']");
  const checked = Array.from(checkboxes).filter(cb => cb.checked).length;
  const progress = Math.round((checked / checkboxes.length) * 100);
  document.getElementById(`${type}-progress`).innerText = `${progress}% voltooid`;
}

function resetAll() {
  ["daily-container", "weekly-container"].forEach(id => {
    const checkboxes = document.getElementById(id).querySelectorAll("input[type='checkbox']");
    checkboxes.forEach(cb => cb.checked = false);
  });
  updateProgress("daily");
  updateProgress("weekly");
  document.getElementById("notes").value = "";
}

document.addEventListener("DOMContentLoaded", () => {
  createCheckboxList(dailyHabits, "daily-container", "daily");
  createCheckboxList(weeklyHabits, "weekly-container", "weekly");
});