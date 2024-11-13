import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  // Función para login
  login(username: string, password: string) {
    return this.supabase.auth.signInWithPassword({
      email: username, // Usamos email para login
      password: password,
    });
  }

  // Función para registrar un usuario
  signup(username: string, email: string, password: string) {
    return this.supabase.auth.signUp({
      email: email,  // Email para signup
      password: password,
    });
  }

  getCurrentUser() {

    return this.supabase.auth.user();
  }


  async getCurrentSession() {
    const { data: { session }, error } = await this.supabase.auth.getSession();
    if (error) {
      console.error('Error getting session:', error);
      return null;
    }
    return session;
  }


  setCurrentUser(user: any, token: string) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('authToken', token);
  }

  logout() {
    return this.supabase.auth.signOut();
  }
  async login(email: string, password: string) {
    const { user, error } = await this.supabase.auth.signIn({ email, password });
    if (error) {
      console.error('Error logging in:', error);
      return null;
    }
    return user;
  }


  async signUp(email: string, password: string) {
    const { user, error } = await this.supabase.auth.signUp({ email, password });
    if (error) {
      console.error('Error signing up:', error);
      return null;
    }
    return user;
  }
}
