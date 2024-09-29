import { inject, Injectable } from '@angular/core';
import { from } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable({
  providedIn: 'root',
})
export class EveryoneVotesService {
  supabaseService = inject(SupabaseService);
  authService = inject(AuthService);
  getPolls() {
    return from(this.supabaseService.supabaseClient.from('polls').select());
  }

  getUserVotes() {
    return from(
      this.supabaseService.supabaseClient
        .from('poll_votes')
        .select()
        .eq('user_id', this.authService.user()?.id)
    );
  }

  submitVote(pollId: string, optionSelected: number) {
    return from(
      this.supabaseService.supabaseClient
        .from('poll_votes')
        .insert([
          {
            poll_id: pollId,
            user_id: this.authService.user()?.id,
            option_selected: optionSelected,
          },
        ])
        .select(
          `
          poll_id,
          option_selected
        `
        )
    );
  }
}
