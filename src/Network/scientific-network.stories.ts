import {html} from 'lit';
import type {Meta, StoryObj} from '@storybook/web-components-vite';
import './scientific-network.js';
import type {ScientificNetwork, NetworkData} from './scientific-network.js';

const sampleNetworkData: NetworkData = {
  nodes: [
    {id: 'node1', label: 'Protein A', data: {type: 'protein', mass: 25000}},
    {id: 'node2', label: 'Protein B', data: {type: 'protein', mass: 30000}},
    {
      id: 'node3',
      label: 'Compound X',
      data: {type: 'compound', formula: 'C6H12O6'},
    },
    {id: 'node4', label: 'Gene Y', data: {type: 'gene', chromosome: 'chr1'}},
    {
      id: 'node5',
      label: 'Metabolite Z',
      data: {type: 'metabolite', mw: 180.16},
    },
    {id: 'node6', label: 'Enzyme E', data: {type: 'enzyme', ec: '1.1.1.1'}},
  ],
  edges: [
    {id: 'edge1', source: 'node1', target: 'node2', label: 'interacts'},
    {id: 'edge2', source: 'node2', target: 'node3', label: 'catalyzes'},
    {id: 'edge3', source: 'node3', target: 'node4', label: 'regulates'},
    {id: 'edge4', source: 'node4', target: 'node5', label: 'produces'},
    {id: 'edge5', source: 'node5', target: 'node6', label: 'inhibits'},
    {id: 'edge6', source: 'node6', target: 'node1', label: 'phosphorylates'},
  ],
};

const largeNetworkData: NetworkData = {
  nodes: Array.from({length: 20}, (_, i) => ({
    id: `node${i + 1}`,
    label: `Node ${i + 1}`,
    data: {type: i % 4 === 0 ? 'hub' : 'regular', importance: Math.random()},
  })),
  edges: Array.from({length: 35}, (_, i) => {
    const source = Math.floor(Math.random() * 20) + 1;
    let target = Math.floor(Math.random() * 20) + 1;
    while (target === source) {
      target = Math.floor(Math.random() * 20) + 1;
    }
    return {
      id: `edge${i + 1}`,
      source: `node${source}`,
      target: `node${target}`,
      data: {weight: Math.random()},
    };
  }),
};

const molecularNetworkData: NetworkData = {
  nodes: [
    {
      id: 'glucose',
      label: 'Glucose',
      data: {formula: 'C6H12O6', type: 'sugar'},
    },
    {
      id: 'pyruvate',
      label: 'Pyruvate',
      data: {formula: 'C3H4O3', type: 'organic_acid'},
    },
    {
      id: 'acetyl_coa',
      label: 'Acetyl-CoA',
      data: {formula: 'C23H38N7O17P3S', type: 'coenzyme'},
    },
    {
      id: 'citrate',
      label: 'Citrate',
      data: {formula: 'C6H8O7', type: 'organic_acid'},
    },
    {
      id: 'atp',
      label: 'ATP',
      data: {formula: 'C10H16N5O13P3', type: 'nucleotide'},
    },
    {
      id: 'nadh',
      label: 'NADH',
      data: {formula: 'C21H29N7O14P2', type: 'coenzyme'},
    },
    {id: 'co2', label: 'CO2', data: {formula: 'CO2', type: 'gas'}},
    {id: 'h2o', label: 'H2O', data: {formula: 'H2O', type: 'solvent'}},
  ],
  edges: [
    {
      id: 'glycolysis1',
      source: 'glucose',
      target: 'pyruvate',
      label: 'glycolysis',
      data: {pathway: 'glycolysis'},
    },
    {
      id: 'pyruvate_oxidation',
      source: 'pyruvate',
      target: 'acetyl_coa',
      label: 'pyruvate oxidation',
      data: {pathway: 'citric_acid'},
    },
    {
      id: 'citric1',
      source: 'acetyl_coa',
      target: 'citrate',
      label: 'citrate synthase',
      data: {pathway: 'citric_acid'},
    },
    {
      id: 'citric2',
      source: 'citrate',
      target: 'co2',
      label: 'decarboxylation',
      data: {pathway: 'citric_acid'},
    },
    {
      id: 'atp_production',
      source: 'citrate',
      target: 'atp',
      label: 'substrate-level phosphorylation',
      data: {pathway: 'citric_acid'},
    },
    {
      id: 'nadh_production',
      source: 'citrate',
      target: 'nadh',
      label: 'reduction',
      data: {pathway: 'citric_acid'},
    },
    {
      id: 'water_consumption',
      source: 'h2o',
      target: 'citrate',
      label: 'hydration',
      data: {pathway: 'citric_acid'},
    },
  ],
};

