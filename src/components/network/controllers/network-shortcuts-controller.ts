import {ReactiveController, ReactiveControllerHost} from 'lit';
import {dispatchCustomEvent} from '../../../shared/utils/event-utils.js';
import {DEFAULT_NETWORK_SHORTCUTS} from '../network-shortcuts.js';

export interface KeyboardShortcut {
  action: string;
  description: string;
}

export interface ShortcutEventDetail {
  key: string;
  action: string;
  description: string;
}

export class NetworkShortcutsController implements ReactiveController {
  private host: ReactiveControllerHost & HTMLElement;
  private keyboardHandler: ((event: KeyboardEvent) => void) | null = null;
  private shortcuts = new Map<string, KeyboardShortcut>();

  constructor(host: ReactiveControllerHost & HTMLElement) {
    this.host = host;
    host.addController(this);
  }

  hostConnected(): void {
    this.setupKeyboardListeners();
  }

  hostDisconnected(): void {
    this.removeKeyboardListeners();
  }

  registerShortcut(key: string, action: string, description: string): void {
    this.shortcuts.set(key, {action, description});
  }

  registerShortcuts(shortcuts: Record<string, Omit<KeyboardShortcut, 'key'>>): void {
    Object.entries(shortcuts).forEach(([key, {action, description}]) => {
      this.registerShortcut(key, action, description);
    });
  }

  unregisterShortcut(key: string): void {
    this.shortcuts.delete(key);
  }

  getShortcuts(): Map<string, KeyboardShortcut> {
    return new Map(this.shortcuts);
  }

  clearShortcuts(): void {
    this.shortcuts.clear();
  }

  private isTypingInInputField(target: EventTarget | null): boolean {
    if (!target) {
        return false;
    }

    const element = target as HTMLElement;
    return (
      element instanceof HTMLInputElement ||
      element instanceof HTMLTextAreaElement ||
      element instanceof HTMLSelectElement ||
      element.contentEditable === 'true'
    );
  }

  private setupKeyboardListeners(): void {
    if (this.keyboardHandler) {
      document.removeEventListener('keydown', this.keyboardHandler);
    }

    this.keyboardHandler = (event: KeyboardEvent) => {
      if (this.isTypingInInputField(event.target)) {
        return;
      }

      if (event.ctrlKey || event.altKey || event.metaKey) {
        return;
      }

      const shortcut = this.shortcuts.get(event.key);
      if (shortcut) {
        event.preventDefault();
        event.stopPropagation();

        dispatchCustomEvent(this.host, 'keyboard-shortcut', {
          key: event.key,
          action: shortcut.action,
          description: shortcut.description,
        } as ShortcutEventDetail);

        dispatchCustomEvent(this.host, `shortcut-${shortcut.action}`, {
          key: event.key,
          originalEvent: event,
        });
      }
    };

    document.addEventListener('keydown', this.keyboardHandler, {capture: true});
  }

  private removeKeyboardListeners(): void {
    if (this.keyboardHandler) {
      document.removeEventListener('keydown', this.keyboardHandler);
      this.keyboardHandler = null;
    }
  }

  static createDefaultNetworkShortcuts(): Record<string, Omit<KeyboardShortcut, 'key'>> {
    return DEFAULT_NETWORK_SHORTCUTS;
  }

  getHelpText(): string[] {
    const helpLines: string[] = [];
    this.shortcuts.forEach((shortcut, key) => {
      helpLines.push(`${key}: ${shortcut.description}`);
    });
    return helpLines.sort();
  }

  hasShortcut(key: string): boolean {
    return this.shortcuts.has(key);
  }

  getShortcut(key: string): KeyboardShortcut | undefined {
    return this.shortcuts.get(key);
  }
}