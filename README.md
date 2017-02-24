#p12 vqgxruyqgk
#onesignal app-id: 92ef9314-1d1d-4c51-99c7-f265769161da

Server key
AAAAW2IglYI:APA91bG_sByB8wyg7ruZVmxAQ-eMT1o5iXsx0JUX8AHnDadLK78JFRgd-RRm39UqSmCY3Jgaj7iZck6Aig2salP5po6ai8aJVDf9zQqD3FI4WjdNL78KXDWA2yQKXXOgVvOK7fEa_4Pf

Sender ID
392488326530


Notification object received example:

{
    shown: true, // BOOLEAN: If the notification was displayed to the user or not
    payload: {notificationID : "", contentAvailable : false, badge : 1, sound : "default", title : "Hello!", body : "World", launchURL : "", }, // OBJECT; the push data
    displayType: 1, //The display method of a received notification
    silentNotification: false // BOOLEAN : Wether the received notification was a silent one
}


# destructuring
const PostList = ({ data: { loading, posts } }) => ()


# apollo pre-fetching (for example for the first 5 events leaderboards, to make it snappy)
const FeedEntry = ({ entry, currentUser, onVote, client }) => {
  const repoLink = `/${entry.repository.full_name}`;
  const prefetchComments = (repoFullName) => () => {
    client.query({
      query: COMMENT_QUERY,
      variables: { repoName: repoFullName },
    });
  };

  return (
    <div className="media">
      ...
      <div className="media-body">
        <RepoInfo
          description={entry.repository.description}
          stargazers_count={entry.repository.stargazers_count}
          open_issues_count={entry.repository.open_issues_count}
          created_at={entry.createdAt}
          user_url={entry.postedBy.html_url}
          username={entry.postedBy.login}
        >
          <Link to={repoLink} onMouseOver={prefetchComments(entry.repository.full_name)}>
              View comments ({entry.commentCount})
          </Link>
        </RepoInfo>
      </div>
    </div>
  );
};

const FeedEntryWithApollo = withApollo(FeedEntry);




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
