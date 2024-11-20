import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { authenticateUser, initializeDatabase } from '../app/BD/Database'; // Importe a função de autenticação e inicialização

type RootStackParamList = {
  Login: undefined;
  Home: undefined; // A tela Home precisa ser definida aqui também
};

type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false); // Para controlar o estado de autenticação
  const [loginMessage, setLoginMessage] = useState(''); // Para controlar a mensagem de login

  // Inicializa o banco de dados
  useEffect(() => {
    initializeDatabase(); // Inicializa o banco de dados (AsyncStorage)
  }, []);

  // Função que lida com o login
  const handleLogin = async () => {
    if (!username || !password) {
      setLoginMessage('Por favor, preencha todos os campos.');
      return;
    }

    // Indica que a autenticação está em andamento
    setIsAuthenticating(true);
    setLoginMessage('');

    // Chama a função de autenticação
    const isAuthenticated = await authenticateUser(username, password);

    if (isAuthenticated) {

      // Atraso para garantir que a mensagem seja exibida antes de navegar
      setTimeout(() => {
        navigation.navigate('Home'); // Navega para a tela Home
      }, 500); // 1 segundo de atraso
    } else {
      setLoginMessage('Nome de usuário ou senha incorretos.');
    }

    // Restaura o estado de autenticação para permitir novos logins
    setIsAuthenticating(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.appName}>OdontoLife</Text>

        {/* Campo de Usuário */}
        <TextInput
          style={styles.input}
          placeholder="Usuário"
          value={username}
          onChangeText={setUsername}
        />
        
        {/* Campo de Senha */}
        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity 
          onPress={handleLogin} 
          style={styles.loginButton} 
          disabled={isAuthenticating} // Desabilita o botão enquanto está autenticando
        >
          <View style={styles.loginButtonContent}>
            <Text style={styles.loginButtonText}>
              {isAuthenticating ? 'Entrando...' : 'Entrar'}
            </Text>
          </View>
        </TouchableOpacity>

        {/* Exibe a mensagem de login */}
        {loginMessage ? <Text style={styles.loginMessage}>{loginMessage}</Text> : null}

        <Link href='/recuperar' style={styles.forgotPassword}>
          <Text style={styles.forgotPasswordText}>Esqueceu a senha?</Text>
        </Link>

        <Link href="/cad" style={styles.signupLink}>
          <Text style={styles.signupText}>Não tem uma conta? Cadastre-se aqui</Text>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  card: {
    width: '100%',
    padding: 20,
    backgroundColor: '#BC8F8F',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
    alignItems: 'center',
  },
  appName: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#03115e',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    padding: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#a0a0a0',
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  loginButton: {
    backgroundColor: '#203087',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 15,
    width: '90%',
  },
  loginButtonContent: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    width: '100%',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  forgotPassword: {
    marginTop: 15,
  },
  forgotPasswordText: {
    color: '#03115e',
  },
  signupLink: {
    marginTop: 10,
  },
  signupText: {
    color: '#03115e',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  loginMessage: {
    marginTop: 10,
    fontSize: 16,
    color: '#03115e',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
