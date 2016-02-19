/*
 * Copyright (C) 2015 TopCoder Inc., All Rights Reserved.
 */

/**
 * Represents utils services
 *
 * @author TCSASSEMBLER
 * @version 1.0
 */


(function () {
  'use strict';
  angular.module("birdyApp")
    .factory("util", function ($log, $q, config, $ionicModal, $ionicLoading, $timeout, $rootScope) {
      var shownModal = null;

      return {

        // show popup
        showPopup: function(scope, popupName){
          $ionicModal.fromTemplateUrl('templates/popups/' + popupName + '.html', {
            scope: scope,
            backdropClickToClose: false,
            hardwareBackButtonClose: false
          }).then(function(modal) {
            shownModal = modal;
            shownModal.show();
          });
        },
        // hide popup
        hidePopup: function(){
          if (shownModal) {
            shownModal.hide();
            shownModal = null;
          }
        },

        // Show a temporary message
        showMessage: function(message) {
          $ionicLoading.show({
            template: message
          });
          $timeout(function() {
            $ionicLoading.hide();
          }, config.TEMPORARY_MESSAGE_DURATION);
        },

        // open the url in browser
        openUrl: function(url){
          if(url && url.match(/^(https|http|tel):/)){
            window.open(url, '_system');
          }
        }
      };
    });
})();
