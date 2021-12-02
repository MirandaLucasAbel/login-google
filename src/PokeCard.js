import * as React from 'react';
import { useEffect, useState } from 'react';


import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  Text,
  View,
  StyleSheet,
  Image,
  //TextInput,
  TouchableOpacity,
  Button,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from 'react-native';
import Constants from 'expo-constants';
import { Card } from 'react-native-paper';

import { nuevoPokemonRandom,calcularNivel } from './servicios/pokeApi';

import {getUserInfo} from './servicios/GoogleApi';

import MenuComponent from './MenuComponent';


export default function PokeCard({ navigation,route }) {



  const [imagen, setImagen] = useState("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/792.png");
  const [nombre, setNombre] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [exp, setExp] = useState(0);
  const [nivel, setNivel] = useState(1);

  const [auth,setAuth] = useState(null);

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPicture, setUserPicture] = useState("");


  useEffect(() => {
    //console.log(route.params.auth.accessToken);
    setAuth(route.params.auth.accessToken);
    getInfo(auth);
    nuevoPokemon();

  }, []) 

  const reset = async () => {
    setNivel(1);
    setExp(0);
  };

  const nuevoPokemon = async () => {

    setLoading(true);
    await nuevoPokemonRandom()
      .then(response => {
        reset();
        setImagen(response.img);
        setNombre(response.name);
        setLoading(false);
      }).catch((error) => console.error(error))
  };

  const getInfo = async()=>{
    await getUserInfo(auth)
    .then(response => {
      setUserName(response.name);
      setUserPicture(response.img);
      setUserEmail(response.mail);

      console.log(response)
      

    }).catch((error) => console.error(error))
};



  const subirExp = () => {
    setExp(parseInt(exp) + 1);
    setNivel( calcularNivel(exp));
  };



  return (
    <View style={styles.container}>
      <Text> {userName} </Text>
      <Text> {userEmail} </Text>
      <Image source={{ uri: userPicture }} style={styles.imagenPerfil} />
      <Card>
        <ActivityIndicator size="large" animating={isLoading} />
        <Text style={styles.paragraph}>
          {`${nombre}
nivel: ${nivel}
experiencia: ${exp}`}
        </Text>
      </Card>
      <Card>
        <TouchableOpacity activeOpacity={0.5} onPress={subirExp}>
          <Image source={{ uri: imagen }} style={styles.imagen} />
        </TouchableOpacity>
      </Card>
      <Button
        title="nuevo pokemon"
        onPress={nuevoPokemon}
        color="#f194ff"
        style={styles.button}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    //paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  imagen: {
    height: 300,
    margin: 10,
    resizeMode: 'cover',
    marginRight: 7
  },
  imagenPerfil:{
    height: 30
  },
  button: {
    flexDirection: 'row',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,

  },
});
