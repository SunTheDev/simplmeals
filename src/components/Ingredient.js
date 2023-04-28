import React from "react";

const Ingredient = ({ name, amount }) => {
  return (
    <>
      <span style={{ color: "green" }}>{name}</span>
      <span>{amount}</span>
    </>
  );
};

export default Ingredient;
