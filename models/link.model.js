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
            allowNull: false
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