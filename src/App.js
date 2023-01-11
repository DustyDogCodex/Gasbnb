import './App.css';
import NavBar from './Components/NavBar';
import MainPhotoGrid from './Components/MainPhotoGrid';
import Intro from './Components/Intro';
import ActivityCard from './Components/CardDisplay';

function App() {
  return (
    <div className="App">
      <NavBar />
      <MainPhotoGrid />
      <Intro />
      <ActivityCard />
    </div>
  );
}

export default App;
