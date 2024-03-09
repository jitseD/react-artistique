import PropTypes from "prop-types";
import "./Shape.css"

const Shape = ({ value, colorMode }) => {
    const gradientId = `gradient-${value.id}`;

    return (
        <>
            <defs>
                <radialGradient id={gradientId} r="100%" fx="100%" fy="0%">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.5)" />
                    <stop offset="40%" stopColor={value.color} />
                    <stop offset="100%" stopColor="rgba(0,0,0,0.5)" />
                </radialGradient>
            </defs>
            {value.typeCircle ? (
                <>
                    <circle // drop shadow
                        mask="url(#canvas)" className="shadow__shape"
                        cx={value.pos.x - 10} cy={value.pos.y + 10} r={value.size}
                        fill={colorMode.foreground}
                        stroke="none"
                    />
                    <circle
                        mask="url(#canvas)"
                        cx={value.pos.x} cy={value.pos.y} r={value.size}
                        fill={value.color}
                        stroke="none"
                    />
                    <circle // gradient
                        mask="url(#canvas)"
                        cx={value.pos.x} cy={value.pos.y} r={value.size}
                        fill={`url(#${gradientId})`}
                        stroke="none"
                    />
                </>
            ) : (
                <>
                    <rect // drop shadow
                        mask="url(#canvas)" className="shadow__shape"
                        x={value.pos.x - 10} y={value.pos.y + 10} width={value.size * 1.5} height={value.size * 2}
                        fill={colorMode.foreground}
                        stroke="none"
                    />
                    <rect
                        mask="url(#canvas)"
                        x={value.pos.x} y={value.pos.y} width={value.size * 1.5} height={value.size * 2}
                        fill={value.color}
                        stroke="none"
                    />
                    <rect // gradient
                        mask="url(#canvas)"
                        x={value.pos.x} y={value.pos.y} width={value.size * 1.5} height={value.size * 2}
                        fill={`url(#${gradientId})`}
                        stroke="none"
                    />
                </>
            )}
        </>
    );
}

Shape.propTypes = {
    value: PropTypes.object.isRequired,
    colorMode: PropTypes.object.isRequired,
};

export default Shape