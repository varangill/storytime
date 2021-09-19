import React from 'react'
import database from '../firebase/firebase.js'

export default class StoryPage extends React.Component {
  constructor(props) {
    super(props)
    
}

  state = {
    story: '',
    prompt: '',
    currentLine: '',
    prompted: false,
    error: '',
    yourTurn: false
  }

  componentDidMount() {
    database.ref(`rooms/${this.props.code}`).on('value', (snapshot) => {
      console.log("database changed");
      this.setState(() => ({ story: snapshot.val().story }));
      this.setState(() => ({ prompt: snapshot.val().prompt }));
      if (snapshot.val().playerTurn == this.props.playerNum) {
        console.log("pass")
        this.setState(() => ({ yourTurn: true }));
      } else {
        console.log("fail");
        this.setState(() => ({ yourTurn: false }));
      }
    });
  }

  onLineChange = (e) => {
    const currentLine = e.target.value;
    this.setState(() => ({ currentLine }))
  }

  onSubmitStory = (e) => {
    e.preventDefault();
    
    //here, check if prompt is a substring within this.state.currentLine
    if (this.state.currentLine.includes(this.state.prompt)) {
      //check if the end of currentLine has a period at the end, if not, add it
    
      let story = this.state.story.concat(' ', this.state.currentLine);

      this.setState(() => ({ currentLine: '' }))
      this.setState(() => ({ prompt: '' }));
      this.setState(() => ({ story }))
      this.setState(() => ({ prompted: true }));
      this.setState(() => ({ error: '' }));
    } else {
      this.setState(() => ({ error: "Error: Sentence does not contain prompt" }));
    }

  }

  onSubmitPrompt = (e) => {
    e.preventDefault();
    database.ref(`rooms/${this.props.code}`).once('value').then((snapshot) => {
      const turnIndex = snapshot.val().playerTurn;
      if (turnIndex = snapshot.val().numOfPlayers - 1) {
        database.ref(`rooms/${this.props.code}/playerTurn`).set(0);
      } else {
        database.ref(`rooms/${this.props.code}/playerTurn`).set(turnIndex + 1);
      }
    }).catch((e) => {
        
    });
    database.ref(`rooms/${this.props.code}/story`).set(this.state.story);
    database.ref(`rooms/${this.props.code}/prompt`).set(this.state.prompt);
    this.setState(() => ({ error: '' }));
    this.setState(() => ({ currentLine: '' }))
    this.setState(() => ({ prompted: false }));
  }

  render() {
    return (
      <div>
        <h3>The Story</h3>
        <h4>{this.state.story}</h4>
        {this.state.yourTurn && 
          <div>
            {!this.state.prompted && 
              <div>
                  <h3>Enter in the story's next sentence!</h3>
                  {!this.state.story.length == 0 &&
                    <div>
                      <h3>Your prompt: {this.state.prompt} </h3>
                    </div>
                  }
                  <form onSubmit={this.onSubmitStory}>
                    <input 
                      type="text"
                      placeholder="Enter sentence"
                      value={this.state.currentLine}
                      onChange={this.onLineChange}
                    />
                    <button>Submit Sentence</button>
                  </form>
              </div>
            }
            {this.state.prompted && 
              <div>
                  <h3>Enter in a prompt for the next player!</h3>
                  <form onSubmit={this.onSubmitPrompt}>
                    <input 
                      type="text"
                      placeholder="Enter prompt"
                      value={this.state.currentLine}
                      onChange={this.onLineChange}
                    />
                    <button>Submit Prompt</button>
                  </form>
              </div>
            }
          </div>
        }
        {this.state.error}
      </div>
    )
  }
}