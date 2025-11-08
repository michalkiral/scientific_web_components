export const LARGE_NETWORK_THRESHOLD = 1000;
export const MEDIUM_NETWORK_THRESHOLD = 200;

export const NODE_GRID_SPACING = 100;
export const BATCH_SIZE = 500;
export const INITIALIZATION_RETRY_DELAY = 250;
export const RESIZE_DEBOUNCE_DELAY = 100;

export const COSE_LAYOUT_ITERATIONS = 1000;
export const COSE_IDEAL_EDGE_LENGTH = 100;
export const COSE_NODE_OVERLAP = 20;
export const COSE_REFRESH_RATE = 20;

export const DEFAULT_ZOOM_PERCENT = 100;
export const ZOOM_CONVERSION_FACTOR = 100;

export function isLargeNetwork(elementCount: number): boolean {
  return elementCount > LARGE_NETWORK_THRESHOLD;
}

export function isMediumNetwork(nodeCount: number): boolean {
  return nodeCount > MEDIUM_NETWORK_THRESHOLD && nodeCount <= LARGE_NETWORK_THRESHOLD;
}
