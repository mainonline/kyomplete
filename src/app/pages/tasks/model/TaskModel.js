import _ from '@lodash';

const TaskModel = (data) =>
  _.defaults(data || {}, {
    type: 'task',
    title: '',
    cover: {
      id: null,
      url: null,
    },
    description: '',
    completed: false,
    dueDate: null,
    priority: 'low',
    tags: [],
    members: [],
    subTasks: [],
    parentTasks: [],
    order: 1,
    status: 'todo',
    archived: false,
    hidden: false,
    attachments: [],
    reminderDate: null,
    projects: [],
    labels: [],
  });

export default TaskModel;