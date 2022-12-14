const { Router } = require("express");
const emiRouter = Router();

emiRouter.post("/calculate", async (req, res) => {
  let { loan_amount, annual_int, tenure } = req.body;

  const rate = annual_int / 12 / 100;

  const n = 12 * tenure;

  try {
    const EMI = await Math.ceil(
      (loan_amount * rate * (1 + rate) ** n) / ((1 + rate) ** n - 1)
    );
    let totalAmountPayable = EMI * n;
    let interest = totalAmountPayable - loan_amount;

    res.send({
      EMI: EMI,
      InterestPayable: interest,
      totalPayment: totalAmountPayable,
    });
  } catch (err) {
    res.send({err:err, msg: "Please provide the necessary data"})
  }
});



module.exports = { emiRouter };
