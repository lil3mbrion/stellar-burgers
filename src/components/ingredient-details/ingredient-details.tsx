import { FC } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { selectIngredients } from '../../services/slices/ingredientsSlice';

export const IngredientDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const ingredients = useSelector(selectIngredients);

  const ingredientData = ingredients.find(
    (ingredient) => ingredient._id === id
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  const isModal = location.state?.background;

  return (
    <>
      {!isModal && (
        <h2 className='text text_type_main-large mt-10 mb-5 text-center'>
          Детали ингредиента
        </h2>
      )}
      <IngredientDetailsUI ingredientData={ingredientData} />
    </>
  );
};
