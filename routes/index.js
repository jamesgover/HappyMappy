let express = require('express');
let router = express.Router();
let Handlebars = require('handlebars');

let {request, GraphQLClient} = require('graphql-request');

let endpoint = "http://" + process.env.GRAPHQL_SERVER + ":5000/graphql";
console.log("😄🗺️ connecting to GraphQL on " + process.env.GRAPHQL_SERVER);
const client = new GraphQLClient(endpoint, { headers: {} });

// Query for the location connections between nodes
const query = `{
  allEthereumconnections {
    nodes {
      ethereumnodeByNeighbour {
        ethereumlocationByLoc {
          lat
          long
        }
      }
      ethereumnodeByNode {
        ethereumlocationByLoc {
          lat
          long
        }
      }
      distance
    }
  }
  
  allEthereumlocations {
    nodes {
      lat
      long
      density
      name
      ethereumnodesByLoc {
        nodes {
          id
          ip
        }
      }
    }
  }
}`;

/* GET home page. */
router.get('/', function(req, res, next) {
  client.request(query).then(data => {
    res.render('map', {
      title: 'Happy Mappy',
      data: new Handlebars.SafeString(JSON.stringify(data)),
    });
  }).catch(next);
});

router.get('/query', function(req, res, next) {
  client.request(query).then(data => res.send(data));
});

module.exports = router;
