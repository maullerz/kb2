import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { MenuItem } from '@material-ui/core';

// import AccountService from 'account/api/AccountService';
import AuthService, { ROLES } from 'services/AuthService';
import { Icon } from 'components';

import { UserMenuRoot, IconWrapper, StyledMenu, UserName, UserEmail, UserInfo, StyledIconButton } from './styles';

const USER_NAME = 'name';
const USER_ROLE = 'role';

const UserMenu = () => {
  const history = useHistory();

  const [userInfo, setUserInfo] = useState({ name: '', email: '' });

  const [anchorEl, setAnchorEl] = useState(null);
  const open = !!anchorEl;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const SignOut = async () => {
    // TODO call revokeToken withCredentials
    // await AccountService.revokeToken();
    AuthService.resetToken();
    handleClose();
    history.push('/account/signin');
  };

  const handleAccountClick = async () => {
    handleClose();
    history.push('/account');
  };

  useEffect(() => {
    setUserInfo({
      name: localStorage.getItem(USER_NAME),
      role: localStorage.getItem(USER_ROLE),
    });
  }, []);

  return (
    <UserMenuRoot>
      <UserInfo>
        <UserName>
          {userInfo.name}
        </UserName>
        <UserEmail>
          {ROLES[userInfo.role]}
        </UserEmail>
      </UserInfo>
      <StyledIconButton
        icon="threeDots"
        onClick={handleClick}
        transparent
      />
      <StyledMenu
        open={open}
        onClose={handleClose}
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: -17,
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleAccountClick}>
          <IconWrapper>
            <Icon icon="account" noWrapper />
          </IconWrapper>
          Account
        </MenuItem>
        <MenuItem onClick={SignOut}>
          <IconWrapper>
            <Icon icon="logOut" noWrapper />
          </IconWrapper>
          Sign Out
        </MenuItem>
      </StyledMenu>
    </UserMenuRoot>
  );
};

export default UserMenu;
