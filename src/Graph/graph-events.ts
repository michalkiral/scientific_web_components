export const GraphEvents = {
  GRAPH_TYPE_CHANGED: 'graph-type-changed',
  GRAPH_EXPORTED: 'graph-exported',
  GRAPH_REFRESHED: 'graph-refreshed',
} as const;

export type GraphEventName = typeof GraphEvents[keyof typeof GraphEvents];