const meta: Meta = {
  title: 'Scientific/Network',
  component: 'scientific-network',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# Scientific Network

A **powerful**, **interactive** network visualization component built with Cytoscape.js for scientific data analysis and exploration.

---

## Props

- \`title\` — Network title text
- \`subtitle\` — Network subtitle/description text
- \`data\` — Network data object with nodes and edges arrays
- \`directed\` — Whether the network is directed (shows arrows on edges)
- \`layout\` — Layout algorithm: cose, circle, concentric, grid, breadthfirst, random
- \`theme\` — Visual theme: default, dark, scientific, minimal
- \`interactive\` — Enables/disables user interaction
- \`showToolbar\` — Shows/hides toolbar with controls
- \`showInfo\` — Shows/hides info panel with network metrics
- \`showMetrics\` — Shows/hides detailed network metrics
- \`isLoading\` — Shows loading overlay
- \`errorMessage\` — Error message to display
- \`enableZoom\` — Enables zoom functionality
- \`enablePan\` — Enables pan functionality
- \`enableSelection\` — Enables node/edge selection
- \`showTooltips\` — Shows tooltips on hover
- \`layoutOptions\` — Custom layout options object
- \`onNodeClick\` — Node click handler function
- \`onEdgeClick\` — Edge click handler function
- \`onExport\` — Export handler function

## Events

- \`node-selected\` — Fired when a node is selected
- \`edge-selected\` — Fired when an edge is selected
- \`canvas-clicked\` — Fired when canvas background is clicked
- \`network-zoom\` — Fired when zoom level changes
- \`network-export\` — Fired when network is exported

## Basic Usage

\`\`\`html
<scientific-network
  title="Protein Interaction Network"
  subtitle="Molecular interactions in cellular pathways"
  .data="\${networkData}"
  layout="cose"
  showToolbar
  showInfo
  enableZoom
  enablePan
></scientific-network>
\`\`\`

**Advanced Usage with Event Handlers:**
\`\`\`html
<scientific-network
  title="Metabolic Pathways"
  .data="\${pathwayData}"
  directed
  layout="hierarchical"
  theme="scientific"
  showMetrics
  showTooltips
  @node-selected="\${handleNodeSelection}"
  @network-export="\${handleExport}"
></scientific-network>
\`\`\`

## Data Format

The network data should follow this structure:

\`\`\`typescript
interface NetworkData {
  nodes: NetworkNode[];
  edges: NetworkEdge[];
}

interface NetworkNode {
  id: string;                    // Unique identifier
  label?: string;               // Display label
  data?: Record<string, unknown>; // Additional data
  position?: {x: number; y: number}; // Fixed position
  classes?: string;             // CSS classes
  style?: Record<string, unknown>; // Custom styling
}

interface NetworkEdge {
  id: string;                    // Unique identifier
  source: string;               // Source node ID
  target: string;               // Target node ID
  label?: string;               // Display label
  data?: Record<string, unknown>; // Additional data
  classes?: string;             // CSS classes
  style?: Record<string, unknown>; // Custom styling
}
\`\`\`

## Features

- **Multiple Layout Algorithms**: Force-directed, hierarchical, circular, and more
- **Interactive Controls**: Zoom, pan, node selection, and neighbor highlighting
- **Analytics Integration**: Built-in network metrics (centrality, density, components)
- **Export Capabilities**: PNG and JSON export functionality
- **Responsive Design**: Adapts to container size changes
- **Real-time Updates**: Dynamic data updates with smooth transitions
- **Accessibility**: Keyboard navigation and screen reader support
- **Customizable Styling**: Extensive CSS variable system and theme support

## Layout Algorithms

- **Force (cose)**: Physics-based force-directed layout for natural clustering
- **Circle**: Arranges nodes in a circle, good for small networks
- **Concentric**: Concentric circles based on node importance
- **Grid**: Regular grid layout for systematic arrangement
- **Hierarchy (breadthfirst)**: Tree-like hierarchical structure
- **Random**: Random positioning for initial exploration

## Analytics Features

- **Degree Centrality**: Identifies most connected nodes
- **Betweenness Centrality**: Finds nodes that bridge different parts
- **Network Density**: Measures how interconnected the network is
- **Connected Components**: Identifies separate network clusters
- **Real-time Metrics**: Updates automatically as network changes

## Accessibility Features

- **ARIA Labels**: Descriptive labels for network components and controls
- **Keyboard Navigation**: Full keyboard support for toolbar and interactions
- **Screen Reader Support**: Network metrics accessible through ARIA descriptions
- **Focus Management**: Proper focus handling for interactive elements
- **Color Contrast**: Meets WCAG guidelines with customizable themes
- **Loading States**: Accessible loading indicators with aria-busy attributes
- **Error Handling**: Screen reader accessible error messages

## Styling

Use CSS variables to customize appearance. Here are the most commonly used variables:

**Basic Styling:**
    scientific-network {
      --network-width: 100%;
      --network-height: 500px;
      --network-bg-color: #ffffff;
      --network-border: 1px solid #e5e7eb;
      --network-border-radius: 8px;
    }

**Complete Variable List:**

All CSS custom properties available for customization:

    scientific-network {
      /* Container & Layout */
      --network-width: 100%;
      --network-height: 400px;
      --network-min-height: 300px;
      --network-bg-color: #ffffff;
      --network-border: 1px solid #e5e7eb;
      --network-border-radius: 8px;
      
      /* Toolbar */
      --network-toolbar-bg: rgba(255, 255, 255, 0.95);
      --network-toolbar-border: 1px solid #e5e7eb;
      --network-toolbar-border-radius: 8px;
      --network-toolbar-padding: 8px;
      --network-toolbar-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      --network-button-bg: #ffffff;
      --network-button-color: #374151;
      --network-button-border: 1px solid #d1d5db;
      --network-button-hover-bg: #f3f4f6;
      
      /* Info Panel */
      --network-info-bg: rgba(255, 255, 255, 0.95);
      --network-info-border: 1px solid #e5e7eb;
      --network-info-border-radius: 8px;
      --network-info-padding: 12px;
      --network-info-color: #374151;
      --network-info-font-size: 12px;
      
      /* Tooltips */
      --network-tooltip-bg: rgba(0, 0, 0, 0.8);
      --network-tooltip-color: white;
      --network-tooltip-padding: 8px 12px;
      --network-tooltip-border-radius: 4px;
      --network-tooltip-font-size: 12px;
      
      /* Loading */
      --network-loading-color: #6b7280;
      --scientific-primary-color: #007bff;
    }

**Theme Variables:**

The component supports multiple themes through CSS custom properties:

- **Default Theme**: Clean, professional appearance
- **Dark Theme**: Dark background with light text
- **Scientific Theme**: Enhanced contrast and borders
- **Minimal Theme**: Reduced borders and simplified styling
`,
      },
    },
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'The title of the network visualization',
    },
    subtitle: {
      control: 'text',
      description: 'The subtitle of the network visualization',
    },
    data: {
      control: 'object',
      description: 'Network data object containing nodes and edges',
    },
    directed: {
      control: 'boolean',
      description: 'Whether the network shows directed edges with arrows',
    },
    layout: {
      control: 'select',
      options: [
        'cose',
        'circle',
        'concentric',
        'grid',
        'breadthfirst',
        'random',
      ],
      description: 'Layout algorithm for node positioning',
    },
    theme: {
      control: 'select',
      options: ['default', 'dark', 'scientific', 'minimal'],
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
    layoutOptions: {
      control: 'object',
      description: 'Custom options for the layout algorithm',
    },
  },
} satisfies Meta<ScientificNetwork>;

