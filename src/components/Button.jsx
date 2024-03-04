import PropTypes from "prop-types";
import "./Button.css";

const Button = ({name}) => {
    return (
        <button>{name}</button>
    )
}

Button.propTypes = {
    name: PropTypes.string.isRequired
};

export default Button
