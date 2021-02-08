import { useEffect, useState } from "react";
import { Table, Row, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import converter from "../data/conversionData";

const PlannerPage = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    axios
      .get("/users/planner")
      .then((response) => {
        console.log(response.data);
        const data = response.data.map((list) => {
          return {
            ...list,
            totalServing: list.multiplier * list.recipeID.servingSize,
          };
        });

        setList(data);
      })
      .catch((error) => {
        console.log(error.response);
      });
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
