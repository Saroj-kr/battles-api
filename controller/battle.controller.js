var express = require('express');
var router = express.Router();
var battleSvc = require("../services/battle.service");

router.get('/list', getList);
router.get('/count', getCount);
router.get('/stats', getStats);
router.get('/search', Search);


function getList(req, res) {
    battleSvc.getList()
        .then(function (sucess) {
            if (sucess) {
                res.send(sucess);
            } else {
                res.send();
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        }); 
}

function getCount(req, res) {

    battleSvc.getCount()
        .then(function (sucess) {
            if (sucess) {
                res.send("Total battles occured : " + sucess);
            } else {
                res.send();
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        }); 

}

function getStats(req, res) {

    battleSvc.getStats(req)
        .then(function (sucess) {
            if (sucess) {
                res.send(sucess);
            } else {
                res.send();
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        }); 

}

function Search(req, res) {

    battleSvc.Search(req)
        .then(function (sucess) {
            if (sucess) {
                res.send(sucess);
            } else {
                res.send();
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        }); 

}


module.exports = router;