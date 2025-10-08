import {
  type ToolbarSection,
  type ToolbarButtonDescriptor,
} from '../components/ScientificToolbar/scientific-toolbar.js';

export interface ButtonConfig {
  id: string;
  label: string;
  title: string;
  icon?: string;
  value?: string;
}

export interface NetworkToolbarConfig {
  networkTypeOptions: {
    undirected: ButtonConfig;
    directed: ButtonConfig;
  };
  interactionModeButtons: {
    createNode: ButtonConfig;
    createEdge: ButtonConfig;
    rename: ButtonConfig;
    remove: ButtonConfig;
  };
  controlButtons: {
    zoomIn: ButtonConfig;
    zoomOut: ButtonConfig;
    zoomFit: ButtonConfig;
  };
  exportFormatOptions: Array<{value: string; label: string}>;
}

export interface NetworkToolbarState {
  directed: boolean;
  isCreatingNode: boolean;
  isCreatingEdge: boolean;
  isRenaming: boolean;
  isRemoving: boolean;
  enableNodeCreation: boolean;
  enableEdgeCreation: boolean;
  enableRenaming: boolean;
  enableRemoval: boolean;
  enableZoom: boolean;
}

export interface NetworkToolbarHandlers {
  onDirectedChange: (event: CustomEvent) => void;
  onToggleNodeCreation: () => void;
  onToggleEdgeCreation: () => void;
  onToggleRenaming: () => void;
  onToggleRemoval: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onZoomFit: () => void;
  onExportChange: (event: CustomEvent) => void;
}

export interface GraphToolbarConfig {
  chartTypeOptions: Array<{value: string; label: string}>;
  exportButtons: {
    png: ButtonConfig;
    jpg: ButtonConfig;
    pdf: ButtonConfig;
    refresh: ButtonConfig;
  };
}

export interface GraphToolbarState {
  type: string;
  isAreaChart: boolean;
  isLoading: boolean;
  chartExists: boolean;
  showExportButtons: boolean;
  exportFormats: Array<'png' | 'jpg' | 'pdf'>;
}

export interface GraphToolbarHandlers {
  onTypeChange: (event: CustomEvent) => void;
  onExportPng: () => void;
  onExportJpg: () => void;
  onExportPdf: () => void;
  onRefresh: () => void;
}

export function createNetworkToolbarSections(
  config: NetworkToolbarConfig,
  state: NetworkToolbarState,
  handlers: NetworkToolbarHandlers
): ToolbarSection[] {
  const sections: ToolbarSection[] = [];

  sections.push(createNetworkTypeSection(config, state, handlers));

  const interactiveSection = createInteractiveModeSection(config, state, handlers);
  if (interactiveSection.buttons && interactiveSection.buttons.length > 0) {
    sections.push(interactiveSection);
  }

  const controlsSection = createControlsSection(config, state, handlers);
  if (controlsSection.buttons && controlsSection.buttons.length > 0) {
    sections.push(controlsSection);
  }

  sections.push(createExportSection(config, handlers));

  return sections;
}

export function createGraphToolbarSections(
  config: GraphToolbarConfig,
  state: GraphToolbarState,
  handlers: GraphToolbarHandlers
): ToolbarSection[] {
  const sections: ToolbarSection[] = [];

  sections.push(createChartTypeSection(config, state, handlers));

  const actionButtons: ToolbarButtonDescriptor[] = [];

  if (state.showExportButtons) {
    if (state.exportFormats.includes('png')) {
      actionButtons.push({
        ...config.exportButtons.png,
        variant: 'outline',
        disabled: state.isLoading || !state.chartExists,
        handler: handlers.onExportPng,
      });
    }
    if (state.exportFormats.includes('jpg')) {
      actionButtons.push({
        ...config.exportButtons.jpg,
        variant: 'outline',
        disabled: state.isLoading || !state.chartExists,
        handler: handlers.onExportJpg,
      });
    }
    if (state.exportFormats.includes('pdf')) {
      actionButtons.push({
        ...config.exportButtons.pdf,
        variant: 'outline',
        disabled: state.isLoading || !state.chartExists,
        handler: handlers.onExportPdf,
      });
    }
  }

  actionButtons.push({
    ...config.exportButtons.refresh,
    variant: 'outline',
    disabled: state.isLoading,
    handler: handlers.onRefresh,
  });

  if (actionButtons.length > 0) {
    sections.push({
      id: 'actions',
      title: 'Actions',
      className: 'graph-actions',
      buttons: actionButtons,
    });
  }

  return sections;
}

