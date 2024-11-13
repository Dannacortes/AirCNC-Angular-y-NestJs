import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../interfaces/user.interface';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl; // API URL from environment settings

  constructor(private http: HttpClient, private supabaseService: SupabaseService) {}

  // Función para login
  login(credentials: { username: string; password: string }): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/auth/login`, credentials);
  }

  // Función para registrarse (signup)
  register(newUser: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/auth/signup`, newUser);
  }

  // Función para cerrar sesión
  logout() {
    this.supabaseService.logout();
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
  }

  // Obtener el usuario actual
  getCurrentUser() {
    return this.supabaseService.getCurrentUser();
  }

  // Guardar el usuario y token
  setCurrentUser(user: User, token: string) {
    this.supabaseService.setCurrentUser(user, token);
  }
}
