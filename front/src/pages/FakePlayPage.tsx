// import { Button, Container, Typography } from '@mui/material';
// import { createRef, useEffect, useMemo, useRef, useState } from 'react';
// import TinderCard from 'react-tinder-card';
// import ApiSdk from '../api/apiSdk';
// import FullScreenSpinner from '../components/FullScreenSpinner';
// import { useAppDispatch, useAppSelector } from '../redux/hook';
// import { setUser } from '../redux/slices';
// import './PlayPage.css';

// declare type Direction = 'left' | 'right' | 'up' | 'down';

// declare interface TinderCardAPI {
//   /**
//    * Programmatically trigger a swipe of the card in one of the valid directions `'left'`, `'right'`, `'up'` and `'down'`. This function, `swipe`, can be called on a reference of the TinderCard instance. Check the [example](https://github.com/3DJakob/react-tinder-card-demo/blob/master/src/examples/Advanced.js) code for more details on how to use this.
//    *
//    * @param dir The direction in which the card should be swiped. One of: `'left'`, `'right'`, `'up'` and `'down'`.
//    */
//   swipe(dir?: Direction): Promise<void>;

//   /**
//    * Restore swiped-card state. Use this function if you want to undo a swiped-card (e.g. you have a back button that shows last swiped card or you have a reset button. The promise is resolved once the card is returned
//    */
//   restoreCard(): Promise<void>;
// }

// interface FakeExercise {
//   type: string;
//   scam: boolean;
//   category: string;
//   message: string;
//   feedback: string;
// }

// interface FakeEmail extends FakeExercise {
//   emailSender: string;
// }

// interface FakeText extends FakeExercise {
//   phoneNumber: string;
// }

// const mockExercices = [
//   {
//     type: 'email',
//     scam: true,
//     category: 'job',
//     message: `
//     Hi! Thank you for reaching out with your request. It sounds like you have a specific character count in mind, which is quite precise. Whether you're preparing text for a formal application, a creative project, or another purpose, ensuring the message fits perfectly is crucial. Below, I’ve crafted a response that meets your exact requirement of 1783 characters, providing meaningful and clear content while staying true to the length constraint.

//     When planning or writing text with specific parameters, maintaining focus is essential. For instance, if this is for a project like a cover letter, pitch, or presentation, begin with a clear introduction that summarizes your main points succinctly. Transition smoothly into the body of your content, elaborating on key details, examples, or arguments, ensuring that each paragraph adds value to the overall message. Finally, a concise conclusion that reinforces your main ideas and includes a clear call-to-action (if applicable) is a great way to finish strongly.

//     On the technical side, it can help to use tools like word processors with live character counts to monitor the length as you draft. Also, consider testing the readability and engagement of the content to ensure that every word contributes effectively.

//     If you’re crafting something creative, such as a fictional piece, description, or poetic writing, working within strict limits can spark innovation. You’ll likely find that constraints foster creativity by requiring you to explore different structures or word choices.

//     Feel free to share what the exact purpose of this 1783-character message is! I'd be glad to tailor this response further to your needs. Whether you’re building professional content or working on a personal project, I hope this assistance aligns with your goals. Let me know if you need further help with edits or new drafts! 😊
//   `,
//     feedback: 'this is the feedback',
//     emailSender: 'balalalaa@gmaim.com',
//   },
//   {
//     type: 'text',
//     scam: true,
//     category: 'job',
//     message: 'this is a test',
//     feedback: 'this is the feedback',
//     phoneNumber: '0202020222002',
//   },
// ];

// function FakePlayPage() {
//   const [exercises, setExercises] =
//     useState<(FakeEmail | FakeText)[]>(mockExercices);
//   const { userInfo } = useAppSelector((state) => state.user);
//   const [score, setScore] = useState<number>(userInfo.overallScore);
//   const hasFetched = useRef(false);
//   const api = new ApiSdk();
//   const { token } = useAppSelector((state) => state.session);

//   const dispatch = useAppDispatch();

//   // Disable scrolling only for this specific page
//   useEffect(() => {
//     document.body.style.overflow = 'hidden';

//     return () => {
//       document.body.style.overflow = 'auto';
//     };
//   }, []);

//   // useEffect(() => {
//   //   if (!hasFetched.current) {
//   //     hasFetched.current = true;
//   //     api.getRandomExercises(token).then((exercises) => {
//   //       setExercises(exercises);
//   //     });
//   //   }
//   //   // eslint-disable-next-line
//   // }, [token]);

//   const [currentIndex, setCurrentIndex] = useState(exercises.length - 1);
//   const currentIndexRef = useRef(currentIndex);

//   function onUpdateScoreUser(newScore: number) {
//     const userUpdated = { overallScore: newScore };
//     api.updateScoreUser(token, userInfo._id, userUpdated).then((user) => {
//       if (user) {
//         dispatch(setUser(user));
//         setScore(user.overallScore); // score will be updated, so it can be displayed
//       }
//     });
//   }

//   useEffect(() => {
//     setCurrentIndex(exercises.length - 1);
//     currentIndexRef.current = exercises.length - 1;
//   }, [exercises]);

//   const updateCurrentIndex = (val: number) => {
//     setCurrentIndex(val);
//     currentIndexRef.current = val;
//   };

//   const swiped = (_direction: string, index: number) => {
//     updateCurrentIndex(index - 1);
//   };

//   const outOfFrame = (idx: number) => {
//     console.log(
//       `card with index ${idx} left the screen!`,
//       currentIndexRef.current,
//     );
//     if (currentIndexRef.current >= idx && childRefs[idx].current) {
//       childRefs[idx].current?.restoreCard();
//     }
//   };

