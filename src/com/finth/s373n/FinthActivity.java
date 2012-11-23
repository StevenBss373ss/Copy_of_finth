package com.finth.s373n;

import com.phonegap.*;
import android.os.Bundle;

public class FinthActivity extends DroidGap {
    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        super.setBooleanProperty("keepRunning", true);
        super.loadUrl("file:///android_asset/www/index.html");
    }
}
