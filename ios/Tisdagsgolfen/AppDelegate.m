/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"
#import <RNCrashes/RNCrashes.h>
#import <RNAnalytics/RNAnalytics.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>

@implementation AppDelegate
@synthesize oneSignal = _oneSignal;

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{

  self.oneSignal = [[RCTOneSignal alloc] initWithLaunchOptions:launchOptions
                      appId:@"92ef9314-1d1d-4c51-99c7-f265769161da"
                      settings:@{kOSSettingsKeyInFocusDisplayOption : @(OSNotificationDisplayTypeNone), kOSSettingsKeyAutoPrompt : @YES}];

  NSURL *jsCodeLocation;

  [RNCrashes registerWithCrashDelegate: [[RNCrashesDelegateAlwaysSend alloc] init]];
  [RNAnalytics registerWithInitiallyEnabled:true];

  #ifdef STORYBOOK
    jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"storybook/index.ios" fallbackResource:nil];
  #else
    jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];
  #endif

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"Tisdagsgolfen"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];

  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];

  return YES;
}

// fetch notifications in the background and foreground
-(void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)notification
fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler {
  [RCTOneSignal didReceiveRemoteNotification:notification];
  completionHandler(UIBackgroundFetchResultNewData);
  // NSLog(@"Notification Body %@", notification);
}

@end
