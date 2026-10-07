import { Injectable } from '@angular/core';
import { Entry, Kind } from '../data/models';
import { ABOUT, ENTRIES } from '../data/profile';

export interface SearchOutcome {
  tokens: string[];
  entries: Entry[];
  showAbout: boolean;
}

export interface Segment {
  text: string;
  hit: boolean;
}

interface Doc {
  entry: Entry;
  fields: { words: Set<string>; weight: number }[];
}

// Words that describe the whole site rather than any one entry.
const NOISE = new Set([
  'rajvardhan',
  'raj',
  'patil',
  'patils',
  'the',
  'a',
  'an',
  'of',
  'in',
  'at',
  'for',
  'and',
  'or',
  'is',
  'are',
  'was',
  'who',
  'what',
  'where',
  'how',
  'his',
  'him',
  'he',
  'on',
  'to',
  'with',
  'me',
  'show',
  'all',
  'does',
  'did',
  'has',
  'have',
  'by',
  'from',
  's',
]);

const KIND_WORDS: Record<Kind, string> = {
  about: 'about bio who',
  experience: 'experience work job career role employment position company professional',
  project: 'project built build app product portfolio side shipped',
  research: 'research paper publication',
  education: 'education study studied school academic',
  skills: 'skill stack tech technology tool expertise',
  contact: 'contact reach connect social link',
};

const ABOUT_THRESHOLD = 3;

function words(text: string): string[] {
  const out: string[] = [];
  for (const raw of text.toLowerCase().split(/[^a-z0-9+#.]+/)) {
    const word = raw.replace(/^\.+|\.+$/g, '');
    if (!word) continue;
    out.push(word);
    if (word.includes('.')) out.push(word.replaceAll('.', ''), ...word.split('.'));
  }
  return out;
}

function stem(token: string): string {
  return token.length > 3 && token.endsWith('s') && !token.endsWith('ss')
    ? token.slice(0, -1)
    : token;
}

function toDoc(entry: Entry): Doc {
  const set = (...parts: (string | undefined)[]) => new Set(words(parts.filter(Boolean).join(' ')));
  return {
    entry,
    fields: [
      { words: set(entry.title, entry.source), weight: 5 },
      { words: set(entry.tags?.join(' ')), weight: 4 },
      { words: set(entry.keywords?.join(' '), KIND_WORDS[entry.kind]), weight: 3 },
      {
        words: set(
          entry.summary,
          entry.points?.join(' '),
          entry.roles?.map((r) => r.title).join(' '),
          entry.location,
          entry.period,
          entry.trail.join(' '),
        ),
        weight: 1,
      },
    ],
  };
}

function scoreToken(doc: Doc, token: string): number {
  for (const field of doc.fields) {
    for (const word of field.words) {
      if (word.startsWith(token)) return field.weight;
    }
  }
  return 0;
}

@Injectable({ providedIn: 'root' })
export class SearchService {
  private readonly docs = [ABOUT, ...ENTRIES].map(toDoc);

  search(query: string): SearchOutcome {
    const tokens = [
      ...new Set(
        words(query)
          .filter((w) => !NOISE.has(w))
          .map(stem),
      ),
    ];
    if (!tokens.length) {
      return { tokens, entries: ENTRIES, showAbout: true };
    }

    const scored = this.docs.map((doc) => {
      const scores = tokens.map((token) => scoreToken(doc, token));
      return {
        entry: doc.entry,
        total: scores.reduce((sum, s) => sum + s, 0),
        matchedAll: scores.every((s) => s > 0),
      };
    });

    // Prefer entries that match every term; fall back to any term so a
    // loosely worded query still lands somewhere useful.
    let hits = scored.filter((s) => s.matchedAll);
    if (!hits.length) hits = scored.filter((s) => s.total > 0);
    hits.sort((a, b) => b.total - a.total);

    return {
      tokens,
      entries: hits.map((h) => h.entry).filter((e) => e.kind !== 'about'),
      // The bio only leads the page when the query is about the person,
      // not when a technology happens to appear somewhere in it.
      showAbout: tokens.every((token) => scoreToken(this.docs[0], token) >= ABOUT_THRESHOLD),
    };
  }
}

/** Splits text into plain and matched runs so templates can bold query terms. */
export function highlight(text: string, tokens: string[]): Segment[] {
  if (!tokens.length) return [{ text, hit: false }];
  const escaped = tokens.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const pattern = new RegExp(`(?<![A-Za-z0-9])((?:${escaped.join('|')})[A-Za-z0-9+#]*)`, 'gi');
  const segments: Segment[] = [];
  let last = 0;
  for (const match of text.matchAll(pattern)) {
    const start = match.index;
    if (start > last) segments.push({ text: text.slice(last, start), hit: false });
    segments.push({ text: match[0], hit: true });
    last = start + match[0].length;
  }
  if (last < text.length) segments.push({ text: text.slice(last), hit: false });
  return segments;
}
