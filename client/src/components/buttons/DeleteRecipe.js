import { useState } from "react";
import { Button, Container } from "react-bootstrap";
import SweetAlert from "react-bootstrap-sweetalert";
import axios from "axios";
import { Redirect } from "react-router-dom";

const DeleteRecipe = (props) => {
  const recipe = props.recipe;
  const [deletePopUp, setDeletePopUp] = useState(false);
  const [successfulDelete, setSuccessfulDelete] = useState(false);

  const handleDelete = () => {
    axios
      .delete(`/recipes/${recipe._id}`, { withCredentials: true })
      .then(() => {
        setSuccessfulDelete(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (successfulDelete) {
    return <Redirect to="/recipe/user" />;
  }

  return (
    <>
      <Button
        variant="primary"
        onClick={() => {
          setDeletePopUp(true);
        }}
      >
        Delete Recipe
      </Button>

      {deletePopUp && (
        <SweetAlert
          warning
          showCancel
          confirmBtnText="Yes, delete it!"
          confirmBtnBsStyle="danger"
          title="Are you sure?"
          onConfirm={handleDelete}
          onCancel={() => {
            setDeletePopUp(false);
          }}
          focusCancelBtn
        >
          You will not be able to recover this imaginary file!
        </SweetAlert>
      )}
    </>
  );
};
export default DeleteRecipe;
