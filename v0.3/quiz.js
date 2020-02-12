const nQuestions = 3;

// Wait for the page to load
window.onload = () => {
    for (let i = 0; i < nQuestions; i++) {
        // Get all the buttons that fit this question, and loop through them
        const questionButtons = document.querySelectorAll(`button.q${i + 1}`);
        for (let j = 0; j < questionButtons.length; j++) {
            const button = questionButtons[j];
            // Is this a right or wrong answer?
            if (button.classList.contains("right")) {
                // Make it turn green on a click
                button.onclick = () => {
                    button.classList.add("green")
                }
            } else if (button.classList.contains("wrong")) {
                // Make it turn red on a click
                button.onclick = () => {
                    button.classList.add("red")
                }
            }
        }
    }
};
