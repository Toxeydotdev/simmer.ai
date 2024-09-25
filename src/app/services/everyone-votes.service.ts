import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js'; // Ensure you have this import
import { environment } from '../../environments/environments';
import { Polls } from './database';

export const supabase = createClient<Polls>(
  environment.supabaseUrl,
  environment.supabaseKey
);

@Injectable({
  providedIn: 'root',
})
export class EveryoneVotesService {
  constructor() {}
  async getPolls() {
    return await supabase.from('polls').select();
  }
}
