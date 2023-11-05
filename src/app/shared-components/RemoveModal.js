import * as React from 'react';
import PropTypes from 'prop-types';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
// web.cjs is required for IE11 support
import { useSpring, animated } from 'react-spring';

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
  width: 400,
  bgcolor: 'background.paper',
  border: 'none',
  borderRadius: '12px',
  boxShadow: 24,
  p: 4,
};

function RemoveModal({ open, setOpen, confirmRemove, title = 'Вы уверены?' }) {
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
          <Box sx={style} className="flex flex-col">
            <h2 id="spring-modal-title" className="text-2xl font-bold text-center mb-16">
              {title}
            </h2>
            <div className="flex justify-center items-center">
              <Button variant="outlined" className="mx-6" color="warning" onClick={confirmRemove}>
                Архивировать
              </Button>
              <Button variant="contained" className="mx-6" color="secondary" onClick={handleClose}>
                Отмена
              </Button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default RemoveModal;
