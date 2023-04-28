import "./css/App.css";
import RecipeList from "./components/RecipeList";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import React from "react";
import RecipeEdit from "./components/RecipeEdit";

export const RecipeContext = React.createContext();
const LOCAL_STORAGE_KEY = "simplMeals.recipes";

function App() {
  const [selectedRecipeId, setSelectedRecipeId] = useState();
  const [searchRecipe, setSearchRecipe] = useState("");
  const [recipes, setRecipes] = useState(() => {
    const recipeJSON = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (recipeJSON == null) {
      return recipeSample;
    } else {
      return JSON.parse(recipeJSON);
    }
  });

  const selectedRecipe = recipes.find(
    (recipe) => recipe.id === selectedRecipeId
  );

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipes));
  }, [recipes]);

  const handleRecipeAdd = () => {
    const newRecipe = {
      id: uuidv4(),
      title: "",
      time: "",
      servings: 1,
      instructions: "",
      ingredients: [
        {
          id: uuidv4(),
          name: "",
          amount: "",
        },
      ],
    };
    setSelectedRecipeId(newRecipe.id);
    setRecipes([newRecipe, ...recipes]);
  };

  const handleRecipeDelete = (id) => {
    if (selectedRecipeId !== null && selectedRecipeId === id) {
      setSelectedRecipeId(undefined);
    }
    setRecipes(recipes.filter((recipe) => recipe.id !== id));
  };

  const handleRecipeSelect = (id) => {
    setSelectedRecipeId(id);
  };
  const handleRecipeChange = (id, recipe) => {
    const newRecipes = [...recipes];
    const index = newRecipes.findIndex((r) => r.id === id);
    newRecipes[index] = recipe;
    setRecipes(newRecipes);
  };

  const handleRecipeSearch = (e) => {
    setSearchRecipe(e.target.value);
  };

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchRecipe.toLowerCase())
  );

  const recipeContextVal = {
    handleRecipeAdd,
    handleRecipeDelete,
    handleRecipeSelect,
    handleRecipeChange,
    handleRecipeSearch,
  };

  return (
    <RecipeContext.Provider value={recipeContextVal}>
      <RecipeList recipes={filteredRecipes} />
      {selectedRecipe && <RecipeEdit recipe={selectedRecipe} />}
    </RecipeContext.Provider>
  );
}

const recipeSample = [
  {
    id: 1,
    title: "Plain Chicken",
    time: "1:45",
    servings: 3,
    instructions:
      "1. Put salt on chicken.\n2. Put chicken in oven.\n3. Eat chicken.",
    ingredients: [
      { id: 1, name: "Chicken", amount: "2 Pounds" },
      { id: 2, name: "Salt", amount: "1 Tbs" },
    ],
  },
  {
    id: 2,
    title: "Pork",
    time: "2:30",
    servings: 2,
    instructions: "1. Put salt on pork.\n2. Put pork in oven.\n3. Eat pork.",
    ingredients: [
      { id: 1, name: "Pork", amount: "3 Pounds" },
      { id: 2, name: "Paprika", amount: "2 Tbs" },
    ],
  },
];

export default App;
