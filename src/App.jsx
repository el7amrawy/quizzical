import { nanoid } from "nanoid";
import { useState, useEffect } from "react";
import Question from "./components/Question";
import Start from "./components/Start";

const App = () => {
  /* =========  States ========= */

  const [start, setStart] = useState(true);
  const [quizzes, setQuizzes] = useState([]);

  /* =========  Effects ========= */

  useEffect(() => {
    (async () => {
      const response = await fetch(
        "https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple"
      );
      const data = await response.json();
      setQuizzes(data.results);
      // console.log(quizzes);
    })();
  }, [start]);

  /* =========   ========= */

  const quizzesElems = quizzes.map((quiz) => (
    <Question key={nanoid()} quiz={quiz} />
  ));

  return (
    <>
      {start ? (
        <Start setStart={setStart} />
      ) : (
        <section className="quizzes">
          <div className="questions">{quizzesElems}</div>
        </section>
      )}
    </>
  );
};

export default App;
