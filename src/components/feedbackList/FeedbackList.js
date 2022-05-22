import { useFeedback } from "../../context/FeedbackContext"

import FeedbackItem from "../feedback-item/FeedbackItem"

const FeedbackList = () => {
  const { feedback, isLoading } = useFeedback()

  if (isLoading) return <h4>Loading...</h4>
  if (!isLoading && !feedback.length) {
    return <p>No reviews yet</p>
  }

  const feeds = feedback.map(({ id, rating, text }) => {
    return <FeedbackItem key={id} rating={rating} text={text} />
  })

  return (
    <div className="container">
      <h4>Reviews:</h4>
      {feeds}
    </div>
  )
}

export default FeedbackList
