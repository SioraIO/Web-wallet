module.exports ={
    abi:  [
        {
            "constant": true,
            "inputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "owners",
            "outputs": [
                {
                    "name": "",
                    "type": "address"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "owner",
                    "type": "address"
                }
            ],
            "name": "removeOwner",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "transactionId",
                    "type": "uint256"
                }
            ],
            "name": "revokeConfirmation",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "isOwner",
            "outputs": [
                {
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "",
                    "type": "uint256"
                },
                {
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "confirmations",
            "outputs": [
                {
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "pending",
                    "type": "bool"
                },
                {
                    "name": "executed",
                    "type": "bool"
                }
            ],
            "name": "getTransactionCount",
            "outputs": [
                {
                    "name": "count",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "owner",
                    "type": "address"
                }
            ],
            "name": "addOwner",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "transactionId",
                    "type": "uint256"
                }
            ],
            "name": "isConfirmed",
            "outputs": [
                {
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "transactionId",
                    "type": "uint256"
                }
            ],
            "name": "getConfirmationCount",
            "outputs": [
                {
                    "name": "count",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "transactions",
            "outputs": [
                {
                    "name": "destination",
                    "type": "address"
                },
                {
                    "name": "value",
                    "type": "uint256"
                },
                {
                    "name": "data",
                    "type": "bytes"
                },
                {
                    "name": "executed",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "getOwners",
            "outputs": [
                {
                    "name": "",
                    "type": "address[]"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "from",
                    "type": "uint256"
                },
                {
                    "name": "to",
                    "type": "uint256"
                },
                {
                    "name": "pending",
                    "type": "bool"
                },
                {
                    "name": "executed",
                    "type": "bool"
                }
            ],
            "name": "getTransactionIds",
            "outputs": [
                {
                    "name": "_transactionIds",
                    "type": "uint256[]"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "transactionId",
                    "type": "uint256"
                }
            ],
            "name": "getConfirmations",
            "outputs": [
                {
                    "name": "_confirmations",
                    "type": "address[]"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "transactionCount",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_required",
                    "type": "uint256"
                }
            ],
            "name": "changeRequirement",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "transactionId",
                    "type": "uint256"
                }
            ],
            "name": "confirmTransaction",
            "outputs": [
                {
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "destination",
                    "type": "address"
                },
                {
                    "name": "value",
                    "type": "uint256"
                },
                {
                    "name": "data",
                    "type": "bytes"
                }
            ],
            "name": "submitTransaction",
            "outputs": [
                {
                    "name": "transactionId",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "MAX_OWNER_COUNT",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "required",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "owner",
                    "type": "address"
                },
                {
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "replaceOwner",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "transactionId",
                    "type": "uint256"
                }
            ],
            "name": "executeTransaction",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "name": "_owners",
                    "type": "address[]"
                },
                {
                    "name": "_required",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "payable": true,
            "stateMutability": "payable",
            "type": "fallback"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "sender",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "name": "transactionId",
                    "type": "uint256"
                }
            ],
            "name": "Confirmation",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "sender",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "name": "transactionId",
                    "type": "uint256"
                }
            ],
            "name": "Revocation",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "transactionId",
                    "type": "uint256"
                }
            ],
            "name": "Submission",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "transactionId",
                    "type": "uint256"
                }
            ],
            "name": "Execution",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "transactionId",
                    "type": "uint256"
                }
            ],
            "name": "ExecutionFailure",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "sender",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "Deposit",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "owner",
                    "type": "address"
                }
            ],
            "name": "OwnerAddition",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "owner",
                    "type": "address"
                }
            ],
            "name": "OwnerRemoval",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "name": "required",
                    "type": "uint256"
                }
            ],
            "name": "RequirementChange",
            "type": "event"
        }
    ],
    byteCode: "60806040523480156200001157600080fd5b50604051620026a8380380620026a8833981810160405260408110156200003757600080fd5b81019080805160405193929190846401000000008211156200005857600080fd5b838201915060208201858111156200006f57600080fd5b82518660208202830111640100000000821117156200008d57600080fd5b8083526020830192505050908051906020019060200280838360005b83811015620000c6578082015181840152602081019050620000a9565b505050509050016040526020018051906020019092919050505081518160328211158015620000f55750818111155b801562000103575060008114155b801562000111575060008214155b6200011b57600080fd5b60008090505b84518110156200025f57600260008683815181106200013c57fe5b602002602001015173ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16158015620001db5750600073ffffffffffffffffffffffffffffffffffffffff16858281518110620001ba57fe5b602002602001015173ffffffffffffffffffffffffffffffffffffffff1614155b620001e557600080fd5b600160026000878481518110620001f857fe5b602002602001015173ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908315150217905550808060010191505062000121565b508360039080519060200190620002789291906200028a565b5082600481905550505050506200035f565b82805482825590600052602060002090810192821562000306579160200282015b82811115620003055782518260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555091602001919060010190620002ab565b5b50905062000315919062000319565b5090565b6200035c91905b808211156200035857600081816101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690555060010162000320565b5090565b90565b612339806200036f6000396000f3fe60806040526004361061012a5760003560e01c8063a0e67e2b116100ab578063c01a8c841161006f578063c01a8c84146107c4578063c6427474146107ff578063d74f8edd14610905578063dc8452cd14610930578063e20056e61461095b578063ee22610b146109cc5761012a565b8063a0e67e2b146105b0578063a8abe69a1461061c578063b5dc40c3146106ce578063b77bf6001461075e578063ba51a6df146107895761012a565b806354741525116100f257806354741525146103675780637065cb48146103c4578063784547a7146104155780638b51d13f146104685780639ace38c2146104b75761012a565b8063025e7c2714610184578063173825d9146101ff57806320ea8d86146102505780632f54bf6e1461028b5780633411c81c146102f4575b6000341115610182573373ffffffffffffffffffffffffffffffffffffffff167fe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c346040518082815260200191505060405180910390a25b005b34801561019057600080fd5b506101bd600480360360208110156101a757600080fd5b8101908080359060200190929190505050610a07565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561020b57600080fd5b5061024e6004803603602081101561022257600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610a43565b005b34801561025c57600080fd5b506102896004803603602081101561027357600080fd5b8101908080359060200190929190505050610cd1565b005b34801561029757600080fd5b506102da600480360360208110156102ae57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610e73565b604051808215151515815260200191505060405180910390f35b34801561030057600080fd5b5061034d6004803603604081101561031757600080fd5b8101908080359060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610e93565b604051808215151515815260200191505060405180910390f35b34801561037357600080fd5b506103ae6004803603604081101561038a57600080fd5b81019080803515159060200190929190803515159060200190929190505050610ec2565b6040518082815260200191505060405180910390f35b3480156103d057600080fd5b50610413600480360360208110156103e757600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610f54565b005b34801561042157600080fd5b5061044e6004803603602081101561043857600080fd5b8101908080359060200190929190505050611167565b604051808215151515815260200191505060405180910390f35b34801561047457600080fd5b506104a16004803603602081101561048b57600080fd5b810190808035906020019092919050505061124c565b6040518082815260200191505060405180910390f35b3480156104c357600080fd5b506104f0600480360360208110156104da57600080fd5b8101908080359060200190929190505050611315565b604051808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018481526020018060200183151515158152602001828103825284818151815260200191508051906020019080838360005b83811015610572578082015181840152602081019050610557565b50505050905090810190601f16801561059f5780820380516001836020036101000a031916815260200191505b509550505050505060405180910390f35b3480156105bc57600080fd5b506105c561140a565b6040518080602001828103825283818151815260200191508051906020019060200280838360005b838110156106085780820151818401526020810190506105ed565b505050509050019250505060405180910390f35b34801561062857600080fd5b506106776004803603608081101561063f57600080fd5b810190808035906020019092919080359060200190929190803515159060200190929190803515159060200190929190505050611498565b6040518080602001828103825283818151815260200191508051906020019060200280838360005b838110156106ba57808201518184015260208101905061069f565b505050509050019250505060405180910390f35b3480156106da57600080fd5b50610707600480360360208110156106f157600080fd5b81019080803590602001909291905050506115fc565b6040518080602001828103825283818151815260200191508051906020019060200280838360005b8381101561074a57808201518184015260208101905061072f565b505050509050019250505060405180910390f35b34801561076a57600080fd5b50610773611828565b6040518082815260200191505060405180910390f35b34801561079557600080fd5b506107c2600480360360208110156107ac57600080fd5b810190808035906020019092919050505061182e565b005b3480156107d057600080fd5b506107fd600480360360208110156107e757600080fd5b81019080803590602001909291905050506118e4565b005b34801561080b57600080fd5b506108ef6004803603606081101561082257600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291908035906020019064010000000081111561086957600080fd5b82018360208201111561087b57600080fd5b8035906020019184600183028401116401000000008311171561089d57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f820116905080830192505050505050509192919290505050611ad1565b6040518082815260200191505060405180910390f35b34801561091157600080fd5b5061091a611af0565b6040518082815260200191505060405180910390f35b34801561093c57600080fd5b50610945611af5565b6040518082815260200191505060405180910390f35b34801561096757600080fd5b506109ca6004803603604081101561097e57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050611afb565b005b3480156109d857600080fd5b50610a05600480360360208110156109ef57600080fd5b8101908080359060200190929190505050611e05565b005b60038181548110610a1457fe5b906000526020600020016000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b3073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610a7b57600080fd5b80600260008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16610ad257600080fd5b6000600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff02191690831515021790555060008090505b600160038054905003811015610c52578273ffffffffffffffffffffffffffffffffffffffff1660038281548110610b6457fe5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415610c4557600360016003805490500381548110610bc057fe5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1660038281548110610bf857fe5b9060005260206000200160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550610c52565b8080600101915050610b30565b506001600381818054905003915081610c6b9190612233565b506003805490506004541115610c8a57610c8960038054905061182e565b5b8173ffffffffffffffffffffffffffffffffffffffff167f8001553a916ef2f495d26a907cc54d96ed840d7bda71e73194bf5a9df7a76b9060405160405180910390a25050565b33600260008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16610d2857600080fd5b81336001600083815260200190815260200160002060008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16610d9157600080fd5b8360008082815260200190815260200160002060030160009054906101000a900460ff1615610dbf57600080fd5b60006001600087815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908315150217905550843373ffffffffffffffffffffffffffffffffffffffff167ff6a317157440607f36269043eb55f1287a5a19ba2216afeab88cd46cbcfb88e960405160405180910390a35050505050565b60026020528060005260406000206000915054906101000a900460ff1681565b60016020528160005260406000206020528060005260406000206000915091509054906101000a900460ff1681565b600080600090505b600554811015610f4d57838015610f01575060008082815260200190815260200160002060030160009054906101000a900460ff16155b80610f345750828015610f33575060008082815260200190815260200160002060030160009054906101000a900460ff165b5b15610f40576001820191505b8080600101915050610eca565b5092915050565b3073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610f8c57600080fd5b80600260008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff1615610fe457600080fd5b81600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16141561101f57600080fd5b6001600380549050016004546032821115801561103c5750818111155b8015611049575060008114155b8015611056575060008214155b61105f57600080fd5b6001600260008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff02191690831515021790555060038590806001815401808255809150509060018203906000526020600020016000909192909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550508473ffffffffffffffffffffffffffffffffffffffff167ff39e6e1eb0edcf53c221607b54b00cd28f3196fed0a24994dc308b8f611b682d60405160405180910390a25050505050565b6000806000905060008090505b60038054905081101561124457600160008581526020019081526020016000206000600383815481106111a357fe5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff1615611222576001820191505b60045482141561123757600192505050611247565b8080600101915050611174565b50505b919050565b600080600090505b60038054905081101561130f576001600084815260200190815260200160002060006003838154811061128357fe5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff1615611302576001820191505b8080600101915050611254565b50919050565b60006020528060005260406000206000915090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690806001015490806002018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156113ed5780601f106113c2576101008083540402835291602001916113ed565b820191906000526020600020905b8154815290600101906020018083116113d057829003601f168201915b5050505050908060030160009054906101000a900460ff16905084565b6060600380548060200260200160405190810160405280929190818152602001828054801561148e57602002820191906000526020600020905b8160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019060010190808311611444575b5050505050905090565b6060806005546040519080825280602002602001820160405280156114cc5781602001602082028038833980820191505090505b509050600080905060008090505b60055481101561157657858015611511575060008082815260200190815260200160002060030160009054906101000a900460ff16155b806115445750848015611543575060008082815260200190815260200160002060030160009054906101000a900460ff165b5b15611569578083838151811061155657fe5b6020026020010181815250506001820191505b80806001019150506114da565b8787036040519080825280602002602001820160405280156115a75781602001602082028038833980820191505090505b5093508790505b868110156115f1578281815181106115c257fe5b602002602001015184898303815181106115d857fe5b60200260200101818152505080806001019150506115ae565b505050949350505050565b6060806003805490506040519080825280602002602001820160405280156116335781602001602082028038833980820191505090505b509050600080905060008090505b60038054905081101561177a576001600086815260200190815260200160002060006003838154811061167057fe5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff161561176d57600381815481106116f557fe5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1683838151811061172c57fe5b602002602001019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff16815250506001820191505b8080600101915050611641565b816040519080825280602002602001820160405280156117a95781602001602082028038833980820191505090505b509350600090505b81811015611820578281815181106117c557fe5b60200260200101518482815181106117d957fe5b602002602001019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff168152505080806001019150506117b1565b505050919050565b60055481565b3073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461186657600080fd5b600380549050816032821115801561187e5750818111155b801561188b575060008114155b8015611898575060008214155b6118a157600080fd5b826004819055507fa3f1ee9126a074d9326c682f561767f710e927faa811f7a99829d49dc421797a836040518082815260200191505060405180910390a1505050565b33600260008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff1661193b57600080fd5b81600073ffffffffffffffffffffffffffffffffffffffff1660008083815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614156119ab57600080fd5b82336001600083815260200190815260200160002060008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff1615611a1557600080fd5b600180600087815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908315150217905550843373ffffffffffffffffffffffffffffffffffffffff167f4a504a94899432a9846e1aa406dceb1bcfd538bb839071d49d1e5e23f5be30ef60405160405180910390a3611aca85611e05565b5050505050565b6000611ade8484846120a7565b9050611ae9816118e4565b9392505050565b603281565b60045481565b3073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614611b3357600080fd5b81600260008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16611b8a57600080fd5b81600260008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff1615611be257600080fd5b60008090505b600380549050811015611cc8578473ffffffffffffffffffffffffffffffffffffffff1660038281548110611c1957fe5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415611cbb578360038281548110611c6e57fe5b9060005260206000200160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550611cc8565b8080600101915050611be8565b506000600260008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055506001600260008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508373ffffffffffffffffffffffffffffffffffffffff167f8001553a916ef2f495d26a907cc54d96ed840d7bda71e73194bf5a9df7a76b9060405160405180910390a28273ffffffffffffffffffffffffffffffffffffffff167ff39e6e1eb0edcf53c221607b54b00cd28f3196fed0a24994dc308b8f611b682d60405160405180910390a250505050565b33600260008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16611e5c57600080fd5b81336001600083815260200190815260200160002060008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16611ec557600080fd5b8360008082815260200190815260200160002060030160009054906101000a900460ff1615611ef357600080fd5b611efc85611167565b156120a0576000806000878152602001908152602001600020905060018160030160006101000a81548160ff02191690831515021790555061201c8160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16826001015483600201805460018160011615610100020316600290049050846002018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156120125780601f10611fe757610100808354040283529160200191612012565b820191906000526020600020905b815481529060010190602001808311611ff557829003601f168201915b505050505061220c565b1561205357857f33e13ecb54c3076d8e8bb8c2881800a4d972b792045ffae98fdf46df365fed7560405160405180910390a261209e565b857f526441bb6c1aba3c9a4a6ca1d6545da9c2333c8c48343ef398eb858d72b7923660405160405180910390a260008160030160006101000a81548160ff0219169083151502179055505b505b5050505050565b600083600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614156120e457600080fd5b600554915060405180608001604052808673ffffffffffffffffffffffffffffffffffffffff1681526020018581526020018481526020016000151581525060008084815260200190815260200160002060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506020820151816001015560408201518160020190805190602001906121a292919061225f565b5060608201518160030160006101000a81548160ff0219169083151502179055509050506001600560008282540192505081905550817fc0ba8fe4b176c1714197d43b9cc6bcf797a4a7461c5fe8d0ef6e184ae7601e5160405160405180910390a2509392505050565b6000806040516020840160008287838a8c6187965a03f19250505080915050949350505050565b81548183558181111561225a5781836000526020600020918201910161225991906122df565b5b505050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106122a057805160ff19168380011785556122ce565b828001600101855582156122ce579182015b828111156122cd5782518255916020019190600101906122b2565b5b5090506122db91906122df565b5090565b61230191905b808211156122fd5760008160009055506001016122e5565b5090565b9056fea265627a7a723158203c5348600fe8024c92f4f125b57ed9eeb804a903a4e5082b78968d9be301b97764736f6c634300050b0032"
};
