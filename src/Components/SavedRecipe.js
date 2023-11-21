import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar";

const SavedRecipes = () => {
  const [users, setUsers] = useState(null);
  const [recipe, setRecipe] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const Id = localStorage.getItem('UserId');

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // const userId = localStorage.getItem('UserId');
        // setId(userId);
  
        const [userResponse, recipesResponse] = await Promise.all([
          axios.get(`http://localhost:5000/users/user/${Id}`),
          axios.get("http://localhost:5000/recipe")
        ]);
  
         setUsers(userResponse.data[0]);
        //console.log(userResponse.data[0])
        setRecipe(recipesResponse.data);
  
  
      } catch (err) {
        console.log(err);
      }
    };
  
    fetchData();

    
  }, [Id]);
  function editData () {
    const temp = users.savedRecipes;
    console.log(users)
     for(var i=0; i<recipe.length; i++){ 
      
    if(temp.includes(recipe[i]._id)){
      setSavedRecipes([...savedRecipes,recipe[i]])
    }
    } 
  }
if(users){
  editData();
}
  return (
    <div>
      <Navbar />
      <div>
        <h1>Saved Recipes</h1>
        <ul>
          {savedRecipes && savedRecipes.map((recipe) => (
            <li key={recipe._id}>
              <div>
                <h2>{recipe.name}</h2>
              </div>
              <p>{recipe.description}</p>
              <img src={recipe.imageUrl} alt={recipe.name} />
              <p>Cooking Time: {recipe.cookingTime} minutes</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SavedRecipes;
