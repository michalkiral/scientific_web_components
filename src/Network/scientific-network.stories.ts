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

const proteinInteractionData: NetworkData = {
  nodes: [
    {
      id: 'p53',
      label: 'p53',
      data: {type: 'tumor suppressor', function: 'DNA damage response'},
    },
    {
      id: 'mdm2',
      label: 'MDM2',
      data: {type: 'ubiquitin ligase', function: 'p53 regulation'},
    },
    {
      id: 'p21',
      label: 'p21',
      data: {type: 'cyclin inhibitor', function: 'cell cycle arrest'},
    },
    {
      id: 'rb',
      label: 'Rb',
      data: {type: 'tumor suppressor', function: 'G1/S checkpoint'},
    },
    {
      id: 'e2f1',
      label: 'E2F1',
      data: {type: 'transcription factor', function: 'S phase genes'},
    },
  ],
  edges: [
    {
      id: 'e1',
      source: 'p53',
      target: 'p21',
      label: 'activates',
      data: {type: 'transcriptional'},
    },
    {
      id: 'e2',
      source: 'mdm2',
      target: 'p53',
      label: 'degrades',
      data: {type: 'post-translational'},
    },
    {
      id: 'e3',
      source: 'p21',
      target: 'rb',
      label: 'stabilizes',
      data: {type: 'protein-protein'},
    },
    {
      id: 'e4',
      source: 'rb',
      target: 'e2f1',
      label: 'inhibits',
      data: {type: 'protein-protein'},
    },
  ],
};

const meta: Meta<ScientificNetwork> = {
   title: 'Scientific/Network',
  component: 'scientific-network',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# Scientific Network Visualization

The Scientific Network component provides an interactive visualization for complex network data with scientific applications in mind. Built with Cytoscape.js, it offers comprehensive features for exploring relationships between nodes and edges in scientific datasets.

## Features

- **Interactive Visualization**: Pan, zoom, and select nodes/edges with smooth animations
- **Scientific Themes**: Multiple visual themes optimized for scientific publications
- **Real-time Analytics**: Built-in network metrics and statistics
- **Export Capabilities**: Export to PNG, JPEG, SVG, and JSON formats
- **Responsive Design**: Adapts to different screen sizes and containers
- **Custom Styling**: Extensive theming and customization options
- **Event Handling**: Rich interaction callbacks for custom behavior
- **Keyboard Shortcuts**: Press '1' to add nodes, '2' to add edges

## Usage

\`\`\`html
<scientific-network
  title="Protein Interaction Network"
  .data="\${networkData}"
  theme="scientific"
  interactive
  showToolbar
  enableNodeCreation
  enableEdgeCreation
></scientific-network>
\`\`\`

## Properties

- \`data\` — Network data with nodes and edges
- \`title\` — Network title displayed in header
- \`subtitle\` — Optional subtitle for additional context
- \`directed\` — Whether the network shows directed edges with arrows
- \`theme\` — Visual theme: default, dark, scientific
- \`interactive\` — Enable user interactions (pan, zoom, select)
- \`showToolbar\` — Display toolbar with controls
- \`showInfo\` — Show basic network information panel
- \`showMetrics\` — Show detailed network analytics
- \`enableZoom\` — Allow zoom functionality
- \`enablePan\` — Allow pan functionality
- \`enableSelection\` — Enable node/edge selection
- \`showTooltips\` — Show tooltips on hover
- \`enableNodeCreation\` — Allow adding new nodes
- \`enableEdgeCreation\` — Allow adding new edges
- \`enableRenaming\` — Allow renaming nodes/edges
- \`enableRemoval\` — Allow deleting nodes/edges

## Events

- \`onNodeClick\` — Fired when a node is clicked
- \`onEdgeClick\` — Fired when an edge is clicked
- \`onSelectionChange\` — Fired when selection changes
- \`onDataChange\` — Fired when network data is modified

## Network Data Format

\`\`\`typescript
interface NetworkData {
  nodes: Array<{
    id: string;
    label?: string;
    data?: Record<string, any>;
  }>;
  edges: Array<{
    id: string;
    source: string;
    target: string;
    label?: string;
    data?: Record<string, any>;
  }>;
}
\`\`\`

## Styling

The component uses CSS custom properties for theming:

\`\`\`css
scientific-network {
  --network-background: #ffffff;
  --network-border: #e0e0e0;
  --node-color: #3498db;
  --edge-color: #95a5a6;
  --selection-color: #e74c3c;
}
\`\`\`
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
      options: ['default', 'dark', 'scientific'],
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
    data: largeNetworkData,
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
      ?enableZoom=${args.enableZoom}
      ?enablePan=${args.enablePan}
      ?enableSelection=${args.enableSelection}
      ?showTooltips=${args.showTooltips}
      ?enableNodeCreation=${args.enableNodeCreation}
      ?enableEdgeCreation=${args.enableEdgeCreation}
      ?enableRenaming=${args.enableRenaming}
      ?enableRemoval=${args.enableRemoval}
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
      ?enableNodeCreation=${args.enableNodeCreation}
      ?enableEdgeCreation=${args.enableEdgeCreation}
      ?enableRenaming=${args.enableRenaming}
      ?enableRemoval=${args.enableRemoval}
      style="height: 500px;"
    ></scientific-network>
  `,
};
