import './App.css';
import NavBar from './Components/NavBar';
import MainPhotoGrid from './Components/MainPhotoGrid';
import Intro from './Components/Intro';
import ActivityCard from './Components/ActivityCard';
import data from './Components/data';

function App() {
  const cards = data.map(obj => {
    return ( 
      <ActivityCard
        img={obj.coverImg}
        rating={obj.stats.rating}
        reviews={obj.stats.reviewCount}
        location={obj.location}
        title={obj.title}
        price={obj.price}
        />
      )
  })

  return (
    <div className="App">
      <NavBar />
      <MainPhotoGrid />
      <Intro />
      <div className="card-display">
        {cards}
      </div>
    </div>
  );
}

export default App;
