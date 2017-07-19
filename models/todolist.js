'use strict';
module.exports = function(sequelize, DataTypes) {
  var todoList = sequelize.define('todoList', {
    item: DataTypes.STRING,
    complete: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return todoList;
};