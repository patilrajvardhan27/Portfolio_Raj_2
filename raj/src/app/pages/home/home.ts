import { ChangeDetectionStrategy, Component, inject, viewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { ENTRIES, PROFILE, SOCIALS, TABS } from '../../data/profile';
import { AccountBar } from '../../shared/account-bar';
import { SearchBox } from '../../shared/search-box';
import { Wordmark } from '../../shared/wordmark';

@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, AccountBar, SearchBox, Wordmark],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private readonly box = viewChild.required(SearchBox);

  protected readonly profile = PROFILE;
  protected readonly socials = SOCIALS;
  protected readonly sections = TABS.filter((tab) => tab.id !== 'all');
  protected readonly defaultQuery = PROFILE.name.toLowerCase();

  constructor() {
    inject(Title).setTitle(`${PROFILE.name} — ${PROFILE.role}`);
  }

  protected search(): void {
    this.box().submit();
  }

  /** Jumps straight to one of the live projects, picked at random. */
  protected lucky(): void {
    const live = ENTRIES.filter((e) => e.kind === 'project' && e.url);
    const pick = live[Math.floor(Math.random() * live.length)];
    window.open(pick.url, '_blank', 'noopener');
  }
}
