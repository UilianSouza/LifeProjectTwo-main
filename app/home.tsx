import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './index'; // Importa a tipagem do arquivo App.tsx

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const Home = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const tratamento = { nome: 'Limpeza', valor: 100 }; 

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo à OdontoLife</Text>
      

      {/* Botões */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('cadConsultas', { tratamento })}
      >
        <Text style={styles.buttonText}>Agendar Consultas</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Consultas')}
      >
        <Text style={styles.buttonText}>Consultas Agendadas</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('TratamentosServicos')}
      >
        <Text style={styles.buttonText}>Tratamentos</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 90,
    textAlign: 'center',
    marginTop: 150,
    
  },
  button: {
    backgroundColor: '#324cdb',
    padding: 25,
    width: 300,
    borderRadius: 15,
    marginBottom: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    
    color: '#fff',
    fontSize: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
