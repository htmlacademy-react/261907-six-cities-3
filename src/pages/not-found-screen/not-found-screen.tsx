import {Helmet} from 'react-helmet-async';
import {Link} from 'react-router-dom';
import {AppRoute, CITIES} from '../../const';
import Header from '../../component/header/header';
import LinkToCity from '../../component/link-to-city/link-to-city';

function NotFoundScreen(): JSX.Element {
  const city = CITIES[3];

  return (
    <div className='page  page--gray  page--login'>
      <Helmet>
        <title>6 cities: nothing here</title>
      </Helmet>
      <Header shouldRenderUserInfo={false} />
      <main className='page__main  page__main--login'>
        <div className='page__login-container  container'>
          <section className='login'>
            <h1 className='login__title'>The Page Isn’t Found</h1>
            <p data-testid='main-page-suggest'>
              Please, go to the&nbsp;
              <Link to={AppRoute.Main}>main page</Link>
              .
            </p>
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

export default NotFoundScreen;
