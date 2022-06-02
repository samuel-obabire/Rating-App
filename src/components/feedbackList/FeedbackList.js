import { AnimatePresence, motion } from "framer-motion"
import { useFeedback } from "../../context/FeedbackContext"

import "./FeedbackList.css"
import FeedbackItem from "../feedback-item/FeedbackItem"

const FeedbackList = () => {
  const { feedback, isLoading } = useFeedback()

  if (isLoading) return <div>Loading...</div>
  if (!isLoading && !feedback.length) {
    return <p>No review yet</p>
  }

  const feeds = feedback.map(({ ...props }) => {
    return (
      <motion.div
        key={props.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <FeedbackItem {...props} />
      </motion.div>
    )
  })

  const average = (
    feedback.reduce((prev, cur) => prev + cur.rating, 0) / feedback.length
  )
    .toFixed(1)
    .replace(".0", "")

  return (
    <div className="container">
      <h3>Reviews:</h3>
      <div className="review-title">
        <span>No of reviews: {feedback.length}</span>
        <span>Average review: {average}</span>
      </div>
      <AnimatePresence>{feeds}</AnimatePresence>
    </div>
  )
}

export default FeedbackList
