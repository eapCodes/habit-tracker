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
}

render();

// habit form

const form = document.getElementById("add-form");
const nameInput = document.getElementById("habit-name");
const weightInput = document.getElementById("habit-weight");
let nextId = 4;

form.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = nameInput.value.trim();
    const weight = Number(weightInput.value);

    if(!/^[A-Za-z0-9][A-Za-z0-9 ,.'&!()-]*$/.test(name)) {
        nameInput.setCustomValidity("Use Letters, numbers and basic punctuation only.");
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
    if (!Number.isInteger(weight) || weight < 1 || weight > 5){
        weightInput.setCustomeValidity("weight msut be a whole number form 1 to 5.");
        weightInput.reportValidity();
        return;
    }
    
    habits.push({id: nextId, name: name, weight: weight, done: false});
    nextId++;
    form.reset();
    weightInput.value = 3;
    render();
});

nameInput.addEventListener("input", function (){
    nameInput.setCustomValifity("");
})

weightInput.addEventListener("input", function () {
    weightInput.setCustomValifity("");
})