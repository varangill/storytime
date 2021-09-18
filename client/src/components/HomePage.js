import React, {  useState } from 'react'
import { Link, useHistory } from 'react-router-dom';

function HomePage() {
  const history = useHistory();


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
    <div>
        <h2>a cozy home</h2>
        <button onClick={createPublicRoom}>Create Public Room</button>
    </div>
  );
}
  
export default HomePage;