import { useState } from "react"
import "./App.css"

import FeedbackProvider from "./context/FeedbackContext"
import RatingSelect from "./components/rating-select/RatingSelect"
import RatingReview from "./components/rating-review/RatingReview"
import FeedbackList from "./components/feedbackList/FeedbackList"

const App = () => {
  const [rating, setRating] = useState(0)

  return (
    <div className="container">
      <FeedbackProvider>
        <RatingSelect select={setRating} selectedRating={rating} />
        <RatingReview />
        <FeedbackList />
      </FeedbackProvider>
    </div>
  )
}
export default App
