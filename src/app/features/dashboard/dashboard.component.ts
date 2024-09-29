import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { combineLatest, filter, map } from 'rxjs';
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

  polls$ = this.everyoneVotesService
    .getPolls()
    .pipe(map(({ data, error }) => data));

  userVotes$ = this.everyoneVotesService
    .getUserVotes()
    .pipe(map(({ data, error }) => data));

  pollsAndVotes$ = combineLatest([this.polls$, this.userVotes$]).pipe(
    filter(([polls, votes]) => polls !== null),
    map(([polls, votes]) => {
      if (!votes) return polls;
      return polls?.map((poll) => {
        const userVote = votes?.find((vote) => vote.poll_id === poll.id);
        return { ...poll, userVote };
      });
    })
  );
}
