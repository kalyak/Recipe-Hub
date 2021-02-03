const express = require("express");
const router = express.Router();
const Recipes = require("../models/RecipesSchema");

const isAuthenticated = (req, res, next) => {
  console.log(req.sessions);
  if (req.sessions.currentUser) {
    const userID = req.sessions.currentUser._id;
    next();
  } else {
    res.status(401).send("You are currently not logged in. Please log in.");
  }
};

const dbError = (res) => {
  return res
    .status(500)
    .send("Database error. Please contact your system administrator.");
};

// CREATE
router.post(
  "/new",
  // isAuthenticated,
  (req, res) => {
    data = {
      ...req.body,
      // userID,
    };
    Recipes.create(data, (err, recipe) => {
      if (err) {
        // return dbError(res);
        return res.send(err);
      } else {
        res.send(recipe);
      }
    });
  }
);

// SHOW (individual)
router.get("/:recipeID", (req, res) => {
  Recipes.findById(req.params.recipeID)
    .populate({ path: "tags", select: "tagName tagCategory" })
    .populate({ path: "userID", select: "username" })
    .exec((err, recipe) => {
      if (err) {
        // return dbError(res);
        return res.send(err);
      } else {
        res.send(recipe);
      }
    });
  // res.send("SHOW RECIPES");
});

// SHOW (listings)
router.get("/", (req, res) => {
  // res.send(req.query);
  const query = { ...req.query, archived: false };
  console.log();
  Recipes.find(
    // { $and: [{ recipeName: /Egg/ }, { recipeName: /Tomato/ }] }, //test query with multiple keywords
    query,
    "recipeName tags description avgRating",
    (err, recipe) => {
      if (err) {
        // return dbError(res);
        return res.send(err);
      } else {
        res.send(recipe);
      }
    }
  );
});

// UPDATE
router.post("/:recipeID", (req, res) => {
  Recipes.findByIdAndUpdate(
    req.params.recipeID,
    req.body,
    { upsert: true, new: true },
    (err, recipe) => {
      if (err) {
        return dbError(res);
      } else {
        res.send(recipe);
      }
    }
  );
});

// DELETE / Archive
router.post("/archive", (req, res) => {
  Recipes.findByIdAndUpdate(
    req.params.recipeID,
    { archived: true },
    { upsert: true, new: true },
    (err, recipe) => {
      if (err) {
        return dbError(res);
      } else {
        res.send(recipe);
      }
    }
  );
});

module.exports = router;
