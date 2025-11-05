import type {NetworkData} from '../scientific-network';

export const exportFormatOptions: Array<{value: string; label: string}> = [
  {value: 'png', label: 'PNG'},
  {value: 'jpg', label: 'JPG'},
  {value: 'pdf', label: 'PDF'},
  {value: 'json', label: 'JSON'},
];

export const networkTypeOptions = {
  undirected: {
    id: 'undirected',
    label: 'Undirected',
    title: 'Set network to undirected mode',
    value: 'false',
  },
  directed: {
    id: 'directed',
    label: 'Directed',
    title: 'Set network to directed mode',
    value: 'true',
  },
} as const;

export const interactionModeButtons = {
  createNode: {
    id: 'create-node',
    label: 'Node',
    title: 'Add Node (Press 1 and click on canvas)',
    icon: 'node-add',
  },
  createEdge: {
    id: 'create-edge',
    label: 'Edge',
    title: 'Add Edge (Press 2 and click on two nodes)',
    icon: 'edge-add',
  },
  rename: {
    id: 'rename',
    label: 'Rename',
    title: 'Rename elements (Press 3 and click element)',
    icon: 'rename',
  },
  remove: {
    id: 'remove',
    label: 'Remove',
    title: 'Remove elements (Press 4 and double-click element to confirm)',
    icon: 'remove',
  },
} as const;

export const controlButtons = {
  zoomIn: {
    id: 'zoom-in',
    label: '+',
    icon: 'zoom-in',
    title: 'Zoom In',
  },
  zoomOut: {
    id: 'zoom-out',
    label: '−',
    icon: 'zoom-out',
    title: 'Zoom Out',
  },
  zoomFit: {
    id: 'zoom-fit',
    label: '⌂',
    icon: 'fit-screen',
    title: 'Fit to Screen',
  },
} as const;

export const sampleNetworkData: NetworkData = {
  nodes: [
    {id: 'node1', label: 'Protein A', data: {type: 'protein', mass: 25000}},
    {id: 'node2', label: 'Protein B', data: {type: 'protein', mass: 30000}},
    {id: 'node3', label: 'Compound X', data: {type: 'compound', formula: 'C6H12O6'}},
    {id: 'node4', label: 'Gene Y', data: {type: 'gene', chromosome: 'chr1'}},
    {id: 'node5', label: 'Metabolite Z', data: {type: 'metabolite', mw: 180.16}},
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

export const proteinInteractionData: NetworkData = {
  nodes: [
    {id: 'p1', label: 'Receptor', data: {type: 'protein', mass: 40000}},
    {id: 'p2', label: 'Ligand', data: {type: 'protein', mass: 12000}},
    {id: 'p3', label: 'Kinase', data: {type: 'enzyme', activity: 'phosphorylation'}},
    {id: 'p4', label: 'Transcription Factor', data: {type: 'protein', location: 'nucleus'}},
    {id: 'p5', label: 'Inhibitor', data: {type: 'compound', effect: 'downregulation'}},
  ],
  edges: [
    {id: 'pp1', source: 'p1', target: 'p2', label: 'binds'},
    {id: 'pp2', source: 'p2', target: 'p3', label: 'activates'},
    {id: 'pp3', source: 'p3', target: 'p4', label: 'phosphorylates'},
    {id: 'pp4', source: 'p4', target: 'p5', label: 'suppresses'},
    {id: 'pp5', source: 'p5', target: 'p2', label: 'inhibits'},
  ],
};

export const createLargeNetworkData = (
  nodeCount = 20,
  edgeCount = 35,
): NetworkData => {
  const nodes = Array.from({length: nodeCount}, (_, index) => ({
    id: `node${index + 1}`,
    label: `Node ${index + 1}`,
    data: {
      type: index % 4 === 0 ? 'hub' : 'regular',
      importance: Number((((index % 10) + 1) / 10).toFixed(2)),
    },
  }));

  const edges = Array.from({length: edgeCount}, (_, index) => {
    const sourceIndex = index % nodeCount;
    let targetIndex = (index * 7 + 3) % nodeCount;
    if (targetIndex === sourceIndex) {
      targetIndex = (targetIndex + 1) % nodeCount;
    }

    return {
      id: `edge${index + 1}`,
      source: nodes[sourceIndex].id,
      target: nodes[targetIndex].id,
      data: {weight: Number((((index % 9) + 2) / 10).toFixed(2))},
    };
  });

  return {nodes, edges};
};
