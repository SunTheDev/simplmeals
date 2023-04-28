import React, { useContext } from "react";
import RecipeIngredientEdit from "./RecipeIngredientEdit";
import { RecipeContext } from "../App";
import { v4 as uuidv4 } from "uuid";

const RecipeEdit = ({ recipe }) => {
  const { handleRecipeChange, handleRecipeSelect } = useContext(RecipeContext);

  const handleChange = (changes) => {
    handleRecipeChange(recipe.id, { ...recipe, ...changes });
  };

  const handleIngredientChange = (id, ingredient) => {
    const newIngredients = [...recipe.ingredients];
    const index = newIngredients.findIndex((i) => i.id === id);
    newIngredients[index] = ingredient;
    handleChange({ ingredients: newIngredients });
  };

  const handleIngredientAdd = () => {
    const newIngredient = {
      id: uuidv4(),
      name: "",
      amount: "",
    };
    handleChange({ ingredients: [...recipe.ingredients, newIngredient] });
  };

  const handleIngredientDelete = (id) => {
    handleChange({
      ingredients: [
        ...recipe.ingredients.filter((ingredient) => ingredient.id !== id),
      ],
    });
  };

  return (
    <div className="recipe-edit">
      <div className="recipe-edit-remove-btn-container">
        <button
          className="btn recipe-edit-remove-btn"
          onClick={() => handleRecipeSelect(undefined)}
        >
          &times;
        </button>
      </div>
      <div className="recipe-edit-details-grid">
        <label htmlFor="title" className="recipe-edit-label">
          Name
        </label>
        <input
          type="text"
          name="title"
          id="title"
          value={recipe.title}
          onChange={(e) => handleChange({ title: e.target.value })}
          className="recipe-edit-input"
        />
        <label htmlFor="cookTime" className="recipe-edit-label">
          Cook Time
        </label>
        <input
          type="text"
          name="cookTime"
          id="cookTime"
          value={recipe.time}
          onChange={(e) => handleChange({ time: e.target.value })}
          className="recipe-edit-input"
        />
        <label htmlFor="servings" className="recipe-edit-label">
          Servings
        </label>
        <input
          type="number"
          min="1"
          name="servings"
          id="servings"
          value={recipe.servings}
          onChange={(e) =>
            handleChange({ servings: parseInt(e.target.value) || "" })
          }
          className="recipe-edit-input"
        />
        <label htmlFor="instructions" className="recipe-edit-label">
          Instructions
        </label>
        <textarea
          name="instructions"
          id="instructions"
          className="recipe-edit-input"
          value={recipe.instructions}
          onChange={(e) => handleChange({ instructions: e.target.value })}
        />
      </div>
      <br />
      <label className="recipe-edit-label">Ingredients</label>
      <div className="recipe-edit-ingredient-grid">
        <div>Name</div>
        <div>Amount</div>
        <div></div>
        {recipe.ingredients.map((ingredient) => (
          <RecipeIngredientEdit
            key={ingredient.id}
            ingredient={ingredient}
            handleIngredientChange={handleIngredientChange}
            handleIngredientDelete={handleIngredientDelete}
          />
        ))}
      </div>
      <div className="recipe-edit-add-ingredient-btn-container">
        <button
          className="btn btn--primary"
          onClick={() => handleIngredientAdd()}
        >
          Add Ingredient
        </button>
      </div>
    </div>
  );
};

export default RecipeEdit;
