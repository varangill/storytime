import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import StoryPage from './StoryPage';
import logo from './assets/logo.png'
import tree from './assets/tree.png'
import name from './assets/name.png'
import background from './assets/background.jpeg'
import database, {firebase} from '../firebase/firebase.js'

export default class RoomPage extends React.Component {


    constructor(props) {
        super(props);
        
        const roomCode = props.match.params.code.substring(1);
        database.ref(`rooms/${roomCode}`).once('value').then((snapshot) => {
            if (snapshot.val().host == firebase.auth().currentUser.uid) {
                this.setState(() => ({ isHost: true }));
            } else {
                this.setState(() => ({ isHost: false }));
            }
            const numOfPlayers = snapshot.val().numOfPlayers;
            this.setState(() => ({ playerNum: numOfPlayers-1 }));
            let newPlayers = []
            for (let i = 1; i <= numOfPlayers; i++) {
                newPlayers.push(snapshot.val().players[i]);
            }
            this.setState(() => ({ players: newPlayers }));
            if (numOfPlayers == 1) { //if the room is being made and not joined
                database.ref(`rooms/${roomCode}/lobby`).set(true);
                database.ref(`rooms/${roomCode}/playerTurn`).set(0);
            }
          }).catch((e) => {
              
        });

        database.ref(`rooms/${roomCode}`).on('value', (snapshot) => {
            const numOfPlayers = snapshot.val().numOfPlayers;
            let newPlayers = []
            for (let i = 1; i <= numOfPlayers; i++) {
                newPlayers.push(snapshot.val().players[i]);
            }
            this.setState(() => ({ players: newPlayers }));
            this.setState(() => ({ turns: snapshot.val().turns }));
            if (snapshot.val().displayStory) {
                this.setState(() => ({ displayStory: true }));
            }
        });
        
        this.state = {
            players: 5,
            seconds: 10,
            word: 5,
            show: true
        };
    }
    IncrementItem = () => {
        if (this.state.seconds < 60) {
            this.setState({ seconds: this.state.seconds + 5 });
        }
    }
    DecreaseItem = () => {
        if (this.state.seconds > 6) {
            this.setState({ seconds: this.state.seconds - 5 });
        }
    }

    IncrementItemSent = () => {
        if (this.state.players < 10) {
            this.setState({ players: this.state.players + 1 });
        }
    }
    DecreaseItemSent = () => {
        if (this.state.players > 1) {
            this.setState({ players: this.state.players - 1 });
        }
    }

    IncrementItemWord = () => {
        if (this.state.word < 12) {
            this.setState({ word: this.state.word + 1 });
        }
    }
    DecreaseItemWord = () => {
        if (this.state.word > 1) {
            this.setState({ word: this.state.word - 1 });
        }
    }

    ToggleClick = () => {
        this.setState({ show: !this.state.show });
    }
    state = {
        displayStory: false,
        isHost: false,
        turns: 1,
        players: [],
        lobby: true,
        playerNum: 0
    }

    startStory = () => {
        database.ref(`rooms/${this.props.match.params.code.substring(1)}/turns`).set(this.state.turns);
        database.ref(`rooms/${this.props.match.params.code.substring(1)}/displayStory`).set(true);
        database.ref(`rooms/${this.props.match.params.code.substring(1)}/lobby`).set(false);
        this.setState(() => ({ displayStory: true }));
    }

