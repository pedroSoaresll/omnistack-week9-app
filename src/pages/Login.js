import React, { useState, useEffect } from 'react';
import { View, Image, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, AsyncStorage } from 'react-native';
import api from '../services/api';
import Logo from '../assets/logo.png';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [techs, setTechs] = useState('');

  useEffect(() => {
    async function isUserLogger() {
      const user = await AsyncStorage.getItem('user');

      if (user) {
        navigation.navigate('List');
      }
    }

    isUserLogger();
  }, []);

  async function handleSubmit() {
    const response = await api.post('/sessions', {
      email
    });

    const { _id } = response.data;
    console.log(_id);

    await AsyncStorage.setItem('user', _id);
    await AsyncStorage.setItem('techs', techs);

    navigation.navigate('List');
  }

  return <KeyboardAvoidingView behavior="padding" style={styles.container}>
    <Image source={Logo} />

    <View style={styles.form}>
      <Text style={styles.label}>SEU E-MAIL *</Text>
      <TextInput style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Seu e-mail"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail} />

      <Text style={styles.label}>TECNOLOGIAS *</Text>
      <TextInput style={styles.input}
        autoCapitalize="words"
        autoCorrect={false}
        placeholder="Tecnologias de interesse"
        placeholderTextColor="#999"
        value={techs}
        onChangeText={setTechs} />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Encontrar spots</Text>
      </TouchableOpacity>
    </View>
  </KeyboardAvoidingView>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  form: {
    alignSelf: 'stretch',
    paddingHorizontal: 30,
    marginTop: 30,
  },

  label: {
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 8,
  },

  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#444',
    height: 44,
    marginBottom: 20,
    borderRadius: 2,
  },

  button: {
    height: 42,
    backgroundColor: '#f05a5b',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    color: '#FFF',
  },

  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  }
})
