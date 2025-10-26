import {
  sampleNetworkData,
  proteinInteractionData,
  createLargeNetworkData,
} from './scientific-network.stories.data.js';
import {html} from 'lit';
import type {Meta, StoryObj} from '@storybook/web-components-vite';
import './scientific-network.js';
import type {ScientificNetwork} from './scientific-network.js';
import {SCIENTIFIC_THEMES} from '../shared/constants/themes.js';

const meta: Meta<ScientificNetwork> = {
   title: 'Scientific/Network',
  component: 'scientific-network',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# Scientific Network

An **interactive**, **exportable** Cytoscape.js surface for visualising complex scientific networks with analysis, editing tools, and design-system theming.

---

## Props

- \`theme\` - Applies design-system theming tokens (\`default\`, \`dark\`, \`scientific\`)
- \`title\` / \`subtitle\` - Header text rendered by the surface base component
- \`showToolbar\` - Inherited toggle for rendering the toolbar (default: true)
- \`isLoading\` / \`errorMessage\` / \`successMessage\` - Standard surface-state messaging controls
- \`data\` - Graph data (\`{nodes, edges}\`) used to initialise Cytoscape
- \`directed\` - Renders edges with directionality, updates metrics, and removes self-loops when toggled off
- \`interactive\` - Reserved flag (current behaviour is governed by \`controls\`)
- \`showInfo\` - Displays the floating info panel with counts and selections
- \`showMetrics\` - Extends the info panel with density, degree, and component metrics
- \`controls\` - Object used to enable or disable tooling (see defaults below)
- \`onNodeClick\` - Optional callback invoked after a node is selected
- \`onEdgeClick\` - Optional callback invoked after an edge is selected
- \`onExport\` - Optional callback that overrides the built-in export handler

Default control configuration:
\\\`\\\`\\\`ts
controls = {
  enableZoom: true,
  enablePan: true,
  enableSelection: true,
  showTooltips: true,
  enableNodeCreation: false,
  enableEdgeCreation: false,
  enableRenaming: false,
  enableRemoval: false,
};
\\\`\\\`\\\`

## Events

- \`node-selected\` - detail: {node, cytoscapeEvent}; dispatched on node tap
- \`node-added\` / \`node-removed\` / \`node-renamed\` - lifecycle events with detail describing the element change
- \`edge-selected\` - detail: {edge, cytoscapeEvent}
- \`edge-added\` / \`edge-removed\` / \`edge-renamed\` - emitted when edges are created, deleted, or renamed (self-loop removal includes \`reason\`)
- \`canvas-clicked\` - detail: {position}; fired when the background is clicked
- \`network-zoom\` - detail: {zoomLevel}; emitted whenever Cytoscape zooms
- \`network-direction-changed\` - detail: {directed}; emitted when the directed toggle changes
- \`network-updated\` - detail: {action, elementType, elementId}; emitted for removal mutations
- \`network-export\` - detail: {format, title}; emitted after export (built-in or custom) completes
- \`keyboard-shortcut\` - detail: {key, action, description}; fired for every recognised shortcut
- \`shortcut-createNode\` / \`shortcut-createEdge\` / \`shortcut-toggleRename\` / \`shortcut-toggleRemoval\` / \`shortcut-fitToScreen\` / \`shortcut-zoomIn\` / \`shortcut-zoomOut\` / \`shortcut-resetZoom\` - emitted via the shortcuts controller with detail {key, originalEvent}

## Basic Usage

\\\`\\\`\\\`html
<scientific-network
  title="Protein Interaction Network"
  .data="\\\${networkData}"
  .controls="\\\${{ enableNodeCreation: true, enableEdgeCreation: true }}"
  showInfo
  showMetrics
></scientific-network>
\\\`\\\`\\\`

## Data Model

\\\`\\\`\\\`ts
interface NetworkNode {
  id: string;
  label?: string;
  data?: Record<string, unknown>;
  position?: {x: number; y: number};
  classes?: string;
  style?: Record<string, unknown>;
}

interface NetworkEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
  data?: Record<string, unknown>;
  classes?: string;
  style?: Record<string, unknown>;
}

interface NetworkData {
  nodes: NetworkNode[];
  edges: NetworkEdge[];
}
\\\`\\\`\\\`

## Features

- **Toolbar & Shortcuts**: Scientific toolbar controls for directed/undirected mode, creation modes, zoom, and exports; keyboard shortcuts register via \`NetworkShortcutsController\` (keys '1'-'4', '+' and '-')
- **Editing Modes**: Optional node/edge creation, rename overlays, and guarded removals (double-click within ~3s) with automatic Cytoscape updates
- **Metrics Overlay**: \`showInfo\` surfaces counts, selections, and (when \`showMetrics\`) density, average degree, and component metrics
- **Export Pipeline**: PNG/JPG/PDF/JSON export through \`createExportHandler\` or a custom \`onExport\` callback; programmatic helpers \`getDataURL()\` and \`getExportData()\`
- **Programmatic Access**: \`getCanvasElement()\` exposes the underlying \`<canvas>\` for integrations/testing
- **Theme Integration**: Applies palette-aware node/edge styling and updates layouts when \`theme\` or \`directed\` changes

## Accessibility Features

- **Surface Messaging**: Loading, error, and success overlays inherit accessible roles from \`ScientificSurfaceBase\`
- **Keyboard Support**: Toolbar buttons, dropdowns, and shortcuts mirror their visual controls for keyboard users
- **Selection Feedback**: Info panel mirrors selection counts; highlighted neighbours improve visual focus
- **Shortcut Announcements**: \`keyboard-shortcut\` events can be surfaced to assistive tooling for discoverability

## Styling

Use CSS variables to customise layout and overlays. Common overrides:

\\\`\\\`\\\`css
scientific-network {
  --network-width: 100%;
  --network-height: 480px;
  --network-min-height: 360px;
  --network-container-min-height: 420px;
  --network-canvas-min-height: 360px;
}

scientific-network .network-info {
  /* inherits scientific tokens but can be themed */
  box-shadow: var(--scientific-shadow-lg);
}
\\\`\\\`\\\`
        `,

      },
    },
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Network title displayed in the header',
    },
    subtitle: {
      control: 'text',
      description: 'Optional subtitle for additional context',
    },
    data: {
      control: 'object',
      description: 'Network data with nodes and edges',
    },
    directed: {
      control: 'boolean',
      description: 'Whether the network shows directed edges with arrows',
    },
    theme: {
      control: 'select',
      options: SCIENTIFIC_THEMES,
      description: 'Visual theme for the network',
    },
    interactive: {
      control: 'boolean',
      description: 'Whether the network responds to user interactions',
    },
    showToolbar: {
      control: 'boolean',
      description: 'Whether to show the toolbar with controls',
    },
    showInfo: {
      control: 'boolean',
      description: 'Whether to show the info panel with basic metrics',
    },
    showMetrics: {
      control: 'boolean',
      description: 'Whether to show detailed network analytics',
    },
    isLoading: {
      control: 'boolean',
      description: 'Whether to show loading overlay',
    },
    errorMessage: {
      control: 'text',
      description: 'Error message to display',
    },
    enableZoom: {
      control: 'boolean',
      description: 'Whether zoom functionality is enabled',
    },
    enablePan: {
      control: 'boolean',
      description: 'Whether pan functionality is enabled',
    },
    enableSelection: {
      control: 'boolean',
      description: 'Whether node/edge selection is enabled',
    },
    showTooltips: {
      control: 'boolean',
      description: 'Whether to show tooltips on hover',
    },
    enableNodeCreation: {
      control: 'boolean',
      description: 'Whether to enable interactive node creation',
    },
    enableEdgeCreation: {
      control: 'boolean',
      description: 'Whether to enable interactive edge creation',
    },
    enableRenaming: {
      control: 'boolean',
      description: 'Whether to enable renaming of nodes and edges',
    },
    enableRemoval: {
      control: 'boolean',
      description: 'Whether to enable removal of nodes and edges',
    },
  },
};

