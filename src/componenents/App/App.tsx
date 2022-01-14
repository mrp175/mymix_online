import "./App.css";
import "../Transport/Transport";
import Transport from "../Transport/Transport";
import Main from "../Main/Main";
import BottomSection from "../BottomSection/BottomSection";
import BarNumberData from "../Utilties/BarNumberData/BarNumberData";

function App() {
  return (
    <div className="App">
      <Transport />
      <Main />
      <BottomSection />
      <div className="utilities">
        <BarNumberData />
      </div>
    </div>
  );
}

export default App;
