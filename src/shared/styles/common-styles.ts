import {css} from 'lit';

export const sharedVariables = css`
  :host {
    --scientific-font-family: system-ui, -apple-system, BlinkMacSystemFont,
      'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;

    --scientific-primary-color: #007bff;
    --scientific-primary-hover: #0056b3;
    --scientific-secondary-color: #6c757d;
    --scientific-success-color: #28a745;
    --scientific-danger-color: #dc3545;
    --scientific-warning-color: #ffc107;
    --scientific-info-color: #17a2b8;

    --scientific-border-radius: 8px;
    --scientific-border-radius-lg: 12px;
    --scientific-border: 2px solid #e5e7eb;
    --scientific-border-color: #e5e7eb;
    --scientific-border-hover: #d1d5db;
    --scientific-border-focus: #007bff;

    --scientific-shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
    --scientific-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    --scientific-shadow-lg: 0 8px 12px rgba(0, 0, 0, 0.15);
    --scientific-shadow-xl: 0 20px 40px rgba(0, 0, 0, 0.1);

    --scientific-spacing-xs: 4px;
    --scientific-spacing-sm: 8px;
    --scientific-spacing-md: 12px;
    --scientific-spacing-lg: 16px;
    --scientific-spacing-xl: 20px;
    --scientific-spacing-2xl: 24px;

    --scientific-text-xs: 12px;
    --scientific-text-sm: 14px;
    --scientific-text-base: 16px;
    --scientific-text-lg: 18px;
    --scientific-text-xl: 20px;
    --scientific-text-2xl: 24px;

    --scientific-transition: all 0.2s ease-in-out;
    --scientific-transition-fast: all 0.15s ease-out;
    --scientific-transition-slow: all 0.3s ease-in-out;
  }
`;

export const loadingSpinnerStyles = css`
  .loading-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--loading-overlay-bg, rgba(255, 255, 255, 0.8));
    border-radius: inherit;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: var(--loading-z-index, 10);
  }

  .loading-spinner {
    width: var(--loading-spinner-size, 32px);
    height: var(--loading-spinner-size, 32px);
    border: 3px solid var(--loading-spinner-color, #e5e7eb);
    border-top: 3px solid var(--loading-spinner-active-color, #007bff);
    border-radius: 50%;
    animation: scientific-spin 1s linear infinite;
  }

  @keyframes scientific-spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const containerStyles = css`
  .scientific-container {
    position: relative;
    background-color: var(--container-bg-color, #ffffff);
    border: var(--container-border, var(--scientific-border));
    border-radius: var(
      --container-border-radius,
      var(--scientific-border-radius-lg)
    );
    padding: var(--container-padding, var(--scientific-spacing-2xl));
    margin: var(--container-margin, 0);
    box-shadow: var(--container-shadow, var(--scientific-shadow));
    transition: var(--container-transition, var(--scientific-transition));
    font-family: var(--container-font-family, var(--scientific-font-family));
    display: flex;
    flex-direction: column;
    gap: var(--container-gap, var(--scientific-spacing-xl));
  }

  .scientific-container:hover {
    box-shadow: var(--container-hover-shadow, var(--scientific-shadow-lg));
  }

  .scientific-container.disabled {
    opacity: var(--container-disabled-opacity, 0.6);
    pointer-events: none;
  }

  .scientific-container.compact {
    padding: var(--container-compact-padding, var(--scientific-spacing-lg));
    gap: var(--container-compact-gap, var(--scientific-spacing-md));
  }
`;

export const headerStyles = css`
  .scientific-header {
    display: flex;
    flex-direction: column;
    gap: var(--header-gap, var(--scientific-spacing-sm));
    padding-bottom: var(--header-padding-bottom, var(--scientific-spacing-lg));
    border-bottom: var(--header-border, 1px solid #f3f4f6);
  }

  .scientific-title {
    font-size: var(--title-font-size, var(--scientific-text-2xl));
    font-weight: var(--title-font-weight, 600);
    color: var(--title-color, #111827);
    margin: 0;
    line-height: var(--title-line-height, 1.2);
  }

  .scientific-subtitle {
    font-size: var(--subtitle-font-size, var(--scientific-text-base));
    font-weight: var(--subtitle-font-weight, 400);
    color: var(--subtitle-color, #6b7280);
    margin: 0;
    line-height: var(--subtitle-line-height, 1.4);
  }
`;

export const inputStyles = css`
  .scientific-input {
    width: 100%;
    padding: var(
      --input-padding,
      var(--scientific-spacing-md) var(--scientific-spacing-lg)
    );
    border: var(--input-border, var(--scientific-border));
    border-radius: var(--input-border-radius, var(--scientific-border-radius));
    background-color: var(--input-bg-color, #ffffff);
    color: var(--input-color, #374151);
    font-size: var(--input-font-size, var(--scientific-text-base));
    font-family: inherit;
    transition: var(--input-transition, var(--scientific-transition));
    outline: none;
  }

  .scientific-input:hover {
    border-color: var(
      --input-hover-border-color,
      var(--scientific-border-hover)
    );
  }

  .scientific-input:focus {
    border-color: var(
      --input-focus-border-color,
      var(--scientific-border-focus)
    );
    box-shadow: var(--input-focus-shadow, 0 0 0 3px rgba(0, 123, 255, 0.1));
  }

  .scientific-input:disabled {
    background-color: var(--input-disabled-bg-color, #f9fafb);
    border-color: var(--input-disabled-border-color, #e5e7eb);
    color: var(--input-disabled-color, #9ca3af);
    cursor: not-allowed;
  }
`;

export const messageStyles = css`
  .scientific-error {
    background-color: var(--error-bg-color, #fef2f2);
    border: var(--error-border, 1px solid #fecaca);
    border-radius: var(--error-border-radius, var(--scientific-border-radius));
    padding: var(
      --error-padding,
      var(--scientific-spacing-md) var(--scientific-spacing-lg)
    );
    color: var(--error-color, var(--scientific-danger-color));
    font-size: var(--error-font-size, var(--scientific-text-sm));
    display: flex;
    align-items: center;
    gap: var(--scientific-spacing-sm);
  }

  .scientific-success {
    background-color: var(--success-bg-color, #f0fdf4);
    border: var(--success-border, 1px solid #bbf7d0);
    border-radius: var(
      --success-border-radius,
      var(--scientific-border-radius)
    );
    padding: var(
      --success-padding,
      var(--scientific-spacing-md) var(--scientific-spacing-lg)
    );
    color: var(--success-color, var(--scientific-success-color));
    font-size: var(--success-font-size, var(--scientific-text-sm));
    display: flex;
    align-items: center;
    gap: var(--scientific-spacing-sm);
  }
`;

export const responsiveStyles = css`
  @media (max-width: 768px) {
    .scientific-container {
      padding: var(--container-mobile-padding, var(--scientific-spacing-lg));
      margin: var(--container-mobile-margin, 0);
      border-radius: var(
        --container-mobile-border-radius,
        var(--scientific-border-radius)
      );
    }

    .scientific-header {
      padding-bottom: var(
        --header-mobile-padding-bottom,
        var(--scientific-spacing-md)
      );
    }

    .scientific-title {
      font-size: var(--title-mobile-font-size, var(--scientific-text-xl));
    }

    .scientific-subtitle {
      font-size: var(--subtitle-mobile-font-size, var(--scientific-text-sm));
    }
  }
`;
