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
                        database.ref(`usernames/${this.state.username}`).set(true);
                        database.ref(`ids/${firebase.auth().currentUser.uid}`).set(this.state.username);
                    }
                }).catch((e) => {
                    this.setState(() => ({ error: 'Error fetching data' }));
                });
            }
        }).catch((e) => {
            this.setState(() => ({ error: 'Error fetching data' }));
        });
    }


    render() {
      return (
        <div>
            {!this.state.redirectable && 
                <div>
                    {!this.state.isLoggedIn && 
                        <div>
                            <h2>Login using Google</h2>
                            <button onClick={this.initLogin}>Login</button>
                        </div>
                    }
                    {this.state.isLoggedIn && 
                        <div>
                            <h2>Enter unique username</h2>
                            <form onSubmit={this.submitUsername}>
                                <input 
                                    type="text"
                                    placeholder="Enter unique username"
                                    value={this.state.username}
                                    onChange={this.changeUsername}
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
