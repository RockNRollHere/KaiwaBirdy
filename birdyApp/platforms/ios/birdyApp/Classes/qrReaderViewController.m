//
//  qrReaderViewController.m
//  birdyApp
//
//  Created by 123 on 2/23/16.
//
//

#import "qrReaderViewController.h"
//#import "MainViewController.h"
#import "qrReaderPlugin.h"
#import <AVFoundation/AVFoundation.h>
#import <Cordova/CDVPlugin.h>
#import "AppDelegate.h"

@interface qrReaderViewController ()<AVCaptureMetadataOutputObjectsDelegate>
@property (weak, nonatomic) IBOutlet UIView *viewPreview;
@property (weak, nonatomic) IBOutlet UILabel *lblStatus;
//@property (weak, nonatomic) IBOutlet UIButton *startBtn;
//- (IBAction)startStopReading:(id)sender;

@property (strong, nonatomic) UIView *boxView;
@property (nonatomic) BOOL isReading;
@property (strong, nonatomic) CALayer *scanLayer;

@property (weak, nonatomic) IBOutlet UIView *leftBox;
@property (weak, nonatomic) IBOutlet UIView *topBox;
@property (weak, nonatomic) IBOutlet UIView *rightBox;
@property (weak, nonatomic) IBOutlet UIView *midBox;
@property (weak, nonatomic) IBOutlet UIView *botBox;
@property (weak, nonatomic) IBOutlet UILabel *stringOne;
@property (weak, nonatomic) IBOutlet UILabel *stringTwo;
@property (weak, nonatomic) IBOutlet UILabel *stringThree;
@property (nonatomic) BOOL isOutReady;

- (IBAction)backToWebView:(id)sender;


-(BOOL)startReading;
-(void)stopReading;

//捕捉会话
@property (nonatomic, strong) AVCaptureSession *captureSession;
//展示layer
@property (nonatomic, strong) AVCaptureVideoPreviewLayer *videoPreviewLayer;
@end

@implementation qrReaderViewController

- (void)viewDidLoad {
    [_topBox removeFromSuperview];
    [_rightBox removeFromSuperview];
    [_midBox removeFromSuperview];
    [_leftBox removeFromSuperview];
    [_botBox removeFromSuperview];
    [_stringOne removeFromSuperview];
    [_stringTwo removeFromSuperview];
    [_stringThree removeFromSuperview];
    
    [super viewDidLoad];
    [self startReading];
    _captureSession = nil;
    _isOutReady = YES;
    _isReading = NO;
}

- (IBAction)backToWebView:(id)sender {
    _isOutReady = YES;
    [self stopReading];
    [self dismissViewControllerAnimated:YES completion:nil];
    
}

- (BOOL)startReading {
    _isOutReady = YES;
    NSError *error;
    
    //1.初始化捕捉设备（AVCaptureDevice），类型为AVMediaTypeVideo
    AVCaptureDevice *captureDevice = [AVCaptureDevice defaultDeviceWithMediaType:AVMediaTypeVideo];
    
    //2.用captureDevice创建输入流
    AVCaptureDeviceInput *input = [AVCaptureDeviceInput deviceInputWithDevice:captureDevice error:&error];
    if (!input) {
        NSLog(@"%@", [error localizedDescription]);
        return NO;
    }
    
    //3.创建媒体数据输出流
    AVCaptureMetadataOutput *captureMetadataOutput = [[AVCaptureMetadataOutput alloc] init];
    
    //4.实例化捕捉会话
    _captureSession = [[AVCaptureSession alloc] init];
    
    //4.1.将输入流添加到会话
    [_captureSession addInput:input];
    
    //4.2.将媒体输出流添加到会话中
    [_captureSession addOutput:captureMetadataOutput];
    
    //5.创建串行队列，并加媒体输出流添加到队列当中
    dispatch_queue_t dispatchQueue;
    dispatchQueue = dispatch_queue_create("myQueue", NULL);
    //5.1.设置代理
    [captureMetadataOutput setMetadataObjectsDelegate:self queue:dispatchQueue];
    
    //5.2.设置输出媒体数据类型为QRCode
    [captureMetadataOutput setMetadataObjectTypes:[NSArray arrayWithObject:AVMetadataObjectTypeQRCode]];
    
    //6.实例化预览图层
    _videoPreviewLayer = [[AVCaptureVideoPreviewLayer alloc] initWithSession:_captureSession];
    
    //7.设置预览图层填充方式
    [_videoPreviewLayer setVideoGravity:AVLayerVideoGravityResizeAspectFill];
    
    //8.设置图层的frame
    [_videoPreviewLayer setFrame:_viewPreview.layer.bounds];
    
    //9.将图层添加到预览view的图层上
    [_viewPreview.layer addSublayer:_videoPreviewLayer];
    
    [_viewPreview addSubview:_topBox];
    [_viewPreview addSubview:_rightBox];
    [_viewPreview addSubview:_botBox];
    [_viewPreview addSubview:_leftBox];
    
    
    //10.设置扫描范围
    captureMetadataOutput.rectOfInterest = CGRectMake(0.2f, 0.2f, 0.8f, 0.8f);
    
    //10.1.扫描框
//    _boxView = [[UIView alloc] initWithFrame:CGRectMake(_viewPreview.bounds.size.width * 0.2f, _viewPreview.bounds.size.height * 0.2f, _viewPreview.bounds.size.width - _viewPreview.bounds.size.width * 0.4f, _viewPreview.bounds.size.height - _viewPreview.bounds.size.height * 0.4f)];
//    _boxView.layer.borderColor = [UIColor greenColor].CGColor;
//    _boxView.layer.borderWidth = 1.0f;
//    
//    [_viewPreview addSubview:_boxView];
    UIGraphicsBeginImageContext(_midBox.frame.size);
    [[UIImage imageNamed:@"scanning_frame.png"] drawInRect:_midBox.bounds];
    UIImage *image = UIGraphicsGetImageFromCurrentImageContext();
    UIGraphicsEndImageContext();
    _midBox.backgroundColor = [UIColor colorWithPatternImage:image];
    [_viewPreview addSubview:_midBox];
    
    //10.2.扫描线
    _scanLayer = [[CALayer alloc] init];
    _scanLayer.frame = CGRectMake(0, 0, _midBox.bounds.size.width, 2);
//    _scanLayer.backgroundColor = [UIColor greenColor].CGColor;
    _scanLayer.backgroundColor = [UIColor colorWithRed:0.64 green:0.83 blue:0.3 alpha:0.3 ].CGColor;
    
    [_midBox.layer addSublayer:_scanLayer];
    
    NSTimer *timer = [NSTimer scheduledTimerWithTimeInterval:0.1f target:self selector:@selector(moveScanLayer:) userInfo:nil repeats:YES];
    
    [timer fire];
    
    [_viewPreview addSubview:_stringOne];
    [_viewPreview addSubview:_stringTwo];
    [_viewPreview addSubview:_stringThree];
    [_viewPreview addSubview:_lblStatus];
    
    //10.开始扫描
    [_captureSession startRunning];
    
    
    return YES;
}

