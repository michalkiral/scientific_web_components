# Scientific Web Components

A curated library of Lit-based web components tailored for data-heavy and scientific interfaces. Every component focuses on accessibility, responsive design, and configurability, while sharing a consistent design language and utilities.

## Table of Contents

1. [Features](#features)  
2. [Quick Start](#quick-start)  
3. [Available Scripts](#available-scripts)  
4. [Component Catalogue](#component-catalogue)  
5. [Storybook & Docs](#storybook--docs)  
6. [Testing & Quality](#testing--quality)  
7. [Import Conventions](#import-conventions)  
8. [Contributing](#contributing)

## Features

- **Reusable scientific UI primitives** such as sliders, graphs, tables, forms, networks, and buttons.  
- **Accessible by default**: built with keyboard support, ARIA roles, and focus management.  
- **Theme-aware**: components respond to `default`, `dark`, and `scientific` themes.  
- **Data ready**: integrations for Chart.js, Cytoscape.js, CSV streaming, and more.  
- **Storybook-driven docs** for rapid prototyping and documentation.

## Quick Start

### Requirements

- **Node.js** ≥ 20  

### Installation

```bash
git clone https://github.com/Snowskii/scientific_web_components.git
cd scientific_web_components
npm ci
```

### Using a Component

```html
<script type="module">
  import './src/Slider/scientific-slider.js';
</script>

<scientific-slider
  label="Sample"
  min="0"
  max="100"
  value="50"
></scientific-slider>
```

Components are published as ES modules; import paths are relative when consuming the source directly or package-based if published to a registry.

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run build` | Type-check and emit compiled JS. |
| `npm run build:watch` | Incremental rebuild during development. |
| `npm run serve` | Dev server with live reload (Web Dev Server). |
| `npm run serve:prod` | Serve using production mode settings. |
| `npm run lint` | Run ESLint + lit-analyzer. |
| `npm run format` | Format using Prettier. |
| `npm test` | Build then execute unit tests in dev and prod modes. |
| `npm run test:watch` | Watch mode for tests. |
| `npm run storybook` | Launch Storybook at http://localhost:6006. |
| `npm run build-storybook` | Generate static Storybook docs. |
| `npm run docs` | Build API docs (Custom Elements Manifest + Eleventy). |
| `npm run docs:serve` | Preview generated docs locally. |

## Component Catalogue

Each component has detailed Storybook documentation under `src/<Component>/`.

- **scientific-button** – theme-aware actions with async handling and spinner states.  
- **scientific-input** – autocomplete/combobox with option filtering, hinting, and clear button.  
- **scientific-slider** – single-value range input with marks, formatting, and keyboard support.  
- **scientific-table** – sortable, searchable, selectable data table with CSV streaming.  
- **scientific-form** – surface-based form wrapper with async submission flow and messaging.  
- **scientific-graph** – Chart.js wrapper for thematic graphs with async actions and export helpers.  
- **scientific-network** – Cytoscape.js powered network visualization with toolbar modes and metrics.  
- **scientific-toolbar** and other shared utilities live in `src/shared/`.

Refer to the Storybook stories (`*.stories.ts`) for usage patterns and live demos.

## Storybook & Docs
- `npm run build` - Build before using storybook
- `npm run storybook` – Interactive playground and component docs.  
- `npm run docs` – Generates static component documentation using Custom Elements Manifest, Eleventy, and Rollup. Generated files are emitted to the `docs/` directory.  
- To watch and rebuild docs: `npm run docs:gen:watch`.

## Testing & Quality

- **Unit Tests**: Web Test Runner + Playwright (`npm test`).  
- **Snapshots / Interaction Tests**: Storybook Test Runner (`npm run test-storybook`).  
- **Linting**: ESLint 9 & lit-analyzer (`npm run lint`).  
- **Formatting**: Prettier (`npm run format`).  
- **Bundle Inspection**: `npm run analyze` and `npm run checksize` for size checks.

## Import Conventions

To keep bundles predictable and make tree-shaking reliable, prefer deep imports from the `src/shared` submodules instead of using the `shared` barrel. Examples:

- Good: `import { sharedVariables } from '../shared/styles/common-styles.js';`  
- Good: `import { classNames } from '../shared/utils/dom-utils.js';`  
- Bad: `import { sharedVariables, classNames } from '../shared/index.js';`

The previous `src/shared/index.ts` barrel has been removed. An ESLint rule (`no-restricted-imports`) blocks imports from `../shared` and `../shared/index.js` and will surface guidance when violated.

## Contributing

1. Fork the repository.  
2. Create a feature branch: `git checkout -b feature-name`.  
3. Commit your changes: `git commit -am "Add new feature"`.  
4. Push to your fork: `git push origin feature-name`.  
5. Open a pull request describing the change and relevant context.

Please ensure linting and tests pass (`npm run lint && npm test`) before submitting.
