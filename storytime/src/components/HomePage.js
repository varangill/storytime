import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import database, {firebase} from '../firebase/firebase.js'
import logo from './assets/logo.png'
import tree from './assets/tree.png'
import name from './assets/name.png'
import background from './assets/background.jpeg'

function HomePage() {
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();


  const title = {
    fontSize: 50,
    color: "#4a54f1",
    textAlign: "center",
    paddingTop: "100px",
    fontFamily: "Ubuntu",
  }


  const subtitle = {
    fontSize: 20,
    color: "#4a54f1",
    textAlign: "center",
    paddingTop: "0px",
    fontFamily: "Ubuntu",
  }

  const buttonStyle1 = {
    fontSize: 20,
    color: "white",
    paddingTop: "10px",
    paddingBottom: "10px",
    paddingRight: "10px",
    paddingLeft: "10px",
    marginLeft: "auto",
    marginRight: "auto", backgroundColor: "#3E86C2",
    borderRadius: 5,
    borderColor: "#3E86C2",
    width: '270px'
  }

  const inputStyle1 = {
    fontSize: 20,
    color: "white",
    paddingTop: "10px",
    paddingBottom: "10px",
    paddingRight: "10px",
    paddingLeft: "10px",
    marginLeft: "auto",
    marginRight: "auto", backgroundColor: "white",
    borderRadius: 5,
    borderColor: "#3E86C2",
    fontType: "Ubuntu",
  }

  const imageStyle1 = {
    fontSize: 20,
    color: "white",
    paddingTop: "10px",
    paddingBottom: "10px",
    paddingRight: "10px",
    paddingLeft: "10px",
    marginLeft: "auto",
    marginRight: "auto",
  }

  const filler = {
    fontSize: 20,
    color: "#FCF7F8",
    textAlign: "center",
    paddingTop: "0px",

  }

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
    // Background colours
    <div style={{color: "#CCEEFF", backgroundImage: `url(${background})`, height: "100%", width: "100%", backgroundRepeat: "repeat", resizeMode: "stretch"}}>
        <img src={tree} alt="tree" width="0" height="0" style={imageStyle1}/>;
        <div style={{display: 'flex'}}>
          <img src={name} alt="name" width="750" height="250" style={imageStyle1}/>;
        </div>
        
        <div style={{display: 'flex'}}>
          <img src={logo} alt="logo" width="300" height="200" style={imageStyle1}/>;
        </div>

        <form onSubmit={onSubmitCode}>
        <div style={{display: 'flex', alignSelf: 'center', textAlign: 'center'}}>
            <input 
              type="text"
              placeholder="Enter room code"
              value={search}
              onChange={onChangeSearch}
              style={buttonStyle1}
            />
     
            </div>
            <div style={{display: 'flex'}}>
              
            <button style={buttonStyle1}>Search for Room</button>
            </div>
            
            
          </form>

          <h4 style={filler}></h4>
        <div style={{display: 'flex'}}>
          <button onClick={createPublicRoom} style={buttonStyle1}>Create Public Room</button>
        </div>

        <h4 style={filler}></h4>
]
    </div>
  );
}

export default HomePage;