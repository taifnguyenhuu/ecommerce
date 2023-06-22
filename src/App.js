import {} from "antd";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Content from "./components/content/Content";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import LoginEc from "./components/login/LoginEc";
function App() {
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Header />
          <Content />
          <Footer />
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
