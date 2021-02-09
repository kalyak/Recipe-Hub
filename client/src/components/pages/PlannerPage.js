import { useEffect, useState, useContext } from "react";
import { Table, Row, Button, Container } from "react-bootstrap";
import SweetAlert from "react-bootstrap-sweetalert";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext";

const PlannerPage = () => {
  const [list, setList] = useState([]);
  const [successfulUpdatePopUp, setSuccessfulUpdatePopUp] = useState(false);
  const [successfulClearPopUp, setSuccessfulClearPopUp] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [redirectToShoppingList, setRedirectToShoppingList] = useState(false);
  const [user, setUser] = useContext(UserContext);

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
    listArr[index].totalServing += 1;
    listArr[index].multiplier =
      listArr[index].totalServing / listArr[index].recipeID.servingSize;
    console.log(listArr[index]);
    setList(listArr);
  };

  const handleReduceServing = (index) => {
    console.log("reduce serving clicked");
    const listArr = [...list];
    listArr[index].totalServing -= 1;
    if (listArr[index].totalServing === 0) {
      if (listArr.length === 1) {
        setDeleteConfirmation(true);
      } else {
        listArr.splice(index, 1);
        setList(listArr);
      }
    } else {
      listArr[index].multiplier =
        listArr[index].totalServing / listArr[index].recipeID.servingSize;
      setList(listArr);
    }
  };

  const handleRemoveRecipe = (index) => {
    console.log("delete recipe from planner clicked");
    const listArr = [...list];
    if (listArr.length === 1) {
      setDeleteConfirmation(true);
    } else {
      listArr.splice(index, 1);
      console.log(listArr);
      setList(listArr);
    }
  };

  const handleUpdatePlanner = () => {
    console.log("list to be sent to axios", list);
    const newUser = { ...user };
    const cloneList = [...list];
    const dataForUserContext = cloneList.map((data) => {
      return { ...data, recipeID: data.recipeID._id };
    });
    newUser.planner = dataForUserContext;
    axios
      .put("/users", { planner: list }, { withCredentials: true })
      .then((response) => {
        console.log("backend updated");
        console.log(response.data);
        setUser(newUser);
        setSuccessfulUpdatePopUp(true);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const handleClearPlanner = () => {
    const newUser = { ...user };
    newUser.planner = [];
    axios
      .put("/users", { planner: [] }, { withCredentials: true })
      .then((response) => {
        console.log("planner cleared");
        console.log(response.data);
        setUser(newUser);
        setList([]);
        setDeleteConfirmation(false);
        setSuccessfulClearPopUp(true);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const handleGenerateShoppingList = () => {
    const newUser = { ...user };
    const cloneList = [...list];
    const dataForUserContext = cloneList.map((data) => {
      return { ...data, recipeID: data.recipeID._id };
    });
    newUser.planner = dataForUserContext;
    axios
      .put("/users", { planner: list }, { withCredentials: true })
      .then((response) => {
        console.log("planner updated");
        setUser(newUser);
        setRedirectToShoppingList(true);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  if (redirect) {
    return <Redirect to="/" />;
  }

  if (redirectToShoppingList) {
    return <Redirect to="/planner/generate" />;
  }

  if (deleteConfirmation) {
    return (
      <Container>
        <SweetAlert
          warning
          showCancel
          confirmBtnText="Yes, clear it!"
          confirmBtnBsStyle="danger"
          title="Are you sure you want to clear your planner?"
          onConfirm={handleClearPlanner}
          onCancel={() => {
            setDeleteConfirmation(false);
          }}
          focusCancelBtn
        >
          You will not be able to recover this imaginary file!
        </SweetAlert>
      </Container>
    );
  }

  if (successfulUpdatePopUp) {
    return (
      <Container>
        <SweetAlert
          success
          title="Planner Updated"
          onConfirm={() => {
            setRedirect(true);
          }}
          confirmBtnText="Go to homepage"
        >
          Your have successfully updated your planner!
        </SweetAlert>
      </Container>
    );
  }

  if (successfulClearPopUp) {
    return (
      <Container>
        <SweetAlert
          success
          title="Planner Cleared"
          onConfirm={() => {
            setRedirect(true);
          }}
          confirmBtnText="Go to homepage"
        >
          Yay! Your shopping list has been cleared!
        </SweetAlert>
      </Container>
    );
  }

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

          <Button onClick={handleGenerateShoppingList}>
            Generate shopping List
          </Button>

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
