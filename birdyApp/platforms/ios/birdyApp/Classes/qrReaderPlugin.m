//
//  qrReaderPlugin.m
//  birdyApp
//
//  Created by 123 on 2/24/16.
//
//

#import "qrReaderPlugin.h"
#import "qrReaderViewController.h"
#import "sendToNativeTestViewController.h"

@implementation qrReaderPlugin

- (void)scanAction:(CDVInvokedUrlCommand *)command
{
    UIViewController *aQrViewController = [[qrReaderViewController alloc]init];
    [self.viewController presentViewController:aQrViewController animated:YES completion:nil];
    
//  [[UIApplication sharedApplication] openURL:[NSURL URLWithString:[command.arguments[0] objectForKey:@"url"]]];
//    if ([command.arguments[0] objectForKey:@"url"]) {
}

- (void)nativeFunction:(NSString *)resault{
     NSLog(@"inside");
    NSString *js = [NSString stringWithFormat:@"qrSuccess('%@');", resault];
    NSString *jsResult = [self.webView stringByEvaluatingJavaScriptFromString:js];
    NSLog(@"jsResult=%@",jsResult);
}

- (void)returnSuccess:(NSString*)scannedText callback:(NSString*)callback{
    
    NSLog(@"success %@",scannedText );
    
    CDVPluginResult* result = [CDVPluginResult
                               resultWithStatus: CDVCommandStatus_OK
                               messageAsString: scannedText
                               ];
    [self.commandDelegate sendPluginResult:result callbackId:callback];
}



@end