export default meta;
type Story = StoryObj<ScientificNetwork>;

export const Default: Story = {
  args: {
    title: 'Scientific Network',
    subtitle: 'Interactive network visualization',
    data: sampleNetworkData,
    layout: 'cose',
    theme: 'default',
    interactive: true,
    showToolbar: true,
    showInfo: true,
    showMetrics: false,
    enableZoom: true,
    enablePan: true,
    enableSelection: true,
    showTooltips: true,
  },
};

export const ProteinInteraction: Story = {
  args: {
    title: 'Protein Interaction Network',
    subtitle: 'Molecular interactions in cellular pathways',
    data: sampleNetworkData,
    layout: 'cose',
    theme: 'scientific',
    showToolbar: true,
    showInfo: true,
    showMetrics: true,
    enableZoom: true,
    enablePan: true,
    showTooltips: true,
  },
};

export const DirectedNetwork: Story = {
  args: {
    title: 'Metabolic Pathway',
    subtitle: 'Directed biochemical reactions',
    data: molecularNetworkData,
    directed: true,
    layout: 'breadthfirst',
    theme: 'scientific',
    showToolbar: true,
    showInfo: true,
    showMetrics: true,
    enableZoom: true,
    enablePan: true,
    showTooltips: true,
  },
};

export const LargeNetwork: Story = {
  args: {
    title: 'Large Network Analysis',
    subtitle: 'Complex network with multiple connections',
    data: largeNetworkData,
    layout: 'cose',
    theme: 'default',
    showToolbar: true,
    showInfo: true,
    showMetrics: true,
    enableZoom: true,
    enablePan: true,
    showTooltips: true,
  },
};

