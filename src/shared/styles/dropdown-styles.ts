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
    color: var(--dropdown-label-color, #374151);
  }

  .dropdown-select {
    padding: var(--scientific-spacing-sm) var(--scientific-spacing-md);
    border: 1px solid var(--dropdown-border-color, #d1d5db);
    border-radius: var(--scientific-border-radius);
    background-color: var(--dropdown-bg-color, #ffffff);
    color: var(--dropdown-color, #374151);
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
    border-color: var(--dropdown-hover-border-color, #9ca3af);
  }

  .dropdown-select:focus {
    border-color: var(
      --dropdown-focus-border-color,
      var(--scientific-primary-color)
    );
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
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
    background-color: #f9fafb;
    border-color: #e5e7eb;
    color: #9ca3af;
    cursor: not-allowed;
  }

  .dropdown-arrow {
    width: 0;
    height: 0;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 4px solid var(--dropdown-arrow-color, #6b7280);
    transition: transform var(--scientific-transition);
    margin-left: var(--scientific-spacing-sm);
  }

  .dropdown-arrow.open {
    transform: rotate(180deg);
  }

  .dropdown-placeholder {
    color: var(--dropdown-placeholder-color, #9ca3af);
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
    border: 1px solid var(--dropdown-border-color, #d1d5db);
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-bottom-left-radius: var(--scientific-border-radius);
    border-bottom-right-radius: var(--scientific-border-radius);
    background-color: var(--dropdown-options-bg-color, #ffffff);
    box-shadow: var(--scientific-shadow-lg);
    z-index: var(--dropdown-z-index, 1000);
    max-height: var(--dropdown-max-height, 200px);
    overflow: hidden;
    animation: slideDown 0.15s ease-out;
    display: flex;
    flex-direction: column;
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
    border-bottom: 1px solid var(--dropdown-option-border-color, #f3f4f6);
    color: var(--dropdown-option-color, #374151);
    font-size: var(--scientific-text-sm);
    display: flex;
    align-items: center;
    gap: var(--scientific-spacing-sm);
  }

  .option:last-child {
    border-bottom: none;
  }

  .option:hover {
    background-color: var(--dropdown-option-hover-bg-color, #f9fafb);
  }

  .option.selected {
    background-color: var(--dropdown-option-selected-bg-color, #eff6ff);
    color: var(
      --dropdown-option-selected-color,
      var(--scientific-primary-color)
    );
    font-weight: 500;
  }

  .option.focused,
  .option.highlighted {
    background-color: var(--dropdown-option-focused-bg-color, #f3f4f6);
  }

  .option.disabled {
    background-color: var(--dropdown-option-disabled-bg-color, #f9fafb);
    color: var(--dropdown-option-disabled-color, #9ca3af);
    cursor: not-allowed;
  }

  .option-group {
    padding: var(--scientific-spacing-sm) var(--scientific-spacing-md)
      var(--scientific-spacing-xs);
    font-size: var(--scientific-text-xs);
    font-weight: 600;
    color: var(--dropdown-group-color, #6b7280);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    background-color: var(--dropdown-group-bg-color, #f9fafb);
    border-bottom: 1px solid var(--dropdown-option-border-color, #f3f4f6);
  }

  .no-options {
    padding: var(--scientific-spacing-md);
    text-align: center;
    color: var(--dropdown-no-options-color, #9ca3af);
    font-style: italic;
    font-size: var(--scientific-text-sm);
  }

  .search-input {
    width: 100%;
    border: none;
    border-bottom: 1px solid var(--dropdown-search-border-color, #e5e7eb);
    background-color: var(--dropdown-search-bg-color, #f9fafb);
    font-size: var(--scientific-text-sm);
    padding: var(--scientific-spacing-sm) var(--scientific-spacing-md);
    box-sizing: border-box;
    outline: none;
    font-family: inherit;
    color: var(--dropdown-search-color, #374151);
  }

  .search-input:focus {
    background-color: var(--dropdown-search-focus-bg-color, #ffffff);
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
    color: var(--clear-button-color, #6b7280);
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
