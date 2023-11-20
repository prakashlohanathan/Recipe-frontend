import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar";
import './Styles/Home.css'
import { Alert, Snackbar } from "@mui/material";
//import apiClient from '../http-common';

const Home = ({ user,setUser }) => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
 const [save,setSave]= useState(false)
  const userId = localStorage.getItem("UserId");

  useEffect(() => {
    
    console.log(userId)
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:5000/recipe");
        setRecipes(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/recipe/savedRecipe/ids/${userId}`
        );
        console.log(response)
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchRecipes();
    // fetchSavedRecipes();
  }, [userId]);

  // const saveRecipe = async (recipeID) => {
  //   try {
  //   //   const postData = {
  //   //     userId: userId,
  //   //     recipeID: recipeID
  //   //   };

  //   //   const res = await apiClient.put(`/recipe`, postData, {
  //   //     headers: {
  //   //       "x-access-token": "token-value",
  //   //     },

  //   //   });
  //   //   console.log(res)
  //   //   const user = {
  //   //     status: res.status + "-" + res.statusText,
  //   //     headers: res.headers,
  //   //     data: res.data,
  //   //   };
  //   //   console.log(user);
  //   //   setSavedRecipes(res.data.savedRecipes);
  //   // } catch (error) {
  //   //   console.log(error);

  //   }
  // };
  
  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put(`http://localhost:5000/users/update`, {
        recipeID,
        userId,
      });
      handleClick()
      console.log(response)
      setUser(response.data.updatedRecipe)
      setSavedRecipes(response.data.updatedRecipe.savedRecipes);
    } catch (err) {
      console.log(err);
    }
  };

  
//Snackbar
const [open, setOpen] = useState(false);

const handleClick = () => {
  setOpen(true);
};

const handleClose = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }

  setOpen(false);
};

  return (
    <div>
      <Navbar />
      <div className="home-container">
        <h1>Recipes</h1>
        <div className="home-receipe">
          {recipes.map((recipe) => (
            <li key={recipe._id}>
              <div>
                <h2>{recipe.name}</h2>
                <div className="btn" >
                  <button
                    onClick={() => saveRecipe(recipe._id)}
                    
                  >save </button></div>
              </div>
              <div className="instructions">
                <p>{recipe.instructions}</p>
              </div>
              <div class="card" ><img src={recipe.imageUrl} alt={recipe.name} /></div>
              <p>Cooking Time: {recipe.cookingTime} minutes</p>
            </li>
          ))}
        </div>
      </div>
      <Snackbar open={open} autoHideDuration={4000} 
            onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" 
            sx={{ width: '100%' }}>
              Recipe added to Favourites
            </Alert>
          </Snackbar>
    </div>
  );
};

export default Home;

