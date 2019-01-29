package se.fransman.tisdagsgolfen;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.oblador.vectoricons.VectorIconsPackage;
import com.instabug.reactlibrary.RNInstabugReactnativePackage;
import com.swmansion.rnscreens.RNScreensPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import com.geektime.rnonesignalandroid.ReactNativeOneSignalPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(new MainReactPackage(),
            new VectorIconsPackage(),
          new RNInstabugReactnativePackage.Builder("2610c5febca442457463f2b18fb57ce1", MainApplication.this)
              .setInvocationEvent("shake").setPrimaryColor("#3290FC").setFloatingEdge("left")
              .setFloatingButtonOffsetFromTop(250).build(),
          new RNScreensPackage(), new RNGestureHandlerPackage(), new ReactNativeConfigPackage(),
          new ReactNativeOneSignalPackage());
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
