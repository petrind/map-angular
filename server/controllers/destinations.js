Destination = require('../models/').Destination;

module.exports= {

  /**
   * Get a list of all destinations using model.findAll()   
   */
  index(req, res) {
    Destination.findAll()
      .then(function (destinations) {
        res.status(200).json(destinations);
      })
      .catch(function (error) {
        res.status(500).json(error);
      });
  },

  /**
   * Get a destination by it's unique ID using model.findById()
   */
  show(req, res) {
    Destination.findById(req.params.id)
    .then(function (destination) {
      res.status(200).json(destination);
    })
    .catch(function (error){
      res.status(500).json(error);
    });
  },
  /**
   * Create a new destination using model.create()
   */
  create(req, res) {
    Destination.create(req.body)
      .then(function (newDestination) {
        res.status(200).json(newDestination);
      })
      .catch(function (error) {
        res.status(500).json(error);
      });
  },
  /**
   * Edit an existing destination using model.update()
   */
  update(req, res) {
    Destination.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    .then(function (updatedRecords) {
      res.status(200).json(updatedRecords);
    })
    .catch(function (error) {
      res.status(500).json(error);
    });
  },
  /**
   * Delete an existing destination by it's unique ID using model.destroy()
   */
  delete(req, res) {
    Destination.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(function (deletedRecords) {
      res.status(200).json(deletedRecords);
    })
    .catch(function (error) {
      res.status(500).json(error);
    });
  }
};
