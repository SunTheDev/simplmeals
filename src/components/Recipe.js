import React from "react";
import IngredientList from "./IngredientList";
import { useContext } from "react";
import { RecipeContext } from "../App";

const Recipe = (props) => {
  const { id, title, time, servings, instructions, ingredients } = props;

  const { handleRecipeDelete, handleRecipeSelect } = useContext(RecipeContext);

  return (
    <div className="recipe">
      <div className="recipe--header">
        <h3 className="recipe--title">{title}</h3>
        <div>
          <button
            className="btn btn--primary mr-1"
            onClick={() => handleRecipeSelect(id)}
          >
            Edit
          </button>
          <button
            className="btn btn--red mr-1"
            onClick={() => handleRecipeDelete(id)}
          >
            Delete
          </button>
        </div>
      </div>
      <div className="recipe--row">
        <span className="recipe--label">Cook Time:</span>
        <span className="recipe--value">{time}</span>
      </div>
      <div className="recipe--row">
        <span className="recipe--label">Servings:</span>
        <span className="recipe--value">{servings}</span>
      </div>
      <div className="recipe--row">
        <span className="recipe--label">Instructions:</span>
        <div className="recipe--value recipe--value--indented recipe--instructions">
          {instructions}
        </div>
      </div>
      <div className="recipe--row">
        <span className="recipe--label">Ingredients:</span>
        <div className="recipe--value recipe--value--indented">
          <IngredientList ingredients={ingredients} />
        </div>
      </div>
    </div>
  );
};

export default Recipe;
