import { useEffect, useState } from "react";
import { Form, Col, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import axios from "axios";

const NewRecipePage = () => {
  const [availableTags, setAvailableTags] = useState([]);
  const [availableIngredients, setAvailableIngredients] = useState([]);
  const [done, setDone] = useState(false);
  // const [selectedIngredient, setSelectedIngredient] = useState({
  //   quantity: "",
  //   units: "",
  //   ingredient: "",
  // });
  const [selectedIngredientUnits, setSelectedIngredientUnits] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([
    { quantity: "", units: "", ingredient: "" },
  ]);

  const [formData, setFormData] = useState({
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
  });

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
    console.log(event);
    setSelectedIngredients((state) => {
      return { ...state[index], [event.target.id]: event.target.value };
    });

    const selectedIngredient = availableIngredients.filter((ingredient) => {
      return ingredient._id == event.target.value;
    });

    console.log("units:", selectedIngredient);
    setSelectedIngredientUnits(selectedIngredient[0].units);
  };

  const capitalizeName = (str) => {
    const splitStr = str.toLowerCase().split(" ");
    for (let i = 0; i < splitStr.length; i++) {
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(" ");
  };

  const handleNameChange = (event) => {
    const name = capitalizeName(event.target.value);
    setFormData((state) => {
      return { ...state, recipeName: name };
    });
  };

  const checkTagsChecked = () => {
    const checkedTags = availableTags.filter((tag) => {
      return tag.checked === true;
    });
    setFormData({ ...formData, tags: checkedTags._id });
  };

  const handleCheckChange = (index) => {
    const tags = [...availableTags];
    console.log("index", index);
    console.log("tags", tags);
    tags[index].checked = !tags[index].checked;
    setAvailableTags(tags);
    checkTagsChecked();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // axios
    //   .post("/recipe/new", formData)
    //   .then((response) => {
    //     setDone(true);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    console.log(formData);
  };

  const handleSelect = (event) => {
    console.log(event.target.value, event);
    setFormData((state) => {
      return { ...state, [event.target.id]: event.target.value };
    });
  };

  if (done) {
    return <Redirect to={"/"} />;
  }
  console.log(formData);
  console.log(selectedIngredients);

  return (
    <>
      <h1>Add A New Recipe</h1>
      {availableTags.length > 0 && availableIngredients.length > 0 ? (
        <Form>
          <Form.Group controlId="recipeName">
            <Form.Label>Recipe Name:</Form.Label>
            <Form.Control
              type="email"
              placeholder="Recipe Name"
              value={formData.recipeName}
              // onNameChange={handleNameChange}
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
          <Form.Group controlId="ingredientList">
            <Form.Label>Select Ingredients</Form.Label>
            <Form.Control as="select">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Form.Control>
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
                    onChange={(event) => handleIngredientSelect(event)}
                  >
                    <option disabled selected>
                      Please select..
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
                    onChange={handleIngredientSelect}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="units">
                  <Form.Control
                    as="select"
                    onChange={(event) => handleIngredientSelect(event)}
                  >
                    <option disabled selected>
                      Please select..
                    </option>
                    {selectedIngredientUnits.map((unit) => {
                      return <option value={unit}>{unit}</option>;
                    })}
                  </Form.Control>
                </Form.Group>
                <Button>-</Button>
                <Button>+</Button>
              </Form.Row>
            );
          })}

          <Form.Row>
            <Button>Done with ingredient</Button>
          </Form.Row>
          <Button type="submit" onSubmit={handleSubmit}>
            Add New Recipe
          </Button>
        </Form>
      ) : (
        <p>Loading..</p>
      )}
    </>
  );
};

export default NewRecipePage;
