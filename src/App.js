import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SingleMarkerPage from "./pages/SingleMarkerPage";
import MultiMarkerPage from "./pages/MultiMarkerPage";
import SearchTypePage from "./pages/SearchTypePage";
import WorkListPage from "./pages/WorkListPage";
import SeasonListPage from "./pages/SeasonListPage";
import SeasonDetailPage from "./pages/SeasonDetailPage";
import Dashboard from "./pages/Dashboard";
import RegionListPage from "./pages/RegionListPage";
import CityListPage from "./pages/CityListPage";
import DistrictListPage from "./pages/DistrictListPage";
import DistrictDetailPage from "./pages/DistrictDetailPage";
import NotFoundPage from "./pages/NotFoundPage";
import MainPage from "./pages/MainPage";
import Layout from "./components/Layout";
import MyPage from "./pages/MyPage";
import ScrollToTop from "./components/ScrollToTop";
import EventPage from "./pages/EventPage";
import { AuthProvider } from "./context/AuthContext";

import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/single-marker/:id" element={<SingleMarkerPage />} />
            <Route path="/multi-marker/" element={<MultiMarkerPage />} />
            <Route path="/multi-marker/:id" element={<MultiMarkerPage />} />
            <Route path="/search" element={<SearchTypePage />} />
            <Route path="/" element={<MainPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/work" element={<WorkListPage />} />
            <Route path="/work/:workKey" element={<SeasonListPage />} />
            <Route
              path="/work/:workKey/:seasonKey/"
              element={<SeasonDetailPage />}
            />
            <Route path="/regions" element={<RegionListPage />} />
            <Route path="/regions/:regionKey" element={<CityListPage />} />
            <Route
              path="/regions/:regionKey/:cityKey"
              element={<DistrictListPage />}
            />
            <Route
              path="/regions/:regionKey/:cityKey/:districtKey"
              element={<DistrictDetailPage />}
            />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/event" element={<EventPage />} />

          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
