# Graph Report - portfolio  (2026-10-03)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 378 nodes · 760 edges · 20 communities (16 shown, 4 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 3 edges (avg confidence: 0.85)
- Token cost: 19,534 input · 1,681 output

## Graph Freshness
- Built from commit: `c80e9b92`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Post Actions & Admin
- Cert & Education Display
- Certification Terminal
- Education Records
- App Layout & Profile
- Home Page Sections
- Mind Map Graph
- Terminal Handler
- TypeScript Config
- Skills Terminal
- Package Dependencies
- Build & Deploy Scripts
- Dev Dependencies
- Runtime Dependencies
- Cloudflare Env Types
- ESLint Config
- Next.js Config
- Markdown Rendering
- Node Engine
- PostCSS Config

## God Nodes (most connected - your core abstractions)
1. `next` - 17 edges
2. `compilerOptions` - 16 edges
3. `scripts` - 14 edges
4. `SectionHeading()` - 13 edges
5. `react` - 12 edges
6. `vitest` - 11 edges
7. `getDb()` - 10 edges
8. `MindMapGraph()` - 10 edges
9. `DokictlTerminal()` - 10 edges
10. `profile` - 10 edges

## Surprising Connections (you probably didn't know these)
- `generateMetadata()` --calls--> `getPostById()`  [EXTRACTED]
  app/admin/posts/[id]/edit/page.tsx → lib/posts.ts
- `NewPostPage()` --calls--> `PostEditor()`  [EXTRACTED]
  app/admin/posts/new/page.tsx → components/PostEditor.tsx
- `generateMetadata()` --calls--> `getPublishedPostBySlug()`  [EXTRACTED]
  app/logs/[slug]/page.tsx → lib/posts.ts
- `handleTitleChange()` --calls--> `slugify()`  [EXTRACTED]
  components/PostEditor.tsx → lib/post-utils.ts
- `Home()` --calls--> `HomeOverview()`  [EXTRACTED]
  app/page.tsx → components/home/HomeOverview.tsx

## Import Cycles
- None detected.

## Communities (20 total, 4 thin omitted)

### Community 0 - "Post Actions & Admin"
Cohesion: 0.08
Nodes (49): createPostAction(), dbErrorMessage(), deletePostAction(), intentToStatus(), noopAction(), readPostFields(), updatePostAction(), AdminPage() (+41 more)

### Community 1 - "Cert & Education Display"
Cohesion: 0.09
Nodes (24): ClusterStatus(), ClusterStatusProps, formatSyncTime(), STATUS_COLOR, HomeOverview(), OverviewClusterPanel(), lineLength(), renderCompletedLine() (+16 more)

### Community 2 - "Certification Terminal"
Cohesion: 0.12
Nodes (27): CertsTerminal(), handleListKeyDown(), moveFocus(), CertificationDetail, certificationDetails, CertProvider, CertTier, EX280_LEARNED (+19 more)

### Community 3 - "Education Records"
Cohesion: 0.14
Nodes (22): EducationRecords(), CATEGORY_STYLE, EducationTerminal(), FilterPill(), HomeEducation(), CURRICULUM_CATEGORIES, CURRICULUM_CATEGORY_LABELS, curriculumSemesterFilters() (+14 more)

### Community 4 - "App Layout & Profile"
Cohesion: 0.10
Nodes (19): dynamic, ContactPage(), metadata, geistMono, geistSans, metadata, RootLayout(), ContactServices() (+11 more)

### Community 5 - "Home Page Sections"
Cohesion: 0.16
Nodes (17): Home(), ExperienceNode(), HomeCerts(), HomeExperience(), HomeProjects(), HomeSkills(), HASH_TO_TAB, HomeTab (+9 more)

### Community 6 - "Mind Map Graph"
Cohesion: 0.13
Nodes (20): defaultTransform(), GROUP_STYLE, loadSavedPositions(), MindMapGraph(), MindMapGraphProps, positionsFromGraph(), ViewTransform, addNode() (+12 more)

### Community 7 - "Terminal Handler"
Cohesion: 0.21
Nodes (13): metadata, TerminalPage(), DokictlTerminal(), clearTerminal(), clearTerminalSession(), isTerminalLine(), loadTerminalSession(), saveTerminalSession() (+5 more)

### Community 8 - "TypeScript Config"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 9 - "Skills Terminal"
Cohesion: 0.25
Nodes (13): CATEGORY_SHORT, CategoryPill(), SkillsTerminal(), ALIASES, expands(), filterSkills(), IndexedSkill, indexedSkills (+5 more)

### Community 10 - "Package Dependencies"
Cohesion: 0.13
Nodes (14): name, packageManager, private, version, @cloudflare/workers-types, esbuild, react-dom, tailwindcss (+6 more)

### Community 11 - "Build & Deploy Scripts"
Cohesion: 0.14
Nodes (14): scripts, build, cf:build, cf-typegen, cf-typegen:check, d1:migrate:local, d1:migrate:remote, deploy (+6 more)

### Community 12 - "Dev Dependencies"
Cohesion: 0.15
Nodes (13): devDependencies, @cloudflare/workers-types, esbuild, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, @types/node (+5 more)

### Community 13 - "Runtime Dependencies"
Cohesion: 0.25
Nodes (8): dependencies, framer-motion, next, @opennextjs/cloudflare, react, react-dom, react-markdown, remark-gfm

### Community 14 - "Cloudflare Env Types"
Cohesion: 0.36
Nodes (7): __BaseEnv_CloudflareEnv, Cloudflare, CloudflareEnv, Env, NodeJS, ProcessEnv, StringifyValues

### Community 15 - "ESLint Config"
Cohesion: 0.50
Nodes (3): eslintConfig, eslint, eslint-config-next

## Knowledge Gaps
- **119 isolated node(s):** `ActionState`, `PostEditorProps`, `PostRow`, `ClusterStatusProps`, `ScriptLine` (+114 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 138 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `App Layout & Profile` to `Post Actions & Admin`, `Cert & Education Display`, `Home Page Sections`, `Mind Map Graph`, `Terminal Handler`, `Skills Terminal`, `Package Dependencies`, `Next.js Config`?**
  _High betweenness centrality (0.254) - this node is a cross-community bridge._
- **Why does `react` connect `Terminal Handler` to `Post Actions & Admin`, `Cert & Education Display`, `Certification Terminal`, `Education Records`, `Home Page Sections`, `Mind Map Graph`, `Skills Terminal`, `Package Dependencies`?**
  _High betweenness centrality (0.202) - this node is a cross-community bridge._
- **Why does `vitest` connect `Mind Map Graph` to `Post Actions & Admin`, `Cert & Education Display`, `Certification Terminal`, `Education Records`, `Terminal Handler`, `Skills Terminal`, `Package Dependencies`?**
  _High betweenness centrality (0.077) - this node is a cross-community bridge._
- **What connects `ActionState`, `PostEditorProps`, `PostRow` to the rest of the system?**
  _119 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Post Actions & Admin` be split into smaller, more focused modules?**
  _Cohesion score 0.0763888888888889 - nodes in this community are weakly interconnected._
- **Should `Cert & Education Display` be split into smaller, more focused modules?**
  _Cohesion score 0.09103840682788052 - nodes in this community are weakly interconnected._
- **Should `Certification Terminal` be split into smaller, more focused modules?**
  _Cohesion score 0.11764705882352941 - nodes in this community are weakly interconnected._