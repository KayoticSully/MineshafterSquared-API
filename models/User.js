/**
 * User
 */
module.exports = function(sequelize, DataTypes) {
    return sequelize.define("data", {
        usertype_id         : DataTypes.INTEGER,
        email               : DataTypes.STRING,
        username            : DataTypes.STRING,
        hashed_password     : DataTypes.STRING,
        session             : DataTypes.STRING,
        server              : DataTypes.STRING,
        last_game_login     : DataTypes.INTEGER,
        last_web_login      : DataTypes.INTEGER,
        premium             : DataTypes.BOOLEAN,
        remember_me         : DataTypes.STRING
    },
    // configuration
    {
        underscored: true,
        
        classMethods: {
            login : function(username, password) {
                
            }
        }
    });
}