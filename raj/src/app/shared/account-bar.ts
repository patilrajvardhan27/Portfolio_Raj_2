import { ChangeDetectionStrategy, Component, ElementRef, inject, signal } from '@angular/core';
import { ThemeService } from '../core/theme.service';
import { EMAIL, PROFILE, SOCIALS } from '../data/profile';

interface Shortcut {
  label: string;
  url: string;
  mark: string;
  tone: string;
  external: boolean;
}

@Component({
  selector: 'app-account-bar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:pointerdown)': 'onOutsidePointer($event)',
    '(document:keydown.escape)': 'open.set(false)',
  },
  template: `
    <button
      type="button"
      class="icon-button"
      [attr.aria-label]="
        theme.theme() === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
      "
      (click)="theme.toggle()"
    >
      <span class="icon">{{ theme.theme() === 'dark' ? 'light_mode' : 'dark_mode' }}</span>
    </button>

    <div class="menu">
      <button
        type="button"
        class="icon-button"
        aria-label="Links and profiles"
        aria-haspopup="true"
        [attr.aria-expanded]="open()"
        (click)="open.set(!open())"
      >
        <span class="icon">apps</span>
      </button>

      @if (open()) {
        <ul class="menu__panel">
          @for (item of shortcuts; track item.label) {
            <li>
              <a
                class="menu__item"
                [href]="item.url"
                [attr.target]="item.external ? '_blank' : null"
                [attr.rel]="item.external ? 'noopener' : null"
                (click)="open.set(false)"
              >
                <span [class]="'menu__mark menu__mark--' + item.tone">{{ item.mark }}</span>
                <span>{{ item.label }}</span>
              </a>
            </li>
          }
        </ul>
      }
    </div>

    <img class="avatar" [src]="photo" [alt]="name" width="32" height="32" />
  `,
  styles: `
    :host {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .avatar {
      margin-left: 8px;
    }

    .menu {
      position: relative;
    }

    .menu__panel {
      position: absolute;
      top: 46px;
      right: -8px;
      z-index: 30;
      display: grid;
      grid-template-columns: repeat(3, 88px);
      gap: 4px;
      padding: 14px;
      background: var(--surface-raised);
      border: 1px solid var(--border-soft);
      border-radius: 20px;
      box-shadow: var(--shadow-pop);
    }

    .menu__item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      padding: 12px 4px 10px;
      border-radius: 12px;
      font-size: 13px;
      color: var(--text);
      text-align: center;

      &:hover {
        background: var(--hover);
      }
    }

    .menu__mark {
      display: grid;
      place-items: center;
      width: 42px;
      height: 42px;
      border-radius: 50%;
      color: #fff;
      font: 600 15px/1 var(--font-display);

      &--blue {
        background: var(--blue);
      }
      &--red {
        background: var(--red);
      }
      &--green {
        background: var(--green);
      }
      &--yellow {
        background: var(--yellow);
        color: #202124;
      }
      &--ink {
        background: #202124;
        box-shadow: inset 0 0 0 1px rgb(255 255 255 / 25%);
      }
    }
  `,
})
export class AccountBar {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  protected readonly theme = inject(ThemeService);
  protected readonly open = signal(false);
  protected readonly photo = PROFILE.photo;
  protected readonly name = PROFILE.name;

  protected readonly shortcuts: Shortcut[] = [
    { label: 'Résumé', url: PROFILE.resume, mark: 'CV', tone: 'red', external: true },
    { label: 'Email', url: `mailto:${EMAIL}`, mark: '@', tone: 'yellow', external: false },
    ...SOCIALS.map((s, i) => ({
      label: s.label,
      url: s.url,
      mark: s.mark,
      tone: ['ink', 'blue', 'ink'][i] ?? 'blue',
      external: true,
    })),
    {
      label: 'Paper',
      url: 'https://doi.org/10.1063/5.0317878',
      mark: 'DOI',
      tone: 'green',
      external: true,
    },
  ];

  protected onOutsidePointer(event: Event): void {
    if (this.open() && !this.host.nativeElement.contains(event.target as Node)) {
      this.open.set(false);
    }
  }
}
