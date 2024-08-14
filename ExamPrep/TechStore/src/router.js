const router = require("express").Router();
const homeController = require("./controllers/homeController");
const userController = require("./controllers/userController");
const offerController = require("./controllers/offerController");

router.use(homeController);
router.use("/users", userController);
router.use("/offers", offerController);

router.get("*", (req, res) => {
  res.redirect("/404");
});

module.exports = router;
