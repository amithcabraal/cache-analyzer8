import { NetworkRequest, Filter } from '../types';

export function filterData(data: NetworkRequest[], filters: Filter): NetworkRequest[] {
  return data.filter(item => {
    if (filters.method && item['1.method'] !== filters.method) {
      return false;
    }
    
    if (filters.urlPattern) {
      const pattern = filters.urlPattern.replace(/\*/g, '.*');
      const regex = new RegExp(pattern);
      if (!regex.test(item['2.url'])) {
        return false;
      }
    }
    
    if (filters.cacheControl && item['3.cache-control'] !== filters.cacheControl) {
      return false;
    }
    
    if (filters.xCache && item['4.x-cache'] !== filters.xCache) {
      return false;
    }
    
    if (filters.cfPop && item['5.x-amz-cf-pop'] !== filters.cfPop) {
      return false;
    }

    if (filters.fulfilledBy && item['8.fulfilledBy'] !== filters.fulfilledBy) {
      return false;
    }

    if (filters.cacheUsed && item['parsed.cache-used'] !== filters.cacheUsed) {
      return false;
    }
    
    return true;
  });
}