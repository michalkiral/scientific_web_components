import {css} from 'lit';

export const inputContainerStyles = css`
  .input-container {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: var(--scientific-spacing-sm);
    width: 100%;
  }

  .input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
  }

  .input-field {
    position: relative;
    padding: var(
      --input-padding,
      var(--scientific-spacing-md) var(--scientific-spacing-lg)
    );
    font-size: var(--input-font-size, var(--scientific-text-base));
    min-height: var(--input-min-height, 20px);
    background: transparent;
  }

  .input-field.scientific-input.required {
    border-color: var(--scientific-danger-color);
    color: var(--scientific-danger-color);
  }

  :host(.dropdown-open) .input-field {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  .input-label {
    margin-bottom: var(--scientific-spacing-sm);
    display: block;
    font-size: var(--scientific-text-sm);
    font-weight: 500;
    color: var(--input-label-color, var(--scientific-text-primary));
  }

  .input-label.required::after {
    content: ' *';
    color: var(--scientific-danger-color);
  }

  .input-icon {
    position: absolute;
    right: var(--scientific-spacing-md);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--scientific-text-muted);
    pointer-events: none;
  }
`;

export const autocompleteStyles = css`
  .autocomplete-hint {
    position: absolute;
    padding: var(
      --input-padding,
      var(--scientific-spacing-md) var(--scientific-spacing-lg)
    );
    border: 1px solid transparent;
    border-radius: var(--scientific-border-radius);
    background: transparent;
    color: color-mix(in srgb, var(--scientific-text-muted) 50%, transparent);
    font-size: var(--input-font-size, var(--scientific-text-base));
    font-family: inherit;
    pointer-events: none;
    white-space: nowrap;
    overflow: hidden;
  }
`;

export const inputClearButtonStyles = css`
  .clear-button {
    position: absolute;
    right: var(--scientific-spacing-md);
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--input-clear-size, 20px);
    height: var(--input-clear-size, 20px);
    background: transparent;
    border: none;
    cursor: pointer;
    color: var(--scientific-text-muted);
    transition: var(--scientific-transition-fast);
    padding: 0;
    font-size: var(--scientific-text-xs);
    font-weight: 500;
  }

  .clear-button:hover {
    background-color: var(--scientific-bg-tertiary);
    color: var(--scientific-text-secondary);
    transform: scale(1.1);
  }

  .clear-button:active {
    transform: scale(0.95);
  }

  .clear-button svg {
    width: 12px;
    height: 12px;
    display: block;
  }
`;
