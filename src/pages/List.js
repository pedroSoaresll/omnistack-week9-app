import React, { useState, useEffect } from 'react';
import { View, AsyncStorage, ScrollView, Image, StyleSheet, SafeAreaView } from 'react-native';
import Logo from '../assets/logo.png';
import SpotList from '../components/SpotList';

export default function List() {
  const [techs, setTechs] = useState([]);

  useEffect(() => {
    async function getTechs() {
      const storageTechs = await AsyncStorage.getItem('techs');
      const techsArray = storageTechs.split(',').map(tech => tech.trim());

      setTechs(techsArray);
    }

    getTechs();
  }, []);

  return <SafeAreaView style={styles.container}>
    <Image source={Logo} style={styles.logo} />

    <ScrollView>
      {techs.map(tech => <SpotList key={tech} tech={tech}></SpotList>)}
    </ScrollView>
  </SafeAreaView>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  logo: {
    height: 32,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 10,
  }
});
