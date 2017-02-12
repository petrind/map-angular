'use strict';
module.exports = function(sequelize, DataTypes) {
  var Destination = sequelize.define('Destination', {
    label: DataTypes.STRING,
    description: DataTypes.TEXT,
    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT,
    distance: DataTypes.FLOAT,
    origin_id: DataTypes.INTEGER
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Destination;
};