var faker = require('faker');
faker.locale = "pt_BR";
randomBool =  function() {
  return Math.random() >= 0.5;
}

// index.js
module.exports = function() {
  var data = {
    restaurants: [],
    centers: [],
    news: []
  }
  var centersQuantity = 30;
  var centersPool = [];
  createCenters();

  // Create 150 restaurants
  for (var i = 0; i < 150; i++) {
    var number = Math.floor(Math.random() * centersQuantity) + 0;
    var center = centersPool[number];

    data.restaurants.push({
      id: i,
      title: faker.name.title(),
      center: center.title,
      state: center.state,
      city: center.city,
      neighborhood: faker.name.firstName(),
      description: faker.lorem.paragraph(),
      openHours: '',
      address: faker.address.streetAddress(),
      phone: faker.phone.phoneNumber(),
      M4T: randomBool(),
      photoUrl: faker.image.image(),
      created: faker.date.past(),
      updated: faker.date.past(),
      lat: parseFloat(faker.address.latitude()),
      lng: parseFloat(faker.address.longitude())
    })
  }
  // Create 30 centers
  for (var i = 0; i < centersQuantity; i++) {
    data.centers.push(centersPool[i])
  }
  // Create 50 news
  for (var i = 0; i < 50; i++) {
    var number = Math.floor(Math.random() * centersQuantity) + 0;
    var center = centersPool[number];

    data.news.push({
      id: i,
      center: center.title,
      title: faker.name.title(),
      caption: faker.lorem.sentence(),
      text: faker.lorem.paragraphs(),
      photoUrl: faker.image.image(),
      created: faker.date.past(),
      updated: faker.date.past(),
      event: randomBool(),
    })
  }

  function createCenters() {
    var result = [];

    for (var i = 0; i < centersQuantity; i++) {
      var instance = {};
      instance.id = i;
      instance.title = "Polo " + faker.address.city();
      instance.state = faker.address.stateAbbr();
      instance.city = faker.address.city();
      instance.neighborhoods = createNeighborhoods();
      instance.text = faker.lorem.paragraphs();
      instance.photoUrl = faker.image.image();
      instance.openHours = faker.random.number();
      instance.phone = faker.phone.phoneNumber();
      instance.homepage = faker.internet.url();
      instance.created = faker.date.past();
      instance.updated = faker.date.past();
      instance.lat = parseFloat(faker.address.latitude());
      instance.lng = parseFloat(faker.address.longitude());
      instance.distance = faker.random.number();
      instance.restaurants = '';
      result.push(instance);
    }
    centersPool = result;
  }

  function createNeighborhoods() {
    var ngbs = [];
    for (var i = 0; i < Math.floor(Math.random() * 4) + 1; i++) {
      ngbs.push(faker.name.findName())
    }
    return ngbs;
  }


  //return the json
  return data
}
