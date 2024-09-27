import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  inject,
  model,
  OnInit,
  signal,
} from '@angular/core';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { MeterGroupModule } from 'primeng/metergroup';
import { delay, finalize, map, tap } from 'rxjs';
import { EveryoneVotesService } from '../../services/everyone-votes/everyone-votes.service';
import { PollWithUserVote, Vote } from '../../services/everyone-votes/poll';
@Component({
  selector: 'app-poll',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule, MeterGroupModule],
  templateUrl: './poll.component.html',
  styleUrl: './poll.component.scss',
})
export class PollComponent implements OnInit {
  poll = model.required<PollWithUserVote>();
  messageService = inject(MessageService);
  meterValues = signal([
    { label: '', color: '', icon: '', value: 0 },
    { label: '', color: '', icon: '', value: 0 },
  ]);

  buttons = signal([{ label: '', isSelected: false }]);

  optionSelected = computed(
    () => this.buttons().filter((button) => button.isSelected).length < 1
  );

  alreadyVoted = computed(() => this.poll().userVote !== undefined);

  processing = signal(false);
  everyoneVotesService = inject(EveryoneVotesService);

  updateMeterValues() {
    this.meterValues.update(() => {
      return this.poll().poll_option_labels.map((label, index) => {
        return {
          label,
          color:
            this.poll().userVote?.option_selected === index
              ? '#22c55e'
              : '#64748b',
          icon: '',
          value:
            (this.poll().poll_option_votes[index] /
              this.poll().poll_votes_total) *
            100,
        };
      });
    });
  }
  ngOnInit() {
    this.buttons.update(() => {
      return this.poll().poll_option_labels.map((option, index) => {
        return {
          label: option,
          isSelected: index === this.poll().userVote?.option_selected,
        };
      });
    });

    this.updateMeterValues();
  }

  handleSelection(index: number): void {
    this.buttons.update((buttons) => {
      return buttons.map((button, i) => {
        return { ...button, isSelected: i === index };
      });
    });
  }

  handleSubmit(pollId: string): void {
    const selectedOption = this.buttons().findIndex(
      (button) => button.isSelected
    );

    console.log(`Poll ID: ${pollId}, Selected Option: ${selectedOption}`);

    this.everyoneVotesService
      .submitVote(pollId, selectedOption)
      .pipe(
        tap(() => this.processing.update(() => true)),
        delay(1000),
        map(({ data, error }) => {
          console.log(data);
          if (error) {
            console.error(error);
            this.messageService.add({
              severity: 'error',
              summary: 'Something went wrong.',
              detail: 'Your vote was not submitted.',
            });
            return;
          }
          this.poll.update((poll) => ({
            ...poll,
            userVote: data[0] as Vote,
          }));

          // force ui refresh of buttons
          this.buttons.update(() => {
            return this.buttons().map((button) => ({ ...button }));
          });

          this.updateMeterValues();
        }),
        finalize(() => this.processing.update(() => false))
      )
      .subscribe();
  }
}
