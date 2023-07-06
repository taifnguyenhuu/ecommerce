export const getAllProducts = () => {
  return fetch("https://dummyjson.com/products");
};

export const getProductsByCategory = (category) => {
  return fetch(`https://dummyjson.com/products/category/${category}`);
};
export const addToCart = (id) => {
  return fetch("https://dummyjson.com/carts/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: 1,
      products: [
        {
          id: id,
          quantity: 1,
        },
      ],
    }),
  }).then((res) => res.json());
};
