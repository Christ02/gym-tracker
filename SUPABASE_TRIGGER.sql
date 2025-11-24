-- =====================================================
-- TRIGGER AUTOMÁTICO PARA CREAR PERFIL DE USUARIO
-- =====================================================
-- Este trigger se ejecuta automáticamente cuando un usuario
-- se registra en Supabase Auth y crea su perfil en public.users

-- Función que se ejecutará cuando se cree un usuario
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, name, goal, age, created_at)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'goal', 'general'),
    (NEW.raw_user_meta_data->>'age')::integer,
    NOW()
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Crear el trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Verificar que se creó correctamente
SELECT 'Trigger creado exitosamente ✅' as status;

