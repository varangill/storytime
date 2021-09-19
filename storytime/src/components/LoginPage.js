import database, {firebase, googleAuthProvider} from '../firebase/firebase'
import React from 'react'
import { Link } from 'react-router-dom';

export default class LoginPage extends React.Component {
    constructor(props) {
        super(props)
    }

    state = {
        isLoggedIn: false,
        username: '',
        error: '',
        redirectable: false
    }

    initLogin = () => {
        console.log("logging in?");
        firebase.auth().signInWithPopup(googleAuthProvider);
        firebase.auth().onAuthStateChanged((user) => {
            if (user) { //user logged in
                console.log("signed in!");
                database.ref(`ids/${firebase.auth().currentUser.uid}`).once('value').then((snapshot) => {
                    if (snapshot.exists()) {
                        this.setState(() => ({ redirectable: true }));
                    } else {
                        this.setState(() => ({ isLoggedIn: true }));
                    }
                }).catch((e) => {
                    this.setState(() => ({ error: 'Error fetching data' }));
                });
            } else{
                //user logged out
                this.setState(() => ({ isLoggedIn: false }));
            }
        });
    };

    changeUsername = (e) => {
        this.setState(() => ({ username: e.target.value }))
    }

    submitUsername = (e) => {
        e.preventDefault();

        database.ref(`ids/${firebase.auth().currentUser.uid}`).once('value').then((snapshot) => {
            if (snapshot.exists()) {
                this.setState(() => ({ error: 'Account already has username, please try logging in again' }));
            } else {
                database.ref(`usernames/${this.state.username}`).once('value').then((snapshot) => {
                    if (snapshot.exists()) {
                        this.setState(() => ({ error: 'Username already exists' }));
                    } else {
                        database.ref(`usernames/${this.state.username}`).set(firebase.auth().currentUser.uid);
                        database.ref(`ids/${firebase.auth().currentUser.uid}`).set(this.state.username);
                        this.setState(() => ({ redirectable: true }));
                    }
                }).catch((e) => {
                    this.setState(() => ({ error: 'Error fetching data' }));
                });
            }
        }).catch((e) => {
            this.setState(() => ({ error: 'Error fetching data' }));
        });
    }


    render() 
        {const titles = {
            fontSize: 50,
            color: "#4a54f1",
            textAlign: "center",
            paddingTop: "100px",
            fontFamily: "Ubuntu",
          }
        
        
          const subtitles = {
            fontSize: 20,
            color: "#4a54f1",
            textAlign: "center",
            paddingTop: "0px",
            fontFamily: "Ubuntu",
          }
        
          const buttonStyle2 = {
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
        
          const inputStyle2 = {
            fontSize: 20,
            color: "black",
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
        
          const imageStyle2 = {
            fontSize: 20,
            color: "white",
            paddingTop: "10px",
            paddingBottom: "10px",
            paddingRight: "10px",
            paddingLeft: "10px",
            marginLeft: "auto",
            marginRight: "auto",
          }
        
          const fillers = {
            fontSize: 20,
            color: "#FCF7F8",
            textAlign: "center",
            paddingTop: "10px",
        
          }
      return (
        <div>
            {!this.state.redirectable && 
                <div>
                    {!this.state.isLoggedIn && 
                        <div>
                            <h2 style={titles}>Login using Google</h2>
                            <div style={{display: 'flex'}}>
                            <button onClick={this.initLogin} style={buttonStyle2}>Login</button>
                            </div>
                        </div>
                    }
                    {this.state.isLoggedIn && 
                        <div>
                            <h2 style={subtitles}>Enter unique username</h2>
                            <form onSubmit={this.submitUsername}>
                                <input 
                                    type="text"
                                    placeholder="Enter unique username"
                                    value={this.state.username}
                                    onChange={this.changeUsername}
                                    style={inputStyle2 }
                                />
                                <button>Submit Username</button>
                            </form>
                        </div>
                    }
                </div>
            }

            {this.state.redirectable && 
                <div>
                    <Link to="/home">
                        <h1>Go to Home</h1>
                    </Link>
                </div>
            }
        </div>
      )
    }
}
