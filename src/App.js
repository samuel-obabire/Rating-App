import { useState } from "react"
import "./App.css"

import RatingSelect from "./components/rating-select/RatingSelect"
import RatingReview from "./components/rating-review/RatingReview"
import FeedbackProvider from "./context/FeedbackContext"

const App = () => {
  const [rating, setRating] = useState(0)

  return (
    <div className="container">
      <FeedbackProvider>
        <RatingSelect select={setRating} selectedRating={rating} />
        <RatingReview />
      </FeedbackProvider>
    </div>
  )
}
export default App
