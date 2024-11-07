import { Grid } from '@mui/material';
import { NetworkRequest, Filter } from '../../types';
import { uniq } from 'lodash';
import { FilterAutocomplete } from './FilterAutocomplete';

interface FilterPanelProps {
  filters: Filter;
  onFilterChange: (filters: Filter) => void;
  data: NetworkRequest[];
}

export function FilterPanel({ filters, onFilterChange, data }: FilterPanelProps) {
  const methods = uniq(data.map(item => item['1.method']));
  const cacheControls = uniq(data.map(item => item['3.cache-control']));
  const xCaches = uniq(data.map(item => item['4.x-cache']));
  const fulfilledBy = uniq(data.map(item => item['8.fulfilledBy']).filter(Boolean));
  const cacheUsed = uniq(data.map(item => item['parsed.cache-used']));
  const domains = uniq(data.map(item => {
    try {
      return new URL(item['2.url']).hostname;
    } catch {
      return '';
    }
  }).filter(Boolean));

  const handleFilterChange = (key: keyof Filter) => (value: string | null) => {
    onFilterChange({
      ...filters,
      [key]: value || undefined
    });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={2}>
        <FilterAutocomplete
          value={filters.method || null}
          onChange={handleFilterChange('method')}
          options={methods}
          label="Method"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={2}>
        <FilterAutocomplete
          value={filters.urlPattern || null}
          onChange={handleFilterChange('urlPattern')}
          options={domains}
          label="URL Pattern"
          placeholder="Domain or pattern with *"
          freeSolo
        />
      </Grid>
      <Grid item xs={12} sm={6} md={2}>
        <FilterAutocomplete
          value={filters.cacheControl || null}
          onChange={handleFilterChange('cacheControl')}
          options={cacheControls}
          label="Cache Control"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={2}>
        <FilterAutocomplete
          value={filters.xCache || null}
          onChange={handleFilterChange('xCache')}
          options={xCaches}
          label="X-Cache"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={2}>
        <FilterAutocomplete
          value={filters.fulfilledBy || null}
          onChange={handleFilterChange('fulfilledBy')}
          options={fulfilledBy}
          label="Fulfilled By"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={2}>
        <FilterAutocomplete
          value={filters.cacheUsed || null}
          onChange={handleFilterChange('cacheUsed')}
          options={cacheUsed}
          label="Cache Used"
        />
      </Grid>
    </Grid>
  );
}