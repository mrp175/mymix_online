import "./App.css";
import "../Transport/Transport";
import Transport from "../Transport/Transport";
import Main from "../Main/Main";
import BottomSection from "../BottomSection/BottomSection";

function App() {
  return (
    <div className="App">
      <Transport />
      <Main />
      <BottomSection />
    </div>
  );
}

export default App;
