import express from "express";
const router = express.Router();
import { Product } from "../models/product";
import { verifyToken } from "./user";
import { User } from "../models/user";
import { ProductErrors, UserErrors } from "./errors";

router.get("/", verifyToken, async (req, res) => {
  try {
    const products = await Product.find({});
    res.json({ products });
  } catch (err) {
    res.status(400).json({ err });
  }
});

router.post("/checkout", verifyToken, async (req, res) => {
  const { customerId, cartItems } = req.body;

  try {
    const user = await User.findById(customerId);
    const productId = Object.keys(cartItems);
    const products = await Product.find({ _id: { $in: productId } });

    if (!user) {
      return res.status(400).json({ type: UserErrors.NO_USER_FOUND });
    }

    if (products.length !== productId.length) {
      return res.status(400).json({ type: ProductErrors.NO_PRODUCT_FOUND });
    }

    let totalPrice = 0;
    for (const item in cartItems) {
      const product = products.find((product) => String(product._id) === item);

      if (!product) {
        return res.status(400).json({ type: ProductErrors.NO_PRODUCT_FOUND });
      }

      if (product.stockQuantity < cartItems[item]) {
        return res.status(400).json({ type: ProductErrors.NOT_ENOUGH_STOCK });
      }

      totalPrice += product.price * cartItems[item];
    }

    if (user.availableMoney < totalPrice) {
      return res.status(400).json({ type: ProductErrors.NO_AVAILABLE_MONEY });
    }

    user.availableMoney -= totalPrice;
    user.purchasedItems.push(...productId);

    await user.save();
    await Product.updateMany(
      { _id: { $in: productId } },
      { $inc: { stockQuantity: -1 } }
    );

    res.json({ purchashedItems: user.purchasedItems });
  } catch (err) {
    res.status(400).json(err);
  }
});

export { router as productRouter };
