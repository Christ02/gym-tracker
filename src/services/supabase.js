import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Credenciales de Supabase
const SUPABASE_URL = 'https://wbwzoslyobagnylubpxn.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_lQbjSlH-xgYcNQfYGPXtUA_S7DnY8Xj';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

