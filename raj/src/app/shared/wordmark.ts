import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PROFILE } from '../data/profile';

const PALETTE = ['blue', 'red', 'yellow', 'blue', 'green', 'red', 'blue', 'yellow', 'green', 'red'];

@Component({
  selector: 'app-wordmark',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span class="wordmark" aria-hidden="true">
      @for (letter of letters; track $index) {
        <span [class]="letter.tone">{{ letter.char }}</span>
      }
    </span>
    <span class="visually-hidden">{{ name }}</span>
  `,
  styles: `
    :host {
      display: inline-block;
    }

    .wordmark {
      font-family: var(--font-display);
      font-weight: 500;
      letter-spacing: -0.045em;
      line-height: 1;
      user-select: none;
    }

    .blue {
      color: var(--blue);
    }
    .red {
      color: var(--red);
    }
    .yellow {
      color: var(--yellow);
    }
    .green {
      color: var(--green);
    }
  `,
})
export class Wordmark {
  protected readonly name = PROFILE.name;
  protected readonly letters = [...PROFILE.wordmark].map((char, i) => ({
    char,
    tone: PALETTE[i % PALETTE.length],
  }));
}
