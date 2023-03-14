import React from "react";

//Imports for mdbreact
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

import "./App.css";
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/login/Login";
import Todo from "./components/todo/Todo";
import PrivateRoute from "./PrivateRoute";
import Upload from "./components/upload/Upload";

const App = () => (
  <HashRouter>
    <Routes>
      <Route path='/' element={<Login />} />
      <Route
        path='/todo'
        element={
          <PrivateRoute>
            <Todo />
          </PrivateRoute>
        }
      />
      <Route
        path='/upload'
        element={
          <PrivateRoute>
            <Upload />
          </PrivateRoute>
        }
      />
      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
  </HashRouter>
);

export default App;
