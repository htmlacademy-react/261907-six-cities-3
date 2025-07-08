import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {internet} from 'faker';
import {makeMockStore} from '../../utils/mocks';
import {withStore} from '../../utils/mock-component';
import LoginForm from './login-form';

describe('Component: LoginForm', () => {
  it('should render correctly', () => {
    const loginFormTestId = 'login-form';
    const {withStoreComponent} = withStore(<LoginForm />, makeMockStore());

    render(withStoreComponent);

    expect(screen.getByTestId(loginFormTestId)).toBeInTheDocument();
    expect(screen.getByLabelText('E-mail')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveAttribute('disabled');
  });

  it('should render entered login and password correctly', async () => {
    const loginFieldTestId = 'login-field';
    const passwordFieldTestId = 'password-field';
    const mockLogin = internet.email();
    const mockPassword = 'q1w2e3q';
    const {withStoreComponent} = withStore(<LoginForm />, makeMockStore());

    render(withStoreComponent);

    await userEvent.type(
      screen.getByTestId(loginFieldTestId),
      mockLogin
    );

    await userEvent.type(
      screen.getByTestId(passwordFieldTestId),
      mockPassword
    );

    expect(screen.getByDisplayValue(mockLogin)).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockPassword)).toBeInTheDocument();
    expect(screen.getByRole('button')).not.toHaveAttribute('disabled');
  });
});
