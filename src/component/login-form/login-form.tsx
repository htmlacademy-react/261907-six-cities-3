import {ChangeEvent, FormEvent, useState} from 'react';
import {EMAIL_CHECKING_REGEXP} from '../../const';
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

    if (formData.email && formData.password) {
      dispatch(loginAction({
        email: formData.email,
        password: formData.password
      }));
    }
  };

  return (
    <form className='login__form  form' action='#' method='post' onSubmit={handleFormSubmit}>
      <div className='login__input-wrapper  form__input-wrapper'>
        <label className='visually-hidden'>E-mail</label>
        <input className='login__input  form__input' type='email' name='email' placeholder='Email' value={formData.email} onChange={handleFieldChange} required />
      </div>
      <div className='login__input-wrapper  form__input-wrapper'>
        <label className='visually-hidden'>Password</label>
        <input className='login__input  form__input' type='password' name='password' placeholder='Password' value={formData.password} onChange={handleFieldChange} required />
      </div>
      <button className='login__submit  form__submit  button' type='submit' disabled={!(formData.email && EMAIL_CHECKING_REGEXP.test(formData.email) && formData.password && !isUserProcessing)}>Sign in</button>
    </form>
  );
}

export default LoginForm;
