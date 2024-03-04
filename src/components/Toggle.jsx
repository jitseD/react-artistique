import PropTypes from "prop-types";
import "./Toggle.css";

const Toggle = ({ label }) => {
    return (
        <label className="toggle__label" htmlFor={label}>
            <input type="checkbox" id={label} />
            <div className="toggle"></div>
        </label>
    )
}

Toggle.propTypes = {
    label: PropTypes.string.isRequired
};

export default Toggle
