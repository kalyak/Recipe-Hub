import { useEffect, useState } from "react";
import { Table, Row, Container } from "react-bootstrap";
import axios from "axios";
import converter from "../data/conversionData";

const GenerateShoppingList = () => {
  const [list, setList] = useState([]);

  const sampleList = [
    {
      multiplier: 2,
      ingredientList: [
        { quantity: 2, units: "tsp", ingredient: "salt", type: "solid" },
        { quantity: 500, units: "g", ingredient: "chicken", type: "solid" },
        { quantity: 1, units: "tsp", ingredient: "sesame oil", type: "liquid" },
        { quantity: 1, units: "tsp", ingredient: "sesame oil", type: "liquid" },
      ],
    },
    {
      multiplier: 5,
      ingredientList: [
        { quantity: 2, units: "tsp", ingredient: "sugar", type: "solid" },
        {
          quantity: 500,
          units: "g",
          ingredient: "chicken breast",
          type: "solid",
        },
        {
          quantity: 2,
          units: "tsp",
          ingredient: "cooking oil",
          type: "liquid",
        },
        { quantity: 3, units: "tsp", ingredient: "sesame oil", type: "liquid" },
        { quantity: 3, units: "clove", ingredient: "garlic", type: "solid" },
      ],
    },
    {
      multiplier: 5,
      ingredientList: [
        { quantity: 5, units: "", ingredient: "egg", type: "solid" },
        {
          quantity: 5,
          units: "packs",
          ingredient: "instant noodle",
          type: "solid",
        },
        { quantity: 5, units: "cups", ingredient: "water", type: "liquid" },
      ],
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
    setList(sampleList);
  }, []);

  const groupBy = (array, key) => {
    return array.reduce((result, currentValue) => {
      if (result[currentValue[key]] === undefined) {
        result[currentValue[key]] = [];
      }
      result[currentValue[key]].push(currentValue);
      return result;
    }, {});
  };

  const displayList = (list) => {
    console.log("display list is called");
    const consolidatedList = [];
    list.map((list) => {
      const newIngList = list.ingredientList.map((ingList) => {
        const newIngList = {
          ...ingList,
          quantity: ingList.quantity * list.multiplier,
        };
        consolidatedList.push(newIngList);
      });
    });
    console.log("consolodated list", consolidatedList);
    const ingredientsByName = groupBy(consolidatedList, "ingredient");
    console.log("ingredientsByName", ingredientsByName);
    const tableData = [];

    for (let keys in ingredientsByName) {
      const item = ingredientsByName[keys];
      let unit = "";
      let total = 0;
      if (
        [item[0].units] === "" ||
        converter[item[0].type][item[0].units] === undefined
      ) {
        unit = item[0].units;
        item.map((x) => {
          total += x.quantity;
        });
      } else {
        unit = item[0].type === "solid" ? "g" : "ml";
        item.map((x) => {
          const qty = x.quantity * converter[x.type][x.units];
          total += qty;
        });
      }
      tableData.push({ ingredientName: keys, unit: unit, quantity: total });
    }
    console.log("table data", tableData);

    return (
      <>
        {tableData.map((data) => {
          return (
            <tr>
              <td className="text-capitalize">{data.ingredientName}</td>
              {/* rounding up to nearest 5 */}
              <td>{Math.ceil(data.quantity / 5) * 5}</td>
              <td>{data.unit}</td>
            </tr>
          );
        })}
      </>
    );
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <h1>Your Grocery Shopping list</h1>
      </Row>
      <Row>
        <br />
      </Row>

      {list.length === 0 ? (
        <p>
          You have no plan yet! Go find your desired recipe and add it to this
          planner..
        </p>
      ) : (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th className="text-center">Ingredient Name</th>
                <th className="text-center">Quantity*</th>
                <th className="text-center">Unit</th>
              </tr>
            </thead>
            <tbody>{displayList(list)}</tbody>
          </Table>
          <p>*Please not that it is only an approximate</p>
        </>
      )}
    </Container>
  );
};
export default GenerateShoppingList;
