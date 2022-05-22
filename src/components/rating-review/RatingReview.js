import { useState } from "react"
import { useFeedback } from "../../context/FeedbackContext"

import "./RatingReview.css"
import Card from "../../Card"
import Button from "../shared/button/Button"

const RatingReview = () => {
  const [review, setReview] = useState("")
  const { handleSubmit } = useFeedback()

  const onChange = (e) => {
    setReview(e.currentTarget.value)
  }
  const onSubmit = (e) => {
    e.preventDefault()
    handleSubmit(review)
  }

  return (
    <Card>
      <div className="form">
        <form onSubmit={onSubmit}>
          <h3>Why did you leave this rating?</h3>
          <div className="input-group">
            <input
              type="text"
              value={review}
              onChange={(e) => onChange(e)}
              placeholder="Write a review"
            />
            <Button text="submit" />
          </div>
        </form>
      </div>
    </Card>
  )
}

export default RatingReview
