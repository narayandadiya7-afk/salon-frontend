/**
 * useFetch.tsx
 * Hook that provides post and get functions from apiUtil
 */
import apiUtil from '../utils/api';

export default function useFetch() {
  return {
    post: apiUtil.post,
    get: apiUtil.get,
  };
}
