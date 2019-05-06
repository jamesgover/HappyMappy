let express = require('express');
let router = express.Router();

let {request, GraphQLClient} = require('graphql-request');

let endpoint = "http://" + process.env.GRAPHQL_SERVER + ":5000/graphql";
console.log("😄🗺️ connecting to GraphQL on " + process.env.GRAPHQL_SERVER);
const client = new GraphQLClient(endpoint, { headers: {} });

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
  res.render('index', {title: 'Happy Mappy'});
});

router.get('/query', function(req, res, next) {
  client.request(query).then(data => res.send(data));
});

module.exports = router;
