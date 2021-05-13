import Products from "../Models/Products.js";

export const insertProducts = async (req, res) => {
    try {
        const products = await Products.create(req.body);
        res.status(200).send(products);
      } catch (err) {
        res.status(404)
      }
}