const Question = ({ number, question, answer1, answer2, answer3, ...props }) => {
  return (
    <form {...props}>
      <div className="text-xl text-zinc-300 absolute top-10">
        <label htmlFor="number">#<strong className="font-bold">{number}</strong></label>
        <input type="text" id="number" name="number" className="sr-only" value={number} readOnly />
      </div>
      <h2 className="text-xl mt-4 mb-6">
        {question}
      </h2>
      <div className="flex gap-3 my-5">
        <input type="radio" id="answer-1" name="survey" className="radio" value={answer1} required />
        <label className="radio-label" htmlFor="answer-1">{answer1}</label>
      </div>
      <div className="flex gap-3 my-5">
        <input type="radio" id="answer-2" name="survey" className="radio" value={answer2} required />
        <label className="radio-label" htmlFor="answer-2">{answer2}</label>
      </div>
      <div className="flex gap-3 my-5">
        <input type="radio" id="answer-3" name="survey" className="radio" value={answer3} required />
        <label className="radio-label" htmlFor="answer-3">{answer3}</label>
      </div>
      <button type="submit" className="button mt-7">Next</button>
    </form>
  )
}

export default Question;