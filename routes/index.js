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

const ipQuery = `{
  allEthereumconnections {
    nodes {
      ethereumnodeByNode {
        ip
      }
      ethereumnodeByNeighbour {
        ip
      }
    }
  }
}`;

const locQuery = `{
  allEthereumlocations {
    nodes {
      loc
      name
    }
  }
  allEthereumnodes {
    nodes {
      id
      ip
      loc
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

/* 3D view yo */
router.get('/3d', function(req, res, next) {
  client.request(ipQuery).then(data => {
    res.render('3d', {
      title: 'Happy Mappy 3D',
      data: new Handlebars.SafeString(JSON.stringify(data)),
    });
  }).catch(next);
});

/* Node view yo */
router.get('/nodes', function(req, res, next) {
  client.request(locQuery).then(data => {
    res.render('nodes', {
      title: 'Node List',
      data: new Handlebars.SafeString(JSON.stringify(data)),
    });
  }).catch(next);
});

router.get('/query', function(req, res, next) {
  client.request(query).then(data => res.send(data));
});

module.exports = router;
