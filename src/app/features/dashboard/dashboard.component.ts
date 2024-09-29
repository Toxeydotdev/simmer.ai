import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { combineLatest, filter, map, tap } from 'rxjs';
import { EveryoneVotesService } from '../../services/everyone-votes/everyone-votes.service';
import { PollComponent } from '../poll/poll.component';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule, PollComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  everyoneVotesService = inject(EveryoneVotesService);
  processing = signal(false);

  polls$ = this.everyoneVotesService.getPolls().pipe(
    map(({ data, error }) => data),
    tap((polls) => console.log(polls))
  );

  userVotes$ = this.everyoneVotesService.getUserVotes().pipe(
    map(({ data, error }) => data),
    tap((votes) => console.log(votes))
  );

  pollsAndVotes$ = combineLatest([this.polls$, this.userVotes$]).pipe(
    filter(([polls, votes]) => polls !== null && votes !== null),
    map(([polls, votes]) => {
      return polls?.map((poll) => {
        const userVote = votes?.find((vote) => vote.poll_id === poll.id);
        return { ...poll, userVote };
      });
    }),
    tap((votes) => console.log(votes))
  );
}
