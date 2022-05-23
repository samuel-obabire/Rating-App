import { useEffect, useState } from "react"
import { useFeedback } from "../../context/FeedbackContext"

import "./RatingReview.css"
import Card from "../../Card"
import Button from "../shared/button/Button"

const RatingReview = () => {
  const [review, setReview] = useState("")
  const { handleSubmit, selectedRating, edit, select, handleUpdate } =
    useFeedback()

  useEffect(() => {
    const { editMode, item } = edit
    if (!editMode) return

    setReview(item.text)
    select(item.rating)
  }, [edit, select])

  const onChange = (e) => {
    setReview(e.currentTarget.value)
  }
  const onSubmit = (e) => {
    e.preventDefault()

    if (selectedRating === 0) {
      alert("select a rating")
    } else if (!review.trim().length) {
      alert("enter a review")
    } else if (edit.editMode) {
      handleUpdate({
        rating: selectedRating,
        text: review.trim(),
        id: edit.item.id,
      })
      setReview("")
      select(0)
    } else {
      handleSubmit({
        rating: selectedRating,
        text: review.trim(),
      })
      setReview("")
      select(0)
    }
  }

  return (
    <Card>
      <div className="form">
        <form onSubmit={onSubmit}>
          <h3>Write a review</h3>
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
