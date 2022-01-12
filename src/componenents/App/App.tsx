import "./App.css";
import "../Transport/Transport";
import Transport from "../Transport/Transport";
import Main from "../Main/Main";
import BottomSection from "../BottomSection/BottomSection";
import BarNumberData from "../BarNumberData/BarNumberData";

function App() {
  return (
    <div className="App">
      <Transport />
      <Main />
      <BottomSection />
      <div>
        <BarNumberData />
      </div>
    </div>
  );
}

export default App;
