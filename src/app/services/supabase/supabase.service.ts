import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  supabaseClient: SupabaseClient;

  constructor() {
    this.supabaseClient = createClient(
      import.meta.env['NG_APP_SUPERBASEURL'] || environment.supabaseUrl,
      import.meta.env['NG_APP_SUPABASEKEY'] || environment.supabaseKey
    );
  }
}
