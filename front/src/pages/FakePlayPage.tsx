import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import React, { CSSProperties, useRef, useState } from 'react';
import EmailCard from '../components/EmailCard';
import TextCard from '../components/TextCard';
import './SwipeableCard.css';

interface FakeExercise {
  type: string;
  scam: boolean;
  category: string;
  message: string;
  feedback: string;
  sender: string;
}

const mockExercices: FakeExercise[] = [
  {
    type: 'email',
    scam: true,
    category: 'job',
    message: `
    Hi! Thank you for reaching out with your request. It sounds like you have a specific character count in mind, which is quite precise. Whether you're preparing text for a formal application, a creative project, or another purpose, ensuring the message fits perfectly is crucial. Below, I've crafted a response that meets your exact requirement of 1783 characters, providing meaningful and clear content while staying true to the length constraint.

    When planning or writing text with specific parameters, maintaining focus is essential. For instance, if this is for a project like a cover letter, pitch, or presentation, begin with a clear introduction that summarizes your main points succinctly. Transition smoothly into the body of your content, elaborating on key details, examples, or arguments, ensuring that each paragraph adds value to the overall message. Finally, a concise conclusion that reinforces your main ideas and includes a clear call-to-action (if applicable) is a great way to finish strongly.

    On the technical side, it can help to use tools like word processors with live character counts to monitor the length as you draft. Also, consider testing the readability and engagement of the content to ensure that every word contributes effectively.

    If you're crafting something creative, such as a fictional piece, description, or poetic writing, working within strict limits can spark innovation. You'll likely find that constraints foster creativity by requiring you to explore different structures or word choices.

    Feel free to share what the exact purpose of this 1783-character message is! I'd be glad to tailor this response further to your needs. Whether you're building professional content or working on a personal project, I hope this assistance aligns with your goals. Let me know if you need further help with edits or new drafts! 😊
    `,
    feedback:
      'This email contains suspicious job offer language and excessive detail that suggests a potential scam.',
    sender: 'balalalaa@gmaim.com',
  },
  {
    type: 'text',
    scam: true,
    category: 'job',
    message: 'this is a test',
    feedback:
      'This text message appears to be a vague and suspicious communication typical of scam attempts.',
    sender: '0202020222002',
  },
];

function SwipeableCard() {
  const [exercises, setExercises] = useState<FakeExercise[]>(mockExercices);
  const [currentIndex, setCurrentIndex] = useState(exercises.length - 1);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupResult, setPopupResult] = useState({
    isCorrect: false,
    feedback: '',
  });
  const [score, setScore] = useState(0);

  const [isComplete, setIsComplete] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);
  const startPosRef = useRef({ x: 0, y: 0 });

  const SWIPE_THRESHOLD = 200; // pixels to trigger a swipe

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!cardRef.current) return;

    setIsDragging(true);
    startPosRef.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !cardRef.current) return;

    const newX = e.clientX - startPosRef.current.x;
    const newY = e.clientY - startPosRef.current.y;

    setPosition({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    if (!cardRef.current) return;

    setIsDragging(false);

    // Determine swipe direction based on position
    if (Math.abs(position.x) > SWIPE_THRESHOLD) {
      const direction = position.x > 0 ? 'right' : 'left';
      handleSwipe(direction);
    } else {
      // Reset position if not swiped far enough
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleSwipe = (direction: 'left' | 'right') => {
    if (currentIndex < 0) return;

    const currentCard = exercises[currentIndex];

    // Did they answer correctly?
    const isCorrect =
      (direction === 'left' && currentCard.scam) ||
      (direction === 'right' && !currentCard.scam);

    // Create popup response
    setPopupResult({
      isCorrect,
      feedback: currentCard.feedback,
    });

    // Open popup
    setPopupOpen(true);

    // Remove swiped card
    const newExercises = [...exercises];
    newExercises.splice(currentIndex, 1);
    setExercises(newExercises);

    // Update current index
    if (currentIndex === 0) {
      setIsComplete(true);
    } else {
      setCurrentIndex((prev) => Math.max(prev - 1, -1));
    }

    // Reset position
    setPosition({ x: 0, y: 0 });

    // Update score if correct
    if (isCorrect) {
      setScore((prev) => prev + 10);
    }
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
    if (isComplete) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // Styles for the card based on dragging state
  const cardStyle: CSSProperties = {
    transform: `translate(${position.x}px, ${position.y}px) rotate(${position.x / 20}deg)`,
    transition: isDragging ? 'none' : 'transform 0.3s ease-out',
  };

  //If no cards left
  if (currentIndex < 0) {
    return <Typography variant='h6'>No more exercises!</Typography>;
  }

  // const currentCard = exercises[currentIndex]?.;

  return (
    <div className='app-container'>
      <Typography className='score-display'>Current score: {score}</Typography>
      <div className='wrapper'>
        <div className='card-container'>
          <div
            ref={cardRef}
            className='swipeable-card'
            style={cardStyle}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {exercises[currentIndex]?.type === 'email' ? (
              <EmailCard
                sender={exercises[currentIndex]?.sender}
                message={exercises[currentIndex]?.message}
              />
            ) : (
              <TextCard
                sender={exercises[currentIndex]?.sender}
                message={exercises[currentIndex]?.message}
              />
            )}
          </div>
        </div>
        <div className='button-container'>
          <Button
            variant='contained'
            style={{
              backgroundColor: currentIndex < 0 ? '#c3c4d3' : 'red',
              minWidth: '100px',
            }}
            onClick={() => handleSwipe('left')}
          >
            Corrupt!
          </Button>
          <Button
            variant='contained'
            style={{
              backgroundColor: currentIndex < 0 ? '#c3c4d3' : 'green',
              minWidth: '100px',
            }}
            onClick={() => handleSwipe('right')}
          >
            Honorable
          </Button>
        </div>
      </div>

      {/* Result Popup */}
      <Dialog
        open={popupOpen}
        onClose={handleClosePopup}
        aria-labelledby='result-dialog-title'
      >
        <DialogTitle id='result-dialog-title'>
          {popupResult.isCorrect ? 'Correct!' : 'Incorrect'}
        </DialogTitle>
        <DialogContent>
          <Typography variant='body1'>
            {popupResult.isCorrect
              ? 'Great job identifying the scam!'
              : "Oops! That wasn't the right assessment."}
          </Typography>
          <Typography variant='body2' style={{ marginTop: '16px' }}>
            <strong>Feedback:</strong> {popupResult.feedback}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePopup} color='primary'>
            {isComplete ? 'Finish' : 'Continue'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default SwipeableCard;
