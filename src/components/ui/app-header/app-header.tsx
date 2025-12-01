import React, { FC } from 'react';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';
import { useNavigate } from 'react-router-dom';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => {
  const navigate = useNavigate();

  const handleConstructorClick = () => {
    navigate('/');
  };

  const handleFeedClick = () => {
    navigate('/feed');
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={styles.menu_part_left}>
          <div
            className={styles.menu_item}
            onClick={handleConstructorClick}
            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
          >
            <BurgerIcon type={'primary'} />
            <p className='text text_type_main-default ml-2 mr-10'>
              Конструктор
            </p>
          </div>
          <div
            className={styles.menu_item}
            onClick={handleFeedClick}
            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
          >
            <ListIcon type={'primary'} />
            <p className='text text_type_main-default ml-2'>Лента заказов</p>
          </div>
        </div>
        <div
          className={styles.logo}
          onClick={handleConstructorClick}
          style={{ cursor: 'pointer' }}
        >
          <Logo className='' />
        </div>
        <div
          className={styles.link_position_last}
          onClick={handleProfileClick}
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
        >
          <ProfileIcon type={'primary'} />
          <p className='text text_type_main-default ml-2'>
            {userName || 'Личный кабинет'}
          </p>
        </div>
      </nav>
    </header>
  );
};
