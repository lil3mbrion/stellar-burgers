import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectUser,
  updateUser,
  selectAuthError,
  selectAuthLoading,
  checkUserAuth
} from '../../services/slices/authSlice';
import { AppDispatch } from '../../services/store';

export const Profile: FC = () => {
  const user = useSelector(selectUser);
  const isLoading = useSelector(selectAuthLoading);
  const updateUserError = useSelector(selectAuthError);
  const dispatch = useDispatch<AppDispatch>();

  const [formValue, setFormValue] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: ''
  });

  const [localError, setLocalError] = useState('');

  useEffect(() => {
    setFormValue({
      name: user?.name || '',
      email: user?.email || '',
      password: ''
    });
  }, [user]);

  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (!isFormChanged) return;

    setLocalError('');

    try {
      await dispatch(checkUserAuth()).unwrap();

      await dispatch(
        updateUser({
          name: formValue.name,
          email: formValue.email,
          ...(formValue.password && { password: formValue.password })
        })
      ).unwrap();

      setFormValue((prev) => ({ ...prev, password: '' }));
    } catch (error: unknown) {
      console.error('Ошибка обновления профиля:', error);

      const errorMessage =
        error instanceof Error
          ? error.message
          : typeof error === 'string'
            ? error
            : 'Ошибка обновления профиля';

      setLocalError(errorMessage);
    }
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: user?.name || '',
      email: user?.email || '',
      password: ''
    });
    setLocalError('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
    setLocalError('');
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      updateUserError={localError || updateUserError || ''}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};
