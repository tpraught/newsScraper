var db = require("../models");

module.exports = function(app) {
    
    // GET route for displaying all headlines
    app.get("/"), function(req, res) {

        console.log("TEsting" + req);

        db.Headline.find({})
            .then(function(dbHeadline) {
                console.log("dbheadline", dbHeadline);
                res.render("index", { headlines: dbHeadline });
            })
            .catch(function(err) {
                res.json(err)
            });
    }

    // GET route for getting all saved headlines
    // app.get("/saved"), function(req, res) {
    //     db.Headline.find({ saved: true }).then(function(dbHeadline) {
    //        res.render("saved", {headline: dbHeadline});
    //     });
    // }
};