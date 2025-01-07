import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const isEmailValid = (email) => /\S+@\S+\.\S+/.test(email);
    
    const handleLogin = async () => {
        if (!email || !password) {
            setMessage('Tous les champs sont obligatoires.');
            return;
        }

        if (!isEmailValid(email)) {
            setMessage('Adresse email invalide.');
            return;
        }

        setMessage('');
        setIsLoading(true); // Début du chargement

        try {
            const response = await fetch('http://127.0.0.1:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('Connexion réussie !');
                console.log('Token:', data.access_token); // Stocker ou utiliser le token JWT

                // Naviguer vers la page d'accueil ou un autre écran
                setTimeout(() => {
                    navigation.navigate('HomeScreen'); // Remplace 'HomeScreen' par ton écran d'accueil
                }, 1500);
            } else {
                setMessage(data.error || 'Une erreur est survenue.');
            }
        } catch (error) {
            console.error('Erreur lors de la connexion :', error);
            setMessage('Impossible de se connecter au serveur. Veuillez réessayer plus tard.');
        } finally {
            setIsLoading(false); // Fin du chargement
        }
    };

    return (
        <View style={styles.container}>
            {/* Logo en haut */}
            <Image source={require('../assets/login.png')} style={styles.logo} />

            {/* Formulaire de connexion */}
            <TextInput
                style={styles.input}
                placeholder="Adresse email"
                value={email}
                onChangeText={setEmail}
                placeholderTextColor="#888"
            />
            <TextInput
                style={styles.input}
                placeholder="Mot de passe"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholderTextColor="#888"
            />

            {/* Bouton de connexion */}
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.loginText}>Se connecter</Text>
            </TouchableOpacity>

            {/* Séparateur */}
            <View style={styles.separator}>
                <View style={styles.separatorLine} />
                <Text style={styles.separatorText}>Ou</Text>
                <View style={styles.separatorLine} />
            </View>

            {/* Boutons de connexion sociale */}
            <View style={styles.socialButtonsContainer}>
                <TouchableOpacity style={styles.socialButton}>
                    <Image source={require('../assets/google.png')} style={styles.socialIcon} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton}>
                    <Image source={require('../assets/facebook.png')} style={styles.socialIcon} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton}>
                    <Image source={require('../assets/apple.png')} style={styles.socialIcon} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF', // Fond blanc
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    logo: {
        width: 150,
        height: 150,
        marginBottom: 30,
    },
    input: {
        width: '100%',
        backgroundColor: '#F5F5F5',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        fontSize: 16,
        color: '#333',
    },
    loginButton: {
        backgroundColor: '#000000', // Bouton noir
        padding: 15,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
        marginTop: 10,
    },
    loginText: {
        color: '#FFFFFF', // Texte blanc
        fontSize: 16,
        fontWeight: 'bold',
    },
    separator: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    separatorLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#E0E0E0',
    },
    separatorText: {
        marginHorizontal: 10,
        color: '#888',
        fontSize: 16,
    },
    socialButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '80%',
    },
    socialButton: {
        backgroundColor: '#F5F5F5',
        padding: 10,
        borderRadius: 10,
    },
    socialIcon: {
        width: 30,
        height: 30,
    },
});