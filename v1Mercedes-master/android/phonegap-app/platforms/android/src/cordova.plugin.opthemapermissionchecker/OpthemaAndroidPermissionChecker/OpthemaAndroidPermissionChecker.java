package cordova.plugin.opthemapermissionchecker.OpthemaAndroidPermissionChecker;

import android.Manifest;
import android.annotation.TargetApi;
import android.content.pm.PackageManager;
import android.os.Build;
import android.support.v4.app.ActivityCompat;
import android.util.Log;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;


import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;


/**
 * This class echoes a string called from JavaScript.
 */
public class OpthemaAndroidPermissionChecker extends CordovaPlugin {

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        if (action.equals("coolMethod")) {
            String message = args.getString(0);
            this.coolMethod(message, callbackContext);
            return true;
        }
        else if(action.equals("permissionCheck"))
        {
            String message = args.getString(0);
            this.permissionCheck(message,callbackContext);
            return true;
        }
        else if(action.equals("permissionAsk"))
        {
            String message = args.getString(0);
            this.permissionAsk(message,callbackContext);
            return true;
        }
        return false;
    }

    private void coolMethod(String message, CallbackContext callbackContext) {
        if (message != null && message.length() > 0) {
            callbackContext.success(message);
        } else {
            callbackContext.error("Expected one non-empty string argument.");
        }
    }
	
    @TargetApi(Build.VERSION_CODES.M)
    private void permissionCheck(String permission, CallbackContext callbackContext)
    {
        ActivityCompat.requestPermissions(cordova.getActivity(),new String[]{com.daimler.aftersalestracker.android.Manifest.permission.AnalyticDataPermission},200);
        if (permission != null && permission.length() > 0) {
            if(cordova.getActivity().checkSelfPermission(com.daimler.aftersalestracker.android.Manifest.permission.AnalyticDataPermission) == PackageManager.PERMISSION_GRANTED)
            {
                callbackContext.success("PermissionIsOpen");
                Log.d("PermissionCheck","Permission is open...");
            }else
            {
                callbackContext.success("PermissionIsClose");
                Log.d("PermissionCheck","Permission is close...");
            }

        } else {
            callbackContext.error("Expected one non-empty string argument.");
        }
    }

    private void permissionAsk(String message, CallbackContext callbackContext)
    {
        if(message != null && message.length() > 0)
        {

            ActivityCompat.requestPermissions(cordova.getActivity(),new String[]{com.daimler.aftersalestracker.android.Manifest.permission.AnalyticDataPermission},200);
            callbackContext.success("success");
        }else{
            callbackContext.error("error");
        }
    }
	
}