export default meta;
type Story = StoryObj<ScientificNetwork>;

export const Default: Story = {
  args: {
    title: 'Sample Network',
    data: sampleNetworkData,
    interactive: true,
    showToolbar: true,
    theme: 'default',
  },
  render: (args) => html`
    <div
      style="
        width: 1200px;
        padding-top: 24px;
      "
    >
      <scientific-network
        title=${args.title}
        .data=${args.data}
        theme=${args.theme}
        ?interactive=${args.interactive}
        ?showToolbar=${args.showToolbar}
      ></scientific-network>
    </div>
  `,
};

export const ProteinInteraction: Story = {
  args: {
    title: 'Protein Interaction Network',
    subtitle: 'p53 pathway regulation',
    data: proteinInteractionData,
    theme: 'scientific',
    directed: true,
    interactive: true,
    showToolbar: true,
    showMetrics: true,
  },
};

export const DirectedNetwork: Story = {
  args: {
    title: 'Directed Network',
    data: sampleNetworkData,
    directed: true,
    theme: 'default',
    interactive: true,
    showToolbar: true,
  },
};

export const LargeNetwork: Story = {
  args: {
    title: 'Large Network Visualization',
    subtitle: 'Performance demonstration with 20 nodes',
    data: createLargeNetworkData(),
    theme: 'scientific',
    interactive: true,
    showToolbar: true,
    showMetrics: true,
  },
};

export const LoadingState: Story = {
  args: {
    title: 'Loading Network',
    data: sampleNetworkData,
    isLoading: true,
    theme: 'default',
  },
};

