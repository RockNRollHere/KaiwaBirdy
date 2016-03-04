//
//  cameraViewController.m
//  birdyApp
//
//  Created by 123 on 3/1/16.
//
//
#import "CameraSessionView.h"
#import "cameraViewController.h"
#import "MainViewController.h"

@interface cameraViewController ()<CACameraSessionDelegate>

@property (weak, nonatomic) IBOutlet UIView *navView;
@property (weak, nonatomic) IBOutlet UIImageView *cameraFrame;
@property (nonatomic, strong) CameraSessionView *cameraView;
@property (weak, nonatomic) IBOutlet UIButton *backBtn;

@end

@implementation cameraViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    
    // Do any additional setup after loading the view from its nib.
    //Set white status bar
    [self setNeedsStatusBarAppearanceUpdate];
    
    //Instantiate the camera view & assign its frame
    _cameraView = [[CameraSessionView alloc] initWithFrame:self.view.frame];
    
    //Set the camera view's delegate and add it as a subview
    _cameraView.delegate = self;
    
    //Apply animation effect to present the camera view
    CATransition *applicationLoadViewIn =[CATransition animation];
    [applicationLoadViewIn setDuration:0.6];
    [applicationLoadViewIn setType:kCATransitionReveal];
    [applicationLoadViewIn setTimingFunction:[CAMediaTimingFunction functionWithName:kCAMediaTimingFunctionEaseIn]];
    [[_cameraView layer]addAnimation:applicationLoadViewIn forKey:kCATransitionReveal];
    
    [self.view addSubview:_cameraView];
    
//    UIView* topBar = [[UIView alloc] initWithFrame: CGRectMake(0, 0, self.view.frame.size.width, 84)];
//    topBar.backgroundColor = [UIColor colorWithRed:0.62f green:0.8f blue:0.33f alpha:1];
//    [self.view addSubview:topBar];
//    
//    UIButton *aback=[UIButton buttonWithType:UIButtonTypeCustom];
//    aback.frame = CGRectMake(self.view.frame.size.width/8, 32, 55, 44);
//    [aback setImage:[UIImage imageNamed:@"back_btn_down.png"] forState:UIControlStateNormal];
//        [aback addTarget:self action:@selector(backToMenu) forControlEvents:UIControlEventTouchUpInside];
//    [self.view addSubview:aback];
//    
//    UIImageView *titleImage = [[UIImageView alloc]initWithImage:[UIImage imageNamed:@"cam_title.png"]];
//    CGPoint centerF = self.view.center;
//    centerF.y += 10;
//    titleImage.frame = CGRectMake(0, 0, 90, 60);
//    titleImage.center = centerF;
//    [self.view addSubview:titleImage];
//    
//    
//    UIImageView *frameImage = [[UIImageView alloc]initWithImage:[UIImage imageNamed:@"camera_frame.png"]];
//    CGPoint centerCF = self.view.center;
//    centerCF.y += 40;
//    frameImage.frame = CGRectMake(0, 0, self.view.frame.size.width *2/3, self.view.frame.size.height *2/3);
//    frameImage.center = centerCF;
//    [self.view addSubview:frameImage];
//    
    
    [_backBtn addTarget:self action:@selector(backToMenu) forControlEvents:UIControlEventTouchUpInside];
    [_navView addSubview:_backBtn];
    [self.view addSubview:_navView];
    [self.view addSubview:_cameraFrame];

}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

-(void)didCaptureImage:(UIImage *)image {
    NSLog(@"CAPTURED IMAGE");
    UIImageWriteToSavedPhotosAlbum(image, self, @selector(image:didFinishSavingWithError:contextInfo:), nil);
//    [self.cameraView removeFromSuperview];
}

-(void)didCaptureImageWithData:(NSData *)imageData {
    NSLog(@"CAPTURED IMAGE DATA");
    //UIImage *image = [[UIImage alloc] initWithData:imageData];
    //UIImageWriteToSavedPhotosAlbum(image, self, @selector(image:didFinishSavingWithError:contextInfo:), nil);
    //[self.cameraView removeFromSuperview];
}

- (void)image:(UIImage *)image didFinishSavingWithError:(NSError *)error contextInfo:(void *)contextInfo
{
    //Show error alert if image could not be saved
    if (error) [[[UIAlertView alloc] initWithTitle:@"Error!" message:@"Image couldn't be saved" delegate:self cancelButtonTitle:@"Ok" otherButtonTitles:nil, nil] show];
}

- (void)backToMenu{
    NSLog(@"clicking");
    _cameraView = nil;
    [_cameraView removeFromSuperview];
    [self dismissViewControllerAnimated:YES completion:nil];
}
/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

@end
