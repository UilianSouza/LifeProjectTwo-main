import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './index'; // Importa a tipagem do arquivo App.tsx

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const Home = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const tratamento = { nome: '', valor: 0 };

  return (
    <View style={styles.container}>

      {/* Agendar Consultas */}
      <View style={styles.buttonContainer}>
        <Image source={require('../assets/images/Agendar.png')} style={styles.icon} />
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('cadConsultas', { tratamento })}
        >
          <Text style={styles.buttonText}>Agendar Consultas</Text>
        </TouchableOpacity>
      </View>

      {/* Consultas Agendadas */}
      <View style={styles.buttonContainer}>
        <Image source={require('../assets/images/Consulta.png')} style={styles.icon} />
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Consultas')}
        >
          <Text style={styles.buttonText}>Consultas Agendadas</Text>
        </TouchableOpacity>
      </View>

      {/* Tratamentos */}
      <View style={styles.buttonContainer}>
        <Image source={require('../assets/images/Tratamento.png')} style={styles.icon} />
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('TratamentosServicos')}
        >
          <Text style={styles.buttonText}>Tratamentos</Text>
        </TouchableOpacity>
      </View>

      {/* Imagem FundoB no canto inferior direito */}
      <Image source={require('../assets/images/FundoB.png')} style={styles.fundoB} />

      {/* Imagem FundoC no canto superior esquerdo */}
      <Image source={require('../assets/images/FundoC.png')} style={styles.fundoC} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  buttonContainer: {
    alignItems: 'center',
    marginBottom: 30, // Espaço entre os botões
  },
  icon: {
    width: 90,
    height: 90,
    marginBottom: 10,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#324cdb',
    padding: 25,
    width: 300,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  fundoB: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 200, // Ajuste o tamanho conforme necessário
    height: 170, // Ajuste o tamanho conforme necessário
  },
  fundoC: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 250, // Ajuste o tamanho conforme necessário
    height: 200, // Ajuste o tamanho conforme necessário
  },
});

export default Home;
