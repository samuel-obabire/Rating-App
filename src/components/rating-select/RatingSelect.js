import PropTypes from "prop-types"
import { useEffect, useState } from "react"
import { FaStarHalf } from "react-icons/fa"

import Card from "../../Card"

import "./RatingSelect.css"

const messages = [
  {
    i: 0.5,
    message: "Awful, not what I expected at all.",
  },
  {
    i: 1,
    message: "Awful, not what I expected at all.",
  },
  {
    i: 1.5,
    message: "Awful/Poor",
  },
  {
    i: 2,
    message: "Poor/Pretty disappointed",
  },
  {
    i: 2.5,
    message: "Poor/Average",
  },
  {
    i: 3,
    message: "Average, Could be better",
  },
  {
    i: 3.5,
    message: "Average/Good",
  },
  {
    i: 4,
    message: "Good, what I expected",
  },
  {
    i: 4.5,
    message: "Good/Amazing",
  },
  {
    i: 5,
    message: "Amazing, above expectations!",
  },
]

const RatingSelect = ({ select, selectedRating, iconNum, color }) => {
  const [mouseOverId, setMouseOverId] = useState(null)
  const [message, setMessage] = useState("")
  const { on, off } = color

  useEffect(() => {
    // if there is no mouseOverId
    if (mouseOverId !== null) {
      return setMessage(messages.find((m) => m.i === mouseOverId).message)
    }

    if (selectedRating !== 0) {
      return setMessage(messages.find((m) => m.i === selectedRating).message)
    }

    setMessage("Select rating")
  }, [selectedRating, mouseOverId])

  const onChange = (i) => {
    select(i)
  }

  const onMouseEnter = (i) => {
    setMouseOverId(i)
  }

  const c = (isChecked, i) => {
    // determine if the color should be on or off
    if (mouseOverId && mouseOverId >= i) {
      return true
    } else if (isChecked && mouseOverId === null) {
      return true
    } else {
      return false
    }
  }

  return (
    <Card>
      <h1>How would you rate this app?</h1>
      <h2>{message}</h2>
      <div className="rating-container">
        {Array.from({ length: iconNum }, (_, i) => {
          i = i + 1
          const half = 0.5
          const isChecked1 = selectedRating >= i - half
          const isChecked2 = selectedRating >= i

          return (
            <div key={`rating-${i}`} className="rating">
              <div>
                <input
                  id={`starhalf${i}`}
                  defaultChecked={isChecked1}
                  type="checkbox"
                  onChange={() => {
                    // select the first full start if the other half is selected
                    if (i === half || i === 1) return select(1)
                    select(i - half)
                  }}
                />
                <label htmlFor={`starhalf${i}`}>
                  <FaStarHalf
                    size="1.8rem"
                    color={c(isChecked1, i - half) ? on : off}
                    className="star first-star"
                    onMouseEnter={() => {
                      // select the first full start if the other half is selected
                      if (i === half || i === 1) return onMouseEnter(1)
                      onMouseEnter(i - half)
                    }}
                    onMouseLeave={() => onMouseEnter(null)}
                  />
                </label>
              </div>
              <div>
                <input
                  id={`star${i}`}
                  type="checkbox"
                  onChange={() => onChange(i)}
                  defaultChecked={isChecked1}
                />
                <label htmlFor={`star${i}`}>
                  <FaStarHalf
                    size="1.8rem"
                    color={c(isChecked2, i) ? on : off}
                    className="star second-star"
                    onMouseEnter={() => onMouseEnter(i)}
                    onMouseLeave={() => onMouseEnter(null)}
                  />
                </label>
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}

RatingSelect.defaultProps = {
  iconNum: 5,
  color: {
    on: "#fec107",
    off: "#f9f7f3",
  },
}

RatingSelect.propTypes = {
  iconNum: PropTypes.number,
  color: PropTypes.shape({
    on: PropTypes.string.isRequired,
    off: PropTypes.string.isRequired,
  }),
  select: PropTypes.func.isRequired,
  selectedRating: PropTypes.number.isRequired,
}

export default RatingSelect
