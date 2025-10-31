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
  name: '1,000 Nodes Network',
  render: () => {
    const networkData = generateLargeNetwork(1000, 2);
    return html`
      <div style="padding: 20px;">
        <p style="margin-bottom: 16px; color: #666; font-size: 14px;">
          <strong>Performance Test:</strong> Rendering 1,000 nodes with ~2,000 edges.
          Expected render time: &lt;10 seconds.
        </p>
        <scientific-network
          title="1,000 Node Network"
          subtitle="Performance test: Medium-sized network"
          .data=${networkData}
          showInfo
          showMetrics
          style="width: 100%; height: 600px; max-width: 1200px;"
        ></scientific-network>
      </div>
    `;
  },
  parameters: {
    docs: {
      description: {
        story: 'Tests network rendering with 1,000 nodes and approximately 2,000 edges. Suitable for medium-scale biological networks.',
      },
    },
  },
};

export const FiveThousandNodes: Story = {
  name: '5,000 Nodes Network',
  render: () => {
    const networkData = generateLargeNetwork(5000, 2);
    return html`
      <div style="padding: 20px;">
        <p style="margin-bottom: 16px; color: #666; font-size: 14px;">
          <strong>Performance Test:</strong> Rendering 5,000 nodes with ~10,000 edges.
          Expected render time: &lt;15 seconds.
        </p>
        <scientific-network
          title="5,000 Node Network"
          subtitle="Performance test: Large-scale network visualization"
          .data=${networkData}
          showInfo
          style="width: 100%; height: 700px; max-width: 1200px;"
        ></scientific-network>
      </div>
    `;
  },
  parameters: {
    docs: {
      description: {
        story: 'Tests network rendering with 5,000 nodes. This validates performance with very large scientific networks.',
      },
    },
  },
};

export const TenThousandEdges: Story = {
  name: 'Dense Network (10,000 edges)',
  render: () => {
    const networkData = generateLargeNetwork(500, 20);
    return html`
      <div style="padding: 20px;">
        <p style="margin-bottom: 16px; color: #666; font-size: 14px;">
          <strong>Performance Test:</strong> Dense network with 500 nodes and ~10,000 edges.
          Expected render time: &lt;15 seconds.
        </p>
        <scientific-network
          title="Dense Network - 10,000 Edges"
          subtitle="Performance test: High edge density"
          .data=${networkData}
          showInfo
          directed
          style="width: 100%; height: 600px; max-width: 1200px;"
        ></scientific-network>
      </div>
    `;
  },
  parameters: {
    docs: {
      description: {
        story: 'Tests dense network rendering with many edges. Validates performance with highly connected graphs.',
      },
    },
  },
};

export const ScaleFreeNetwork: Story = {
  name: 'Scale-Free Network (3,000 nodes)',
  render: () => {
    const networkData = generateScaleFreeNetwork(3000);
    return html`
      <div style="padding: 20px;">
        <p style="margin-bottom: 16px; color: #666; font-size: 14px;">
          <strong>Performance Test:</strong> Scale-free network with 3,000 nodes.
          Uses preferential attachment algorithm. Expected render time: &lt;15 seconds.
        </p>
        <scientific-network
          title="Scale-Free Network"
          subtitle="Protein-protein interaction network simulation"
          .data=${networkData}
          showInfo
          showMetrics
          .layoutOptions=${{name: 'cose'}}
          style="width: 100%; height: 700px; max-width: 1200px;"
        ></scientific-network>
      </div>
    `;
  },
  parameters: {
    docs: {
      description: {
        story: 'Tests scale-free network topology (power-law distribution). Simulates realistic biological networks like protein interactions.',
      },
    },
  },
};

