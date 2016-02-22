angular.module('birdyApp.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

//.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
//  $scope.chat = Chats.get($stateParams.chatId);
//})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})
  .controller('ChatsCtrl', ['$scope', '$stateParams','$ionicPopover', 'util', 'BirdyService','Chats',
    function($scope, $stateParams,$ionicPopover, util, BirdyService, Chats) {
      $scope.chats = Chats.all();
      $scope.remove = function(chat) {
        Chats.remove(chat);
      };



    }])
  .controller('loadCtrl', ['$scope', '$rootScope', '$stateParams','$ionicPopover', 'util', 'BirdyService',
    function($scope, $rootScope, $stateParams, $ionicPopover, util, BirdyService) {




    }])

  .controller('homeCtrl', ['$scope', '$rootScope', '$stateParams','$state','$ionicPopover', '$ionicLoading', 'util', 'BirdyService', '$cordovaBarcodeScanner', '$cordovaCamera',
    function($scope, $rootScope, $stateParams, $state, $ionicPopover,$ionicLoading, util, BirdyService, $cordovaBarcodeScanner, $cordovaCamera) {

      $scope.showDetailPopup = function(num) {
        var url = 'templates/popups/pop_cont_' + num + '.html';
        $ionicPopover.fromTemplateUrl(url, {
          scope: $scope
        }).then(function (popover) {
          $scope.popover = popover;
          $scope.popover.show();
        });
      };

      $scope.hideDetailPopup = function(){
        $scope.popover.hide();
      }
      $scope.showButton = true;


      $scope.scanBarcode = function() {
        $cordovaBarcodeScanner.scan().then(function(imageData) {
          $ionicLoading.show({
            template: '<ion-spinner icon="circles" class="spinner-energized"></ion-spinner>',
            noBackdrop: true
          });
          var sku = imageData.text;

          if(!imageData || !imageData.text|| imageData.text == ''){
            $ionicLoading.hide();
            return false;
          }
          $scope.text1 = sku;


        }, function(error) {
          console.log("An error happened -> " + error);
        });
      };

      $scope.getCamera = function() {
        //$cordovaCamera.getPicture().then(function(imageData) {
        //  $scope.image = imageData;
        //
        //
        //}, function(error) {
        //  console.log("An error happened -> " + error);
        //});
        $state.go('camera');
      };

      $scope.goLuckly = function(){
        $state.go('luckly');
      }

      $scope.goHelp = function(){
        $state.go('help');
      }
    }])


  .controller('lucklyCtrl', ['$scope', '$rootScope', '$stateParams','$state','$ionicPopover', '$ionicLoading', 'util', 'BirdyService', '$cordovaBarcodeScanner', '$cordovaCamera',
    function($scope, $rootScope, $stateParams, $state, $ionicPopover,$ionicLoading, util, BirdyService, $cordovaBarcodeScanner, $cordovaCamera) {

      function rnd(n, m){
        return Math.floor(Math.random()*(m-n+1)+n)
      }

      var rotateTimeOut = function (){
        $('#rotate').rotate({
          angle:0,
          animateTo:2160,
          duration:8000,
          callback:function (){
            alert('网络超时，请检查您的网络设置！');
          }
        });
      };


      var itemp = rnd(1,8);
      console.log(itemp);

      var bRotate = false;

      var rotateFn = function (angles, txt){
        bRotate = !bRotate;
        $('#rotate').stopRotate();
        $('#rotate').rotate({
          angle:0,
          animateTo:angles+1800,
          duration:8000,
          callback:function (){
            //alert(txt);
            setTimeout(function(){
              bRotate = !bRotate;
              $rootScope.award = itemp;
              if(itemp < 6){
                $state.go('winner');
              }else{
                $state.go('loser');
              }
            },1000);

          }
        })
      };
      var item = -1;
      $('.pointer').click(function (){

        if(bRotate)return;
        //rnd(0,7);
        //item++;
        //if(item == 8){
        //  item = 0;
        //}

        //var itemp = 6;
        var item = itemp - 1;


        var angle;
        var angle1 = [336, 246, 156, 22 ,112]; // 1, 2, 3, 4, 5 等奖
        var angle2 = [291, 202, 67];  //没有奖

        if(item < 5){

          angle = angle1[item];

        }else{
          var rand = 2; //rnd(0,2);
          angle = angle2[rand];
        }

        rotateFn(angle, item);


        console.log(item);
      });

      $scope.goHome = function(){
        bRotate = false;
        $state.go('home');
      }

    }])

  .controller('winnerCtrl', ['$scope', '$rootScope', '$stateParams','$state','$ionicPopover', '$ionicLoading',
    function($scope, $rootScope, $stateParams, $state, $ionicPopover,$ionicLoading) {

      $scope.goHome = function(){
        $state.go('home');
      }

    }])

  .controller('loserCtrl', ['$scope', '$rootScope', '$stateParams','$state','$ionicPopover', '$ionicLoading',
    function($scope, $rootScope, $stateParams, $state, $ionicPopover,$ionicLoading) {
      $scope.goHome = function(){
        $state.go('home');
      }

    }])

  .controller('helpCtrl', ['$scope', '$rootScope', '$stateParams','$state','$ionicPopover', '$ionicLoading',
    function($scope, $rootScope, $stateParams, $state, $ionicPopover,$ionicLoading) {
      $scope.goHome = function(){
        $state.go('home');
      }
    }])

  .controller('cameraCtrl', ['$scope', '$rootScope', '$stateParams','$state', '$ionicPopover', '$ionicLoading','Camera', 'util', 'BirdyService', '$cordovaBarcodeScanner', '$cordovaCamera',
    function($scope, $rootScope, $stateParams,$state, $ionicPopover,$ionicLoading,Camera, util, BirdyService, $cordovaBarcodeScanner, $cordovaCamera) {

      $scope.haveImg = false;

      //var options = {
      //  quality: 75,
      //  targetWidth: 320,
      //  targetHeight: 320,
      //  saveToPhotoAlbum: true
      //};
      //var options  = {
      //  quality : 75,
      //  destinationType : Camera.DestinationType.DATA_URL,
      //  sourceType : Camera.PictureSourceType.CAMERA,
      //  allowEdit : true,
      //  encodingType: Camera.EncodingType.JPEG,
      //  targetWidth: 100,
      //  targetHeight: 100,
      //  saveToPhotoAlbum: true
      //};
      $scope.getPhoto = function() {
        Camera.getPicture().then(function(imageURI) {
          console.log(imageURI);
          $scope.lastPhoto = imageURI;
          $scope.imagePath = imageURI;
        }, function(err) {
          console.err(err);
        }, {
          quality: 75,
          targetWidth: 320,
          targetHeight: 320,
          saveToPhotoAlbum: true
        });
      };

      //$scope.getPhoto = function() {
      //  $cordovaCamera.getPicture({
      //    quality: 75,
      //    targetWidth: 320,
      //    targetHeight: 320,
      //    saveToPhotoAlbum: true
      //  }).then(function(imageURI) {
      //    console.log(imageURI);
      //    $scope.lastPhoto = imageURI;
      //  }, function(err) {
      //    console.err(err);
      //  });
      //};

      //$scope.getCamera = function(){
      //  $cordovaCamera.getPicture(options).then(function(imageData) {
      //    $scope.haveImg = true;
      //    $scope.imagetest = imageData;
      //    //$('#myImage').attr('src', "data:image/jpeg;base64," + imageData);
      //
      //
      //  }, function(error) {
      //    console.log("An error happened -> " + error);
      //  });
      //}
      $scope.gohome = function(){
        $state.go('home');
      }


    }]);

//.controller('ChatDetailCtrl', ['$scope', '$stateParams','$ionicPopover','util', 'BirdyService','Chats',
//    function($scope, $stateParams, $ionicPopover,util, BirdyService, Chats) {
//      console.log($stateParams.chatId);
//      //$scope.chat =Chats.get($stateParams.chatId);
//      Chats.get($stateParams.chatId).then(function(res){
//        console.log(res);
//        $scope.chat = res;
//      }, function(error){});
//
//
//      $scope.showReviewDetails = function() {
//        //  var template = '<ion-popover-view><ion-header-bar> <h1 class="title">My Popover Title</h1> </ion-header-bar> <ion-content> Hello! </ion-content></ion-popover-view>';
//        //
//        //  $scope.popover = $ionicPopover.fromTemplateUrl('templates/popups/rating2.html', {
//        //    scope: $scope
//        //  });
//        //  $scope.popover.show();
//
//
//        $ionicPopover.fromTemplateUrl('templates/popups/rating2.html', {
//          scope: $scope
//        }).then(function (popover) {
//          $scope.popover = popover;
//          $scope.popover.show();
//        });
//      }
//      //
//      //$scope.hidePopup = function(){
//      //  util.hidePopup();
//      //}
//      //Chats.get($stateParams.chatId, function(res){
//      //  console.log(res);
//      //  $scope.chat = res;
//      //});
//
//      //BirdyService.getTopRatingRestaurant({count: 10}, function(res){
//      //  $scope.topTen = res.data;
//      //  calcLocationTypes();
//      //  if($rootScope.viewType==='map'){
//      //    drawLocations();
//      //  } else {
//      //    $rootScope.ForceLoading = false;
//      //  }
//      //}, function(){
//      //  $rootScope.ForceLoading = false;
//      //  util.showMessage('Could not get the top rating restaurants');
//      //});
//
//    }]);
