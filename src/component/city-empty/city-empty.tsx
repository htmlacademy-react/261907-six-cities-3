import {useAppDispatch, useAppSelector} from '../../hooks';
import {getCity} from '../../store/app-process/app-process.selectors';
import {getOffersAction} from '../../store/api-action';

type CityEmptyProps = {
  withError: boolean;
};

function CityEmpty({withError}: CityEmptyProps): JSX.Element {
  const city = useAppSelector(getCity);
  const dispatch = useAppDispatch();

  return (
    <section className='cities__no-places'>
      <div className='cities__status-wrapper  tabs__content'>
        <b className='cities__status'>No places to stay available</b>
        <p className='cities__status-description'>
          {withError
            ? (
              <>
                {'An error occured. Please, try to'}&nbsp;
                <a
                  onClick={() => {
                    dispatch(getOffersAction());
                  }}
                >
                  refresh the page
                </a>.
              </>
            )
            : `We could not find any property available at the moment in ${city}`}
        </p>
      </div>
    </section>
  );
}

export default CityEmpty;
