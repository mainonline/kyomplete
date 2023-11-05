import Loading from '@kyo/core/Loading';
import PropTypes from 'prop-types';
import { Suspense } from 'react';

/**
 * React Suspense defaults
 * For to Avoid Repetition
 */ function AppSuspense(props) {
  return <Suspense fallback={<Loading {...props.loadingProps} />}>{props.children}</Suspense>;
}

AppSuspense.propTypes = {
  loadingProps: PropTypes.object,
};

AppSuspense.defaultProps = {
  loadingProps: {
    delay: 0,
  },
};

export default AppSuspense;