//- (IBAction)startStopReading:(id)sender {
//    if (!_isReading) {
//        if ([self startReading]) {
//            [_startBtn setTitle:@"Stop" forState:UIControlStateNormal];
//            [_lblStatus setText:@"Scanning for QR Code"];
//        }
//    }
//    else{
//        [self stopReading];
//        [_startBtn setTitle:@"Start!" forState:UIControlStateNormal];
//    }
//    
//    _isReading = !_isReading;
//}

-(void)stopReading{
    [_captureSession stopRunning];
    _captureSession = nil;
    [_scanLayer removeFromSuperlayer];
    [_videoPreviewLayer removeFromSuperlayer];
    //跳转
}

#pragma mark - AVCaptureMetadataOutputObjectsDelegate
- (void)captureOutput:(AVCaptureOutput *)captureOutput didOutputMetadataObjects:(NSArray *)metadataObjects fromConnection:(AVCaptureConnection *)connection
{
    //判断是否有数据
    if (metadataObjects != nil && [metadataObjects count] > 0) {
        AVMetadataMachineReadableCodeObject *metadataObj = [metadataObjects objectAtIndex:0];
        //判断回传的数据类型
        if ([[metadataObj type] isEqualToString:AVMetadataObjectTypeQRCode]) {
            [_lblStatus performSelectorOnMainThread:@selector(setText:) withObject:[metadataObj stringValue] waitUntilDone:NO];

            
            if (_isOutReady == YES) {
                [self.view setBackgroundColor:[UIColor blackColor]];
                _isOutReady = NO;
                _isReading = NO;
                
                NSLog(@"scaned %@",[metadataObj stringValue]);
                
                NSString *outStr =[metadataObj stringValue];

                [self performSelectorOnMainThread:@selector(stopReading) withObject:nil waitUntilDone:NO];
                dispatch_sync(dispatch_get_main_queue(), ^{
                    AppDelegate *appDelegate = (AppDelegate *)[[UIApplication sharedApplication] delegate];
                    [appDelegate applicationIsCalling:outStr];
                    appDelegate = nil;
                });
              
                    [self dismissViewControllerAnimated:YES completion:nil];
            }
        }
    }
}



- (void)moveScanLayer:(NSTimer *)timer
{
    CGRect frame = _scanLayer.frame;
    if (_midBox.frame.size.height < _scanLayer.frame.origin.y) {
        frame.origin.y = 0;
        _scanLayer.frame = frame;
    }else{
        
        frame.origin.y += 9;
        
        [UIView animateWithDuration:0.1 animations:^{
            _scanLayer.frame = frame;
        }];
    }
}

- (BOOL)shouldAutorotate
{
    return NO;
}

@end
