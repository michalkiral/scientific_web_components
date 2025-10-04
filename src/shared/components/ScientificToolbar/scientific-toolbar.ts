import {html, css, nothing, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {
  sharedVariables,
  themeStyles,
  type ScientificTheme,
} from '../../styles/common-styles.js';
import '../../../Button/scientific-button.js';
import '../../../Dropdown/scientific-dropdown.js';

export interface ToolbarButtonDescriptor {
  id: string;
  label: string;
  variant: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
  title: string;
  handler: () => void;
  icon?: string;
  visible?: boolean;
  disabled?: boolean;
}

export interface ToolbarDropdownDescriptor {
  id: string;
  label: string;
  options: Array<{value: string; label: string}>;
  selectedValue?: string;
  placeholder?: string;
  handler: (event: CustomEvent) => void;
  disabled?: boolean;
  visible?: boolean;
  style?: string;
}

export interface ToolbarSection {
  id: string;
  title: string;
  buttons?: ToolbarButtonDescriptor[];
  dropdowns?: ToolbarDropdownDescriptor[];
  className?: string;
  visible?: boolean;
}

@customElement('scientific-toolbar')
export class ScientificToolbar extends LitElement {
  static override styles = [
    sharedVariables,
    themeStyles,
    css`
      :host {
        display: block;
        width: 100%;
      }

      .toolbar-container {
        display: flex;
        flex-direction: column;
        gap: var(--scientific-spacing-md);
        padding: var(--scientific-spacing-md);
        background: var(--scientific-bg-primary);
        border-bottom: var(--scientific-border);
      }

      .toolbar-section {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--scientific-spacing-sm);
      }

      .section-title {
        font-size: var(--scientific-text-sm);
        font-weight: 600;
        color: var(--scientific-text-secondary);
        margin-bottom: var(--scientific-spacing-xs);
        text-transform: uppercase;
      }

      .button-group {
        display: flex;
        flex-wrap: wrap;
        gap: var(--scientific-spacing-sm);
        justify-content: center;
      }

      .dropdown-group {
        display: flex;
        flex-direction: column;
        gap: var(--scientific-spacing-sm);
        width: 100%;
      }

      @media (min-width: 768px) {
        .toolbar-container {
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
        }

        .toolbar-section {
          flex-direction: column;
          flex: 1;
        }

        .button-group {
          justify-content: center;
        }

        .dropdown-group {
          width: auto;
        }
      }

      .toolbar-container.grid-2 {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--scientific-spacing-md);
        border: none;
      }

      .toolbar-container.grid-3 {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: var(--scientific-spacing-md);
        border: none;
      }

      .toolbar-container.grid-4 {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        gap: var(--scientific-spacing-md);
        border: none;
      }

      .toolbar-container.grid-5 {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
        gap: var(--scientific-spacing-md);
        border: none;
      }

      @media (max-width: 767px) {
        .toolbar-container.grid-2,
        .toolbar-container.grid-3,
        .toolbar-container.grid-4,
        .toolbar-container.grid-5 {
          display: flex;
          flex-direction: column;
        }
      }

      .zoom-buttons {
        display: flex;
        gap: var(--scientific-spacing-xs);
      }

      .interactive-section .button-group {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--scientific-spacing-sm);
      }

      @media (min-width: 768px) {
        .interactive-section .button-group {
          display: grid;
          grid-template-columns: 1fr 1fr;
        }
      }

      .toolbar-section:empty {
        display: none;
      }
    `,
  ];

  @property({type: Array, attribute: false}) sections: ToolbarSection[] = [];
  @property({type: String}) layout: 'auto' | 'grid-2' | 'grid-3' | 'grid-4' | 'grid-5' = 'auto';
  @property({type: String, reflect: true}) theme: ScientificTheme = 'default';

  override render() {
    const visibleSections = this.sections.filter(section => section.visible !== false);
    
    if (visibleSections.length === 0) {
      return nothing;
    }

    const containerClass = this.layout === 'auto' 
      ? `grid-${visibleSections.length}` 
      : this.layout;

    return html`
      <div class="toolbar-container ${containerClass}">
        ${visibleSections.map(section => this._renderSection(section))}
      </div>
    `;
  }

  private _renderSection(section: ToolbarSection) {
    const sectionClass = section.className || section.id;
    
    return html`
      <div class="toolbar-section ${sectionClass}">
        ${section.title ? html`<div class="section-title">${section.title}</div>` : nothing}
        
        ${section.buttons && section.buttons.length > 0 
          ? this._renderButtonGroup(section.buttons.filter(btn => btn.visible !== false))
          : nothing
        }
        
        ${section.dropdowns && section.dropdowns.length > 0
          ? this._renderDropdownGroup(section.dropdowns.filter(dd => dd.visible !== false))
          : nothing
        }
      </div>
    `;
  }

  private _renderButtonGroup(buttons: ToolbarButtonDescriptor[]) {
    if (buttons.length === 0) {
        return nothing;
    }

    return html`
      <div class="button-group">
        ${buttons.map(button => html`
          <scientific-button
            variant="${button.variant}"
            size="small"
            label="${button.label}"
            icon="${button.icon || ''}"
            .theme="${this.theme}"
            .disabled="${button.disabled || false}"
            @click="${button.handler}"
            title="${button.title}"
          ></scientific-button>
        `)}
      </div>
    `;
  }

  private _renderDropdownGroup(dropdowns: ToolbarDropdownDescriptor[]) {
    if (dropdowns.length === 0) {
        return nothing;
    }

    return html`
      <div class="dropdown-group">
        ${dropdowns.map(dropdown => html`
          <scientific-dropdown
            .label="${dropdown.label}"
            .options="${dropdown.options}"
            .selectedValue="${dropdown.selectedValue || ''}"
            .placeholder="${dropdown.placeholder || 'Select an option'}"
            .disabled="${dropdown.disabled || false}"
            .theme="${this.theme}"
            style="${dropdown.style || ''}"
            @change="${dropdown.handler}"
          ></scientific-dropdown>
        `)}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'scientific-toolbar': ScientificToolbar;
  }
}