import { useState } from "react";
import './App.css'
import InputSection from "./components/InputSection";
import Slider from "./components/Slider";
import SliderWrapper from "./components/SliderWrapper";
import ShapeSection from "./components/ShapeSection";
import TextInput from "./components/TextInput";
import Toggle from "./components/Toggle";


const App = () => {
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

  const handleValueChange = (type, property, value) => {
    switch (type) {
      case `shapes`:
        setShapes(shapes.map((shape, i) => (i === value.index ? { ...shape, [property]: value.value } : shape)));
        console.log(shapes[0].pos);
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
            <Slider min={20} max={50} value={frame.margin} onValueChange={(v) => handleValueChange(`frame`, `margin`, v)} label="margin" />
            <Slider min={0} max={50} value={frame.dashes} onValueChange={(v) => handleValueChange(`frame`, `dashes`, v)} label="dash array" />
          </SliderWrapper>
        </InputSection>
      </div>
    </>
  )
}

export default App
