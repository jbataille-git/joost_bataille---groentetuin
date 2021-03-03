// t/m requirement 4
// jest aanroepen: ..\27_test\node_modules\.bin\jest --watch farm

const { 
  getYieldForPlant,
  getYieldForCrop, 
  getTotalYield,
  getCostForPlant,
  getCostForCrop,
  getRevenueForCrop,
  getProfitForCrop,
  getTotalProfit
} = require("./farm");

const corn = {
  name: "corn",
  cost: 1,
  yield: 3,
  salePrice: 1,
  factors: {
    sun: {
      low: -50,
      medium: 0,
      high: 50,
    },
    locusts: {
      none: 0,
      some: -25,
      many: -50,
    }
  },
};

const pumpkin = {
  name: "pumpkin",
  cost: 2,
  yield: 4,
  salePrice: 2,
  factors: {
    sun: {
      low: -25,
      medium: 0,
      high: 25,
    },
    locusts: {
      none: 0,
      some: -10,
      many: -20,
    },
  },
};

const input = {
  crop: corn,
  numCrops: 10,
};

const crops = [
  { crop: corn, numCrops: 5 },
  { crop: pumpkin, numCrops: 2 },
];

const crops2 = [{ crop: corn, numCrops: 0 }];

let environmentFactors = {
  sun: "medium",
  locusts: "none"
};

// ----------------------------------------------------------------------------
describe("getYieldForPlant", () => {   // wat is describe?

  test("Get yield for corn with no environment factors", () => {
    expect(getYieldForPlant(corn, environmentFactors)).toBe(3);
  });

  test("Get yield for pumpkin with no environment factors", () => {
    expect(getYieldForPlant(pumpkin, environmentFactors)).toBe(4);
  });

  test("Get yield for corn with medium sun and many locusts", () => {
    environmentFactors.locusts = "many";
    expect(getYieldForPlant(corn, environmentFactors)).toBe(1.5);
  });

  test("Get yield for corn with low sun", () => {
    environmentFactors.sun = "low";
    environmentFactors.locusts = "none";
    expect(getYieldForPlant(corn, environmentFactors)).toBe(1.5);
  });

  test("Get yield for pumpkin with low sun", () => {
    environmentFactors.sun = "low";
    environmentFactors.locusts = "none";
    expect(getYieldForPlant(pumpkin, environmentFactors)).toBe(3);
  });

  test("Get yield for corn with high sun", () => {
    environmentFactors.sun = "high";
    environmentFactors.locusts = "none";
    expect(getYieldForPlant(corn, environmentFactors)).toBe(4.5);
  });

  test("Get yield for pmpkin with high sun", () => {
    environmentFactors.sun = "high";
    environmentFactors.locusts = "none";
    expect(getYieldForPlant(pumpkin, environmentFactors)).toBe(5);
  });

  test("Get yield for pumpkin with high sun and some locusts", () => {
    environmentFactors.sun = "high";
    environmentFactors.locusts = "some";
    expect(getYieldForPlant(pumpkin, environmentFactors)).toBe(4.5);
  });

});

// ----------------------------------------------------------------------------
describe("getYieldForCrop", () => {
  test("Get yield for corn crop, simple", () => {
    environmentFactors.sun = "medium";
    environmentFactors.locusts = "none";
    expect(getYieldForCrop(input, environmentFactors)).toBe(30);
  });

  test("Get yield for corn crop with high sun", () => {
    environmentFactors.sun = "high";
    environmentFactors.locusts = "none";
    expect(getYieldForCrop(input, environmentFactors)).toBe(45);
  });

  test("Get yield for pumpkin crop, simple", () => {
    const input = {
      crop: pumpkin,
      numCrops: 5,
    };
    environmentFactors.sun = "medium";
    environmentFactors.locusts = "none";
    expect(getYieldForCrop(input, environmentFactors)).toBe(20);
  });

  test("Get yield for pumpkin crop with high sun", () => {
    const input = {
      crop: pumpkin,
      numCrops: 5,
    };
    environmentFactors.sun = "high";
    environmentFactors.locusts = "none";
    expect(getYieldForCrop(input, environmentFactors)).toBe(25);
  });

});

// ----------------------------------------------------------------------------
describe("getTotalYield", () => {
  test("Calculate total yield with multiple crops and medium sun", () => {
    environmentFactors.sun = "medium";
    environmentFactors.locusts = "none";
    expect(getTotalYield(crops, environmentFactors)).toBe(23);
    // expect(getTotalYield({ crops })).toBe(23);
  });

  test("Calculate total yield with 0 amount", () => {
    environmentFactors.sun = "medium";
    environmentFactors.locusts = "none";
    expect(getTotalYield(crops2, environmentFactors)).toBe(0);
    // expect(getTotalYield({ crops2 })).toBe(0);
  });

  test("Calculate total yield with multiple crops and high sun", () => {
    environmentFactors.sun = "high";
    environmentFactors.locusts = "none";
    expect(getTotalYield(crops, environmentFactors)).toBe(32.5);
    // expect(getTotalYield({ crops })).toBe(23);
  });

});

// ----------------------------------------------------------------------------
describe("getCostForPlant", () => {
  test("Get cost for plant with no environment factors", () => {
    expect(getCostForPlant(corn)).toBe(1);
  });
});

// ----------------------------------------------------------------------------
describe("getCostForCrop", () => {
  test("Get cost for crop, simple", () => {
    expect(getCostForCrop(input)).toBe(10);
  });
});

// ----------------------------------------------------------------------------
describe("getRevenueForCrop", () => {
  test("Get revenue for corn, simple", () => {
    environmentFactors.sun = "medium";
    environmentFactors.locusts = "none";
    expect(getRevenueForCrop(input, environmentFactors)).toBe(30);
  })

  test("Get revenue for corn with high sun", () => {
    environmentFactors.sun = "high";
    environmentFactors.locusts = "none";
    expect(getRevenueForCrop(input, environmentFactors)).toBe(45);
  });

});

// ----------------------------------------------------------------------------
describe("getProfitForCrop", () => {
  test("Get profit for crop with medium sun", () => {
    environmentFactors.sun = "medium";
    environmentFactors.locusts = "none";
    expect(getProfitForCrop(input, environmentFactors)).toBe(20);
  });
});

describe("getProfitForCrop", () => {
  test("Get profit for crop with high sun", () => {
    environmentFactors.sun = "high";
    environmentFactors.locusts = "none";
    expect(getProfitForCrop(input, environmentFactors)).toBe(35);
  });
});

// ----------------------------------------------------------------------------
describe("getTotalProfit", () => {
  test("Get total profit with medium sun", () => {
    environmentFactors.sun = "medium";
    environmentFactors.locusts = "none";
    expect(getTotalProfit(crops, environmentFactors)).toBe(22);
  });

  test("Get total profit with low sun", () => {
    environmentFactors.sun = "low";
    environmentFactors.locusts = "none";
    expect(getTotalProfit(crops, environmentFactors)).toBe(10.5);
  });
});
