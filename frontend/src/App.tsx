import { useEffect, useContext, createContext } from "react";
import { observer } from "mobx-react-lite";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./components/MainLayout/MainLayout";
import Navbar from "./components/Navbar/Navbar";

import Store from "./store/store";

import Home from "./pages/index";
import Register from "./pages/register/register";
import Login from "./pages/login/login";
import News from "./pages/news/news";
import Competitions from "./pages/competitons/competitions";
import Profile from "./pages/profile/profile";

export const store = new Store();
export const Context = createContext({ store });

const AppContent = observer(() => {
  const { store } = useContext(Context);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth();
    }
  }, [store]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/news" element={<News />} />
          <Route path="/competitions" element={<Competitions />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
});

export default function App() {
  return (
    <BrowserRouter>
      <Context.Provider value={{ store }}>
        <AppContent />
      </Context.Provider>
    </BrowserRouter>
  );
}
