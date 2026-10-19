let habits = [
    { id: 1, name: "Reading", weight: 3, done: true },
    { id: 2, name: "Exercise", weight: 2, done: true },
    { id: 3, name: "Meditation", weight: 2, done: false },
];

function calcScore(list) {
    let earned = 0;
    let total = 0;

    for (const h of list) {
        total += h.weight;
        if (h.done) {
            earned += h.weight;
        }
    }

    if (total === 0) {
        return 0;
    }
    return Math.round((100 * earned) / total);
}

const habitList = document.getElementById("habit-list");
const scoreValue = document.getElementById("score-value");
const scoreMeter = document.getElementById("score-meter");

function renderHabits() {
    habitList.innerHTML = "";

    for (const h of habits) {
        const li = document.createElement("li");

        const box = document.createElement("input");
        box.type = "checkbox";
        box.id = "habit-" + h.id;
        box.checked = h.done;
        box.addEventListener("change", function () {
            h.done = box.checked;
            render();
        });

        const label = document.createElement("label");
        label.htmlFor = box.id;
        label.textContent = h.name;

        const badge = document.createElement("span");
        badge.textContent = "weight ×" + h.weight;

        li.append(box, label, badge);
        habitList.appendChild(li);
    }
}

function renderScore() {
    const score = calcScore(habits);
    scoreValue.textContent = score;
    scoreMeter.value = score;
}

function render() {
    renderHabits();
    renderScore();
    renderChart();
}

// habit form

const form = document.getElementById("add-form");
const nameInput = document.getElementById("habit-name");
const weightInput = document.getElementById("habit-weight");
let nextId = 4;

form.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = nameInput.value.trim();
    const weight = Number(weightInput.value);

    if (!/^[A-Za-z0-9][A-Za-z0-9 ,.'&!()-]*$/.test(name)) {
        nameInput.setCustomValidity("Use letters, numbers and basic punctuation only.");
        nameInput.reportValidity();
        return;
    }

    const duplicate = habits.some(function (h) {
        return h.name.toLowerCase() === name.toLowerCase();
    });
    if (duplicate) {
        nameInput.setCustomValidity("You already have a habit with that name.");
        nameInput.reportValidity();
        return;
    }

    if (!Number.isInteger(weight) || weight < 1 || weight > 5) {
        weightInput.setCustomValidity("Weight must be a whole number from 1 to 5.");
        weightInput.reportValidity();
        return;
    }

    habits.push({ id: nextId, name: name, weight: weight, done: false });
    nextId++;
    form.reset();
    weightInput.value = 3;
    render();
});

nameInput.addEventListener("input", function () {
    nameInput.setCustomValidity("");
});

weightInput.addEventListener("input", function () {
    weightInput.setCustomValidity("");
});

// Chart
const chart = document.getElementById("chart");
const chartNote = document.getElementById("chart-note");
const rangeButtons = document.querySelectorAll("#range-nav button");
let currentRange = "day";

const sampleData = {
    week: {
        note: "Daily scores this week (sample data)",
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        values: [85, 60, 75, 40, 90, 55, 60],
    },
    month: {
        note: "Weekly averages this month (sample data)",
        labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
        values: [72, 65, 78, 70],
    },
    year: {
        note: "Monthly averages this year (sample data)",
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        values: [58, 62, 66, 61, 70, 74, 68, 72, 77, 71, 65, 70],
    },
};

function makeBar(labelText, valueText, heightPercent, isDone) {
    const col = document.createElement("div");
    col.className = "bar-col";

    const value = document.createElement("div");
    value.className = "bar-value";
    value.textContent = valueText;

    const track = document.createElement("div");
    track.className = "bar-track";

    const bar = document.createElement("div");
    bar.className = "bar";
    if (isDone) {
        bar.classList.add("is-done");
    }
    bar.style.height = heightPercent + "%";
    track.appendChild(bar);

    const label = document.createElement("div");
    label.className = "bar-label";
    label.textContent = labelText;

    col.append(value, track, label);
    return col;
}

function renderChart() {
    chart.innerHTML = "";

    rangeButtons.forEach(function (b) {
        b.classList.toggle("active", b.dataset.range === currentRange);
    });

    if (currentRange === "day") {
        chartNote.textContent = "Points earned by habit today (bar height = weight)";
        for (const h of habits) {
            const points = h.done ? h.weight : 0;
            chart.appendChild(makeBar(h.name, points + "/" + h.weight, (h.weight / 5) * 100, h.done));
        }
        return;
    }

    const data = sampleData[currentRange];
    chartNote.textContent = data.note;
    for (let i = 0; i < data.labels.length; i++) {
        chart.appendChild(makeBar(data.labels[i], data.values[i], data.values[i], false));
    }
}

rangeButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
        currentRange = btn.dataset.range;
        renderChart();
    });
});

render();