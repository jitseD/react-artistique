import { useState, useContext } from "react";
import { canvas } from "./context/CanvasContext";
import InputSection from "./components/InputSection";
import Slider from "./components/Slider";
import SliderWrapper from "./components/SliderWrapper";
import Shape from "./components/Shape";
import ShapeSection from "./components/ShapeSection";
import TextInput from "./components/TextInput";
import Toggle from "./components/Toggle";
import './App.css'

const generateRandomShape = (id, canvasContext) => {
  const randomSize = Math.floor(Math.random() * 150) + 50;
  const randomColor = `#${Math.floor(Math.random() * 0x1000000).toString(16).padStart(6, '0')}`;
  const randomX = Math.floor(Math.random() * canvasContext.width);
  const randomY = Math.floor(Math.random() * canvasContext.height);
  const randomTypeCircle = Math.random() < 0.5;

  return { id, size: randomSize, color: randomColor, pos: { x: randomX, y: randomY }, typeCircle: randomTypeCircle };
}


const App = () => {
  const canvasContext = useContext(canvas);
  const [darkMode, setDarkMode] = useState(false);
  const [colorMode, setColorMode] = useState({ foreground: "#0D0D0C", background: "#F2F2E6" });
  const [title, setTitle] = useState("");
  const [lines, setLines] = useState({ total: 10, rotation: 0 });                 // random total / rotation
  const [frame, setFrame] = useState({ margin: 40, dashes: 10 });                 // random margin / dashes
  const [shapes, setShapes] = useState([
    generateRandomShape("shape1", canvasContext),
    generateRandomShape("shape2", canvasContext),
    generateRandomShape("shape3", canvasContext),
    generateRandomShape("shape4", canvasContext),
    generateRandomShape("shape5", canvasContext),
    generateRandomShape("shape6", canvasContext),
  ]);
  const handleColorModeChange = () => {
    const newDarkMode = !darkMode;
    if (newDarkMode) {
      setColorMode({ foreground: "#F2F2E6", background: "#0D0D0C" })
    } else {
      setColorMode({ foreground: "#0D0D0C", background: "#F2F2E6" })
    }
    setDarkMode(newDarkMode);
  }

  document.documentElement.style.setProperty('--c-fg', colorMode.foreground);
  document.documentElement.style.setProperty('--c-bg', colorMode.background);


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
            <mask id="canvas">
              <rect
                x={frame.margin} y={frame.margin} width={canvasContext.width - frame.margin * 2} height={canvasContext.height - frame.margin * 2}
                fill="#FFFFFF"
                rx="5"
              />
            </mask>
          </defs>
          <rect // background
            x="0" y="0" width="100%" height="100%"
            fill={colorMode.background}
            rx="5"
          />

          {shapes.map((value) => (
            <Shape key={value.id} value={value} colorMode={colorMode} />
          ))}


          <rect // frame
            className="shadow--frame"
            x={0 + frame.margin / 2} y={0 + frame.margin / 2} width={canvasContext.width - frame.margin} height={canvasContext.height - frame.margin}
            fill="none"
            stroke={colorMode.background} strokeWidth={frame.margin}
            rx="5"
          />
          <rect // dash
            x={frame.margin / 2} y={frame.margin / 2} width={canvasContext.width - frame.margin} height={canvasContext.height - frame.margin}
            fill="none"
            stroke={colorMode.foreground} strokeWidth="2" strokeDasharray={frame.dashes}
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
