import {PointerEvent} from 'react';
import {useNavigate} from 'react-router-dom';
import {AppRoute} from '../../const';
import {useAppDispatch} from '../../hooks';
import {changeCityAction} from '../../store/action';

type LinkToCityProps = {
  city: string;
};

function LinkToCity({city}: LinkToCityProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleCityPick = (evt: PointerEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    dispatch(changeCityAction({city}));
    navigate(AppRoute.Main);
  };

  return (
    <a className='locations__item-link' href='#' onClick={handleCityPick}>
      <span>{city}</span>
    </a>
  );
}

export default LinkToCity;
