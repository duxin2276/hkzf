import React from 'react';
import { withRouter } from 'react-router-dom';

import { NavBar, Icon } from 'antd-mobile';

import './navheader.less';

export const NavHeader = withRouter(
  ({
    left = true,
    children,
    history,
    backOnclick = () => history.goBack(),
    rightContent
  }) => (
    <NavBar
      className="nav"
      mode="light"
      icon={left ? (<Icon color="#333" type="left" />) : undefined}
      onLeftClick={backOnclick}
      rightContent={rightContent}
    >
      <span>{children}</span>
    </NavBar>
  )
);
