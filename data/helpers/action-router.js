const express = require("express");
const db = require("./actionModel");

const actionRouter = express.Router();

actionRouter.get("/", (req, res) => {
  db.get()
    .then(actions => {
      res.status(201).json(actions);
    })
    .catch(err => {
      res.status(500).json({ error: "The actions could not be retrieved." });
    });
});

actionRouter.get("/:id", (req, res) => {
  actionId = req.params.id;
  db.get(actionId)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res
          .status(404)
          .json({ error: "The action with the specified ID does not exist." });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The action information could not be retrieved." });
    });
});

actionRouter.post("/:id", (req, res) => {
  const newAction = req.body;

  if (newAction.description && newAction.notes && newAction.project_id) {
    db.insert(newAction)
      .then(action => {
        res.status(201).json(action);
      })
      .catch(err => {
        res.status(400).json({
          errorMessage: "Please provide title and contents for the action."
        });
      });
  } else {
    res.status(500).json({
      error: "There was an error while saving the action to the database"
    });
  }
});

actionRouter.delete("/:id", (req, res) => {
  const actionId = req.params.id;
  db.remove(actionId)
    .then(deleted => {
      if (deleted) {
        res.status(200).json(deleted);
      } else {
        res
          .status(404)
          .json({ error: "The action with the specified ID does not exist." });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: err,
        message: "The action could not be removed"
      });
    });
});

actionRouter.put("/:id", (req, res) => {
  const actionId = req.params.id;
  const updateInfo = req.body;

  console.log(updateInfo);
  if (updateInfo.notes && updateInfo.description) {
    db.update(actionId, updateInfo)
      .then(action => {
        res.status(200).json(action);
      })
      .catch(err => {
        res.status(500).json({
          error: err,
          message: "The action information could not be modified."
        });
      });
  } else {
    res
      .status(400)
      .json({ message: "Please provide  and contents for the action." });
  }
});

module.exports = actionRouter;
