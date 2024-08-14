const Device = require("../models/Device");

exports.create = (deviceData) => Device.create(deviceData);

exports.getAll = () => Device.find(); //.populate("preferredList")?

exports.getSingleDevice = (deviceId) =>
  Device.findById(deviceId); 

exports.update = (deviceId, deviceData) =>
  Device.findByIdAndUpdate(deviceId, deviceData, { runValidators: true });

exports.delete = (deviceId) => Device.findByIdAndDelete(deviceId);

exports.getMyDevices = (ownerId) =>
  Device.find({ owner: ownerId }).populate("owner");


exports.userHasPreferred = async (deviceId, userId) => {
  const Device = await this.getSingleDevice(deviceId);
  const userHasPreferred = Device.preferredList.some(
    (p) => p?.toString() === userId
  );

  if (userHasPreferred) {
    return;
  }

  Device.preferredList.push(userId);
  return Device.save();
};
