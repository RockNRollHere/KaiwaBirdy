//
//  pluginPlugin.m
//  birdyApp
//
//  Created by 123 on 2/22/16.
//
//

#import "pluginPlugin.h"
#import "cameraViewController.h"

@implementation pluginPlugin

- (void) openBrowser:(CDVInvokedUrlCommand *)command
{
    UIViewController *aCameravc = [[cameraViewController alloc]init];
    [self.viewController presentViewController:aCameravc animated:YES completion:nil];
}

@end
