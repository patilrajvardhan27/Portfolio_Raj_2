import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { highlight } from '../../core/search.service';
import { Entry, Kind } from '../../data/models';

const TONES: Record<Kind, string> = {
  about: 'blue',
  experience: 'blue',
  project: 'green',
  research: 'red',
  education: 'yellow',
  skills: 'slate',
  contact: 'slate',
};

@Component({
  selector: 'app-result-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './result-item.html',
  styleUrl: './result-item.scss',
})
export class ResultItem {
  readonly entry = input.required<Entry>();
  readonly tokens = input<string[]>([]);
  /** Whether the detail list starts open. A click on the toggle overrides it. */
  readonly expanded = input(false);

  private readonly toggled = signal<boolean | null>(null);
  protected readonly open = computed(() => this.toggled() ?? this.expanded());

  protected readonly tone = computed(() => TONES[this.entry().kind]);
  protected readonly initial = computed(() => this.entry().source.charAt(0).toUpperCase());
  protected readonly summary = computed(() => highlight(this.entry().summary, this.tokens()));
  protected readonly points = computed(() =>
    (this.entry().points ?? []).map((point) => highlight(point, this.tokens())),
  );
  protected readonly external = computed(() => !this.entry().url?.startsWith('mailto:'));
  protected readonly panelId = computed(() => `details-${this.entry().id}`);

  protected toggle(): void {
    this.toggled.set(!this.open());
  }
}
