import PropTypes from "prop-types";
import "./TextInput.css";

const TextInput = ({ label }) => {
    return (
        <input type="text" placeholder={label} />
    )
}

TextInput.propTypes = {
    label: PropTypes.string.isRequired
};

export default TextInput