function createNetworkTypeSection(
  config: NetworkToolbarConfig,
  state: NetworkToolbarState,
  handlers: NetworkToolbarHandlers
): ToolbarSection {
  return {
    id: 'network-type',
    title: 'Network Type',
    className: 'network-type-section',
    buttons: [
      {
        ...config.networkTypeOptions.undirected,
        variant: (!state.directed ? 'primary' : 'outline') as 'primary' | 'outline',
        handler: () => handlers.onDirectedChange(
          new CustomEvent('change', {detail: {value: config.networkTypeOptions.undirected.value}})
        ),
      },
      {
        ...config.networkTypeOptions.directed,
        variant: (state.directed ? 'primary' : 'outline') as 'primary' | 'outline',
        handler: () => handlers.onDirectedChange(
          new CustomEvent('change', {detail: {value: config.networkTypeOptions.directed.value}})
        ),
      },
    ],
  };
}

function createChartTypeSection(
  config: GraphToolbarConfig,
  state: GraphToolbarState,
  handlers: GraphToolbarHandlers
): ToolbarSection {
  return {
    id: 'chart-type',
    title: 'Chart Type',
    className: 'graph-controls',
    dropdowns: [
      {
        id: 'chart-type-selector',
        label: '',
        options: config.chartTypeOptions,
        selectedValue: state.isAreaChart ? 'area' : state.type,
        placeholder: 'Select chart type',
        disabled: state.isLoading,
        handler: handlers.onTypeChange,
        style: '--dropdown-width: 180px; --dropdown-min-width: 160px;',
      },
    ],
  };
}

function createInteractiveModeSection(
  config: NetworkToolbarConfig,
  state: NetworkToolbarState,
  handlers: NetworkToolbarHandlers
): ToolbarSection {
  const buttons: ToolbarButtonDescriptor[] = [
    {
      ...config.interactionModeButtons.createNode,
      variant: (state.isCreatingNode ? 'primary' : 'outline') as 'primary' | 'outline',
      handler: handlers.onToggleNodeCreation,
      visible: state.enableNodeCreation,
    },
    {
      ...config.interactionModeButtons.createEdge,
      variant: (state.isCreatingEdge ? 'primary' : 'outline') as 'primary' | 'outline',
      handler: handlers.onToggleEdgeCreation,
      visible: state.enableEdgeCreation,
    },
    {
      ...config.interactionModeButtons.rename,
      variant: (state.isRenaming ? 'primary' : 'outline') as 'primary' | 'outline',
      handler: handlers.onToggleRenaming,
      visible: state.enableRenaming,
    },
    {
      ...config.interactionModeButtons.remove,
      variant: (state.isRemoving ? 'danger' : 'outline') as 'danger' | 'outline',
      handler: handlers.onToggleRemoval,
      visible: state.enableRemoval,
    },
  ].filter(button => button.visible);

  return {
    id: 'interactive',
    title: 'Interactive Mode',
    className: 'interactive-section',
    buttons,
  };
}

function createControlsSection(
  config: NetworkToolbarConfig,
  state: NetworkToolbarState,
  handlers: NetworkToolbarHandlers
): ToolbarSection {
  const buttons: ToolbarButtonDescriptor[] = [
    {
      ...config.controlButtons.zoomIn,
      variant: 'outline' as const,
      handler: handlers.onZoomIn,
      visible: state.enableZoom,
    },
    {
      ...config.controlButtons.zoomOut,
      variant: 'outline' as const,
      handler: handlers.onZoomOut,
      visible: state.enableZoom,
    },
    {
      ...config.controlButtons.zoomFit,
      variant: 'outline' as const,
      handler: handlers.onZoomFit,
      visible: state.enableZoom,
    },
  ].filter(button => button.visible);

  return {
    id: 'controls',
    title: 'Controls',
    className: 'controls-section',
    buttons,
  };
}

function createExportSection(
  config: NetworkToolbarConfig,
  handlers: NetworkToolbarHandlers
): ToolbarSection {
  return {
    id: 'export',
    title: 'Export',
    className: 'export-section',
    dropdowns: [
      {
        id: 'export-format',
        label: '',
        options: config.exportFormatOptions,
        placeholder: 'Select an export format',
        handler: handlers.onExportChange,
      },
    ],
  };
}