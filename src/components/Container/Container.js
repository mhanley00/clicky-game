import React from "react";
import "./Container.css"; 
import pokeforest from './pokeforest.jpg'


const Container = props => 
<div>
 <main className="container">{props.children}
{/* <img src={pokeforest} alt={"logo"}/> 
had major trouble getting this to display*/}
  </main>
 </div>


export default Container;