import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { registerUser, initializeDatabase } from '../app/BD/Database'; // Certifique-se do caminho correto

type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Signup'>;

const sanitizeCPF = (cpf: string): string => cpf.replace(/\D/g, '');

const SignupScreen: React.FC<Props> = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [age, setAge] = useState('');
  const [cpf, setCpf] = useState('');
  

  const navigation = useNavigation<Props['navigation']>();

  useEffect(() => {
    initializeDatabase();
  }, []);

  const handleSignup = async () => {
    if (!name || !password || !confirmPassword || !age || !cpf) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }
  
    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem. Tente novamente.');
      return;
    }
  
    const sanitizedCPF = sanitizeCPF(cpf);
  
    const newUser = { name, password, age, cpf: sanitizedCPF };
  
    const isSuccess = await registerUser(sanitizedCPF, newUser);
    if (isSuccess) {
      Alert.alert('Cadastro realizado com sucesso!', 'Você já pode fazer login.', [
        { text: 'OK', onPress: () => navigation.navigate('Login') },
      ]);
    } else {
      Alert.alert('Erro', 'CPF já existe. Tente outro.');
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Usuário</Text>
      <View style={styles.card}>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={name}
          onChangeText={setName}
          placeholderTextColor="#888"
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor="#888"
        />
        <TextInput
          style={styles.input}
          placeholder="Confirmar Senha"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          placeholderTextColor="#888"
        />
        <TextInput
          style={styles.input}
          placeholder="Idade"
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
          placeholderTextColor="#888"
        />
        <TextInput
          style={styles.input}
          placeholder="CPF"
          value={cpf}
          onChangeText={setCpf}
          keyboardType="numeric"
          placeholderTextColor="#888"
        />
        <TouchableOpacity onPress={handleSignup} style={styles.signupButton}>
          <Text style={styles.signupButtonText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#03115e',
    marginBottom: 20,
  },
  card: {
    width: '100%',
    padding: 20,
    backgroundColor: '#d9ddff',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  input: {
    width: '100%',
    padding: 15,
    marginVertical: 10,
    borderWidth: 0,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    fontSize: 16,
    color: '#333',
  },
  signupButton: {
    width: '100%',
    padding: 15,
    backgroundColor: '#203087',
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  signupButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginButton: {
    width: '100%',
    padding: 15,
    backgroundColor: '#007AFF',
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 15,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SignupScreen;
