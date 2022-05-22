import PropTypes from "prop-types"

import "./Button.css"

const Button = ({ text, type }) => {
  return <button>{text}</button>
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["primary", "secondary"]),
}

Button.defaultProps = {
  type: "primary",
}

export default Button
