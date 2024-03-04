import PropTypes from "prop-types";
import "./Slider.css";

const Slider = ({min, max, label }) => {
    return (
        label ? (
            <label className="slider__label" htmlFor={label}>
                {label}
                <input type="range" min={min} max={max} id={label} />
            </label>
        ) : (
            <input type="range" min={min} max={max} />
        )
    )
}

Slider.propTypes = {
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    label: PropTypes.string
};

export default Slider
