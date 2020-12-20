#!/usr/bin/env bash
if [ ! -f truffle-config.js ]; then
  ln -s networks.js truffle-config.js;
fi

network=$1;
project_id=$(jq '.projectId' secrets.json | sed 's/"//g');
mnemonic=$(jq '.mnemonic' secrets.json | sed 's/"//g');

function cleanup {
  kill -9 "$ganache_pid"
}

if [ "$network" = "development" ]; then

  ./node_modules/.bin/ganache-cli -f "https://mainnet.infura.io/v3/$project_id" -m "$mnemonic"  --port 8545 --gasLimit 0xffffffffff --allowUnlimitedContractSize - > /dev/null & ganache_pid=$!;

fi
echo "$network"
./node_modules/.bin/truffle migrate --network "$network" --reset;
