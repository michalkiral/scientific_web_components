import {html, TemplateResult} from 'lit';

export interface IconConfig {
  size?: number;
  color?: string;
  className?: string;
}

export function renderIcon(
  name: string,
  config: IconConfig = {}
): TemplateResult {
  const {size = 16, color = 'currentColor', className = ''} = config;

  switch (name) {
    case 'close':
    case 'x':
      return html`
				<svg
					class="scientific-icon ${className}"
					width="${size}"
					height="${size}"
					viewBox="0 0 16 16"
					fill="${color}"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"
					></path>
				</svg>
      `;

    case 'warning':
    case 'alert':
      return html`
				<svg
					class="scientific-icon ${className}"
					width="${size}"
					height="${size}"
					viewBox="0 0 16 16"
					fill="${color}"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
					></path>
					<path
						d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"
					></path>
				</svg>
      `;

    case 'check':
    case 'success':
      return html`
				<svg
					class="scientific-icon ${className}"
					width="${size}"
					height="${size}"
					viewBox="0 0 16 16"
					fill="${color}"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
					></path>
					<path
						d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"
					></path>
				</svg>
      `;

    case 'info':
      return html`
				<svg
						class="scientific-icon ${className}"
						width="${size}"
						height="${size}"
						viewBox="0 0 16 16"
						fill="${color}"
						xmlns="http://www.w3.org/2000/svg"
					>
					<path
						d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
					></path>
					<path
						d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"
					></path>
				</svg>
      `;

    case 'search':
      return html`
			<svg
				class="scientific-icon ${className}"
				width="${size}"
				height="${size}"
				viewBox="0 0 16 16"
				fill="${color}"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
				></path>
			</svg>
      `;

    case 'chevron-down':
      return html`
				<svg
					class="scientific-icon ${className}"
					width="${size}"
					height="${size}"
					viewBox="0 0 16 16"
					fill="${color}"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						fillRule="evenodd"
						d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
					></path>
				</svg>
      `;

    case 'chevron-up':
      return html`
				<svg
					class="scientific-icon ${className}"
					width="${size}"
					height="${size}"
					viewBox="0 0 16 16"
					fill="${color}"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						fillRule="evenodd"
						d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"
					></path>
				</svg>
      `;

    default:
      console.warn(`Icon "${name}" not found`);
      return html`
				<svg
					class="scientific-icon ${className}"
					width="${size}"
					height="${size}"
					viewBox="0 0 16 16"
					fill="${color}"
					xmlns="http://www.w3.org/2000/svg"
				>
					<rect width="16" height="16" fill="currentColor" opacity="0.3"></rect>
					<text x="8" y="12" textAnchor="middle" fontSize="10" fill="white"
						>?</text>
				</svg>
      `;
  }
}

export const iconStyles = `
  .scientific-icon {
    display: inline-block;
    vertical-align: middle;
    flex-shrink: 0;
  }
`;
