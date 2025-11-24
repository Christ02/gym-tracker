import React, { useState } from 'react';
import { View, SafeAreaView, Platform, StatusBar, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Home, Dumbbell, BarChart3, User, Sparkles } from 'lucide-react-native';
import { AuthScreen } from './src/screens/AuthScreen';
import { DashboardScreen } from './src/screens/DashboardScreen';
import { ActiveWorkoutScreen } from './src/screens/ActiveWorkoutScreen';
import { MyRoutinesScreen } from './src/screens/MyRoutinesScreen';
import { ProgressScreen } from './src/screens/ProgressScreen';
import { AICoachScreen } from './src/screens/AICoachScreen';
import { EXERCISE_DB } from './src/data/exerciseDB';
import { NavItem } from './src/components/common/NavItem';

export default function App() {
  // --- ESTADOS DE AUTENTICACIÓN ---
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
        {!user ? (
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
            {activeTab === 'profile' && (
              <View style={{ paddingTop: 40, alignItems: 'center' }}>
                <Text style={{ textAlign: 'center', color: '#94a3b8' }}>Configuración de Perfil</Text>
              </View>
            )}
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
            justifyContent: 'space-between', 
            alignItems: 'center', 
            paddingHorizontal: 8,
            height: 80,
            paddingBottom: 16
          }}
        >
          <NavItem icon={Home} label="Inicio" id="dashboard" activeTab={activeTab} onPress={handleNavPress} />
          <NavItem icon={Dumbbell} label="Rutinas" id="library" activeTab={activeTab} onPress={handleNavPress} />
          
          <TouchableOpacity 
            onPress={() => setActiveTab('ai-coach')}
            style={{ 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center', 
              backgroundColor: '#2563eb', 
              borderRadius: 16, 
              width: 56, 
              height: 56, 
              marginTop: -32,
              minHeight: 56, 
              minWidth: 56,
              shadowColor: '#6366f1',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 8,
            }}
          >
            <Sparkles size={24} color="white" fill="white" />
          </TouchableOpacity>
          
          <NavItem icon={BarChart3} label="Progreso" id="progress" activeTab={activeTab} onPress={handleNavPress} />
          <NavItem icon={User} label="Perfil" id="profile" activeTab={activeTab} onPress={handleNavPress} />
        </View>
      )}
    </SafeAreaView>
  );
}
