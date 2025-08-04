import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GamePage from "./pages/GamePage";
import ReplayPage from "./pages/ReplayPage";
import ReplayDetailPage from "./pages/ReplayDetailPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GamePage />} />
        <Route path="/replay" element={<ReplayPage />} />
        <Route path="/replay/:id" element={<ReplayDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;