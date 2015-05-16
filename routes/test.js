var express = require("express");
var superagent = require("superagent");
var cheerio = require("cheerio");
var Q = require("q");
var router = express.Router();

router.get("/", function (req, res, next) {
    var cnbetaUrl = "http://www.cnbeta.com/";
    superagent.get(cnbetaUrl)
        .end(function (err, sres) {
            if (err) {
                return next(err);
            }

            var result = [];
            var newsUrl = [];
            var $ = cheerio.load(sres.text);
            $(".alllist .items_area .item").each(function (idx, elem) {
                var $elem = $(elem);
                var link = $elem.find(".title a");
                newsUrl.push(cnbetaUrl + link.attr("href"));
                result.push({
                    title: link.text(),
                    content: $elem.find(".newsinfo p").text(),
                    img: ""
                });
            });

            var promises = [];
            newsUrl.map(function (url) {
                var promise = function (url) {
                    var deferred = Q.defer(url);
                    superagent.get(url).end(function (err, snres) {
                        if (err) {
                            return deferred.reject(err);
                        }

                        var $ = cheerio.load(snres.text);
                        var img = $(".introduction").find("img").attr("src");
                        console.log("img: " + img);
                        return deferred.resolve(img);
                    });
                    return deferred.promise;
                };
                promises.push(promise(url));
            });
            Q.all(promises).then(function (results) {
                result.map(function (item, id) {
                    item.img = results[id];
                });
                res.send(result);
            });
        });
});

router.get("/md", function (req, res, next) {
    res.render('md', {
        content: "#Welcome To My Markdown Editor"
    });
});

module.exports = router;