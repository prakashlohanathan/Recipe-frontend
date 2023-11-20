import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar";


const SavedRecipes = () => {
const [user,setUser]= useState('')
  const [recipes, setRecipes] = useState([]);
  const [id,setId]=useState("");
  //console.log(user.id)
   //const userId = user.id;
   const [savedRecipes, setSavedRecipes] = useState([]);
   
   useEffect(() => {
    const Id =localStorage.getItem('UserId')
    setId(Id)
    console.log(Id)
    const fetchUser = async () => {
      try{
        const response = await axios.get(`http://localhost:5000/users/user/${Id}`);
        setUser(response.data.data)
        //console.log(response.data.data)
      }catch(err){
        console.log(err)
      }
    }
    fetchUser();
    var response;
    const fetchRecipes = async () => {
      try {
         response = await axios.get("http://localhost:5000/recipe");
        setRecipes(response.data);
        console.log(response.data)
      } catch (err) {
        console.log(err);
      }
    };
    fetchRecipes(); 
    //console.log(user) 
     const temp = user.savedRecipes;
console.log(user)
 for(var i=0; i<recipes.length; i++){ 
  
if(temp.includes(recipes[i]._id)){
  setSavedRecipes([...savedRecipes,recipes[i]])
}
} 
console.log(savedRecipes,user)

   }, []);

return (

    <div>
<Navbar  />
    <div>
      <h1>Saved Recipes</h1>
      <ul>
        {savedRecipes.map((recipe) => (
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
