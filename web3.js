window.onload = function () {
  console.log("DApp is loadet");
};

let provider, signer, accounts;
const myToken = "0xD443433914479AC68dbcda07C934d7957576235B"; //ERC20 Contract Adress
const transferAdress = "0x15433DA387451F9dE4565280C85506CB71aF9376"; 

const handleAccountsChanged = (accounts) =>{
}

if (window.ethereum) {
  this.ethereum.on("accountsChanged", handleAccountsChanged);
  window.ethereum
    .request({ method: "eth_accounts" })
    .then(handleAccountsChanged)
    .catch((err) => {
      console.log(err);
    });
    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner(0);
} else {
  console.log("Install digital Wallet!");
  window.alert("Install digital Wallet!")
}

const enableEth = async () => {
  accounts = await window.ethereum.request({ method: "eth_requestAccounts" }).catch((err) => {
    console.log(err);
  });
  console.log(accounts);
};

//to check current goerli on wallet - not required
const checkEthBalance = async () => {
  let balance = await window.ethereum
    .request({ method: "eth_getBalance", params: [accounts[0]] })
    .catch((err) => {
      console.log(err);
    });

  //get balance in hex and convert it to int
  // Math.pow(base, exponent)
  balance = parseInt(balance);
  balance = balance / Math.pow(10, 18);
  console.log(balance);
  document.getElementById("goerliBalance").innerHTML = "Current GoerliETH: " + balance;
}

// 1. display current block height of goerli
const getBlockHeight = async () => {
  let blockHeight = await provider.getBlockNumber();
  console.log(blockHeight);
  document.getElementById("blockHeight").innerHTML = "Block height: " + blockHeight;
};

// 2. 
//create contract instances
//new ethers.Contract( address , abi , signerOrProvider )
const checkTokenBalance = async () => {
  let myTokenContract = new ethers.Contract(myToken, myTokenABI, provider);
  let balance = await myTokenContract.balanceOf(accounts[0]);
  console.log(balance.toString().substring(0,5));
  document.getElementById("tokenBalance").innerHTML = "Token Balance: " + balance.toString().substring(0,5) + " MTK";
};

// 3.
const transfer = async () => {
  let myTokenContract = new ethers.Contract(myToken, myTokenABI, signer);
  await myTokenContract.transfer(transferAdress, 10);
}
