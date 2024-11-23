import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../index'; // Importa os tipos
import { StackNavigationProp } from '@react-navigation/stack';

type TratamentosServicosNavigationProp = StackNavigationProp<RootStackParamList, 'TratamentosServicos'>;

const TratamentosServicos = () => {
  const navigation = useNavigation<TratamentosServicosNavigationProp>(); // Tipando a navegação

  const tratamentos = [
    { nome: 'Limpeza', valor: 100 },
    { nome: 'Restauração', valor: 200 },
    { nome: 'Implante', valor: 1500 },
  ];

  const navegarParaAgendamento = (tratamento: { nome: string; valor: number }) => {
    navigation.navigate('cadConsultas', { tratamento }); // Passando o parâmetro
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tratamentos e Serviços</Text>
      {tratamentos.map((tratamento, index) => (
        <View key={index} style={styles.card}>
          <Text>{tratamento.nome}</Text>
          <Text>R$ {tratamento.valor}</Text>
          <Button title="Agendar" onPress={() => navegarParaAgendamento(tratamento)} />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#f0f0f0',
    marginBottom: 10,
    padding: 15,
    borderRadius: 5,
  },
});

export default TratamentosServicos;
