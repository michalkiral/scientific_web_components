import type {KeyboardShortcut} from './controllers/network-shortcuts-controller.js';

export const DEFAULT_NETWORK_SHORTCUTS: Record<string, Omit<KeyboardShortcut, 'key'>> = {
  '1': {
    action: 'createNode',
    description: 'Add Node - Click on canvas to create a new node'
  },
  
  '2': {
    action: 'createEdge',
    description: 'Add Edge - Click two nodes to create a connection'
  },
  
  '3': {
    action: 'toggleRename',
    description: 'Toggle Rename Mode - Click elements to rename them'
  },
  
  '4': {
    action: 'toggleRemoval',
    description: 'Toggle Removal Mode - Double-click elements to remove them'
  },
  
  'Escape': {
    action: 'cancelMode',
    description: 'Cancel Current Mode - Exit any active interaction mode'
  },
  
  'f': {
    action: 'fitToScreen',
    description: 'Fit to Screen - Zoom and center to show all elements'
  },
  
  '+': {
    action: 'zoomIn',
    description: 'Zoom In - Increase magnification'
  },
  
  '-': {
    action: 'zoomOut',
    description: 'Zoom Out - Decrease magnification'
  },
  
  '0': {
    action: 'resetZoom',
    description: 'Reset Zoom - Return to default zoom level'
  },
  
  '=': {
    action: 'zoomIn',
    description: 'Zoom In (Alternative) - Increase magnification'
  },
  
  '_': {
    action: 'zoomOut',
    description: 'Zoom Out (Alternative) - Decrease magnification'
  },
} as const;

export const MINIMAL_NETWORK_SHORTCUTS: Record<string, Omit<KeyboardShortcut, 'key'>> = {
  'f': {
    action: 'fitToScreen',
    description: 'Fit to Screen'
  },
  '+': {
    action: 'zoomIn',
    description: 'Zoom In'
  },
  '-': {
    action: 'zoomOut',
    description: 'Zoom Out'
  },
  'Escape': {
    action: 'cancelMode',
    description: 'Cancel Mode'
  },
} as const;

export const EXTENDED_NETWORK_SHORTCUTS: Record<string, Omit<KeyboardShortcut, 'key'>> = {
  ...DEFAULT_NETWORK_SHORTCUTS,
  
  'a': {
    action: 'selectAll',
    description: 'Select All - Select all nodes and edges'
  },
  
  'Ctrl+a': {
    action: 'selectAll',
    description: 'Select All (Ctrl+A) - Select all elements'
  },
  
  'Delete': {
    action: 'deleteSelected',
    description: 'Delete Selected - Remove currently selected elements'
  },
  
  'Backspace': {
    action: 'deleteSelected',
    description: 'Delete Selected (Backspace) - Remove selected elements'
  },
  
  'l': {
    action: 'applyLayout',
    description: 'Apply Layout - Automatically arrange network elements'
  },
  
  'Ctrl+s': {
    action: 'save',
    description: 'Save (Ctrl+S) - Save current network state'
  },
  
  'Ctrl+e': {
    action: 'export',
    description: 'Export (Ctrl+E) - Export network as image or data'
  },
} as const;

export const SHORTCUT_ACTIONS = {
  CREATE_NODE: 'createNode',
  CREATE_EDGE: 'createEdge',
  
  TOGGLE_RENAME: 'toggleRename',
  TOGGLE_REMOVAL: 'toggleRemoval',
  CANCEL_MODE: 'cancelMode',
  
  FIT_TO_SCREEN: 'fitToScreen',
  ZOOM_IN: 'zoomIn',
  ZOOM_OUT: 'zoomOut',
  RESET_ZOOM: 'resetZoom',
  
  SELECT_ALL: 'selectAll',
  DELETE_SELECTED: 'deleteSelected',
  
  APPLY_LAYOUT: 'applyLayout',
  
  SAVE: 'save',
  EXPORT: 'export',
} as const;

export type ShortcutAction = typeof SHORTCUT_ACTIONS[keyof typeof SHORTCUT_ACTIONS];

export function getShortcutsConfig(type: 'default' | 'minimal' | 'extended' = 'default') {
  switch (type) {
    case 'minimal':
      return MINIMAL_NETWORK_SHORTCUTS;
    case 'extended':
      return EXTENDED_NETWORK_SHORTCUTS;
    default:
      return DEFAULT_NETWORK_SHORTCUTS;
  }
}

export function getShortcutActions(): readonly string[] {
  return Object.values(SHORTCUT_ACTIONS);
}

export function createHelpText(shortcuts: Record<string, Omit<KeyboardShortcut, 'key'>>): string[] {
  return Object.entries(shortcuts)
    .map(([key, shortcut]) => `${key}: ${shortcut.description}`)
    .sort();
}