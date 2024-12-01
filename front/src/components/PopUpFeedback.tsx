import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import { PopUpResult } from '../pages/PlayPage';
import '../pages/SwipeableCard.css';

interface PopUpFeedbackProps {
  popupOpen: boolean;
  handleClosePopup: () => void;
  popupResult: PopUpResult;
  isComplete: boolean;
}

function PopUpFeedback({
  popupOpen,
  handleClosePopup,
  popupResult,
  isComplete,
}: PopUpFeedbackProps) {
  return (
    <Dialog
      open={popupOpen}
      onClose={handleClosePopup}
      aria-labelledby='result-dialog-title'
    >
      <DialogTitle
        id='result-dialog-title'
        sx={{
          color: popupResult.isCorrect ? 'green' : 'red',
        }}
      >
        {popupResult.isCorrect ? 'Correct!' : 'Incorrect'}
      </DialogTitle>
      <DialogContent>
        <Typography variant='body1'>
          {popupResult.isCorrect
            ? 'Well done analyzing this message!'
            : "Oops! That wasn't the right assessment."}
        </Typography>
        <Typography
          variant='body2'
          style={{ marginTop: '16px' }}
          sx={{ whiteSpace: 'pre-wrap' }}
        >
          <strong>Feedback:</strong> {popupResult.feedback}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClosePopup} color='primary'>
          {isComplete ? 'Finish' : 'Continue'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export default PopUpFeedback;
