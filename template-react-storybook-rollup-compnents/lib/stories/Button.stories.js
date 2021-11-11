import React from 'react';
import { Button } from '../components/Button';
import '../components/Button/index.less'; // More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export

export default {
  title: 'Example/Button',
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: {
      control: 'color'
    }
  }
}; // More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

var Template = function Template(args) {
  return /*#__PURE__*/React.createElement(Button, args);
};

export var Primary = Template.bind({}); // More on args: https://storybook.js.org/docs/react/writing-stories/args

Primary.args = {
  primary: true,
  label: 'Button-primary'
};
export var Secondary = Template.bind({});
Secondary.args = {
  label: 'Button-secondary'
};
export var Large = Template.bind({});
Large.args = {
  size: 'large',
  label: 'Button-large'
};
export var Small = Template.bind({});
Small.args = {
  size: 'small',
  label: 'Button-small'
};