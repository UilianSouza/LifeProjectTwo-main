import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { checkUserExists, updatePasswordInDB } from '../app/BD/Database'; // Funções para verificar o CPF e atualizar a senha

export default function PasswordRecoveryScreen() {
  const [cpf, setCpf] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [userName, setUserName] = useState(''); // Para armazenar o nome do usuário
  const [step, setStep] = useState(1); // Controla a etapa da recuperação de senha
  const router = useRouter();

  // Função para verificar o CPF no banco de dados
  const handleRequestCode = async (cpf: string) => { // Tipando o parâmetro como string
    if (cpf.trim() === '') {
      Alert.alert('Erro', 'Por favor, insira seu CPF');
      return;
    }

    // Verifica se o CPF está registrado no banco de dados
    const user = await checkUserExists(cpf);
    if (user) {
      setUserName(user.name); // Armazena o nome do usuário
      setStep(2); // Passa para a próxima etapa, que é a redefinição de senha
    } else {
      Alert.alert('Erro', 'CPF não encontrado. Verifique seu CPF ou registre-se.');
    }
  };

  // Função para redefinir a senha no banco de dados
  const handleResetPassword = async () => {
    if (newPassword.trim() === '') {
      Alert.alert('Erro', 'Por favor, insira sua nova senha');
      return;
    }

    // Atualiza a senha no banco de dados
    const passwordUpdated = await updatePasswordInDB(cpf, newPassword);
    if (passwordUpdated) {
      Alert.alert('Senha redefinida', 'Sua senha foi alterada com sucesso!');
      router.push('/login'); // Navega para a tela de login
    } else {
      Alert.alert('Erro', 'Não foi possível atualizar a senha. Tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {step === 1 && (
          <>
            <Text style={styles.title}>Recuperar senha</Text>
            <TextInput
              style={styles.input}
              placeholder="CPF"
              value={cpf}
              onChangeText={setCpf}
              keyboardType="numeric"
            />
            <TouchableOpacity style={styles.button} onPress={() => handleRequestCode(cpf)}>
              <Text style={styles.buttonText}>Verificar CPF</Text>
            </TouchableOpacity>
          </>
        )}

        {step === 2 && userName && (
          <>
            <Text style={styles.title}>Olá, {userName}!</Text>
            <Text style={styles.subtitle}>Agora, insira sua nova senha</Text>
            <TextInput
              style={styles.input}
              placeholder="Nova senha"
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
              <Text style={styles.buttonText}>Redefinir senha</Text>
            </TouchableOpacity>
          </>
        )}
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
    elevation: 8, // Sombra para Android
    alignItems: 'center', // Centraliza o conteúdo dentro do cartão
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#03115e',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#03115e',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#203087',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: 15,
    marginVertical: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
