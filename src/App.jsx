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
            <Slider min={0} max={10} label="number of lines" />
            <Slider min={0} max={10} label="rotation" />
          </SliderWrapper>
        </InputSection>
        <InputSection title="frame">
          <SliderWrapper>
            <Slider min={0} max={10} label="margin" />
            <Slider min={0} max={10} label="dash array" />
          </SliderWrapper>
        </InputSection>
      </div>
    </>
  )
}

export default App
