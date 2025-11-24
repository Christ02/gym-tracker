import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { Search, Pencil, Trash2, Plus } from 'lucide-react-native';
import { MY_ROUTINES } from '../data/routines';

export const MyRoutinesScreen = ({ startNewWorkout }) => {
  const renderRoutineItem = ({ item }) => (
    <TouchableOpacity 
      onPress={() => startNewWorkout('Pecho')}
      style={styles.routineCard}
    >
      <View>
        <Text style={styles.routineName}>{item.name}</Text>
        <Text style={styles.routineCount}>{item.count}</Text>
      </View>
      
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton}>
          <Pencil size={18} color="#1e293b" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Trash2 size={18} color="#1e293b" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mis Rutinas</Text>
        <TouchableOpacity style={styles.searchButton}>
          <Search size={24} color="#1e293b" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={MY_ROUTINES}
        renderItem={renderRoutineItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.fabContainer}>
        <TouchableOpacity style={styles.fab}>
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
