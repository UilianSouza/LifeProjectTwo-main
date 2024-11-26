import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, Image, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../index'; // Importa os tipos
import { StackNavigationProp } from '@react-navigation/stack';

type TratamentosServicosNavigationProp = StackNavigationProp<RootStackParamList, 'TratamentosServicos'>;

const TratamentosServicos = () => {
  const navigation = useNavigation<TratamentosServicosNavigationProp>(); // Tipando a navegação
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [tratamentos, setTratamentos] = useState([
    { nome: 'Limpeza Básica', valor: 80 },
    { nome: 'Aplicação de Flúor', valor: 50 },
    { nome: 'Remoção de Tártaro', valor: 100 },
    { nome: 'Polimento Dental', valor: 70 },
    { nome: 'Clareamento Caseiro', valor: 300 },
    { nome: 'Consulta de Avaliação', valor: 50 },
    { nome: 'Manutenção de Aparelho', valor: 150 },
    { nome: 'Orientação sobre Higiene Oral', valor: 30 },
    { nome: 'Molde para Prótese ou Aparelho', valor: 100 },
    { nome: 'Confecção de Protetores Bucais', valor: 120 },
    { nome: 'Selantes Dentais', valor: 90 },
    { nome: 'Aplicação de Gel Dental', valor: 40 },
    { nome: 'Confecção de Placa de Mordida', valor: 250 },
    { nome: 'Fototerapia para Sensibilidade', valor: 60 },
    { nome: 'Treinamento de Higiene Bucal', valor: 45 },
    { nome: 'Aplicação de Antissépticos', valor: 35 },
    { nome: 'Atendimento Preventivo Infantil', valor: 70 },
    { nome: 'Profilaxia Dental', valor: 90 },
    { nome: 'Manutenção de Placas Noturnas', valor: 120 },
    { nome: 'Avaliação para Ortodontia', valor: 80 },
    { nome: 'Teste de Fissuras Dentais', valor: 55 },
    { nome: 'Polimento de Próteses', valor: 95 },
    { nome: 'Desgaste de Próteses', valor: 110 },
    { nome: 'Avaliação para Clareamento', valor: 60 },
    { nome: 'Controle de Placa Bacteriana', valor: 75 },
    { nome: 'Retirada de Manchas Superficiais', valor: 100 },
    { nome: 'Manutenção de Próteses', valor: 130 },
    { nome: 'Confecção de Modelos Dentais', valor: 110 },
    { nome: 'Entrega de Kits de Higiene Bucal', valor: 25 },
    { nome: 'Consultoria Personalizada de Cuidados', valor: 90 },
  ]);

  const navegarParaAgendamento = (tratamento: { nome: string; valor: number }) => {
    navigation.navigate('cadConsultas', { tratamento }); // Passando o parâmetro
  };

  const filtrarTratamentos = () => {
    return tratamentos.filter(tratamento =>
      tratamento.nome.toLowerCase().includes(searchText.toLowerCase())
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tratamentos e Serviços</Text>
      
      {/* Botão de Lupa */}
      <TouchableOpacity
        style={styles.searchButton}
        onPress={() => setSearchVisible(!searchVisible)}
      >
        <Text style={styles.searchButtonText}>🔍</Text>
      </TouchableOpacity>

      {/* Barra de Pesquisa */}
      {searchVisible && (
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquise um tratamento..."
          value={searchText}
          onChangeText={setSearchText}
        />
      )}

      <ScrollView 
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
      >
        {filtrarTratamentos().map((tratamento, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.text}>{tratamento.nome}</Text>
            <Text style={styles.text}>R$ {tratamento.valor}</Text>
            <Button
              title="Agendar"
              onPress={() => navegarParaAgendamento(tratamento)}
              color="#324cdb" // Cor personalizada para o botão
            />
          </View>
        ))}
      </ScrollView>

      {/* Imagem FundoC no canto superior esquerdo */}
      <Image source={require('../../assets/images/FundoC.png')} style={styles.fundoC} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    position: 'relative', // Para posicionamento das imagens
  },
  scrollContent: {
    paddingBottom: 200, // Espaçamento para evitar sobreposição com FundoB
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    marginTop: 150,
  },
  card: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    marginVertical: 10,
    borderRadius: 15,
    elevation: 5, // Sombra para Android
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  text: {
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  fundoC: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 250,
    height: 200,
  },
  searchButton: {
    position: 'absolute',
    top: 80,
    right: 10,
    backgroundColor: '#324cdb',
    padding: 5,
    borderRadius: 35,
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 10,
    paddingHorizontal: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
});

export default TratamentosServicos;
