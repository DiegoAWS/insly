import { GlobalContextProvider } from "contexts/useGlobalContext";
import MainPage from "pages/MainPage";
import "./App.scss";

function App() {
  return (
    <GlobalContextProvider>
      <div className="App">
        <MainPage />
      </div>
    </GlobalContextProvider>
  );
}

export default App;
