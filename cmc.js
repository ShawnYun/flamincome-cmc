const fs = require('fs');
const Web3 = require("web3");
const BigNumber = require('bignumber.js');
const request = require('request');
const Ether = new BigNumber(10e+17);

let url_apy = 'https://flamincome-tlv-pubsub.herokuapp.com/apy'
let url_cmc = 'https://api.coinmarketcap.com/data-api/v3/farming/yield/latest'
let web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/95acc2cd87d84c22927b2993be047f98'));
let abi_erc20 = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"available","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"balance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"controller","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"depositAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"earn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"governance","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"reserve","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"harvest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"max","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"min","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"priceE18","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_controller","type":"address"}],"name":"setController","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_governance","type":"address"}],"name":"setGovernance","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_min","type":"uint256"}],"name":"setMin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_shares","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawAll","outputs":[],"stateMutability":"nonpayable","type":"function"}]
let addr_USDT = '0xdAC17F958D2ee523a2206206994597C13D831ec7'
let addr_fUSDT = '0x54bE9254ADf8D5c8867a91E44f44c27f0c88e88A';
let addr_WBTC = '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599'
let addr_fWBTC = '0x1a389c381a8242B7acFf0eB989173Cd5d0EFc3e3';
let addr_WETH = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2';
let addr_fWETH = '0x1E9DC5d843731D333544e63B2B2082D21EF78ed3';
let addr_LP = '0xBb2b8038a1640196FbE3e38816F3e67Cba72D940';
let addr_fLP = '0x743BC5cc8F52a84fF6e06E47Bc2af5324f5463D6';

let fUSDT = new web3.eth.Contract(abi_erc20, addr_fUSDT);
let fWBTC = new web3.eth.Contract(abi_erc20, addr_fWBTC);
let fWETH = new web3.eth.Contract(abi_erc20, addr_fWETH);
let fLP = new web3.eth.Contract(abi_erc20, addr_fLP);
let LP = new web3.eth.Contract(abi_erc20, addr_LP);

async function getTokenPrice(tokenAddress) {
    return new Promise((resolve, reject)=>{
        let url = 'https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=' + tokenAddress + '&vs_currencies=usd'
        request(url, function(error, response, body) {
            if (!error && response.statusCode === 200) {
                let result = JSON.parse(body)
                let addr = tokenAddress.toLowerCase()
                resolve(result[addr].usd)
            }
            else {
                console.log("getTokenPrice error")
            }
        });
    });
}

async function getUniswapWBTCTVL() {
    return new Promise((resolve, reject)=>{
        request(url_cmc, function(error, response, body) {
            if (!error && response.statusCode === 200) {
                let result = JSON.parse(body)
                let projects = result.data.farmingProjects
                for (let i = 0; i < projects.length; i++) {
                    if (projects[i].name === 'Uniswap') {
                        let poolList = projects[i].poolList
                        for (let j = 0; j < poolList.length; j++) {
                            if (poolList[j].pair === 'ETH-WBTC') {
                                resolve(poolList[j].totalStake)
                                break
                            }
                        }
                        break
                    }
                }
            }
            else {
                console.log("getUniswapWBTCTVL error")
            }
        });
    });
}

async function getApys() {
    return new Promise((resolve, reject)=> {
        request(url_apy, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                let result = JSON.parse(body);
                resolve(result)
            }
            else {
                console.log("getApys error")
            }
        })
    })
}

