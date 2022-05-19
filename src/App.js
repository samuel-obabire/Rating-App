import { useState } from "react"
import "./App.css"

import RatingSelect from "./components/rating-select/RatingSelect"

const App = () => {
  const [rating, setRating] = useState(0)

  return (
    <div className="container">
      <RatingSelect select={setRating} selectedRating={rating} />
    </div>
  )
}
export default App
