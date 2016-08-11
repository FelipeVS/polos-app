(function() {
    'use strict';

    angular
    .module('app.core')
    // .constant('serverUrl', 'http://localhost:3000/')
    // .constant('serverUrl', 'http://192.168.25.10:3000/')
    .constant('serverUrl', 'http://www.polosgourmet.com/')

    .constant('mapIcons', {
      center: {
          iconUrl: 'images/icon/centers.png',
          shadowUrl: 'images/icon/centers-shadow.png',
          iconSize:     [32, 32],
          shadowSize:   [32, 32],
          iconAnchor:   [16, 32],
          shadowAnchor: [10, 32]
      },
      restaurant: {
          iconUrl: 'images/icon/flag.png',
          shadowUrl: 'images/icon/flag-shadow.png',
          iconSize:     [32, 32],
          shadowSize:   [32, 32],
          iconAnchor:   [16, 16],
          shadowAnchor: [8, 18]
      },
      user: {
          iconUrl: 'images/icon/user.png',
          shadowUrl: 'images/icon/user-shadow.png',
          iconSize:     [9, 23],
          shadowSize:   [23, 23],
          iconAnchor:   [4, 23],
          shadowAnchor: [4, 23]
      }
    })

})();
