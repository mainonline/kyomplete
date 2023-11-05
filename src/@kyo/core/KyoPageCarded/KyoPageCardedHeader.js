import clsx from 'clsx';

function KyoPageCardedHeader(props) {
  return (
    <div className={clsx('KyoPageCarded-header', 'container')}>{props.header && props.header}</div>
  );
}

export default KyoPageCardedHeader;
