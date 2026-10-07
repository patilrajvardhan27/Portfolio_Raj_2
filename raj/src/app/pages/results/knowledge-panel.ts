import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EMAIL, FACTS, HIGHLIGHTS, PROFILE, SOCIALS } from '../../data/profile';

@Component({
  selector: 'app-knowledge-panel',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <aside class="panel" aria-label="About Rajvardhan Patil">
      <div class="panel__head">
        <img
          class="panel__photo"
          [src]="profile.photo"
          [alt]="profile.name"
          width="112"
          height="112"
        />
        <div>
          <h2 class="panel__name">{{ profile.name }}</h2>
          <p class="panel__role">{{ profile.role }} · {{ profile.pronouns }}</p>
          <p class="panel__place"><span class="icon">location_on</span>{{ profile.location }}</p>
        </div>
      </div>

      <div class="panel__actions">
        <a
          class="panel__action panel__action--primary"
          [href]="profile.resume"
          target="_blank"
          rel="noopener"
        >
          <span class="icon">description</span>Résumé
        </a>
        <a class="panel__action" [href]="'mailto:' + email"><span class="icon">mail</span>Email</a>
        @for (social of socials; track social.label) {
          <a class="panel__action" [href]="social.url" target="_blank" rel="noopener">{{
            social.label
          }}</a>
        }
      </div>

      <p class="panel__bio">{{ profile.bio }}</p>

      <dl class="panel__stats">
        @for (stat of highlights; track stat.label) {
          <div>
            <dt>{{ stat.value }}</dt>
            <dd>{{ stat.label }}</dd>
          </div>
        }
      </dl>

      <dl class="panel__facts">
        @for (fact of facts; track fact.label) {
          <div>
            <dt>{{ fact.label }}:</dt>
            <dd>
              @if (fact.url) {
                <a [href]="fact.url" target="_blank" rel="noopener">{{ fact.value }}</a>
              } @else {
                {{ fact.value }}
              }
            </dd>
          </div>
        }
        <div>
          <dt>Email:</dt>
          <dd>
            <a [href]="'mailto:' + email">{{ email }}</a>
          </dd>
        </div>
      </dl>

      <div class="panel__profiles">
        <h3>Profiles</h3>
        <ul>
          @for (social of socials; track social.label) {
            <li>
              <a [href]="social.url" target="_blank" rel="noopener">
                <span class="panel__mark">{{ social.mark }}</span>
                <span class="panel__profile-name">{{ social.label }}</span>
                <span class="panel__handle">{{ social.handle }}</span>
              </a>
            </li>
          }
        </ul>
      </div>
    </aside>
  `,
  styleUrl: './knowledge-panel.scss',
})
export class KnowledgePanel {
  protected readonly profile = PROFILE;
  protected readonly email = EMAIL;
  protected readonly facts = FACTS;
  protected readonly highlights = HIGHLIGHTS;
  protected readonly socials = SOCIALS;
}
