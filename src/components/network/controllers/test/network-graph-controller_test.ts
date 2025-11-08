import {expect} from '@open-wc/testing';
import {NetworkGraphController, NetworkGraphControllerHost} from '../network-graph-controller.js';

function createMockHost(): NetworkGraphControllerHost {
  const element = document.createElement('div');
  
  (element as any).directed = false;
  (element as any).enableZoom = true;
  (element as any).enablePan = true;
  (element as any).enableSelection = true;
  (element as any).theme = 'light';
  (element as any).errorMessage = undefined;
  
  (element as any).addController = () => {};
  (element as any).removeController = () => {};
  (element as any).requestUpdate = () => {};
  (element as any).updateComplete = Promise.resolve(true);
  
  return element as unknown as NetworkGraphControllerHost;
}

function createMockContainer(): HTMLElement {
  const container = document.createElement('div');
  container.style.width = '500px';
  container.style.height = '400px';
  return container;
}

suite('NetworkGraphController', () => {
  let mockHost: NetworkGraphControllerHost;
  let mockContainer: HTMLElement;
  let controller: NetworkGraphController;

  setup(() => {
    mockHost = createMockHost();
    mockContainer = createMockContainer();
    document.body.appendChild(mockContainer);
    
    controller = new NetworkGraphController(mockHost);
  });

  teardown(() => {
    if (mockContainer.parentNode) {
      mockContainer.parentNode.removeChild(mockContainer);
    }
    controller.hostDisconnected();
  });

  suite('Initialization', () => {
    test('should initialize without throwing', () => {
      expect(() => {
        controller.hostConnected();
      }).to.not.throw();
    });

    test('should handle host configuration properties', () => {
      expect(mockHost.directed).to.be.false;
      expect(mockHost.enableZoom).to.be.true;
      expect(mockHost.enablePan).to.be.true;
      expect(mockHost.enableSelection).to.be.true;
    });

    test('should create controller instance', () => {
      expect(controller).to.be.instanceOf(NetworkGraphController);
      expect(controller.getCytoscapeInstance()).to.be.null;
    });
  });

  suite('Data Handling', () => {
    test('should handle empty network data', async () => {
      const emptyData = {
        nodes: [],
        edges: []
      };
      
      await controller.loadData(emptyData);
      // Test passes if no exception is thrown
    });

    test('should handle network data with nodes and edges', async () => {
      const networkData = {
        nodes: [
          { id: 'n1', label: 'Node 1' },
          { id: 'n2', label: 'Node 2' }
        ],
        edges: [
          { id: 'e1', source: 'n1', target: 'n2' }
        ]
      };
      
      await controller.loadData(networkData);
      // Test passes if no exception is thrown
    });
  });

  suite('Layout Management', () => {
    test('should apply layout without throwing', () => {
      expect(() => {
        controller.applyLayout();
      }).to.not.throw();
    });

    test('should apply custom layout options', () => {
      const customLayout = {
        name: 'grid',
        rows: 3,
        cols: 3
      };
      
      expect(() => {
        controller.applyLayout(customLayout);
      }).to.not.throw();
    });
  });

  suite('Theme Management', () => {
    test('should apply theme without throwing', () => {
      expect(() => {
        controller.applyTheme();
      }).to.not.throw();
    });

    test('should get background color', () => {
      const bgColor = controller.getBackgroundColor();
      expect(bgColor).to.be.a('string');
    });

    test('should get node colors', () => {
      const color1 = controller.getNodeColor(0);
      const color2 = controller.getNodeColor(1);
      
      expect(color1).to.be.a('string');
      expect(color2).to.be.a('string');
    });

    test('should create color variants', () => {
      const variants = controller.createColorVariants('#ff0000');
      expect(variants).to.be.an('object');
    });
  });

  suite('Zoom and Pan Controls', () => {
    test('should handle zoom operations', () => {
      expect(() => {
        controller.zoomIn();
        controller.zoomOut();
        controller.fitToScreen();
      }).to.not.throw();
    });

    test('should get current zoom level', () => {
      const zoom = controller.getCurrentZoom();
      expect(zoom).to.be.a('number');
      expect(zoom).to.equal(100);
    });
  });

  suite('Export Functionality', () => {
    test('should handle PNG export', () => {
      const pngData = controller.getDataURL('png');
      expect(pngData).to.be.null;
    });

    test('should handle JPG export', () => {
      const jpgData = controller.getDataURL('jpg', 0.8);
      expect(jpgData).to.be.null;
    });
  });

  suite('Element Management', () => {
    test('should handle adding elements', () => {
      const nodeElement = {
        data: { id: 'test-node', label: 'Test Node' }
      };
      
      expect(() => {
        controller.addElement(nodeElement);
      }).to.not.throw();
    });

    test('should handle removing elements', () => {
      expect(() => {
        controller.removeElement('test-node');
      }).to.not.throw();
    });

    test('should assign node colors', () => {
      expect(() => {
        controller.assignNodeColors();
        controller.assignNodeColors('category');
      }).to.not.throw();
    });
  });

  suite('Metrics and Analysis', () => {
    test('should calculate metrics', () => {
      const metrics = controller.calculateMetrics();
      expect(metrics).to.be.null;
    });

    test('should get current metrics', () => {
      const metrics = controller.getMetrics();
      expect(metrics).to.be.null;
    });
  });

  suite('Lifecycle Management', () => {
    test('should handle connection and disconnection', () => {
      expect(() => {
        controller.hostConnected();
        controller.hostDisconnected();
      }).to.not.throw();
    });

    test('should handle destruction gracefully', () => {
      expect(() => {
        controller.destroy();
        controller.destroy();
      }).to.not.throw();
    });

    test('should handle multiple disconnections', () => {
      controller.hostConnected();
      
      expect(() => {
        controller.hostDisconnected();
        controller.hostDisconnected();
      }).to.not.throw();
    });
  });

  suite('Configuration Changes', () => {
    test('should respect host configuration changes', () => {
      mockHost.directed = true;
      mockHost.enableZoom = false;
      mockHost.enablePan = false;
      mockHost.enableSelection = false;
      
      expect(mockHost.directed).to.be.true;
      expect(mockHost.enableZoom).to.be.false;
      expect(mockHost.enablePan).to.be.false;
      expect(mockHost.enableSelection).to.be.false;
    });

    test('should handle error messages', () => {
      mockHost.errorMessage = 'Test error';
      expect(mockHost.errorMessage).to.equal('Test error');
      
      mockHost.errorMessage = undefined;
      expect(mockHost.errorMessage).to.be.undefined;
    });
  });
});