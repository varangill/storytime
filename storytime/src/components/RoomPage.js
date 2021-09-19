import React from 'react'
import StoryPage from './StoryPage';
import database, {firebase} from '../firebase/firebase.js'

export default class RoomPage extends React.Component {
    constructor(props) {
        super(props);
        const roomCode = props.match.params.code.substring(1);
        console.log(roomCode)
        database.ref(`rooms/${roomCode}/host`).once('value').then((snapshot) => {
            console.log("snapshot: " + snapshot.val());
            console.log("auth: " + firebase.auth().currentUser.uid)
            if (snapshot.val() == firebase.auth().currentUser.uid) {
                console.log("you're host")
                this.setState(() => ({ isHost: true }));
            } else {
                console.log("not host");
                this.setState(() => ({ isHost: false }));
            }
          }).catch((e) => {
              
        });
    }

    state = {
        displayStory: false,
        isHost: false
    }

    startStory = () => {
        console.log(this.props.match.params.code);
        this.setState({
            displayStory: true
        })
    }

    render() {
      return (
        <div>
            {!this.state.displayStory && 
                <div>
                    <h2>Create a Room</h2>
                    <button onClick={this.startStory} disabled={!this.state.isHost}>Start Story</button>
                </div>
            }
            {this.state.displayStory && 
                <StoryPage />
            }
        </div>
      )
    }
}
