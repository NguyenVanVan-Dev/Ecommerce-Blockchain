import { createContext, useContext, useEffect, useState} from "react";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import { loadContract } from "../../utilis/load-contracts";
const Web3Context = createContext();
const  Web3Provider =  ({children}) => {
    const [web3Api, setWeb3Api] = useState({
        provider: null,
        web3: null,
        contract: null,
    });
    useEffect(() => {
        const loadProvider = async () => {
          const provider = await detectEthereumProvider();
          const contract = await loadContract("ManagerOgani", provider)
          if (provider) {
            setWeb3Api({
              web3: new Web3(provider),
              provider,
              contract
            })
          } else {
            console.error("please, Install Metamask")
          }
        }
        loadProvider()
      }, []);
    return (
        <Web3Context.Provider value={web3Api}>
         {children}
        </Web3Context.Provider>
    )
};

const useWeb3 = () => {
    return  useContext(Web3Context);
};
export default Web3Provider;
export {useWeb3};