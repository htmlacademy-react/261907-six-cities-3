import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';
import Header from '../../component/header/header';

function NotFoundScreen(): JSX.Element {
  return (
    <div className='page  page--gray  page--login'>
      <Header />
      <main className='page__main  page__main--login'>
        <div className='page__login-container  container'>
          <section className='login'>
            <h1 className='login__title'>The Page Isn’t Found</h1>
            <p>
              Please, go to the&nbsp;
              <Link to={AppRoute.Main}>main page</Link>
              .
            </p>
          </section>
          <section className='locations  locations--login  locations--current'>
            <div className='locations__item'>
              <a className='locations__item-link' href='#'>
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default NotFoundScreen;
