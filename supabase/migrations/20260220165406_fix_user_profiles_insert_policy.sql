/*
  # Fix User Profiles Insert Policy for New User Registration

  1. Changes
    - Drop the existing restrictive insert policy for user_profiles
    - Add a new policy that allows authenticated users to insert their own profile
    - This fixes the "Database error saving new user" issue during sign-up
  
  2. Security
    - Users can only create their own profile (id must match auth.uid())
    - Profile creation is still restricted to authenticated users
    - This maintains security while allowing new user registration
*/

-- Drop existing insert policy
DROP POLICY IF EXISTS "Users can insert own profile" ON user_profiles;

-- Create new insert policy that works with new user registration
CREATE POLICY "Allow authenticated users to insert own profile"
  ON user_profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);
