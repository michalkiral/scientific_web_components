import {html} from 'lit';
import type {Meta, StoryObj} from '@storybook/web-components-vite';
import './scientific-network.js';
import type {NetworkData, ScientificNetwork} from './scientific-network.js';

/**
 * Generate a large network for performance testing
 */
function generateLargeNetwork(nodeCount: number, avgEdgesPerNode: number): NetworkData {
  const nodes = Array.from({length: nodeCount}, (_, i) => ({
    id: `node-${i}`,
    label: `Node ${i}`,
    group: Math.floor(Math.random() * 5),
  }));

  const edges = [];
  const maxEdges = Math.min(nodeCount * avgEdgesPerNode, (nodeCount * (nodeCount - 1)) / 2);

  for (let i = 0; i < maxEdges; i++) {
    const source = Math.floor(Math.random() * nodeCount);
    let target = Math.floor(Math.random() * nodeCount);

    // Avoid self-loops
    while (target === source) {
      target = Math.floor(Math.random() * nodeCount);
    }

    edges.push({
      id: `edge-${i}`,
      source: `node-${source}`,
      target: `node-${target}`,
      weight: Math.random(),
    });
  }

  return {nodes, edges};
}

/**
 * Generate a scale-free network (power-law distribution)
 * Simulates realistic biological/social networks
 */
function generateScaleFreeNetwork(nodeCount: number): NetworkData {
  const nodes = Array.from({length: nodeCount}, (_, i) => ({
    id: `node-${i}`,
    label: `Node ${i}`,
    group: Math.floor(Math.random() * 5),
  }));

  const edges = [];
  const nodeDegrees = new Array(nodeCount).fill(0);

  // Start with a small connected core
  for (let i = 0; i < 5; i++) {
    for (let j = i + 1; j < 5; j++) {
      edges.push({
        id: `edge-${edges.length}`,
        source: `node-${i}`,
        target: `node-${j}`,
        weight: Math.random(),
      });
      nodeDegrees[i]++;
      nodeDegrees[j]++;
    }
  }

  // Add remaining nodes using preferential attachment
  for (let i = 5; i < nodeCount; i++) {
    const connections = Math.min(3, i);
    const totalDegree = nodeDegrees.slice(0, i).reduce((a, b) => a + b, 0);

    for (let c = 0; c < connections; c++) {
      // Preferential attachment: connect to nodes with higher degree
      let targetNode = 0;
      const rand = Math.random() * totalDegree;
      let cumulative = 0;

      for (let j = 0; j < i; j++) {
        cumulative += nodeDegrees[j];
        if (cumulative >= rand) {
          targetNode = j;
          break;
        }
      }

      edges.push({
        id: `edge-${edges.length}`,
        source: `node-${i}`,
        target: `node-${targetNode}`,
        weight: Math.random(),
      });
      nodeDegrees[i]++;
      nodeDegrees[targetNode]++;
    }
  }

  return {nodes, edges};
}

