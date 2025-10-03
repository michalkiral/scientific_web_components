export const NetworkEvents = {
  NODE_SELECTED: 'node-selected',
  NODE_ADDED: 'node-added',
  NODE_RENAMED: 'node-renamed',
  NODE_REMOVED: 'node-removed',
  
  EDGE_SELECTED: 'edge-selected',
  EDGE_ADDED: 'edge-added',
  EDGE_RENAMED: 'edge-renamed',
  EDGE_REMOVED: 'edge-removed',
  
  CANVAS_CLICKED: 'canvas-clicked',
  NETWORK_ZOOM: 'network-zoom',
  
  NETWORK_DIRECTION_CHANGED: 'network-direction-changed',
  NETWORK_UPDATED: 'network-updated',
  NETWORK_EXPORT: 'network-export',
  
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

export const GraphEvents = {
  GRAPH_TYPE_CHANGED: 'graph-type-changed',
  GRAPH_EXPORTED: 'graph-exported',
  GRAPH_REFRESHED: 'graph-refreshed',
} as const;

export const FormEvents = {
  FORM_SUBMIT_START: 'form-submit-start',
  FORM_SUBMIT_SUCCESS: 'form-submit-success',
  FORM_SUBMIT_ERROR: 'form-submit-error',
  FORM_CANCEL: 'form-cancel',
  FORM_RESET: 'form-reset',
} as const;

export const DropdownEvents = {
  OPTION_SELECTED: 'option-selected',
  OPTION_CLEARED: 'option-cleared',
  CHANGE: 'change',
} as const;

export const AllEvents = {
  ...NetworkEvents,
  ...GraphEvents,
  ...FormEvents,
  ...DropdownEvents,
} as const;

export type NetworkEventName = typeof NetworkEvents[keyof typeof NetworkEvents];
export type GraphEventName = typeof GraphEvents[keyof typeof GraphEvents];
export type FormEventName = typeof FormEvents[keyof typeof FormEvents];
export type DropdownEventName = typeof DropdownEvents[keyof typeof DropdownEvents];
export type AllEventName = typeof AllEvents[keyof typeof AllEvents];

export function getEventName(eventKey: keyof typeof AllEvents): AllEventName {
  return AllEvents[eventKey];
}

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

export function isNetworkEvent(event: string): event is NetworkEventName {
  return Object.values(NetworkEvents).includes(event as NetworkEventName);
}

export function isValidEvent(event: string): event is AllEventName {
  return Object.values(AllEvents).includes(event as AllEventName);
}