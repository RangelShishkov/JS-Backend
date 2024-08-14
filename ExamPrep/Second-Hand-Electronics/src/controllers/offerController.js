const router = require("express").Router();
const electronicService = require("../services/electronicService");
const { isAuth } = require("../middlewares/authMiddleware");
const { extractErrorMsgs } = require("../utils/errorHandler");

router.get("/catalog", async (req, res) => {
  const electronics = await electronicService.getAll().lean();

  res.render("offer/catalog", { electronics });
});

router.get("/create", isAuth, (req, res) => {
  res.render("offer/create");
});

router.post("/create", async (req, res) => {
  const { name, type, damages, image, description, production,exploitation,price } = req.body;

  const payload = {
    name,
    type,
    damages,
    image,
    description,
    production,
    exploitation,
    price,
    owner: req.user,
  };

  try {
    await electronicService.create(payload);
    res.redirect("/offers/catalog");
  } catch (error) {
    const errorMessages = extractErrorMsgs(error);
    res.status(404).render("offer/create", { errorMessages });
  }
});

router.get("/search", async (req, res) => {
  const electronic = await electronicService.getAll().lean()
  res.render("offer/search", {electronic});
});

router.get("/:electronicId/details", async (req, res) => {
  const { electronicId } = req.params;

  const electronic = await electronicService.getSingleElectronic(electronicId).lean();

  const { user } = req;
  const { owner } = electronic;
  const isOwner = user?._id === owner.toString();
  const hasBought = electronic.buyingList?.some((b) => b?._id.toString() === user?._id);
  

  res.render("offer/details", {
    electronic,
    isOwner,
    hasBought
  });
});

router.get("/:electronicId/edit", isAuth, async (req, res) => {
  const { electronicId } = req.params;
  const electronic = await electronicService.getSingleElectronic(electronicId).lean();

  res.render("offer/edit", { electronic });
});

router.post("/:electronicId/edit", async (req, res) => {
  const { electronicId } = req.params;
  const { name, type, damages, image, description, production,exploitation,price } = req.body;

  const payload = {
    name,
    type,
    damages,
    image,
    description,
    production,
    exploitation,
    price,
    owner: req.user,
  };

  await electronicService.update(electronicId, payload);
  res.redirect(`/offers/${electronicId}/details`);
});

router.get("/:electronicId/delete", async (req, res) => {
  const { electronicId } = req.params;

  await electronicService.delete(electronicId);

  res.redirect("/offers/catalog");
});

router.get("/:electronicId/buy", async (req, res) => {
  const { electronicId } = req.params;
  const { _id } = req.user;

  await electronicService.userBoughtToy(electronicId, _id);
  res.redirect(`/offers/${electronicId}/details`);
});

router.post('/search', isAuth, async (req, res) => {
  const { name, type } = req.body;
  const electronics = await electronicService.search(name, type).lean();
  res.render('offer/search', { electronics })

});

module.exports = router;
