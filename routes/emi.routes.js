const { Router } = require("express");

const emiRouter = Router();

emiRouter.post("/calculate", async (req, res) => {
  let { loan_amount, annual_int, tenure } = req.body;

  let p = loan_amount;
  let r = annual_int / 12 / 100;
  let n = tenure;
  let E = (p * r * ((1 + r) ^ n)) / (((1 + r) ^ n) - 1);
  //   const

  res.send({ E });
});

module.exports = { emiRouter };
