import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { Search, Pencil, Trash2, Plus } from 'lucide-react-native';
import { routineService } from '../services/routineService';

export const MyRoutinesScreen = ({ startNewWorkout, user }) => {
  const [routines, setRoutines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Cargar rutinas al montar el componente
  useEffect(() => {
    loadRoutines();
  }, []);

  const loadRoutines = async () => {
    try {
      setLoading(true);
      const data = await routineService.getUserRoutines(user.id);
      setRoutines(data);
    } catch (error) {
      console.error('Error loading routines:', error);
      Alert.alert('Error', 'No se pudieron cargar las rutinas');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadRoutines();
    setRefreshing(false);
  };

  const handleDeleteRoutine = (routineId, routineName) => {
    Alert.alert(
      'Eliminar Rutina',
      `¿Estás seguro que deseas eliminar "${routineName}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              await routineService.deleteRoutine(routineId);
              setRoutines(prev => prev.filter(r => r.id !== routineId));
              Alert.alert('Éxito', 'Rutina eliminada correctamente');
            } catch (error) {
              console.error('Error deleting routine:', error);
              Alert.alert('Error', 'No se pudo eliminar la rutina');
            }
          }
        }
      ]
    );
  };

  const handleStartRoutine = (routine) => {
    // Aquí podrías iniciar un entrenamiento basado en la rutina
    Alert.alert('Próximamente', 'Función de iniciar rutina en desarrollo');
  };

  const renderRoutineItem = ({ item }) => {
    const exerciseCount = item.exercises ? item.exercises.length : 0;
    
    return (
      <TouchableOpacity 
        onPress={() => handleStartRoutine(item)}
        style={styles.routineCard}
      >
        <View>
          <Text style={styles.routineName}>{item.name}</Text>
          <Text style={styles.routineCount}>{exerciseCount} ejercicios</Text>
          {item.description && (
            <Text style={styles.routineDescription}>{item.description}</Text>
          )}
        </View>
        
        <View style={styles.actions}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => Alert.alert('Próximamente', 'Función de edición en desarrollo')}
          >
            <Pencil size={18} color="#1e293b" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => handleDeleteRoutine(item.id, item.name)}
          >
            <Trash2 size={18} color="#ef4444" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading && !refreshing) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text style={styles.loadingText}>Cargando rutinas...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mis Rutinas</Text>
        <TouchableOpacity style={styles.searchButton}>
          <Search size={24} color="#1e293b" />
        </TouchableOpacity>
      </View>

      {routines.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>No tienes rutinas guardadas</Text>
          <Text style={styles.emptySubtitle}>Crea tu primera rutina tocando el botón +</Text>
        </View>
      ) : (
        <FlatList
          data={routines}
          renderItem={renderRoutineItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      )}

      <View style={styles.fabContainer}>
        <TouchableOpacity 
          style={styles.fab}
          onPress={() => Alert.alert('Próximamente', 'Función de crear rutina en desarrollo')}
        >
          <Plus size={32} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 8,
    position: 'relative',
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#64748b',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  searchButton: {
    padding: 8,
    borderRadius: 20,
    minHeight: 44,
    minWidth: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  routineCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    minHeight: 80,
  },
  routineName: {
    color: '#1e293b',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 4,
  },
  routineCount: {
    color: '#64748b',
    fontSize: 14,
  },
  routineDescription: {
    color: '#94a3b8',
    fontSize: 12,
    marginTop: 4,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  actionButton: {
    padding: 8,
    borderRadius: 20,
    minHeight: 44,
    minWidth: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    textAlign: 'center',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
  },
  fabContainer: {
    position: 'absolute',
    bottom: 24,
    right: 32,
  },
  fab: {
    height: 56,
    width: 56,
    backgroundColor: '#3b82f6',
    borderRadius: 28,
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 56,
    minWidth: 56,
  },
});
