// Importações necessárias
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import Swiper from 'react-native-swiper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

type RootStackParamList = {
  IntroScreens: undefined;
  Login: undefined;
};

type IntroScreensNavigationProp = StackNavigationProp<RootStackParamList, 'IntroScreens'>;

const IntroScreens = () => {
  const navigation = useNavigation<IntroScreensNavigationProp>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      const hasSeenOnboarding = await AsyncStorage.getItem('hasSeenOnboarding');
      if (hasSeenOnboarding) {
        // Se o onboarding já foi visto, navega para a tela de login
        navigation.replace('Login');
      } else {
        // Caso contrário, exibe as telas introdutórias
        setIsLoading(false);
      }
    };
    checkOnboardingStatus();
  }, [navigation]);

  const handleCompleteOnboarding = async () => {
    // Salva no AsyncStorage que o onboarding foi visualizado
    await AsyncStorage.setItem('hasSeenOnboarding', 'true');
    // Navega para a tela de login
    navigation.replace('Login');
  };

  if (isLoading) {
    // Exibe um indicador de carregamento enquanto verifica o status
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007aff" />
      </View>
    );
  }

  return (
    <Swiper loop={false} showsPagination={true}>
      {/* Página 1 */}
      <View style={styles.slide}>
        <Text style={styles.text}>Seja bem-vindo ao OdontoLife!</Text>
        <Text style={styles.description}>
          Transforme a maneira como você cuida do seu sorriso. 
          Agende consultas, acompanhe tratamentos e muito mais — tudo na palma da sua mão.
        </Text>
      </View>


      {/* Página 2 */}
      <View style={styles.slide}>
        <Text style={styles.text}>Sorrir nunca foi tão fácil!</Text>
        <Text style={styles.description}>
          Com o OdontoLife, você terá acesso rápido e prático ao que importa: 
          sua saúde bucal. Simples, moderno e feito para você.
        </Text>
      </View>


      {/* Página 3 com o botão "Próximo" */}
      <View style={styles.slide}>
        <Text style={styles.text}>Pronto para começar?</Text>
        <Text style={styles.description}>
          Descubra o que o OdontoLife pode fazer por você. 
          Clique no botão abaixo e dê o primeiro passo para um sorriso perfeito.
        </Text>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={handleCompleteOnboarding}
        >
          <Text style={styles.nextButtonText}>Vamos lá!</Text>
        </TouchableOpacity>
      </View>

    </Swiper>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d9ddff',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d9ddff',
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
    textAlign: 'center',
  },
  description: {
    fontSize: 20,
    textAlign: 'center',
    paddingHorizontal: 20,
    color: '#000',
  },
  nextButton: {
    marginTop: 30,
    backgroundColor: '#007aff',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  nextButtonText: {
    color: '#000',
    fontSize: 18,
  },
});

export default IntroScreens;
