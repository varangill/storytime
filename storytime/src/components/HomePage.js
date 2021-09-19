import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import database, {firebase} from '../firebase/firebase.js'

function HomePage() {
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();


  const createPublicRoom = () => {
    var code = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    for (var i = 0; i < 5; i++) {
      code += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    //later on check if the roomcode already exists in the database

    database.ref(`ids/${firebase.auth().currentUser.uid}`).once('value').then((snapshot) => {
      database.ref(`rooms/${code}/host`).set(firebase.auth().currentUser.uid);
      database.ref(`rooms/${code}/numOfPlayers`).set(1);
      database.ref(`rooms/${code}/players/0`).set(snapshot.val());
      database.ref(`rooms/${code}/playerTurn`).set(0);
      database.ref(`rooms/${code}/story`).set('');
      database.ref(`rooms/${code}/prompt`).set('');
      history.push(`/room:${code}`);
    }).catch((e) => {
        
    });
  }

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  }

  const onSubmitCode = (e) => {
    e.preventDefault();
    database.ref(`rooms/${search}/numOfPlayers`).once('value').then((snapshot) => {
      if (snapshot.exists()) {
        const num = snapshot.val();
        database.ref(`ids/${firebase.auth().currentUser.uid}`).once('value').then((snapshot) => {
          database.ref(`rooms/${search}/numOfPlayers`).set(num + 1);
          database.ref(`rooms/${search}/players/${num}`).set(snapshot.val());
          history.push(`/room:${search}`);
        }).catch((e) => {
            
        });
      } else {

      }
    }).catch((e) => {
        
    });

  };

  return (
    <div>
        <h2>a cozy home</h2>
        <button onClick={createPublicRoom}>Create Public Room</button>
        <form onSubmit={onSubmitCode}>
            <input 
              type="text"
              placeholder="Enter room code"
              value={search}
              onChange={onChangeSearch}
            />
            <button>Search for Room</button>
          </form>
    </div>
  );
}
  
export default HomePage;