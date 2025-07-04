import {CITIES} from '../../const';
import Header from '../../component/header/header';
import LoginForm from '../../component/login-form/login-form';
import LinkToCity from '../../component/link-to-city/link-to-city';

function LoginScreen() {
  const city: string = CITIES[3];

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
              <LinkToCity city={city} />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoginScreen;
