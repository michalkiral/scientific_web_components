import {html, TemplateResult} from 'lit';
import {renderIcon} from '../icons/index.js';

export type MessageType = 'error' | 'success' | 'warning' | 'info';

export interface MessageConfig {
  type?: MessageType;
  content: string | TemplateResult;
  className?: string;
}

export function renderMessage(config: MessageConfig): TemplateResult {
  const {type = 'info', content, className = ''} = config;

  const iconName = getMessageIcon(type);
  const messageClass =
    `scientific-message scientific-message--${type} ${className}`.trim();

  return html`
    <div class="${messageClass}">
      ${renderIcon(iconName, {size: 16, className: 'message-icon'})}
      <span class="message-content">${content}</span>
    </div>
  `;
}

function getMessageIcon(type: MessageType): string {
  switch (type) {
    case 'error':
      return 'warning';
    case 'success':
      return 'check';
    case 'warning':
      return 'warning';
    case 'info':
      return 'info';
    default:
      return 'info';
  }
}
