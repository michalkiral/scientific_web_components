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

    case 'sort':
    case 'sort-unsorted':
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
						d="M3 9a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 9zM3.854 2.146a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708-.708L3 2.293l1.354 1.353a.5.5 0 0 1-.708.708l-1.5-1.5zm9.5 11.5a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L13 12.793l1.146-1.147a.5.5 0 0 1 .708.708l-1.5 1.5z"
					></path>
				</svg>
      `;

    case 'zoom-in':
    case 'plus':
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
					<path
						d="M6.5 3a.5.5 0 0 1 .5.5v2h2a.5.5 0 0 1 0 1h-2v2a.5.5 0 0 1-1 0v-2h-2a.5.5 0 0 1 0-1h2v-2a.5.5 0 0 1 .5-.5z"
					></path>
				</svg>
      `;

    case 'zoom-out':
    case 'minus':
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
					<path
						d="M4 6.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"
					></path>
				</svg>
      `;

    case 'fit-screen':
    case 'expand':
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
						d="M1.5 1a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4A1.5 1.5 0 0 1 1.5 0h4a.5.5 0 0 1 0 1h-4zM10 .5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 16 1.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zM.5 10a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 0 14.5v-4a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5z"
					></path>
				</svg>
      `;

    case 'node-add':
    case 'circle-plus':
      return html`
				<svg
					class="scientific-icon ${className}"
					width="${size}"
					height="${size}"
					viewBox="0 0 16 16"
					fill="${color}"
					xmlns="http://www.w3.org/2000/svg"
				>
					<circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1" fill="none"/>
					<path
						d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
					></path>
				</svg>
      `;

    case 'edge-add':
    case 'arrow-right-circle':
      return html`
				<svg
					class="scientific-icon ${className}"
					width="${size}"
					height="${size}"
					viewBox="0 0 16 16"
					fill="${color}"
					xmlns="http://www.w3.org/2000/svg"
				>
					<circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1" fill="none"/>
					<path
						d="M4.646 7.646a.5.5 0 0 1 .708 0L7.5 9.793V6.5a.5.5 0 0 1 1 0v3.293l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 0-.708z"
					></path>
				</svg>
      `;

    case 'rename':
    case 'edit':
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
						d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z"
					></path>
				</svg>
      `;

    case 'remove':
    case 'trash':
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
						d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
					></path>
					<path
						fillRule="evenodd"
						d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
					></path>
				</svg>
      `;

    case 'check-circle':
    case 'true':
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
						d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"
					></path>
				</svg>
      `;

    case 'x-circle':
    case 'false':
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
						d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"
					></path>
				</svg>
      `;

    case 'download':
    case 'export':
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
						d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"
					></path>
					<path
						d="M3 15a1 1 0 0 1-1-1V10a.5.5 0 0 1 1 0v4a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-4a.5.5 0 0 1 1 0v4a1 1 0 0 1-1 1H3z"
					></path>
				</svg>
      `;

    case 'refresh':
    case 'reload':
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
						d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"
					></path>
					<path
						d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"
					></path>
				</svg>
      `;

    case 'image':
    case 'picture':
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
						d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"
					></path>
					<path
						d="M10.648 7.646a.5.5 0 0 1 .577-.093L15.002 9.5V14h-14v-2l2.646-2.354a.5.5 0 0 1 .63-.062l2.66 1.773 3.71-3.71z"
					></path>
					<path
						d="M4.502 7a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"
					></path>
				</svg>
      `;

    case 'file-pdf':
    case 'pdf':
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
						d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z"
					></path>
					<path
						d="M4.603 14.087a.81.81 0 0 1-.438-.42c-.195-.388-.13-.776.08-1.102.198-.307.526-.568.897-.787a7.68 7.68 0 0 1 1.482-.645 19.697 19.697 0 0 0 1.062-2.227 7.269 7.269 0 0 1-.43-1.295c-.086-.4-.119-.796-.046-1.136.075-.354.274-.672.65-.823.192-.077.4-.12.602-.077a.7.7 0 0 1 .477.365c.088.164.12.356.127.538.007.188-.012.396-.047.614-.084.51-.27 1.134-.52 1.794a10.954 10.954 0 0 0 .98 1.686 5.753 5.753 0 0 1 1.334.05c.364.066.734.195.96.465.12.144.193.32.2.518.007.192-.047.382-.138.563a1.04 1.04 0 0 1-.354.416.856.856 0 0 1-.51.138c-.331-.014-.654-.196-.933-.417a5.712 5.712 0 0 1-.911-.95 11.651 11.651 0 0 0-1.997.406 11.307 11.307 0 0 1-1.02 1.51c-.292.35-.609.656-.927.787a.793.793 0 0 1-.58.029zm1.379-1.901c-.166.076-.32.156-.459.238-.328.194-.541.383-.647.547-.094.145-.096.25-.04.361.01.022.02.036.026.044a.266.266 0 0 0 .035-.012c.137-.056.355-.235.635-.572a8.18 8.18 0 0 0 .45-.606zm1.64-1.33a12.71 12.71 0 0 1 1.01-.193 11.744 11.744 0 0 1-.51-.858 20.801 20.801 0 0 1-.5 1.05zm2.446.45c.15.163.296.3.435.41.24.19.407.253.498.256a.107.107 0 0 0 .07-.015.307.307 0 0 0 .094-.125.436.436 0 0 0 .059-.2.095.095 0 0 0-.026-.063c-.052-.062-.2-.152-.518-.209a3.876 3.876 0 0 0-.612-.053zM8.078 7.8a6.7 6.7 0 0 0 .2-.828c.031-.188.043-.343.038-.465a.613.613 0 0 0-.032-.198.517.517 0 0 0-.145.04c-.087.035-.158.106-.196.283-.04.192-.03.469.046.822.024.111.054.227.089.346z"
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
