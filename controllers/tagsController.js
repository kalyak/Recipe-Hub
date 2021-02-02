const express = require("express");
const router = express.Router();
const Tags = require("../models/TagsSchema");

//SHOW/READ
router.get("/", (req, res) => {
  Tags.find({}, (err, tags) => {
    if (err) {
      res
        .status(500)
        .send("Database error. Please contact your system administrator.");
    } else {
      res.status(200).send(tags);
    }
  });
});

//CREATE
router.post("/new", (req, res) => {
  Tags.create(req.body, (err, tag) => {
    if (err) {
      // res.send(err);
      if (err.code === 11000) {
        res.status(401).send("Tag already exists.");
      } else {
        return res
          .stats(500)
          .send("Database error. Please contact your system administrator.");
        // .status(401)
        // .send(err)
      }
    } else {
      res.status(200).send(tag);
    }
  });
});

//UPDATE
router.put("/update/:id", (req, res) => {
  Tags.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, tag) => {
    if (err) {
      if (err.code === 11000) {
        return res.status(401).send({ tagName: "Tag already exists." });
      } else {
        return res.status(500).send("Database error");
      }
    } else {
      console.log("Tag updated", tag);
      res.status(200).send(tag);
    }
  });
});

//ARCHIVE (DELETE)
router.put("/archive/:id", (req, res) => {
  Tags.findByIdAndUpdate(req.params.id, { archived: true }, (err, tag) => {
    if (err) {
      return res.status(500).send(err);
    } else {
      return res.status(200).send("Tag archived.");
    }
  });
});

module.exports = router;
