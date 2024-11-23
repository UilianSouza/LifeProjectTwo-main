import AsyncStorage from '@react-native-async-storage/async-storage';

// Inicializa o banco de dados
export const initializeDatabase = async () => {
  try {
    const users = await AsyncStorage.getItem('users');
    if (!users) {
      await AsyncStorage.setItem('users', JSON.stringify({})); // Cria um objeto vazio se não houver dados
      console.log('Banco de dados inicializado.');
    }
  } catch (error) {
    console.error('Erro ao inicializar o banco de dados:', error);
  }
};

// Registra um novo usuário
export const registerUser = async (cpf: string, data: { name: string; password: string }) => {
  try {
    const users = await AsyncStorage.getItem('users');
    const parsedUsers = JSON.parse(users || '{}');

    if (parsedUsers[cpf]) {
      console.warn('Usuário com este CPF já está registrado.');
      return false; // CPF já existe
    }

    parsedUsers[cpf] = data;
    await AsyncStorage.setItem('users', JSON.stringify(parsedUsers));
    console.log('Usuário registrado com sucesso.');
    return true; // Cadastro realizado
  } catch (error) {
    console.error('Erro ao registrar o usuário:', error);
    return false;
  }
};

// Verifica se um usuário existe
export const checkUserExists = async (cpf: string) => {
  try {
    const users = await AsyncStorage.getItem('users');
    const parsedUsers = JSON.parse(users || '{}');

    if (parsedUsers[cpf]) {
      return { name: parsedUsers[cpf].name }; // Retorna informações do usuário
    }
    return null; // Usuário não encontrado
  } catch (error) {
    console.error('Erro ao verificar o usuário:', error);
    return null;
  }
};

// Atualiza a senha do usuário
export const updatePasswordInDB = async (cpf: string, newPassword: string) => {
  try {
    const users = await AsyncStorage.getItem('users');
    const parsedUsers = JSON.parse(users || '{}');

    if (parsedUsers[cpf]) {
      parsedUsers[cpf].password = newPassword;
      await AsyncStorage.setItem('users', JSON.stringify(parsedUsers));
      console.log('Senha atualizada com sucesso.');
      return true;
    }
    console.warn('Usuário não encontrado para atualizar senha.');
    return false;
  } catch (error) {
    console.error('Erro ao atualizar a senha:', error);
    return false;
  }
};

// Autentica um usuário
export const authenticateUser = async (cpf: string, password: string) => {
  try {
    const users = await AsyncStorage.getItem('users');
    const parsedUsers = JSON.parse(users || '{}');

    if (parsedUsers[cpf] && parsedUsers[cpf].password === password) {
      console.log('Autenticação bem-sucedida.');
      return true; // Autenticação válida
    }
    console.warn('CPF ou senha inválidos.');
    return false;
  } catch (error) {
    console.error('Erro ao autenticar o usuário:', error);
    return false;
  }
};

// Exclui todos os dados do banco
export const clearDatabase = async () => {
  try {
    await AsyncStorage.removeItem('users');
    console.log('Banco de dados limpo com sucesso.');
  } catch (error) {
    console.error('Erro ao limpar o banco de dados:', error);
  }
};
