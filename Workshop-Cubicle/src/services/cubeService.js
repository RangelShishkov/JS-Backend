const fs = require("fs");
const path = require("path");
const Cube = require("./../models/Cube");

const DATABASE_FILE = path.join(__dirname, "database.json");

exports.create = async (cubeData) => {
  const cube = await Cube.create(cubeData);

  return cube;
};

exports.getAll = (search, from, to) => {
  try {
    const data = fs.readFileSync(DATABASE_FILE);
    let cubes = JSON.parse(data);

    // Apply search filter if provided
    if (search) {
      cubes = cubes.filter((cube) =>
        cube.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Apply difficulty level filter if provided
    if (from) {
      cubes = cubes.filter((cube) => cube.difficultyLevel >= Number(from));
    }
    if (to) {
      cubes = cubes.filter((cube) => cube.difficultyLevel <= Number(to));
    }

    return cubes;
  } catch (error) {
    console.error("Error reading file:", error);
    return [];
  }
};

exports.getSingleCube = (id) => {
  const cubes = this.getAll();
  return cubes.find((cube) => cube.id === id);
};
