import {SCIENTIFIC_THEMES} from '../../shared/constants/themes.js';

export const buttonThemes = SCIENTIFIC_THEMES;
export const buttonVariants = [
  'primary',
  'secondary', 
  'outline',
  'ghost',
  'danger',
  'success',
] as const;
export const buttonSizes = ['small', 'medium', 'large'] as const;
export const buttonTypes = ['button', 'submit', 'reset'] as const;

export const defaultButtonArgs = {
  label: 'Click Me',
  theme: 'default' as const,
  variant: 'primary' as const,
  size: 'medium' as const,
  loading: false,
  loadingLabel: 'Loading...',
  showSpinner: true,
  disabled: false,
  fullWidth: false,
  type: 'button' as const,
  form: '',
  name: '',
  value: '',
  href: '',
  target: '',
  autoFocus: false,
};

export const variantMatrix = [
  { label: 'Primary', variant: 'primary' },
  { label: 'Secondary', variant: 'secondary' },
  { label: 'Outline', variant: 'outline' },
  { label: 'Ghost', variant: 'ghost' },
  { label: 'Danger', variant: 'danger' },
  { label: 'Success', variant: 'success' },
] as const;

export const sizeMatrix = [
  { label: 'Small', size: 'small' },
  { label: 'Medium', size: 'medium' },
  { label: 'Large', size: 'large' },
] as const;

export const loadingExamples = [
  {
    title: 'With Spinner',
    label: 'Save',
    loading: true,
    loadingLabel: 'Saving...',
    showSpinner: true,
    variant: 'primary' as const,
  },
  {
    title: 'Text Only',
    label: 'Delete',
    loading: true,
    loadingLabel: 'Deleting...',
    showSpinner: false,
    variant: 'danger' as const,
  },
  {
    title: 'Custom Loading Text',
    label: 'Upload',
    loading: true,
    loadingLabel: 'Uploading file...',
    showSpinner: false,
    variant: 'outline' as const,
  },
] as const;

export const themeExamples = [
  {
    theme: 'default',
    title: 'Default Theme',
    variants: variantMatrix,
  },
  {
    theme: 'dark',
    title: 'Dark Theme', 
    variants: variantMatrix,
  },
  {
    theme: 'scientific',
    title: 'Scientific Theme',
    variants: variantMatrix,
  },
] as const;

export const linkExamples = [
  {
    label: 'Open Documentation',
    href: '/docs',
    variant: 'primary' as const,
  },
  {
    label: 'External Link',
    href: 'https://example.com',
    target: '_blank' as const,
    variant: 'outline' as const,
  },
  {
    label: 'Download File',
    href: '/download.pdf',
    variant: 'ghost' as const,
  },
] as const;

export const customStyleExamples = [
  {
    label: 'Custom',
    variant: 'primary' as const,
    style: `
      --button-bg-color: #667eea;
      --button-hover-bg-color: #5a6fd8;
      --button-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
    `,
  },
  {
    label: 'Neon Effect',
    variant: 'ghost' as const,
    style: `
      --button-color: #00ff88;
      --button-border: 2px solid #00ff88;
      --button-hover-bg-color: rgba(0, 255, 136, 0.1);
      --button-focus-shadow: 0 0 20px #00ff88;
      --button-shadow: 0 0 10px rgba(0, 255, 136, 0.3);
    `,
  },
  {
    label: 'Pill Shape',
    variant: 'primary' as const,
    size: 'small' as const,
    style: `
      --button-border-radius: 50px;
      --button-padding: 8px 24px;
      --button-font-weight: 600;
    `,
  },
] as const;

export const loadingModeExamples = [
  {
    label: 'Spinner Only',
    loading: true,
    loadingLabel: 'Loading...',
    showSpinner: true,
    variant: 'primary' as const,
  },
  {
    label: 'Text Change',
    loading: true,
    loadingLabel: 'Processing...',
    showSpinner: false,
    variant: 'secondary' as const,
  },
] as const;

export const themeVariantExamples = [
  {
    section: 'Loading States Across Themes',
    examples: [
      {
        label: 'Loading Default',
        theme: 'default' as const,
        variant: 'primary' as const,
        loading: true,
      },
      {
        label: 'Loading Dark',
        theme: 'dark' as const,
        variant: 'primary' as const,
        loading: true,
      },
      {
        label: 'Loading Scientific',
        theme: 'scientific' as const,
        variant: 'primary' as const,
        loading: true,
      },
    ],
  },
  {
    section: 'Disabled States Across Themes',
    examples: [
      {
        label: 'Disabled Default',
        theme: 'default' as const,
        variant: 'primary' as const,
        disabled: true,
      },
      {
        label: 'Disabled Dark',
        theme: 'dark' as const,
        variant: 'primary' as const,
        disabled: true,
      },
      {
        label: 'Disabled Scientific',
        theme: 'scientific' as const,
        variant: 'primary' as const,
        disabled: true,
      },
    ],
  },
  {
    section: 'Size Variations with Scientific Theme',
    examples: [
      {
        label: 'Small Scientific',
        theme: 'scientific' as const,
        variant: 'primary' as const,
        size: 'small' as const,
        loading: undefined,
        disabled: undefined,
      },
      {
        label: 'Medium Scientific',
        theme: 'scientific' as const,
        variant: 'primary' as const,
        size: 'medium' as const,
        loading: undefined,
        disabled: undefined,
      },
      {
        label: 'Large Scientific',
        theme: 'scientific' as const,
        variant: 'primary' as const,
        size: 'large' as const,
        loading: undefined,
        disabled: undefined,
      },
    ],
  },
] as const;

export const mockAsyncAction = () => new Promise<void>((res) => setTimeout(res, 2000));