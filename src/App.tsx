import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { SearchPage } from "./pages/SearchPage";
import { FavoritesPage } from "./pages/FavoritesPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <>
      <BrowserRouter>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
          <Navigation />
          <div className="pt-20">
            <Routes>
              <Route path="/" element={<SearchPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}

export default App;