const meta: Meta = {
  title: 'Scientific/Network/Performance Tests',
  component: 'scientific-network',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# Network Performance Tests

Visual tests demonstrating the Network component's ability to handle large graph datasets efficiently.
These stories can be used for visual regression testing and performance validation.

**Performance Benchmarks:**
- 1,000 nodes: < 10 seconds render time
- 5,000 nodes: < 15 seconds render time
- 10,000 edges: < 15 seconds render time
- Scale-free networks: < 15 seconds for realistic topologies

All tests validate the component's ability to handle real-world network visualization scenarios.
        `,
      },
    },
  },
};

export default meta;

type Story = StoryObj;

export const OneThousandNodes: Story = {
  name: '1,000 Nodes Network (Load on Demand)',
  render: () => {
    let isLoaded = false;
    let isLoading = false;

    const loadNetwork = (e: Event) => {
      if (isLoading || isLoaded) return;
      
      const button = e.target as HTMLButtonElement;
      button.disabled = true;
      button.textContent = 'Loading...';
      isLoading = true;

      // Generate network data asynchronously to avoid blocking UI
      setTimeout(() => {
        const networkData = generateLargeNetwork(1000, 2);
        const container = document.getElementById('network-1k-container');
        
        if (container) {
          const network = document.createElement('scientific-network');
          network.setAttribute('title', '1,000 Node Network');
          network.setAttribute('subtitle', 'Performance test: Medium-sized network');
          network.setAttribute('showInfo', '');
          network.setAttribute('style', 'width: 100%; height: 600px; max-width: 1200px;');
          (network as ScientificNetwork).data = networkData;
          container.appendChild(network);
          
          button.textContent = 'Network Loaded';
          isLoaded = true;
        }
        isLoading = false;
      }, 50);
    };

    return html`
      <div style="padding: 20px;">
        <p style="margin-bottom: 16px; color: #666; font-size: 14px;">
          <strong>Performance Test:</strong> Rendering 1,000 nodes with ~2,000 edges.
          Expected render time: &lt;10 seconds.
        </p>
        <p style="margin-bottom: 16px; padding: 12px; background: #fff3cd; border: 1px solid #ffc107; border-radius: 4px; color: #856404;">
          ⚠️ <strong>Large Network:</strong> Click the button below to load this network on demand to prevent Storybook from freezing.
        </p>
        <button
          @click=${loadNetwork}
          style="padding: 12px 24px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 16px; margin-bottom: 16px;"
        >
          Load 1,000 Node Network
        </button>
        <div id="network-1k-container"></div>
      </div>
    `;
  },
  parameters: {
    docs: {
      description: {
        story: 'Tests network rendering with 1,000 nodes. Click the button to load on demand to prevent page freezing.',
      },
    },
    chromatic: { disableSnapshot: true },
  },
};

export const FiveThousandNodes: Story = {
  name: '5,000 Nodes Network (On Demand)',
  render: () => {
    let networkData: NetworkData | null = null;
    let isLoading = false;

    const loadNetwork = () => {
      isLoading = true;
      // Use setTimeout to avoid blocking the UI
      setTimeout(() => {
        networkData = generateLargeNetwork(5000, 2);
        isLoading = false;
        const container = document.getElementById('network-5k-container');
        if (container) {
          container.innerHTML = '';
          const network = document.createElement('scientific-network');
          network.setAttribute('title', '5,000 Node Network');
          network.setAttribute('subtitle', 'Performance test: Large-scale network visualization');
          network.setAttribute('showInfo', '');
          network.setAttribute('style', 'width: 100%; height: 700px; max-width: 1200px;');
          (network as ScientificNetwork).data = networkData;
          container.appendChild(network);
        }
      }, 100);
    };

    return html`
      <div style="padding: 20px;">
        <p style="margin-bottom: 16px; color: #666; font-size: 14px;">
          <strong>Performance Test:</strong> Rendering 5,000 nodes with ~10,000 edges.
          Expected render time: &lt;15 seconds.
        </p>
        <p style="margin-bottom: 16px; padding: 12px; background: #fff3cd; border: 1px solid #ffc107; border-radius: 4px; color: #856404;">
          ⚠️ <strong>Warning:</strong> This is a very large network. Click the button below to load it on demand to avoid page freezing.
        </p>
        <button
          @click=${loadNetwork}
          ?disabled=${isLoading}
          style="padding: 12px 24px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 16px; margin-bottom: 16px;"
        >
          ${isLoading ? 'Loading...' : 'Load 5,000 Node Network'}
        </button>
        <div id="network-5k-container"></div>
      </div>
    `;
  },
  parameters: {
    docs: {
      description: {
        story: 'Tests network rendering with 5,000 nodes. Click the button to load on demand to prevent page freezing.',
      },
    },
    chromatic: { disableSnapshot: true },
  },
};

export const SmallNetwork: Story = {
  name: 'Small Network (100 nodes)',
  render: () => {
    const networkData = generateLargeNetwork(100, 3);
    return html`
      <div style="padding: 20px;">
        <p style="margin-bottom: 16px; color: #666; font-size: 14px;">
          <strong>Performance Test:</strong> Small network with 100 nodes and ~300 edges.
          Expected render time: &lt;2 seconds.
        </p>
        <scientific-network
          title="Small Network - 100 Nodes"
          subtitle="Performance test: Optimal for interactive visualization"
          .data=${networkData}
          showInfo
          style="width: 100%; height: 600px; max-width: 1200px;"
        ></scientific-network>
      </div>
    `;
  },
  parameters: {
    docs: {
      description: {
        story: 'Tests small network rendering. This size loads immediately without freezing.',
      },
    },
    chromatic: { disableSnapshot: true },
  },
};

export const ScaleFreeNetwork: Story = {
  name: 'Scale-Free Network (500 nodes - On Demand)',
  render: () => {
    let isLoaded = false;
    let isLoading = false;

    const loadNetwork = (e: Event) => {
      if (isLoading || isLoaded) return;
      
      const button = e.target as HTMLButtonElement;
      button.disabled = true;
      button.textContent = 'Loading...';
      isLoading = true;

      // Generate network data asynchronously to avoid blocking UI
      setTimeout(() => {
        const networkData = generateScaleFreeNetwork(500);
        const container = document.getElementById('network-scalefree-container');
        
        if (container) {
          const network = document.createElement('scientific-network');
          network.setAttribute('title', 'Scale-Free Network');
          network.setAttribute('subtitle', 'Protein-protein interaction network simulation');
          network.setAttribute('showInfo', '');
          network.setAttribute('style', 'width: 100%; height: 700px; max-width: 1200px;');
          (network as ScientificNetwork).data = networkData;
          container.appendChild(network);
          
          button.textContent = 'Network Loaded';
          isLoaded = true;
        }
        isLoading = false;
      }, 50);
    };

    return html`
      <div style="padding: 20px;">
        <p style="margin-bottom: 16px; color: #666; font-size: 14px;">
          <strong>Performance Test:</strong> Scale-free network with 500 nodes.
          Uses preferential attachment algorithm. Expected render time: &lt;5 seconds.
        </p>
        <p style="margin-bottom: 16px; padding: 12px; background: #fff3cd; border: 1px solid #ffc107; border-radius: 4px; color: #856404;">
          ⚠️ <strong>Large Network:</strong> Click the button below to load this network on demand to prevent Storybook from freezing.
        </p>
        <button
          @click=${loadNetwork}
          style="padding: 12px 24px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 16px; margin-bottom: 16px;"
        >
          Load 500-Node Scale-Free Network
        </button>
        <div id="network-scalefree-container"></div>
      </div>
    `;
  },
  parameters: {
    docs: {
      description: {
        story: 'Tests scale-free network topology (power-law distribution). Simulates realistic biological networks like protein interactions. Loads on demand to prevent page freezing.',
      },
    },
    chromatic: { disableSnapshot: true },
  },
};

export const DirectionToggle: Story = {
  name: 'Direction Toggle Performance',
  render: () => {
    const networkData = generateLargeNetwork(200, 2);
    let isDirected = true;

    return html`
      <div style="padding: 20px;">
        <p style="margin-bottom: 16px; color: #666; font-size: 14px;">
          <strong>Performance Test:</strong> Toggle between directed/undirected with 200 nodes.
          Expected toggle time: &lt;1 second.
        </p>
        <button
          @click=${(e: Event) => {
            const button = e.target as HTMLButtonElement;
            const network = button.nextElementSibling as ScientificNetwork;
            isDirected = !isDirected;
            network.directed = isDirected;
            button.textContent = isDirected ? 'Switch to Undirected' : 'Switch to Directed';
          }}
          style="margin-bottom: 16px; padding: 8px 16px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;"
        >
          Switch to Undirected
        </button>
        <scientific-network
          title="Direction Toggle Test"
          subtitle="200 nodes - toggle between directed/undirected"
          .data=${networkData}
          directed
          showInfo
          style="width: 100%; height: 600px; max-width: 1200px;"
        ></scientific-network>
      </div>
    `;
  },
  parameters: {
    docs: {
      description: {
        story: 'Tests performance of toggling network direction. Validates re-render efficiency.',
      },
    },
    chromatic: { disableSnapshot: true },
  },
};

export const LayoutPerformance: Story = {
  name: 'Layout Performance (150 nodes)',
  render: () => {
    const networkData = generateLargeNetwork(150, 2);

    return html`
      <div style="padding: 20px;">
        <p style="margin-bottom: 16px; color: #666; font-size: 14px;">
          <strong>Performance Test:</strong> Layout computation with 150 nodes.
          Expected layout computation: &lt;2 seconds.
        </p>
        <scientific-network
          title="Layout Performance Test"
          subtitle="150 nodes - automatic force-directed layout"
          .data=${networkData}
          showInfo
          style="width: 100%; height: 600px; max-width: 1200px;"
        ></scientific-network>
      </div>
    `;
  },
  parameters: {
    docs: {
      description: {
        story: 'Tests layout computation performance. The default force-directed algorithm should complete quickly.',
      },
    },
    chromatic: { disableSnapshot: true },
  },
};

export const DynamicUpdates: Story = {
  name: 'Dynamic Network Updates',
  render: () => {
    let networkData = generateLargeNetwork(50, 2);

    const addNodes = () => {
      const startId = networkData.nodes.length;
      const newNodes = Array.from({length: 25}, (_, i) => ({
        id: `node-${startId + i}`,
        label: `Node ${startId + i}`,
        group: Math.floor(Math.random() * 5),
      }));

      const newEdges = Array.from({length: 35}, (_, i) => ({
        id: `edge-${networkData.edges.length + i}`,
        source: `node-${Math.floor(Math.random() * (startId + 25))}`,
        target: `node-${Math.floor(Math.random() * (startId + 25))}`,
        weight: Math.random(),
      }));

      networkData = {
        nodes: [...networkData.nodes, ...newNodes],
        edges: [...networkData.edges, ...newEdges],
      };

      const network = document.querySelector('scientific-network') as ScientificNetwork | null;
      if (network) {
        network.data = networkData;
      }
    };

    return html`
      <div style="padding: 20px;">
        <p style="margin-bottom: 16px; color: #666; font-size: 14px;">
          <strong>Performance Test:</strong> Dynamic node/edge addition.
          Click "Add Nodes" to add 25 nodes and 35 edges. Expected: &lt;1 second.
        </p>
        <div style="margin-bottom: 16px;">
          <button
            @click=${addNodes}
            style="padding: 8px 16px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; margin-right: 8px;"
          >
            Add 25 Nodes + 35 Edges
          </button>
          <span style="color: #666; font-size: 14px;">
            Current: ${networkData.nodes.length} nodes, ${networkData.edges.length} edges
          </span>
        </div>
        <scientific-network
          title="Dynamic Network Updates"
          subtitle="Start with 50 nodes, add more dynamically"
          .data=${networkData}
          showInfo
          style="width: 100%; height: 600px; max-width: 1200px;"
        ></scientific-network>
      </div>
    `;
  },
  parameters: {
    docs: {
      description: {
        story: 'Tests dynamic network updates by adding nodes and edges incrementally. Validates real-time network building scenarios.',
      },
    },
    chromatic: { disableSnapshot: true },
  },
};

export const ZoomAndPan: Story = {
  name: 'Zoom & Pan (300 nodes - On Demand)',
  render: () => {
    let isLoaded = false;
    let isLoading = false;

    const loadNetwork = (e: Event) => {
      if (isLoading || isLoaded) return;
      
      const button = e.target as HTMLButtonElement;
      button.disabled = true;
      button.textContent = 'Loading...';
      isLoading = true;

      // Generate network data asynchronously to avoid blocking UI
      setTimeout(() => {
        const networkData = generateLargeNetwork(300, 2);
        const container = document.getElementById('network-zoom-container');
        
        if (container) {
          const network = document.createElement('scientific-network') as ScientificNetwork;
          network.setAttribute('title', 'Zoom & Pan Performance');
          network.setAttribute('subtitle', '300 nodes - test interactive navigation');
          network.setAttribute('showInfo', '');
          network.setAttribute('style', 'width: 100%; height: 700px; max-width: 1200px;');
          network.controls = {
            enableZoom: true,
            enablePan: true,
            enableSelection: true,
            showTooltips: true,
            enableNodeCreation: false,
            enableEdgeCreation: false,
            enableRenaming: false,
            enableRemoval: false,
          };
          network.data = networkData;
          container.appendChild(network);
          
          button.textContent = 'Network Loaded - Try zooming and panning!';
          isLoaded = true;
        }
        isLoading = false;
      }, 50);
    };

    return html`
      <div style="padding: 20px;">
        <p style="margin-bottom: 16px; color: #666; font-size: 14px;">
          <strong>Performance Test:</strong> Zoom and pan with 300 nodes.
          Use mouse wheel to zoom and drag to pan. Expected: Smooth 60fps interaction.
        </p>
        <p style="margin-bottom: 16px; padding: 12px; background: #fff3cd; border: 1px solid #ffc107; border-radius: 4px; color: #856404;">
          ⚠️ <strong>Medium Network:</strong> Click the button below to load this network on demand to prevent Storybook from freezing.
        </p>
        <button
          @click=${loadNetwork}
          style="padding: 12px 24px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 16px; margin-bottom: 16px;"
        >
          Load 300-Node Network
        </button>
        <div id="network-zoom-container"></div>
      </div>
    `;
  },
  parameters: {
    docs: {
      description: {
        story: 'Tests zoom and pan performance. Interaction should remain smooth during navigation. Loads on demand to prevent page freezing.',
      },
    },
    chromatic: { disableSnapshot: true },
  },
};

export const MultipleNetworks: Story = {
  name: 'Multiple Networks (Memory Test)',
  render: () => {
    const networks = Array.from({length: 3}, (_, i) => ({
      id: i,
      data: generateLargeNetwork(100, 2),
    }));

    return html`
      <div style="padding: 20px;">
        <p style="margin-bottom: 16px; color: #666; font-size: 14px;">
          <strong>Memory Test:</strong> Three networks with 100 nodes each.
          Validates no memory leaks with multiple instances.
        </p>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 24px;">
          ${networks.map(
            (network) => html`
              <scientific-network
                title="Network ${network.id + 1}"
                subtitle="Memory test - 100 nodes"
                .data=${network.data}
                showInfo
                style="width: 100%; height: 400px;"
              ></scientific-network>
            `
          )}
        </div>
      </div>
    `;
  },
  parameters: {
    docs: {
      description: {
        story: 'Tests memory stability with multiple network instances. Monitor browser memory usage for leaks.',
      },
    },
    chromatic: { disableSnapshot: true },
  },
};
