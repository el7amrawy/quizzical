const Start = (props) => {
  return (
    <section className="start">
      <div>
        <h2>Quizzical</h2>
        <h4>Some description if needed</h4>
        <button onClick={() => props.setStart(false)}>Start quiz</button>
      </div>
    </section>
  );
};

export default Start;
