import { nanoid } from "nanoid";
import { useState, useEffect } from "react";

const Question = (props) => {
  const { quiz, setAnswers, id, i, submit, setSubmit, answerss } = props;

  /* =========  States ========= */
  const [labelId, setLabelId] = useState(id);

  const [formData, setFormData] = useState({
    answer: "",
    correct_answer: quiz.correct_answer,
    id: labelId,
  });
  /* =========  Effects ========= */
  useEffect(() => {
    setAnswers((oldAnswers) => {
      oldAnswers[i] = formData;
      return oldAnswers;
    });
    // console.log(i);
  }, [formData]);
  // document.documentElement.classList.add
  useEffect(() => {
    // if (submit) {
    //   console.log(1, Array.from(document.querySelectorAll(".selected")));
    //   Array.from(document.querySelectorAll(".selected")).map((label) => {
    //     console.log(label.firstChild.value);
    //     if (label.firstChild.value == formData.answer) {
    //       label.classList.add("right");
    //     }
    //   });
    // }
  }, [submit]);
  // console.log(formData);
  /* ================== */

  const answers = [...quiz.incorrect_answers, quiz.correct_answer].sort();
  const name = nanoid();
  const answerElems = answers.map((answer) => {
    const id = nanoid();

    let labelClasses = "";
    if ((formData.answer || answerss[i]?.answer) == answer) {
      labelClasses = "selected";
    }
    if (submit) {
      if (
        // (formData.answer || answerss[i]?.answer) == answer &&
        (formData.correct_answer || answerss[i]?.correct_answer) == answer
      ) {
        labelClasses = "right";
      } else if (
        (formData.answer || answerss[i]?.answer) == answer &&
        (formData.correct_answer || answerss[i]?.correct_answer) != answer
      ) {
        labelClasses = "wrong";
      }
    }

    return (
      <label
        htmlFor={id}
        key={id}
        className={
          // (formData.answer || answerss[i]?.answer) == answer ? "selected" : ""
          labelClasses
        }
        id={labelId}
      >
        {answer}
        <input
          type="radio"
          id={id}
          name={name}
          value={answer}
          style={{ display: "none" }}
          // checked={answer == answerss[i].answer}
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
