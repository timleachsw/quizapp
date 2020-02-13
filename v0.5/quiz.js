// Constants
const nQuestions = 10;
const qNumbers = [...Array(nQuestions).keys()];
const answered = new Array(nQuestions);
let correct = 0;

// Wait for the document to load
$(() => {

});

// Wait for the page to load
// This syntax is jQuery shorthand for specifying the function to execute on page load
$(() => {
  // Make a GET request to the open trivia db
  $.get(`https://opentdb.com/api.php?amount=${nQuestions}`, () => {
    console.log("API call successful")
  }, "json")
    .done(data => {
      // Turn each question into an HTML object
      const questionHtmlArray = data.results.map((questionData, questionDataIndex) => {
        // Make the wrong answer buttons
        const answerButtons = questionData.incorrect_answers.map(answer =>
          `<button class="q${questionDataIndex + 1} wrong">${answer}</button>`);

        // Splice the right answer button randomly into the list
        answerButtons.splice(
          Math.floor(Math.random() * (answerButtons.length + 1)),
          0,
          `<button class="q${questionDataIndex + 1} right">${questionData.correct_answer}</button>`
        );

        return `<h2>Question ${questionDataIndex + 1}</h2>
          <p>
            ${questionData.question}<br />
            ${answerButtons.join("<br />\n")}
          </p>`
      });

      // Turn this array into one big HTML string
      const questionsHtml = questionHtmlArray.join("");

      // Set the HTML of the "questions" div to this
      $(".questions").html(questionsHtml);

      // Then set the click callbacks
      qNumbers
        .map(n => {
          $(`button.q${n + 1}`)
            .map((buttonIndex, button) => {
              button.onclick = () => {
                answered[n] = buttonIndex;
                refresh();
              }
            });
        });
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
