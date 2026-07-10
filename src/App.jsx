import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./pages/routes/AppRoutes";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
