cordova.define("br.com.mbamobi.cordova.exitios.exitApp", function(require, exports, module) { var exec = require('cordova/exec');

module.exports = {
  /**
   * Exits the PhoneGap application with no questions asked.
   */
  exitApp: function() {
    exec(null, null, 'ExitApp', 'exitApp', []);
  }
};

});
