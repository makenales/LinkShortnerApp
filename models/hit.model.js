module.exports = (sequelize, Sequelize) => {
    const Hit = sequelize.define("hits", {
        // primary key for table hits
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        // linkId which is foreign key to table links
        linkId: {
            type: Sequelize.INTEGER,
            references: {
                model: "links",
                key: "id",
                as: "linkId",
            }
        },
        // ip of the user who visited short link
        ip: {
            type: Sequelize.STRING,
            allowNull: false
        },
        // coutry of the user who visited short link
        country: {
            type: Sequelize.STRING,
            allowNull: false
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE
        }
    });
    return Hit;
};