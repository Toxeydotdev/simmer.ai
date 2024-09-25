import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { from } from 'rxjs';
import { EveryoneVotesService } from '../../services/everyone-votes.service';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  buttons = signal([
    { label: 'Kamala Harris', icon: 'pi pi-check', isSelected: false },
    { label: 'Donald Trump', icon: 'pi pi-times', isSelected: false },
  ]);

  optionSelected = computed(
    () => this.buttons().filter((button) => button.isSelected).length < 1
  );
  // polls: Observable<PostgrestSingleResponse<any[]>>;
  constructor(everyoneVotesService: EveryoneVotesService) {
    from(everyoneVotesService.getPolls()).subscribe((polls) => {
      console.log(polls);
    });
  }
  handleClick(index: number): void {
    this.buttons.update((buttons) => {
      return buttons.map((button, i) => {
        return { ...button, isSelected: i === index };
      });
    });
  }
}
