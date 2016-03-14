var faker = require('faker');
faker.locale = "pt_BR";

function randomLat() {
  var rioLat = faker.random.number({'min': -21, 'max': -24});
  return rioLat + '.' + faker.random.number()
}
function randomLng() {
  var rioLng = faker.random.number({'min': -41, 'max': -44});
  return rioLng + '.' + faker.random.number()
}
function randomPhotos() {
  var result = [];
  var x = faker.random.number({'min': 1, 'max': 5})

  for (var i = 0; i < x; i++) {
    var photo = faker.image.image();
    result.push(photo)
  }
  return result;
}

// index.js
module.exports = function() {
  var data = {
    centers: [],
    restaurants: [],
    news: []
  }
  var polos = [
    'Polo Paraty',
    'Polo Sabores do Interior',
    'Polo Ipiabas',
    'Polo Lumiar & São Pedro da Serra',
    'Polo Angra Gastronômica',
    'Polo Orla Gastronômica',
    'Polo Jardim Icaraí',
    'Polo Pedra de Guaratiba',
    'Polo Jardim Oceânico',
    'Polo Lido',
    'Polo Botafogo'
  ]
  var centersQuantity = polos.length;
  var centersPool = [];
  createCenters();
  var restaurantsQuantity = 150;
  var newsQuantity = 150;

  // Create 150 restaurants
  for (var i = 0; i < restaurantsQuantity; i++) {
    var number = Math.floor(Math.random() * centersQuantity) + 0;
    var center = centersPool[number];
    var rest = {
      id: i,
      title: faker.address.city(),
      message: faker.address.city(),
      center: center.title.valor,
      state: center.state,
      city: center.city,
      neighborhood: faker.name.firstName(),
      description: {
          valor: faker.lorem.paragraphs(),
          idioma: 'pt-BR',
          traducoes: [
            {
              valor: faker.lorem.paragraphs(),
              idioma: 'en',
            },
            {
              valor: faker.lorem.paragraphs(),
              idioma: 'es',
            }
          ]
      },
      openHours: faker.random.number(),
      address: faker.address.streetAddress(),
      phone: faker.phone.phoneNumber(),
      M4T: faker.random.boolean(),
      homepage: faker.internet.url(),
      social: faker.internet.url(),
      photoUrl: faker.image.image(),
      created: faker.date.past(),
      updated: faker.date.past(),
      lat: parseFloat((JSON.stringify(center.lat)).slice(0,6) + JSON.stringify(faker.random.number({'min': 0, 'max': 999}))),
      lng:  parseFloat((JSON.stringify(center.lng)).slice(0,6) + JSON.stringify(faker.random.number({'min': 0, 'max': 99})))

      // lat: parseFloat(randomLat()),
      // lng:  parseFloat(randomLng())
    }
    data.restaurants.push(rest)
  }
  // Create 30 centers
  for (var i = 0; i < centersQuantity; i++) {
    data.centers.push(centersPool[i])
  }
  // Create 50 news
  for (var i = 0; i < newsQuantity; i++) {
    var number = Math.floor(Math.random() * centersQuantity) + 0;
    var center = centersPool[number];
    var photos = randomPhotos();
    var instanceNews = {
      id: i,
      center: center.title.valor,
      title: faker.name.title(),
      caption: faker.lorem.sentence(),
      text: faker.lorem.paragraphs(),
      photos: photos,
      created: faker.date.past(),
      updated: faker.date.past(),
      event: faker.random.boolean(),
    }
    data.news.push(instanceNews)
  }

  function createCenters() {
    var result = [];

    for (var i = 0; i < centersQuantity; i++) {
      var instance = {};
      instance.id = i;
      instance.title = {
          valor: polos[i],
          idioma: 'pt-BR',
          traducoes: [
            {
              valor: polos[i] + ' EN',
              idioma: 'en',
            },
            {
              valor: polos[i] + ' ES',
              idioma: 'es',
            }
          ]
      };
      instance.message = polos[i];
      instance.state = 'RJ';
      instance.city = faker.address.city();
      instance.neighborhoods = createNeighborhoods();
      instance.description = {
          valor: faker.lorem.paragraphs(),
          idioma: 'pt-BR',
          traducoes: [
            {
              valor: faker.lorem.paragraphs(),
              idioma: 'en',
            },
            {
              valor: faker.lorem.paragraphs(),
              idioma: 'es',
            }
          ]
      };
      instance.photoUrl = faker.image.image();
      instance.openHours = faker.random.number();
      instance.phone = faker.phone.phoneNumber();
      instance.homepage = faker.internet.url();
      instance.social = faker.internet.url();
      instance.created = faker.date.past();
      instance.updated = faker.date.past();
      instance.lat = parseFloat(randomLat());
      instance.lng = parseFloat(randomLng());
      instance.distance = faker.random.number({'min': 0.1, 'max': 352 });
      instance.restaurants = faker.random.number({'min': 1, 'max': 15});
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
