import React, { useEffect, useState } from 'react'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

export default class StoryPage extends React.Component {
  constructor(props) {
    super(props)
  }


  state = {
    story: '',
    prompt: '',
    currentLine: '',
    prompted: false,
    error: ''
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

    this.setState(() => ({ error: '' }));
    this.setState(() => ({ prompt: this.state.currentLine }));
    this.setState(() => ({ currentLine: '' }))
    this.setState(() => ({ prompted: false }));
  }

  render() {
    const title = {
      fontSize: 50,
      color: "#4a54f1",
      textAlign: "center",
      paddingTop: "100px",
      fontFamily: "Ubuntu",
    }


    const subtitle = {
      fontSize: 20,
      color: '#000000',
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
      marginRight: "auto", 
      backgroundColor: "#3E86C2",
      borderRadius: 5,
      borderColor: "#3E86C2",
      width: '270px'
    }

    const inputStyle1 = {
      fontSize: 20,
      color: "black",
      padding: "10px",
      backgroundColor: "white",
      borderRadius: 5,
      borderColor: "#3E86C2",
      fontType: "Ubuntu",
      margin: "0 10% 50px 10%",
      width: '80%'
    }

    return (
      
      <div className="container">
        <h3 style={title}> The Story</h3>
        <CountdownCircleTimer 
          id="timer"
          isPlaying
          duration={10}
          colors={[
            ['#3E86C2', 0.33],
          ]}
          size={80}
        >
          {({ remainingTime }) => remainingTime}
        </CountdownCircleTimer>
        <h4 className="story">{this.state.story}</h4>
        {!this.state.prompted &&
          <div >
            <h3 style={subtitle}>Write a sentence for this story!</h3>
            {!this.state.story.length == 0 &&
              <div style={subtitle}>
                <h3 id="prompt">Your prompt: <p>{this.state.prompt}</p> </h3>
              </div>
            }
            <form onSubmit={this.onSubmitStory}>
              <div style={{display: 'flex', alignSelf: 'center', textAlign: 'center'}}>
              <input
                type="text"
                placeholder="Enter sentence"
                value={this.state.currentLine}
                onChange={this.onLineChange}
                style={inputStyle1}
              />
              </div>
              <div style={{display: 'flex', alignSelf: 'center', textAlign: 'center'}}>
              <button  style={buttonStyle1}>Submit Sentence</button>
              </div>
            </form>
          </div>
        }

        {this.state.prompted &&
          <div style={subtitle}>
            <h3 style={subtitle}>Write a prompt for the next player!</h3>
            <form onSubmit={this.onSubmitPrompt}>
              <div style={{display: 'flex', alignSelf: 'center', textAlign: 'center'}}>
              <input
                type="text"
                placeholder="Enter prompt"
                value={this.state.currentLine}
                onChange={this.onLineChange}
                style={inputStyle1}
              />
              </div>
              <div style={{display: 'flex', alignSelf: 'center', textAlign: 'center'}}>
              <button style={buttonStyle1}>Submit Prompt</button>
              </div>
            </form>
          </div>
        }
        {this.state.error}
      </div>
    )
    
  }
}