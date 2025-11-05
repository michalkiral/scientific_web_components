import {css} from 'lit';

export const baseComponentStyles = css`
  :host {
    display: block;
    font-family: var(
      --scientific-font-family,
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      'Segoe UI',
      Roboto,
      'Helvetica Neue',
      Arial,
      sans-serif
    );
    box-sizing: border-box;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }
`;
