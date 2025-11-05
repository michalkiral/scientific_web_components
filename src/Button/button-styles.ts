import {css} from 'lit';

export const buttonStyles = css`
  .scientific-button {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--button-gap, var(--scientific-spacing-sm));
    font-family: var(--button-font-family, var(--scientific-font-family));
    font-size: var(--button-font-size, var(--scientific-text-base));
    font-weight: var(--button-font-weight, 500);
    line-height: var(--button-line-height, 1.5);
    padding: var(
      --button-padding,
      var(--scientific-spacing-md) var(--scientific-spacing-2xl)
    );
    min-height: var(--button-min-height, 48px);
    border: var(--button-border, var(--scientific-border));
    border-radius: var(--button-border-radius, var(--scientific-border-radius));
    background-color: var(--button-bg-color, var(--scientific-primary-color));
    color: var(--button-color, #ffffff);
    cursor: pointer;
    transition: var(--button-transition, var(--scientific-transition));
    box-shadow: var(--button-shadow, var(--scientific-shadow-sm));
    text-decoration: none;
    outline: none;
    user-select: none;
    width: var(--button-width, auto);
    max-width: var(--button-max-width, 100%);
  }

  .scientific-button:hover {
    background-color: var(
      --button-hover-bg-color,
      var(--scientific-primary-hover)
    );
    box-shadow: var(--button-hover-shadow, var(--scientific-shadow));
    transform: var(--button-hover-transform, translateY(-1px));
  }

  .scientific-button:focus {
    outline: none;
    box-shadow: var(--button-focus-shadow, 0 0 0 3px rgba(0, 123, 255, 0.25));
    border-color: var(
      --button-focus-border-color,
      var(--scientific-border-focus)
    );
  }

  .scientific-button:active {
    transform: var(--button-active-transform, translateY(0));
    box-shadow: var(--button-active-shadow, var(--scientific-shadow-sm));
  }

  .scientific-button:disabled {
    background-color: var(--button-disabled-bg-color, var(--scientific-bg-tertiary));
    color: var(--button-disabled-color, var(--scientific-text-muted));
    border-color: var(--button-disabled-border-color, var(--scientific-border-color));
    cursor: not-allowed;
    box-shadow: none;
    transform: none;
  }

  .scientific-button:disabled:hover {
    background-color: var(--button-disabled-bg-color, var(--scientific-bg-tertiary));
    box-shadow: none;
    transform: none;
  }

  .scientific-button.secondary {
    background-color: var(
      --button-secondary-bg-color,
      var(--scientific-secondary-color)
    );
    color: var(--button-secondary-color, var(--scientific-text-primary));
  }

  .scientific-button.secondary:hover {
    background-color: var(--button-secondary-hover-bg-color, var(--scientific-bg-secondary));
  }

  .scientific-button.outline {
    background-color: var(--button-outline-bg-color, transparent);
    color: var(--button-outline-color, var(--scientific-primary-color));
    border-color: var(
      --button-outline-border-color,
      var(--scientific-primary-color)
    );
  }

  .scientific-button.outline:hover {
    background-color: var(
      --button-outline-hover-bg-color,
      var(--scientific-primary-color)
    );
    color: var(--button-outline-hover-color, var(--scientific-bg-primary));
  }

  .scientific-button.ghost {
    background-color: var(--button-ghost-bg-color, transparent);
    color: var(--button-ghost-color, var(--scientific-primary-color));
    border-color: var(--button-ghost-border-color, transparent);
    box-shadow: none;
  }

  .scientific-button.ghost:hover {
    background-color: var(
      --button-ghost-hover-bg-color,
      color-mix(in srgb, var(--scientific-primary-color) 10%, transparent)
    );
  }

  .scientific-button.danger {
    background-color: var(
      --button-danger-bg-color,
      var(--scientific-danger-color)
    );
    color: var(--button-danger-color, var(--scientific-bg-primary));
  }

  .scientific-button.danger:hover {
    background-color: var(--button-danger-hover-bg-color, color-mix(in srgb, var(--scientific-danger-color) 90%, black));
  }

  .scientific-button.success {
    background-color: var(
      --button-success-bg-color,
      var(--scientific-success-color)
    );
    color: var(--button-success-color, var(--scientific-bg-primary));
  }

  .scientific-button.success:hover {
    background-color: var(--button-success-hover-bg-color, color-mix(in srgb, var(--scientific-success-color) 90%, black));
  }

  .scientific-button.secondary:disabled {
    background-color: var(--button-disabled-bg-color, var(--scientific-bg-tertiary));
    color: var(--button-disabled-color, var(--scientific-text-muted));
    border-color: var(--button-disabled-border-color, var(--scientific-border-color));
  }

  .scientific-button.secondary:disabled:hover {
    background-color: var(--button-disabled-bg-color, var(--scientific-bg-tertiary));
  }

  .scientific-button.outline:disabled {
    background-color: var(--button-outline-disabled-bg-color, transparent);
    color: var(--button-outline-disabled-color, var(--scientific-text-muted));
    border-color: var(--button-outline-disabled-border-color, var(--scientific-border-color));
  }

  .scientific-button.outline:disabled:hover {
    background-color: var(--button-outline-disabled-bg-color, transparent);
    color: var(--button-outline-disabled-color, var(--scientific-text-muted));
  }

  .scientific-button.ghost:disabled {
    background-color: var(--button-ghost-disabled-bg-color, transparent);
    color: var(--button-ghost-disabled-color, var(--scientific-text-muted));
    border-color: var(--button-ghost-disabled-border-color, transparent);
  }

  .scientific-button.ghost:disabled:hover {
    background-color: var(--button-ghost-disabled-bg-color, transparent);
    color: var(--button-ghost-disabled-color, var(--scientific-text-muted));
  }

  .scientific-button.danger:disabled {
    background-color: var(--button-danger-disabled-bg-color, var(--scientific-bg-tertiary));
    color: var(--button-danger-disabled-color, var(--scientific-text-muted));
    border-color: var(--button-danger-disabled-border-color, var(--scientific-border-color));
  }

  .scientific-button.danger:disabled:hover {
    background-color: var(--button-danger-disabled-bg-color, var(--scientific-bg-tertiary));
  }

  .scientific-button.success:disabled {
    background-color: var(--button-success-disabled-bg-color, var(--scientific-bg-tertiary));
    color: var(--button-success-disabled-color, var(--scientific-text-muted));
    border-color: var(--button-success-disabled-border-color, var(--scientific-border-color));
  }

  .scientific-button.success:disabled:hover {
    background-color: var(--button-success-disabled-bg-color, var(--scientific-bg-tertiary));
  }

  .scientific-button.small {
    font-size: var(--button-small-font-size, var(--scientific-text-sm));
    padding: var(
      --button-small-padding,
      var(--scientific-spacing-sm) var(--scientific-spacing-lg)
    );
    min-height: var(--button-small-min-height, 36px);
  }

  .scientific-button.large {
    font-size: var(--button-large-font-size, var(--scientific-text-lg));
    padding: var(
      --button-large-padding,
      var(--scientific-spacing-lg) var(--scientific-spacing-2xl)
    );
    min-height: var(--button-large-min-height, 56px);
  }

  .scientific-button.loading {
    pointer-events: none;
  }
  
  .scientific-button.loading-text-only {
    pointer-events: none;
  }

  .scientific-button.full-width {
    width: 100%;
  }

  .button-icon {
    display: inline-flex;
    align-items: center;
    width: var(--button-icon-size, 18px);
    height: var(--button-icon-size, 18px);
  }

  .button-icon svg {
    width: 100%;
    height: 100%;
    fill: currentColor;
  }
`;
