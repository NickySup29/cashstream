---
description: Run blog-publish for several posts in parallel git worktrees
argument-hint: BL-04 BL-05 BL-06 ...
---
Publish blogs $ARGUMENTS as a batch, up to 3 at a time.

1. For each id, in batches of at most 3 running in parallel: create a git worktree at
   `../cashstream-worktrees/<id>` on a fresh branch `blog/<id>-<slug>` from the latest `main`
   (`git worktree add ../cashstream-worktrees/<id> -b blog/<id>-<slug> main`), then run the same
   steps as `/blog-publish <id>` (ingest, images:make, check:blog, lint, build, prerender proof
   checks, screenshots) inside that worktree.
2. If one post's checks fail, report it and continue with the others; do not let one failure block
   the rest of the batch.
3. Report a table: id, slug, status (passed / stopped with N problems / failed which check), and
   its own branch name, for every post in the batch.
4. Do not push or open any PR yet. Wait for me to review the per-post reports.
5. Only when I explicitly ask to combine them: for the posts I select, cherry-pick each one's
   content/registry/image commits onto a single new branch off latest `main`. Resolve
   `src/content/blogs/index.ts` conflicts by keeping every import and array entry from every
   selected post (it is always a one-import-plus-one-array-entry conflict, never a real logic
   conflict). Push that combined branch and open one PR with all of their outlines, link removals,
   schema diffs, and checks tables stacked under per-post headings.
6. Clean up the worktrees (`git worktree remove`) for any post whose branch was merged into the
   combined branch, after I confirm. Leave worktrees for anything not yet merged.
7. Never push to main, never merge.
