import {ReactiveController, ReactiveControllerHost} from 'lit';
import {
  handleDropdownKeyboard,
  createClickOutsideHandler,
  type DropdownKeyboardHandlerConfig,
  type DropdownKeyboardHandler,
} from './dropdown-utils.js';

export interface DropdownInteractionHost
  extends ReactiveControllerHost,
    DropdownKeyboardHandler,
    HTMLElement {
  disabled?: boolean;
}

export interface DropdownInteractionOptions {
  keyboardConfig?: (event: KeyboardEvent) => DropdownKeyboardHandlerConfig;
  onBeforeOpen?: () => boolean | void;
  onOpen?: () => void;
  onClose?: () => void;
  onToggle?: (isOpen: boolean) => void;
}

export class DropdownInteractionController implements ReactiveController {
  private readonly handleClickOutside: (event: Event) => void;

  constructor(
    private readonly host: DropdownInteractionHost,
    private readonly options: DropdownInteractionOptions = {}
  ) {
    this.handleClickOutside = createClickOutsideHandler(host, () => this.close());
    host.addController?.(this);
  }

  hostConnected(): void {
    document.addEventListener('click', this.handleClickOutside);
  }

  hostDisconnected(): void {
    document.removeEventListener('click', this.handleClickOutside);
  }

  open(): void {
    if (this.host.disabled || this.host.isOpen) {
      return;
    }

    const shouldOpen = this.options.onBeforeOpen?.();
    if (shouldOpen === false) {
      return;
    }

    this.host.focusedIndex = -1;
    this.host.isOpen = true;
    this.host.requestUpdate?.();

    this.options.onOpen?.();
    this.options.onToggle?.(true);
  }

  close(): void {
    if (!this.host.isOpen) {
      return;
    }

    this.host.isOpen = false;
    this.host.focusedIndex = -1;
    this.host.requestUpdate?.();

    this.options.onClose?.();
    this.options.onToggle?.(false);
  }

  toggle(): void {
    if (this.host.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  handleKeyDown(event: KeyboardEvent): void {
    const config = this.options.keyboardConfig
      ? this.options.keyboardConfig(event)
      : undefined;

    handleDropdownKeyboard.call(this.host, event, config ?? {});
  }

  dispose(): void {
    this.hostDisconnected();
  }
}
