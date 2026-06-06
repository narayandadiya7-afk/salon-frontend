/**
 * Notification Utility - Centralized notification using Ant Design App context message API
 */

import { getGlobalMessage } from '../contexts/ThemeContext';

export const notification = {
  success: (content: string, duration?: number) => getGlobalMessage()?.success(content, duration),
  error: (content: string, duration?: number) => getGlobalMessage()?.error(content, duration),
  warning: (content: string, duration?: number) => getGlobalMessage()?.warning(content, duration),
  info: (content: string, duration?: number) => getGlobalMessage()?.info(content, duration),
  loading: (content: string, duration?: number) => getGlobalMessage()?.loading(content, duration),
  destroy: () => getGlobalMessage()?.destroy(),
};

export default notification;
