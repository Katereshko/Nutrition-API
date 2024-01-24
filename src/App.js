import './App.css';
import { useState, useEffect } from "react";
import MyRecipesComponents from "./MyRecipesComponents"
import video from "./food.mp4";

function App() {

  const MY_ID = "9ae4a1d4";
  const MY_KEY = "1c04f706235d8558b8cd0de870e75c87";

  const [mySearch, setMySearch] = useState("");
  const [myRecipes, setMyRecipes] = useState([]);
  const [wordSubmit, setWordSubmit] = useState("avocado");

  useEffect( () => {
    const getRecipe = async () => {
      const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${wordSubmit}&app_id=${MY_ID}&app_key=${MY_KEY}`);
      const data = await response.json();
      console.log(data.hits);
      setMyRecipes(data.hits);
    }
    getRecipe()
  }, [wordSubmit]);

  const myRecipeSearch = (e) => {
    console.log(e.target.value);
    setMySearch(e.target.value);
  }

  const finalSearch = (e) =>{
    e.preventDefault();
    setWordSubmit(mySearch);
  }

  return (
    <div className="App">

      <div className="container">
        <video autoPlay muted loop>
          <source src={video} type="video/mp4" />
        </video>
        <h1>Find a Recipe</h1>
      </div>

      <div className='container'>
        <form onSubmit={finalSearch}>
          <input className="search" placeholder="Search..." onChange={myRecipeSearch} value={mySearch}/>
        </form>
      </div>

      <div className='container'>
        <button onClick={finalSearch}>
          <img src="https://img.icons8.com/fluency/48/000000/fry.png" alt="icon"/>
        </button>
      </div>

      {myRecipes.map((element, index) => (
        <MyRecipesComponents
        key={index}
        label={element.recipe.label} 
        image={element.recipe.image} 
        calories={element.recipe.calories} 
        ingredients={element.recipe.ingredientLines}
        cuisine={element.recipe.cuisineType}
        diet={element.recipe.dietLabels}/>
      ))}

    </div>
  );
}

export default App;
