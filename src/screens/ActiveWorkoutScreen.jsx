import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet, Alert } from 'react-native';
import { ArrowLeft, Clock, MoreVertical, Plus } from 'lucide-react-native';
import { SetRow } from '../components/common/SetRow';
import { RestTimer } from '../components/common/RestTimer';
import { workoutService } from '../services/workoutService';

export const ActiveWorkoutScreen = ({ activeWorkout, setActiveTab, setActiveWorkout, setStats, user }) => {
  const [showRestTimer, setShowRestTimer] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [exercisesData, setExercisesData] = useState(
    activeWorkout.exercises.map(ex => ({
      ...ex,
      sets: [
        { weight: '', reps: '', completed: false },
        { weight: '', reps: '', completed: false },
        { weight: '', reps: '', completed: false },
      ]
    }))
  );

  // Timer para el entrenamiento
  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Formatear tiempo transcurrido
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Actualizar datos de un set
  const updateSetData = (exerciseIndex, setIndex, field, value) => {
    setExercisesData(prev => {
      const newData = [...prev];
      newData[exerciseIndex].sets[setIndex][field] = value;
      return newData;
    });
  };

  // Marcar set como completado
  const toggleSetCompleted = (exerciseIndex, setIndex) => {
    setExercisesData(prev => {
      const newData = [...prev];
      newData[exerciseIndex].sets[setIndex].completed = !newData[exerciseIndex].sets[setIndex].completed;
      return newData;
    });
  };

  // Añadir set a un ejercicio
  const addSet = (exerciseIndex) => {
    setExercisesData(prev => {
      const newData = [...prev];
      newData[exerciseIndex].sets.push({ weight: '', reps: '', completed: false });
      return newData;
    });
  };
  
  const handleFinish = async () => {
    // Calcular volumen total y calorías
    let totalVolume = 0;
    exercisesData.forEach(exercise => {
      exercise.sets.forEach(set => {
        if (set.completed && set.weight && set.reps) {
          totalVolume += parseFloat(set.weight) * parseInt(set.reps);
        }
      });
    });

    const duration = Math.floor(elapsedTime / 60); // minutos
    const calories = Math.floor(duration * 5); // Estimación simple

    try {
      // Guardar entrenamiento en Supabase
      await workoutService.saveWorkout(user.id, {
        title: activeWorkout.title || 'Entrenamiento',
        date: new Date().toISOString(),
        duration: duration,
        exercises: exercisesData.map(ex => ({
          name: ex.name,
          type: ex.type,
          sets: ex.sets.filter(s => s.completed) // Solo guardar sets completados
        })),
        volume: totalVolume,
        calories: calories,
        notes: '',
      });

      Alert.alert(
        '¡Entrenamiento Guardado!',
        `Duración: ${duration} min\nVolumen: ${totalVolume.toFixed(0)} kg\nCalorías: ${calories} kcal`,
        [
          { 
            text: 'OK', 
            onPress: () => {
              setActiveWorkout(null);
              setStats(prev => ({...prev, workoutsCompleted: prev.workoutsCompleted + 1}));
              setActiveTab('dashboard');
            } 
          }
        ]
      );
    } catch (error) {
      console.error('Error saving workout:', error);
      Alert.alert('Error', 'No se pudo guardar el entrenamiento. Intenta de nuevo.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => setActiveTab('library')}
          style={styles.backButton}
        >
          <ArrowLeft size={24} color="#1e293b" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>{activeWorkout.title || 'Entrenamiento'}</Text>
          <View style={styles.timerContainer}>
            <Clock size={12} color="#3b82f6" />
            <Text style={styles.timerText}>{formatTime(elapsedTime)}</Text>
          </View>
        </View>
        <TouchableOpacity 
          onPress={handleFinish}
          style={styles.finishButton}
        >
          <Text style={styles.finishButtonText}>Terminar</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {exercisesData.map((ex, exerciseIndex) => (
          <View key={exerciseIndex} style={styles.exerciseCard}>
            <View style={styles.exerciseHeader}>
              <View style={styles.exerciseImage}>
                <Image 
                  source={{ uri: ex.img }} 
                  style={styles.image}
                  resizeMode="cover"
                />
              </View>
              <View style={styles.exerciseInfo}>
                <Text style={styles.exerciseName}>{ex.name}</Text>
                <Text style={styles.restTime}>Descanso: 90s</Text>
              </View>
              <TouchableOpacity style={styles.moreButton}>
                <MoreVertical size={18} color="#94a3b8" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.tableHeader}>
              <View style={styles.headerCol1}><Text style={styles.headerText}>Set</Text></View>
              <View style={styles.headerCol2}><Text style={styles.headerText}>Previo</Text></View>
              <View style={styles.headerCol3}><Text style={styles.headerText}>Kg</Text></View>
              <View style={styles.headerCol4}><Text style={styles.headerText}>Reps</Text></View>
              <View style={styles.headerCol5}><Text style={styles.headerText}>Ok</Text></View>
            </View>

            <View style={styles.setsContainer}>
              {ex.sets.map((set, setIndex) => (
                <SetRow 
                  key={setIndex}
                  index={setIndex} 
                  prev="-"
                  weight={set.weight} 
                  reps={set.reps} 
                  isCompleted={set.completed}
                  onWeightChange={(value) => updateSetData(exerciseIndex, setIndex, 'weight', value)}
                  onRepsChange={(value) => updateSetData(exerciseIndex, setIndex, 'reps', value)}
                  onToggleComplete={() => toggleSetCompleted(exerciseIndex, setIndex)}
                />
              ))}
            </View>

            {showRestTimer && (
              <View style={styles.restTimerContainer}>
                <RestTimer 
                  duration={90}
                  onComplete={() => setShowRestTimer(false)}
                />
              </View>
            )}

            <View style={styles.addSetContainer}>
              <TouchableOpacity 
                style={styles.addSetButton}
                onPress={() => addSet(exerciseIndex)}
              >
                <Plus size={14} color="#3b82f6" />
                <Text style={styles.addSetText}>Añadir Serie</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    backgroundColor: 'white',
    padding: 16,
    paddingBottom: 8,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
    minHeight: 44,
    minWidth: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerCenter: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timerText: {
    fontSize: 12,
    color: '#3b82f6',
    fontWeight: '500',
  },
  finishButton: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
    minHeight: 44,
    justifyContent: 'center',
  },
  finishButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  scrollView: {
    flex: 1,
    padding: 8,
  },
  scrollContent: {
    paddingBottom: 100,
    gap: 16,
  },
  exerciseCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  exerciseHeader: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  exerciseImage: {
    height: 56,
    width: 56,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#f1f5f9',
  },
  image: {
    width: 56,
    height: 56,
  },
  exerciseInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  exerciseName: {
    fontWeight: 'bold',
    color: '#1e293b',
    fontSize: 18,
    lineHeight: 22,
  },
  restTime: {
    color: '#3b82f6',
    fontSize: 12,
    fontWeight: '500',
    marginTop: 4,
  },
  moreButton: {
    backgroundColor: '#f8fafc',
    padding: 8,
    borderRadius: 20,
    minHeight: 44,
    minWidth: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tableHeader: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  headerCol1: { flex: 1, alignItems: 'center' },
  headerCol2: { flex: 3, alignItems: 'center' },
  headerCol3: { flex: 2, alignItems: 'center' },
  headerCol4: { flex: 2, alignItems: 'center' },
  headerCol5: { flex: 2, alignItems: 'center' },
  headerText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  setsContainer: {
    gap: 4,
  },
  restTimerContainer: {
    marginTop: 12,
  },
  addSetContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  addSetButton: {
    backgroundColor: '#eff6ff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    minHeight: 44,
  },
  addSetText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#3b82f6',
  },
});
