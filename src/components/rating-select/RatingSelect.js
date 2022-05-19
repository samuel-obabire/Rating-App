import PropTypes from "prop-types"
import { useState } from "react"
import { FaStarHalf } from "react-icons/fa"

import Card from "../../Card"

import "./RatingSelect.css"

const RatingSelect = ({ select, selectedRating, iconNum, color }) => {
  const [mouseOverId, setMouseOverId] = useState(null)
  const { on, off } = color

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
      <div className="rating-container">
        {Array.from({ length: iconNum }, (_, i) => {
          i = i + 1
          const isChecked1 = selectedRating >= i - 0.5
          const isChecked2 = selectedRating >= i

          return (
            <div key={`rating-${i}`} className="rating">
              <div>
                <input
                  id={`starhalf${i}`}
                  defaultChecked={isChecked1}
                  type="checkbox"
                  onChange={() => {
                    select(i - 0.5)
                  }}
                />
                <label htmlFor={`starhalf${i}`}>
                  <FaStarHalf
                    size="1.8rem"
                    color={c(isChecked1, i - 0.5) ? on : off}
                    className="star first-star"
                    onMouseEnter={() => onMouseEnter(i - 0.5)}
                    onMouseLeave={() => onMouseEnter(null)}
                  />
                </label>
              </div>
              <div>
                <input
                  id={`star${i}`}
                  className="one"
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
