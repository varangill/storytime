import React, {  useState } from 'react'
import { Link, useHistory } from 'react-router-dom';

function HomePage() {
  const history = useHistory();

  
  const title = {
    fontSize: 50,
    color: "#4a54f1",
    textAlign: "center",
    paddingTop: "100px",
  }


  const subtitle = {
    fontSize: 20,
    color: "#4a54f1",
    textAlign: "center",
    paddingTop: "0px",
  }

  const buttonStyle1 = {
    fontSize: 20,
    color: "#4a54f1",
    textAlign: "center",
    paddingTop: "0px",
    paddingRight: "50%",
    paddingLeft: "50%"

  }

  const filler = {
    fontSize: 20,
    color: "#4a54f1",
    textAlign: "center",
    paddingTop: "200px",
  }

  const createPublicRoom = () => {
    var code = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++) {
      code += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    //later on check if the roomcode already exists in the database
    history.push(`/room:${code}`);
  }

  return (

    <div style={{color: "#CCEEFF", backgroundColor: "#CCEEFF"}}>
        <h2 style={title}>Story Time</h2>
        <h3 style={subtitle}>An interactive story teller</h3>
        <h4 style={filler}></h4>
          
        <button onClick={createPublicRoom} style={buttonStyle1}>Create Public Room</button>
    </div>
  );
}
  
export default HomePage;