import { FC, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import {
  selectBun,
  selectIngredients,
  selectOrderModalData,
  setOrderModalData,
  closeOrderModal
} from '../../slices/constructorSlice';
import { createOrder, selectOrderLoading } from '../../slices/orderSlice';
import { AppDispatch } from '../../services/store';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const bun = useSelector(selectBun);
  const ingredients = useSelector(selectIngredients);
  const orderModalData = useSelector(selectOrderModalData);
  const orderRequest = useSelector(selectOrderLoading);
  const safeIngredients = ingredients || [];

  const onOrderClick = () => {
    if (!bun || orderRequest) return;

    const ingredientsIds = [
      bun._id,
      ...safeIngredients.map((item: any) => item._id),
      bun._id
    ];

    dispatch(createOrder(ingredientsIds))
      .unwrap()
      .then((order) => {
        dispatch(setOrderModalData(order));
      })
      .catch((error) => {
        console.error('Order creation failed:', error);
      });
  };

  const closeOrderModalHandler = () => {
    dispatch(closeOrderModal());
  };

  const price = useMemo(() => {
    const bunPrice = bun ? bun.price * 2 : 0;
    const ingredientsPrice = safeIngredients.reduce(
      (s: number, v: TConstructorIngredient) => s + v.price,
      0
    );
    return bunPrice + ingredientsPrice;
  }, [bun, safeIngredients]);

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={{ bun, ingredients: safeIngredients }}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModalHandler}
    />
  );
};
