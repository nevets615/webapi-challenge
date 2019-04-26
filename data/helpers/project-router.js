const express = require("express");

const db = require("./projectModel");
const projectRouter = express.Router();

projectRouter.get("/", (req, res) => {
  db.get()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The projects information could not be retrieved." });
    });
});

projectRouter.get("/:id", (req, res) => {
  projectId = req.params.id;
  db.get(projectId)
    .then(project => {
      if (project) {
        res.status(200).json(project);
      } else {
        res
          .status(404)
          .json({ error: "The project with the specified ID does not exist." });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The project information could not be retrieved." });
    });
});

projectRouter.get("/actions/:projectId", (req, res) => {
  console.log(req.params.projectId);
  db.getProjectActions(req.params.projectId)
    .then(project => {
      console.log(project);
      if (project) {
        res.status(200).json(project);
      } else {
        res
          .status(404)
          .json({ error: "The project with the specified ID does not exist." });
      }
    })
    .catch(err => {
      res.status(500).json({ error: "there was an error" });
    });
});
projectRouter.post("/", (req, res) => {
  const newName = req.body;
  const newDescription = req.body;
  console.log("request body: ", newName && newDescription);

  if (newName.name && newDescription.description && newName.id) {
    db.insert(newName && newDescription)
      .then(project => {
        res.status(201).json(project);
      })
      .catch(err => {
        res
          .status(400)
          .json({
            errorMessage: "Please provide name and description for the project."
          });
      });
  } else {
    res.status(500).json({
      error: "There was an error while saving the project to the database"
    });
  }
});

projectRouter.delete("/:id", (req, res) => {
  const projectId = req.params.id;
  db.remove(projectId)
    .then(deleted => {
      console.log(deleted);
      if (deleted) {
        res.status(200).json(deleted);
      } else {
        res
          .status(404)
          .json({ error: "The project with the specified ID does not exist." });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: err,
        message: "The project could not be removed"
      });
    });
});

projectRouter.put("/:id", (req, res) => {
  const projectId = req.params.id;
  const updateProject = req.body;

  if (updateProject.name && updateProject.description) {
    db.update(projectId, updateProject)
      .then(projects => {
        res.status(200).json(projects);
      })
      .catch(err => {
        res.status(500).json({
          error: err,
          message: "The project information could not be modified."
        });
      });
  } else {
    res
      .status(400)
      .json({ message: "Please provide a name for the projects." });
  }
});

module.exports = projectRouter;
