import { Link } from 'react-router-dom';
import React, { useEffect , useState } from 'react'
import StoryPage from './StoryPage';

export default class RoomPage extends React.Component {
    constructor(props) {
        super(props)
    }

    state = {
        displayStory: false
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
                    <button onClick={this.startStory}>Start Story</button>
                </div>
            }
            {this.state.displayStory && 
                <StoryPage />
            }
        </div>
      )
    }
}
