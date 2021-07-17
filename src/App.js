import "./styles/globals.css";
import { ColorsProvider } from "./components/ColorsContext";
import { SquaresProvider } from "./components/SquaresContext";
import Square from "./components/Square";

function App() {
  return (
    <>
      <ColorsProvider>
        <SquaresProvider>
          <div className="app">
            <header className="app-header">
              <img src="hst-logo.svg" width="30" className="app-logo" alt="PatchNPlay" />
            </header>
            <div id="main">
              <div className="container">
                <Square />
              </div>
            </div>

            <footer></footer>
          </div>
        </SquaresProvider>
      </ColorsProvider>
    </>
  );
}

export default App;
