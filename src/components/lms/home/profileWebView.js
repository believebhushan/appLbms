import React from 'react';
import { WebView } from 'react-native-webview';

const ProfileWebView = ({route}) => {
    const {profile_url} = route.params;
  return <WebView source={{ uri: profile_url }} style={{ flex: 1 }} />;
}

export default ProfileWebView;