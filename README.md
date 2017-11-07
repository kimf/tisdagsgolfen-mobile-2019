// TODO:
 - Move styles to StyleSheet (Performance)
 - Refactor to re-use common views

Notification object received example:

{
    shown: true, // BOOLEAN: If the notification was displayed to the user or not
    payload: {notificationID : "", contentAvailable : false, badge : 1, sound : "default", title : "Hello!", body : "World", launchURL : "", }, // OBJECT; the push data
    displayType: 1, //The display method of a received notification
    silentNotification: false // BOOLEAN : Wether the received notification was a silent one
}



# smart stuff to put in npm scripts


  "scripts": {
    "start": "node node_modules/react-native/local-cli/cli.js start",
    "test": "jest",
    "codepush-key": "code-push deployment ls drumkit -k",
    "adb-reverse": "adb reverse tcp:8081 tcp:8081",
    "ios-dev": "react-native run-ios --simulator='iPhone 5'",
    "ios-codepush-staging": "code-push release-react drumkit ios",
    "ios-codepush-production": "code-push release-react drumkit ios -d Production",
    "ios-bundle": "react-native bundle --dev false --entry-file index.ios.js --bundle-output ios/main.jsbundle --platform ios",
    "ios-build": "react-native run-ios --configuration Release",
    "android-codepush-staging": "code-push release-react drumkit android",
    "android-codepush-production": "code-push release-react drumkit android -d Production",
    "android-clean": "cd android && ./gradlew clean",
    "android-build-debug": "cd android/ && ./gradlew assembleDebug",
    "android-signkey": "keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000",
    "android-release": "cd android && ./gradlew assembleRelease",
    "android-signer": "cd android/app/build/outputs/apk/ && jarsigner -verbose -keystore ~/.android/debug.keystore -storepass android -keypass android app-release-unsigned.apk androiddebugkey",
    "android-dev": "adb uninstall com.dwicao.loginAnimation && react-native run-android && adb reverse tcp:8081 tcp:8081 && react-native start",
    "android-bundle": "react-native bundle --platform android --dev false --entry-file ./index.android.js --bundle-output ./android/app/src/main/assets/index.android.bundle --sourcemap-output ./android/app/src/main/assets/index.android.map --assets-dest ./android/app/src/main/res/"
  },
