
import contract from "@truffle/contract";

export const loadContract = async (name, provider) => {
  const res = await fetch(`/contracts/${name}.json`)
  const Artifact = await res.json()

  const _contract = contract(Artifact)
  _contract.setProvider(provider)
  _contract.setNetwork("5777"); // "fix Error: ManagerOgani has not been deployed to detected network (network/artifact mismatch)";
  const deployedContract = await _contract.deployed();

  return deployedContract

}
