import { useState } from "react";
import './App.css'
import InputSection from "./components/InputSection";
import Slider from "./components/Slider";
import SliderWrapper from "./components/SliderWrapper";
import ShapeSection from "./components/ShapeSection";
import TextInput from "./components/TextInput";
import Toggle from "./components/Toggle";


const App = () => {
  const canvas = {
    width: 100,
    height: 100
  }
  const [darkMode, setDarkMode] = useState(false);
  const [title, setTitle] = useState("");
  const [shapes, setShapes] = useState([
    { id: "shape1", size: 0, color: "#000000", pos: { x: 0, y: 0 } },
    { id: "shape2", size: 0, color: "#000000", pos: { x: 0, y: 0 } },
    { id: "shape3", size: 0, color: "#000000", pos: { x: 0, y: 0 } },
    { id: "shape4", size: 0, color: "#000000", pos: { x: 0, y: 0 } },
    { id: "shape5", size: 0, color: "#000000", pos: { x: 0, y: 0 } },
    { id: "shape6", size: 0, color: "#000000", pos: { x: 0, y: 0 } },
  ]);
  const [lines, setLines] = useState({ total: 10, rotation: 0 });
  const [frame, setFrame] = useState({ margin: 40, dashes: 10 });

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

  const handleSizeChange = (i, v) => {
    const newShapes = [...shapes];
    newShapes[i].size = parseInt(v);
    setShapes(newShapes)
  };
  const handleColorChange = (i, v) => {
    const newShapes = [...shapes];
    newShapes[i].color = v;
    setShapes(newShapes)
  };
  const handlePositionChange = (i) => {
    const newShapes = [...shapes];
    newShapes[i].pos.x = Math.random() * canvas.width;
    newShapes[i].pos.y = Math.random() * canvas.height;
    setShapes(newShapes)
  };

  const handleTotalLinesChange = (v) => {
    const newLines = { ...lines };
    newLines.total = parseInt(v);
    setLines(newLines)
  }
  const handleRotationLinesChange = (v) => {
    const newLines = { ...lines };
    newLines.rotation = parseInt(v);
    setLines(newLines)
  }

  const handleFrameMarginChange = (v) => {
    const newFrame = { ...frame };
    newFrame.margin = parseInt(v);
    setFrame(newFrame)
  }
  const handleFrameDashesChange = (v) => {
    const newFrame = { ...frame };
    newFrame.dashes = parseInt(v);
    setFrame(newFrame)
  }

  return (
    <>
      <h1 className="title">React Artistique</h1>
      <div className="frame"></div>
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
                size={shape.size} onSliderChange={(v) => handleSizeChange(i, v)}
                color={shape.color} onColorChange={(v) => handleColorChange(i, v)}
                onReposition={() => handlePositionChange(i)}
              />
            ))}
          </SliderWrapper>
        </InputSection>
        <InputSection title="lines">
          <SliderWrapper>
            <Slider min={5} max={15} value={lines.total} onValueChange={(v) => handleTotalLinesChange(v)} label="number of lines" />
            <Slider min={0} max={360} value={lines.rotation} onValueChange={(v) => handleRotationLinesChange(v)} label="rotation" />
          </SliderWrapper>
        </InputSection>
        <InputSection title="frame">
          <SliderWrapper>
            <Slider min={20} max={50} value={frame.margin} onValueChange={(v) => handleFrameMarginChange(v)} label="margin" />
            <Slider min={0} max={50} value={frame.dashes} onValueChange={(v) => handleFrameDashesChange(v)} label="dash array" />
          </SliderWrapper>
        </InputSection>
      </div>
    </>
  )
}

export default App
