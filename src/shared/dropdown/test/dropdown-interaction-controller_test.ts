import {expect} from '@open-wc/testing';
import {DropdownInteractionController, DropdownInteractionHost} from '../dropdown-interaction-controller.js';
import {DropdownOption} from '../dropdown-utils.js';

function createMockDropdownHost(): DropdownInteractionHost {
  const element = document.createElement('div');
  
  (element as any).isOpen = false;
  (element as any).focusedIndex = -1;
  (element as any).disabled = false;
  (element as any).filteredOptions = [];
  (element as any).selectedOption = undefined;
  
  (element as any).selectOption = (option: DropdownOption) => {
    (element as any).selectedOption = option;
  };
  (element as any).closeDropdown = () => {
    (element as any).isOpen = false;
  };
  (element as any).openDropdown = () => {
    (element as any).isOpen = true;
  };
  
  (element as any).addController = () => {};
  (element as any).removeController = () => {};
  (element as any).requestUpdate = () => {};
  (element as any).updateComplete = Promise.resolve(true);
  
  return element as unknown as DropdownInteractionHost;
}

suite('DropdownInteractionController', () => {
  let mockHost: DropdownInteractionHost;
  let controller: DropdownInteractionController;

  setup(() => {
    mockHost = createMockDropdownHost();
    document.body.appendChild(mockHost);

    (mockHost as any).filteredOptions = [
      {label: 'Option 1', value: 'opt1'},
      {label: 'Option 2', value: 'opt2'},
      {label: 'Option 3', value: 'opt3', disabled: true}
    ];
  });

  teardown(() => {
    if (controller) {
      controller.hostDisconnected();
    }
    if (mockHost.parentNode) {
      mockHost.parentNode.removeChild(mockHost);
    }
  });

  suite('Initialization', () => {
    test('should create controller with default options', () => {
      controller = new DropdownInteractionController(mockHost);
      expect(controller).to.be.instanceOf(DropdownInteractionController);
    });

    test('should create controller with custom options', () => {
      const options = {
        onOpen: () => {},
        onClose: () => {},
        onToggle: () => {},
        onBeforeOpen: () => true
      };
      
      controller = new DropdownInteractionController(mockHost, options);
      expect(controller).to.be.instanceOf(DropdownInteractionController);
    });
  });

  suite('Open/Close Operations', () => {
    setup(() => {
      controller = new DropdownInteractionController(mockHost);
    });

    test('should open dropdown when not disabled', () => {
      (mockHost as any).disabled = false;
      (mockHost as any).isOpen = false;
      
      controller.open();
      
      expect((mockHost as any).isOpen).to.be.true;
      expect((mockHost as any).focusedIndex).to.equal(-1);
    });

    test('should not open dropdown when disabled', () => {
      (mockHost as any).disabled = true;
      (mockHost as any).isOpen = false;
      
      controller.open();
      
      expect((mockHost as any).isOpen).to.be.false;
    });

    test('should not open dropdown when already open', () => {
      (mockHost as any).disabled = false;
      (mockHost as any).isOpen = true;
      
      controller.open();
      
      expect((mockHost as any).isOpen).to.be.true;
    });

    test('should close dropdown when open', () => {
      (mockHost as any).isOpen = true;
      (mockHost as any).focusedIndex = 1;
      
      controller.close();
      
      expect((mockHost as any).isOpen).to.be.false;
      expect((mockHost as any).focusedIndex).to.equal(-1);
    });

    test('should handle close when already closed', () => {
      (mockHost as any).isOpen = false;
      
      expect(() => {
        controller.close();
      }).to.not.throw();
      
      expect((mockHost as any).isOpen).to.be.false;
    });

    test('should toggle dropdown state', () => {
      (mockHost as any).isOpen = false;
      controller.toggle();
      expect((mockHost as any).isOpen).to.be.true;
      
      controller.toggle();
      expect((mockHost as any).isOpen).to.be.false;
    });
  });

  suite('Before Open Callback', () => {
    test('should prevent opening when beforeOpen returns false', () => {
      const options = {
        onBeforeOpen: () => false
      };
      
      controller = new DropdownInteractionController(mockHost, options);
      (mockHost as any).isOpen = false;
      
      controller.open();
      
      expect((mockHost as any).isOpen).to.be.false;
    });

    test('should allow opening when beforeOpen returns true', () => {
      const options = {
        onBeforeOpen: () => true
      };
      
      controller = new DropdownInteractionController(mockHost, options);
      (mockHost as any).isOpen = false;
      
      controller.open();
      
      expect((mockHost as any).isOpen).to.be.true;
    });

    test('should allow opening when beforeOpen returns undefined', () => {
      const options = {
        onBeforeOpen: () => undefined
      };
      
      controller = new DropdownInteractionController(mockHost, options);
      (mockHost as any).isOpen = false;
      
      controller.open();
      
      expect((mockHost as any).isOpen).to.be.true;
    });
  });

  suite('Keyboard Handling', () => {
    setup(() => {
      controller = new DropdownInteractionController(mockHost);
    });

    test('should handle keyboard events', () => {
      const keyEvent = new KeyboardEvent('keydown', {
        key: 'ArrowDown',
        bubbles: true
      });
      
      expect(() => {
        controller.handleKeyDown(keyEvent);
      }).to.not.throw();
    });

    test('should use custom keyboard config when provided', () => {
      const customConfig = {
        openOnNavigation: false,
        allowCustomValues: true
      };
      
      const options = {
        keyboardConfig: () => customConfig
      };
      
      controller = new DropdownInteractionController(mockHost, options);
      
      const keyEvent = new KeyboardEvent('keydown', {
        key: 'Enter',
        bubbles: true
      });
      
      expect(() => {
        controller.handleKeyDown(keyEvent);
      }).to.not.throw();
    });
  });

  suite('Click Outside Handling', () => {
    setup(() => {
      controller = new DropdownInteractionController(mockHost);
      controller.hostConnected();
    });

    test('should close dropdown on outside click', () => {
      (mockHost as any).isOpen = true;
      
      const outsideElement = document.createElement('div');
      document.body.appendChild(outsideElement);
      
      const clickEvent = new MouseEvent('click', {
        bubbles: true,
        view: window
      });
      
      Object.defineProperty(clickEvent, 'composedPath', {
        value: () => [outsideElement, document.body, document.documentElement, document, window],
        configurable: true
      });
      
      outsideElement.dispatchEvent(clickEvent);
      
      expect((mockHost as any).isOpen).to.be.false;
      
      document.body.removeChild(outsideElement);
    });

    test('should not close dropdown on inside click', () => {
      (mockHost as any).isOpen = true;
      
      const clickEvent = new MouseEvent('click', {
        bubbles: true,
        view: window
      });
      
      Object.defineProperty(clickEvent, 'composedPath', {
        value: () => [mockHost, document.body, document.documentElement, document, window],
        configurable: true
      });
      
      mockHost.dispatchEvent(clickEvent);
      
      expect((mockHost as any).isOpen).to.be.true;
    });
  });

  suite('Lifecycle Management', () => {
    test('should handle connection', () => {
      controller = new DropdownInteractionController(mockHost);
      
      expect(() => {
        controller.hostConnected();
      }).to.not.throw();
    });

    test('should handle disconnection', () => {
      controller = new DropdownInteractionController(mockHost);
      controller.hostConnected();
      
      expect(() => {
        controller.hostDisconnected();
      }).to.not.throw();
    });

    test('should handle disposal', () => {
      controller = new DropdownInteractionController(mockHost);
      controller.hostConnected();
      
      expect(() => {
        controller.dispose();
      }).to.not.throw();
    });

    test('should handle multiple disconnections gracefully', () => {
      controller = new DropdownInteractionController(mockHost);
      controller.hostConnected();
      
      expect(() => {
        controller.hostDisconnected();
        controller.hostDisconnected();
      }).to.not.throw();
    });
  });

  suite('Host State Management', () => {
    setup(() => {
      controller = new DropdownInteractionController(mockHost);
    });

    test('should handle disabled state changes', () => {
      (mockHost as any).disabled = false;
      (mockHost as any).isOpen = false;
      
      controller.open();
      expect((mockHost as any).isOpen).to.be.true;
      
      (mockHost as any).disabled = true;
      controller.close();
      controller.open();
      
      expect((mockHost as any).isOpen).to.be.false;
    });

    test('should maintain focus index state', () => {
      (mockHost as any).focusedIndex = 2;
      
      controller.open();
      expect((mockHost as any).focusedIndex).to.equal(-1);
      
      (mockHost as any).focusedIndex = 1;
      controller.close();
      expect((mockHost as any).focusedIndex).to.equal(-1);
    });
  });
});