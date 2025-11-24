import React, { useState } from 'react';
import { View, SafeAreaView, Platform, StatusBar, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Home, Dumbbell, BarChart3, User, Sparkles } from 'lucide-react-native';
import { OnboardingScreen } from './src/screens/OnboardingScreen';
import { AuthScreen } from './src/screens/AuthScreen';
import { DashboardScreen } from './src/screens/DashboardScreen';
import { ActiveWorkoutScreen } from './src/screens/ActiveWorkoutScreen';
import { MyRoutinesScreen } from './src/screens/MyRoutinesScreen';
import { ProgressScreen } from './src/screens/ProgressScreen';
import { AICoachScreen } from './src/screens/AICoachScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { EXERCISE_DB } from './src/data/exerciseDB';
import { NavItem } from './src/components/common/NavItem';

export default function App() {
  // --- ESTADOS DE AUTENTICACIÓN ---
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);
  const [user, setUser] = useState(null);
  
  // --- ESTADOS DE LA APP ---
  const [activeTab, setActiveTab] = useState('dashboard');
  const [activeWorkout, setActiveWorkout] = useState(null);
  const [stats, setStats] = useState({
    workoutsCompleted: 5,
    totalVolume: 45000,
    streak: 5,
    bestLift: '100kg (Banca)'
  });

  // --- LÓGICA ---
  const startNewWorkout = (type = 'Pecho') => {
    let exercises = [];
    if (type === 'Pecho') exercises = [EXERCISE_DB['Pecho'][0], EXERCISE_DB['Pecho'][3]];
    else if (type === 'Pierna') exercises = [EXERCISE_DB['Pierna'][0], EXERCISE_DB['Pierna'][1]];
    else if (type === 'Espalda') exercises = [EXERCISE_DB['Espalda'][0], EXERCISE_DB['Espalda'][1]];
    else exercises = [EXERCISE_DB['Pecho'][0]];

    setActiveWorkout({
      startedAt: new Date(),
      exercises: exercises
    });
    setActiveTab('workout');
  };

  const handleNavPress = (id) => {
    if (activeWorkout && id === 'workout') {
      setActiveTab('workout');
    } else if (id === 'workout') {
      startNewWorkout();
    } else {
      setActiveTab(id);
    }
  };

  return (
    <SafeAreaView 
      style={{ 
        flex: 1, 
        backgroundColor: '#FAFAFA',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
      }}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#FAFAFA" />
      
      <View style={{ flex: 1 }}>
        {!hasSeenOnboarding ? (
          <OnboardingScreen onComplete={(data) => {
            setHasSeenOnboarding(true);
            // Aquí puedes guardar los datos del onboarding
          }} />
        ) : !user ? (
          <AuthScreen setUser={setUser} />
        ) : (
          <>
            {activeTab === 'dashboard' && <DashboardScreen user={user} startNewWorkout={startNewWorkout} />}
            {activeTab === 'workout' && activeWorkout && (
              <ActiveWorkoutScreen 
                activeWorkout={activeWorkout} 
                setActiveTab={setActiveTab}
                setActiveWorkout={setActiveWorkout}
                setStats={setStats}
              />
            )}
            {activeTab === 'library' && <MyRoutinesScreen startNewWorkout={startNewWorkout} />}
            {activeTab === 'progress' && <ProgressScreen setActiveTab={setActiveTab} />}
            {activeTab === 'ai-coach' && <AICoachScreen user={user} />}
            {activeTab === 'profile' && <ProfileScreen user={user} setUser={setUser} />}
          </>
        )}
      </View>

      {user && (
        <View 
          style={{ 
            position: 'absolute', 
            bottom: 0, 
            width: '100%', 
            backgroundColor: 'white', 
            borderTopWidth: 1, 
            borderTopColor: '#e2e8f0', 
            flexDirection: 'row', 
            justifyContent: 'space-around', 
            alignItems: 'flex-end', 
            paddingHorizontal: 16,
            height: 85,
            paddingBottom: 20
          }}
        >
          <NavItem icon={Home} label="Inicio" id="dashboard" activeTab={activeTab} onPress={handleNavPress} />
          <NavItem icon={Dumbbell} label="Rutinas" id="library" activeTab={activeTab} onPress={handleNavPress} />
          
          <TouchableOpacity 
            onPress={() => setActiveTab('ai-coach')}
            style={{ 
              alignItems: 'center', 
              justifyContent: 'center', 
              backgroundColor: '#2563eb', 
              borderRadius: 28, 
              width: 60, 
              height: 60, 
              marginBottom: 20,
              shadowColor: '#2563eb',
              shadowOffset: { width: 0, height: 6 },
              shadowOpacity: 0.4,
              shadowRadius: 10,
              elevation: 10,
            }}
          >
            <Sparkles size={28} color="white" fill="white" />
          </TouchableOpacity>
          
          <NavItem icon={BarChart3} label="Progreso" id="progress" activeTab={activeTab} onPress={handleNavPress} />
          <NavItem icon={User} label="Perfil" id="profile" activeTab={activeTab} onPress={handleNavPress} />
        </View>
      )}
    </SafeAreaView>
  );
}
