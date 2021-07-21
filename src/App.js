import "./styles/globals.css";
import { ColorsProvider } from "./components/ColorsContext";
import { SquaresProvider } from "./components/SquaresContext";
import { StylersProvider } from "./components/StylersContext";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import Squares from "./components/Squares";

function App() {
  return (
    <>
      <ColorsProvider>
        <SquaresProvider>
          <StylersProvider>
            <div className="app">
              <Header>
                <Navigation />
              </Header>
              <div id="main">
                <Squares />
              </div>

              <footer></footer>
            </div>
          </StylersProvider>
        </SquaresProvider>
      </ColorsProvider>
    </>
  );
}

export default App;
