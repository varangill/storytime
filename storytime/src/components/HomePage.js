import React from 'react'
import { useHistory } from 'react-router-dom';
import database, {firebase, googleAuthProvider} from '../firebase/firebase.js'

function HomePage() {
  const history = useHistory();


  const createPublicRoom = () => {
    var code = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    for (var i = 0; i < 5; i++) {
      code += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    //later on check if the roomcode already exists in the database


    database.ref(`ids/${firebase.auth().currentUser.uid}`).once('value').then((snapshot) => {
      const username = snapshot.val();
    }).catch((e) => {
        
    });

    database.ref(`rooms/${code}/host`).set(firebase.auth().currentUser.uid);
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