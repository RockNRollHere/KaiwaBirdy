//
//  qrReaderPlugin.h
//  birdyApp
//
//  Created by 123 on 2/24/16.
//
//


#import <Cordova/CDV.h>
#import <Cordova/CDVPlugin.h>
#import "qrReaderViewController.h"

@interface qrReaderPlugin : CDVPlugin

- (void)scanAction:(CDVInvokedUrlCommand *)command;
- (void)nativeFunction:(NSString *)resault;
- (void)returnSuccess:(NSString*)scannedText callback:(NSString*)callback;
@end
