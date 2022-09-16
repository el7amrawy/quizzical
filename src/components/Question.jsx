import { nanoid } from "nanoid";
import { useState } from "react";

const Question = (props) => {
  const quiz = props.quiz;

  /* =========  States ========= */

  const [formData, setFormData] = useState({ answer: "" });

  /* ================== */

  const answers = [...quiz.incorrect_answers, quiz.correct_answer].sort();
  const answerElems = answers.map((answer) => {
    const id = nanoid();
    return (
      <label htmlFor={id} key={id}>
        {answer}
        <input
          type="radio"
          id={id}
          name="ss"
          value={answer}
          style={{ display: "none" }}
          checked={answer == formData.answer}
          onChange={() => {
            setFormData({ answer: answer });
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
