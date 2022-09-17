import { nanoid } from "nanoid";
import { useState, useEffect } from "react";
import Question from "./components/Question";
import Start from "./components/Start";
import Confetti from "react-confetti";

const App = () => {
  /* =========  States ========= */

  const [start, setStart] = useState(true);
  const [quizzes, setQuizzes] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [win, setWin] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [score, setScore] = useState(0);

  /* =========  Effects ========= */

  useEffect(() => {
    fetchData();
  }, [start]);

  /* ========= functions ========= */

  function CheckAnswers(ev) {
    ev.preventDefault();
    if (answers.every((answer) => answer.answer)) {
      let n = 0;
      answers.map((answer) => {
        answer.answer === answer.correct_answer && n++;
      });
      // console.log(n);
      setSubmit(true);
      setScore(n);
      n == answers.length && setWin(true);
    } else {
      alert("Please answer all questions :)");
    }
  }

  async function fetchData() {
    const response = await fetch(
      "https://opentdb.com/api.php?amount=5&category=21&difficulty=easy&type=multiple"
    );
    const data = await response.json();
    setQuizzes(data.results);
  }

  /* ================== */

  const quizzesElems = quizzes.map((quiz, i) => {
    return (
      <Question
        key={nanoid()}
        quiz={quiz}
        id={nanoid()}
        setAnswers={setAnswers}
        i={i}
        answerss={answers}
        submit={submit}
        setSubmit={setSubmit}
      />
    );
  });

  return (
    <>
      {start && !submit ? (
        <Start setStart={setStart} />
      ) : (
        <>
          <section className="quizzes">
            <div className="questions">{quizzesElems}</div>
            <div>
              {submit ? (
                <>
                  <span className="score">
                    You scored {score}/{answers.length} correct answers
                  </span>
                  <button
                    onClick={() => {
                      setSubmit(false);
                      setWin(false);
                      setAnswers([]);
                      fetchData();
                    }}
                  >
                    Play again
                  </button>
                </>
              ) : (
                <button onClick={CheckAnswers}>Check answers</button>
              )}
              {/* <button onClick={btnHandler}>
                {submit ? "Play again" : "Check answers"}
              </button> */}
            </div>
          </section>
          {win && <Confetti />}
        </>
      )}
    </>
  );
};

export default App;
