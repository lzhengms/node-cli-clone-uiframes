import "core-js/modules/es.object.keys.js";
import "core-js/modules/es.object.assign.js";
var _excluded = ["primary", "size", "backgroundColor", "label"];

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import "core-js/modules/es.array.join.js";

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';

/**
 * Primary UI component for user interaction
 */
export var Button = function Button(_ref) {
  var _ref$primary = _ref.primary,
      primary = _ref$primary === void 0 ? false : _ref$primary,
      _ref$size = _ref.size,
      size = _ref$size === void 0 ? 'medium' : _ref$size,
      backgroundColor = _ref.backgroundColor,
      label = _ref.label,
      props = _objectWithoutPropertiesLoose(_ref, _excluded);

  debugger;
  var mode = primary ? 'storybook-button--primary' : 'storybook-button--secondary';
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    className: ['storybook-button', "storybook-button--" + size, mode].join(' '),
    style: {
      backgroundColor: backgroundColor
    }
  }, props), "test", label);
};