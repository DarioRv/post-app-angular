import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

import { CreateUser } from '@auth/interfaces/create-user.interface';
import { User } from '@auth/interfaces/user.interface';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  signUp(createUser: CreateUser): Observable<User> {
    const url = `${this.baseUrl}/users`;

    return this.http
      .post<User>(url, createUser)
      .pipe(catchError((err) => throwError(() => err.error.message)));
  }
}
