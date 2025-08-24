import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface HomeScreenProps {
  navigation: any;
}

export default function HomeScreen({ navigation }: HomeScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#111814', '#1a2a1f']}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <Text style={styles.title}>Ana Sayfa</Text>
          <Text style={styles.subtitle}>Hoş geldiniz!</Text>
          
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Welcome')}
          >
            <Text style={styles.buttonText}>Çıkış Yap</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    color: '#9cbaab',
    marginBottom: 32,
  },
  button: {
    backgroundColor: '#0bda72',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#111814',
    fontSize: 16,
    fontWeight: '600',
  },
});
