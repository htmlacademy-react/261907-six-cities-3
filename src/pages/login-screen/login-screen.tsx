import {useNavigate} from 'react-router-dom';
import {Helmet} from 'react-helmet-async';
import {datatype} from 'faker';
import {AppRoute, AuthorizationStatus, CITIES} from '../../const';
import {useAppSelector} from '../../hooks';
import {getAuthorizationStatus} from '../../store/user-process/user-process.selectors';
import Header from '../../component/header/header';
import LoginForm from '../../component/login-form/login-form';
import LinkToCity from '../../component/link-to-city/link-to-city';
import { useEffect } from 'react';

function LoginScreen() {
  const navigate = useNavigate();
  const isAuthorized = useAppSelector(getAuthorizationStatus);

  useEffect(() => {
    if (isAuthorized === AuthorizationStatus.Auth) {
      navigate(AppRoute.Main);
    }
  });

  const city = CITIES[datatype.number(CITIES.length - 1)];

  return (
    <div className='page  page--gray  page--login'>
      <Helmet>
        <title>6 cities: authorization</title>
      </Helmet>
      <Header shouldRenderUserInfo={false} />
      <main className='page__main  page__main--login'>
        <div className='page__login-container  container'>
          <section className='login'>
            <h1 className='login__title'>Sign in</h1>
            <LoginForm />
          </section>
          <section className='locations  locations--login  locations--current'>
            <div className='locations__item'>
              <LinkToCity city={city} />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoginScreen;
