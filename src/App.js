import "./styles/globals.css";
import Square from "./components/Square";

function App() {
  return (
    <>
      <div className="app">
        <header className="app-header">
          <img src="hst-logo.svg" width="30" className="app-logo" alt="PatchNPlay" />
        </header>
        <div id="main">
          <div class="container">
            <Square />
          </div>
        </div>

        <footer></footer>
      </div>

    </>
  );
}

export default App;
