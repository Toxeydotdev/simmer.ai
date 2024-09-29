import { computed, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import {
  AuthChangeEvent,
  AuthSession,
  Provider,
  Session,
  User,
} from '@supabase/supabase-js';
import { combineLatest, from } from 'rxjs';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  session = signal<AuthSession | null>(null);
  user = signal<User | null>(null);
  event = signal<AuthChangeEvent | null>(null);
  isAuthenticated = computed(() => this.user()?.role === 'authenticated');

  constructor(
    private router: Router,
    private supabaseService: SupabaseService
  ) {
    this.authChanges((event, session) => {
      this.event.update(() => event);
      switch (event) {
        case 'INITIAL_SESSION':
          break;
        case 'SIGNED_IN':
          if (session) {
            this.user.update(() => session.user);
          }
          this.router.navigate(['/dashboard']);
          break;
        case 'SIGNED_OUT':
          this.user.update(() => null);
          this.router.navigate(['/login']);
          break;
        case 'PASSWORD_RECOVERY':
          this.router.navigate(['/reset-password']);
          break;
        case 'TOKEN_REFRESHED':
          break;
        case 'USER_UPDATED':
          break;
        default:
          break;
      }
    });
  }

  authChanges(
    callback: (event: AuthChangeEvent, session: Session | null) => void
  ) {
    return this.supabaseService.supabaseClient.auth.onAuthStateChange(callback);
  }

  createUser(email: string, password: string) {
    return from(
      this.supabaseService.supabaseClient.auth.signUp({
        email,
        password,
      })
    );
  }

  signIn(email: string, password: string) {
    return from(
      this.supabaseService.supabaseClient.auth.signInWithPassword({
        email,
        password,
      })
    );
  }

  signInWIthIdToken(providerName: string, idToken: string) {
    return from(
      this.supabaseService.supabaseClient.auth.signInWithIdToken({
        provider: providerName,
        token: idToken,
      })
    );
  }

  signInWithOAuth(provider: Provider) {
    return from(
      this.supabaseService.supabaseClient.auth.signInWithOAuth({
        provider,
      })
    );
  }
  resetPassword(password: string) {
    return from(
      this.supabaseService.supabaseClient.auth.updateUser({
        password,
      })
    );
  }
  resetPasswordForEmail(email: string) {
    return from(
      this.supabaseService.supabaseClient.auth.resetPasswordForEmail(email)
    );
  }

  signOut() {
    return from(
      combineLatest([
        this.supabaseService.supabaseClient.auth.signOut(),
        this.supabaseService.supabaseClient.auth.updateUser({
          data: {
            session: null,
          },
        }),
      ])
    );
  }
}
