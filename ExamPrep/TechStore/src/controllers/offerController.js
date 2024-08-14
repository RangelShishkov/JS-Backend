const router = require("express").Router();
const deviceService = require("../services/deviceService");
const {isAuth} = require("../middlewares/authMiddleware")
const { extractErrorMsgs } = require("../utils/errorHandler");


router.get("/catalog", async (req, res) => {
  const devices = await deviceService.getAll().lean();

  res.render("offer/catalog", { devices });
});

router.get("/create", isAuth, (req, res) => {
  res.render("offer/create");
});

router.post("/create", isAuth,  async (req, res) => {
  const { brand, model, hardDisk, screenSize, ram, operatingSystem,cpu,gpu,price,color,weight,image } = req.body;

  const payload = {
    brand,
    model,
    hardDisk,
    screenSize,
    ram,
    operatingSystem,
    cpu,
    gpu,
    price,
    color,
    weight,
    image,
    owner: req.user,
  };

  try{
    await deviceService.create(payload);
    res.redirect("/offers/catalog");
  }catch(error) {
    const errorMessages = extractErrorMsgs(error);
    res.status(404).render("offer/create", { errorMessages });
  }

});


router.get("/:deviceId/details", async (req, res) => {
  const { deviceId } = req.params;

  const device = await deviceService.getSingleDevice(deviceId).lean();

  const { user } = req;
  const { owner } = device;
  const isOwner = user?._id === owner.toString();
  const hasPreferred = device.preferredList?.some((d) => d?._id.toString() === user?._id);


  res.render("offer/details", {
    device,
    isOwner,
    hasPreferred
  });
});

router.get("/:deviceId/edit", isAuth, async (req, res) => {
  const { deviceId } = req.params;
  const device = await deviceService.getSingleDevice(deviceId).lean();

  res.render("offer/edit", { device });
});

router.post("/:deviceId/edit", async (req, res) => {
  const { deviceId } = req.params;
  const { brand, model, hardDisk, screenSize, ram, operatingSystem,cpu,gpu,price,color,weight,image } = req.body;

  const payload = {
    brand,
    model,
    hardDisk,
    screenSize,
    ram,
    operatingSystem,
    cpu,
    gpu,
    price,
    color,
    weight,
    image,
    owner: req.user,
  };

  await deviceService.update(deviceId, payload);
  res.redirect(`/offers/${deviceId}/details`);
});

router.get("/:deviceId/delete", isAuth, async (req, res) => {
  const { deviceId } = req.params;

  await deviceService.delete(deviceId);

  res.redirect("/offers/catalog");
});

router.get("/:deviceId/prefer", isAuth, async (req, res) => {
  const { deviceId } = req.params;
  const { _id } = req.user;

  await deviceService.userHasPreferred(deviceId, _id);
  res.redirect(`/offers/${deviceId}/details`);
});

module.exports = router;
