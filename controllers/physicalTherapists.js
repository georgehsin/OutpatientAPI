const yelp = require('yelp-fusion');
const client = yelp.client('JQHzvk53jGwhRKU1oBldll7pXjxn9vViCFzT4xAQ9q6qm5y86WCVwdYk0YW5uhdOROkP2an3eoWyAGQlDR05s99V8alo4sbSDAd-N1vm0am3zDeCkBrwX-CF8V8KWXYx');

module.exports = {
  summary: function(req, res) {
    const location = req.params.location
    index(location).then(businesses => {
      summary = {
        totalPTs: businesses.length,
        withRatings: 0,
        averageRating: 0,
        reviews: 0 
      }
      // console.log(businesses)
      businesses.forEach(business => {
        summary['reviews'] += business.review_count
        summary['averageRating'] += business.rating
        if (business.rating != 0) {
          summary['withRatings'] += 1
        }
      });
      summary['averageRating'] /= businesses.length
      res.json(summary)
    }).catch(e => {
      console.log(e);
    });
  },

  summaryWithRatings: function(req, res) {
    const location = req.params.location
    index(location).then(businesses => {
      const filtered = businesses.filter(business => business.rating > 0 )
      .map(business => {
        return {
          name: business.name,
          rating: business.rating,
          reviews: business.review_count,
          address: business.location.address1
        }
      });
      filtered.sort(compareRating)
      res.json(filtered)
    }).catch(e => {
      console.log(e);
    });
  }
}

function index(location) {
  let results = [];
  return recursiveQuery(0, results, location).then(data => {
    console.log(data[0].location.city, data[0].location.state)
    return data;
  }).catch(e => {
    console.log(e);
  });
}

function recursiveQuery(offset, results, location) {
  return simpleQuery(offset, location).then(function(objects) {
    const businesses = objects.jsonBody.businesses
    // console.log(businesses.length, "businesses length")
    results = results.concat(businesses);
    if (businesses.length === 50) {
        offset += 50;
        return recursiveQuery(offset, results, location);
    } else {
        return results;
    }
  });
}

function simpleQuery(offset, location) {
  return client.search({
    categories: "physicaltherapy",
    limit: 50,
    offset: offset,
    location: location
  }).catch(e => {
    console.log(e);
  });
}

function compareRating(a, b) {
  const businessA = a.rating;
  const businessB = b.rating;

  let comparison = 0;
  if (businessA < businessB) {
    comparison = 1;
  } else if (businessA > businessB) {
    comparison = -1;
  }
  return comparison;
}