export const DarkTheme: Story = {
  args: {
    title: 'Network Analysis',
    subtitle: 'Dark theme visualization',
    data: sampleNetworkData,
    layout: 'circle',
    theme: 'dark',
    showToolbar: true,
    showInfo: true,
    showMetrics: false,
    enableZoom: true,
    enablePan: true,
    showTooltips: true,
  },
};

export const MinimalInterface: Story = {
  args: {
    title: 'Minimal Network',
    data: sampleNetworkData,
    layout: 'concentric',
    theme: 'minimal',
    showToolbar: false,
    showInfo: false,
    showMetrics: false,
    enableZoom: true,
    enablePan: true,
    showTooltips: false,
  },
};

export const CircularLayout: Story = {
  args: {
    title: 'Circular Layout',
    subtitle: 'Nodes arranged in a circle',
    data: sampleNetworkData,
    layout: 'circle',
    theme: 'default',
    showToolbar: true,
    showInfo: true,
    enableZoom: true,
    enablePan: true,
    showTooltips: true,
  },
};

export const GridLayout: Story = {
  args: {
    title: 'Grid Layout',
    subtitle: 'Systematic grid arrangement',
    data: sampleNetworkData,
    layout: 'grid',
    theme: 'default',
    showToolbar: true,
    showInfo: true,
    enableZoom: true,
    enablePan: true,
    showTooltips: true,
  },
};

export const LoadingState: Story = {
  args: {
    title: 'Loading Network',
    subtitle: 'Please wait while data loads...',
    data: {nodes: [], edges: []},
    isLoading: true,
    layout: 'cose',
    theme: 'default',
    showToolbar: true,
    showInfo: true,
  },
};

export const ErrorState: Story = {
  args: {
    title: 'Network Error',
    subtitle: 'Failed to load network data',
    data: {nodes: [], edges: []},
    errorMessage:
      'Failed to load network data. Please check your connection and try again.',
    layout: 'cose',
    theme: 'default',
    showToolbar: false,
    showInfo: false,
  },
};

export const CustomLayoutOptions: Story = {
  args: {
    title: 'Custom Force Layout',
    subtitle: 'Customized force-directed algorithm',
    data: largeNetworkData,
    layout: 'cose',
    layoutOptions: {
      nodeRepulsion: 800000,
      idealEdgeLength: 150,
      gravity: 40,
      numIter: 1000,
    },
    theme: 'scientific',
    showToolbar: true,
    showInfo: true,
    showMetrics: true,
    enableZoom: true,
    enablePan: true,
  },
};

