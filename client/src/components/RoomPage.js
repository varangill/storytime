import { Link } from 'react-router-dom';
import StoryPage from './StoryPage';

function RoomPage() {
    
    return (
      <div>
          <h2>create a room</h2>
          <StoryPage display={false} />
      </div>
    );
  }
  
export default RoomPage;