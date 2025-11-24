import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet } from 'react-native';
import { ArrowLeft, Clock, MoreVertical, Plus } from 'lucide-react-native';
import { SetRow } from '../components/common/SetRow';

export const ActiveWorkoutScreen = ({ activeWorkout, setActiveTab, setActiveWorkout, setStats }) => {
  const handleFinish = () => {
    setActiveWorkout(null);
    setStats(prev => ({...prev, workoutsCompleted: prev.workoutsCompleted + 1}));
    setActiveTab('dashboard');
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
          <Text style={styles.headerTitle}>Día 1: Pecho</Text>
          <View style={styles.timerContainer}>
            <Clock size={12} color="#3b82f6" />
            <Text style={styles.timerText}>45:12</Text>
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
        {activeWorkout.exercises.map((ex, index) => (
          <View key={index} style={styles.exerciseCard}>
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
              <SetRow index={0} prev="80kg x 10" weight="80" reps="10" isCompleted={true} />
              <SetRow index={1} prev="80kg x 10" weight="80" reps="10" isCompleted={false} />
              <SetRow index={2} prev="80kg x 9" weight="80" reps="10" isCompleted={false} />
            </View>

            <View style={styles.addSetContainer}>
              <TouchableOpacity style={styles.addSetButton}>
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
