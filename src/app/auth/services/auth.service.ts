import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';

import { CreateUser } from '@auth/interfaces/create-user.interface';
import { User } from '@auth/interfaces/user.interface';
import { environment } from '../../../environments/environment.development';
import { Credentials } from '@auth/interfaces/credentials.interface';
import { LoginResponse } from '@auth/interfaces/login-response.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;
  private _currentUser = signal<User | null>(null);
  currentUser = computed(() => this._currentUser());

  signUp(createUser: CreateUser): Observable<User> {
    const url = `${this.baseUrl}/users`;

    return this.http
      .post<User>(url, createUser)
      .pipe(catchError((err) => throwError(() => err.error.message)));
  }

  signIn(credentials: Credentials): Observable<User> {
    const url = `${this.baseUrl}/auth/sign-in`;

    return this.http.post<LoginResponse>(url, credentials).pipe(
      tap(({ user, token }) => this.setSession(user, token)),
      map(({ user }) => user),
      catchError((err) => throwError(() => err.error.message))
    );
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  removeToken(): void {
    localStorage.removeItem('token');
  }

  setSession(user: User, token: string): void {
    this._currentUser.set(user);
    this.saveToken(token);
  }

  logout(): void {
    this._currentUser.set(null);
    this.removeToken();
  }
}
