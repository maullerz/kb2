import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as NotificationsSelectors from 'notifications/store/notification.selectors';
import * as NotificationsActions from 'notifications/store/notification.reducer';
import { IconButton } from 'components';

import UserMenu from './UserMenu';
import { StyledHeader, StyledRightArea, StyledIconButton } from './styles';

const Header = () => {
  const dispatch = useDispatch();
  const isNewNotificationsExist = useSelector(NotificationsSelectors.isNewNotifications);
  const isNewAlertsExist = useSelector(NotificationsSelectors.isNewAlerts);
  const theme = useSelector(NotificationsSelectors.globalTheme);
  const notifyIcon = isNewNotificationsExist ? 'notificationNew' : 'notification';
  const alertIcon = isNewAlertsExist ? 'warningNew' : 'warning';

  function toggleTheme() {
    if (theme === 'dark') {
      dispatch(NotificationsActions.setGlobalLightTheme());
    } else {
      dispatch(NotificationsActions.setGlobalDarkTheme());
    }
  }

  function openNewNotifications() {
    dispatch(NotificationsActions.setAlertsView(''));
    dispatch(NotificationsActions.setNotificationsView(isNewNotificationsExist ? 'new' : 'all'));
  }

  function openNewAlerts() {
    dispatch(NotificationsActions.setNotificationsView(''));
    dispatch(NotificationsActions.setAlertsView(isNewAlertsExist ? 'new' : 'all'));
  }

  return (
    <StyledHeader>
      <StyledIconButton
        icon={theme === 'dark' ? 'themeDark' : 'themeLight'}
        label="theme"
        color="primary"
        onClick={toggleTheme}
      />
      <StyledRightArea>
        <IconButton
          icon={notifyIcon}
          transparent
          originalColors
          onClick={openNewNotifications}
        />
        <IconButton
          icon={alertIcon}
          transparent
          originalColors
          onClick={openNewAlerts}
        />
        <UserMenu />
      </StyledRightArea>
    </StyledHeader>
  );
};

export default Header;
