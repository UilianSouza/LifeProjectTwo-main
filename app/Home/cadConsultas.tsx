import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../index'; // Importa os tipos
import { StackNavigationProp } from '@react-navigation/stack';

interface RouteParams {
  tratamento: {
    nome: string;
    valor: number;
  };
}

type CadConsultasNavigationProp = StackNavigationProp<RootStackParamList, 'Consultas'>;

const CadConsultas = () => {
  const navigation = useNavigation<CadConsultasNavigationProp>();
  const route = useRoute();
  const { tratamento } = route.params as RouteParams; // Usando a tipagem aqui

  const [data, setData] = useState('');
  const [hora, setHora] = useState('');
  const [observacoes, setObservacoes] = useState('');

  const salvarConsulta = async () => {
    if (!data || !hora || !observacoes) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    const consulta = {
      id: Date.now(),
      tratamento: tratamento.nome,
      custo: tratamento.valor,
      data,
      hora,
      observacoes,
    };

    try {
      const consultas = await AsyncStorage.getItem('consultas');
      const consultasParse = consultas ? JSON.parse(consultas) : [];
      consultasParse.push(consulta);
      await AsyncStorage.setItem('consultas', JSON.stringify(consultasParse));
      Alert.alert('Sucesso', 'Consulta agendada com sucesso!');
      navigation.navigate('Consultas'); // Redireciona para a tela Consultas
    } catch (error) {
      console.error('Erro ao agendar consulta:', error);
      Alert.alert('Erro', 'Houve um erro ao agendar a consulta.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agendar Consulta</Text>
      <Text>Tratamento: {tratamento.nome}</Text>
      <Text>Valor: R$ {tratamento.valor}</Text>

      <TextInput
        style={styles.input}
        placeholder="Data (dd/mm/aaaa)"
        value={data}
        onChangeText={setData}
      />
      <TextInput
        style={styles.input}
        placeholder="Hora (hh:mm)"
        value={hora}
        onChangeText={setHora}
      />
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Observações"
        value={observacoes}
        onChangeText={setObservacoes}
        multiline
      />

      <Button title="Agendar" onPress={salvarConsulta} />
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
  input: {
    backgroundColor: '#f0f0f0',
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
});

export default CadConsultas;
