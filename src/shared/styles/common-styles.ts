import {css} from 'lit';
import type {ScientificTheme} from '../constants/themes.js';

export type {ScientificTheme};

export const sharedVariables = css`
  :host {
    --scientific-font-family: system-ui, -apple-system, BlinkMacSystemFont,
      'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;

    --scientific-border-radius: 8px;
    --scientific-border-radius-lg: 12px;

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

export const themeStyles = css`
  :host(:not([theme])),
  :host([theme='default']) {
    --scientific-primary-color: #007bff;
    --scientific-primary-hover: #0056b3;
    --scientific-secondary-color: #6c757d;
    --scientific-success-color: #28a745;
    --scientific-danger-color: #dc3545;
    --scientific-warning-color: #ffc107;
    --scientific-info-color: #17a2b8;

    --container-bg-color: #ffffff;
    --scientific-bg-primary: #ffffff;
    --scientific-bg-secondary: #f8f9fa;
    --scientific-bg-tertiary: #e9ecef;

    --scientific-border: 1px solid #e5e7eb;
    --scientific-border-color: #e5e7eb;
    --scientific-border-hover: #d1d5db;
    --scientific-border-focus: #007bff;

    --scientific-text-primary: #212529;
    --scientific-text-secondary: #495057;
    --scientific-text-tertiary: #6c757d;
    --scientific-text-muted: #adb5bd;
    --title-color: #212529;
    --subtitle-color: #6c757d;

    --scientific-shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
    --scientific-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    --scientific-shadow-lg: 0 8px 12px rgba(0, 0, 0, 0.15);
    --scientific-shadow-xl: 0 20px 40px rgba(0, 0, 0, 0.1);

    --loading-overlay-bg: rgba(255, 255, 255, 0.8);
    --loading-spinner-color: #e5e7eb;
    --loading-spinner-active-color: #007bff;

    --error-bg-color: #fef2f2;
    --error-border: 1px solid #fecaca;
    --error-color: #dc3545;
  }

  :host([theme='dark']) {
    --scientific-primary-color: #60a5fa;
    --scientific-primary-hover: #3b82f6;
    --scientific-secondary-color: #6b7280;
    --scientific-success-color: #10b981;
    --scientific-danger-color: #ef4444;
    --scientific-warning-color: #f59e0b;
    --scientific-info-color: #60a5fa;

    --container-bg-color: #1f2937;
    --scientific-bg-primary: #1f2937;
    --scientific-bg-secondary: #374151;
    --scientific-bg-tertiary: #4b5563;

    --scientific-border: 1px solid #374151;
    --scientific-border-color: #374151;
    --scientific-border-hover: #6b7280;
    --scientific-border-focus: #60a5fa;

    --scientific-text-primary: #f9fafb;
    --scientific-text-secondary: #d1d5db;
    --scientific-text-tertiary: #9ca3af;
    --scientific-text-muted: #6b7280;
    --title-color: #f9fafb;
    --subtitle-color: #d1d5db;
    color: var(--scientific-text-secondary);

    --scientific-shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.2);
    --scientific-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2);
    --scientific-shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2);
    --scientific-shadow-xl: 0 20px 40px rgba(0, 0, 0, 0.2);

    --loading-overlay-bg: rgba(31, 41, 55, 0.8);
    --loading-spinner-color: #4b5563;
    --loading-spinner-active-color: #60a5fa;

    --error-bg-color: rgba(239, 68, 68, 0.1);
    --error-border: 1px solid #ef4444;
    --error-color: #fca5a5;
  }

  :host([theme='scientific']) {
    --scientific-primary-color: #3b82f6;
    --scientific-primary-hover: #2563eb;
    --scientific-secondary-color: #64748b;
    --scientific-success-color: #059669;
    --scientific-danger-color: #dc2626;
    --scientific-warning-color: #d97706;
    --scientific-info-color: #0284c7;

    --container-bg-color: #f8fafc;
    --scientific-bg-primary: #f8fafc;
    --scientific-bg-secondary: #f1f5f9;
    --scientific-bg-tertiary: #e2e8f0;

    --scientific-border: 2px solid #e2e8f0;
    --scientific-border-color: #e2e8f0;
    --scientific-border-hover: #94a3b8;
    --scientific-border-focus: #3b82f6;

    --scientific-text-primary: #1e293b;
    --scientific-text-secondary: #334155;
    --scientific-text-tertiary: #64748b;
    --scientific-text-muted: #94a3b8;
    --title-color: #1e293b;
    --subtitle-color: #64748b;
    color: var(--scientific-text-secondary);

    --scientific-shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.03);
    --scientific-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
    --scientific-shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    --scientific-shadow-xl: 0 20px 40px rgba(0, 0, 0, 0.08);

    --scientific-font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
    --scientific-font-weight-normal: 400;
    --scientific-font-weight-medium: 500;
    --scientific-font-weight-semibold: 600;
  }

  :host([theme='scientific']) .scientific-container,
  :host([theme='scientific']) .scientific-button,
  :host([theme='scientific']) .scientific-input {
    border-width: 2px;
    box-shadow: var(--scientific-shadow);
  }

  :host([theme='scientific']) .scientific-header {
    border-bottom: var(--scientific-border);
    padding-bottom: var(--scientific-spacing-md);
    margin-bottom: var(--scientific-spacing-lg);
  }

  :host([theme='scientific']) .scientific-title {
    font-weight: var(--scientific-font-weight-semibold);
    color: var(--scientific-text-primary);
  }

  :host([theme='scientific']) .scientific-subtitle {
    font-weight: var(--scientific-font-weight-normal);
    color: var(--scientific-text-tertiary);
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
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: var(--loading-spinner-size, 32px);
    height: var(--loading-spinner-size, 32px);
    border: 3px solid var(--loading-spinner-color, #e5e7eb);
    border-top: 3px solid
      var(--loading-spinner-active-color, var(--scientific-primary-color));
    border-radius: 50%;
    animation: scientific-spin 1s linear infinite;
    z-index: 2;
  }

  @keyframes scientific-spin {
    0% {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    100% {
      transform: translate(-50%, -50%) rotate(360deg);
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
    border-bottom: var(
      --header-border,
      1px solid var(--scientific-border-color)
    );
  }

  .scientific-header.required::after {
    content: ' *';
    color: var(--required-indicator-color, var(--scientific-danger-color));
    font-weight: var(--required-indicator-weight, 600);
    margin-left: var(--required-indicator-spacing, 2px);
  }

  .scientific-title {
    font-size: var(--title-font-size, var(--scientific-text-2xl));
    font-weight: var(--title-font-weight, 600);
    color: var(--title-color, var(--scientific-text-primary));
    margin: 0;
    line-height: var(--title-line-height, 1.2);
  }

  .scientific-subtitle {
    font-size: var(--subtitle-font-size, var(--scientific-text-base));
    font-weight: var(--subtitle-font-weight, 400);
    color: var(--subtitle-color, var(--scientific-text-tertiary));
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
    background-color: var(--input-bg-color, var(--scientific-bg-primary));
    color: var(--input-color, var(--scientific-text-secondary));
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
    box-shadow: var(--input-focus-shadow, 0 0 0 3px color-mix(in srgb, var(--scientific-primary-color) 10%, transparent));
  }

  .scientific-input:disabled {
    background-color: var(--input-disabled-bg-color, var(--scientific-bg-tertiary));
    border-color: var(--input-disabled-border-color, var(--scientific-border-color));
    color: var(--input-disabled-color, var(--scientific-text-muted));
    cursor: not-allowed;
  }
`;

export const messageStyles = css`
  .scientific-message {
    border-radius: var(
      --message-border-radius,
      var(--scientific-border-radius)
    );
    padding: var(
      --message-padding,
      var(--scientific-spacing-md) var(--scientific-spacing-lg)
    );
    font-size: var(--message-font-size, var(--scientific-text-sm));
    display: flex;
    align-items: flex-start;
    gap: var(--scientific-spacing-sm);
    margin-top: var(--message-margin-top, var(--scientific-spacing-xs));
  }

  .scientific-message .message-icon {
    flex-shrink: 0;
    margin-top: 2px;
  }

  .scientific-message .message-content {
    flex: 1;
  }

  .scientific-message--error {
    background-color: var(--error-bg-color, color-mix(in srgb, var(--scientific-danger-color) 5%, transparent));
    border: var(--error-border, 1px solid color-mix(in srgb, var(--scientific-danger-color) 20%, transparent));
    color: var(--error-color, var(--scientific-danger-color));
  }

  .scientific-message--success {
    background-color: var(--success-bg-color, color-mix(in srgb, var(--scientific-success-color) 5%, transparent));
    border: var(--success-border, 1px solid color-mix(in srgb, var(--scientific-success-color) 20%, transparent));
    color: var(--success-color, var(--scientific-success-color));
  }

  .scientific-message--warning {
    background-color: var(--warning-bg-color, color-mix(in srgb, var(--scientific-warning-color) 5%, transparent));
    border: var(--warning-border, 1px solid color-mix(in srgb, var(--scientific-warning-color) 20%, transparent));
    color: var(--warning-color, var(--scientific-warning-color));
  }

  .scientific-message--info {
    background-color: var(--info-bg-color, color-mix(in srgb, var(--scientific-info-color) 5%, transparent));
    border: var(--info-border, 1px solid color-mix(in srgb, var(--scientific-info-color) 20%, transparent));
    color: var(--info-color, var(--scientific-info-color));
  }
`;

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
