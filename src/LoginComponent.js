import * as React from 'react';
import { Button, View, Text } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
export default function LoginComponent({ navigation }) {

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: '550348078853-r1bu0t9k3tvna1mu70fnam2d0acoucbl.apps.googleusercontent.com'
  });

  React.useEffect(() =>{
    if(response?.type==='success'){
       navigation.navigate('home')
  }
  
  },[response]);


    
  return (
    <View style={{ display:'flex',flex: 1, alignItems: 'center', justifyContent: 'center',}}>
      <Text>Login Screen</Text>
      <Button
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginBottom:40}}
        title="ingresar con google"
        onPress={() => promptAsync()}
      />
      <Button
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginBottom:40}}
        title="About"
        onPress={() => navigation.navigate('about')}
      />
    </View>
  );
}