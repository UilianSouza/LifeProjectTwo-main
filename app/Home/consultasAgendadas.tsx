import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

  const renderConsulta = ({ item }: any) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Consulta #{item.id}</Text>
      <Text>Tratamento: {item.tratamento}</Text>
      <Text>Data: {item.data}</Text>
      <Text>Hora: {item.hora}</Text>
      <Text>Observações: {item.observacoes}</Text>
      <Text style={styles.custoText}>Custo: R$ {item.custo}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Consultas Agendadas</Text>

      {consultas.length === 0 ? (
        <Text style={styles.emptyText}>Nenhuma consulta agendada.</Text>
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
});

export default ConsultasAgendadas;
