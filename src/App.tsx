import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthForm from "@/components/forms/AuthForm.tsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<AuthForm formType={"register"} />} />
          <Route
            path="/signin"
            element={<AuthForm formType={"login"} />}
          ></Route>
          {/*<Route path="/asd">*/}
          {/*    <Route path=":id" element={<asdasd />} />*/}
          {/*</Route>*/}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
