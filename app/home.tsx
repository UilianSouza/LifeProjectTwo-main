import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, Animated } from 'react-native';
import { AntDesign, MaterialIcons, Ionicons } from '@expo/vector-icons';

// Definindo a interface para o tópico
interface Topic {
  id: string;
  title: string;
}

// Array de tópicos com tipo explícito
const topics: Topic[] = [
  { id: '1', title: 'Tópico 1' },
  { id: '2', title: 'Tópico 2' },
  { id: '3', title: 'Tópico 3' },
  { id: '4', title: 'Tópico 4' },
  { id: '5', title: 'Tópico 5' },
];

const HomeScreen: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [expanded, setExpanded] = useState(false); // Estado para expansão dos botões flutuantes
  const slideAnim = useRef(new Animated.Value(-250)).current;
  const animationValues = [useRef(new Animated.Value(0)).current, useRef(new Animated.Value(0)).current, useRef(new Animated.Value(0)).current]; // Valores de animação para os botões menores

  const handleMenuToggle = () => {
    const toValue = menuOpen ? -250 : 0;
    Animated.timing(slideAnim, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setMenuOpen(!menuOpen);
  };

  const handleTopicPress = (title: string) => {
    Alert.alert('Tópico selecionado', `Você selecionou: ${title}`);
  };

  const renderItem = ({ item }: { item: Topic }) => (
    <TouchableOpacity style={styles.topicContainer} onPress={() => handleTopicPress(item.title)}>
      <Text style={styles.topicTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  const toggleExpand = () => {
    const toValue = expanded ? 0 : 1;
    Animated.stagger(50, animationValues.map(anim => 
      Animated.timing(anim, {
        toValue,
        duration: 300,
        useNativeDriver: true,
      })
    )).start();
    setExpanded(!expanded);
  };

  return (
    <View style={styles.container}>
      {/* Barra de Tarefas */}
      <View style={styles.appBar}>
        <TouchableOpacity onPress={() => Alert.alert('Pesquisa')}>
          <Ionicons name="search" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.appBarTitle}>OdontoLife</Text>
        <TouchableOpacity onPress={() => Alert.alert('Notificações')}>
          <Ionicons name="notifications" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Menu animado */}
      <Animated.View style={[styles.menuContainer, { transform: [{ translateX: slideAnim }] }]}>
        <Text style={styles.menuTitle}>Menu</Text>
        <TouchableOpacity onPress={() => Alert.alert('Opção 1 selecionada')}>
          <Text style={styles.menuOption}>Opção 1</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Alert.alert('Opção 2 selecionada')}>
          <Text style={styles.menuOption}>Opção 2</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Alert.alert('Opção 3 selecionada')}>
          <Text style={styles.menuOption}>Opção 3</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Botão de menu */}
      <TouchableOpacity style={styles.menuButton} onPress={handleMenuToggle}>
        <MaterialIcons name="menu" size={30} color="#000" />
      </TouchableOpacity>

      <Text style={styles.header}>Tópicos</Text>
      <FlatList
        data={topics}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />

      {/* Botões flutuantes adicionais */}
      {expanded && animationValues.map((anim, index) => (
        <Animated.View
          key={index}
          style={[
            styles.miniFloatingButton,
            {
              transform: [
                { scale: anim },
                { translateY: index === 0 ? -70 : index === 1 ? -120 : -70 },
                { translateX: index === 1 ? -70 : index === 2 ? 70 : 0 },
              ],
            },
          ]}
        >
          <TouchableOpacity onPress={() => Alert.alert(`Botão ${index + 1} pressionado`)}>
            <AntDesign name="plus" size={18} color="#fff" />
          </TouchableOpacity>
        </Animated.View>
      ))}

      {/* Botão flutuante principal */}
      <TouchableOpacity style={styles.floatingButton} onPress={toggleExpand}>
        <AntDesign name="plus" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  appBar: {
    width: '100%',
    height: 60,
    backgroundColor: '#203087',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  appBarTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  menuContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 250,
    height: '100%',
    backgroundColor: '#203087',
    padding: 20,
    zIndex: 1,
    paddingTop: 60,
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  menuOption: {
    fontSize: 18,
    color: '#fff',
    paddingVertical: 10,
  },
  menuButton: {
    position: 'absolute',
    top: 70,
    left: 20,
    zIndex: 2,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
  },
  topicContainer: {
    padding: 15,
    marginHorizontal: 20,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  topicTitle: {
    fontSize: 18,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#007AFF',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  miniFloatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#007AFF',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;








