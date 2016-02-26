angular.module('birdyApp.services', ['ngResource'])
  .factory('BirdyService', function ($resource) {
    return $resource('/', {}, {
      //login: {
      //  api: true,
      //  method: 'POST',
      //  url: '/login',
      //  showLoading: true
      //},
      //logout: {
      //  api: true,
      //  method: 'POST',
      //  url: '/logout'
      //},
      getNumber: {
        api: true,
        method: 'GET',
        url: '/picklist',
        showLoading: true
      },
      getMyAddedLocations: {
        api: true,
        method: 'GET',
        url: '/locations/recent',
        showLoading: true
      },
      getMyFavorites: {
        api: true,
        method: 'GET',
        url: '/userFavorite/:userId',
        showLoading: true
      },
      deleteMyFavorite: {
        api: true,
        method: 'DELETE',
        url: '/userFavorite',
        showLoading: true
      },
      getMyReviews:  {
        api: true,
        method: 'GET',
        url: '/reviews/me',
        showLoading: true
      },
      getUserById: {
        api: true,
        method: 'GET',
        url: '/user/:id'
      },
      updateUser: {
        api: true,
        method: 'PUT',
        url: '/user',
        showLoading: true
      },
      searchLocations: {
        api: true,
        method: 'POST',
        url: '/locations/search',
        showLoading: true
      },
      searchLocations2: {
        api: true,
        method: 'POST',
        url: '/locations/newSearch',
        showLoading: true
      },
      getloadReviews: {
        api: true,
        method: 'POST',
        url: '/locations/loadReviews',
        showLoading: true
      },
      getTopRatingRestaurant: {
        api: true,
        method: 'GET',
        url: '/topRatingLocations/:count',
        showLoading: true
      },
      getFaqs: {
        api: true,
        method: 'GET',
        url: '/faqs',
        showLoading: true
      },
      createLocation: {
        api: true,
        method: 'POST',
        url: '/location'
      },
      updateLocation: {
        api: true,
        method: 'PUT',
        url: '/location'
      },
      getLocationById: {
        api: true,
        method: 'GET',
        url: '/location/:id',
        showLoading: true
      },
      getLocationPhotos: {
        api: true,
        method: 'GET',
        url: '/locationPhotos/:id',
        showLoading: true
      },
      unfavoriteLocation: {
        api: true,
        method: 'DELETE',
        url: '/userFavorite',
        showLoading: true
      },
      favoriteLocation: {
        api: true,
        method: 'POST',
        url: '/userFavorite',
        showLoading: true
      },
      updateReviewLike: {
        api: true,
        method: 'PUT',
        url: '/reviewLike',
        showLoading: true
      },
      createReviewLike: {
        api: true,
        method: 'POST',
        url: '/reviewLike',
        showLoading: true
      },
      createReview: {
        api: true,
        method: 'POST',
        url: '/review'
      },
      getReview: {
        api: true,
        method: 'GET',
        url: '/review/:id',
        showLoading: true
      },
      updateReview: {
        api: true,
        method: 'PUT',
        url: '/review'
      },
      getReviewPhotos: {
        api: true,
        method: 'GET',
        url: '/reviewPhotos/:id',
        showLoading: true
      },
      getScreens: {
        api: true,
        method: 'GET',
        url: '/screens'
      }
    });
  })
  .factory('Camera', ['$q', function($q) {

    return {
      getPicture: function(options) {
        var q = $q.defer();

        navigator.camera.getPicture(function(result) {
          // Do any magic you need
          q.resolve(result);
        }, function(err) {
          q.reject(err);
        }, options);

        return q.promise;
      }
    }
  }])
  .factory('Chats', function($q) {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    var chats = [{
      id: 0,
      name: 'Ben Sparrow',
      lastText: 'You on your way?',
      face: 'img/ben.png'
    }, {
      id: 1,
      name: 'Max Lynx',
      lastText: 'Hey, it\'s me',
      face: 'img/max.png'
    }, {
      id: 2,
      name: 'Adam Bradleyson',
      lastText: 'I should buy a boat',
      face: 'img/adam.jpg'
    }, {
      id: 3,
      name: 'Perry Governor',
      lastText: 'Look at my mukluks!',
      face: 'img/perry.png'
    }, {
      id: 4,
      name: 'Mike Harrington',
      lastText: 'This is wicked good ice cream.',
      face: 'img/mike.png'
    }];

    return {
      all: function() {
        return chats;
      },
      remove: function(chat) {
        chats.splice(chats.indexOf(chat), 1);
      },
      get: function(chatId) {
        var deferred = $q.defer();
        var chat = null;
        for (var i = 0; i < chats.length; i++) {
          if (chats[i].id === parseInt(chatId)) {
            console.log(chats[i]);
            //return chats[i];
            chat = chats[i];
            deferred.resolve(chats[i]);

          }
        }
        if(chat){
          deferred.resolve(chats[i]);
        }else{
          deferred.reject('');
        }

          return deferred.promise;
      }
    };
  });
