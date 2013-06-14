/**
 * Data
 */
module.exports = function(sequelize, DataTypes) {
    return sequelize.define("data", {
        key     : DataTypes.STRING,
        value   : DataTypes.STRING,
    },
    // configuration
    {
        underscored: true
    });
}