import React from "react";
import Recipe from "./Recipe";
import { useContext } from "react";
import { RecipeContext } from "../App";

const RecipeList = ({ recipes }) => {
  const { handleRecipeAdd, handleRecipeSearch } = useContext(RecipeContext);

  return (
    <div className="recipe-list">
      <div className="titleandAdd">
        <h1 className="apptitle">SimplMeals</h1>
        <div className="addRecipeBtnContainer">
          <button className="btn btn--primary" onClick={handleRecipeAdd}>
            Add Recipe
          </button>
          <div style={{ width: "190px" }}>
            <input
              type="text"
              className="searchBox"
              placeholder="Search recipe..."
              onChange={(e) => handleRecipeSearch(e)}
            />
          </div>
        </div>
      </div>
      <div>
        {recipes.map((recipe) => {
          return <Recipe {...recipe} key={recipe.id} />;
        })}
      </div>
    </div>
  );
};

export default RecipeList;
