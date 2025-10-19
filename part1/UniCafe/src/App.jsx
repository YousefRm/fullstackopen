import { useState } from "react"
const Button = ({ label, onbtnclick }) => {
  return <button onClick={onbtnclick}>{label}</button>
}
const Feedback = ({ lables, addReview }) => {
  const [review1, review2, review3] = lables;
  return <div>
    <h1>give a feedback</h1>
    <Button label={review1} onbtnclick={addReview(review1)} />
    <Button label={review2} onbtnclick={addReview(review2)} />
    <Button label={review3} onbtnclick={addReview(review3)} />
  </div>
}
const StatisticLine = ({ label, count }) => {
  return <tr>
    <td>{label}</td>
    <td>{count}</td>
  </tr>
}
const Statistic = ({ review, lables }) => {
  if (review.total === 0) return <p>no feed back yet</p>;
  return (
    <>
      <h1>statistics</h1>
      <table>
        <StatisticLine label={lables[0]} count={review.good} />
        <StatisticLine label={lables[1]} count={review.natural} />
        <StatisticLine label={lables[2]} count={review.bad} />
        <StatisticLine label={lables[3]} count={review.total} />
        <StatisticLine label={lables[4]} count={review.average} />
        <StatisticLine label={lables[5]} count={review.positive} />
      </table>
    </>
  )
}
const App = () => {
  const [review, setReview] = useState({ good: 0, natural: 0, bad: 0, total: 0, average: 0, positive: 0 });
  const reviewLables = Object.keys(review);
  const addReview = (typ) => () => {
    const updatedReview = { ...review };
    const [case1, case2, case3] = reviewLables;
    switch (typ) {
      case case1:
        updatedReview[case1] += 1;
        break;
      case case2:
        updatedReview[case2] += 1;
        break;
      case case3:
        updatedReview[case3] += 1;

    }
    updatedReview.total += 1;
    updatedReview.average = ((updatedReview[case1] - updatedReview[case3]) / updatedReview.total).toFixed(2);
    updatedReview.positive = Math.round(updatedReview[case1] / updatedReview.total * 100) + '%';
    setReview(updatedReview)
  }
  return <div>
    <Feedback lables={reviewLables} addReview={addReview} />
    <Statistic lables={reviewLables} review={review} />
  </div>
}
export default App
