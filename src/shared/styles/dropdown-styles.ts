import {css} from 'lit';

export const dropdownBaseStyles = css`
  .dropdown-container {
    position: relative;
    display: block;
    width: var(--dropdown-width, 100%);
    min-width: var(--dropdown-min-width, auto);
    max-width: var(--dropdown-max-width, 100%);
    box-sizing: border-box;
  }

  .dropdown-label {
    margin-bottom: var(--scientific-spacing-sm);
    display: block;
    font-size: var(--scientific-text-sm);
    font-weight: 500;
    color: var(--dropdown-label-color, var(--scientific-text-primary));
  }

  .dropdown-select {
    padding: var(--scientific-spacing-sm) var(--scientific-spacing-md);
    border: 1px solid var(--dropdown-border-color, var(--scientific-border-color));
    border-radius: var(--scientific-border-radius);
    background-color: var(--dropdown-bg-color, var(--scientific-bg-primary));
    color: var(--dropdown-color, var(--scientific-text-primary));
    font-size: var(--scientific-text-sm);
    cursor: pointer;
    transition: var(--scientific-transition);
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: var(--scientific-min-height, 20px);
    outline: none;
  }

  .dropdown-select:hover {
    border-color: var(--dropdown-hover-border-color, var(--scientific-border-hover));
  }

  .dropdown-select:focus {
    border-color: var(
      --dropdown-focus-border-color,
      var(--scientific-primary-color)
    );
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--scientific-primary-color) 10%, transparent);
  }

  .dropdown-select.open {
    border-color: var(
      --dropdown-focus-border-color,
      var(--scientific-primary-color)
    );
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  .dropdown-select.disabled {
    background-color: var(--dropdown-disabled-bg-color, var(--scientific-bg-tertiary));
    border-color: var(--dropdown-disabled-border-color, var(--scientific-border-color));
    color: var(--dropdown-disabled-color, var(--scientific-text-muted));
    cursor: not-allowed;
  }

  .dropdown-arrow {
    width: 0;
    height: 0;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 4px solid var(--dropdown-arrow-color, var(--scientific-text-muted));
    transition: transform var(--scientific-transition);
    margin-left: var(--scientific-spacing-sm);
  }

  .dropdown-arrow.open {
    transform: rotate(180deg);
  }

  .dropdown-placeholder {
    color: var(--dropdown-placeholder-color, var(--scientific-text-muted));
  }

  @media (max-width: 768px) {
    .dropdown-select {
      min-height: 22px;
    }
  }
`;

export const dropdownContainerStyles = css`
  .options-container {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    box-sizing: border-box;
    border: 1px solid var(--dropdown-border-color, var(--scientific-border-color));
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-bottom-left-radius: var(--scientific-border-radius);
    border-bottom-right-radius: var(--scientific-border-radius);
    background-color: var(--dropdown-options-bg-color, var(--scientific-bg-primary));
    box-shadow: var(--scientific-shadow-lg);
    max-height: var(--dropdown-max-height, 200px);
    overflow: hidden;
    animation: slideDown 0.15s ease-out;
    display: flex;
    flex-direction: column;
    z-index: 1000;
  }

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-4px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .options-list {
    overflow-y: auto;
    flex: 1;
    max-height: inherit;
  }

  .option {
    padding: var(--scientific-spacing-sm) var(--scientific-spacing-md);
    cursor: pointer;
    transition: background-color var(--scientific-transition-fast);
    border-bottom: 1px solid var(--dropdown-option-border-color, var(--scientific-border-color));
    color: var(--dropdown-option-color, var(--scientific-text-primary));
    font-size: var(--scientific-text-sm);
    display: flex;
    align-items: center;
    gap: var(--scientific-spacing-sm);
  }

  .option:last-child {
    border-bottom: none;
  }

  .option:hover {
    background-color: var(--dropdown-option-hover-bg-color, var(--scientific-bg-tertiary));
  }

  .option.selected {
    background-color: var(--dropdown-option-selected-bg-color, color-mix(in srgb, var(--scientific-primary-color) 10%, transparent));
    color: var(
      --dropdown-option-selected-color,
      var(--scientific-primary-color)
    );
    font-weight: 500;
  }

  .option.focused,
  .option.highlighted {
    background-color: var(--dropdown-option-focused-bg-color, var(--scientific-bg-tertiary));
  }

  .option.disabled {
    background-color: var(--dropdown-option-disabled-bg-color, var(--scientific-bg-tertiary));
    color: var(--dropdown-option-disabled-color, var(--scientific-text-muted));
    cursor: not-allowed;
  }

  .option-group {
    padding: var(--scientific-spacing-sm) var(--scientific-spacing-md)
      var(--scientific-spacing-xs);
    font-size: var(--scientific-text-xs);
    font-weight: 600;
    color: var(--dropdown-group-color, var(--scientific-text-tertiary));
    text-transform: uppercase;
    letter-spacing: 0.05em;
    background-color: var(--dropdown-group-bg-color, var(--scientific-bg-secondary));
    border-bottom: 1px solid var(--dropdown-option-border-color, var(--scientific-border-color));
  }

  .no-options {
    padding: var(--scientific-spacing-md);
    text-align: center;
    color: var(--dropdown-no-options-color, var(--scientific-text-muted));
    font-style: italic;
    font-size: var(--scientific-text-sm);
  }

  .search-input {
    width: 100%;
    border: none;
    border-bottom: 1px solid var(--dropdown-search-border-color, var(--scientific-border-color));
    background-color: var(--dropdown-search-bg-color, var(--scientific-bg-secondary));
    font-size: var(--scientific-text-sm);
    padding: var(--scientific-spacing-sm) var(--scientific-spacing-md);
    box-sizing: border-box;
    outline: none;
    font-family: inherit;
    color: var(--dropdown-search-color, var(--scientific-text-primary));
  }

  .search-input:focus {
    background-color: var(--dropdown-search-focus-bg-color, var(--scientific-bg-primary));
  }

  @media (max-width: 768px) {
    .options-container {
      max-height: var(--dropdown-mobile-max-height, 150px);
    }
  }
`;

export const clearButtonStyles = css`
  .clear-button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0 var(--scientific-spacing-xs);
    color: var(--clear-button-color, var(--scientific-text-muted));
    font-size: 14px;
    line-height: 1;
    transition: color var(--scientific-transition);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .clear-button:hover {
    color: var(--clear-button-hover-color, var(--scientific-danger-color));
  }
`;
