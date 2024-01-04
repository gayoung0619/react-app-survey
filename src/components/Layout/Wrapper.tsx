import React from 'react';
import classes from './Wrapper.module.css';

type Props = {
	children: React.ReactNode;
}

const Wrapper = (props: Props) => {
  return (
		<div className={classes.wrap}>
			{props.children}
		</div>
	)
}
export default Wrapper;