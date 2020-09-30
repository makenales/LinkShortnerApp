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
        // language of the user who visited short link
        language: {
            type: Sequelize.STRING,
            allowNull: false
        },
        // I was going to use https://www.npmjs.com/package/geoip-lite for getting
        // country from ip. but its paid service so skipped it.
        // I am now saving language of the user.
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE
        }
    });
    return Hit;
};