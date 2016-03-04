//
//  sendToNativeTestViewController.m
//  birdyApp
//
//  Created by 123 on 3/2/16.
//
//

#import "sendToNativeTestViewController.h"
#import "MainViewController.h"
#import "qrReaderPlugin.h"
#import <Cordova/CDVPlugin.h>
#import "AppDelegate.h"

@interface sendToNativeTestViewController ()

@property (nonatomic,strong)qrReaderPlugin *aQ;
@property (nonatomic,strong)MainViewController *aMain;

@end

@implementation sendToNativeTestViewController
@synthesize aQ;

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    UIButton *sendButton = [UIButton buttonWithType:UIButtonTypeCustom];
    sendButton.frame = CGRectMake(40, 100, 160, 40);
    [sendButton setTitle:@"Send Now" forState:UIControlStateNormal];
    [sendButton  addTarget:self action:@selector(sendSth) forControlEvents:UIControlEventTouchUpInside];
    [self.view addSubview:sendButton];
}

-(void)sendSth{
    NSLog(@"clicking");
    
    NSString *newOutString =@"Hello word";
    
    AppDelegate *appDelegate = (AppDelegate *)[[UIApplication sharedApplication] delegate];
    [appDelegate applicationIsCalling:newOutString];
    
    [self dismissViewControllerAnimated:YES completion:nil];

}
- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

@end
