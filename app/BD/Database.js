import AsyncStorage from '@react-native-async-storage/async-storage';

// Inicializa o banco de dados com uma estrutura básica
export const initializeDatabase = async () => {
  try {
    const users = await AsyncStorage.getItem('users');
    if (!users) {
      await AsyncStorage.setItem('users', JSON.stringify({})); // Cria um objeto vazio para armazenar usuários
    }
  } catch (error) {
    console.error('Erro ao inicializar o banco de dados:', error);
  }
};

// Registra um novo usuário
export const registerUser = async (cpf, data) => {
  try {
    const users = await AsyncStorage.getItem('users');
    const parsedUsers = JSON.parse(users) || {};

    // Verifica se o CPF já existe
    if (parsedUsers[cpf]) {
      return false; // CPF já existe
    }

    // Salva o novo usuário com o CPF
    parsedUsers[cpf] = data;
    await AsyncStorage.setItem('users', JSON.stringify(parsedUsers));
    return true; // Cadastro realizado com sucesso
  } catch (error) {
    console.error('Erro ao registrar o usuário:', error);
    return false;
  }
};

// Verifica se o usuário existe pelo CPF e retorna o nome se encontrado
export const checkUserExists = async (cpf) => {
  try {
    const users = await AsyncStorage.getItem('users');
    const parsedUsers = JSON.parse(users) || {};

    // Verifica se o usuário com o CPF existe
    const user = parsedUsers[cpf];
    if (user) {
      return { name: user.name }; // Retorna o nome do usuário se encontrado
    }
    return null; // Retorna null se o CPF não for encontrado
  } catch (error) {
    console.error('Erro ao verificar o usuário:', error);
    return null;
  }
};

// Atualiza a senha do usuário com base no CPF
export const updatePasswordInDB = async (cpf, newPassword) => {
  try {
    const users = await AsyncStorage.getItem('users');
    const parsedUsers = JSON.parse(users) || {};

    // Encontra o usuário pelo CPF
    const user = parsedUsers[cpf];
    if (user) {
      // Atualiza a senha do usuário
      user.password = newPassword;

      // Salva os dados atualizados de volta no AsyncStorage
      await AsyncStorage.setItem('users', JSON.stringify(parsedUsers));
      return true; // Retorna verdadeiro se a senha foi atualizada
    }
    return false; // Retorna falso se o usuário não foi encontrado
  } catch (error) {
    console.error('Erro ao atualizar a senha:', error);
    return false;
  }
};

// Autentica um usuário com CPF e senha
export const authenticateUser = async (cpf, password) => {
  try {
    const users = await AsyncStorage.getItem('users');
    const parsedUsers = JSON.parse(users) || {};

    // Verifica se o CPF existe e se a senha está correta
    const user = parsedUsers[cpf];
    if (user && user.password === password) {
      return true; // Autenticação bem-sucedida
    }
    return false; // CPF ou senha incorretos
  } catch (error) {
    console.error('Erro ao autenticar o usuário:', error);
    return false;
  }
};

// Exclui todos os dados do banco (para testes ou reinicialização)
export const clearDatabase = async () => {
  try {
    await AsyncStorage.removeItem('users');
    console.log('Banco de dados limpo.');
  } catch (error) {
    console.error('Erro ao limpar o banco de dados:', error);
  }
};
