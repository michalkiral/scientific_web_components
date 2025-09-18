import {css} from 'lit';

export const dropdownContainerStyles = css`
  .dropdown-container {
    position: absolute;
    top: calc(100% - 1px);
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
    .dropdown-container {
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
