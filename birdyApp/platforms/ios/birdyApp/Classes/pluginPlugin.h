//
//  pluginPlugin.h
//  birdyApp
//
//  Created by 123 on 2/22/16.
//
//

#import <Cordova/CDV.h>
#import <Cordova/CDVPlugin.h>

@interface pluginPlugin : CDVPlugin

- (void) openBrowser:(CDVInvokedUrlCommand *)command;

@end
