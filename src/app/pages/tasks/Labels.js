import { styled } from '@mui/material/styles';
import { useState } from 'react';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import { motion } from 'framer-motion';

import { useDispatch, useSelector } from 'react-redux';
import Autocomplete from '@mui/material/Autocomplete/Autocomplete';
import Checkbox from '@mui/material/Checkbox/Checkbox';
import _ from '@lodash';
import TextField from '@mui/material/TextField';
import { Controller, useForm } from 'react-hook-form';
import SvgIcon from '@kyo/core/SvgIcon';
import IconButton from '@mui/material/IconButton';
import { selectLabels, closeLeftSidebar } from './store/labelsSlice';
import { selectProjects } from './store/projectsSlice';
import { getTasks } from './store/tasksSlice';

const StyledListItem = styled(ListItem)(({ theme, active }) => ({
  color: 'inherit!important',
  textDecoration: 'none!important',
  height: 40,
  width: '100%',
  borderRadius: 20,
  paddingLeft: 16,
  paddingRight: 16,
  marginBottom: 8,
  fontWeight: 500,
  '&.active': {
    backgroundColor:
      theme.palette.mode === 'light'
        ? 'rgba(0, 0, 0, .05)!important'
        : 'rgba(255, 255, 255, .1)!important',
    pointerEvents: 'none',
    '& .list-item-icon': {
      color: theme.palette.secondary.main,
    },
  },
  '& .list-item-icon': {
    marginRight: 16,
  },
}));

function Labels(props) {
  const dispatch = useDispatch();
  const labels = useSelector(selectLabels);
  const projects = useSelector(selectProjects);

  const [currentActiveLabelId, setCurrentActiveLabelId] = useState(null);
  const [selectedLabelId, setSelectedLabelId] = useState('');
  const [selectedProjects, setSelectedProjects] = useState('');

  const handleLabelClick = (labelId) => {
    setCurrentActiveLabelId(labelId);
    setSelectedLabelId(labelId);

    if (labelId) {
      dispatch(getTasks({ labels: labelId, projects: selectedProjects }));
    } else {
      dispatch(getTasks({ projects: selectedProjects }));
    }
  };

  const { control } = useForm({});

  return (
    <div className="px-16 py-24">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
      >
        <IconButton
          className="m-4 absolute top-0 right-0 z-999"
          onClick={() => dispatch(closeLeftSidebar())}
          size="large"
        >
          <SvgIcon color="action">heroicons-outline:x</SvgIcon>
        </IconButton>
        <Typography className="text-15 font-600 leading-none" color="secondary.main">
          PROJECTS
        </Typography>
        {Object.keys(projects).length > 0 && (
          <Controller
            control={control}
            name="projects"
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                multiple
                id="projects"
                size="small"
                className="mt-12"
                options={projects?.results}
                disableCloseOnSelect
                getOptionLabel={(option) => option.name}
                renderOption={(_props, option, { selected }) => (
                  <li {..._props}>
                    <Checkbox style={{ marginRight: 8 }} checked={selected} size="small" />
                    {option.name}
                  </li>
                )}
                value={value ? value.map((id) => _.find(projects?.results, { id })) : []}
                onChange={(event, newValue) => {
                  const ids = newValue.map((item) => item.id);
                  dispatch(
                    getTasks({ projects: newValue.length ? ids : '', labels: selectedLabelId })
                  );
                  onChange(ids);
                  setSelectedProjects(newValue.length ? newValue.map((item) => item.id) : '');
                }}
                fullWidth
                renderInput={(params) => (
                  <TextField {...params} label="Projects" placeholder="Projects" size="small" />
                )}
              />
            )}
          />
        )}

        <Typography className="mt-20 text-15 font-600 leading-none" color="secondary.main">
          LABELS
        </Typography>
        <List className="">
          <StyledListItem
            button
            onClick={() => handleLabelClick('')}
            className={!currentActiveLabelId ? 'active' : ''}
          >
            <Box
              className="w-12 h-12 shrink-0 rounded-full mr-16"
              sx={{ backgroundColor: '#000' }}
            />
            <ListItemText className="truncate" primary="All" disableTypography />
          </StyledListItem>
          {Object.keys(labels).length > 0 &&
            labels?.results?.map((label) => (
              <StyledListItem
                key={label.id}
                button
                onClick={() => handleLabelClick(label.id)}
                className={currentActiveLabelId === label.id ? 'active' : ''}
              >
                <Box
                  className="w-12 h-12 shrink-0 rounded-full mr-16"
                  sx={{ backgroundColor: label.color }}
                />
                <ListItemText className="truncate" primary={label.name} disableTypography />
              </StyledListItem>
            ))}
        </List>
      </motion.div>
    </div>
  );
}

export default Labels;