    onLengthChange = (e) => {
        const numOfTurns = e.target.value
        this.setState(() => ({ turns: numOfTurns }));
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
        <div style={{color: "#CCEEFF", backgroundImage: `url(${background})`, height: "100%", width: "100%", backgroundRepeat: "repeat", resizeMode: "stretch"}}>
            {!this.state.displayStory && 
                <div>
                    <h2 style={titles}>Create a Room</h2>
                    {this.state.isHost && 
                    <div style={{display: 'flex'}}>
                        <input type="text" pattern="[0-9]" placeholder="Number of turns" onChange={this.onLengthChange} style={inputStyle2} />
                   </div>
                    }
                    <div style={{display: 'flex'}}>
                    <button onClick={this.startStory} disabled={!this.state.isHost} style={buttonStyle2}>Start Story</button>
                    </div>
                </div>
            }
            {this.state.displayStory && 
                <StoryPage players={this.state.players} turns={this.state.turns} code={this.props.match.params.code.substring(1)} playerNum={this.state.playerNum} displayed={this.state.displayStory} />
            }
            <h3 style={subtitles}>Room Code: {this.props.match.params.code.substring(1)}</h3>
        </div>
      )


        const title = {
            fontSize: 50,
            color: "#4a54f1",
            textAlign: "center",
            paddingTop: "60px",
            fontFamily: "Ubuntu",
        }

        const title2 = {
            fontSize: 50,
            color: "#4a54f1",
            textAlign: "center",
            paddingTop: "10px",
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
            marginBottom: "0px",
            marginRight: "auto", backgroundColor: "#3E86C2",
            borderRadius: 5,
            borderColor: "#3E86C2",
            width: '270px'
        }

        const incButton = {
            color: "white",
            backgroundColor: "#3E86C2",
            borderColor: "#3E86C2",
            width: '100px', 
            fontSize: 30
        }

        const filler = {
            fontSize: 20,
            color: "#FCF7F8",
            textAlign: "center",
            paddingTop: "0px",
        
          }

        const inputStyle1 = {
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

        const imageStyle1 = {
            fontSize: 20,
            color: "white",
            marginLeft: "auto",
            marginRight: "auto",
        }



        return (


            <div className="container">



                {!this.state.displayStory &&



                    <div>
                        <div style={{ color: "#CCEEFF", backgroundImage: `url(${background})`, height: "100%", width: "100%", resizeMode: "stretch" }}>

                            <img src={tree} alt="tree" width="0" height="0" style={imageStyle1} />;
                           
                        <h1 style={title}>Room Editor</h1>
                        <h1 style={subtitle}>Construct a story, one phrase at a time!</h1>

                        <div style={{ display: 'flex', alignSelf: 'center', textAlign: 'center' }}>
                            <button style={buttonStyle1} onClick={this.startStory}>Start Story</button>
                        </div>

                        <h1 style={title2}>Room Settings</h1>

                        <h2 style={subtitle}> Seconds to Answer</h2>
                        <div style={{ display: 'flex', textAlign: 'center', alignSelf: 'center', justifyContent: 'center', gap: '30px' }}>
                            <button style={incButton} onClick={this.DecreaseItem}>-</button>
                            {this.state.show ? <h2 style={subtitle}>{this.state.seconds}</h2> : ''}
                            <button style={incButton} onClick={this.IncrementItem}>+</button>
                        </div>

                        <h2 style={subtitle}> Players </h2>
                        <div style={{ display: 'flex', textAlign: 'center', alignSelf: 'center', justifyContent: 'center', gap: '30px' }}>
                            <button style={incButton} onClick={this.DecreaseItemSent}>-</button>
                            {this.state.show ? <h2 style={subtitle}>{this.state.players}</h2> : ''}
                            <button style={incButton} onClick={this.IncrementItemSent}>+</button>
                        </div>

                        <h2 style={subtitle}> Max Words </h2>
                        <div style={{ display: 'flex', textAlign: 'center', alignSelf: 'center', justifyContent: 'center', gap: '30px' }}>
                            <button style={incButton} onClick={this.DecreaseItemWord}>-</button>
                            {this.state.show ? <h2 style={subtitle}>{this.state.word}</h2> : ''}
                            <button style={incButton} onClick={this.IncrementItemWord}>+</button>
                        </div>
                        <h4 style={filler}>test</h4>
                    </div></div>



                }
                {this.state.displayStory &&
                    <StoryPage />
                }



            </div>


        )
    }
}
