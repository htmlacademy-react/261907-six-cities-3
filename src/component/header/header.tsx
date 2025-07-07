import Logo from '../logo/logo';
import UserInfo from '../user-info/user-info';

type HeaderProps = {
  shouldRenderUserInfo: boolean;
};

function Header({shouldRenderUserInfo}: HeaderProps): JSX.Element {
  return (
    <header className='header' data-testid='header'>
      <div className='container'>
        <div className='header__wrapper'>
          <Logo />
          {shouldRenderUserInfo && <UserInfo />}
        </div>
      </div>
    </header>
  );
}

export default Header;
