import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView, Animated, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const { width, height } = Dimensions.get('window');

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const circleScale = useRef(new Animated.Value(0)).current;
  const circleOpacity = useRef(new Animated.Value(0)).current;

  const animateTransition = (screenName: string) => {
    // Yuvarlak büyümeye başla
    Animated.parallel([
      Animated.timing(circleScale, {
        toValue: 20,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(circleOpacity, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Animasyon tamamlandığında ekranı değiştir
      setCurrentScreen(screenName);
      
      // Kısa bir gecikme sonra yuvarlak küçülmeye başla
      setTimeout(() => {
        Animated.parallel([
          Animated.timing(circleScale, {
            toValue: 0,
            duration: 250,
            useNativeDriver: true,
          }),
          Animated.timing(circleOpacity, {
            toValue: 0,
            duration: 250,
            useNativeDriver: true,
          }),
        ]).start();
      }, 50);
    });
  };

  if (currentScreen === 'welcome') {
    return (
      <View style={styles.container}>
        <StatusBar style="light" />
        <Text style={styles.logo}>Parakolik</Text>
        <Text style={styles.title}>Hoş Geldiniz</Text>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => animateTransition('signup')}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>Hesap Oluştur</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.button2} 
          onPress={() => animateTransition('signin')}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText2}>Giriş Yap</Text>
        </TouchableOpacity>
        
        {/* Geçiş animasyonu */}
        <Animated.View 
          style={[
            styles.transitionCircle,
            {
              opacity: circleOpacity,
              transform: [{ scale: circleScale }],
            }
          ]}
        />
      </View>
    );
  }

  if (currentScreen === 'signup') {
    return (
      <View style={styles.container}>
        <StatusBar style="light" />
        <ScrollView style={styles.scrollView}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.backButton} 
              onPress={() => animateTransition('welcome')}
              activeOpacity={0.7}
            >
              <Text style={styles.backIcon}>←</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Parakolik</Text>
            <View style={styles.placeholder} />
          </View>

          {/* Title */}
          <Text style={styles.signupTitle}>Hesap Oluştur</Text>

          {/* Form */}
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="E-posta"
                placeholderTextColor="#9cbaab"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Şifre"
                placeholderTextColor="#9cbaab"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
              />
            </View>

            {/* Primary Button */}
            <TouchableOpacity style={styles.primaryButton} activeOpacity={0.7}>
              <Text style={styles.primaryButtonText}>Kaydol</Text>
            </TouchableOpacity>

            {/* Login Link */}
            <TouchableOpacity 
              style={styles.loginLink} 
              onPress={() => animateTransition('signin')}
              activeOpacity={0.7}
            >
              <Text style={styles.loginLinkText}>Zaten bir hesabınız var mı? Giriş yapın</Text>
            </TouchableOpacity>

            {/* Google Button */}
            <TouchableOpacity style={styles.googleButton} activeOpacity={0.7}>
              <Text style={styles.googleButtonText}>Google ile Kaydol</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        
        {/* Geçiş animasyonu */}
        <Animated.View 
          style={[
            styles.transitionCircle,
            {
              opacity: circleOpacity,
              transform: [{ scale: circleScale }],
            }
          ]}
        />
      </View>
    );
  }

  if (currentScreen === 'signin') {
    return (
      <View style={styles.container}>
        <StatusBar style="light" />
        <ScrollView style={styles.scrollView}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.backButton} 
              onPress={() => animateTransition('welcome')}
              activeOpacity={0.7}
            >
              <Text style={styles.backIcon}>←</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Parakolik</Text>
            <View style={styles.placeholder} />
          </View>

          {/* Title */}
          <Text style={styles.signupTitle}>Giriş Yap</Text>

          {/* Form */}
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="E-posta"
                placeholderTextColor="#9cbaab"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Şifre"
                placeholderTextColor="#9cbaab"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
              />
            </View>

            {/* Primary Button */}
            <TouchableOpacity style={styles.primaryButton} activeOpacity={0.7}>
              <Text style={styles.primaryButtonText}>Giriş Yap</Text>
            </TouchableOpacity>

            {/* Sign Up Link */}
            <TouchableOpacity 
              style={styles.loginLink} 
              onPress={() => animateTransition('signup')}
              activeOpacity={0.7}
            >
              <Text style={styles.loginLinkText}>Hesabınız yok mu? Kayıt olun</Text>
            </TouchableOpacity>

            {/* Google Button */}
            <TouchableOpacity style={styles.googleButton} activeOpacity={0.7}>
              <Text style={styles.googleButtonText}>Google ile Giriş Yap</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        
        {/* Geçiş animasyonu */}
        <Animated.View 
          style={[
            styles.transitionCircle,
            {
              opacity: circleOpacity,
              transform: [{ scale: circleScale }],
            }
          ]}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111814',
    padding: 20,
    paddingTop: 60,
    alignItems: 'center',
    justifyContent: 'center'
  },
  scrollView: {
    flex: 1,
    width: '100%'
  },
  logo: {
    fontSize: 32,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 40
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 30
  },
  button: {
    backgroundColor: '#0bda72',
    borderRadius: 12,
    height: 48,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16
  },
  buttonText: {
    color: '#111814',
    fontSize: 16,
    fontWeight: '700'
  },
  button2: {
    backgroundColor: '#283930',
    borderRadius: 12,
    height: 48,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText2: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8
  },
  backButton: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center'
  },
  backIcon: {
    fontSize: 24,
    color: '#ffffff',
    fontWeight: '600'
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
    flex: 1,
    textAlign: 'center',
    marginRight: 48
  },
  placeholder: {
    width: 48
  },
  signupTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#ffffff',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 12
  },
  form: {
    paddingHorizontal: 16,
    paddingTop: 12
  },
  inputContainer: {
    marginBottom: 12
  },
  input: {
    backgroundColor: '#283930',
    borderRadius: 12,
    height: 56,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '400'
  },
  primaryButton: {
    backgroundColor: '#0bda72',
    borderRadius: 12,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12
  },
  primaryButtonText: {
    color: '#111814',
    fontSize: 16,
    fontWeight: '700'
  },
  loginLink: {
    alignItems: 'center',
    paddingVertical: 12,
    paddingTop: 4
  },
  loginLinkText: {
    color: '#9cbaab',
    fontSize: 14,
    fontWeight: '400',
    textDecorationLine: 'underline'
  },
  googleButton: {
    backgroundColor: '#283930',
    borderRadius: 12,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12
  },
  googleButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700'
  },
  transitionCircle: {
    position: 'absolute',
    top: height / 2 - 100,
    left: width / 2 - 100,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#0bda72',
    zIndex: 999,
  }
});
