import "./App.css"

import FeedbackProvider from "./context/FeedbackContext"
import RatingSelect from "./components/rating-select/RatingSelect"
import RatingReview from "./components/rating-review/RatingReview"
import FeedbackList from "./components/feedbackList/FeedbackList"

const App = () => {
  return (
    <div className="container">
      <FeedbackProvider>
        <RatingSelect />
        <RatingReview />
        <FeedbackList />
      </FeedbackProvider>
    </div>
  )
}
export default App
