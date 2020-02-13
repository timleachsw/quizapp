const nQuestions = 3;
const qNumbers = [...Array(nQuestions).keys()];
const answered = new Array(nQuestions);
let correct = 0;

// Wait for the page to load
// This syntax is jQuery shorthand for specifying the function to execute on page load
$(() => {
    qNumbers
      .map(n => {
          $(`button.q${n + 1}`)
            .map((buttonIndex, button) => {
                button.onclick = () => {
                    answered[n] = buttonIndex;
                    refresh();
                }
            })
      });
});

// Function to refresh the page view
const refresh = () => {
    // Recount correct answers every refresh
    correct = 0;

    qNumbers
      .map(n => {
          if (answered[n] !== undefined) {
            $(`button.q${n + 1}`)
              .attr("disabled", "disabled")
              .map((buttonIndex, button) => {
                // If this is the right answer, always make it green
                if (button.classList.contains("right")) {
                  button.classList.add("green");
                  if (answered[n] === buttonIndex) {
                    // They selected this, so they got it right!
                    correct++;
                  }
                } else {
                  // If this was a selected wrong answer, mark it red
                  if (answered[n] === buttonIndex) {
                    button.classList.add("red");
                  }
                }
              })
          }
      });

    // How many did we get right?
    console.log(`You've got got ${correct}/${answered.filter(ans => ans !== undefined).length} correct!`);
};
