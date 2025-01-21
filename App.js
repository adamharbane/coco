import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "./screens/WelcomeScreens";
import LoginScreen from "./screens/LoginScreen.jsx"; 
import SignUpScreen from './screens/SignUpScreen.jsx';
import HomePage from './screens/HomePage.jsx';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomePage">
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ headerShown: false }} // Masquer l'en-tête pour l'écran d'accueil
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: "Login" }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{ title: "SignUp" }}
        />
        <Stack.Screen
          name="HomePage"
          component={HomePage}
          options={{ headerShown : false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
