import { Link } from 'react-router-dom';

function HomePage() {
    return (
      <div>
          <h2>a cozy home</h2>
          <Link to="/story">
              <h3>Story</h3>
          </Link>
      </div>
    );
  }
  
export default HomePage;