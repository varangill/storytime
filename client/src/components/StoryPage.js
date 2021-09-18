import React, { useEffect , useState } from 'react'

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
    return (
      <div>
        <h3>The Story</h3>
        <h4>{this.state.story}</h4>
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
        {this.state.error}
      </div>
    )
  }
}