import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'; // Ajout de Image et StyleSheet
import { SafeAreaView } from 'react-native-safe-area-context';
import { themeColors } from '../theme';
import { useNavigation } from '@react-navigation/native'; // Import pour navigation

export default function WelcomeScreen() {
    const navigation = useNavigation(); // Hook pour accéder à la navigation

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: themeColors.bg }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginVertical: 20 }}>
                {/* Image de bienvenue */}
                <Image source={require('../assets/welcome.png')} style={styles.welcome} />

                {/* Titre "En Route !" */}
                <Text
                    style={{
                        color: 'black',
                        fontWeight: 'bold',
                        fontSize: 32,
                        textAlign: 'center',
                        marginTop: 20, // Espacement entre l'image et le texte
                    }}
                >
                    En Route !
                </Text>
            </View>

            {/* Boutons Sign Up et Log In */}
            <View style={{ marginVertical: 20, paddingHorizontal: 20 }}>
                {/* Bouton Sign Up */}
                <TouchableOpacity
                    onPress={() => navigation.navigate('SignUp')}
                    style={{
                        paddingVertical: 15,
                        backgroundColor: '#FCD34D',
                        borderRadius: 10,
                        marginHorizontal: 20,
                        marginBottom: 10,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 18,
                            fontWeight: 'bold',
                            textAlign: 'center',
                            color: '#4B5563',
                        }}
                    >
                        Sign Up
                    </Text>
                </TouchableOpacity>

                {/* Lien Log In */}
                <View style={{ alignItems: 'center', marginTop: 10 }}>
                    <Text style={{ color: 'black', fontWeight: '600' }}>
                        Already have an account?
                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={{ color: '#2563EB', fontWeight: 'bold', marginTop: 5 }}>
                            Log In
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

// Styles pour l'image de bienvenue
const styles = StyleSheet.create({
    welcome: {
        width: 300, // Ajustez la largeur selon vos besoins
        height: 300, // Ajustez la hauteur selon vos besoins
        resizeMode: 'contain', // Pour s'assurer que l'image s'adapte correctement
    },
});