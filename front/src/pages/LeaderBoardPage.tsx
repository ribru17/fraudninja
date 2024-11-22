import { useEffect, useRef, useState } from 'react';
import ApiSdk from '../api/apiSdk';
import ContainerPage from '../components/ContainerPage';
import LeaderBoard from '../components/LeaderBoard';
import type { User } from '@shared_types';
import { useAppSelector } from '../redux/hook';
import FullScreenSpinner from '../components/FullScreenSpinner';
import { useNavigate } from 'react-router-dom';
import PlayPrompt from '../components/PlayPrompt';

function LeaderBoardPage() {
  const [users, setUsers] = useState<User[]>([]);
  const hasFetched = useRef(false);
  const api = new ApiSdk();
  const { token } = useAppSelector((state) => state.session);
  const { userInfo } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      api.getAllUsers(token).then((users) => {
        setUsers(users);
      });
    }
    // eslint-disable-next-line
  }, [token]);

  if (!hasFetched) return <FullScreenSpinner />;

  return (
    <ContainerPage title={'🏆 Leaderboard 🏆'}>
      {userInfo.overallScore <= 0 && (
        <PlayPrompt onPlay={() => navigate('/play')} />
      )}
      {userInfo.overallScore > 0 && (
        <LeaderBoard
          users={users}
          currentUser={userInfo.username}
        ></LeaderBoard>
      )}
    </ContainerPage>
  );
}

export default LeaderBoardPage;
