(function() {
    'use strict';

    angular
    .module('app.core')
    .constant('serverUrl', 'http://localhost:3000/')
    // .constant('serverUrl', 'http://192.168.25.15:3000/')
    .constant('mapIcons', {
      center: {
          iconUrl: 'images/icon/centers.png',
          // shadowUrl: 'images/icon/flag-shadow.png',
          iconSize:     [32, 32],
          shadowSize:   [32, 32],
          iconAnchor:   [16, 16],
          // shadowAnchor: [6, 0]
      },
      restaurant: {
          iconUrl: 'images/icon/restaurants.png',
          // shadowUrl: 'images/icon/flag-shadow.png',
          iconSize:     [32, 32],
          shadowSize:   [32, 32],
          iconAnchor:   [16, 16],
          // shadowAnchor: [6, 0]
      },
    })

})();
