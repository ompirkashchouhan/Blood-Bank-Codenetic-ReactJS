import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap/Button";
import Router from "./router";
import MyProvider from "./context/myprovider";

function App() {
  return (
    <MyProvider>
      <Router />
    </MyProvider>
  );
}

export default App;