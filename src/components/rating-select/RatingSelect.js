import PropTypes from "prop-types"
import { FaStarHalf } from "react-icons/fa"

import Card from "../../Card"

import "./RatingSelect.css"

const RatingSelect = ({ select, selectedRating, iconNum, color }) => {
  const { on, off } = color

  const onChange = (i) => {
    select(i)
  }

  return (
    <Card>
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
                  onChange={() => {
                    select(i - 0.5)
                  }}
                  type="checkbox"
                />
                <label htmlFor={`starhalf${i}`}>
                  <FaStarHalf
                    size="1.8rem"
                    color={isChecked1 ? on : off}
                    className="star first-star"
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
                    color={isChecked2 ? on : off}
                    className="star second-star"
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
