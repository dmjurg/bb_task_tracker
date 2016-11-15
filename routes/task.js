'use strict';

const express = require('express');

const Task = require('../models/task');

const router = express.Router();

// routes ending with /tasks
router.route('/tasks')
  .post((req, res) => {

    const task = new Task ({
      description: req.body.description,
      claimedBy: req.body.claimedBy,
      reviewedBy: req.body.reviewedBy,
      notes: req.body.notes,
      status: req.body.status
    });

    task.save((err) => {
      if(err) {
        return res.send(err)
      }

      return res.json({ message: 'New task created!' })
    });
  })

  .get((req, res) => {
    Task.find({}).sort({ status: -1 })
        .exec((err, task) => {
          if(err) {
            return res.send(err);
          }

          return res.json(task);
        });
  });

// routes starting with /tasks/:id
router.route('/tasks/:id')
  .get((req, res) => {
    Task.findById(req.params.id, (err, task) => {
      if(err) {
        return res.send(err);
      }

      return res.json(task);
    });
  })
  .put((req, res) => {
    Task.findByIdAndUpdate(req.params.id, {
      description: req.body.description,
      claimedBy: req.body.claimedBy,
      reviewedBy: req.body.reviewedBy,
      notes: req.body.notes,
      status: req.body.status
    }, (err) => {
      if(err) {
        return res.send(err);
      }

      return res.json({ message: 'Task updated successfully' });
    });
  })
  .delete((req, res) => {
    Task.remove({ _id: req.params.id }, (err) => {
      if(err) {
        return res.send(err);
      }

      return res.json({ message: 'Task has been removed' });
    });
  });

module.exports = router;

