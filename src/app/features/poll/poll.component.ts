import { CommonModule } from '@angular/common';
import { Component, computed, input, OnInit, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Poll } from '../../services/database';

@Component({
  selector: 'app-poll',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule],
  templateUrl: './poll.component.html',
  styleUrl: './poll.component.scss',
})
export class PollComponent implements OnInit {
  poll = input.required<Poll>();

  buttons = signal([{ label: '', isSelected: false }]);

  optionSelected = computed(
    () => this.buttons().filter((button) => button.isSelected).length < 1
  );

  ngOnInit() {
    this.buttons.update(() => {
      return this.poll().poll_option_labels.map((option) => {
        return { label: option, isSelected: false };
      });
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
