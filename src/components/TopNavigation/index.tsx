/**
 * 아이콘 목록은 아래 링크에서 확인 가능.
 * 버튼 누르면 바로 복사해서 사용할 수 있음.
 * https://mui.com/material-ui/material-icons/
 */

import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import BottomNavigation from '@mui/material/BottomNavigation';
import { Typography } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
// import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function TopNav() {
  const navigate = useNavigate();

  return (
    <Box sx={{ width: '100%', height: '10%' }}>
      <BottomNavigation showLabels sx={{ height: '100%', backgroundColor: 'aliceblue' }}>
        <Typography>서비스 이름</Typography>
        <BottomNavigationAction label="내 정보" icon={<AccountCircleIcon />} onClick={() => navigate('/')} />
        <BottomNavigationAction label="로그인" icon={<PersonAddIcon />} onClick={() => navigate('/login')} />
        <BottomNavigationAction label="회원가입" icon={<PersonAddIcon />} onClick={() => navigate('/login')} />
      </BottomNavigation>
    </Box>
  );
}
