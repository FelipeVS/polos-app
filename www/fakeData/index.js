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
    {
      nome: 'Polo Paraty',
      lat: -23.221053,
      lng: -44.725117
    },
    {
      nome: 'Polo Sabores do Interior',
      lat: -21.926795,
      lng: -42.097893
    },
    {
      nome: 'Polo Ipiabas',
      lat: -22.376677,
      lng: -43.874947
    },
    {
      nome: 'Polo Lumiar & São Pedro da Serra',
      lat: -29.421456,
      lng: -51.512220
    },
    {
      nome: 'Polo Angra Gastronômica',
      lat: -23.000490,
      lng: -44.308080
    },
    {
      nome: 'Polo Orla Gastronômica',
      lat: -22.922900,
      lng: -43.093928
    },
    {
      nome: 'Polo Jardim Icaraí',
      lat: -22.901376,
      lng: -43.103181
    },
    {
      nome: 'Polo Pedra de Guaratiba',
      lat: -22.997980,
      lng: -43.637198
    },
    {
      nome: 'Polo Jardim Oceânico',
      lat: -23.010688,
      lng: -43.308543
    },
    {
      nome: 'Polo Lido',
      lat: -22.963867,
      lng: -43.174838
    },
    {
      nome: 'Polo Botafogo',
      lat: -22.9511872,
      lng: -43.1944118
    },
  ]
  var centersQuantity = polos.length;
  var centersPool = [];
  createCenters();
  var restaurantsQuantity = 100;
  var newsQuantity = 80;
  var newsTitlePool = [
    'Grande evento no Polo na próxima sexta',
    'Mais um restaurante integra o nosso polo',
    'Mercado gastronomico aquecido!',
    'Que tal um jantar?',
    'Vai uma pizza?',
    'Uma visão do mercado',
    'Turismo em alta',
    'Domingo é dia de feira!',
    'Evento com shows de grandes artistas',
    'Concurso de sobremesas',
    'Que venham os foodtrucks!',
    'Chorinho na praça',
    'Restaurante aposta na cultura',
    'Restaurante unidos',
    'Associação discute novas regras',
  ]

  // Create 100 restaurants
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
      openHours: 'Seg. a Sex. 17h as 00h. Sab, Dom e Feriados 16h as 01h',
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
      title: newsTitlePool[Math.floor(Math.random() * newsTitlePool.length) + 0],
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
          valor: polos[i].nome,
          idioma: 'pt-BR',
          traducoes: [
            {
              valor: polos[i].nome + ' EN',
              idioma: 'en',
            },
            {
              valor: polos[i].nome + ' ES',
              idioma: 'es',
            }
          ]
      };
      instance.message = polos[i].nome;
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
      instance.openHours = 'Seg. a Sex. 17h as 00h. Sab, Dom e Feriados 16h as 01h';
      instance.phone = faker.phone.phoneNumber();
      instance.homepage = faker.internet.url();
      instance.social = faker.internet.url();
      instance.created = faker.date.past();
      instance.updated = faker.date.past();
      instance.lat = polos[i].lat;
      instance.lng = polos[i].lng;
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
