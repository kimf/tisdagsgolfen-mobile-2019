/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import "ReactNativeConfig.h"

@implementation AppDelegate
// @synthesize oneSignal = _oneSignal;

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{

  // NSString *oneSignalAppId = [ReactNativeConfig envFor:@"ONESIGNAL_APP_ID"];
//  self.oneSignal = [[RCTOneSignal alloc] initWithLaunchOptions:launchOptions
//                      appId:oneSignalAppId
//                      settings:@{kOSSettingsKeyInFocusDisplayOption : @(OSNotificationDisplayTypeNone), kOSSettingsKeyAutoPrompt : @YES}];

  NSURL *jsCodeLocation;

  #ifdef STORYBOOK
    jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"storybook/index" fallbackResource:nil];
  #else
    jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
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

//// fetch notifications in the background and foreground
//-(void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)notification
//fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler {
//  [RCTOneSignal didReceiveRemoteNotification:notification];
//  completionHandler(UIBackgroundFetchResultNewData);
//  // NSLog(@"Notification Body %@", notification);
//}

@end