export const WithEventHandlers: Story = {
  args: {
    title: 'Interactive Network',
    subtitle: 'Click nodes and edges to see events',
    data: sampleNetworkData,
    layout: 'cose',
    theme: 'default',
    showToolbar: true,
    showInfo: true,
    showMetrics: true,
    enableZoom: true,
    enablePan: true,
    showTooltips: true,
    onNodeClick: (node, _event) => {
      console.log('Node clicked:', node);
      alert(`Clicked node: ${node.label || node.id}`);
    },
    onEdgeClick: (edge, _event) => {
      console.log('Edge clicked:', edge);
      alert(`Clicked edge: ${edge.label || edge.id}`);
    },
    onExport: (format, data) => {
      console.log('Export requested:', format, data);
      alert(`Exported as ${format}`);
    },
  },
  render: (args) => html`
    <scientific-network
      title=${args.title}
      subtitle=${args.subtitle}
      .data=${args.data}
      ?directed=${args.directed}
      layout=${args.layout}
      theme=${args.theme}
      ?interactive=${args.interactive}
      ?showToolbar=${args.showToolbar}
      ?showInfo=${args.showInfo}
      ?showMetrics=${args.showMetrics}
      ?isLoading=${args.isLoading}
      errorMessage=${args.errorMessage}
      ?enableZoom=${args.enableZoom}
      ?enablePan=${args.enablePan}
      ?enableSelection=${args.enableSelection}
      ?showTooltips=${args.showTooltips}
      .layoutOptions=${args.layoutOptions}
      .onNodeClick=${args.onNodeClick}
      .onEdgeClick=${args.onEdgeClick}
      .onExport=${args.onExport}
      @node-selected=${(_e: CustomEvent) =>
        console.log('Node selected event:', _e.detail)}
      @edge-selected=${(_e: CustomEvent) =>
        console.log('Edge selected event:', _e.detail)}
      @canvas-clicked=${(_e: CustomEvent) =>
        console.log('Canvas clicked event:', _e.detail)}
      @network-zoom=${(_e: CustomEvent) =>
        console.log('Zoom changed event:', _e.detail)}
      @network-export=${(_e: CustomEvent) =>
        console.log('Export event:', _e.detail)}
    ></scientific-network>
    <div
      style="margin-top: 16px; padding: 12px; background: #f3f4f6; border-radius: 8px; font-size: 14px;"
    >
      <strong>Try these interactions:</strong>
      <ul style="margin: 8px 0 0 20px;">
        <li>Click on nodes to select them and see the alert</li>
        <li>Click on edges to select them</li>
        <li>Use zoom controls in the toolbar</li>
        <li>Export the network using toolbar buttons</li>
        <li>Check the browser console for detailed event logs</li>
      </ul>
    </div>
  `,
};

export const ThemeComparison: Story = {
  render: () => html`
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
      <div>
        <h3>Default Theme</h3>
        <scientific-network
          title="Default Theme"
          .data=${sampleNetworkData}
          layout="circle"
          theme="default"
          showToolbar
          showInfo
          style="height: 300px;"
        ></scientific-network>
      </div>
      <div>
        <h3>Scientific Theme</h3>
        <scientific-network
          title="Scientific Theme"
          .data=${sampleNetworkData}
          layout="circle"
          theme="scientific"
          showToolbar
          showInfo
          style="height: 300px;"
        ></scientific-network>
      </div>
      <div>
        <h3>Dark Theme</h3>
        <scientific-network
          title="Dark Theme"
          .data=${sampleNetworkData}
          layout="circle"
          theme="dark"
          showToolbar
          showInfo
          style="height: 300px;"
        ></scientific-network>
      </div>
      <div>
        <h3>Minimal Theme</h3>
        <scientific-network
          title="Minimal Theme"
          .data=${sampleNetworkData}
          layout="circle"
          theme="minimal"
          showToolbar
          showInfo
          style="height: 300px;"
        ></scientific-network>
      </div>
    </div>
  `,
};

export const LayoutComparison: Story = {
  render: () => html`
    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px;">
      <div>
        <h3>Force Layout (Cose)</h3>
        <scientific-network
          title="Force Layout"
          .data=${sampleNetworkData}
          layout="cose"
          theme="default"
          showInfo
          style="height: 250px;"
        ></scientific-network>
      </div>
      <div>
        <h3>Circle Layout</h3>
        <scientific-network
          title="Circle Layout"
          .data=${sampleNetworkData}
          layout="circle"
          theme="default"
          showInfo
          style="height: 250px;"
        ></scientific-network>
      </div>
      <div>
        <h3>Grid Layout</h3>
        <scientific-network
          title="Grid Layout"
          .data=${sampleNetworkData}
          layout="grid"
          theme="default"
          showInfo
          style="height: 250px;"
        ></scientific-network>
      </div>
      <div>
        <h3>Concentric Layout</h3>
        <scientific-network
          title="Concentric Layout"
          .data=${sampleNetworkData}
          layout="concentric"
          theme="default"
          showInfo
          style="height: 250px;"
        ></scientific-network>
      </div>
      <div>
        <h3>Breadthfirst Layout</h3>
        <scientific-network
          title="Hierarchical Layout"
          .data=${sampleNetworkData}
          layout="breadthfirst"
          theme="default"
          showInfo
          style="height: 250px;"
        ></scientific-network>
      </div>
      <div>
        <h3>Random Layout</h3>
        <scientific-network
          title="Random Layout"
          .data=${sampleNetworkData}
          layout="random"
          theme="default"
          showInfo
          style="height: 250px;"
        ></scientific-network>
      </div>
    </div>
  `,
};
