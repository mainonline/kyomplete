import * as React from 'react';
import PropTypes from 'prop-types';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useSpring, animated } from 'react-spring';
import { IconButton } from '@mui/material';
import SvgIcon from '@kyo/core/SvgIcon';
import Button from '@mui/material/Button';

const Fade = React.forwardRef(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element,
  in: PropTypes.bool.isRequired,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: 'none',
  borderRadius: '12px',
  boxShadow: 24,
  width: '360px',
  padding: '16px',
};

function CustomModal({ open, setOpen, children, title, cancelHandler, formName }) {
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 300,
        }}
      >
        <Fade in={open}>
          <Box sx={style} className="flex flex-col sm:w-512 md:w-8/12">
            <div className="w-full flex items-center justify-between border-b-1 border-gray-200 border-solid pb-10">
              <span id="spring-modal-title" className="text-2xl font-bold text-left">
                {title}
              </span>
              <IconButton aria-label="more" size="large" onClick={() => setOpen(false)}>
                <SvgIcon>heroicons-outline:x</SvgIcon>
              </IconButton>
            </div>

            <div>{children}</div>

            <div className="flex justify-end space-x-4 mt-4 py-20">
              <Button
                variant="text"
                color="secondary"
                onClick={cancelHandler}
                sx={{ borderRadius: '6px', minWidth: '180px' }}
              >
                Отмена
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                form={formName}
                sx={{ borderRadius: '6px', minWidth: '180px' }}
              >
                Сохранить
              </Button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default CustomModal;
