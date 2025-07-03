import './server-error-note.css';
import {useAppSelector} from '../../hooks';

function ServerErrorNote(): JSX.Element | null {
  const errorText = useAppSelector((state) => state.error);

  return (errorText)
    ? <div className='error-note'>{errorText}</div>
    : null;
}

export default ServerErrorNote;
