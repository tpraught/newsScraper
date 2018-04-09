var axios = require("axios");
var cheerio = require("cheerio");
var db = require("../models");


module.exports = function(app) {
    // A GET route for scraping the onion website
    app.get("/scrape", function(req, res) {
        // First, we grab the body of the html with request
        axios.get("https://local.theonion.com/").then(function(response) {
        // Then, we load that into cheerio and save it to $ for a shorthand selector
        var $ = cheerio.load(response.data);
    
        // Now, we grab every h2 within an article tag, and do the following:
        $("article .inner").each(function(i, element) {
            // Save an empty result object
            var result = {};
    
            // Add the text and href of every link, and save them as properties of the result object
            result.headline = $(this)
                .children("header")
                .children("h1")
                .text()
                .trim();
            result.summary = $(this)
                .children("div")
                .text()
                .trim();
            result.link = $(this)
                .children("a")
                .attr("href");
    
            // Create a new Article using the `result` object built from scraping
            db.Headline.create(result)
            .then(function(dbHeadline) {
                // View the added result in the console
                console.log("Scrape GET ", dbHeadline);
            })
            .catch(function(err) {
                // If an error occurred, send it to the client
                return res.json(err);
            });
        });
    
        // If we were able to successfully scrape and save an Article, send a message to the client
        res.send("Scrape Complete");
        });
    });

    // A GET route for getting all of the headlines
    app.get("/headlines", function(res, req) {
        db.Headline.find({})
            .then(function(dbHeadline) {
                res.json(dbHeadline);
            })
            .catch(function(err) {
                res.json(err);
            });
    });

    // A GET route for getting onely one headline
    app.get("/headlines/:id", function(res, req) {
        db.Headline.findOne({
            where: { id: req.params.id }
        })
        .then(function(dbHeadline) {
            return res.render("index", { headline, dbheadline });
        });
    });

    // A DELETE route for removing a headline
    app.delete("/headlines/:id", function(res, req) {
        db.Headline.destroy({
            where: { id: req.params.id }
        })
        .then(function(dbHeadline) {
            res.json(dbHeadline);
        });
    });
};