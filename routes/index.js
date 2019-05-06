let express = require('express');
let router = express.Router();

let {request, GraphQLClient} = require('graphql-request');

let endpoint = "http://" + process.env.GRAPHQL_SERVER + ":5000/graphql";
console.log("😄🗺️ connecting to GraphQL on " + process.env.GRAPHQL_SERVER);
const client = new GraphQLClient(endpoint, { headers: {} });

// Query for the location connections between nodes
const query = `{
  allEthereumconnections {
    nodes {
      ethereumnodeByNeighbour {
        lat
        long
      }
      ethereumnodeByNode {
        lat
        long
      }
    }
  }
}`;

/* GET home page. */
router.get('/', function(req, res, next) {
  client.request(query).then(data => {
    // TODO: Fix this data conversion weirdness plz
    data = data["allEthereumconnections"]["nodes"];
    let result = [];
    for (let d in data) {
      let item = data[d];
      let start = item['ethereumnodeByNeighbour'];
      let end = item['ethereumnodeByNode'];
      result.push([[start['lat'], start['long']], [end['lat'], end['long']]])
    }
    console.log(result);
    res.render('map', {
      title: 'Happy Mappy',
      locationConnections: result
    });
  }).catch(next);
});

router.get('/query', function(req, res, next) {
  client.request(query).then(data => res.send(data));
});

module.exports = router;
