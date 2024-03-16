const uniqid = require("uniqid");

const cubes = [
  {
    id: "1ryucr7t8ltue8q1v",
    name: "Kub1",
    description: "Desc1",
    imageUrl:
      "https://kendamabulgaria.bg/wp-content/uploads/2024/01/%D0%A0%D0%A3%D0%91%D0%98%D0%9A-%D0%9A%D0%A3%D0%91%D0%A7%D0%95-3-X-3-X-3-V-CUBE-RUBIKS-CUBE-1.jpg",
    difficultyLevel: 2,
  },
  {
    id: "1ryucr7t8ltue8tw7",
    name: "asdas",
    description: "asdasd",
    imageUrl: "asdas",
    difficultyLevel: 5,
  },
  {
    name: "kub2",
    description: "desc2",
    imageUrl:
      "https://kendamabulgaria.bg/wp-content/uploads/2024/01/%D0%A0%D0%A3%D0%91%D0%98%D0%9A-%D0%9A%D0%A3%D0%91%D0%A7%D0%95-3-X-3-X-3-V-CUBE-RUBIKS-CUBE-1.jpg",
    difficultyLevel: "5",
  },
];

exports.create = (cubeData) => {
  const id = uniqid();
  const newCube = {
    id,
    ...cubeData,
  };

  cubes.push(newCube);

  return newCube;
};

exports.getAll = (search, from, to) => {
  let filterCubes = [...cubes];

  if (search) {
    filterCubes = filterCubes.filter((cube) =>
      cube.name.toLowerCase().includes(search.toLowerCase())
    );
  }
  if (from) {
    filterCubes = filterCubes.filter(
      (cube) => cube.difficultyLevel >= Number(from)
    );
  }
  if (to) {
    filterCubes = filterCubes.filter(
      (cube) => cube.difficultyLevel <= Number(from)
    );
  }
  return filterCubes;
};

exports.getSingleCube = (id) => {
  return cubes.find((cube) => cube.id === id);
};
