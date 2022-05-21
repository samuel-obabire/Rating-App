import PropTypes from "prop-types"
import { useEffect, useState } from "react"
import { FaStarHalf } from "react-icons/fa"

import Card from "../../Card"

import "./RatingSelect.css"

const defaultMsg = [
  {
    i: 0.5,
    msg: "Awful, not what I expected at all.",
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
]

const RatingSelect = ({
  select,
  selectedRating,
  color,
  messages = defaultMsg,
}) => {
  const [mouseOverId, setMouseOverId] = useState(null)
  const [message, setMessage] = useState("")
  const { on, off } = color

  useEffect(() => {
    // if there is no mouseOverId
    if (mouseOverId !== null) {
      return setMessage(messages.find((m) => m.i === mouseOverId).msg)
    }

    if (selectedRating !== 0) {
      return setMessage(messages.find((m) => m.i === selectedRating).msg)
    }

    setMessage("Select rating")
  }, [selectedRating, mouseOverId, messages])

  const onChange = (i) => {
    select(i)
  }

  const onMouseEnter = (i) => {
    setMouseOverId(i)
  }

  const c = (isChecked, i) => {
    // make color on when checked  or hovered
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
        {Array.from({ length: 5 }, (_, i) => {
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
  color: {
    on: "#fec107",
    off: "#f9f7f3",
  },
}

const f = (props, propName) => {
  let message = ""
  const isValid = props[propName].every((entry, index) => {
    if (typeof entry !== "object" || entry === "null" || Array.isArray(entry)) {
      message = `Entries of ${propName} must be an object. Received ${"something else"}`
      return false
    } else if (Object.keys(entry).length !== 2) {
      message = `Keys of ${propName} must be 2 and contain only 'i' and 'msg'.
        Instead recieved ${Object.keys(entry).length} keys`
      return false
    } else if (!entry["i"]) {
      message = `Keys of ${propName} must be 2 and contain only 'i' and 'msg'.
        Instead recieved ${entry["i"]} for the value of "i" at index ${index}`
      return false
    } else if (typeof entry["i"] !== "number") {
      message = `typeof value i should be number.
        Instead recieved type  ${typeof entry[
          "i"
        ]} for the value of "i" at index ${index}`
      return false
    } else if (!entry["msg"]) {
      message = `Keys of ${propName} must be 2 and contain only 'i' and 'msg'.
        Instead recieved ${entry["msg"]} for the value of "msg" at index ${index}`
      return false
    } else if (typeof entry["msg"] !== "string") {
      message = `typeof value i should be string.
        Instead recieved  type ${typeof entry[
          "msg"
        ]} for the value of "msg" at index ${index}`
      return false
    }

    return true
  })

  return { isValid, message }
}

RatingSelect.propTypes = {
  color: PropTypes.shape({
    on: PropTypes.string.isRequired,
    off: PropTypes.string.isRequired,
  }),
  select: PropTypes.func.isRequired,
  selectedRating: PropTypes.number.isRequired,
  messages: (props, propName, componentName) => {
    // @to-do add support to customise messages
    // check if an array of length 5 was passed
    if (!Array.isArray(props[propName]) || props[propName]?.length !== 10) {
      return new Error(`${propName} needs to be an array of lenght 10`)
    }

    const { message, isValid } = f(props, propName)
    if (!isValid) return new Error(message)
  },
}

export default RatingSelect
