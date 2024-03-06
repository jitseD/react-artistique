import PropTypes from "prop-types";
import "./Button.css";

const Button = ({ name, onClickButton }) => {
    return (
        <button onClick={onClickButton}>{name}</button>
    )
}

Button.propTypes = {
    name: PropTypes.string.isRequired,
    onClickButton: PropTypes.func.isRequired
};

export default Button
