import styles from "./App.module.css";
import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Landing from "./components/Landing/Landing";
import Home from "./components/Home/Home";
import Detail from "./components/Detail/Detail";
import Form from "./components/Form/Form";
import Nav from "./components/Nav/Nav";



function App() {

  const { pathname } = useLocation();

  return (
    
    <div className= {styles.divApp}>
      
      {pathname !== "/" && <Nav  />} 
      
      <Routes>

        <Route path="/" element={<Landing/> }></Route>
        
        <Route path="/pokemons" element={<Home/> }></Route>
        
        <Route path="/pokemons/detail/:id" element={<Detail/> } ></Route> 

        <Route path="/pokemons/create" element={<Form/> }></Route>

      </Routes>

    </div>

  ); 
}

export default App;
