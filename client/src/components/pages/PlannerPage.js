import { useEffect, useState } from "react";
import { Table, Row, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import converter from "../data/conversionData";

const PlannerPage = () => {
  const [list, setList] = useState([]);

  const sampleList = [
    {
      multiplier: 1,
      _id: "6020e6e21cf5483c7d2f1326",
      recipeID: {
        _id: "601bdfd4e47158a8894b23ad",
        recipeName: "egg fried rice",
        servingSize: 2,
        ingredientList: [
          {
            quantity: 1,
            units: "cup",
            ingredient: {
              _id: "601bdc9ae47158a8894b23a0",
              ingredientName: "long-grained rice",
            },
          },
          {
            quantity: 0.75,
            units: "cup",
            ingredient: {
              _id: "601bdcc9e47158a8894b23a1",
              ingredientName: "water",
            },
          },
          {
            quantity: 3,
            units: "",
            ingredient: {
              _id: "601bdd18e47158a8894b23a3",
              ingredientName: "egg",
            },
          },
          {
            quantity: 0.25,
            units: "tsp",
            ingredient: {
              _id: "601bdd31e47158a8894b23a4",
              ingredientName: "salt",
            },
          },
          {
            quantity: 1,
            units: "tsp",
            ingredient: {
              _id: "601bdd4fe47158a8894b23a5",
              ingredientName: "sesame oil",
            },
          },
          {
            quantity: 2,
            units: "tsp",
            ingredient: {
              _id: "601bdd9ee47158a8894b23a6",
              ingredientName: "cooking oil",
            },
          },
          {
            quantity: 3,
            units: "clove",
            ingredient: {
              _id: "601bddc5e47158a8894b23a7",
              ingredientName: "garlic",
            },
          },
          {
            quantity: 1,
            units: "tbsp",
            ingredient: {
              _id: "601bde08e47158a8894b23a8",
              ingredientName: "fish sauce",
            },
          },
          {
            quantity: 1,
            units: "tbsp",
            ingredient: {
              _id: "601bde44e47158a8894b23a9",
              ingredientName: "light soy sauce",
            },
          },
          {
            quantity: 0.25,
            units: "tsp",
            ingredient: {
              _id: "601bde6fe47158a8894b23aa",
              ingredientName: "ground white pepper",
            },
          },
          {
            quantity: 20,
            units: "g",
            ingredient: {
              _id: "601bde92e47158a8894b23ab",
              ingredientName: "spring onion",
            },
          },
          {
            quantity: 10,
            units: "g",
            ingredient: {
              _id: "601bdeb0e47158a8894b23ac",
              ingredientName: "fried ikan bilis",
            },
          },
        ],
      },
    },
    {
      multiplier: 1,
      _id: "6020e6e21cf5483c7d2f1326",
      recipeID: {
        _id: "601bdfd4e47158a8894b23ad",
        recipeName: "egg fried rice",
        servingSize: 2,
        ingredientList: [
          {
            quantity: 1,
            units: "cup",
            ingredient: {
              _id: "601bdc9ae47158a8894b23a0",
              ingredientName: "long-grained rice",
            },
          },
          {
            quantity: 0.75,
            units: "cup",
            ingredient: {
              _id: "601bdcc9e47158a8894b23a1",
              ingredientName: "water",
            },
          },
          {
            quantity: 3,
            units: "",
            ingredient: {
              _id: "601bdd18e47158a8894b23a3",
              ingredientName: "egg",
            },
          },
          {
            quantity: 0.25,
            units: "tsp",
            ingredient: {
              _id: "601bdd31e47158a8894b23a4",
              ingredientName: "salt",
            },
          },
          {
            quantity: 1,
            units: "tsp",
            ingredient: {
              _id: "601bdd4fe47158a8894b23a5",
              ingredientName: "sesame oil",
            },
          },
          {
            quantity: 2,
            units: "tsp",
            ingredient: {
              _id: "601bdd9ee47158a8894b23a6",
              ingredientName: "cooking oil",
            },
          },
          {
            quantity: 3,
            units: "clove",
            ingredient: {
              _id: "601bddc5e47158a8894b23a7",
              ingredientName: "garlic",
            },
          },
          {
            quantity: 1,
            units: "tbsp",
            ingredient: {
              _id: "601bde08e47158a8894b23a8",
              ingredientName: "fish sauce",
            },
          },
          {
            quantity: 1,
            units: "tbsp",
            ingredient: {
              _id: "601bde44e47158a8894b23a9",
              ingredientName: "light soy sauce",
            },
          },
          {
            quantity: 0.25,
            units: "tsp",
            ingredient: {
              _id: "601bde6fe47158a8894b23aa",
              ingredientName: "ground white pepper",
            },
          },
          {
            quantity: 20,
            units: "g",
            ingredient: {
              _id: "601bde92e47158a8894b23ab",
              ingredientName: "spring onion",
            },
          },
          {
            quantity: 10,
            units: "g",
            ingredient: {
              _id: "601bdeb0e47158a8894b23ac",
              ingredientName: "fried ikan bilis",
            },
          },
        ],
      },
    },
  ];

  useEffect(() => {
    // axios
    //   .get("/users/planner")
    //   .then((response) => {
    //     setList(response.data);
    //   })
    //   .catch((error) => {
    //     console.log(error.response);
    //   });
    const sample = [...sampleList];
    const sampleArr = sample.map((list) => {
      return {
        ...list,
        totalServing: list.multiplier * list.recipeID.servingSize,
      };
    });
    console.log(sampleArr);
    setList(sampleArr);
  }, []);

  const handleAddServing = (index) => {
    console.log("add serving clicked");
    const listArr = [...list];
    listArr[index].totalServing = listArr[index].totalServing + 1;
    listArr[index].multiplier =
      listArr[index].totalServing / listArr[index].recipeID.servingSize;
    console.log(listArr[index]);
    setList(listArr);
  };

  const handleReduceServing = (index) => {
    console.log("reduce serving clicked");
    const listArr = [...list];
    listArr[index].totalServing = listArr[index].totalServing - 1;
    if (listArr[index].totalServing === 0) {
      listArr.splice(index, 1);
    } else {
      listArr[index].multiplier =
        listArr[index].totalServing / listArr[index].recipeID.servingSize;
    }
    console.log(listArr);
    setList(listArr);
  };

  const handleRemoveRecipe = (index) => {
    console.log("delete recipe from planner clicked");
    const listArr = [...list];
    listArr.splice(index, 1);
    console.log(listArr);
    setList(listArr);
  };

  const handleUpdatePlanner = () => {
    // axios
    //   .put("/users", {planner: list}, { withCredentials: true })
    //   .then((response) => {
    //     setList(response.data);
    //   })
    //   .catch((error) => {
    //     console.log(error.response);
    //   });
    console.log("list updated");
    setList(list);
  };

  const handleClearPlanner = () => {
    // axios
    //   .put("/users", {planner: []}, { withCredentials: true })
    //   .then((response) => {
    //     setList(response.data);
    //   })
    //   .catch((error) => {
    //     console.log(error.response);
    //   });
    console.log("planner cleared");
    setList([]);
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <h1>Your Grocery Shopping Planner</h1>
      </Row>
      <Row>
        <br />
      </Row>

      {list.length === 0 ? (
        <p>
          Your planner is empty now! Go find your desired recipe and add it to
          this planner..
        </p>
      ) : (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th className="text-center">Recipe Name</th>
                <th className="text-center">Serving per recipe</th>
                <th className="text-center">Total serving needed</th>
                <th>Add/Reduce serving</th>
                <th>Remove recipe from plan</th>
              </tr>
            </thead>
            <tbody>
              {list.map((data, index) => {
                return (
                  <tr>
                    <td className="text-capitalize">
                      {data.recipeID.recipeName}
                    </td>
                    <td>{data.recipeID.servingSize}</td>
                    <td>{data.totalServing}</td>
                    <td>
                      <Button onClick={() => handleAddServing(index)}>+</Button>
                      <Button onClick={() => handleReduceServing(index)}>
                        -
                      </Button>
                    </td>
                    <td>
                      <Button onClick={() => handleRemoveRecipe(index)}>
                        X
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <br />
          <Link to="/planner/generate">
            <Button>Generate shopping List</Button>
          </Link>
          <Button onClick={handleUpdatePlanner}>
            Save changes and come back later
          </Button>
          <Button onClick={handleClearPlanner}>
            Done Shopping! Clear my planner
          </Button>
          <p>Pls note that any unsaved changes will be discarded</p>
        </>
      )}
    </Container>
  );
};

export default PlannerPage;
