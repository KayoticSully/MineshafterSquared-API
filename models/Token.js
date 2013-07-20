/**
 * Data
 */
module.exports = function(sequelize, DataTypes) {
    return sequelize.define("token", {
        client_token     : {
            type : DataTypes.STRING,
            allowNull : false,
            unique : true,
            validate : {
                isUUID : 4
            }
        },
        
        access_token     : {
            type : DataTypes.STRING,
            allowNull : false,
            unique : true,
            validate : {
                is : ["[0-9a-f]",'i'],
                len : 32
            }
        }
    },
    // configuration
    {
        underscored: true
    });
}