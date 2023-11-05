import * as React from 'react';
import { forwardRef } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SvgIcon from '@kyo/core/SvgIcon';
import Button from '@mui/material/Button';
import _ from '@lodash';
import clsx from 'clsx';

const statusList = [
  {
    value: 'todo',
    title: 'Not started',
    icon: 'heroicons-solid:hashtag',
    textColor: 'rgb(244 67 54)',
    bgColor: 'rgba(244,67,54,0.3)',
  },
  {
    value: 'in-progress',
    title: 'In Progress',
    icon: 'heroicons-outline:clock',
    textColor: 'rgb(40,28,5)',
    bgColor: 'rgb(255,185,39)',
  },
  {
    value: 'done',
    title: 'Done',
    icon: 'heroicons-solid:badge-check',
    textColor: 'rgb(76 175 80)',
    bgColor: 'rgba(76,175,80,0.3)',
  },
];

const TaskProgressSelector = forwardRef((props, ref) => {
  const { value, onChange, className } = props;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const selectedOption = _.find(statusList, { value });

  const handleClick = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    setAnchorEl(ev.currentTarget);
  };

  const handleSelect = (val, ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    onChange(val);
    handleClose();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        ref={ref}
        size="small"
        id="status-button"
        aria-controls="status-menu"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        className={clsx('min-w-96 px-12', className)}
        sx={{ color: selectedOption.textColor, backgroundColor: selectedOption.bgColor }}
      >
        <SvgIcon className="mx-4" size={16}>
          {selectedOption.icon}
        </SvgIcon>
        <span>{selectedOption.title}</span>
      </Button>
      <Menu
        id="status-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'status-button',
        }}
      >
        {statusList.map((item) => (
          <MenuItem onClick={(ev) => handleSelect(item.value, ev)} key={item.value}>
            <ListItemText primary={item.title} />
            <ListItemIcon className="min-w-40 justify-end" sx={{ color: item.textColor }}>
              <SvgIcon size={16}>{item.icon}</SvgIcon>
            </ListItemIcon>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
});

TaskProgressSelector.defaultProps = {
  value: 0,
};

export default TaskProgressSelector;
