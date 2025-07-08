import {ChangeEvent, FormEvent, useState} from 'react';
import {isLoginFormReady} from '../../utils/offers';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {loginAction} from '../../store/api-action';
import {getUserProcessing} from '../../store/user-process/user-process.selectors';

function LoginForm(): JSX.Element {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const isUserProcessing = useAppSelector(getUserProcessing);
  const dispatch = useAppDispatch();

  const handleFieldChange = ({target}: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (isLoginFormReady(formData, isUserProcessing)) {
      dispatch(loginAction({
        email: formData.email,
        password: formData.password
      }));
    }
  };

  return (
    <form className='login__form  form' action='#' method='post' onSubmit={handleFormSubmit} data-testid='login-form'>
      <div className='login__input-wrapper  form__input-wrapper'>
        <label className='visually-hidden' htmlFor='login'>E-mail</label>
        <input className='login__input  form__input' id='login' type='email' name='email' placeholder='Email' value={formData.email} onChange={handleFieldChange} data-testid='login-field' required />
      </div>
      <div className='login__input-wrapper  form__input-wrapper'>
        <label className='visually-hidden' htmlFor='password'>Password</label>
        <input className='login__input  form__input' id='password' type='password' name='password' placeholder='Password' value={formData.password} onChange={handleFieldChange} data-testid='password-field' required />
      </div>
      <button className='login__submit  form__submit  button' type='submit' disabled={!isLoginFormReady(formData, isUserProcessing)}>Sign in</button>
    </form>
  );
}

export default LoginForm;
