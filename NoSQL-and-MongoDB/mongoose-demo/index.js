const mongoose = require("mongoose");
const Cube = require("./models/cube");

const CONNECTION_STRING = "mongodb://localhost:27017/CubesDB";

async function connectDb() {
  await mongoose.connect(CONNECTION_STRING);

  console.log(`Database connected!`);

  const cubes = await Cube.find();
  //   cubes.forEach((cube) => console.log(cube.info));
  //   const c = await Cube.getCubesCollection(); console.log(c);

  //CREATE
  // Variant 1
  // const newCube = new Cube({ name: "2x2", description: "n/a", difficultyLevel: "3" });
  // newCube.save();

  // Variant 2
  // const newCube = await Cube.create({ name: "4x4", description: "sajkdas", difficultyLevel: "2" });
  // console.log(newCube);

  //READ
  // const cubes = await Cube.find();
  // const cubes = await Cube.find({difficultyLevel: 5});
  // const cubes = await Cube.findOne();
  // const cubes = await Cube.findById('65f7ff2f04ec6d4bd90cf84f');
  // console.log(cubes);

  // UPDATE
  // Variant 1
  // const updatedCube = await Cube.updateOne(
  //   { name: "2x2" },
  //   { difficultyLevel: 99 } 
  // );


  // Variant 2
  //   const cube = await Cube.findById("65f94d2684842b4a2871b72d");
  //   cube.name = 3x4;
  //   cube.difficultyLevel = "22";
  //   cube.save();

  // Variant 3
  //    await Cube.findByIdAndUpdate(65f94d2684842b4a2871b72d, { name: "4x3" });

  // DELETE
  // Variant 1
  //   await Cube.deleteOne({ name: "2x2" });

  // Variant 2
  //   await Cube.findByIdAndDelete("65f94d4b171c5d6efcce8ad8");
}

connectDb();
