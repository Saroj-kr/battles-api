var Q = require('q');
var db = require('./db').get();
var assert = require('assert');

var service = {};

service.getList = getList;
service.getCount = getCount;
service.getStats = getStats;
service.Search = Search;


module.exports = service;


function getList() {
    var deferred = Q.defer();
    db.find({}, {"location": 1, "_id": 0}, function (err, locations) {
        
        if (err) deferred.reject(err.name + ': ' + err.message);

        if(locations) {
            assert.equal(null, err);
            deferred.resolve(locations);
        } else {
            deferred.resolve();
        }

    })

    return deferred.promise;
    
}

function getCount() {
    var deferred = Q.defer();

    db.count({}, function (err, count) {
        
        if (err) deferred.reject(err.name + ': ' + err.message);
        
        if(count) {
            assert.equal(null, err);
            deferred.resolve(count);
        } else {
            deferred.resolve();
        }

    })

    return deferred.promise;

}

// function buildQuery(query, params) {
//     if(query == "")
//         query = "{" + params;
//     else
//         query = query + "," + params;

//     return query;
// }

function Search(req) {
    var deferred = Q.defer();
    var query = {};

    // if(req.query.king)
    //     query = buildQuery(query,"$or:[ {'attacker_king':'" + req.query.king + "'}, {'defender_king':'" + req.query.king + "'}]");
    // if(req.query.location)
    //     query = buildQuery(query, "'location':'" + req.query.location + "'");
    // if(req.query.type)
    //     query = buildQuery(query, "'battle_type':'" + req.query.type + "'");
    // if(req.query.commander)
    //     query = buildQuery(query, "$or:[ {'attacker_commander': '" + req.query.type + "'},{'defender_commander':'" + req.query.type + "'}]");
    // if(req.query.name)
    //     query = buildQuery(query, "'name':'" + req.query.name + "'");
    if(req.query.king) {
        query["$or"] = [{"attacker_king": req.query.king },{"defender_king": req.query.king }];
    }
    if(req.query.location)
        query["location"]=req.query.location;
    if(req.query.type)
        query["battle_type"] = req.query.type;
    if(req.query.name)
        query["name"] = req.query.name;

    // query = query + "}";
    // console.log(query)

    db.find(query, {}, function (err, locations) {
        
        if (err) deferred.reject(err.name + ': ' + err.message);

        if(locations) {
            assert.equal(null, err);
            deferred.resolve(locations);
        } else {
            deferred.resolve();
        }

    })

    return deferred.promise;
}

function getStats() {
    var deferred = Q.defer();
    
    Promise.all([    
        db.aggregate([
            {
                $group: {
                    _id: '$attacker_king',  //$region is the column name in collection
                    count: {$sum: 1}
                }
            },
            {
                $sort: {
                    "count": -1
                }
            },
            {
                $limit: 1
            }
        ]),
        db.aggregate([
            {
                $group: {
                    _id: '$defender_king',  //$region is the column name in collection
                    count: {$sum: 1}
                }
            },
            {
                $sort: {
                    "count": -1
                }
            },
            {
                $limit: 1
            }
        ]),
        db.aggregate([
            {
                $group: {
                    _id: '$region',  //$region is the column name in collection
                    count: {$sum: 1}
                }
            },
            {
                $sort: {
                    "count": -1
                }
            },
            {
                $limit: 1
            }
        ]),
        db.aggregate([
            {
                $group: {
                    _id: '$name',  //$region is the column name in collection
                    count: {$sum: 1}
                }
            },
            {
                $sort: {
                    "count": -1
                }
            },
            {
                $limit: 1
            }
        ]),
        db.count({"attacker_outcome":"win"}),
        db.count({"attacker_outcome":"loss"}),
        db.find().distinct('battle_type'),
        db.aggregate([
            {
                $group: {
                    _id: null,  //$region is the column name in collection
                    avg: {$avg: "$defender_size"},
                    min: {$min: "$defender_size"},
                    max: {$max: "$defender_size"}
                }
            }
        ])
    ]).then(
        ([ma_attackerKing, ma_defenderKing, ma_region, ma_name, ao_win, ao_loss, battleType, ds_avg]) =>
        {
            console.log()
        result = {
            'most_active':{
                'attacker_king' : ma_attackerKing[0]._id,
                'defender_king': ma_defenderKing[0]._id,
                'region': ma_region[0]._id,
                'name': ma_name[0]._id
                },
            'attacker_outcome':{
                'win': ao_win,
                'loss': ao_loss
                },
            'battle_type': battleType, // unique battle types
            'defender_size':{
                'average': ds_avg[0].avg,
                'min': ds_avg[0].min,
                'max': ds_avg[0].max
                }
                
        };

        deferred.resolve(result);
    });
        

    return deferred.promise;
}

