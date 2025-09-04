import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Pressable, StyleSheet, TextInput, ScrollView, Animated, Dimensions, StatusBar, Alert } from 'react-native';
import { AuthProvider, useAuth } from './src/contexts/AuthContext';

const { width, height } = Dimensions.get('window');

function AppContent() {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { user, signUp, signIn, signInWithGoogle, logout } = useAuth();
  
  const circleScale = useRef(new Animated.Value(0)).current;
  const circleOpacity = useRef(new Animated.Value(0)).current;

  const animateTransition = (screenName: string) => {
    // Basit ve güvenilir animasyon
    circleScale.setValue(0);
    circleOpacity.setValue(0);
    
    // Animasyonu başlat
    Animated.parallel([
      Animated.timing(circleScale, {
        toValue: 20,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(circleOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
    
    // Ekranı değiştir
    setTimeout(() => {
      setCurrentScreen(screenName);
      
      // Animasyonu kapat
      setTimeout(() => {
        Animated.parallel([
          Animated.timing(circleScale, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(circleOpacity, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
        ]).start();
      }, 100);
    }, 300);
  };

  const goBack = () => {
    // Geri dönüş için animasyonlu geçiş
    animateTransition('welcome');
  };

  // Kullanıcı giriş yapmışsa ana ekrana yönlendir
  if (user) {
    return (
      <View style={[styles.container, { padding: 20, paddingTop: 60, alignItems: 'center', justifyContent: 'center' }]}>
        <StatusBar barStyle="light-content" backgroundColor="#111814" />
        <Text style={styles.logo}>Parakolik</Text>
        <Text style={styles.title}>Hoş Geldiniz!</Text>
        <Text style={styles.subtitle}>Giriş yapıldı: {user.email}</Text>
        <TouchableOpacity 
          style={styles.button}
          onPress={logout}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>Çıkış Yap</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Kayıt olma işlevi
  const handleSignUp = async () => {
    if (!email || !password) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Hata', 'Şifre en az 6 karakter olmalıdır');
      return;
    }

    setLoading(true);
    try {
      await signUp(email, password);
      Alert.alert('Başarılı', 'Hesabınız başarıyla oluşturuldu!');
    } catch (error: any) {
      let errorMessage = 'Kayıt olurken bir hata oluştu';
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'Bu e-posta adresi zaten kullanılıyor';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Geçersiz e-posta adresi';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Şifre çok zayıf';
      }
      Alert.alert('Hata', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Giriş yapma işlevi
  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun');
      return;
    }

    setLoading(true);
    try {
      await signIn(email, password);
      Alert.alert('Başarılı', 'Giriş yapıldı!');
    } catch (error: any) {
      let errorMessage = 'Giriş yaparken bir hata oluştu';
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'Bu e-posta adresi ile kayıtlı kullanıcı bulunamadı';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Yanlış şifre';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Geçersiz e-posta adresi';
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Çok fazla başarısız deneme. Lütfen daha sonra tekrar deneyin';
      }
      Alert.alert('Hata', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Google ile giriş yapma işlevi
  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
      Alert.alert('Başarılı', 'Google ile giriş yapıldı!');
    } catch (error: any) {
      let errorMessage = 'Google ile giriş yaparken bir hata oluştu';
      if (error.code === 'auth/popup-closed-by-user') {
        errorMessage = 'Giriş iptal edildi';
      } else if (error.code === 'auth/popup-blocked') {
        errorMessage = 'Popup engellendi. Lütfen popup engelleyicisini kapatın';
      } else if (error.message) {
        errorMessage = error.message;
      }
      Alert.alert('Hata', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (currentScreen === 'welcome') {
    return (
      <View style={[styles.container, { padding: 20, paddingTop: 60, alignItems: 'center', justifyContent: 'center' }]}>
        <StatusBar barStyle="light-content" backgroundColor="#111814" />
        <Text style={styles.logo}>Parakolik</Text>
        <Text style={styles.title}>Hoş Geldiniz</Text>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => animateTransition('signup')}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>
            Hesap Oluştur
          </Text>
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
        <StatusBar barStyle="light-content" backgroundColor="#111814" />
        
        {/* Header */}
        <View style={styles.newHeader}>
          <TouchableOpacity 
            style={styles.newBackButton}
            onPress={goBack}
            activeOpacity={0.7}
          >
            <Text style={styles.newBackIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.newHeaderTitle}>Parakolik</Text>
        </View>

        {/* Title */}
        <Text style={styles.newSignupTitle}>Hesap Oluştur</Text>

        {/* Form */}
        <View style={styles.newForm}>
          <View style={styles.newInputContainer}>
            <TextInput
              style={styles.newInput}
              placeholder="E-posta"
              placeholderTextColor="#9cbaab"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.newInputContainer}>
            <TextInput
              style={styles.newInput}
              placeholder="Şifre"
              placeholderTextColor="#9cbaab"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
            />
          </View>

          {/* Primary Button */}
          <TouchableOpacity 
            style={[styles.newPrimaryButton, loading && styles.disabledButton]} 
            activeOpacity={0.7}
            onPress={handleSignUp}
            disabled={loading}
          >
            <Text style={styles.newPrimaryButtonText}>
              {loading ? 'Kayıt Olunuyor...' : 'Kaydol'}
            </Text>
          </TouchableOpacity>

          {/* Login Link */}
          <TouchableOpacity 
            style={styles.newLoginLink} 
            onPress={() => animateTransition('signin')}
            activeOpacity={0.7}
          >
            <Text style={styles.newLoginLinkText}>Zaten bir hesabınız var mı? Giriş yapın</Text>
          </TouchableOpacity>

          {/* Google Button */}
          <TouchableOpacity 
            style={[styles.newGoogleButton, loading && styles.disabledButton]} 
            activeOpacity={0.7}
            onPress={handleGoogleSignIn}
            disabled={loading}
          >
            <Text style={styles.newGoogleButtonText}>
              {loading ? 'Google ile Bağlanılıyor...' : 'Google ile Kaydol'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Image Placeholder */}
        <View style={styles.bottomImage} />
        
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
        <StatusBar barStyle="light-content" backgroundColor="#111814" />
        <ScrollView style={styles.scrollView}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={goBack}
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
            <TouchableOpacity 
              style={[styles.primaryButton, loading && styles.disabledButton]} 
              activeOpacity={0.7}
              onPress={handleSignIn}
              disabled={loading}
            >
              <Text style={styles.primaryButtonText}>
                {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
              </Text>
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
            <TouchableOpacity 
              style={[styles.googleButton, loading && styles.disabledButton]} 
              activeOpacity={0.7}
              onPress={handleGoogleSignIn}
              disabled={loading}
            >
              <Text style={styles.googleButtonText}>
                {loading ? 'Google ile Bağlanılıyor...' : 'Google ile Giriş Yap'}
              </Text>
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

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111814',
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
    marginBottom: 16,
    marginHorizontal: 20,
  },
  buttonText: {
    color: '#111814',
    fontSize: 16,
    fontWeight: '600'
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
    paddingTop: 80,
    paddingBottom: 20
  },
  backButton: {
    width: 64,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 32,
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
  },
  // Yeni tasarım stilleri
  newHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 80,
    paddingBottom: 20,
    backgroundColor: '#111814',
  },
  newBackButton: {
    width: 64,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 32,
  },
  newBackIcon: {
    fontSize: 24,
    color: '#ffffff',
    fontWeight: '600',
  },
  newHeaderTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
    flex: 1,
    textAlign: 'center',
    marginRight: 48,
  },
  newSignupTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#ffffff',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 12,
    textAlign: 'left',
  },
  newForm: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  newInputContainer: {
    marginBottom: 16,
  },
  newInput: {
    backgroundColor: '#283930',
    borderRadius: 12,
    height: 56,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '400',
    borderWidth: 0,
  },
  newPrimaryButton: {
    backgroundColor: '#0bda72',
    borderRadius: 12,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  newPrimaryButtonText: {
    color: '#111814',
    fontSize: 16,
    fontWeight: '700',
  },
  newLoginLink: {
    alignItems: 'center',
    paddingVertical: 12,
    paddingTop: 4,
  },
  newLoginLinkText: {
    color: '#9cbaab',
    fontSize: 14,
    fontWeight: '400',
    textDecorationLine: 'underline',
  },
  newGoogleButton: {
    backgroundColor: '#283930',
    borderRadius: 12,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    marginBottom: 16,
  },
  newGoogleButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  bottomImage: {
    width: '100%',
    height: 320,
    backgroundColor: '#1a1a1a',
    marginTop: 'auto',
  },
  subtitle: {
    fontSize: 16,
    color: '#9cbaab',
    marginBottom: 20,
    textAlign: 'center',
  },
  disabledButton: {
    opacity: 0.6,
  }
});
