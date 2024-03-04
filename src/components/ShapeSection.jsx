import Button from "./Button";
import ColorPicker from "./ColorPicker";
import Slider from "./Slider";
import "./ShapeSection.css";

const ShapeSection = () => {
    return (
        <article>
            <Slider min={0} max={10} />
            <Button name="reposition" />
            <ColorPicker />
        </article>
    )
}

export default ShapeSection
