import { useContext } from "react";
import { IShopContext, ShopContext } from "../context/shopContext";
import useGetProducts from "../hooks/useGetProducts";
import { IProduct } from "../models/interface";
import CartItem from "./CartItem";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { getCartItemCount, getTotalCartAmount } =
    useContext<IShopContext>(ShopContext);
  const { products } = useGetProducts();
  const navigate = useNavigate();

  const totalAmount = getTotalCartAmount();
  return (
    <div className="cart">
      <div>
        <h1>Your Cart Items</h1>
      </div>
      <div className="cart">
        {products.map((product: IProduct) => {
          if (getCartItemCount(product._id) !== 0) {
            return <CartItem product={product} />;
          }
        })}
      </div>

      {totalAmount > 0 ? (
        <div className="checkout">
          <p>Subtotal: ${totalAmount.toFixed(2)}</p>
          <button onClick={() => navigate("/")}>Continue Shopping</button>
          <button>Checkout</button>
        </div>
      ) : (
        <h1>Your Shopping Cart is Empty</h1>
      )}
    </div>
  );
};

export default Checkout;
