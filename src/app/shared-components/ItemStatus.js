import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';

const ItemStatus = ({ status }) => {
  // ['barter', 'rent', 'cancel', 'purchase', 'mortgage']
  switch (status) {
    case 'barter':
      return (
        <Box
          className="flex items-center rounded-4 px-8 py-4 w-96"
          sx={{
            backgroundColor: '#D4FCCE',
            color: '#597C53',
          }}
        >
          <Typography className="ml-6 font-medium">Бартер</Typography>
        </Box>
      );
    case 'rent':
      return (
        <Box
          className="flex items-center rounded-4 px-8 py-4 w-96"
          sx={{
            backgroundColor: '#FCECCE',
            color: '#7C6E53',
          }}
        >
          <Typography className="ml-6 font-medium">Бронь</Typography>
        </Box>
      );
    case 'purchase':
      return (
        <Box
          className="flex items-center rounded-4 px-8 py-4 w-96"
          sx={{
            backgroundColor: '#DEDEDE',
            color: '#5A5A5A',
          }}
        >
          <Typography className="ml-6 font-medium">Продано</Typography>
        </Box>
      );
    case 'mortgage':
      return (
        <Box
          className="flex items-center rounded-4 px-8 py-4 w-96"
          sx={{
            backgroundColor: '#F6CEFC',
            color: '#79537C',
          }}
        >
          <Typography className="ml-6 font-medium">Рассрочка</Typography>
        </Box>
      );
    case 'cancel':
      return (
        <Box
          className="flex items-center rounded-4 px-8 py-4 w-96"
          sx={{
            backgroundColor: '#ee5e5e',
            color: '#721212',
          }}
        >
          <Typography className="ml-6 font-medium">Отмена</Typography>
        </Box>
      );
    default:
      return (
        <Box
          className="flex items-center rounded-4 px-8 py-4 w-96"
          sx={{
            backgroundColor: '#CEDEFC',
            color: '#535E7C',
          }}
        >
          <Typography className="ml-6 font-medium">Свободна</Typography>
        </Box>
      );
  }
};

export default ItemStatus;
