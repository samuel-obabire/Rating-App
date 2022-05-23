import { useFeedback } from "../../context/FeedbackContext"

import FeedbackItem from "../feedback-item/FeedbackItem"

const FeedbackList = () => {
  const { feedback, isLoading } = useFeedback()

  if (isLoading) return <div>Loading...</div>
  if (!isLoading && !feedback.length) {
    return <p>No reviews yet</p>
  }

  const feeds = feedback.map(({ ...props }) => {
    return <FeedbackItem key={props.id} {...props} />
  })

  return (
    <div className="container">
      <h3>Reviews:</h3>
      {feeds}
    </div>
  )
}

export default FeedbackList
