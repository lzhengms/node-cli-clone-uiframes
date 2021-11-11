import React from 'react';
import { Header } from './Header';
export default {
  title: 'Example/Header',
  component: Header
};

var Template = function Template(args) {
  return /*#__PURE__*/React.createElement(Header, args);
};

export var LoggedIn = Template.bind({});
LoggedIn.args = {
  user: {}
};
export var LoggedOut = Template.bind({});
LoggedOut.args = {};