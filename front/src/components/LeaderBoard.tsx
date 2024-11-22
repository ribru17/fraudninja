import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import type { User } from '@shared_types';

type LeaderBoardProps = {
  users: User[];
  currentUser: string; // username of the current user
};

const LeaderBoard: React.FC<LeaderBoardProps> = ({ users, currentUser }) => {
  // Sort users by overallScore in descending order and assign ranks
  const rankedUsers = [...users]
    .sort((a, b) => b.overallScore - a.overallScore)
    .map((user, _, sortedArray) => ({
      ...user,
      rank:
        sortedArray.findIndex((u) => u.overallScore === user.overallScore) + 1,
    }));

  return (
    <TableContainer
      component={Paper}
      sx={{
        margin: 'auto',
        marginTop: 4,
        background: 'linear-gradient(135deg, #ff9a9e, #fad0c4)',
        borderRadius: 3,
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell
              align='center'
              sx={{
                fontWeight: 'bold',
                fontSize: '1.2rem',
                color: '#fff',
                backgroundColor: '#ff6f61',
                borderRadius: '8px 0 0 8px',
              }}
            >
              Rank
            </TableCell>
            <TableCell
              align='center'
              sx={{
                fontWeight: 'bold',
                fontSize: '1.2rem',
                color: '#fff',
                backgroundColor: '#ff6f61',
              }}
            >
              Username
            </TableCell>
            <TableCell
              align='center'
              sx={{
                fontWeight: 'bold',
                fontSize: '1.2rem',
                color: '#fff',
                backgroundColor: '#ff6f61',
                borderRadius: '0 8px 8px 0',
              }}
            >
              Score
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rankedUsers.map((user) => (
            <TableRow
              key={user.username}
              sx={{
                backgroundColor:
                  user.username === currentUser
                    ? 'rgba(63, 81, 181, 0.2)'
                    : 'rgba(255, 255, 255, 0.9)',
                transition: 'background-color 0.3s ease',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.1)',
                },
              }}
            >
              <TableCell
                align='center'
                sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}
              >
                {user.rank === 1
                  ? '🥇'
                  : user.rank === 2
                    ? '🥈'
                    : user.rank === 3
                      ? '🥉'
                      : user.rank}
              </TableCell>
              <TableCell
                align='center'
                sx={{
                  fontSize: '1.1rem',
                  fontWeight: user.username === currentUser ? 'bold' : 'normal',
                }}
              >
                {user.username}
              </TableCell>
              <TableCell align='center' sx={{ fontSize: '1.1rem' }}>
                {user.overallScore}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LeaderBoard;
