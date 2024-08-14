const router = require("express").Router();
const userService = require("../services/userService");
const deviceService = require("../services/deviceService");
const {isAuth, isLogged} = require("../middlewares/authMiddleware")



const { extractErrorMsgs } = require("../utils/errorHandler");

router.get("/register", isLogged, (req, res) => {
  res.render("user/register");
});

router.post("/register", async (req, res) => {
  const { username, email, password, repeatPassword } = req.body;

  try {
    const token = await userService.register({
      username,
      email,
      password,
      repeatPassword,
    });

    res.cookie("token", token, { httpOnly: true });
    res.redirect("/");

  } catch (error) {

    const errorMessages = extractErrorMsgs(error);
    res.status(404).render("user/register", { errorMessages,username,email, });
    
  }
});

router.get("/login", isLogged, (req, res) => {
  res.render("user/login");
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await userService.login(email, password);

    res.cookie("token", token, { httpOnly: true });
    res.redirect("/");
  } catch (error) {
    const errorMessages = extractErrorMsgs(error);
    res.status(404).render("user/login", { errorMessages, email });
  }
});

router.get("/logout",isAuth, (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
});

router.get("/profile", isAuth, async (req, res) => {
  const { user } = req;
  

  const myDevices = await deviceService.getMyDevices(user?._id).lean();

  // const preferredDevices = myDevices.filter(device => device.preferredList);
  // console.log({preferredDevices});

  res.render("user/profile", { myDevices,user });
});

module.exports = router;
