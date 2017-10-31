const Jobs = artifacts.require("./JobsD.sol");

module.exports = function(deployer) {
  deployer.deploy(Jobs, "0x74260eb42ffde3c442682c4fb6ceb3e801bbb79a");
};
