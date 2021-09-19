import React from 'react'
import StoryPage from './StoryPage';
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

    render() {
      return (
        <div>
            {!this.state.displayStory && 
                <div>
                    <h2>Create a Room</h2>
                    {this.state.isHost && 
                        <input type="text" pattern="[0-9]" placeholder="Number of turns" onChange={this.onLengthChange} />
                    }
                    <button onClick={this.startStory} disabled={!this.state.isHost}>Start Story</button>
                </div>
            }
            {this.state.displayStory && 
                <StoryPage players={this.state.players} turns={this.state.turns} code={this.props.match.params.code.substring(1)} playerNum={this.state.playerNum} displayed={this.state.displayStory} />
            }
            <h3>Room Code: {this.props.match.params.code.substring(1)}</h3>
        </div>
      )
    }
}
