import Card from "../../Card"
const FeedbackItem = ({ rating, text }) => {
  return (
    <Card>
      <div className="feedback-item">
        <span>{rating}</span>
        <div>{text}</div>
      </div>
    </Card>
  )
}

export default FeedbackItem
