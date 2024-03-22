/**
 * 아이콘 목록은 아래 링크에서 확인 가능.
 * 버튼 누르면 바로 복사해서 사용할 수 있음.
 * https://mui.com/material-ui/material-icons/
 */

import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import BottomNavigation from '@mui/material/BottomNavigation';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function BottomNav() {
  const navigate = useNavigate();

  return (
    <Box sx={{ width: '100%', height: '10%' }}>
      <BottomNavigation showLabels sx={{ height: '100%', backgroundColor: 'aliceblue' }}>
        <BottomNavigationAction label="내 정보" icon={<AccountCircleIcon />} onClick={() => navigate('/')} />
        <BottomNavigationAction
          label="유저 목록"
          icon={<FormatListBulletedIcon />}
          onClick={() => navigate('/list/21')}
        />
        <BottomNavigationAction label="유저 추가" icon={<PersonAddIcon />} onClick={() => navigate('/register')} />
      </BottomNavigation>
    </Box>
  );
}
