'use strict';
module.exports = function(sequelize, DataTypes) {
  var Origin = sequelize.define('Origin', {
    label: DataTypes.STRING,
    description: DataTypes.TEXT,
    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Origin.hasMany(models.Destination,{
          onDelete: 'cascade'
        });
      }
    }
  });
  return Origin;
};