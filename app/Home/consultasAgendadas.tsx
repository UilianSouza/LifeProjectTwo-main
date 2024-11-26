import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

const ConsultasAgendadas = () => {
  const [consultas, setConsultas] = useState<any[]>([]);

  useEffect(() => {
    const carregarConsultas = async () => {
      try {
        const consultasSalvas = await AsyncStorage.getItem('consultas');
        const consultasParse = consultasSalvas ? JSON.parse(consultasSalvas) : [];
        setConsultas(consultasParse);
      } catch (error) {
        console.error('Erro ao carregar consultas:', error);
        Alert.alert('Erro', 'Houve um erro ao carregar as consultas.');
      }
    };

    carregarConsultas();
  }, []);

  const desmarcarConsulta = async (id: number) => {
    Alert.alert(
      'Confirmar',
      'Deseja realmente desmarcar esta consulta?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: async () => {
            try {
              const consultasAtualizadas = consultas.filter((consulta) => consulta.id !== id);
              setConsultas(consultasAtualizadas);
              await AsyncStorage.setItem('consultas', JSON.stringify(consultasAtualizadas));
              Alert.alert('Sucesso', 'Consulta desmarcada com sucesso!');
            } catch (error) {
              console.error('Erro ao desmarcar consulta:', error);
              Alert.alert('Erro', 'Houve um erro ao desmarcar a consulta.');
            }
          },
        },
      ]
    );
  };

  const renderConsulta = ({ item }: any) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>
        <Ionicons name="calendar" size={20} color="#000" /> Consulta #{item.id}
      </Text>
      <Text>
        <Ionicons name="person" size={18} color="#000" /> Nome: {item.nome}
      </Text>
      <Text>
        <Ionicons name="medkit" size={18} color="#000" /> Tratamento: {item.tratamento}
      </Text>
      <Text>
        <Ionicons name="calendar-outline" size={18} color="#000" /> Data: {item.data}
      </Text>
      <Text>
        <Ionicons name="time-outline" size={18} color="#000" /> Horário: {item.hora}
      </Text>
      <Text>
        <Ionicons name="document-text-outline" size={18} color="#000" /> Observações: {item.observacoes}
      </Text>
      <Text style={styles.custoText}>
        <Ionicons name="cash-outline" size={18} color="#007bff" /> Custo: R$ {item.custo}
      </Text>
      <TouchableOpacity
        style={styles.desmarcarButton}
        onPress={() => desmarcarConsulta(item.id)}
      >
        <Text style={styles.desmarcarText}>Desmarcar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Consultas Agendadas</Text>

      {consultas.length === 0 ? (
        <Text style={styles.emptyText}>
          <Ionicons name="alert-circle-outline" size={24} color="#777" /> Nenhuma consulta agendada.
        </Text>
      ) : (
        <FlatList
          data={consultas}
          renderItem={renderConsulta}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
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
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  custoText: {
    fontSize: 16,
    color: '#007bff',
    marginTop: 10,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#777',
  },
  desmarcarButton: {
    marginTop: 15,
    backgroundColor: '#ff4d4d',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  desmarcarText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ConsultasAgendadas;