async function getValue(){
    let apys = null
    await getApys().then(v => {
        console.log(v)
        apys = v
    })
    let tvl_USDT = 0
    let tvl_WBTC = 0
    let tvl_WETH = 0
    let tvl_LP = 0
    await fUSDT.methods.totalSupply().call().then(async v => {
        let ret = new BigNumber(v);
        console.log("fUSDT totalSupply : " + ret.div(1000000));
        let totalSupply_fUSDT =  ret.div(1000000);
        await getTokenPrice(addr_USDT).then(p => {
            tvl_USDT = totalSupply_fUSDT * p
        })
    });
    await fWBTC.methods.totalSupply().call().then(async v => {
        let ret = new BigNumber(v);
        console.log("fWBTC totalSupply : " + ret.div(100000000));
        let totalSupply_fWBTC =  ret.div(100000000);
        await getTokenPrice(addr_WBTC).then(p => {
            tvl_WBTC = totalSupply_fWBTC * p
        })
    });
    await fWETH.methods.totalSupply().call().then(async v => {
        let ret = new BigNumber(v);
        console.log("fWETH totalSupply : " + ret.div(1000000000000000000));
        let totalSupply_fWETH =  ret.div(1000000000000000000);
        await getTokenPrice(addr_WETH).then(p => {
            tvl_WETH = totalSupply_fWETH * p
        })
    });
    await fLP.methods.totalSupply().call().then(async v => {
        let ret = new BigNumber(v);
        console.log("fLP totalSupply : " + ret.div(1000000000000000000));
        await LP.methods.totalSupply().call().then(async p => {
            let LP_totalSupply = new BigNumber(p);
            await getUniswapWBTCTVL().then(t => {
                tvl_LP = t / (LP_totalSupply.div(ret))
            })
        })
    });
    console.log("USDT tvl : " + tvl_USDT)
    console.log("USDT apy : " + apys[0].percentageAPY)
    console.log("WBTC tvl : " + tvl_WBTC)
    console.log("WBTC apy : " + apys[1].percentageAPY)
    console.log("WETH tvl : " + tvl_WETH)
    console.log("WETH apy : " + apys[2].percentageAPY)
    console.log("LP tvl : " + tvl_LP)
    console.log("LP apy : " + apys[3].percentageAPY)
    let TVL = tvl_USDT + tvl_WBTC + tvl_WETH + tvl_LP
    console.log("TVL : " + TVL)

    let json = {
        provider: 'flamincome',  // Project name
        provider_logo: 'https://avatars0.githubusercontent.com/u/70206242?s=100&v=4', // Project logo, square, less than 100*100 px
        provider_URL: 'https://flamincome.finance/', // Project URL
        links: [    // social media info
            {
                title: 'Twitter',
                link: 'https://twitter.com/flamincome',
            }
        ],
        pools: [
            {
                name: 'USDT VAULT', // Pool name if any, eg. Sushi Party, Uniswap Sushi-ETH LP
                pair: 'USDT', // Pool pairs, e.g SUSHI-ETH
                pairLink: 'https://app.flamincome.finance/', // The URL to this pool
                logo: 'https://avatars0.githubusercontent.com/u/70206242?s=100&v=4', //  Pool logo if any, otherwise just use Project logo
                poolRewards: ['USDT'], // The reward token ticker
                apr: apys[0].percentageAPY,  // APY, 1.1 means 110%
                totalStaked: tvl_USDT,  // Total valued lock in USD
            },
            {
                name: 'wBTC VAULT', // Pool name if any, eg. Sushi Party, Uniswap Sushi-ETH LP
                pair: 'wBTC',  // Pool pairs, e.g SUSHI-ETH
                pairLink: 'https://app.flamincome.finance/', // The URL to this pool
                logo: 'https://avatars0.githubusercontent.com/u/70206242?s=100&v=4', //  Pool logo if any, otherwise just use Project logo
                poolRewards: ['wBTC'], // The reward token ticker
                apr: apys[1].percentageAPY,  // APY, 1.1 means 110%
                totalStaked: tvl_WBTC,  // Total valued lock in USD
            },
            {
                name: 'wETH VAULT', // Pool name if any, eg. Sushi Party, Uniswap Sushi-ETH LP
                pair: 'wETH',  // Pool pairs, e.g SUSHI-ETH
                pairLink: 'https://app.flamincome.finance/', // The URL to this pool
                logo: 'https://avatars0.githubusercontent.com/u/70206242?s=100&v=4', //  Pool logo if any, otherwise just use Project logo
                poolRewards: ['wETH'], // The reward token ticker
                apr: apys[2].percentageAPY,  // APY, 1.1 means 110%
                totalStaked: tvl_WETH,  // Total valued lock in USD
            },
            {
                name: 'UNI-V2[WBTC] VAULT', // Pool name if any, eg. Sushi Party, Uniswap Sushi-ETH LP
                pair: 'UNI-V2[WBTC]', // Pool pairs, e.g SUSHI-ETH
                pairLink: 'https://app.flamincome.finance/', // The URL to this pool
                logo: 'https://avatars0.githubusercontent.com/u/70206242?s=100&v=4', //  Pool logo if any, otherwise just use Project logo
                poolRewards: ['UNI-V2[WBTC]'], // The reward token ticker
                apr: apys[3].percentageAPY,  // APY, 1.1 means 110%
                totalStaked: tvl_LP,  // Total valued lock in USD
            }
        ]
    }
    console.log(json)

    let str = JSON.stringify(json,"","\t")
    fs.writeFile('cmc.json',str,function(err){
        if (err) {console.log('error')}
    })
}

getValue()
// (function schedule() {
//     setTimeout(do_it, 5000, schedule);
// }());
// async function do_it(callback) {
//     await getValue();
//     console.log("-------------------------------------------------")
//     callback();
// }