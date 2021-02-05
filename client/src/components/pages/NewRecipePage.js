import { useEffect, useState } from "react";
import { Form, Col, Button, Container } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import axios from "axios";

const NewRecipePage = () => {
  const [availableTags, setAvailableTags] = useState([]);
  const [availableIngredients, setAvailableIngredients] = useState([]);
  const [done, setDone] = useState(false);
  const [selectedIngredients, setSelectedIngredients] = useState([
    { quantity: "", units: "", ingredient: "", unitOptions: [] },
  ]);
  const [cookingInstructions, setCookingInstructions] = useState([""]);

  const initialState = {
    recipeName: "",
    servingSize: "",
    prepTime: "mins",
    prepTimeUnit: "",
    cookTime: "",
    cookTimeUnit: "mins",
    tags: [], //contain tags id
    description: "",
    imgURL: "",
    ingredientList: [], // {quantity: "", units: "", ingredient: contains the id""}
    instructions: [],
  };

  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    // const getTags = axios.get("/tags");
    // const getIngredients = axios.get("/ingredients");
    // axios
    //   .all([getTags, getIngredients])
    //   .then(
    //     axios.spread((...allData) => {
    //       const allTags = allData[0].data
    //       const allIngredients = allData[1].data
    //       setAvailableTags(
    //         allTags.map((tag) => {
    //           return { ...tag, select: false };
    //         })
    //       );
    //       setAvailableIngredients(allIngredients);
    //     })
    //   )
    //   .catch((error) => {
    //     console.log(error.response);
    //   });

    const allTags = [
      { _id: 1, tagName: "asian", tagCategory: "cuisine" },
      { _id: 2, tagName: "western", tagCategory: "cuisine" },
      { _id: 3, tagName: "italian", tagCategory: "cuisine" },
    ];
    const allIngredients = [
      { _id: 1, units: ["pieces"], ingredientName: "Egg" },
      { _id: 2, units: ["tsp", "tbsp"], ingredientName: "salt" },
      { _id: 3, units: ["g", "kg"], ingredientName: "rice" },
    ];
    setAvailableTags(
      allTags.map((tag) => {
        return { ...tag, checked: false };
      })
    );
    setAvailableIngredients(allIngredients);
  }, []);

  const handleChange = (event) => {
    setFormData((state) => {
      return { ...state, [event.target.id]: event.target.value };
    });
  };

  const handleIngredientSelect = (event, index) => {
    console.log("handleIngredientSelect", event);
    const values = [...selectedIngredients];
    values[index][event.target.id] = event.target.value;

    if (event.target.id === "ingredient") {
      const selectedIngredient = availableIngredients.filter((ingredient) => {
        return ingredient._id == event.target.value;
      });
      values[index]["unitOptions"] = selectedIngredient[0].units;
    }
    setSelectedIngredients(values);
  };

  const handleIngredientChange = (event, index) => {
    console.log("handleIngredientChange", event);
    const values = [...selectedIngredients];
    values[index][event.target.id] = event.target.value;
    setSelectedIngredients(values);
  };

  const handleAddIngredient = (index) => {
    setSelectedIngredients([
      ...selectedIngredients,
      { quantity: "", units: "", ingredient: "", unitOptions: [] },
    ]);
  };
  const handleDeleteIngredient = (index) => {
    const values = [...selectedIngredients];
    values.splice(index, 1);
    setSelectedIngredients(values);
  };

  const handleInstructionChange = (event, index) => {
    const values = [...cookingInstructions];
    values[index] = event.target.value;
    setCookingInstructions(values);
  };

  const handleAddInstruction = (index) => {
    setCookingInstructions([...cookingInstructions, ""]);
  };

  const handleDeleteInstruction = (index) => {
    const values = [...cookingInstructions];
    values.splice(index, 1);
    setCookingInstructions(values);
  };

  const capitalizeName = (str) => {
    const splitStr = str.toLowerCase().split(" ");
    for (let i = 0; i < splitStr.length; i++) {
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(" ");
  };

  const checkTagsChecked = () => {
    const checkedTags = availableTags.filter((tag) => {
      return tag.checked === true;
    });
    setFormData({ ...formData, tags: checkedTags.map((tag) => tag._id) });
  };

  const handleCheckChange = (index) => {
    const tags = [...availableTags];
    console.log("index", index);
    console.log("tags", tags);
    tags[index].checked = !tags[index].checked;
    setAvailableTags(tags);
    checkTagsChecked();
  };

  const handleSelect = (event) => {
    console.log(event.target.value, event);
    setFormData((state) => {
      return { ...state, [event.target.id]: event.target.value };
    });
  };

  const handleReset = () => {
    setFormData(initialState);
  };

  const handleSubmit = () => {
    console.log("submit button clicked");
    const ingredientLists = [...selectedIngredients];
    ingredientLists.map((ingredient) => delete ingredient.unitOptions);
    console.log(ingredientLists);
    const dataToBeSubmitted = {
      ...formData,
      recipeName: capitalizeName(formData.recipeName),
      ingredientList: ingredientLists,
      instructions: cookingInstructions,
    };

    // axios
    //   .post("/recipe/new", dataToBeSubmitted)
    //   .then((response) => {
    //     setDone(true);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    console.log(dataToBeSubmitted);
    setDone(true);
  };

  if (done) {
    return <Redirect to={"/"} />;
  }
  console.log(formData);
  console.log(selectedIngredients);

  return (
    <Container>
      <h1>Add A New Recipe</h1>
      {availableTags.length > 0 && availableIngredients.length > 0 ? (
        <Form>
          <Form.Group controlId="recipeName">
            <Form.Label>Recipe Name:</Form.Label>
            <Form.Control
              type="text"
              value={formData.recipeName}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Brief Description of the meal</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={formData.description}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="tags">
            <Form.Label>Selcet tags</Form.Label>
            <br />
            {availableTags.map((tag, index) => {
              return (
                <Form.Check
                  inline
                  label={tag.tagName}
                  type="checkbox"
                  id={`inline-checkbox-${tag.tagName}`}
                  checked={tag.checked}
                  onChange={() => handleCheckChange(index)}
                />
              );
            })}
          </Form.Group>
          <Form.Group controlId="servingSize">
            <Form.Label>Serving Size:</Form.Label>
            <Form.Control
              type="number"
              value={formData.servingSize}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Row>
            <Form.Label>Preparation Time:</Form.Label>
            <Form.Group as={Col} controlId="prepTime">
              <Form.Control
                type="number"
                value={formData.prepTime}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="prepTimeUnit">
              <Form.Control
                as="select"
                onChange={(event) => handleSelect(event)}
              >
                <option value="mins">mins</option>
                <option value="hours">hours</option>
              </Form.Control>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Label>Cooking Time:</Form.Label>
            <Form.Group as={Col} controlId="cookTime">
              <Form.Control
                type="number"
                value={formData.cookTime}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="cookTimeUnit">
              <Form.Control
                as="select"
                onChange={(event) => handleSelect(event)}
              >
                <option value="mins">mins</option>
                <option value="hours">hours</option>
              </Form.Control>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Label>Ingredients:</Form.Label>
          </Form.Row>

          {selectedIngredients.map((selectedIngredient, index) => {
            return (
              <Form.Row>
                <Form.Group as={Col} controlId="ingredient">
                  <Form.Control
                    as="select"
                    onChange={(event) => handleIngredientSelect(event, index)}
                  >
                    <option disabled selected>
                      Please select ingredient
                    </option>
                    {availableIngredients.map((ingredient) => {
                      return (
                        <option value={ingredient._id}>
                          {ingredient.ingredientName}
                        </option>
                      );
                    })}
                  </Form.Control>
                </Form.Group>
                <Form.Group as={Col} controlId="quantity">
                  <Form.Control
                    type="number"
                    value={selectedIngredient.quantity}
                    placeholder="Quantity"
                    onChange={(event) => handleIngredientChange(event, index)}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="units">
                  <Form.Control
                    as="select"
                    onChange={(event) => handleIngredientSelect(event, index)}
                  >
                    <option disabled selected>
                      Please select unit measurement
                    </option>
                    {selectedIngredient["unitOptions"].map((unit) => {
                      return <option value={unit}>{unit}</option>;
                    })}
                  </Form.Control>
                </Form.Group>
                {index === selectedIngredients.length - 1 && (
                  <Button onClick={() => handleAddIngredient(index)}>+</Button>
                )}
                {index !== selectedIngredients.length - 1 && (
                  <Button onClick={() => handleDeleteIngredient(index)}>
                    -
                  </Button>
                )}
              </Form.Row>
            );
          })}
          <Form.Row>
            <Form.Label>Cooking Instructions:</Form.Label>
          </Form.Row>
          {cookingInstructions.map((instruction, index) => {
            return (
              <Form.Row>
                <Form.Group as={Col}>Step {index + 1}</Form.Group>
                <Form.Group as={Col} controlId="instructions">
                  <Form.Control
                    as="textarea"
                    rows={1}
                    value={cookingInstructions[index]}
                    onChange={(event) => handleInstructionChange(event, index)}
                  />
                </Form.Group>
                {index === cookingInstructions.length - 1 && (
                  <Button onClick={() => handleAddInstruction(index)}>+</Button>
                )}
                {index !== cookingInstructions.length - 1 && (
                  <Button onClick={() => handleDeleteInstruction(index)}>
                    -
                  </Button>
                )}
              </Form.Row>
            );
          })}

          <Button onClick={handleSubmit}>Submit New Recipe</Button>
          <Button className="ml-1" onClick={handleReset}>
            Reset Form
          </Button>
        </Form>
      ) : (
        <p>Loading..</p>
      )}
    </Container>
  );
};

export default NewRecipePage;
