import { useDispatch } from 'react-redux';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { Question, copyForm, deleteForm, requiredForm } from "../../slices/form";

type Props = {
  item: Question
}

const ControlButton = ({ item }: Props) => {
  const dispatch = useDispatch();
  const handleCopy = () => {
    dispatch(copyForm({ id: item.id }));
  };

  const handleDelete = () => {
    dispatch(deleteForm({ id: item.id }))
  }

  const handleRequired = () => {
    dispatch(requiredForm({
      id: item.id,
      isRequired: !item.isRequired
    }));
  }

	return (
		<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
      <IconButton aria-label="copy" onClick={handleCopy} >
        <ContentCopyIcon fontSize='small' />
      </IconButton>

      <IconButton aria-label="delete" onClick={handleDelete} >
        <DeleteOutlineOutlinedIcon />
      </IconButton>

      <FormControlLabel
        value="필수"
        control={<Switch color="primary" />}
        label="필수"
        labelPlacement="start"
        onClick={handleRequired}
        style={{
          position: 'relative'
        }}
        sx={{
          '::before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: '8px',
            left: '-10px',
            width: '1px',
            height: 'calc(100% - 16px)',
            backgroundColor: 'rgba(0, 0, 0, 0.32)',
            borderRadius: '8px 8px 0 0'
          }
        }}
      />
		</div>
	)
}
export default ControlButton