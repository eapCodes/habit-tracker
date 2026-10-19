let habits = [
    { id: 1, name: "Reading", weight: 3, done: true},
    { id: 2, name: "Exercise", weight: 2, done: true},
    { id: 3, name: "meditation", weight: 2, done: false},
];

function calcScore(list) {
    let earned = 0;
    let total = 0;

    for(const h of list) {
        total += h.weight;
        if(h.done) {
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

            const box = document.createElement("Input");
            box.type = "checkbox";
            box.id = "habit-" + h.id;
            box.checked = h.done;
            box.addEventListener("change", function () {
                h.done = box.checked;
                render();
            });
            const label = document.createElement("span");
            badge.textContents = "weight x " + h.weight;

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