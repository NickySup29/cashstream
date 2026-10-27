# Insights blog source file template

This is the structure `npm run ingest -- BL-xx` expects in
`Content/Blogs/_Source/`. Two formats are accepted:

- **A `.docx` file** (preferred): write it in Word using real Heading styles
  (Heading 2 for each section, Heading 3 for sub-headings inside a hub-style
  post). It is converted to HTML with `mammoth` (a plain npm package, no
  system install, no pandoc) before parsing.
- **A hand-written `.html` "source copy"** matching the same shape, if you
  are not using Word. See `Content/Blogs/_Source/BL-02_final_copy.html` and
  `BL-03_final_copy.html` for real examples.

If both exist for the same id, the `.docx` is used. If several files of the
same type match (e.g. two `.docx` candidates), the one with `FINAL` in its
name is used and ingest says which.

## Required structure, in order

1. **Page details table.** A two-column table (Item / Value). Recognised
   field names (a few aliases are supported since real drafts vary):
   `H1` (or `H1 and meta title`), `Title tag`, `Meta description`,
   `Primary keyword`, `Secondary phrases`, `Slug`, `Type`, `Author line`,
   `Publish date`, `Schema`, `Target length`. `H1`, `Title tag` and
   `Meta description` may carry a trailing `(NN characters)` note; it is
   stripped automatically. `datePublished`/`dateModified` are always set to
   the real date ingest is run on, never a date typed in this table.
2. The **H1** repeated as its own paragraph or heading, then a **reviewer
   line** paragraph (e.g. "Reviewed by Cash Stream Advisors. Last reviewed:
   ..."). Per CLAUDE.md rule 11, never name an individual here.
3. **The short answer**: a bold-labelled paragraph ("The short answer")
   followed by a one-cell table. This becomes the page's answer box.
4. **Body sections.** Each one starts with either a real Heading (Word style,
   or an `<h2>`/`<h3>` tag) or a paragraph that is entirely bold. Everything
   after it, until the next heading, becomes that section's content:
   paragraphs, bullet or numbered lists, and tables (a table with more than
   one column becomes a comparison block). A plain, non-bold paragraph that
   ends in "?" is also accepted as a heading (several real drafts use
   question-style headings without a real heading style).
   - A section whose heading starts with "Who needs" / "Who should" / "Who
     is" and contains a single bullet list is rendered with check-mark
     styling instead of plain bullets.
   - A **hub-style post** (one post made of many short, numbered Q&A
     sections, like BL-01) does not need a single FAQ landmark: if every
     numbered `<h3>` question is immediately followed by its own bold-led
     answer paragraph, ingest pairs them into the FAQ automatically.
5. **The mid-article CTA**: a paragraph starting with a bold question
   (e.g. "**Application pending or being prepared?**") followed by one or two
   links. Becomes an `inlineCta` block.
6. **FAQ section**: a bold paragraph "Questions people ask about ..." (any
   wording starting "Questions people ask"), then alternating question
   (bold, or a short "?"-ending paragraph) and answer paragraphs.
7. **Closing CTA**: a bold paragraph starting "Talk to a tax advisor...",
   followed by one or two paragraphs (the consult paragraph, then the
   disclaimer paragraph pointing at `/disclaimer/` and
   `/regulatory-compliance`).
8. **Related reading**: a bold "Related reading" paragraph, then a list of
   links.
9. **Official references**: a bold "Official references" paragraph, then a
   list of external links.
10. **Trailing schema** (optional but recommended): a
    `<script type="application/ld+json">` block with your own best guess at
    the schema. Ingest never ships it: it always generates its own schema
    from the content above and prints every difference against yours so you
    can sanity-check it, but the generated version always wins.

Any internal link (to `cashstreamadvisors.com`) that does not resolve to a
real route in `App.tsx`, a real case study id, or a real blog slug is removed
automatically (the surrounding words are kept if they still read fine,
otherwise the sentence is dropped) and listed in the PR description.

## What stops ingest

Ingest writes nothing and prints every problem it found if any of these
appear anywhere in the visible text or the trailing schema block:

- `VERIFY`, `TODO`, `TBD` (any case)
- `CONFIRM` in all capitals specifically (ordinary lowercase "confirm" used
  as a verb in a sentence is fine and is not flagged)
- `lorem ipsum`
- the characters U+27E6 (⟦) or U+27E7 (⟧)
- an em dash (–) or en dash (—) anywhere
- `[DATE]`, `[LOGO_URL]`, `[OG_IMAGE_URL]`, or a `{{...}}` placeholder
- a title tag over 60 characters or a meta description over 160
- no Page details table, no H1, no meta description, or no FAQ items found

Bracketed placeholders for genuinely pending real data (e.g. `[X]+ years`,
`₹[amount]`) are a different thing per CLAUDE.md rule 2: they ship as-is and
are not part of this stop list.

## Lead-capture tool blocks (optional, at most one per post)

Mark a tool with a Heading 2 that starts with `TOOL:` followed by key: value
lines, one per line, until the next heading:

```
TOOL: Date calculator
type: dateCalculator
heading: When should I expect my certificate?
intro: Enter the date you plan to make the payment.
inputLabel: Payment date
offsets: File by (typical 45 days)|45, Plan for the slow case (75 days)|75
disclaimer: General information only; your own timeline can differ.
whatsappMessage: Hi, I used the date calculator. {result}
```

Supported `type` values and their extra keys:

- `dateCalculator`: `inputLabel`, `offsets` (comma-separated
  `label|days` pairs), `disclaimer`.
- `decisionTree`: 2 to 4 `question` lines, each followed by its own
  `options` line (comma-separated `label|nextId` pairs; use `label|END` for
  a leaf) and, for leaves, a `result` line.
- `docChecklist`: one or more `scenario` lines (`label: doc1; doc2; doc3`).
- `quoteStarter`: exactly three `group` lines (`label: option1, option2, ...`)
  for service, country and timeline.

Every `type` also takes `heading`, `intro`, and `whatsappMessage` (use
`{result}` where the reader's answer should be inserted). All result text is
always present in the rendered HTML; only the reveal is interactive. This
syntax has not yet been exercised against a real source file; treat it as a
starting point and tell the person building the pipeline if a real draft
needs a shape it doesn't cover.

## Before drafting: a short questionnaire

Answer these before writing a new post, so ingest never has to guess:

1. What are the real, source-backed timings for this topic (not "in our
   experience" estimates unless that is genuinely the only source)?
2. What is the one authoritative source for each number or deadline you are
   about to state?
3. Which internal pages (service pages, other Insights posts) are actually
   live right now that this post can link to? (Ingest removes links to
   anything not live, but it's faster to only write real ones.)
4. Does this post need a lead-capture tool? If so, which of the four types
   fits, and what are its exact fixed values (offsets, options, documents)?
   Nothing in a tool block may be invented at ingest time.
