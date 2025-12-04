import { FC, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import {
  selectBun,
  selectIngredients
} from '../../services/slices/constructorSlice';
import {
  createOrder,
  selectOrderLoading,
  selectCurrentOrder,
  clearCurrentOrder
} from '../../services/slices/orderSlice';
import { selectUser } from '../../services/slices/authSlice';
import { AppDispatch } from '../../services/store';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const bun = useSelector(selectBun);
  const ingredients = useSelector(selectIngredients) || [];
  const currentOrder = useSelector(selectCurrentOrder);
  const orderRequest = useSelector(selectOrderLoading);
  const user = useSelector(selectUser);

  const onOrderClick = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!bun || ingredients.length === 0 || orderRequest) return;

    const ingredientsIds = [
      bun._id,
      ...ingredients.map((item: TConstructorIngredient) => item._id),
      bun._id
    ];

    dispatch(createOrder(ingredientsIds))
      .unwrap()
      .then(() => {})
      .catch((error) => {
        console.error('Order creation failed:', error);
      });
  };

  const closeOrderModalHandler = () => {
    dispatch(clearCurrentOrder());
  };

  const price = useMemo(() => {
    const bunPrice = bun ? bun.price * 2 : 0;
    const ingredientsPrice = ingredients.reduce(
      (s: number, v: TConstructorIngredient) => s + v.price,
      0
    );
    return bunPrice + ingredientsPrice;
  }, [bun, ingredients]);

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={{ bun, ingredients }}
      orderModalData={currentOrder}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModalHandler}
    />
  );
};
