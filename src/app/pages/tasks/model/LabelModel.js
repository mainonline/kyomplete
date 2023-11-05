import _ from '@lodash';

function LabelModel(data) {
  data = data || {};

  return _.defaults(data, {
    name: '',
  });
}

export default LabelModel;
