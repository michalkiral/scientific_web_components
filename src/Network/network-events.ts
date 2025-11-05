/**
 * Network Component Events
 * 
 * Event constants for the Network component, including node/edge operations,
 * canvas interactions, zoom controls, and keyboard shortcuts.
 */

export const NetworkEvents = {
  // Node events
  NODE_SELECTED: 'node-selected',
  NODE_ADDED: 'node-added',
  NODE_RENAMED: 'node-renamed',
  NODE_REMOVED: 'node-removed',
  
  // Edge events
  EDGE_SELECTED: 'edge-selected',
  EDGE_ADDED: 'edge-added',
  EDGE_RENAMED: 'edge-renamed',
  EDGE_REMOVED: 'edge-removed',
  
  // Canvas interaction events
  CANVAS_CLICKED: 'canvas-clicked',
  NETWORK_ZOOM: 'network-zoom',
  
  // Network state events
  NETWORK_DIRECTION_CHANGED: 'network-direction-changed',
  NETWORK_UPDATED: 'network-updated',
  NETWORK_EXPORT: 'network-export',
  
  // Keyboard shortcut events
  SHORTCUT_CREATE_NODE: 'shortcut-createNode',
  SHORTCUT_CREATE_EDGE: 'shortcut-createEdge',
  SHORTCUT_TOGGLE_RENAME: 'shortcut-toggleRename',
  SHORTCUT_TOGGLE_REMOVAL: 'shortcut-toggleRemoval',
  SHORTCUT_CANCEL_MODE: 'shortcut-cancelMode',
  SHORTCUT_FIT_TO_SCREEN: 'shortcut-fitToScreen',
  SHORTCUT_ZOOM_IN: 'shortcut-zoomIn',
  SHORTCUT_ZOOM_OUT: 'shortcut-zoomOut',
  SHORTCUT_RESET_ZOOM: 'shortcut-resetZoom',
  
  KEYBOARD_SHORTCUT: 'keyboard-shortcut',
} as const;

export type NetworkEventName = typeof NetworkEvents[keyof typeof NetworkEvents];

/**
 * Helper function to get the appropriate event name for element operations
 * @param elementType - The type of element (node or edge)
 * @param operation - The operation being performed (renamed or removed)
 * @returns The appropriate event name constant
 */
export function getElementEventName(
  elementType: 'node' | 'edge',
  operation: 'renamed' | 'removed'
): NetworkEventName {
  if (elementType === 'node') {
    return operation === 'renamed' ? NetworkEvents.NODE_RENAMED : NetworkEvents.NODE_REMOVED;
  } else {
    return operation === 'renamed' ? NetworkEvents.EDGE_RENAMED : NetworkEvents.EDGE_REMOVED;
  }
}
