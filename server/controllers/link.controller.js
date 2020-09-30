const db = require("../models");
const appConfig = require("../config/app.config.js");
const Link = db.links;
const Hit = db.hits;
const Op = db.Sequelize.Op;
var uuid = require("uuid4");
var md5 = require('md5');
const host = "http://localhost:8080/";

// create short link and save in links table
exports.generate = async (req, res) => {
    if (!req.body.link) {
        res.status(400).json({ message: "You must provide link field." });
    } else {
        let code = "";
        let hash = md5(req.body.link);
        // check if we already created short link for given link by finding md5sum
        let link = await Link.findOne({ where: { hash: hash } });
        if (link) {
            res.json({ link: host + link.shortLink });
        } else {
            //we are looping until we find code which was not generated before
            while (true) {
                // as per the problem statement each shorten code will be of length 5
                // this limits our application to store at max 36C5 = 376992 links
                code = uuid().slice(0, 5);
                // find item with generated code in links table
                let link = await Link.findOne({ where: { shortLink: code } });
                // if link is null means code is unique and have not been used till now
                if (!link) {
                    let expiresAt = new Date();
                    // setting expire time for link
                    expiresAt.setMinutes(expiresAt.getMinutes() + appConfig.EXPIRE);
                    // since full link can be very big in size we store md5sum for full link in table
                    const item = {
                        fullLink: req.body.link,
                        shortLink: code,
                        hash: hash,
                        createdAt: new Date(),
                        expiresAt: expiresAt
                    }
                    // save link in database table
                    Link.create(item);
                    break;
                }
            }
            // sending generated shorten url to user
            res.json({ link: host + code });
        }
    }
};

// redirect to user using shorten code
exports.redirect = async (req, res) => {
    let link = await Link.findOne({ where: { shortLink: req.params.code, expiresAt: { [Op.gte]: new Date() } } });
    if (!link) {
        res.status(410).json({ message: "Given shorten URL has been expired." });
    } else {
        let split = req.headers["accept-language"].split(",");
        let language = split[0];
        let item = {
            ip: req.ip,
            linkId: link.id,
            language: language,
            createdAt: new Date()
        }
        Hit.create(item);
        res.redirect(link.fullLink);
    }
};

// create short link and save in links table
exports.stats = async (req, res) => {
    let links = await Link.findAll({
        attributes: {
            include: [[db.Sequelize.fn("COUNT", db.Sequelize.col("hits.id")), "hits"]]
        },
        include: [{
            model: Hit, attributes: [],
            as: "hits"
        }],
        group: ['links.id'],
        raw: true
    });
    let stats = [];
    for (link of links) {
        // get the top languages of users in desc order for each link
        let hits = await Hit.findAll({
            attributes: {
                include: ["language", [db.Sequelize.fn("COUNT", db.Sequelize.col("language")), "count"]]
            },
            where: { linkId: link.id },
            group: ["language"],
            order: [[db.Sequelize.col("count"), "DESC"]]
        });
        let languages = [];
        hits.forEach((h, i) => {
            languages.push(h.language);
        });
        let item = {
            fullLink: link.fullLink,
            shortLink: host + link.shortLink,
            hits: link.hits,
            languages: languages.join(",")
        };
        stats.push(item);
    }
    res.json(stats);
};