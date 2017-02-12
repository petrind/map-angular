Origin = require('../models/').Origin;
Destination = require('../models/').Destination;

module.exports= {
  /**
   * Get a list of all origins using model.findAll()
   */
  index(req, res) {
    Origin.findAll({
      //Return all destinations that have a matching origin_id for each origin
      include: Destination
    })
      .then(function (origins) {
        res.status(200).json(origins);
      })
      .catch(function (error) {
        res.status(500).json(error);
      });
  },
  /**
   * Get an origin by the unique ID using model.findById()
   */
  show(req, res) {
    Origin.findById(req.params.id, {
      //Return all destinations that have a matching origin_id for the origin
      include: Destination
    })
    .then(function (origin) {
      res.status(200).json(origin);
    })
    .catch(function (error){
      res.status(500).json(error);
    });
  },

  /**
   * Create a new origin using model.create()
   */
  create(req, res) {
    Origin.create(req.body)
      .then(function (neworigin) {
        res.status(200).json(neworigin);
      })
      .catch(function (error){
        res.status(500).json(error);
      });
  },
  /**
   * Edit an existing origin details using model.update()
   */
  update(req, res) {
    Origin.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    .then(function (updatedRecords) {
      res.status(200).json(updatedRecords);
    })
    .catch(function (error){
      res.status(500).json(error);
    });
  },
  /**
   * Delete an existing origin by the unique ID using model.destroy()
   */
  delete(req, res) {
    Origin.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(function (deletedRecords) {
      res.status(200).json(deletedRecords);
    })
    .catch(function (error){
      res.status(500).json(error);
    });
  }
};
