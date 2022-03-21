import React,{useEffect, useState} from 'react'
import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider';
import {loadContract} from '../../../../utilis/load-contracts';
function ListTransaction() {
    const [transactions, setTransactions] = useState();
    const [web3Api, setWeb3Api] = useState({
        provider: null,
        web3: null,
        contract: null,
    });
    const [account, setAccount] = useState(null);
    useEffect(() => {
        const loadProvider = async () => {
          const provider = await detectEthereumProvider();
          const contract = await loadContract("ManagerOgani", provider)
          if (provider) {
            setAccountLister(provider)
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
    useEffect(() => {
        web3Api.contract && loadpage();
    }, [web3Api.contract]);
    const setAccountLister = (provider) => {
        provider.on("accountChanged", accounts => setAccount(accounts[0]))
    }
    const loadpage = async () =>{
        const {contract} = web3Api;
        await contract.getAllTransaction({from:account})
        .then((data)=>{
            setTransactions(data);
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    const {web3 } = web3Api;
    return (
        <div className="mx-4">
            <div className="card o-hidden border-0 shadow-lg my-5">
                <div className="card-body p-0">
                    {/* Nested Row within Card Body */}
                    <div className="row">
                        <div className="col-lg-12 table-responsive">
                            <div className="p-5">
                            <div className="text-center">
                                <h1 className="h4 text-gray-900 mb-2">Transaction History</h1>
                            </div>
                            <div className="">
                                <button className="btn btn-success mb-4">Load page</button>
                            </div>
                            <table className="table table-hover">
                                <thead>
                                    <tr className='text-center'>
                                        <th scope="col">#</th>
                                        <th scope="col">Id Product</th>
                                        <th scope="col">Total Payment</th>
                                        <th scope="col">Wallet Supplier</th>
                                        <th scope="col">Wallet Admin</th>
                                       
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    
                                    transactions && transactions.map((transaction,index)=>{
                                        
                                        return (<tr key={index} id={transaction._id} className='text-center'>
                                                    <th scope="row">{index+1}</th>
                                                    <td>{transaction.idProduct}</td>
                                                    <td>{ web3.utils.fromWei((transaction.totalPayment).toString(), "ether")} ETH</td>
                                                    <td>
                                                        { transaction.supplier}
                                                    </td>
                                                    <td>{transaction.currentAdmin}</td>
                                                    
                                                </tr>)
                                    })
                                }
                                </tbody>
                            </table>    
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListTransaction