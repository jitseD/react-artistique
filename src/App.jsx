import { useState, useContext } from "react";
import { canvas } from "./context/CanvasContext";
import InputSection from "./components/InputSection";
import Slider from "./components/Slider";
import SliderWrapper from "./components/SliderWrapper";
import ShapeSection from "./components/ShapeSection";
import TextInput from "./components/TextInput";
import Toggle from "./components/Toggle";
import './App.css'


const App = () => {
  const canvasContext = useContext(canvas);
  const [darkMode, setDarkMode] = useState(false);
  const [title, setTitle] = useState("");
  const [shapes, setShapes] = useState([
    { id: "shape1", size: 50, color: "#ff0000", pos: { x: 10, y: 100 }, typeCircle: true },         // random pos
    { id: "shape2", size: 80, color: "#00ff00", pos: { x: 30, y: 200 }, typeCircle: true },         // random size
    { id: "shape3", size: 100, color: "#0000ff", pos: { x: 40, y: 250 }, typeCircle: true },         // random color
    { id: "shape4", size: 130, color: "#ffff00", pos: { x: 50, y: 120 }, typeCircle: true },         // random type
    { id: "shape5", size: 150, color: "#ff00ff", pos: { x: 60, y: 130 }, typeCircle: false },
    { id: "shape6", size: 200, color: "#00ffff", pos: { x: 70, y: 230 }, typeCircle: false },
  ]);
  const [lines, setLines] = useState({ total: 10, rotation: 0 });                 // random total / rotation
  const [frame, setFrame] = useState({ margin: 40, dashes: 10 });                 // random margin / dashes

  const handleColorModeChange = () => {
    const newDarkMode = !darkMode;
    if (newDarkMode) {
      document.documentElement.style.setProperty('--c-bg', '#0D0D0C');
      document.documentElement.style.setProperty('--c-fg', '#F2F2E6');
    } else {
      document.documentElement.style.setProperty('--c-fg', '#0D0D0C');
      document.documentElement.style.setProperty('--c-bg', '#F2F2E6');
    }
    setDarkMode(newDarkMode);
  }

  const handleValueChange = (type, property, value) => {
    switch (type) {
      case `shapes`:
        setShapes(shapes.map((shape, i) => (i === value.index ? { ...shape, [property]: value.value } : shape)));
        break;
      case `lines`:
        setLines({ ...lines, [property]: value });
        break;
      case `frame`:
        setFrame({ ...frame, [property]: value });
        break;
      default: break;
    }
  }

  return (
    <>
      <h1 className="title">React Artistique</h1>
      <div className="frame">
        <svg viewBox={`0 0 ${canvasContext.width} ${canvasContext.height}`}>
          <defs>
            <mask id="frame">
              <rect
                x="0" y="0" width="100%" height="100%"
                fill="#FFFFFF"
                rx="5"
              />
              <rect
                x={frame.margin} y={frame.margin} width={canvasContext.width - frame.margin * 2} height={canvasContext.height - frame.margin * 2}
                fill="#000000"
                rx="5"
              />
            </mask>
            <mask id="canvas">
              <rect
                x={frame.margin} y={frame.margin} width={canvasContext.width - frame.margin * 2} height={canvasContext.height - frame.margin * 2}
                fill="#FFFFFF"
                rx="5"
              />
            </mask>
          </defs>
          <rect
            x="0" y="0" width="100%" height="100%"
            fill="#F2F2E6"
            rx="5"
          />

          {shapes.map((value) => {
            if (value.typeCircle) {
              return (<circle
                mask="url(#canvas)"
                key={value.id}
                cx={value.pos.x}
                cy={value.pos.y}
                r={value.size}
                fill={value.color}
                stroke="none"
              />)
            } else {
              return (<rect
                mask="url(#canvas)"
                key={value.id}
                x={value.pos.x}
                y={value.pos.y}
                width={value.size}
                height={value.size}
                fill={value.color}
                stroke="none"
              />)
            }
          })}
          <rect
            mask="url(#frame)"
            x="0" y="0" width="100%" height="100%"
            fill="#0D0D0C"
            opacity="0.5"
            rx="5"
          />
          <rect
            x={frame.margin / 2} y={frame.margin / 2} width={canvasContext.width - frame.margin} height={canvasContext.height - frame.margin}
            fill="none"
            stroke="#0D0D0C" strokeWidth="2" strokeDasharray={frame.dashes}
            rx="5"
          />
        </svg>
      </div>
      <div className="inputs">
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "3rem"
        }}>
          <TextInput label="title" value={title} onValueChange={(v) => setTitle(v)} />
          <Toggle label="mode" value={darkMode} onValueChange={handleColorModeChange} />
        </div>
        <InputSection title="shapes">
          <SliderWrapper>
            {shapes.map((shape, i) => (
              <ShapeSection
                key={shape.id}
                size={shape.size} onSliderChange={(v) => handleValueChange(`shapes`, `size`, { index: i, value: v })}
                color={shape.color} onColorChange={(v) => handleValueChange(`shapes`, `color`, { index: i, value: v })}
                onReposition={(v) => handleValueChange(`shapes`, `pos`, { index: i, value: v })}
              />
            ))}
          </SliderWrapper>
        </InputSection>
        <InputSection title="lines">
          <SliderWrapper>
            <Slider min={5} max={15} value={lines.total} onValueChange={(v) => handleValueChange(`lines`, `total`, v)} label="number of lines" />
            <Slider min={0} max={360} value={lines.rotation} onValueChange={(v) => handleValueChange(`lines`, `rotation`, v)} label="rotation" />
          </SliderWrapper>
        </InputSection>
        <InputSection title="frame">
          <SliderWrapper>
            <Slider min={40} max={80} value={frame.margin} onValueChange={(v) => handleValueChange(`frame`, `margin`, v)} label="margin" />
            <Slider min={0} max={50} value={frame.dashes} onValueChange={(v) => handleValueChange(`frame`, `dashes`, v)} label="dash array" />
          </SliderWrapper>
        </InputSection>
      </div>
    </>
  )
}

export default App
