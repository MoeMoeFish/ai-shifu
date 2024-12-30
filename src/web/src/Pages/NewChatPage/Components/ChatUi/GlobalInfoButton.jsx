import { memo } from 'react';
import { Popover } from 'bootstrap';
import styles from './GlobalInfoButton.module.scss'

const GlobalInfoButton = () => {
  return <>
    <Popover></Popover>
  </>
}

export default memo(GlobalInfoButton);