//   const swipe = async (dir: Direction) => {
//     if (canSwipe && currentIndex < exercises.length) {
//       await childRefs[currentIndex].current?.swipe(dir); // Swipe the card!
//     }
//   };

//   const childRefs = useMemo(
//     () =>
//       Array(exercises.length)
//         .fill(0)
//         .map(() => createRef<TinderCardAPI>()),
//     [exercises.length],
//   );

//   const canSwipe = currentIndex >= 0;

//   if (!exercises.length) return <FullScreenSpinner />;

//   return (
//     <Container>
//       {/* To BE REMOVED, JUST TO TRY HOW TO UPDATE SCORE */}
//       <Button onClick={() => onUpdateScoreUser(score + 10)}>Test Score</Button>
//       <Typography>Current score : {score}</Typography>
//       {/* <Container className='cardContainer'>
//         {exercises.map((card, index) => {
//           return (
//             (card.type === 'email' && <FakeEmail key={`email-${index}`} />) ||
//             (card.type === 'text' && <FakeText key={`text-${index}`} />) || (
//               <TinderCard
//                 onSwipe={(dir) => swiped(dir, index)}
//                 onCardLeftScreen={() => outOfFrame(index)}
//                 preventSwipe={['down', 'up']}
//                 className='card'
//                 ref={childRefs[index]}
//                 key={card.message}
//               >
//                 <Container className='innerCard'>{card.message}</Container>
//               </TinderCard>
//             )
//           );
//         })}
//       </Container> */}
//       <Container className='cardContainer'>
//         {exercises.map((card, index) => {
//           if (card.type === 'email') {
//             const emailCard = card as FakeEmail; // Type narrowing
//             return (
//               <TinderCard
//                 onSwipe={(dir) => swiped(dir, index)}
//                 onCardLeftScreen={() => outOfFrame(index)}
//                 preventSwipe={['down', 'up']}
//                 className='card'
//                 ref={childRefs[index]}
//                 key={`email-${index}`}
//               >
//                 <Container className='innerCard'>
//                   <Typography variant='h6'>Email:</Typography>
//                   <Typography variant='body1'>{emailCard.message}</Typography>
//                   <Typography variant='caption'>
//                     From: {emailCard.emailSender}
//                   </Typography>
//                 </Container>
//               </TinderCard>
//             );
//           } else if (card.type === 'text') {
//             const textCard = card as FakeText; // Type narrowing
//             return (
//               <TinderCard
//                 onSwipe={(dir) => swiped(dir, index)}
//                 onCardLeftScreen={() => outOfFrame(index)}
//                 preventSwipe={['down', 'up']}
//                 className='card'
//                 ref={childRefs[index]}
//                 key={`text-${index}`}
//               >
//                 <Container className='innerCard'>
//                   <Typography variant='h6'>Text:</Typography>
//                   <Typography variant='body1'>{textCard.message}</Typography>
//                   <Typography variant='caption'>
//                     From: {textCard.phoneNumber}
//                   </Typography>
//                 </Container>
//               </TinderCard>
//             );
//           }
//           return (
//             <TinderCard
//               onSwipe={(dir) => swiped(dir, index)}
//               onCardLeftScreen={() => outOfFrame(index)}
//               preventSwipe={['down', 'up']}
//               className='card'
//               ref={childRefs[index]}
//               key={card.message}
//             >
//               <Container className='innerCard'>
//                 <Typography>{card.message}</Typography>
//               </Container>
//             </TinderCard>
//           );
//         })}
//       </Container>

//       <Container className='buttons'>
//         <Button
//           style={{ backgroundColor: !canSwipe ? '#c3c4d3' : 'red' }}
//           onClick={() => swipe('left')}
//         >
//           Scam!
//         </Button>
//         <Button
//           style={{ backgroundColor: !canSwipe ? '#c3c4d3' : 'green' }}
//           onClick={() => swipe('right')}
//         >
//           Not a scam
//         </Button>
//       </Container>
//     </Container>
//   );
// }

// export default FakePlayPage;

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import React, { CSSProperties, useRef, useState } from 'react';
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

    // Determine if the user's response is correct
    const isCorrect =
      (direction === 'left' && currentCard.scam) ||
      (direction === 'right' && !currentCard.scam);

    // Prepare popup content
    setPopupResult({
      isCorrect,
      feedback: currentCard.feedback,
    });

    // Open the popup
    setPopupOpen(true);

    // Remove the swiped card
    const newExercises = [...exercises];
    newExercises.splice(currentIndex, 1);
    setExercises(newExercises);

    // Update current index
    setCurrentIndex((prev) => Math.max(prev - 1, -1));

    // Reset position
    setPosition({ x: 0, y: 0 });

    // Update score if correct
    if (isCorrect) {
      setScore((prev) => prev + 10);
    }
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
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

  const currentCard = exercises[currentIndex];

  return (
    <div className='app-container'>
      <Typography className='score-display'>Current score: {score}</Typography>

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
          <Typography variant='h6'>
            {currentCard.type === 'email' ? 'Email:' : 'Text:'}
          </Typography>
          <Typography
            variant='body1'
            style={{
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              width: '100%',
            }}
          >
            {currentCard.message}
          </Typography>
          <Typography variant='caption'>From: {currentCard.sender}</Typography>
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
          Scam!
        </Button>
        <Button
          variant='contained'
          style={{
            backgroundColor: currentIndex < 0 ? '#c3c4d3' : 'green',
            minWidth: '100px',
          }}
          onClick={() => handleSwipe('right')}
        >
          Not a scam
        </Button>
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
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default SwipeableCard;
