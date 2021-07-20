import "./styles/globals.css";
import { ColorsProvider } from "./components/ColorsContext";
import { SquaresProvider } from "./components/SquaresContext";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import Squares from "./components/Squares";

function App() {
  return (
    <>
      <ColorsProvider>
        <SquaresProvider>
          <div className="app">
            <Header>
              <Navigation />
            </Header>
            <div id="main">
              <Squares />
            </div>

            <footer></footer>
          </div>
        </SquaresProvider>
      </ColorsProvider>
    </>
  );
}

export default App;
