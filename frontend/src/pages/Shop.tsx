import useGetProducts from "../hooks/useGetProducts";
import Product from "./Product";

const Shop = () => {
  const { products } = useGetProducts();
  return (
    <div className="shop">
      <div className="products">
        {products.map((product) => (
          <div>
            <Product product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;

// [
//   {
//   "productName": "Final Fantasy IX",
//   "price": 49.99,
//   "description": "Fantasy Game",
//   "stockQuantity": 1,
//   "imageURL": "test",
// },
//   {
//   "productName": "Spider-Man 2",
//   "price": 69.99,
//   "description": "Superhero game",
//   "stockQuantity": 1,
//   "imageURL": "test",
// },
// ]
