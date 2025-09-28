import {css} from 'lit';

export const baseComponentStyles = css`
  :host {
    display: block;
    font-family: var(
      --scientific-font-family,
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
    );
    box-sizing: border-box;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }
`;
