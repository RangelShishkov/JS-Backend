const router = require("express").Router();
const deviceService = require("../services/deviceService");


router.get("/", async(req, res) => {
  const devices = await deviceService.getAll().lean();

  res.render("home", {devices: devices.slice(-3) });
});

router.get("/about", (req, res) => {
  res.render("about");
});

router.get("/404", (req, res) => {
  res.render("404");
});

module.exports = router;
