import React from 'react';
import { Modal } from '../components/Modal';
import '../components/Modal/index.less'; // More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export

export default {
  title: 'Example/Modal',
  component: Modal,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: {
      control: 'color'
    }
  }
}; // More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

var Template = function Template(args) {
  return /*#__PURE__*/React.createElement(Modal, args);
};

export var ModalPrimary = Template.bind({});