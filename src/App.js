import { useState, useEffect } from "react";
import NutritionRow from "./NutritionRow";
import LoaderPage from "./Loader/LoaderPage";
import "./App.css"
import Swal from "sweetalert2";

function App() {

  const my_id = '1059b9da';
  const my_key = '56844abc86b2d5f3adda77b0aba8cf7c';
  const url = 'https://api.edamam.com/api/nutrition-details';

  const [mySearch, setMySearch] = useState("");
  const [wordSubmit, setWordSubmit] = useState("1 banana");
  const [nutrition, setNutrition] = useState("");

  const [stateLoader, setStateLoader] = useState(false);

  useEffect( () => {
    if (wordSubmit !== '') {
      let ingr = wordSubmit.split(/[,,;,\n]/);
      fetchData(ingr);
    }
  }, [wordSubmit])

  async function fetchData (ingr) {
    setStateLoader(true);

    const response = await fetch(`${url}?app_id=${my_id}&app_key=${my_key}`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ingr: ingr })
    })

    if(response.ok) {
      setStateLoader(false);
      const result = await response.json();
      setNutrition(result);
    } else {
      setStateLoader(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter ingredients correctly"
      });
    }
  }

  const ingredientSearch = (e) => {
    setMySearch(e.target.value);
  }

  const finalSearch = (e) => {
    e.preventDefault();
    setWordSubmit(mySearch);
  }

  return (
    <div className="App">
      {stateLoader && <LoaderPage />} 

      <div className="container">
        <h1>Nutrition Analysis</h1>
        <h2>Find out the exact nutritional value of your food!</h2>
      </div>

      <div className="form-container">
        <form className="container" onSubmit={finalSearch}> 
          <input
            placeholder="Search..."
            onChange={ingredientSearch}
          />
          <button onClick={finalSearch}>Search</button>
        </form>
      </div>

      <div className="container united-data">
        {
          nutrition && <p className="search-display">You're searching for: {wordSubmit}</p>
        }
        {
          nutrition && <p>{nutrition.calories} kcal</p>
        }
        {
          nutrition && Object.values(nutrition.totalNutrients)
            .map(({ label, quantity, unit }, index) =>
              <NutritionRow
                key={index}
                label={label}
                quantity={quantity}
                unit={unit}
              />
            )
        }
      </div>
    </div>
  );
}

export default App;
