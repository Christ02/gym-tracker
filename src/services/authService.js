import { supabase } from './supabase';

export const authService = {
  /**
   * Registrar nuevo usuario
   */
  signUp: async (email, password, userData) => {
    try {
      // 1. Crear usuario en Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: userData.name,
            goal: userData.goal,
            age: userData.age,
          },
        },
      });

      if (authError) throw authError;

      // 2. Crear perfil en tabla users
      if (authData.user) {
        const { error: profileError } = await supabase
          .from('users')
          .insert([
            {
              id: authData.user.id,
              email: email,
              name: userData.name,
              goal: userData.goal,
              age: userData.age || null,
              created_at: new Date().toISOString(),
            },
          ]);

        if (profileError) console.warn('Profile creation error:', profileError);
      }

      return { user: authData.user, session: authData.session };
    } catch (error) {
      console.error('SignUp Error:', error);
      throw error;
    }
  },

  /**
   * Iniciar sesión
   */
  signIn: async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      return { user: data.user, session: data.session };
    } catch (error) {
      console.error('SignIn Error:', error);
      throw error;
    }
  },

  /**
   * Cerrar sesión
   */
  signOut: async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error('SignOut Error:', error);
      throw error;
    }
  },

  /**
   * Obtener usuario actual
   */
  getCurrentUser: async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      return user;
    } catch (error) {
      console.error('Get Current User Error:', error);
      return null;
    }
  },

  /**
   * Obtener perfil del usuario
   */
  getUserProfile: async (userId) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Get User Profile Error:', error);
      return null;
    }
  },

  /**
   * Actualizar perfil del usuario
   */
  updateUserProfile: async (userId, updates) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', userId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Update Profile Error:', error);
      throw error;
    }
  },

  /**
   * Listener de cambios de autenticación
   */
  onAuthStateChange: (callback) => {
    return supabase.auth.onAuthStateChange((event, session) => {
      callback(event, session);
    });
  },
};

