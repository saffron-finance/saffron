#!/usr/bin/env bash
if [ ! -f truffle-config.js ]; then
  ln -s networks.js truffle-config.js;
fi

project_id=$(jq '.projectId' secrets.json | sed 's/"//g');
mnemonic=$(jq '.mnemonic' secrets.json | sed 's/"//g');

function cleanup {
  kill -9 "$ganache_pid"
}

trap cleanup EXIT

./node_modules/.bin/ganache-cli -f "https://mainnet.infura.io/v3/$project_id" -m "$mnemonic"  --port 8545 --gasLimit 0xffffffffff --allowUnlimitedContractSize -u "0x09E9FF67d9D5A25Fa465Db6f0bEdE5560581f8Cb" - > /tmp/ganache & ganache_pid=$!

echo "ganache pid ${ganache_pid}"

./node_modules/.bin/truffle test --network development
