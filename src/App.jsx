import { nanoid } from "nanoid";
import { useState, useEffect } from "react";
import Question from "./components/Question";
import Start from "./components/Start";

const App = () => {
  /* =========  States ========= */

  const [start, setStart] = useState(true);
  const [quizzes, setQuizzes] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [win, setWin] = useState(false);
  // const [pop, setPop] = useState(false);

  /* =========  Effects ========= */

  useEffect(() => {
    (async () => {
      const response = await fetch(
        "https://opentdb.com/api.php?amount=5&category=21&difficulty=easy&type=multiple"
      );
      const data = await response.json();
      setQuizzes(data.results);
    })();
  }, [start]);

  /* ========= functions ========= */
  // const correctAnswers = (quizzes) =>
  //   quizzes.map((quiz) => quiz.correct_answer);
  function btnHandler(ev) {
    ev.preventDefault();
  }

  /* =========   ========= */

  const quizzesElems = quizzes.map((quiz, i) => {
    return (
      <Question
        key={nanoid()}
        quiz={quiz}
        id={`q${i}`}
        setAnswers={setAnswers}
        i={i}
        answer={answers}
      />
    );
  });

  return (
    <>
      {start ? (
        <Start setStart={setStart} />
      ) : (
        <section className="quizzes">
          <div className="questions">{quizzesElems}</div>
          <button onClick={btnHandler}>Check answers</button>
        </section>
      )}
      {/* {pop && (
        <div className="pop" onClick={() => setPop(false)}>
          <div>Please answer all questions</div>
        </div>
      )} */}
    </>
  );
};

export default App;
