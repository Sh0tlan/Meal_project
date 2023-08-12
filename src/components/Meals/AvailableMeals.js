import { useEffect, useState } from "react";

import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import useHttp from "../../hooks/useHttp";

const AvailableMeals = () => {
  const { isLoading, error, sendRequest } = useHttp();

  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const trasformMeals = (MealObj) => {
      const loadedMeals = [];
      for (const Mealkey in MealObj) {
        loadedMeals.push({
          id: Mealkey,
          name: MealObj[Mealkey].name,
          description: MealObj[Mealkey].description,
          price: MealObj[Mealkey].price,
        });
      }
      setMeals(loadedMeals);
    };
    sendRequest({ url: "/meals.json" }, trasformMeals);
  }, [sendRequest]);

  if (error) {
    return (
      <section className={classes.MealsError}>
        <p>{error}</p>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
