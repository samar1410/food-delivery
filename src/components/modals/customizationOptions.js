export const customizationOptions = {
  Pizzas: {
    max: 4,
    groups: {
      "Vegetable Toppings": ["Cheese", "Green peppers", "Tomato", "Mushrooms", "Sweetcorn", "Jalapeños", "Olives", "Pineapples", "Onions"],
      "Meat Toppings": ["Chicken", "Beef", "Salami", "Pepperoni", "Chicken Tikka", "Fish"],
      "Seafood Toppings": ["Tuna", "Anchovies", "Prawns"],
    },
  },
  Burgers: {
    max: 4,
    groups: {
      Extras: ["Extra Cheese", "Bacon", "Lettuce", "Pickles", "Extra Sauce", "Caramelized Onions", "Avocado"],
    },
  },
  Salads: {
    max: 4,
    groups: {
      Dressing: ["Caesar Dressing", "Ranch Dressing", "Vinaigrette", "Lemon Dressing"],
      Extras: ["Avocado", "Croutons", "Feta Cheese", "Grilled Chicken"],
    },
  },
  "Garlic Bread": {
    max: 3,
    groups: {
      Extras: ["Extra Cheese", "Herbs", "Jalapeños", "Extra Garlic Butter"],
    },
  },
  "Cold Drinks": {
    max: 1,
    groups: {
      Size: ["Small", "Medium", "Large"],
    },
  },
  Desserts: {
    max: 3,
    groups: {
      Toppings: ["Extra Chocolate Sauce", "Whipped Cream", "Crushed Nuts", "Caramel Drizzle"],
    },
  },
};

// خيارات افتراضية لو الفئة مش موجودة في القايمة فوق
export const defaultCustomization = {
  max: 3,
  groups: {
    Extras: ["Extra Sauce", "No Onions", "Less Spicy", "Well Done"],
  },
};