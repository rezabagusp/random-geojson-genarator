import fs from 'fs'

/**
* Generates number of random geolocation points given a center and a radius.
* @param  {Object} center A JS object with lat and lng attributes.
* @param  {number} radius Radius in meters.
* @param {number} count Number of points to generate.
* @return {array} Array of Objects with lat and lng attributes.
*/
function generateRandomPoints(center, radius, count) {
  var points = [];
  for (var i=0; i<count; i++) {
    const newPoint = generateRandomPoint(center, radius)
    // console.log("newPoint", newPoint)
    points.push(newPoint);

  }
  return points;
}


/**
* Generates number of random geolocation points given a center and a radius.
* Reference URL: http://goo.gl/KWcPE.
* @param  {Object} center A JS object with lat and lng attributes.
* @param  {number} radius Radius in meters.
* @return {Object} The generated random points as JS object with lat and lng attributes.
*/
function generateRandomPoint(center, radius) {
  var x0 = center.lng;
  var y0 = center.lat;
  // Convert Radius from meters to degrees.
  var rd = radius/111300;

  var u = Math.random();
  var v = Math.random();

  var w = rd * Math.sqrt(u);
  var t = 2 * Math.PI * v;
  var x = w * Math.cos(t);
  var y = w * Math.sin(t);

  var xp = x/Math.cos(y0);

  return {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [xp+x0, y+y0],
    }
  }
}

const NATIONAL_MUSEUM_INDO_CENTER = {
  lat: -6.175481520428874, 
  lng: 106.82178979916657
}

const COUNT_DATA_IN_KILO = 25
// Usage Example.
// Generates 100 points that is in a 1km radius from the given lat and lng point.
var randomGeoPoints = generateRandomPoints(NATIONAL_MUSEUM_INDO_CENTER, 100 * 1000, COUNT_DATA_IN_KILO * 1000);

const resultGeoJSON = {
  type: "FeatureCollection",
  features: randomGeoPoints
}

// stringify JSON Object
var jsonContent = JSON.stringify(resultGeoJSON);
 
fs.writeFile(`random_points_geoJson_${COUNT_DATA_IN_KILO}k.geojson`, jsonContent, 'utf8', function (err) {
    if (err) {
      console.log("An error occured while writing JSON Object to File.");
      console.log(err);

      return 
    }
 
    console.log("JSON file has been saved.");
});