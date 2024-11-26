import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, Image, TouchableOpacity, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRoute, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../index';
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
  const { tratamento } = route.params as RouteParams;
  const [nome, setNome] = useState('');
  const [data, setData] = useState<Date | null>(null);
  const [hora, setHora] = useState<Date | null>(null);
  const [observacoes, setObservacoes] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  // Função para gerar IDs incrementais
  const generateId = async (): Promise<number> => {
    const lastId = await AsyncStorage.getItem('lastConsultaId');
    const newId = lastId ? parseInt(lastId, 10) + 1 : 1;
    await AsyncStorage.setItem('lastConsultaId', newId.toString());
    return newId;
  };

  const salvarConsulta = async () => {
    if (!data || !hora || !observacoes) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    const id = await generateId(); // Gera o próximo ID
    const consulta = {
      id,
      nome,
      tratamento: tratamento.nome,
      custo: tratamento.valor,
      data: data.toISOString(),
      hora: hora.toLocaleTimeString('pt-BR'),
      observacoes,
    };

    try {
      const consultas = await AsyncStorage.getItem('consultas');
      const consultasParse = consultas ? JSON.parse(consultas) : [];
      consultasParse.push(consulta);
      await AsyncStorage.setItem('consultas', JSON.stringify(consultasParse));
      Alert.alert('Sucesso', 'Consulta agendada com sucesso!');
      navigation.navigate('Consultas');
    } catch (error) {
      console.error('Erro ao agendar consulta:', error);
      Alert.alert('Erro', 'Houve um erro ao agendar a consulta.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agendamento de Consulta</Text>
      <TouchableOpacity
        style={[styles.button, styles.chooseButton]}
        onPress={() => navigation.navigate('TratamentosServicos')}
      >
        <Text style={styles.buttonText}>Escolher Tratamento</Text>
      </TouchableOpacity>

      <Text style={styles.title2}>TRATAMENTO: {tratamento.nome}</Text>
      <Text style={styles.title2}>VALOR: R$ {tratamento.valor},00</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />

      {/* Seletor de data */}
      <TouchableOpacity
        style={styles.input}
        onPress={() => setShowDatePicker(true)}
      >
        <Text>{data ? data.toLocaleDateString('pt-BR') : 'Selecione uma data'}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={data || new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'calendar'}
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) setData(selectedDate);
          }}
        />
      )}

      {/* Seletor de hora */}
      <TouchableOpacity
        style={styles.input}
        onPress={() => setShowTimePicker(true)}
      >
        <Text>{hora ? hora.toLocaleTimeString('pt-BR') : 'Selecione um horário'}</Text>
      </TouchableOpacity>
      {showTimePicker && (
        <DateTimePicker
          value={hora || new Date()}
          mode="time"
          display={Platform.OS === 'ios' ? 'spinner' : 'clock'}
          onChange={(event, selectedTime) => {
            setShowTimePicker(false);
            if (selectedTime) setHora(selectedTime);
          }}
        />
      )}

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Observações"
        value={observacoes}
        onChangeText={setObservacoes}
        multiline
      />

      {/* Botão personalizado */}
      <TouchableOpacity style={styles.button} onPress={salvarConsulta}>
        <Text style={styles.buttonText}>Agendar</Text>
      </TouchableOpacity>

      {/* Imagens */}
      <Image source={require('../../assets/images/FundoC.png')} style={styles.fundoC} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    position: 'relative',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 150,
  },
  input: {
    backgroundColor: '#f0f0f0',
    marginBottom: 0,
    padding: 10,
    borderRadius: 15,
    marginTop: 10,
  },
  title2: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  fundoC: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 250,
    height: 200,
  },
  button: {
    backgroundColor: '#324cdb',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 15,
    marginTop: 40,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  chooseButton: {
    backgroundColor: '#324cdb',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 15,
    marginTop: 40,
    alignItems: 'center',
  },
});

export default CadConsultas;
