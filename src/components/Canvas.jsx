import PropTypes from "prop-types";
import { useContext, useRef, useEffect } from "react";
import { canvas } from "../context/CanvasContext";
import Lines from "./Lines";
import Shape from "./Shape";

const Canvas = ({ frame, linesPattern, lines, shapes, title, colorMode }) => {
    const canvasContext = useContext(canvas);
    const canvasMargin = {
        width: canvasContext.width - frame.margin,
        height: canvasContext.height - frame.margin,
        heightHalf: canvasContext.height - frame.margin / 2,
    }
    const textRef = useRef(null);
    const textBoxRef = useRef(null);

    useEffect(() => {
        const textBBox = textRef.current.getBBox();
        const textBoxAttributes = {
            x: canvasMargin.width - textBBox.width - 10, y: canvasMargin.heightHalf - textBBox.height / 2 - 5,
            width: textBBox.width + 20, height: textBBox.height + 10
        }
        Object.entries(textBoxAttributes).forEach(([attribute, value]) => {
            textBoxRef.current.setAttribute(attribute, value);
        })
    }, [canvasMargin, title]);

    return (
        <svg viewBox={`0 0 ${canvasContext.width} ${canvasContext.height}`}>
            <rect // background
                x="0" y="0" width="100%" height="100%"
                fill={colorMode.background}
            />

            {linesPattern.map(linePattern => (
                <Lines key={linePattern.id} linePattern={linePattern} lines={lines} colorMode={colorMode} />
            ))}

            {shapes.map((value) => (
                <Shape key={value.id} value={value} colorMode={colorMode} />
            ))}

            <rect // frame
                className={`${colorMode.darkMode ? 'shadow__frame--darkmode' : 'shadow__frame'}`}
                x={0 + frame.margin / 2} y={0 + frame.margin / 2} width={canvasMargin.width} height={canvasMargin.height}
                fill="none"
                stroke={colorMode.background} strokeWidth={frame.margin}
            />
            <rect // dash
                x={frame.margin / 2} y={frame.margin / 2} width={canvasMargin.width} height={canvasMargin.height}
                fill="none"
                stroke={colorMode.foreground} strokeWidth="2" strokeDasharray={frame.dashes}
                rx="5"
            />

            <rect ref={textBoxRef} fill={colorMode.background} />
            <text
                ref={textRef}
                fontSize={frame.margin / 2} fontFamily="Arial, Helvetica, sans-serif"
                textAnchor="end" dominantBaseline="middle"
                x={canvasMargin.width} y={canvasMargin.heightHalf}
                fill={colorMode.foreground}
            >{title}</text>
        </svg>
    )
}

Canvas.propTypes = {
    frame: PropTypes.object.isRequired,
    linesPattern: PropTypes.array.isRequired,
    lines: PropTypes.object.isRequired,
    shapes: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    colorMode: PropTypes.object.isRequired,
};

export default Canvas
