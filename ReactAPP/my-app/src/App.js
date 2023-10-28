import "./App.css";
import { Route, Routes } from "react-router-dom";
import AiContentFile from "./Components/AiContent/AiContentFile/AiContentFile";
import AiContent from "./Components/AiContent/AiContent";
import Days from "./Components/Days/Days";
import CodeConvert from "./Components/CodeConvert";
import UserInput from "./Components/AiContent/AiText/UserInput";
import Emotions from "./Components/AiContent/Emotional";

function App() {
  return (
    <div className="App">
      {/* <CodeConvert /> */}

      <div>
        {/* <AiText /> */}
        <Routes>
          <Route path="/" element={<Days />} />
          <Route path="/code-convert" element={<CodeConvert />} />
          <Route path="/ai-content-main" element={<AiContent />} />
          <Route path="/ai-content" element={<AiContentFile />} />
          <Route path="/ai-text" element={<UserInput />} />
          <Route path="/emotional" element={<Emotions />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
