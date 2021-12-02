import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import * as Google from 'expo-auth-session/providers/google';

export default function HomeComponent({ navigation }) {

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: '----------------------------------------------'
  });

  React.useEffect(() =>{
    if(response?.type==='success'){
      console.log(response);
      navigation.navigate('poke')
  }
  
  },[response]);


  return (
    <View style={{ display:'flex',flex: 1, alignItems: 'center', justifyContent: 'center',}}>
      <Text>Home Screen 2</Text>
      <Button
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginBottom:40}}
        title="ingresar con google 1"
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