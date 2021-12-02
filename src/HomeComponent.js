import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import * as Google from 'expo-auth-session/providers/google';

export default function HomeComponent({ navigation }) {

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
  });

  React.useEffect(() =>{
    if(response?.type==='success'){
     // console.log(response);
      navigation.navigate('poke',{auth:response.authentication})
  }
  
  },[response]);


  return (
    <View style={{ display:'flex',flex: 1, alignItems: 'center', justifyContent: 'center',}}>
      <Text>Pantalla de inicio</Text>
      <Button
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop:40}}
        title="ingresar con google"
        onPress={() => promptAsync()}
      />
      
      <Button
        style={{  alignItems: 'center', justifyContent: 'center', margin:40}}
        title="About"
        onPress={() => navigation.navigate('about')}
      />
    </View>
  );
}