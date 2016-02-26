// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('birdyApp', ['ionic', 'birdyApp.controllers', 'birdyApp.services', 'ngCordova', 'ngIOS9UIWebViewPatch'])
  .config(function($httpProvider, config) {
    $httpProvider.defaults.timeout = config.API_TIMEOUT;
    //add api base url for all api calls
    //$httpProvider.interceptors.push(function(config, $q, $injector, $rootScope) {
    //  return {
    //    request: function(request) {
    //      if (request.api) {
    //        request.withCredentials = true;
    //        request.url = config.REST_SERVICE_BASE_URL + request.url;
    //      }
    //      if(request.showLoading){
    //        $rootScope.Loading = true;
    //      }
    //      return request;
    //    },
    //    response: function(response) {
    //      $rootScope.Loading = false;
    //      return response;
    //    },
    //    responseError: function(rejection) {
    //      $rootScope.Loading = false;
    //      if (rejection.config.api && (rejection.status === 401 || rejection.status === 403)) {
    //        var $state = $injector.get("$state");
    //        $state.go('home');
    //        //$state.go(rejection.status === 401 ? 'login' : 'home');
    //      }
    //      return $q.reject(rejection);
    //    }
    //  };
    //});
  })
  .config(function($ionicConfigProvider) {
    $ionicConfigProvider.views.swipeBackEnabled(false);
  })
  .config(function($compileProvider){
    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
  })
  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      //navigator.splashscreen.show();
      //window.setTimeout(function () {
      //  navigator.splashscreen.hide();
      //}, 10000);



       //set to either landscape
      screen.lockOrientation('portrait');

      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
      UUID = window.device.uuid;

    });
  })

  .config(function($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider
      .state('home', {
        cache: false,
        url: '/home',
        templateUrl: 'templates/home.html',
        controller: 'homeCtrl'
      })
      .state('luckly', {
        cache: false,
        url: '/luckly',
        templateUrl: 'templates/luckly.html',
        controller: 'lucklyCtrl'
      })

      .state('winner', {
        cache: false,
        url: '/winner',
        templateUrl: 'templates/winner.html',
        controller: 'winnerCtrl'
      })

      .state('loser', {
        cache: false,
        url: '/loser',
        templateUrl: 'templates/loser.html',
        controller: 'loserCtrl'
      })

      .state('help', {
        cache: false,
        url: '/help',
        templateUrl: 'templates/help.html',
        controller: 'helpCtrl'
      })



      .state('camera', {
        cache: false,
        url: '/camera',
        templateUrl: 'templates/camera.html',
        controller: 'cameraCtrl'
      })
      // setup an abstract state for the tabs directive
      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
      })

      // Each tab has its own nav history stack:

      .state('tab.dash', {
        url: '/dash',
        views: {
          'tab-dash': {
            templateUrl: 'templates/tab-dash.html',
            controller: 'DashCtrl'
          }
        }
      })

      .state('tab.chats', {
        url: '/chats',
        views: {
          'tab-chats': {
            templateUrl: 'templates/tab-chats.html',
            controller: 'ChatsCtrl'
          }
        }
      })
      .state('tab.chat-detail', {
        url: '/chats/:chatId',
        views: {
          'tab-chats': {
            templateUrl: 'templates/chat-detail.html',
            controller: 'ChatDetailCtrl'
          }
        }
      })

      .state('tab.account', {
        url: '/account',
        views: {
          'tab-account': {
            templateUrl: 'templates/tab-account.html',
            controller: 'AccountCtrl'
          }
        }
      });


    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/home');

  });
