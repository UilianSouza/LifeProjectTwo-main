import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index"
       options={{
        headerShown: false,
        statusBarColor: "#000",
        title: 'Início' }} />


      <Stack.Screen name="home"
      options={{
        headerShown: false,
        statusBarColor: "#000",
         title: 'Home' }} />

<Stack.Screen name="cad"
      options={{
        headerShown: false,
        statusBarColor: "#000",
         title: 'Cadastro' }} />

<Stack.Screen name="recuperar"
      options={{
        headerShown: false,
        statusBarColor: "#000",
         title: 'Recuperar' }} />
    
    </Stack>

    
  );
}

