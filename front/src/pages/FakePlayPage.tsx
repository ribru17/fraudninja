import TinderCard from 'react-tinder-card';
import { createRef, useEffect, useMemo, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { setUser } from '../redux/slices';
import ApiSdk from '../api/apiSdk';
import { Button, Container, Typography } from '@mui/material';
import './PlayPage.css';
import FullScreenSpinner from '../components/FullScreenSpinner';
import EmailCard from '../components/EmailCard';
import TextCard from '../components/TextCard';

declare type Direction = 'left' | 'right' | 'up' | 'down';

declare interface TinderCardAPI {
  /**
   * Programmatically trigger a swipe of the card in one of the valid directions `'left'`, `'right'`, `'up'` and `'down'`. This function, `swipe`, can be called on a reference of the TinderCard instance. Check the [example](https://github.com/3DJakob/react-tinder-card-demo/blob/master/src/examples/Advanced.js) code for more details on how to use this.
   *
   * @param dir The direction in which the card should be swiped. One of: `'left'`, `'right'`, `'up'` and `'down'`.
   */
  swipe(dir?: Direction): Promise<void>;

  /**
   * Restore swiped-card state. Use this function if you want to undo a swiped-card (e.g. you have a back button that shows last swiped card or you have a reset button. The promise is resolved once the card is returned
   */
  restoreCard(): Promise<void>;
}

interface FakeExercise {
  type: string;
  scam: boolean;
  category: string;
  message: string;
  feedback: string;
}

interface FakeEmail extends FakeExercise {
  emailSender: string;
}

interface FakeText extends FakeExercise {
  phoneNumber: string;
}

const mockExercices = [
  {
    type: 'email',
    scam: true,
    category: 'job',
    message: 'this is a test',
    feedback: 'this is the feedback',
    emailSender: 'balalalaa@gmaim.com',
  },
  {
    type: 'text',
    scam: true,
    category: 'job',
    message: 'this is a test',
    feedback: 'this is the feedback',
    phoneNumber: '0202020222002',
  },
];

function FakePlayPage() {
  const [exercises, setExercises] =
    useState<(FakeEmail | FakeText)[]>(mockExercices);
  const { userInfo } = useAppSelector((state) => state.user);
  const [score, setScore] = useState<number>(userInfo.overallScore);
  const hasFetched = useRef(false);
  const api = new ApiSdk();
  const { token } = useAppSelector((state) => state.session);

  const dispatch = useAppDispatch();

  // Disable scrolling only for this specific page
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  // useEffect(() => {
  //   if (!hasFetched.current) {
  //     hasFetched.current = true;
  //     api.getRandomExercises(token).then((exercises) => {
  //       setExercises(exercises);
  //     });
  //   }
  //   // eslint-disable-next-line
  // }, [token]);

  const [currentIndex, setCurrentIndex] = useState(exercises.length - 1);
  const currentIndexRef = useRef(currentIndex);

  function onUpdateScoreUser(newScore: number) {
    const userUpdated = { overallScore: newScore };
    api.updateScoreUser(token, userInfo._id, userUpdated).then((user) => {
      if (user) {
        dispatch(setUser(user));
        setScore(user.overallScore); // score will be updated, so it can be displayed
      }
    });
  }

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
      childRefs[idx].current?.restoreCard();
    }
  };

  const swipe = async (dir: Direction) => {
    if (canSwipe && currentIndex < exercises.length) {
      await childRefs[currentIndex].current?.swipe(dir); // Swipe the card!
    }
  };

  const childRefs = useMemo(
    () =>
      Array(exercises.length)
        .fill(0)
        .map(() => createRef<TinderCardAPI>()),
    [exercises.length],
  );

  const canSwipe = currentIndex >= 0;

  if (!exercises.length) return <FullScreenSpinner />;

  return (
    <Container>
      {/* To BE REMOVED, JUST TO TRY HOW TO UPDATE SCORE */}
      <Button onClick={() => onUpdateScoreUser(score + 10)}>Test Score</Button>
      <Typography>Current score : {score}</Typography>
      <Container className='cardContainer'>
        {exercises.map((card, index) => {
          return (
            (card.type === 'email' && <EmailCard key={`email-${index}`} />) ||
            (card.type === 'text' && <TextCard key={`text-${index}`} />) || (
              <TinderCard
                onSwipe={(dir) => swiped(dir, index)}
                onCardLeftScreen={() => outOfFrame(index)}
                preventSwipe={['down', 'up']}
                className='card'
                ref={childRefs[index]}
                key={card.message}
              >
                <Container className='innerCard'>{card.message}</Container>
              </TinderCard>
            )
          );
        })}
      </Container>

      <Container className='buttons'>
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

export default FakePlayPage;
