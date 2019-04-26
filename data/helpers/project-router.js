const express = require("express");

const db = require("../dbConfig.js");
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

projectRouter.get("/projects/:userId", (req, res) => {
  console.log(req.params.userId);
  db.getProjectActions(req.params.userId)
    .then(project => {
      console.log(project);
      if (post) {
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
  const newProject = req.body;
  console.log("request body: ", newProject);

  if (newProject.name && newProject.id) {
    db.insert(newProject)
      .then(user => {
        res.status(201).json(project);
      })
      .catch(err => {
        res
          .status(400)
          .json({ errorMessage: "Please provide name and description for the project." });
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
  const updateInfo = req.body;
  if (updateInfo.name) {
    db.update(projectId, updateInfo)
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
    res.status(400).json({ message: "Please provide a name for the projects." });
  }
});

module.exports = projectRouter;
