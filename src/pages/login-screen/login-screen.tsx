import {PointerEvent} from 'react';
import {useNavigate} from 'react-router-dom';
import {CITIES, AppRoute} from '../../const';
import {useAppDispatch} from '../../hooks';
import {changeCityAction} from '../../store/action';
import Header from '../../component/header/header';
import LoginForm from '../../component/login-form/login-form';

function LoginScreen() {
  const city: string = CITIES[3];
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleCityPick = (evt: PointerEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    dispatch(changeCityAction({city}));
    navigate(AppRoute.Main);
  };

  return (
    <div className='page  page--gray  page--login'>
      <Header />
      <main className='page__main  page__main--login'>
        <div className='page__login-container  container'>
          <section className='login'>
            <h1 className='login__title'>Sign in</h1>
            <LoginForm />
          </section>
          <section className='locations  locations--login  locations--current'>
            <div className='locations__item'>
              <a className='locations__item-link' href='#' onClick={handleCityPick}>
                <span>{city}</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoginScreen;
