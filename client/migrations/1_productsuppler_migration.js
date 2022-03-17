const ProductSupplier = artifacts.require("ProductSupplier");

module.exports = function (deployer) {
  deployer.deploy(ProductSupplier);
};
