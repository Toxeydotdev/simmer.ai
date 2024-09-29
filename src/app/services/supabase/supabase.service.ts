import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  supabaseClient: SupabaseClient;

  constructor() {
    this.supabaseClient = createClient(
      import.meta.env['NG_APP_SUPERBASEURL'],
      import.meta.env['NG_APP_SUPABASEKEY']
    );
  }
}
