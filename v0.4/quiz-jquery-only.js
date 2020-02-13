import $ from "./jquery-3.4.1.min"

const nQuestions = 3;
const answered = new Array(nQuestions);
let correct = 0;

// Wait for the page to load
$("document").ready = () => {
    for (let i = 0; i < nQuestions; i++) {
        // Get all the buttons that fit this question, and loop through them
        const questionButtons = $(`button.q${i + 1}`);
        for (let j = 0; j < questionButtons.length; j++) {
            const button = questionButtons[j];
            button.onclick = () => {
                answered[i] = j;
                refresh();
            }
        }
    }
};

// Function to refresh the page view
function refresh() {
    // Recount correct answers every refresh
    correct = 0;

    for (let i = 0; i < nQuestions; i++) {
        // Has this question been answered?
        if (answered[i] !== undefined) {
            const questionButtons = $(`button.q${i + 1}`);
            // Loop through all the buttons
            for (let j = 0; j < questionButtons.length; j++) {
                const button = questionButtons[j];

                // Disable the button, as this question has been answered
                button.disabled = true;

                // If this is the right answer, always make it green
                if (button.classList.contains("right")) {
                    button.classList.add("green");
                    if (answered[i] === j) {
                        // They selected this, so they got it right!
                        correct++;
                    }
                } else {
                    // If this was a selected wrong answer, mark it red
                    if (answered[i] === j) {
                        button.classList.add("red");
                    }
                }
            }
        }
    }

    // How many did we get right?
    console.log(`You got ${correct}/${nQuestions} correct!`);
}
