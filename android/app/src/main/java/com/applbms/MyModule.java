package com.applbms;

import android.provider.CallLog;
import android.provider.CallLog.Calls;
import android.database.Cursor;
import android.content.Context;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;

import org.json.JSONArray;
import org.json.JSONException;

import javax.annotation.Nullable;

public class MyModule extends ReactContextBaseJavaModule {

    private Context context;

    public MyModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.context = reactContext;
    }

    @Override
    public String getName() {
        return "MyModule";
    }

    @ReactMethod
    public void loadAll(Promise promise) {
        load(-1, promise);
    }

    @ReactMethod
    public void load(int limit, Promise promise) {
        loadWithFilter(limit, null, promise);
    }

    @ReactMethod
    public void loadWithFilter(int limit, @Nullable ReadableMap filter, Promise promise) {
        try {
            Cursor cursor = this.context.getContentResolver().query(CallLog.Calls.CONTENT_URI,
                    null, null, null, CallLog.Calls.DATE + " DESC");

            WritableArray result = Arguments.createArray();

            if (cursor == null) {
                promise.resolve(result);
                return;
            }

            boolean nullFilter = filter == null;
            String minTimestamp = !nullFilter && filter.hasKey("minTimestamp") ? filter.getString("minTimestamp") : "0";
            String maxTimestamp = !nullFilter && filter.hasKey("maxTimestamp") ? filter.getString("maxTimestamp")
                    : "-1";
            String phoneNumbers = !nullFilter && filter.hasKey("phoneNumbers") ? filter.getString("phoneNumbers")
                    : "[]";
            JSONArray phoneNumbersArray = new JSONArray(phoneNumbers);

            Set<String> phoneNumberSet = new HashSet<>(Arrays.asList(toStringArray(phoneNumbersArray)));

            int callLogCount = 0;

            final int NUMBER_COLUMN_INDEX = cursor.getColumnIndex(Calls.NUMBER);
            final int TYPE_COLUMN_INDEX = cursor.getColumnIndex(Calls.TYPE);
            final int DATE_COLUMN_INDEX = cursor.getColumnIndex(Calls.DATE);
            final int DURATION_COLUMN_INDEX = cursor.getColumnIndex(Calls.DURATION);
            final int NAME_COLUMN_INDEX = cursor.getColumnIndex(Calls.CACHED_NAME);
            final int CACHED_PHOTO_COLUMN_INDEX = cursor.getColumnIndex(Calls.COMPOSER_PHOTO_URI);

            boolean minTimestampDefined = minTimestamp != null && !minTimestamp.equals("0");
            boolean minTimestampReached = false;

            while (cursor.moveToNext() && this.shouldContinue(limit, callLogCount) && !minTimestampReached) {
                String phoneNumber = cursor.getString(NUMBER_COLUMN_INDEX);
                int duration = cursor.getInt(DURATION_COLUMN_INDEX);
                String name = cursor.getString(NAME_COLUMN_INDEX);
                String photoId = cursor.getString(CACHED_PHOTO_COLUMN_INDEX);

                String timestampStr = cursor.getString(DATE_COLUMN_INDEX);
                minTimestampReached = minTimestampDefined
                        && Long.parseLong(timestampStr) <= Long.parseLong(minTimestamp);

                DateFormat df = SimpleDateFormat.getDateTimeInstance(SimpleDateFormat.MEDIUM, SimpleDateFormat.MEDIUM);
                // DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                String dateTime = df.format(new Date(Long.valueOf(timestampStr)));

                String type = this.resolveCallType(cursor.getInt(TYPE_COLUMN_INDEX));

                boolean passesPhoneFilter = phoneNumberSet == null || phoneNumberSet.isEmpty()
                        || phoneNumberSet.contains(phoneNumber);
                boolean passesMinTimestampFilter = minTimestamp == null || minTimestamp.equals("0")
                        || Long.parseLong(timestampStr) >= Long.parseLong(minTimestamp);
                boolean passesMaxTimestampFilter = maxTimestamp == null || maxTimestamp.equals("-1")
                        || Long.parseLong(timestampStr) <= Long.parseLong(maxTimestamp);
                boolean passesFilter = passesPhoneFilter && passesMinTimestampFilter && passesMaxTimestampFilter;

                if (passesFilter) {
                    WritableMap callLog = Arguments.createMap();
                    callLog.putString("phoneNumber", phoneNumber);
                    callLog.putInt("duration", duration);
                    callLog.putString("name", name);
                    callLog.putString("timestamp", timestampStr);
                    callLog.putString("dateTime", dateTime);
                    callLog.putString("type", type);
                    callLog.putInt("rawType", cursor.getInt(TYPE_COLUMN_INDEX));
                    callLog.putString("photoUri",photoId);
                    callLog.putString("accountId",cursor.getString(cursor.getColumnIndex(Calls.PHONE_ACCOUNT_ID)));
                    result.pushMap(callLog);
                    callLogCount++;
                }
            }

            cursor.close();

            promise.resolve(result);
        } catch (JSONException e) {
            promise.reject(e);
        }
    }

    private void updateCallLog(WritableMap callLog, Cursor cursor) {
        callLog.putString("phoneNumber", cursor.getString(cursor.getColumnIndex(Calls.NUMBER)));
        callLog.putInt("duration", cursor.getInt(cursor.getColumnIndex(Calls.DURATION)));
        callLog.putString("name", cursor.getString(cursor.getColumnIndex(Calls.CACHED_NAME)));
        callLog.putString("timestamp", cursor.getString(cursor.getColumnIndex(Calls.DATE)));
        callLog.putString("type", resolveCallType(cursor.getInt(cursor.getColumnIndex(Calls.TYPE))));
        callLog.putInt("rawType", cursor.getInt(cursor.getColumnIndex(Calls.TYPE)));
        DateFormat df = SimpleDateFormat.getDateTimeInstance(SimpleDateFormat.MEDIUM, SimpleDateFormat.MEDIUM);
        callLog.putString("dateTime", df.format(new Date(Long.valueOf(callLog.getString("timestamp")))));
    }

    private String cleanPhoneNumber(String phoneNumber) {
        // Remove whitespaces and other characters
        return phoneNumber.replaceAll("\\s", "");
    }

    public static String[] toStringArray(JSONArray array) {
        if (array == null)
            return null;

        String[] arr = new String[array.length()];
        for (int i = 0; i < arr.length; i++) {
            arr[i] = array.optString(i);
        }
        return arr;
    }

    private String resolveCallType(int callTypeCode) {
        switch (callTypeCode) {
            case Calls.OUTGOING_TYPE:
                return "OUTGOING";
            case Calls.INCOMING_TYPE:
                return "INCOMING";
            case Calls.MISSED_TYPE:
                return "MISSED";
            default:
                return "UNKNOWN";
        }
    }

    private boolean shouldContinue(int limit, int count) {
        return limit < 0 || count < limit;
    }
}
