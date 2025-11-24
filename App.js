import React, { useState } from 'react';
import { View, SafeAreaView, Platform, StatusBar, TouchableOpacity, Text } from 'react-native';
import { Home, Dumbbell, BarChart3, User, Sparkles } from 'lucide-react-native';
import { AuthScreen } from './src/screens/AuthScreen';
import { DashboardScreen } from './src/screens/DashboardScreen';
import { ActiveWorkoutScreen } from './src/screens/ActiveWorkoutScreen';
import { MyRoutinesScreen } from './src/screens/MyRoutinesScreen';
import { ProgressScreen } from './src/screens/ProgressScreen';
import { AICoachScreen } from './src/screens/AICoachScreen';
import { EXERCISE_DB } from './src/data/exerciseDB';
import { NavItem } from './src/components/common/NavItem';
import './global.css';

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
      
      <View className="flex-1">
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
              <View className="pt-10 items-center">
                <Text className="text-center text-slate-400">Configuración de Perfil</Text>
              </View>
            )}
          </>
        )}
      </View>

      {user && (
        <View 
          className="absolute bottom-0 w-full bg-white border-t border-slate-100 flex-row justify-between items-center px-2"
          style={{ height: 80, paddingBottom: 16 }}
        >
          <NavItem icon={Home} label="Inicio" id="dashboard" activeTab={activeTab} onPress={handleNavPress} />
          <NavItem icon={Dumbbell} label="Rutinas" id="library" activeTab={activeTab} onPress={handleNavPress} />
          
          <TouchableOpacity 
            onPress={() => setActiveTab('ai-coach')}
            className="flex flex-col items-center justify-center bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-2xl w-14 h-14 shadow-lg shadow-indigo-300"
            style={{ 
              minHeight: 56, 
              minWidth: 56,
              marginTop: -32,
              backgroundColor: '#2563eb'
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
