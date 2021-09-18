import React, { useEffect , useState } from 'react'
function StoryPage() {

  const [storyMessages, setStoryMessages] = useState([]);
  const [players, setPlayers] = useState([]);
  const [playerTurn, setPlayerTurn] = useState('');

  function constructor(props) {
    super(props)
  }

  return (
    <div>
        <h2>{this.props.display}</h2>
    </div>
  );
}
  
export default StoryPage;