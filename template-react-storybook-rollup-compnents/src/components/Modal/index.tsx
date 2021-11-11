import React from 'react';

interface ModalProps {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean;
  /**
   * What background color to use
   */
  backgroundColor?: string;
  /**
   * How large should the button be?
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Button contents
   */
  label: string;
  /**
   * Optional click handler3333
   */
  onClick?: () => void;
}
/**
 * Primary UI component for user interaction
 */
export const Modal = ({
  ...props
}: ModalProps) => {
  return (
    <div className='modal'>这是一个弹窗</div>
  );
};
