import logo from './logo.svg';
import './App.css';
import {Helmet} from "react-helmet";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import router from './router';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap/Button';

function App() {
  return (
    <div className='App'>
      <Helmet>
        <title>
          Home
        </title>
      </Helmet>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
