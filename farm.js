const getYieldForPlant = (plant, factors) => {

  let result;

  if (factors.sun === "low") {
    result = plant.yield * (1 + (parseInt(plant.factors.sun.low)/100))
  } else if (factors.sun === "high") {
    result = plant.yield * (1 + parseInt(plant.factors.sun.high)/100);
  } else {
    result = plant.yield;
  }

  if (factors.locusts === "some") {
    result = result * (1 + (parseInt(plant.factors.locusts.some)/100));
  } else if (factors.locusts === "many") {
    result = result * (1 + parseInt(plant.factors.locusts.many)/100);
  }

  return result;

};

const getYieldForCrop = (input, factors) => input.numCrops * getYieldForPlant(input.crop, factors);

const getTotalYield = (crops, factors) => {

  const arrayFromCrops = Array.from(crops);
  let totalYield = 0;

  for ( i = 0; i < arrayFromCrops.length; i++) {
    totalYield += getYieldForCrop(arrayFromCrops[i], factors);
  };
  return totalYield;

}

const getCostForPlant = plant => plant.cost;

const getCostForCrop = input => input.numCrops * getCostForPlant(input.crop);

const getRevenueForCrop = (input, factors) => getYieldForPlant( input.crop ,factors) * input.numCrops  * input.crop.salePrice;

const getProfitForCrop = (input, factors) => getRevenueForCrop(input, factors) - getCostForCrop(input);

const getTotalProfit = (crops, factors) => {
  const arrayFromCrops = Array.from(crops);
  let totalProfit = 0;

  for (i = 0; i < arrayFromCrops.length; i++) {
    totalProfit += getProfitForCrop(arrayFromCrops[i], factors);
  }
  return totalProfit;
}

module.exports = { 
  getYieldForPlant,
  getYieldForCrop, 
  getTotalYield,
  getCostForPlant,
  getCostForCrop,
  getRevenueForCrop,
  getProfitForCrop,
  getTotalProfit
};