export const DirectionToggle: Story = {
  name: 'Direction Toggle Performance',
  render: () => {
    const networkData = generateLargeNetwork(1000, 2);
    let isDirected = true;

    return html`
      <div style="padding: 20px;">
        <p style="margin-bottom: 16px; color: #666; font-size: 14px;">
          <strong>Performance Test:</strong> Toggle between directed/undirected with 1,000 nodes.
          Expected toggle time: &lt;3 seconds.
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
          subtitle="1,000 nodes - toggle between directed/undirected"
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
        story: 'Tests performance of toggling network direction with large datasets. Validates re-render efficiency.',
      },
    },
  },
};

export const LayoutPerformance: Story = {
  name: 'Layout Performance (1,000 nodes)',
  render: () => {
    const networkData = generateLargeNetwork(1000, 2);

    return html`
      <div style="padding: 20px;">
        <p style="margin-bottom: 16px; color: #666; font-size: 14px;">
          <strong>Performance Test:</strong> Layout computation with 1,000 nodes.
          Expected layout computation: &lt;10 seconds.
        </p>
        <scientific-network
          title="Layout Performance Test"
          subtitle="1,000 nodes - automatic force-directed layout"
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
        story: 'Tests layout computation performance with large networks. The default force-directed algorithm should complete within 10 seconds.',
      },
    },
  },
};

export const DynamicUpdates: Story = {
  name: 'Dynamic Network Updates',
  render: () => {
    let networkData = generateLargeNetwork(500, 2);

    const addNodes = () => {
      const startId = networkData.nodes.length;
      const newNodes = Array.from({length: 100}, (_, i) => ({
        id: `node-${startId + i}`,
        label: `Node ${startId + i}`,
        group: Math.floor(Math.random() * 5),
      }));

      const newEdges = Array.from({length: 150}, (_, i) => ({
        id: `edge-${networkData.edges.length + i}`,
        source: `node-${Math.floor(Math.random() * (startId + 100))}`,
        target: `node-${Math.floor(Math.random() * (startId + 100))}`,
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
          Click "Add Nodes" to add 100 nodes and 150 edges. Expected: &lt;5 seconds.
        </p>
        <div style="margin-bottom: 16px;">
          <button
            @click=${addNodes}
            style="padding: 8px 16px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; margin-right: 8px;"
          >
            Add 100 Nodes + 150 Edges
          </button>
          <span style="color: #666; font-size: 14px;">
            Current: ${networkData.nodes.length} nodes, ${networkData.edges.length} edges
          </span>
        </div>
        <scientific-network
          title="Dynamic Network Updates"
          subtitle="Start with 500 nodes, add more dynamically"
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
  },
};

export const ZoomAndPan: Story = {
  name: 'Zoom & Pan (1,500 nodes)',
  render: () => {
    const networkData = generateLargeNetwork(1500, 2);
    return html`
      <div style="padding: 20px;">
        <p style="margin-bottom: 16px; color: #666; font-size: 14px;">
          <strong>Performance Test:</strong> Zoom and pan with 1,500 nodes.
          Use mouse wheel to zoom and drag to pan. Expected: Smooth 60fps interaction.
        </p>
        <scientific-network
          title="Zoom & Pan Performance"
          subtitle="1,500 nodes - test interactive navigation"
          .data=${networkData}
          showInfo
          .controls=${{enableZoom: true, enablePan: true}}
          style="width: 100%; height: 700px; max-width: 1200px;"
        ></scientific-network>
      </div>
    `;
  },
  parameters: {
    docs: {
      description: {
        story: 'Tests zoom and pan performance with large networks. Interaction should remain smooth during navigation.',
      },
    },
  },
};

export const MultipleNetworks: Story = {
  name: 'Multiple Networks (Memory Test)',
  render: () => {
    const networks = Array.from({length: 3}, (_, i) => ({
      id: i,
      data: generateLargeNetwork(500, 2),
    }));

    return html`
      <div style="padding: 20px;">
        <p style="margin-bottom: 16px; color: #666; font-size: 14px;">
          <strong>Memory Test:</strong> Three networks with 500 nodes each.
          Validates no memory leaks with multiple instances.
        </p>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 24px;">
          ${networks.map(
            (network) => html`
              <scientific-network
                title="Network ${network.id + 1}"
                subtitle="Memory test - 500 nodes"
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
  },
};
