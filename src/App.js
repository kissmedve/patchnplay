import "./styles/globals.css";
import { ColorsProvider } from "./components/ColorsContext";
import { BigBlocksProvider } from "./components/BigBlocksContext";
import { SquaresProvider } from "./components/SquaresContext";
import { StylersProvider } from "./components/StylersContext";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import Squares from "./components/Squares";

function App() {
  return (
    <>
      <ColorsProvider>
        <BigBlocksProvider>
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
        </BigBlocksProvider>
      </ColorsProvider>
    </>
  );
}

export default App;
