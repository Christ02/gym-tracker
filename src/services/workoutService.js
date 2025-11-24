import { supabase } from './supabase';

export const workoutService = {
  /**
   * Guardar un nuevo entrenamiento
   */
  saveWorkout: async (userId, workoutData) => {
    try {
      const { data, error } = await supabase
        .from('workouts')
        .insert([
          {
            user_id: userId,
            title: workoutData.title,
            date: workoutData.date || new Date().toISOString(),
            duration: workoutData.duration, // en minutos
            exercises: workoutData.exercises, // JSON array
            volume: workoutData.volume, // kg totales
            calories: workoutData.calories || 0,
            notes: workoutData.notes || '',
          },
        ])
        .select()
        .single();

      if (error) throw error;

      // Actualizar PRs si existen nuevos récords
      if (workoutData.exercises && Array.isArray(workoutData.exercises)) {
        await workoutService.checkAndUpdatePRs(userId, workoutData.exercises);
      }

      return data;
    } catch (error) {
      console.error('Save Workout Error:', error);
      throw error;
    }
  },

  /**
   * Obtener historial de entrenamientos
   */
  getWorkoutHistory: async (userId, limit = 50) => {
    try {
      const { data, error } = await supabase
        .from('workouts')
        .select('*')
        .eq('user_id', userId)
        .order('date', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Get Workout History Error:', error);
      return [];
    }
  },

  /**
   * Obtener entrenamiento por ID
   */
  getWorkoutById: async (workoutId) => {
    try {
      const { data, error } = await supabase
        .from('workouts')
        .select('*')
        .eq('id', workoutId)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Get Workout By ID Error:', error);
      return null;
    }
  },

  /**
   * Eliminar entrenamiento
   */
  deleteWorkout: async (workoutId) => {
    try {
      const { error } = await supabase
        .from('workouts')
        .delete()
        .eq('id', workoutId);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Delete Workout Error:', error);
      throw error;
    }
  },

  /**
   * Obtener estadísticas del usuario
   */
  getUserStats: async (userId, days = 7) => {
    try {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);

      const { data, error } = await supabase
        .from('workouts')
        .select('*')
        .eq('user_id', userId)
        .gte('date', startDate.toISOString())
        .order('date', { ascending: true });

      if (error) throw error;

      // Calcular estadísticas
      const stats = {
        workoutsCompleted: data.length,
        totalVolume: data.reduce((sum, w) => sum + (w.volume || 0), 0),
        totalDuration: data.reduce((sum, w) => sum + (w.duration || 0), 0),
        totalCalories: data.reduce((sum, w) => sum + (w.calories || 0), 0),
        workoutsByDay: data,
      };

      return stats;
    } catch (error) {
      console.error('Get User Stats Error:', error);
      return {
        workoutsCompleted: 0,
        totalVolume: 0,
        totalDuration: 0,
        totalCalories: 0,
        workoutsByDay: [],
      };
    }
  },

  /**
   * Verificar y actualizar récords personales
   */
  checkAndUpdatePRs: async (userId, exercises) => {
    try {
      for (const exercise of exercises) {
        if (exercise.sets && Array.isArray(exercise.sets)) {
          // Encontrar el peso máximo en este ejercicio
          const maxSet = exercise.sets.reduce((max, set) => {
            const weight = parseFloat(set.weight) || 0;
            return weight > (max.weight || 0) ? { weight, reps: set.reps } : max;
          }, { weight: 0, reps: 0 });

          if (maxSet.weight > 0) {
            // Verificar si es un PR
            const { data: existingPR } = await supabase
              .from('personal_records')
              .select('*')
              .eq('user_id', userId)
              .eq('exercise_name', exercise.name)
              .single();

            if (!existingPR || maxSet.weight > existingPR.weight) {
              // Es un nuevo PR, actualizar
              await supabase
                .from('personal_records')
                .upsert({
                  user_id: userId,
                  exercise_name: exercise.name,
                  weight: maxSet.weight,
                  reps: maxSet.reps,
                  date: new Date().toISOString(),
                });
            }
          }
        }
      }
    } catch (error) {
      console.error('Check and Update PRs Error:', error);
    }
  },

  /**
   * Obtener todos los PRs del usuario
   */
  getUserPRs: async (userId) => {
    try {
      const { data, error } = await supabase
        .from('personal_records')
        .select('*')
        .eq('user_id', userId)
        .order('date', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Get User PRs Error:', error);
      return [];
    }
  },
};

