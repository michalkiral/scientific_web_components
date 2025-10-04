import {expect} from '@open-wc/testing';
import {NetworkShortcutsController} from '../network-shortcuts-controller.js';
import {ReactiveControllerHost} from 'lit';

function createMockHost(): ReactiveControllerHost & HTMLElement {
  const element = document.createElement('div');
  
  (element as any).addController = () => {};
  (element as any).removeController = () => {};
  (element as any).requestUpdate = () => {};
  (element as any).updateComplete = Promise.resolve(true);
  
  return element as unknown as ReactiveControllerHost & HTMLElement;
}

suite('NetworkShortcutsController', () => {
  let mockHost: ReactiveControllerHost & HTMLElement;
  let controller: NetworkShortcutsController;

  setup(() => {
    mockHost = createMockHost();
    controller = new NetworkShortcutsController(mockHost);
  });

  teardown(() => {
    controller.hostDisconnected();
  });

  suite('Shortcut Registration', () => {
    test('should register a single shortcut', () => {
      const action = 'test-action';
      const description = 'Test action description';
      
      controller.registerShortcut('a', action, description);
      
      const shortcuts = controller.getShortcuts();
      expect(shortcuts.size).to.equal(1);
      expect(shortcuts.get('a')).to.deep.equal({action, description});
    });

    test('should register multiple shortcuts', () => {
      const shortcuts = {
        'a': {action: 'action-a', description: 'Action A'},
        'b': {action: 'action-b', description: 'Action B'},
        'c': {action: 'action-c', description: 'Action C'},
      };
      
      controller.registerShortcuts(shortcuts);
      
      const registeredShortcuts = controller.getShortcuts();
      expect(registeredShortcuts.size).to.equal(3);
      expect(registeredShortcuts.get('a')).to.deep.equal(shortcuts['a']);
      expect(registeredShortcuts.get('b')).to.deep.equal(shortcuts['b']);
      expect(registeredShortcuts.get('c')).to.deep.equal(shortcuts['c']);
    });

    test('should overwrite existing shortcuts when re-registering same key', () => {
      controller.registerShortcut('a', 'old-action', 'Old action');
      controller.registerShortcut('a', 'new-action', 'New action');
      
      const shortcut = controller.getShortcut('a');
      expect(shortcut?.action).to.equal('new-action');
      expect(shortcut?.description).to.equal('New action');
    });
  });

  suite('Shortcut Management', () => {
    setup(() => {
      controller.registerShortcuts({
        'a': {action: 'action-a', description: 'Action A'},
        'b': {action: 'action-b', description: 'Action B'},
        'c': {action: 'action-c', description: 'Action C'},
      });
    });

    test('should unregister shortcuts', () => {
      controller.unregisterShortcut('b');
      
      const shortcuts = controller.getShortcuts();
      expect(shortcuts.size).to.equal(2);
      expect(shortcuts.has('b')).to.be.false;
      expect(shortcuts.has('a')).to.be.true;
      expect(shortcuts.has('c')).to.be.true;
    });

    test('should clear all shortcuts', () => {
      controller.clearShortcuts();
      
      const shortcuts = controller.getShortcuts();
      expect(shortcuts.size).to.equal(0);
    });

    test('should check if shortcut exists', () => {
      expect(controller.hasShortcut('a')).to.be.true;
      expect(controller.hasShortcut('x')).to.be.false;
    });

    test('should get specific shortcut', () => {
      const shortcut = controller.getShortcut('a');
      expect(shortcut).to.deep.equal({action: 'action-a', description: 'Action A'});
      
      const nonExistent = controller.getShortcut('x');
      expect(nonExistent).to.be.undefined;
    });
  });

  suite('Help Text Generation', () => {
    test('should generate sorted help text', () => {
      controller.registerShortcuts({
        'z': {action: 'zoom', description: 'Zoom control'},
        'a': {action: 'add', description: 'Add element'},
        'm': {action: 'move', description: 'Move element'},
      });
      
      const helpText = controller.getHelpText();
      
      expect(helpText).to.deep.equal([
        'a: Add element',
        'm: Move element',
        'z: Zoom control'
      ]);
    });

    test('should return empty array when no shortcuts registered', () => {
      const helpText = controller.getHelpText();
      expect(helpText).to.deep.equal([]);
    });
  });

  suite('Default Network Shortcuts', () => {
    test('should create default network shortcuts', () => {
      const defaultShortcuts = NetworkShortcutsController.createDefaultNetworkShortcuts();
      
      expect(defaultShortcuts).to.be.an('object');
      expect(defaultShortcuts['f']).to.deep.include({
        action: 'fitToScreen'
      });
      expect(defaultShortcuts['f'].description).to.be.a('string');
    });

    test('should register default shortcuts correctly', () => {
      const defaultShortcuts = NetworkShortcutsController.createDefaultNetworkShortcuts();
      controller.registerShortcuts(defaultShortcuts);
      
      expect(controller.hasShortcut('f')).to.be.true;
      expect(controller.hasShortcut('+')).to.be.true;
      expect(controller.hasShortcut('-')).to.be.true;
      expect(controller.hasShortcut('Escape')).to.be.true;
    });
  });

  suite('Lifecycle', () => {
    test('should handle disposal gracefully', () => {
      controller.hostConnected();
      
      expect(() => {
        controller.hostDisconnected();
        controller.hostDisconnected();
      }).to.not.throw();
    });
  });
});