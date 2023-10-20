const router = require('express').Router();
const path = require('path');

router.get('/', (req, res) => {
  if (req.query.view === undefined) {
    res.sendFile(
      `C://Users/FPT/Downloads/ADAM_SHOP/adminAdamShop/pages/index.html`
    );
  } else {
    res.sendFile(
      `C://Users/FPT/Downloads/ADAM_SHOP/adminAdamShop/pages/${req.query.view}`
    );
  }
});

module.exports = router;
