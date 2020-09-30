module.exports = (sequelize, Sequelize) => {
    const Link = sequelize.define("links", {
        // primary key for table links
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        // here we store full link given by the user
        fullLink: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        // to store short link created by our application
        shortLink: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        // since full link can be very large text we save md5sum
        // which will be used for duplicate generation check
        hash: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE
        },
        expiresAt: {
            allowNull: false,
            type: Sequelize.DATE
        }
    });

    Link.associate = function (models) {
        Link.hasMany(models.Hit, {
            foreignKey: "linkId",
            as: "hits",
        })
    }
    return Link;
};