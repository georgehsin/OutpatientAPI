var pt = require('../controllers/physicalTherapists.js');

module.exports = function(app){
  app.get('/physicalTherapists/:location', pt.summary);
  // app.get('/physicalTherapists/sorted-rating', pt.summaryWithRatings);
  app.get('/physicalTherapists/:location/sorted-rating', pt.summaryWithRatings);
}