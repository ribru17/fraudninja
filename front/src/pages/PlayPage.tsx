import {
  type Email,
  type Text as ExerciseText,
  type Exercise,
} from '@shared_types';
import { useEffect, useRef, useState, CSSProperties } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { setUser } from '../redux/slices';
import ApiSdk from '../api/apiSdk';
import FullScreenSpinner from '../components/FullScreenSpinner';
import { Button } from '@mui/material';
import EmailCard from '../components/EmailCard';
import TextCard from '../components/TextCard';
import './SwipeableCard.css';
import PopUpFeedback from '../components/PopUpFeedback';
import ScoreDisplay from '../components/ScoreDisplay';
import EndGame from '../components/EndGame';

export interface PopUpResult {
  isCorrect: boolean;
  feedback: string;
}

function PlayPage() {
  const [exercises, setExercises] = useState<(Email | ExerciseText)[]>([]);
  const [loading, setLoading] = useState(true);
  const { userInfo } = useAppSelector((state) => state.user);
  const [score, setScore] = useState<number>(userInfo.overallScore);
  const hasFetched = useRef(false);
  const api = new ApiSdk();
  const { token } = useAppSelector((state) => state.session);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [popupOpen, setPopupOpen] = useState<boolean>(false);
  const [popupResult, setPopupResult] = useState<PopUpResult>({
    isCorrect: false,
    feedback: '',
  });
  const [isComplete, setIsComplete] = useState(false);
  const [hasGraduatedChecked, setHasGraduatedChecked] = useState(false);
  const [isGraduating, setIsGraduating] = useState(false);
  const dispatch = useAppDispatch();
  const cardRef = useRef<HTMLDivElement>(null);
  const startPosRef = useRef({ x: 0, y: 0 });
  const SWIPE_THRESHOLD = 200; // pixels to trigger a swipe
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const currentIndexRef = useRef(currentIndex);
  const threshold_graduation = 1000;

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      api.getRandomExercises(token).then((exercises) => {
        setExercises(exercises);
        setCurrentIndex(exercises.length - 1);
        currentIndexRef.current = exercises.length - 1;
        setLoading(false);
      });
    }
    // eslint-disable-next-line
  }, [token]);

  const isEmail = (exercise: Exercise): exercise is Email => {
    return exercise.type === 'email';
  };

  const isText = (exercise: Exercise): exercise is ExerciseText => {
    return exercise.type === 'text';
  };

  function updateUserScore(newScore: number) {
    api
      .updateUser(token, userInfo._id, { overallScore: newScore })
      .then((user) => {
        if (user) {
          dispatch(setUser(user));
          setScore(user.overallScore); // score will be updated, so it can be displayed
        }
      });
  }

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
    if (currentIndex == null || currentIndex < 0 || !exercises[currentIndex])
      return;

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
    if (newExercises.length === 0) {
      setIsComplete(true);
    } else {
      setCurrentIndex((prev) => (prev !== null ? prev - 1 : null));
    }

    // Reset position
    setPosition({ x: 0, y: 0 });

    // Update score if correct
    if (isCorrect) {
      updateUserScore(score + 10);
    }
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
    if (isComplete) {
      setCurrentIndex(null);
    }
  };

  // Styles for the card based on dragging state
  const cardStyle: CSSProperties = {
    transform: `translate(${position.x}px, ${position.y}px) rotate(${position.x / 20}deg)`,
    transition: isDragging ? 'none' : 'transform 0.3s ease-out',
  };

  if (loading) {
    return <FullScreenSpinner />;
  }

  if (isComplete && !popupOpen) {
    if (!hasGraduatedChecked) {
      if (!userInfo.graduated && score >= threshold_graduation) {
        setIsGraduating(true);

        // Perform the API call to update graduation status and send email for graduation
        api
          .updateUser(token, userInfo._id, {
            graduated: true,
          })
          .then((user) => {
            if (user) {
              dispatch(setUser(user));
            }
          });

        setHasGraduatedChecked(true);
      }
    }

    return <EndGame totalScore={score} isGraduating={isGraduating} />;
  }

  const currentExercise =
    currentIndex !== null ? exercises[currentIndex] : null;

  return (
    <div className='app-container'>
      <ScoreDisplay score={score} />
      <div className='wrapper'>
        <div className='card-container' data-testid='cardContainer'>
          {currentExercise && (
            <div
              ref={cardRef}
              className='swipeable-card'
              data-testid='swipeable-card'
              style={cardStyle}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              {isEmail(currentExercise) ? (
                <EmailCard
                  sender={currentExercise.emailSender}
                  message={currentExercise.message}
                />
              ) : isText(currentExercise) ? (
                <TextCard
                  sender={currentExercise.phoneNumber}
                  message={currentExercise.message}
                />
              ) : null}
            </div>
          )}
        </div>

        <div className='button-container'>
          <Button
            variant='contained'
            color='error'
            onClick={() => handleSwipe('left')}
            disabled={currentIndex === null}
          >
            Corrupt!
          </Button>
          <Button
            variant='contained'
            color='success'
            onClick={() => handleSwipe('right')}
            disabled={currentIndex === null}
          >
            Honorable
          </Button>
        </div>
      </div>

      {/* Result Popup */}
      <PopUpFeedback
        popupOpen={popupOpen}
        handleClosePopup={handleClosePopup}
        popupResult={popupResult}
        isComplete={isComplete}
      />
    </div>
  );
}

export default PlayPage;
