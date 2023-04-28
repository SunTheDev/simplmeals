import React from "react";

const RecipeIngredientEdit = ({
  ingredient,
  handleIngredientChange,
  handleIngredientDelete,
}) => {
  const handleChange = (changes) => {
    handleIngredientChange(ingredient.id, { ...ingredient, ...changes });
  };

  return (
    <>
      <input
        type="text"
        className="recipe-edit-input"
        value={ingredient.name}
        onChange={(e) => handleChange({ name: e.target.value })}
      />
      <input
        type="text"
        className="recipe-edit-input"
        value={ingredient.amount}
        onChange={(e) => handleChange({ amount: e.target.value })}
      />
      <button
        className="btn btn--red"
        onClick={() => handleIngredientDelete(ingredient.id)}
      >
        &times;
      </button>
    </>
  );
};

export default RecipeIngredientEdit;
