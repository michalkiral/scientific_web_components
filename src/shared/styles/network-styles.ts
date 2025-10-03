import {css} from 'lit';

export const networkHostStyles = css`
  :host {
    width: var(--network-width, 100%);
    height: var(--network-height, 400px);
    min-height: var(--network-min-height, 300px);
  }
`;

export const networkContainerStyles = css`
  .network-container {
    position: relative;
    width: 100%;
    height: 100%;
    min-height: var(--network-container-min-height, 400px);
    border: var(--scientific-border);
    border-radius: var(--scientific-border-radius-lg);
    background: var(--container-bg-color, #ffffff);
    overflow: hidden;
  }

  .network-canvas {
    position: relative;
    width: 100%;
    height: 100%;
    min-height: var(--network-canvas-min-height, 350px);
  }
`;

export const networkInfoStyles = css`
  .network-info {
    position: absolute;
    bottom: var(--scientific-spacing-md);
    left: var(--scientific-spacing-md);
    background: color-mix(in srgb, var(--scientific-bg-primary) 95%, transparent);
    border: var(--scientific-border);
    border-radius: var(--scientific-border-radius);
    padding: var(--scientific-spacing-md);
    font-size: var(--scientific-text-sm);
    color: var(--scientific-text-secondary);
    box-shadow: var(--scientific-shadow);
    max-width: 250px;
    z-index: 10;
    backdrop-filter: blur(8px);
  }

  .info-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: var(--scientific-spacing-xs);
    font-weight: 500;
  }

  .info-row:last-child {
    margin-bottom: 0;
  }

  .info-row span:first-child {
    color: var(--scientific-text-tertiary);
  }
`;

export const networkTooltipStyles = css`
  .node-tooltip {
    position: absolute;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: var(--scientific-spacing-sm) var(--scientific-spacing-md);
    border-radius: var(--scientific-border-radius);
    font-size: var(--scientific-text-sm);
    pointer-events: none;
    z-index: 20;
    max-width: 200px;
    word-wrap: break-word;
    backdrop-filter: blur(4px);
  }
`;

export const networkInteractionStyles = css`
  .creating-nodes {
    cursor: crosshair !important;
  }

  .creating-edges {
    cursor: copy !important;
  }

  .renaming {
    cursor: text !important;
  }

  .removing {
    cursor: not-allowed !important;
  }

  .network-canvas.creating-nodes,
  .network-canvas.creating-edges,
  .network-canvas.renaming,
  .network-canvas.removing {
    cursor: inherit;
  }
`;

export const networkElementStateStyles = css`
  .renaming-element {
    border: 2px dashed var(--scientific-primary-color, #007bff) !important;
    background-color: rgba(0, 123, 255, 0.1) !important;
  }

  .removing-element {
    border: 2px dashed var(--scientific-danger-color, #dc3545) !important;
    background-color: rgba(220, 53, 69, 0.1) !important;
    opacity: 0.7 !important;
  }
`;

export const networkRenameInputStyles = css`
  .rename-input {
    position: absolute;
    background: var(--scientific-bg-primary);
    color: var(--scientific-text-primary);
    border: 2px solid var(--scientific-primary-color, #007bff);
    border-radius: 4px;
    padding: 4px 8px;
    font-size: 12px;
    z-index: 1000;
    box-shadow: var(--scientific-shadow);
    outline: none;
  }

  .rename-input:focus {
    border-color: var(--scientific-primary-color, #007bff);
    box-shadow: 0 0 0 2px color-mix(in srgb, var(--scientific-primary-color) 25%, transparent);
  }
`;

export const networkStyles = [
  networkHostStyles,
  networkContainerStyles,
  networkInfoStyles,
  networkTooltipStyles,
  networkInteractionStyles,
  networkElementStateStyles,
  networkRenameInputStyles,
];