import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { from, map, tap } from 'rxjs';
import { EveryoneVotesService } from '../../services/everyone-votes.service';
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

  polls$ = from(this.everyoneVotesService.getPolls()).pipe(
    tap((polls) => console.log(polls)),
    map((polls) => polls.data?.concat(polls.data)),
    tap((polls) => console.log(polls))
  );
}
