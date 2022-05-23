import PropTypes from "prop-types"
import { FaTimes, FaEdit } from "react-icons/fa"

import "./FeedbackItem.css"

import { useFeedback } from "../../context/FeedbackContext"
import Card from "../../Card"

const FeedbackItem = (item) => {
  const { rating, text, id } = item
  const { handleDelete, setEdit } = useFeedback()

  const onEdit = () => {
    setEdit({ item, editMode: true })
  }

  return (
    <Card>
      <div className="feedback-item">
        <span className="rating-num">{rating}</span>
        <div className="feedback-text">{text}</div>
        <div className="feedback-ctrl">
          <FaTimes
            className="feedback-ctrl-btn"
            onClick={() => handleDelete(id)}
          />
          <FaEdit className="feedback-ctrl-btn" onClick={onEdit} />
        </div>
      </div>
    </Card>
  )
}

FeedbackItem.propTypes = {
  rating: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
}

export default FeedbackItem
