import React, { useState } from 'react';
import HeaderNav from './Components/HeaderNav';
import { Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Contact from './Components/Contact';
import Comments from './Components/Comments';
import About from './Components/About';
import Tasks from './Components/Tasks';
import UserProfile from './Components/UserProfile';
import Footer from './Components/Footer';

function App() {
  const [theme, setTheme] = useState("dark");

  const handleTheme = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  return (
    <div data-theme={theme}>
      <HeaderNav handleTheme={handleTheme}></HeaderNav>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/home' element={<Home></Home>}></Route>
        <Route path='/contact' element={<Contact></Contact>}></Route>
        <Route path='/comments' element={<Comments></Comments>}></Route>
        <Route path='/about' element={<About></About>}></Route>
        <Route path='/todos' element={<Tasks></Tasks>}></Route>
        <Route path='/users/:userId' element={<UserProfile></UserProfile>}></Route>
        <Route path='*' element={<div>Error Page</div>}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
