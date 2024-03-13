import PropTypes from "prop-types";
import { useContext, useRef, useEffect } from "react";
import { canvas } from "../context/CanvasContext";
import Lines from "./Lines";
import Shape from "./Shape";

const Canvas = ({ frame, linesPattern, lines, shapes, title, colorMode, styling }) => {
    const canvasContext = useContext(canvas);
    const textRef = useRef(null);
    const textBoxRef = useRef(null);

    useEffect(() => {
        const textBBox = textRef.current.getBBox();
        const textBoxAttributes = {
            x: canvasContext.width - frame.margin - textBBox.width - 10,
            y: canvasContext.height - frame.margin / 2 - textBBox.height / 2 - 5,
            width: textBBox.width + 20,
            height: textBBox.height + 10
        }
        Object.entries(textBoxAttributes).forEach(([attribute, value]) => {
            textBoxRef.current.setAttribute(attribute, value);
        })
    }, [canvasContext, frame, title]);

    return (
        <svg viewBox={`0 0 ${canvasContext.width} ${canvasContext.height}`}>
            <defs>
                <filter id="noise">
                    <feTurbulence type="fractalNoise" baseFrequency="200" numOctaves="100" result="turbulence" />
                    <feComposite operator="in" in="turbulence" in2="SourceAlpha" result="composite" />
                    <feColorMatrix in="composite" type="luminanceToAlpha" />
                    <feBlend in="SourceGraphic" in2="composite" mode="color-burn" />
                </filter>
            </defs>
            <rect // background
                x="0" y="0" width="100%" height="100%"
                fill={colorMode.background}
            />

            {linesPattern.map(linePattern => (
                <Lines key={linePattern.id} linePattern={linePattern} lines={lines} colorMode={colorMode} />
            ))}

            {shapes.map((value) => (
                <Shape key={value.id} value={value} colorMode={colorMode} styling={styling} />
            ))}

            <rect // frame
                className={`${styling.dropShadow ? colorMode.darkMode ? 'shadow__frame--darkmode' : 'shadow__frame' : ``}`}
                x={0 + frame.margin / 2} y={0 + frame.margin / 2} width={canvasContext.width - frame.margin} height={canvasContext.height - frame.margin}
                fill="none"
                stroke={colorMode.background} strokeWidth={frame.margin}
            />
            <rect // dash
                x={frame.margin / 2} y={frame.margin / 2} width={canvasContext.width - frame.margin} height={canvasContext.height - frame.margin}
                fill="none"
                stroke={colorMode.foreground} strokeWidth="2" strokeDasharray={frame.dashes}
                rx="5"
            />

            <rect ref={textBoxRef} fill={colorMode.background} />
            <text
                ref={textRef}
                fontSize={frame.margin / 2} fontFamily="Arial, Helvetica, sans-serif"
                textAnchor="end" dominantBaseline="middle"
                x={canvasContext.width - frame.margin} y={canvasContext.height - frame.margin / 2}
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
    styling: PropTypes.object.isRequired,
};

export default Canvas