export const ErrorState: Story = {
  args: {
    title: 'Network Error',
    data: sampleNetworkData,
    errorMessage: 'Failed to load network data. Please try again.',
    theme: 'default',
  },
};

export const WithEventHandlers: Story = {
  args: {
    title: 'Interactive Network with Events',
    data: sampleNetworkData,
    interactive: true,
    showToolbar: true,
    theme: 'scientific',
    onNodeClick: (node: {
      id: string;
      label?: string;
      data?: Record<string, unknown>;
    }) => {
      console.log('Node clicked:', node);
    },
    onEdgeClick: (edge: {
      id: string;
      source: string;
      target: string;
      label?: string;
      data?: Record<string, unknown>;
    }) => {
      console.log('Edge clicked:', edge);
    },
  },
  render: (args) => html`
    <scientific-network
      title=${args.title}
      subtitle=${args.subtitle}
      .data=${args.data}
      ?directed=${args.directed}
      theme=${args.theme}
      ?interactive=${args.interactive}
      ?showToolbar=${args.showToolbar}
      ?showInfo=${args.showInfo}
      ?showMetrics=${args.showMetrics}
      ?isLoading=${args.isLoading}
      errorMessage=${args.errorMessage}
      .controls=${{
        enableZoom: args.enableZoom,
        enablePan: args.enablePan,
        enableSelection: args.enableSelection,
        showTooltips: args.showTooltips,
        enableNodeCreation: args.enableNodeCreation,
        enableEdgeCreation: args.enableEdgeCreation,
        enableRenaming: args.enableRenaming,
        enableRemoval: args.enableRemoval,
      }}
      .onNodeClick=${args.onNodeClick}
      .onEdgeClick=${args.onEdgeClick}
      @nodeClick=${(e: CustomEvent) => {
        console.log('Node clicked event:', e.detail);
      }}
      @edgeClick=${(e: CustomEvent) => {
        console.log('Edge clicked event:', e.detail);
      }}
    ></scientific-network>
  `,
};

export const ThemeComparison: Story = {
  render: () => html`
    <div
      style="display: grid; grid-template-columns: 1fr 1fr; gap: 50px; row-gap: 325px; width: 100%; padding: 20px;"
    >
      <div style="min-width: 0;">
        <h3 style="margin: 0 0 15px 0; font-size: 16px;">Default Theme</h3>
        <scientific-network
          title="Default Theme"
          .data=${sampleNetworkData}
          theme="default"
          showToolbar
          showInfo
          style="
            height: 300px; 
            width: 100%;
            --network-container-min-height: 300px; 
            --network-canvas-min-height: 250px;
          "
        ></scientific-network>
      </div>
      <div style="min-width: 0;">
        <h3 style="margin: 0 0 15px 0; font-size: 16px;">Scientific Theme</h3>
        <scientific-network
          title="Scientific Theme"
          .data=${sampleNetworkData}
          theme="scientific"
          showToolbar
          showInfo
          style="
            height: 300px; 
            width: 100%;
            --network-container-min-height: 300px; 
            --network-canvas-min-height: 250px;
          "
        ></scientific-network>
      </div>
      <div style="min-width: 0;">
        <h3 style="margin: 0 0 15px 0; font-size: 16px;">Dark Theme</h3>
        <scientific-network
          title="Dark Theme"
          .data=${sampleNetworkData}
          theme="dark"
          showToolbar
          showInfo
          style="
            height: 300px; 
            width: 100%;
            --network-container-min-height: 300px; 
            --network-canvas-min-height: 250px;
          "
        ></scientific-network>
      </div>
    </div>
  `,
};

export const InteractiveNodeCreation: Story = {
  args: {
    title: 'Interactive Node & Edge Creation',
    subtitle: 'Use keyboard shortcuts: 1 for nodes, 2 for edges',
    data: {
      nodes: [{id: 'start', label: 'Start Node', data: {type: 'initial'}}],
      edges: [],
    },
    interactive: true,
    showToolbar: true,
    enableNodeCreation: true,
    enableEdgeCreation: true,
    enableRenaming: true,
    enableRemoval: true,
    theme: 'scientific',
  },
  render: (args) => html`
    <scientific-network
      title=${args.title}
      subtitle=${args.subtitle}
      .data=${args.data}
      theme=${args.theme}
      ?interactive=${args.interactive}
      ?showToolbar=${args.showToolbar}
      .controls=${{
        enableZoom: true,
        enablePan: true,
        enableSelection: true,
        showTooltips: true,
        enableNodeCreation: args.enableNodeCreation,
        enableEdgeCreation: args.enableEdgeCreation,
        enableRenaming: args.enableRenaming,
        enableRemoval: args.enableRemoval,
      }}
      style="height: 500px;"
    ></scientific-network>
  `,
};
