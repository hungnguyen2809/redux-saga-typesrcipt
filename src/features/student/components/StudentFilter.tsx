import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { map } from 'lodash';
import { City, ListParams } from 'models';
import React, { useRef } from 'react';

interface Props {
  filter: ListParams;
  citys: City[];
  onChange?: (newFilter: ListParams) => void;
  onSearchChange?: (newFilter: ListParams) => void;
}

function StudentFilter({ filter, citys, onChange, onSearchChange }: Props): JSX.Element {
  const refSearchFilter = useRef<HTMLInputElement>(null);

  const handleSearchChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (!onSearchChange) return;
    const newFilter: ListParams = { ...filter, _page: 1, name_like: event.target.value };
    onSearchChange && onSearchChange(newFilter);
  };

  const handleCityChange = (
    event: React.ChangeEvent<{ name?: string | undefined; value: unknown }>
  ) => {
    if (!onChange) return;

    const newFilter: ListParams = {
      ...filter,
      _page: 1,
      city: event.target.value || undefined,
    };
    onChange(newFilter);
    //khi mà giá trị là undefined thì khi query api nó tự động bỏ key đó hoặc là redux nó bỏ luôn cho
  };

  const handleSortChange = (
    event: React.ChangeEvent<{ name?: string | undefined; value: unknown }>
  ) => {
    if (!onChange) return;

    const value = event.target.value;
    const [_sort, _order] = (value as string).split('_'); // ép kiểu value về string

    const newFilter: ListParams = {
      ...filter,
      _sort: _sort || undefined,
      _order: (_order as 'asc' | 'desc') || undefined, // ép kiểu về asc hoặc là desc, nếu ep về không có thì dùng undefined
    };
    onChange(newFilter);
  };

  const handleClearFilter = (): void => {
    if (!onChange) return;
    const newFilter: ListParams = {
      ...filter,
      _page: 1,
      _sort: undefined,
      _order: undefined,
      city: undefined,
      name_like: undefined,
    };
    onChange(newFilter);

    if (refSearchFilter.current) {
      refSearchFilter.current.value = '';
    }
  };

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth variant="outlined" size={'small'}>
            <InputLabel htmlFor="adornment-search">Search by name</InputLabel>
            <OutlinedInput
              inputRef={refSearchFilter}
              id="adornment-search"
              label={'Search by name'} //để hiển thị đúng khoảng các chữ khi hover (bỏ đi thì biết)
              endAdornment={<Search />} // icon ở vị trí cuối (start là đầu)
              defaultValue={filter.name_like}
              onChange={handleSearchChange}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <FormControl fullWidth variant="outlined" size={'small'}>
            <InputLabel id="filter-by-city">Filter by city</InputLabel>
            <Select
              labelId="filter-by-city"
              label="Filter by city"
              value={filter.city || ''}
              onChange={handleCityChange}
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              {map(citys, (city) => {
                return (
                  <MenuItem key={city.code} value={city.code}>
                    {city.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={2}>
          <FormControl fullWidth variant="outlined" size={'small'}>
            <InputLabel id="sort-define">Sort</InputLabel>
            <Select
              labelId="sort-define"
              label="Sort"
              value={filter._sort ? `${filter._sort}_${filter._order}` : ''}
              onChange={handleSortChange}
            >
              <MenuItem value="">
                <em>No Sort</em>
              </MenuItem>
              <MenuItem value="name_asc">Name ASC</MenuItem>
              <MenuItem value="name_desc">Name DESC</MenuItem>
              <MenuItem value="mark_asc">Mark ASC</MenuItem>
              <MenuItem value="mark_desc">Mark DESC</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={1}>
          <Button variant="outlined" color="primary" fullWidth onClick={handleClearFilter}>
            Clear
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default StudentFilter;
