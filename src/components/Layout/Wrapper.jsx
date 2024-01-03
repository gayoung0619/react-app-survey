import classes from './Wrapper.module.css';
const Wrapper = (props) => {
  return (
		<div className={classes.wrap}>
			{props.children}
		</div>
	)
}
export default Wrapper;