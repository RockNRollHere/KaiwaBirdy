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

  .controller('homeCtrl', ['$scope', '$rootScope','$http', '$resource', '$stateParams','$state','$ionicPopover', '$ionicLoading', 'util', 'BirdyService', '$cordovaDevice', '$cordovaBarcodeScanner', '$cordovaCamera',
    function($scope, $rootScope,$http, $resource, $stateParams, $state, $ionicPopover,$ionicLoading, util, BirdyService,$cordovaDevice, $cordovaBarcodeScanner, $cordovaCamera) {
      //document.addEventListener("deviceready", function () {
      //
      //  var device = $cordovaDevice.getDevice();
      //
      //  var cordova = $cordovaDevice.getCordova();
      //
      //  var model = $cordovaDevice.getModel();
      //
      //  var platform = $cordovaDevice.getPlatform();
      //
      //  var uuid = $cordovaDevice.getUUID();
      //
      //  var version = $cordovaDevice.getVersion();
      //
      //  $scope.uuid1= uuid;
      //  console.log(device,cordova, uuid );
      //
      //}, false);
      //
      //try{
      //
      //  console.log($cordovaDevice.getUUID());
      //
      //  $scope.uuid2 = $cordovaDevice.getUUID();
      //}catch(error){
      //  console.log(error);
      //}
      //
      //try{
      //window.plugins.uniqueDeviceID.get(function(uuid){
      // console.log(222);
      //  console.log(uuid);
      //  $scope.uuid3 = uuid;
      //}, function(error){
      //  $scope.uuid3 = error;
      //});
      //}catch(error){
      //  console.log(error);
      //}

     //var param = {fName : 'get_number'}
     //
     // console.log($scope.res);
     // var res = $resource(SERVICE_CONTEXT+'?fName=get_number');
     // var result = res.save({},function(response){
     //   console.log(response);
     //
     //
     // });

      //$http.get(SERVICE_CONTEXT+'?fName=get_number').success(function(data, status, headers, config){
      //  alert("success");
      //  console.log(data);
      //}).error(function(data, status, headers, config){
      //  alert("error");
      //})

      $rootScope.itemsStatus = [false,false,false,false,false,false,false];
      $rootScope.uuid = '';
      $scope.showButton = false;
      $rootScope.winstatus = 0;
      $rootScope.prizeNum = '';
      $rootScope.singleClick = true;
      // get UUID


      if(!localStorage.uuid){
        localStorage.uuid = Math.ceil(Math.random()*1000000000);
      }
      $rootScope.uuid = localStorage.uuid;
      //$rootScope.uuid = 'sdfsadfdsfsfas23131234fsaf';

      console.log('uuid : ', $rootScope.uuid);

      $http.get(SERVICE_CONTEXT+'?fName=get_user_sta&userId='+$rootScope.uuid).success(function(data, status, headers, config){
        console.log('##### get_user_sta #####');
        console.log(data.replace(/"/g, ""));
        var res = data.replace(/"/g, "").split(',');
        if(res.length <= 1){
          return false;
        }else{
          console.log('res[0]', res[0]);
          if(res[0] == 0){
            console.log('##### get_user_sta 1 #####');
            initPage();
            $rootScope.winstatus = 0;
            $rootScope.prizeNum = '';
          }else{
            $scope.item1 = true;
            $scope.item2 = true;
            $scope.item3 = true;
            $scope.item4 = true;
            $scope.item5 = true;
            $scope.item6 = true;
            $scope.item7 = true;
            $rootScope.itemsStatus = [true,true,true,true,true,true,true];
            localStorage.itemsStatus =JSON.stringify($rootScope.itemsStatus);
            $rootScope.winstatus = 1;
            $rootScope.prizeNum = res[1];
          }
          if ($scope.item1 && $scope.item2 && $scope.item3 && $scope.item4 && $scope.item5 && $scope.item6 && $scope.item7){
            $scope.showButton = true;
          }
          //$scope.showButton = true;
        }
      }).error(function(data, status, headers, config){
        alert("error");
      });



      //if(device.uuid){
      //  $rootScope.uuid = device.uuid;
      //}



      var initPage = function(){
        if(!localStorage.itemsStatus){
          localStorage.itemsStatus = JSON.stringify($rootScope.itemsStatus);

        }else{
          $rootScope.itemsStatus = JSON.parse(localStorage.itemsStatus);
        }
        $scope.item1 = $rootScope.itemsStatus[0];
        $scope.item2 = $rootScope.itemsStatus[1];
        $scope.item3 = $rootScope.itemsStatus[2];
        $scope.item4 = $rootScope.itemsStatus[3];
        $scope.item5 = $rootScope.itemsStatus[4];
        $scope.item6 = $rootScope.itemsStatus[5];
        $scope.item7 = $rootScope.itemsStatus[6];
      }


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

      $scope.openNewUrl = function(aURl){
        console.log("url clicked");
        window.open(aURl, '_blank', 'location=yes');
        console.log("url clicked");
      }



      $scope.scanBarcode = function() {
        console.log("scan");
        //$cordovaBarcodeScanner.scan().then(function(imageData) {
        //  //$ionicLoading.show({
        //  //  template: '<ion-spinner icon="circles" class="spinner-energized"></ion-spinner>',
        //  //  noBackdrop: true
        //  //});
        //  var sku = imageData.text;
        //
        //  if(!imageData || !imageData.text|| imageData.text == ''){
        //    $ionicLoading.hide();
        //    return false;
        //  }
        //
        //  $scope.text1 = sku;
        //
        //  if(ItemSource && ItemSource.length > 0){
        //    for(var i=0; i<ItemSource.length; i++){
        //      if(sku == ItemSource[i]) {
        //        switch (i) {
        //          case 0 :
        //            $scope.item1 = true;
        //            break;
        //          case 1 :
        //            $scope.item2 = true;
        //            break;
        //          case 2 :
        //            $scope.item3 = true;
        //            break;
        //          case 3 :
        //            $scope.item4 = true;
        //            break;
        //          case 4 :
        //            $scope.item5 = true;
        //            break;
        //          case 5 :
        //            $scope.item6 = true;
        //            break;
        //          case 6 :
        //            $scope.item7 = true;
        //            break;
        //          default :
        //            break;
        //
        //        }
        //        if ($scope.item1 && $scope.item2 && $scope.item3 && $scope.item4 && $scope.item5 && $scope.item6 && $scope.item7){
        //          $scope.showButton = true;
        //        }
        //
        //        $rootScope.itemsStatus[i] = true;
        //        localStorage.itemsStatus = JSON.stringify($rootScope.itemsStatus);
        //        break;
        //      }
        //    }
        //  }
        //
        //
        //}, function(error) {
        //  console.log("An error happened -> " + error);
        //});

        if($rootScope.singleClick){
          $rootScope.singleClick = false;
          cordova.exec(qrSuccess,qrFailure,"qrReaderPlugin","scanAction",[]);
          //cordova.exec(successCallback, errorCallback, 'BarcodeScanner', 'scan', []);
          setTimeout(function(){
            $rootScope.singleClick = true;
          },1000);
        }
      };

      function getNativeQRDatax(sku){

          console.log("comparing :", sku);
          alert(sku);
          if(!imageData || !imageData.text|| imageData.text == ''){
            $ionicLoading.hide();
            return false;
          }
          $scope.text1 = sku;

          if(ItemSource && ItemSource.length > 0){
            for(var i=0; i<ItemSource.length; i++) {
              if (sku == ItemSource[i]) {
                switch (i) {
                  case 0 :
                    $scope.item1 = true;
                    break;
                  case 1 :
                    $scope.item2 = true;
                    break;
                  case 2 :
                    $scope.item3 = true;
                    break;
                  case 3 :
                    $scope.item4 = true;
                    break;
                  case 4 :
                    $scope.item5 = true;
                    break;
                  case 5 :
                    $scope.item6 = true;
                    break;
                  case 6 :
                    $scope.item7 = true;
                    break;
                  default :
                    break;

                }
                if ($scope.item1 && $scope.item2 && $scope.item3 && $scope.item4 && $scope.item5 && $scope.item6 && $scope.item7) {
                  $scope.showButton = true;
                }

                $rootScope.itemsStatus[i] = true;
                localStorage.itemsStatus = JSON.stringify($rootScope.itemsStatus);
                break;
              }
            }
          }
      }

      function qrFailure(data){
        console.log(data);
      }

      $scope.getCamera = function() {
        //$cordovaCamera.getPicture().then(function(imageData) {
        //  $scope.image = imageData;
        //
        //
        //}, function(error) {
        //  console.log("An error happened -> " + error);
        //});
        //Cordova.exec(function (callback) {
        //}, function () {
        //}, 'ISupplierHandle', 'openBrowser', [{url:"www.baidu.com"}]);

        cordova.exec(cdCallSuccess,cdCallFailed,"pluginPlugin","openBrowser",[]);
        //$state.go('camera');
      };

      function cdCallSuccess(){
        console.log("OK");
      }

      function cdCallFailed(){
        console.log("failed");
      }
      $scope.goLuckly = function(){
        if($rootScope.prizeNum == ''){
          $state.go('luckly');
        } else if($rootScope.prizeNum<=5){
          $state.go('winner');
        }else if($rootScope.prizeNum==6){
          $state.go('loser');
        }else{
          $state.go('luckly');
        }
        //$http.get(SERVICE_CONTEXT+'?fName=get_number').success(function(data, status, headers, config){
        //  alert("success");
        //  console.log(data);
        //}).error(function(data, status, headers, config){
        //  alert("error");
        //});

      }

      $scope.goHelp = function(){
        $state.go('help');
      }

      $scope.popQR = function(){
        //$scope.popQR = openway; 
        alert(openway);
        console.log("scan finished" + openway);
      }
    }])


  .controller('lucklyCtrl', ['$scope', '$rootScope', '$http', '$stateParams','$state','$ionicPopover', '$ionicLoading', 'util', 'BirdyService', '$cordovaBarcodeScanner', '$cordovaCamera',
    function($scope, $rootScope,$http, $stateParams, $state, $ionicPopover,$ionicLoading, util, BirdyService, $cordovaBarcodeScanner, $cordovaCamera) {


      $http.get(SERVICE_CONTEXT+'?fName=get_number').success(function(data, status, headers, config){
        $scope.descItems = data;
        $scope.descItem1 = data[0];
        console.log(111111111);
        console.log(data);
      }).error(function(data, status, headers, config){
        alert("error");
      });
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





      var bRotate = false;

      var rotateFn = function (itemp, angles, txt){
        bRotate = !bRotate;
        $('#rotate').stopRotate();
        $('#rotate').rotate({
          angle:0,
          animateTo:angles+1800,
          duration:8000,
          callback:function (){
            //alert(txt);
            $rootScope.award = itemp;
            localStorage.award =  itemp;
            console.log('itemp:',itemp);
            setTimeout(function(){
              bRotate = !bRotate;

              console.log('$rootScope.itemCode:',$rootScope.itemCode);
              if(itemp < 6){
                $state.go('winner');
              }else{
                $state.go('loser');
              }
            },1000);

          }
        })
      };


      $('.pointer').click(function (){

        $http.get(SERVICE_CONTEXT+'?fName=set_draw&userId='+$rootScope.uuid).success(function(data, status, headers, config){
          console.log('####  pointer ####');
          console.log(data);
          var res = data.replace(/"/g, "").split(',');
          var itemp = res[0];
          $rootScope.itemCode = res[1];
          localStorage.itemCode = res[1];
          if(bRotate)return;

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

          rotateFn(itemp,angle, item);
        }).error(function(data, status, headers, config){
          alert("error");
        });




        //console.log(item);
      });

      $scope.goHome = function(){
        bRotate = false;
        $state.go('home');
      }

    }])

  .controller('winnerCtrl', ['$scope', '$rootScope', '$stateParams','$state','$ionicPopover', '$ionicLoading',
    function($scope, $rootScope, $stateParams, $state, $ionicPopover,$ionicLoading) {
      console.log($rootScope.award);
      $scope.num = parseInt(localStorage.award);
      $scope.itemCodeText = localStorage.itemCode;
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
