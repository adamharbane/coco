import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ActivityIndicator } from 'react-native';

export default function SignUpScreen({ navigation }) {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Validation de l'email
    const isEmailValid = (email) => /\S+@\S+\.\S+/.test(email);

    // Validation du mot de passe
    const isPasswordValid = (password) =>
        /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);

    const handleSignUp = async () => {
        if (!fullName || !email || !password) {
            setMessage('Tous les champs sont obligatoires.');
            return;
        }

        if (!isEmailValid(email)) {
            setMessage('Adresse email invalide.');
            return;
        }

        if (!isPasswordValid(password)) {
            setMessage('Le mot de passe doit contenir au moins 8 caractères, une majuscule et un chiffre.');
            return;
        }

        setMessage('');
        setIsLoading(true);

        try {
            const response = await fetch('http://10.1.6.24/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: fullName,
                    email: email,
                    password: password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('Inscription réussie ! Redirection...');
                setTimeout(() => {
                    navigation.navigate('LoginScreen');
                }, 1500);
            } else {
                setMessage(data.error || 'Une erreur est survenue.');
            }
        } catch (error) {
            console.error('Erreur lors de l\'inscription :', error);
            setMessage('Impossible de se connecter au serveur. Veuillez réessayer plus tard.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            {/* Logo */}
            <Image source={require('../assets/login.png')} style={styles.logo} />

            {/* Formulaire */}
            <TextInput
                style={styles.input}
                placeholder="Nom complet"
                value={fullName}
                onChangeText={setFullName}
                placeholderTextColor="#888"
                accessible={true}
                accessibilityLabel="Nom complet"
            />
            <TextInput
                style={styles.input}
                placeholder="Adresse email"
                value={email}
                onChangeText={setEmail}
                placeholderTextColor="#888"
                keyboardType="email-address"
                accessible={true}
                accessibilityLabel="Adresse email"
            />
            <TextInput
                style={styles.input}
                placeholder="Mot de passe"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholderTextColor="#888"
                accessible={true}
                accessibilityLabel="Mot de passe"
            />

            {/* Message d'erreur ou succès */}
            {message ? <Text style={styles.message}>{message}</Text> : null}

            {/* Bouton d'inscription */}
            <TouchableOpacity
                style={[
                    styles.signUpButton,
                    { backgroundColor: !fullName || !email || !password ? '#ccc' : '#000' },
                ]}
                onPress={handleSignUp}
                disabled={!fullName || !email || !password || isLoading}
                accessible={true}
                accessibilityLabel="S'inscrire"
            >
                {isLoading ? (
                    <ActivityIndicator size="small" color="#fff" />
                ) : (
                    <Text style={styles.signUpButtonText}>S'inscrire</Text>
                )}
            </TouchableOpacity>

            {/* Séparateur */}
            <View style={styles.separator}>
                <View style={styles.separatorLine} />
                <Text style={styles.separatorText}>Ou</Text>
                <View style={styles.separatorLine} />
            </View>

            {/* Boutons sociaux */}
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
        backgroundColor: '#FFFFFF',
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
    message: {
        color: '#ff0000',
        fontSize: 14,
        marginBottom: 15,
    },
    signUpButton: {
        padding: 15,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
        marginTop: 10,
    },
    signUpButtonText: {
        color: '#FFFFFF',
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
