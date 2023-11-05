import PropTypes from 'prop-types';

function Triangle(props) {
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      action();
    }
  };
  const { children, direction, action, value, order, active, ...other } = props;

  return (
    <span
      className="flex items-center"
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onClick={action}
    >
      {children}
      <span
        className={`ml-6 rotate-${
          direction === 'asc' && value === order ? '180' : '0'
        } transition-all delay-100`}
      >
        <svg
          width="10"
          height="8"
          viewBox="0 0 10 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M5 0L9.33013 7.5H0.669873L5 0Z" fill={active ? 'black' : 'gray'} />
        </svg>
      </span>
    </span>
  );
}

Triangle.propTypes = {
  children: PropTypes.node,
  action: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  order: PropTypes.string,
  direction: PropTypes.string.isRequired,
};

export default Triangle;