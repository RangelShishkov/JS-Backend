const Electronic = require("../models/Electronic");

exports.create = (createData) => Electronic.create(createData);

exports.getAll = () => Electronic.find();

exports.getSingleElectronic = (electronicId) =>
  Electronic.findById(electronicId);

exports.update = (electronicId, createData) =>
  Electronic.findByIdAndUpdate(electronicId, createData, {
    runValidators: true,
  });

exports.delete = (electronicId) => Electronic.findByIdAndDelete(electronicId);

exports.getMyElectronics = (ownerId) =>
  Electronic.find({ owner: ownerId }).populate("owner");

exports.userBoughtToy = async (electronicId, userId) => {
  const Electronic = await this.getSingleElectronic(electronicId);
  const userHasBought = Electronic.buyingList.some(
    (b) => b?.toString() === userId
  );

  if (userHasBought) {
    return;
  }

  Electronic.buyingList.push(userId);
  return Electronic.save();
};

exports.search = (name, type) =>
  Electronic.find({ name: new RegExp(name, "i"), type: new RegExp(type, "i") });
