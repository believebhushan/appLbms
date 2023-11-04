package com.applbms.service;

import android.content.Intent;
import android.os.Bundle;
import com.facebook.react.HeadlessJsTaskService;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.jstasks.HeadlessJsTaskConfig;
import javax.annotation.Nullable;

public class CallService extends HeadlessJsTaskService {

    @Override
    protected @Nullable HeadlessJsTaskConfig getTaskConfig(Intent intent) {
        Bundle extras = intent.getExtras();
        if (extras != null) {
            // Create a new HeadlessJsTaskConfig with the specified parameters.
            return new HeadlessJsTaskConfig(
                "Call",                      // Task name
                Arguments.fromBundle(extras), // Task input data from extras
                5000,                        // Timeout for the task (5 seconds)
                false                        // Optional: defines whether or not the task is allowed in the foreground (default is false)
            );
        }
        return null;
    }
}
