import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Image, StyleSheet } from 'react-native';
import { Search, X, Filter } from 'lucide-react-native';
import { getAllExercises, searchExercises } from '../data/exerciseDB';

export const ExerciseLibraryScreen = ({ onClose, onSelectExercise }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  
  const categories = ['Todos', 'Pecho', 'Espalda', 'Pierna', 'Hombro', 'Brazos'];
  const difficulties = {
    'Principiante': '#22c55e',
    'Intermedio': '#f59e0b',
    'Avanzado': '#ef4444',
  };

  const allExercises = getAllExercises();
  const filteredExercises = searchExercises(searchQuery).filter(ex => 
    selectedCategory === 'Todos' || Object.keys(require('../data/exerciseDB').EXERCISE_DB).find(key => 
      require('../data/exerciseDB').EXERCISE_DB[key].includes(ex)
    ) === selectedCategory
  );

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>Librería de Ejercicios</Text>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <X size={24} color="#1e293b" />
        </TouchableOpacity>
      </View>

      {/* BÚSQUEDA */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Search size={20} color="#94a3b8" />
          <TextInput
            placeholder="Buscar ejercicio..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchInput}
            placeholderTextColor="#94a3b8"
          />
          {searchQuery !== '' && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <X size={20} color="#94a3b8" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* FILTROS DE CATEGORÍA */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContainer}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            onPress={() => setSelectedCategory(category)}
            style={[
              styles.categoryChip,
              selectedCategory === category && styles.categoryChipActive
            ]}
          >
            <Text style={[
              styles.categoryText,
              selectedCategory === category && styles.categoryTextActive
            ]}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* LISTA DE EJERCICIOS */}
      <ScrollView style={styles.exercisesList} contentContainerStyle={styles.exercisesContent}>
        <Text style={styles.resultCount}>
          {filteredExercises.length} ejercicio{filteredExercises.length !== 1 ? 's' : ''}
        </Text>
        {filteredExercises.map((exercise) => (
          <TouchableOpacity
            key={exercise.id}
            onPress={() => onSelectExercise?.(exercise)}
            style={styles.exerciseCard}
          >
            <Image source={{ uri: exercise.img }} style={styles.exerciseImage} />
            <View style={styles.exerciseInfo}>
              <Text style={styles.exerciseName}>{exercise.name}</Text>
              <View style={styles.exerciseMeta}>
                <View style={styles.metaItem}>
                  <Text style={styles.metaText}>{exercise.type}</Text>
                </View>
                <View style={styles.metaItem}>
                  <Text style={styles.metaText}>{exercise.muscle}</Text>
                </View>
              </View>
              <View style={[styles.difficultyBadge, { backgroundColor: `${difficulties[exercise.difficulty]}15` }]}>
                <Text style={[styles.difficultyText, { color: difficulties[exercise.difficulty] }]}>
                  {exercise.difficulty}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
        {filteredExercises.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No se encontraron ejercicios</Text>
            <Text style={styles.emptySubtext}>Intenta con otra búsqueda</Text>
          </View>
        )}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    paddingTop: 60,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  closeButton: {
    padding: 8,
    borderRadius: 20,
    minHeight: 44,
    minWidth: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    padding: 16,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1e293b',
  },
  categoriesContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  categoryChipActive: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
  },
  categoryTextActive: {
    color: 'white',
  },
  exercisesList: {
    flex: 1,
  },
  exercisesContent: {
    padding: 16,
    paddingBottom: 100,
  },
  resultCount: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 16,
    fontWeight: '500',
  },
  exerciseCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    gap: 12,
  },
  exerciseImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: '#f1f5f9',
  },
  exerciseInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 6,
  },
  exerciseMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 6,
  },
  metaItem: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  metaText: {
    fontSize: 11,
    color: '#64748b',
    fontWeight: '500',
  },
  difficultyBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  difficultyText: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#64748b',
  },
});

