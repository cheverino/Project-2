/*
  # Fix User Creation Trigger and RLS Policies
  
  1. Problem
    - The handle_new_user() trigger fails because RLS policies block the insert
    - The function needs to bypass RLS to create the initial user profile
  
  2. Solution
    - Recreate the handle_new_user() function with proper SECURITY DEFINER
    - Ensure the function has the correct permissions to bypass RLS
    - The function runs with the privileges of the user who created it (superuser)
  
  3. Security
    - This is safe because the trigger only runs on auth.users INSERT
    - The function only creates a profile for the new user (not arbitrary users)
    - RLS policies still protect all other operations
*/

-- Drop and recreate the function with proper security context
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    'content_creator'
  );
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    RAISE LOG 'Error creating user profile: %', SQLERRM;
    RETURN NEW;
END;
$$;

-- Recreate the trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO postgres, anon, authenticated, service_role;
GRANT ALL ON public.user_profiles TO postgres, service_role;
