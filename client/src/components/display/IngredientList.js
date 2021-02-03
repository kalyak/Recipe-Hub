import { Table } from "react-bootstrap";

const IngredientList = (props) => {
  const listIngredient = props.ingredientList.map((ingredient, index) => {
    return (
      <>
        <tr>
          <td>{ingredient.quantity}</td>
          <td>{ingredient.units}</td>
          <td>{ingredient.ingredient}</td>
        </tr>
      </>
    );
  });

  return (
    <>
      <h2>Ingredient List</h2>
      <Table>
        <thead>
          <tr>
            <td>Quantity</td>
            <td>Unit</td>
            <td>Item</td>
          </tr>
        </thead>
        <tbody>{listIngredient}</tbody>
      </Table>
    </>
  );
};

export default IngredientList;
