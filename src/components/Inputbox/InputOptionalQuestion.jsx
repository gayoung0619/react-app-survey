const InputOptionalQuestion = () => {
  return (
		<form>
			<input type="text" placeholder="질문" />
			<label>
				<input
					type="radio"
					value="option1"
				/>
				Option 1
			</label>
			<label>
				<input
					type="radio"
					value="option2"
				/>
				Option 2
			</label>
		</form>
	)
}
export default InputOptionalQuestion