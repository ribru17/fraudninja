import TinderCard from 'react-tinder-card';
import { Exercise } from '@shared_types';
import { useEffect, useRef, useState, createRef, useMemo } from 'react';
import { useAppSelector } from '../redux/hook';
import ApiSdk from '../api/apiSdk';
import { Button, Container } from '@mui/material';
import './PlayPage.css';
import FullScreenSpinner from '../components/FullScreenSpinner';

function PlayPage() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const hasFetched = useRef(false);
  const api = new ApiSdk();
  const { token } = useAppSelector((state) => state.session);

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      api.getRandomExercises(token).then((exercises) => {
        setExercises(exercises);
      });
    }
    // eslint-disable-next-line
  }, [token]);

  const [currentIndex, setCurrentIndex] = useState(exercises.length - 1);
  const currentIndexRef = useRef(currentIndex);

  useEffect(() => {
    setCurrentIndex(exercises.length - 1);
    currentIndexRef.current = exercises.length - 1;
  }, [exercises]);

  const updateCurrentIndex = (val: number) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const swiped = (_direction: string, index: number) => {
    updateCurrentIndex(index - 1);
  };

  const outOfFrame = (idx: number) => {
    console.log(
      `card with index ${idx} left the screen!`,
      currentIndexRef.current,
    );
    if (currentIndexRef.current >= idx && childRefs[idx].current) {
      childRefs[idx].current.restoreCard();
    }
  };

  const swipe = async (dir: string) => {
    if (canSwipe && currentIndex < exercises.length) {
      await childRefs[currentIndex].current.swipe(dir); // Swipe the card!
    }
  };

  const childRefs = useMemo(
    () =>
      Array(exercises.length)
        .fill(0)
        .map(() => createRef<any>()),
    [exercises.length],
  );

  const canSwipe = currentIndex >= 0;

  if (!exercises.length) return <FullScreenSpinner />;

  return (
    <Container className="restrictedScroll">
      <Container className="cardContainer">
        {exercises.map((card, index) => (
          <TinderCard
            onSwipe={(dir) => swiped(dir, index)}
            onCardLeftScreen={() => outOfFrame(index)}
            preventSwipe={['down', 'up']}
            className="card"
            ref={childRefs[index]}
            key={card.message}
          >
            <Container className="innerCard">{card.message}</Container>
          </TinderCard>
        ))}
      </Container>
      <Container className="buttons">
        <Button
          style={{ backgroundColor: !canSwipe ? '#c3c4d3' : 'red' }}
          onClick={() => swipe('left')}
        >
          Scam!
        </Button>
        <Button
          style={{ backgroundColor: !canSwipe ? '#c3c4d3' : 'green' }}
          onClick={() => swipe('right')}
        >
          Not a scam
        </Button>
      </Container>
    </Container>
  );
}

export default PlayPage;
