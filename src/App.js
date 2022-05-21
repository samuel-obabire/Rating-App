import { useState } from "react"
import "./App.css"

import RatingSelect from "./components/rating-select/RatingSelect"

const App = () => {
  const [rating, setRating] = useState(0)

  return (
    <div className="container">
      <RatingSelect
        select={setRating}
        selectedRating={rating}
        messages={[
          {
            i: 0.5,
            msg: 6,
          },
          {
            i: 1,
            msg: "Awful, not what I expected at all.",
          },
          {
            i: 1.5,
            msg: "Awful/Poor",
          },
          {
            i: 2,
            msg: "Poor/Pretty disappointed",
          },
          {
            i: 2.5,
            msg: "Poor/Average",
          },
          {
            i: 3,
            msg: "Average, Could be better",
          },
          {
            i: 3.5,
            msg: "Average/Good",
          },
          {
            i: 4,
            msg: "Good, what I expected",
          },
          {
            i: 4.5,
            msg: "Good/Amazing",
          },
          {
            i: 5,
            msg: "Amazing, above expectations!",
          },
        ]}
      />
    </div>
  )
}
export default App
