import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SearchService, highlight } from '../../core/search.service';
import { TabId } from '../../data/models';
import { ABOUT, PROFILE, QUESTIONS, RELATED, TABS } from '../../data/profile';
import { AccountBar } from '../../shared/account-bar';
import { SearchBox } from '../../shared/search-box';
import { Wordmark } from '../../shared/wordmark';
import { KnowledgePanel } from './knowledge-panel';
import { ResultItem } from './result-item';

// Results shown above the "People also ask" block on the All tab.
const LEAD_COUNT = 3;

@Component({
  selector: 'app-results',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, AccountBar, SearchBox, Wordmark, KnowledgePanel, ResultItem],
  templateUrl: './results.html',
  styleUrl: './results.scss',
})
export class Results {
  private readonly search = inject(SearchService);
  private readonly params = toSignal(inject(ActivatedRoute).queryParamMap);

  protected readonly profile = PROFILE;
  protected readonly about = ABOUT;
  protected readonly tabs = TABS;
  protected readonly questions = QUESTIONS;
  protected readonly related = RELATED;
  protected readonly defaultQuery = PROFILE.name.toLowerCase();
  protected readonly year = new Date().getFullYear();

  protected readonly query = computed(() => (this.params()?.get('q') ?? '').trim());
  protected readonly tab = computed<TabId>(() => {
    const requested = this.params()?.get('tab');
    return TABS.find((t) => t.id === requested)?.id ?? 'all';
  });

  protected readonly outcome = computed(() => {
    const started = performance.now();
    const result = this.search.search(this.query());
    const seconds = Math.max(0.01, (performance.now() - started) / 1000);
    return { ...result, seconds: seconds.toFixed(2) };
  });

  protected readonly visible = computed(() => {
    const { entries } = this.outcome();
    const tab = this.tab();
    return tab === 'all' ? entries : entries.filter((e) => e.kind === tab);
  });

  protected readonly isAll = computed(() => this.tab() === 'all');
  protected readonly showAbout = computed(() => this.isAll() && this.outcome().showAbout);
  protected readonly lead = computed(() =>
    this.isAll() ? this.visible().slice(0, LEAD_COUNT) : this.visible(),
  );
  protected readonly rest = computed(() => (this.isAll() ? this.visible().slice(LEAD_COUNT) : []));
  protected readonly total = computed(() => this.visible().length + (this.showAbout() ? 1 : 0));
  protected readonly tabLabel = computed(() => TABS.find((t) => t.id === this.tab())!.label);
  protected readonly aboutSummary = computed(() => highlight(ABOUT.summary, this.outcome().tokens));

  protected readonly openQuestion = signal<string | null>(null);

  constructor() {
    const title = inject(Title);
    effect(() => {
      title.setTitle(`${this.query() || this.defaultQuery} — ${PROFILE.name}`);
    });
  }

  protected toggleQuestion(question: string): void {
    this.openQuestion.update((current) => (current === question ? null : question));
  }
}
