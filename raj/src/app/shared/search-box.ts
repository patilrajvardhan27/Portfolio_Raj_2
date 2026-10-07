import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  effect,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { PROFILE, SUGGESTIONS } from '../data/profile';

const MAX_SUGGESTIONS = 8;

@Component({
  selector: 'app-search-box',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './search-box.html',
  styleUrl: './search-box.scss',
  host: {
    '(document:keydown)': 'onGlobalKey($event)',
    '(document:pointerdown)': 'onOutsidePointer($event)',
  },
})
export class SearchBox {
  private readonly router = inject(Router);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly field = viewChild.required<ElementRef<HTMLInputElement>>('field');

  readonly query = input('');
  readonly tab = input('all');
  readonly autofocus = input(false);

  protected readonly value = signal('');
  protected readonly open = signal(false);
  protected readonly active = signal(-1);

  protected readonly suggestions = computed(() => {
    const typed = this.value().trim().toLowerCase();
    if (!typed) return SUGGESTIONS.slice(0, MAX_SUGGESTIONS);
    const starts = SUGGESTIONS.filter((s) => s.startsWith(typed));
    const contains = SUGGESTIONS.filter((s) => !s.startsWith(typed) && s.includes(typed));
    return [...starts, ...contains].filter((s) => s !== typed).slice(0, MAX_SUGGESTIONS);
  });

  protected readonly expanded = computed(() => this.open() && this.suggestions().length > 0);

  constructor() {
    effect(() => this.value.set(this.query()));
    effect(() => {
      if (this.autofocus()) this.field().nativeElement.focus();
    });
  }

  /** Runs the search with whatever is in the field. */
  submit(text = this.value()): void {
    const q = text.trim() || PROFILE.name.toLowerCase();
    this.value.set(q);
    this.close();
    this.field().nativeElement.blur();
    const sameQuery = q === this.query().trim();
    this.router.navigate(['/search'], {
      queryParams: { q, tab: sameQuery && this.tab() !== 'all' ? this.tab() : null },
    });
  }

  protected onInput(event: Event): void {
    this.value.set((event.target as HTMLInputElement).value);
    this.active.set(-1);
    this.open.set(true);
  }

  protected onKey(event: KeyboardEvent): void {
    const count = this.suggestions().length;
    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowUp': {
        if (!count) return;
        event.preventDefault();
        if (!this.open()) {
          this.open.set(true);
          return;
        }
        const step = event.key === 'ArrowDown' ? 1 : -1;
        // -1 means "back in the text field", so cycle through count + 1 slots.
        this.active.update((i) => ((i + 1 + step + count + 1) % (count + 1)) - 1);
        break;
      }
      case 'Enter': {
        event.preventDefault();
        const picked = this.expanded() ? this.suggestions()[this.active()] : undefined;
        this.submit(picked ?? this.value());
        break;
      }
      case 'Escape':
        if (this.open()) {
          event.stopPropagation();
          this.close();
        }
        break;
    }
  }

  protected clear(): void {
    this.value.set('');
    this.active.set(-1);
    this.open.set(true);
    this.field().nativeElement.focus();
  }

  protected onGlobalKey(event: KeyboardEvent): void {
    if (event.key !== '/' || event.metaKey || event.ctrlKey || event.altKey) return;
    const target = event.target as HTMLElement | null;
    if (target?.closest('input, textarea, [contenteditable]')) return;
    event.preventDefault();
    const field = this.field().nativeElement;
    field.focus();
    field.select();
  }

  protected onOutsidePointer(event: Event): void {
    if (this.open() && !this.host.nativeElement.contains(event.target as Node)) this.close();
  }

  private close(): void {
    this.open.set(false);
    this.active.set(-1);
  }
}
