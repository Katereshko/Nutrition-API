import check from "./check.png";

function MyRecipesComponents({label, image, calories, ingredients, cuisine, diet}){
  return(
    <div className="recipeCard">
      <div className="container">
        <h2>{label}</h2>
      </div>
      <div className="container">
        <img alt="dish" src={image}/>
      </div>

      <div className="container">
        <p className="calories">Calories: {calories.toFixed()}</p>
      </div>

      <div className="container">
        <p className="cuisine">Cuisine: {cuisine}</p>
      </div>

      <div className="container">
        <div className="categories">
          {diet.map ((dietType, index) => (
            <p className="diet" key={index}>{dietType}</p>
          ))}
        </div>
      </div>

      <div className="container">
        <ul className="list">
          {ingredients.map ((ingredient, index) => (
            <li key={index}><img alt="icon" src={check} className="icon"/>{ingredient}</li>
          ))}
        </ul>
      </div>

    </div>
    
  )
}

export default MyRecipesComponents;