import Button from '@mui/material/Button';
import NavLinkAdapter from '@kyo/core/NavLinkAdapter';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Loading from '@kyo/core/Loading';
import _ from '@lodash';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import Box from '@mui/system/Box';
import SvgIcon from '@kyo/core/SvgIcon';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Autocomplete from '@mui/material/Autocomplete/Autocomplete';
import Checkbox from '@mui/material/Checkbox/Checkbox';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import IconButton from '@mui/material/IconButton';
import TaskPrioritySelector from './TaskPrioritySelector';
import FormActionsMenu from './FormActionsMenu';
import { addTask, getTask, newTask, selectTask, updateTask } from '../store/taskSlice';
import { selectTags } from '../store/tagsSlice';
import { selectUsers } from '../store/usersSlice';
import { selectProjects } from '../store/projectsSlice';
import { selectLabels } from '../store/labelsSlice';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  title: yup.string().required('You must enter a name'),
});

const TaskForm = (props) => {
  const task = useSelector(selectTask);
  const tags = useSelector(selectTags);
  const members = useSelector(selectUsers);
  const labels = useSelector(selectLabels);
  const projects = useSelector(selectProjects);
  const routeParams = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { control, watch, reset, handleSubmit, formState, getValues } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  const form = watch();

  /**
   * Update Task
   */
  // useDeepCompareEffect(() => {
  //   if (!isValid || _.isEmpty(form) || !task || routeParams.id === 'new') {
  //     return;
  //   }
  //
  //   if (!_.isEqual(task, form)) {
  //     onSubmit(form);
  //   }
  // }, [form, isValid]);

  useEffect(() => {
    if (routeParams.id === 'new') {
      dispatch(newTask(routeParams.type));
    } else {
      dispatch(getTask(routeParams.id));
    }
  }, [dispatch, routeParams]);

  useEffect(() => {
    reset({ ...task });
  }, [task, reset]);

  /**
   * Form Submit
   */
  function onSubmit(data) {
    delete data?.createdAt;
    delete data?.updatedAt;
    dispatch(updateTask(data)).then(() => {
      reset({ ...task });
      navigate('/tasks');
    });
  }

  function onSubmitNew(data) {
    dispatch(addTask(data)).then(({ payload }) => {
      navigate(`/tasks/${payload.id}`);
    });
  }

  if (_.isEmpty(form) || !task) {
    return <Loading />;
  }

  return (
    <>
      <div className="relative flex flex-col flex-auto items-center px-24 sm:px-48">
        <div className="flex items-center justify-between border-b-1 w-full py-12 mt-16 mb-12">
          <Controller
            control={control}
            name="completed"
            render={({ field: { value, onChange } }) => (
              <Button className="font-semibold" onClick={() => onChange(!value)}>
                <Box sx={{ color: value ? 'green' : 'text.disabled' }}>
                  <SvgIcon>heroicons-outline:check-circle</SvgIcon>
                </Box>
                <span className="mx-8">
                  {task.completed ? 'MARK AS INCOMPLETE' : 'MARK AS COMPLETE'}
                </span>
              </Button>
            )}
          />
          <div className="flex items-center">
            {routeParams.id !== 'new' && <FormActionsMenu taskId={task.id} />}
            <IconButton className="" component={NavLinkAdapter} to="/tasks" size="large">
              <SvgIcon>heroicons-outline:x</SvgIcon>
            </IconButton>
          </div>
        </div>

        <Controller
          control={control}
          name="title"
          render={({ field }) => (
            <TextField
              className="mt-12 max-h-auto"
              {...field}
              label={`${_.upperFirst(form.type)} title`}
              placeholder="Job title"
              id="title"
              error={!!errors.title}
              helperText={errors?.title?.message}
              variant="outlined"
              fullWidth
              multiline
              minRows={3}
              maxRows={10}
            />
          )}
        />

        {Object.keys(members).length > 0 && (
          <Controller
            control={control}
            name="members"
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                multiple
                id="members"
                size="small"
                className="mt-32"
                options={members.results}
                disableCloseOnSelect
                getOptionLabel={(option) => option.name}
                renderOption={(_props, option, { selected }) => (
                  <li {..._props}>
                    <Checkbox style={{ marginRight: 8 }} checked={selected} size="small" />
                    {option.name}
                  </li>
                )}
                value={value ? value.map((id) => _.find(members?.results, { id })) : []}
                onChange={(event, newValue) => {
                  onChange(newValue.map((item) => item.id));
                }}
                fullWidth
                renderInput={(params) => (
                  <TextField {...params} label="Members" placeholder="Members" size="small" />
                )}
              />
            )}
          />
        )}

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
                  onChange(newValue.map((item) => item.id));
                }}
                fullWidth
                renderInput={(params) => (
                  <TextField {...params} label="Projects" placeholder="Projects" size="small" />
                )}
              />
            )}
          />
        )}

        {Object.keys(labels).length > 0 && (
          <Controller
            control={control}
            name="labels"
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                multiple
                id="labels"
                size="small"
                className="mt-12"
                options={labels?.results}
                disableCloseOnSelect
                getOptionLabel={(option) => option.name}
                renderOption={(_props, option, { selected }) => (
                  <li {..._props}>
                    <Checkbox style={{ marginRight: 8 }} checked={selected} size="small" />
                    {option.name}
                  </li>
                )}
                value={value ? value.map((id) => _.find(labels?.results, { id })) : []}
                onChange={(event, newValue) => {
                  onChange(newValue.map((item) => item.id));
                }}
                fullWidth
                renderInput={(params) => (
                  <TextField {...params} label="Labels" placeholder="Labels" size="small" />
                )}
              />
            )}
          />
        )}

        {Object.keys(tags).length > 0 && (
          <Controller
            control={control}
            name="tags"
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                multiple
                id="tags"
                size="small"
                className="mt-32"
                options={tags.results}
                disableCloseOnSelect
                getOptionLabel={(option) => option.name}
                renderOption={(_props, option, { selected }) => (
                  <li {..._props}>
                    <Checkbox style={{ marginRight: 8 }} checked={selected} size="small" />
                    {option.name}
                  </li>
                )}
                value={value ? value.map((id) => _.find(tags?.results, { id })) : []}
                onChange={(event, newValue) => {
                  onChange(newValue.map((item) => item.id));
                }}
                fullWidth
                renderInput={(params) => (
                  <TextField {...params} label="Tags" placeholder="Tags" size="small" />
                )}
              />
            )}
          />
        )}
        <div className="flex w-full space-x-16 mt-32 mb-16 items-center">
          <Controller
            control={control}
            name="priority"
            render={({ field }) => <TaskPrioritySelector {...field} />}
          />

          <Controller
            control={control}
            name="dueDate"
            render={({ field }) => (
              <DateTimePicker
                {...field}
                className="w-full"
                clearable
                showTodayButton
                renderInput={(_props) => (
                  <TextField
                    size="small"
                    className=""
                    id="due-date"
                    label="Due date"
                    type="date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                    fullWidth
                    {..._props}
                  />
                )}
              />
            )}
          />
        </div>

        <Controller
          control={control}
          name="description"
          render={({ field }) => (
            <TextField
              className="mt-32"
              {...field}
              label="Description"
              placeholder="Notes"
              id="description"
              error={!!errors.description}
              helperText={errors?.description?.message}
              variant="outlined"
              fullWidth
              multiline
              minRows={5}
              maxRows={10}
              InputProps={{
                className: 'max-h-min h-min items-start',
                startAdornment: (
                  <InputAdornment className="mt-16" position="start">
                    <SvgIcon size={20}>heroicons-solid:menu-alt-2</SvgIcon>
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
      </div>
      {routeParams.id !== 'new' && (
        <Box
          className="flex items-center mt-40 py-14 pr-16 pl-4 sm:pr-48 sm:pl-36 border-t"
          sx={{ backgroundColor: 'background.default' }}
        >
          <Button className="ml-auto" component={NavLinkAdapter} to={-1}>
            Cancel
          </Button>
          <Button
            className="ml-8"
            variant="contained"
            color="secondary"
            disabled={_.isEmpty(dirtyFields) || !isValid}
            onClick={handleSubmit(onSubmit)}
          >
            Save
          </Button>
        </Box>
      )}
      {routeParams.id === 'new' && (
        <Box
          className="flex items-center mt-40 py-14 pr-16 pl-4 sm:pr-48 sm:pl-36 border-t"
          sx={{ backgroundColor: 'background.default' }}
        >
          <Button className="ml-auto" component={NavLinkAdapter} to={-1}>
            Cancel
          </Button>
          <Button
            className="ml-8"
            variant="contained"
            color="secondary"
            disabled={_.isEmpty(dirtyFields) || !isValid}
            onClick={handleSubmit(onSubmitNew)}
          >
            Create
          </Button>
        </Box>
      )}
    </>
  );
};

export default TaskForm;
