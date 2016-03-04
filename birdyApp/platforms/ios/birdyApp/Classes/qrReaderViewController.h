//
//  qrReaderViewController.h
//  birdyApp
//
//  Created by 123 on 2/23/16.
//
//

#import <UIKit/UIKit.h>
#import "qrReaderPlugin.h"
#import "MainViewController.h"
#import <Cordova/CDVCommandDelegateImpl.h>
#import <Cordova/CDVCommandQueue.h>

@interface  qrReaderViewController : UIViewController

@property (nonatomic,strong) NSString *aResault;

-(void)scanBarcode;
@end



