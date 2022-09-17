import { nanoid } from "nanoid";
import { useState, useEffect } from "react";

const Question = (props) => {
  const { quiz, setAnswers, id, i } = props;

  /* =========  States ========= */
  const [formData, setFormData] = useState({
    answer: "",
    correct_answer: quiz.correct_answer,
    id: id,
  });

  /* =========  Effects ========= */
  useEffect(() => {
    setAnswers((oldAnswers) => {
      oldAnswers[i] = formData;
      return oldAnswers;
    });
    // console.log(i);
  }, [formData]);
  // console.log(formData);
  /* ================== */

  const answers = [...quiz.incorrect_answers, quiz.correct_answer].sort();
  const name = nanoid();
  const answerElems = answers.map((answer) => {
    const id = nanoid();
    return (
      <label
        htmlFor={id}
        key={id}
        className={formData.answer == answer ? "selected" : ""}
      >
        {answer}
        <input
          type="radio"
          id={id}
          name={name}
          value={answer}
          style={{ display: "none" }}
          checked={answer == formData.answer}
          onChange={() => {
            setFormData((old) => {
              return { ...old, answer: answer };
            });
          }}
        />
      </label>
    );
  });

  return (
    <div className="question">
      <h2>{quiz.question}</h2>
      <div className="answers">{answerElems}</div>
    </div>
  );
};

export default Question;
