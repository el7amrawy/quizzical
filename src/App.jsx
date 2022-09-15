import { useState, useEffect } from "react";
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
      console.log(quizzes);
    })();
  }, [start]);

  /* =========   ========= */

  const quizzesElems = quizzes.map((quiz) => {
    return <div>{quiz.question}</div>;
  });

  return <>{start ? <Start setStart={setStart} /> : quizzesElems}</>;
};

export default App;
