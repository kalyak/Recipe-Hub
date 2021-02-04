const express = require("express");
const Recipes = require("../models/RecipesSchema");
const router = express.Router();
const Reviews = require("../models/ReviewsSchema");

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

// //CREATE
// router.post("/new", isAuthenticated, (req, res) => {
//   const data = {
//     ...req.body,
//     userID,
//   };
//   Reviews.create(data, (err, review) => {
//     if (err) {
//       return dbError(res);
//     } else {
//         let newRating=0
//         Reviews.find({recipeID:data.recipeID},"userRating",(err,ratings)=>{
//             if (err){
//                 return res.status(500).send("ratings retrieval error")
//             } else {
//                 newRating:{$avg: "$quantity"};
//             }
//         })
//       Recipes.findByIdAndUpdate(
//         data.recipeID,
//         { avgRating: newRating },
//         { upsert: true, new: true },
//         (err, recipe) => {
//           if (err) {
//             return res.status(500).send("Ratings update error");
//           } else {
//             review.avgRating = newRating;
//           }
//         }
//       );
//       res.status(200).send(review);
//     }
//   });
// });

//aggregate
router.get("/avg", (req, res) => {
  Reviews.aggregate()
    .match({ recipeID: "601a30e86c7c7d21c2bdd1c3" })
    .group({ _id: "$recipeID", rating: { $avg: "$userRating" } })
    .exec((err, rating) => {
      if (err) {
        return err;
      } else {
        res.send(rating);
      }
    });
});

module.exports = router;
