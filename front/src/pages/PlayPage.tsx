import { Button, Container } from '@mui/material';
import { createRef, useMemo, useRef, useState } from 'react';
import TinderCard from 'react-tinder-card';
import './PlayPage.css';

// TODO: Populate with data from the backend.
const db = [
  {
    text: 'TEXT',
  },
  {
    text: 'MORE TEXT',
  },
  {
    text: 'HERE TEXT',
  },
  {
    text: 'STUFF HERE',
  },
  {
    text: 'TESTING STUFF',
  },
];

function PlayPage() {
  const [currentIndex, setCurrentIndex] = useState(db.length - 1);
  const currentIndexRef = useRef(currentIndex);

  const swiped = (_direction: string, index: number) => {
    updateCurrentIndex(index - 1);
  };

  const outOfFrame = (idx: number) => {
    console.log(
      `card with index ${idx} left the screen!`,
      currentIndexRef.current,
    );
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
  };

  const swipe = async (dir: string) => {
    if (canSwipe && currentIndex < db.length) {
      await childRefs[currentIndex].current.swipe(dir); // Swipe the card!
    }
  };
  const childRefs = useMemo(
    () =>
      Array(db.length)
        .fill(0)
        .map((_) => createRef<any>()),
    [],
  );

  const updateCurrentIndex = (val: number) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canSwipe = currentIndex >= 0;

  return (
    <Container>
      <Container className='cardContainer'>
        {db.map((card, index) => (
          <TinderCard
            onSwipe={(dir) => swiped(dir, index)}
            onCardLeftScreen={() => outOfFrame(index)}
            preventSwipe={['down', 'up']}
            className='card'
            ref={childRefs[index]}
            key={index}
          >
            <Container className='innerCard'>
              {card.text}
            </Container>
          </TinderCard>
        ))}
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

export default PlayPage;
