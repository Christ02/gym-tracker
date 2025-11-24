import { supabase } from './supabase';

export const routineService = {
  /**
   * Crear nueva rutina
   */
  createRoutine: async (userId, routineData) => {
    try {
      const { data, error } = await supabase
        .from('routines')
        .insert([
          {
            user_id: userId,
            name: routineData.name,
            exercises: routineData.exercises, // JSON array
            description: routineData.description || '',
            category: routineData.category || 'General',
          },
        ])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Create Routine Error:', error);
      throw error;
    }
  },

  /**
   * Obtener todas las rutinas del usuario
   */
  getUserRoutines: async (userId) => {
    try {
      const { data, error } = await supabase
        .from('routines')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Get User Routines Error:', error);
      return [];
    }
  },

  /**
   * Obtener rutina por ID
   */
  getRoutineById: async (routineId) => {
    try {
      const { data, error } = await supabase
        .from('routines')
        .select('*')
        .eq('id', routineId)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Get Routine By ID Error:', error);
      return null;
    }
  },

  /**
   * Actualizar rutina
   */
  updateRoutine: async (routineId, updates) => {
    try {
      const { data, error } = await supabase
        .from('routines')
        .update(updates)
        .eq('id', routineId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Update Routine Error:', error);
      throw error;
    }
  },

  /**
   * Eliminar rutina
   */
  deleteRoutine: async (routineId) => {
    try {
      const { error } = await supabase
        .from('routines')
        .delete()
        .eq('id', routineId);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Delete Routine Error:', error);
      throw error;
    }
  },

  /**
   * Duplicar rutina
   */
  duplicateRoutine: async (userId, routineId) => {
    try {
      // Obtener la rutina original
      const original = await routineService.getRoutineById(routineId);
      if (!original) throw new Error('Routine not found');

      // Crear copia
      const { data, error } = await supabase
        .from('routines')
        .insert([
          {
            user_id: userId,
            name: `${original.name} (Copia)`,
            exercises: original.exercises,
            description: original.description,
            category: original.category,
          },
        ])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Duplicate Routine Error:', error);
      throw error;
    }
  },
};

