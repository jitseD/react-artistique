import './App.css'
import InputSection from "./components/InputSection";
import Slider from "./components/Slider";
import SliderWrapper from "./components/SliderWrapper";
import ShapeSection from "./components/ShapeSection";
import TextInput from "./components/TextInput";
import Toggle from "./components/Toggle";
function App() {

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
          <TextInput label="title" />
          <Toggle label="mode" />
        </div>
        <InputSection title="shapes">
          <SliderWrapper>
            <ShapeSection />
            <ShapeSection />
            <ShapeSection />
            <ShapeSection />
            <ShapeSection />
            <ShapeSection />
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
