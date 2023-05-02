import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Protected from "./components/Protected";
import NotFound from "./components/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home />} exact path="/" />
        <Route element={<Register />} exact path="/auth/register" />
        <Route element={<Login />} exact path="/auth/login" />
        <Route element={<Protected />} exact path="/protected" />
        <Route element={<NotFound />} path="*" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
