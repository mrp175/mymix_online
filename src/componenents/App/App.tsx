import "./App.scss";
import "../Transport/Transport";
import Transport from "../Transport/Transport";
import Main from "../Main/Main";
import BottomSection from "../BottomSection/BottomSection";
import BarNumberData from "../Utilties/BarNumberData";
import { FileBrowser } from "../FileBrowser/FileBrowser";
import SetSequencerLength from "../Utilties/SetSequencerLength";

function App() {
  return (
    <div className="App">
      <div className="App__wrapper">
        <Transport />
        <Main />
        <BottomSection />
      </div>
      <FileBrowser />
      <div className="utilities">
        <BarNumberData />
        <SetSequencerLength />
      </div>
    </div>
  );
}

export default App;
