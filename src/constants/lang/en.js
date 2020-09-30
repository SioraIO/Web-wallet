const en = {
    el: {
        pagination: {
            goto: "Go to page",
            pageClassifier: "",
            pagesize: " items",
            total: "Total: {total} items"
        }
    },
    global: {
        app: 'KATANA WALLET',
        next: 'Next',
        back: 'Back',
        search: 'Search',
        confirm: 'Confirm',
        password: 'Password',
        finish: 'Finish',
        ok: 'Ok',
        cancel: 'Cancel',
        error: 'Error',
        required: '{name} is required',
        success: '{name} Success!',
        noData: 'No data available for the time being',
        no: 'No',
        nothing: '-',
        yes: 'Yes'
    },
    home: {
        account: 'Wallet Account',
        logout: 'Logout'
    },
    passport: {
        title: 'Create a new key pair or import an existing wallet to get started',
        create: 'Create New Wallet',
        createBreif: "Create a new wallet in this browser if you don't have one.",
        loginBreif: 'Use wallet with your password if you already have one in this browser.',
        logout: 'Log Out',
        backupCopy: 'Copy KeyStore to clipboard',
        recover: 'Import Wallet',
        recoverBreif: 'Recover your wallet in this browser if you already have one from other place.',
    },
    create: {
        warn1: 'Your password allows you to access and transfer your funds. Keep it safe!!!',
        warn2: 'KATANA WALLET does not store your password and cannot retrieve it for you!',
        name: 'Wallet Name',
        pass: 'Password',
        passCheck: 'Confirm Password',
        passWarn: 'Password must contain numbers and letters and at least 8 characters!',
        passCheckWarn: 'Inconsistent password!',
        exist: 'Account Name Exist!',
        mnemonic: 'Your Mnemonic',
        mnemonicWarn: 'Wrong Mnemonic!',
        safety: 'Backup Your Mnemonic',
        mnemonicBreif: 'This is your secret recovery text. It is the only way to restore access to your funds. Keep it safe and never share it with anyone you don’t trust!',
        reset: 'Reset',
        confirm: 'Confirm your Mnemonic',
        backup: 'Create wallet successfully! you can backup your keyStore anytime in the settings menu.',
        success: 'Wallet Created Successfully!',
        titleDialogPrivateKey: "Private Key",
        labelPrivateKey: "This is your Secret Key (click to copy)"
    },
    recover: {
        phrase: 'Mnemonic',
        keyError: 'Wrong KeyStore!'
    },
    main: {
        receive: 'Receive',
        qrcode: 'QRCode',
        send: 'Transfer',
        next: 'Next',
        manage: 'Manage',
        copy: 'Copied to ClipBoard',
        assets: 'My Assets',
        txs: 'Transactions',
        txInfo: 'Transaction Detail',
        allTxs: 'Expolor All Txs',
        empty: 'No Data',
        keyWarn: 'KeyStore is an encrypted JSON file with your privateKey and password, you can get your privateKey with your password from it.',
        AdequateBalance: 'Adequate Balance',
        permission: "Permission",
        txtInternal: "Internal Transaction"
    },
    send: {
        form: 'Transfer',
        confirm: 'Confirm Transaction',
        confirmPassword: 'Confirm Password',
        password: 'Enter password',
        passError: 'Wrong Password!',
        reject: 'Signature Rejected',
        netError: 'Network Error',
        finish: 'Transaction Result',
        success: 'Transaction Success',
        successNotification: 'Transaction has been successful, check information of it from history data.',
        failed: 'Transaction Failed',
        failedNotification: 'Transaction has been declined, please validate and send it again.',
        denom: 'Currency',
        amount: 'Amount',
        fee: "Fee",
        amountWarn: 'Insufficient Quantity',
        amountWarnPositive: 'A Positive Number is required',
        amountWarnInvalid: 'Invalid Amount',
        amountWarnOverLength: "Maximum of 7 decimal places!",
        address: 'Address',
        addressWarn: 'Invalid Address!',
        sender: 'Sender',
        txHash: 'TxHash',
        all: 'Send All',
        balance: 'Balance',
        error: 'Transaction Error!',
        again: 'Continue Transfer',
        back: 'Back to Wallet',
        block: 'Block',
        time: 'Time',
        remain: "Remaining Balance"
    },
    owner: {
        brif: 'Transfer ownership to other address is DANGEROUS！You will see no more this Token in your Token Issuance List once transfered!',
    },
    footer: {
        copyright: '© 2019 KATANA Blockchain. All Rights Reserved.'
    },
    contract: {
        title: "You don't have any contract. Please deploy new one!",
        create: "Deploy New Contract",
        createDescription: "Deploy a new contract in this browser if you dont' have one.",
        restore: "Restored Deployed Contract",
        restoreDescription: "",
        titleDialog: "Deploy New Contract",
        name: "Contract Name",
        require_confirmations: "Required confirmations",
        buttonDeploy: "Deploy",
        ownerName: "Name",
        ownerAddress: "Address",
        newOwnerAddress: "New Address",
        balance: "Balance",
        action: "Action",
        remove: "Remove",
        add: "Add",
        edit: "Edit",
        replace: "Replace",
        titleOwner: "Owners",
        titleAddOwner: "Add Owner",
        titleEditOwner: "Edit Owner",
        titleReplaceOwner: "Replace Owner",
        errorRequire: "Require confirmations must be greater than 2",
        errorRequireChange: "Require confirmations must be less than list owner length!",
        errorRequireChange2: "Error: Require confirmations must be different!",
        errorRequireOwner: "Owners must be greater than 2",
        errorRequireOwner2: "Owners must be greater than require confirmation",
        errorDeployContract: "ERROR DEPLOY CONTRACT !",
        errorAddOwner: "Cannot Add Owner: Owner address is exists in contract!",
        errorFormatAddOwner: "Error: Owner address is wrong format!",
        errorRestoreContract: "Cannot Restore Contract: Contract address is exists!",
        errorRestoreContractName: "Cannot Restore Contract: Contract name is exists!",
        sendTransaction: "Submit Transaction",
        titleMultiSign: "Transactions",
        createTransactionContract: "Create a new transaction",
        id: "ID",
        destination: "Destination",
        value: "Value",
        data: "Data/Subject",
        confirmations: "Confirmations",
        confirms: "Confirms",
        executed: "Execute",
        status: "Status",
        finish: "Finished",
        process: "Processing",
        amount: "Amount",
        method: "Method",
        abi: "ABI String",
        parameter: "Parameter",
        titleDialogSendTransaction: "Send multi sign transaction",
        titleContract: "Contracts",
        restoreContract: "Restore",
        editContract: "Edit Contract",
        deposit: "Deposit",
        password: "Password",
        titleDialogConfirmation: "Change required confirmations",
        executeTransaction: "Execute Transaction",
        removeOwner: "Remove Owner",
        removeContract: "Are you sure to remove a contract ?",
        removeContractError: "Error: Contract Address is not exists!",
        confirm: "Confirm",
        revoke: "Revoke",
        titleDialogButtonConfirmation: "Confirm transaction",
        titleDialogButtonRevoke: "Revoke transaction",
        ownerNameWarn: 'Error: Owner Name is Exists',
        ownerAddressWarn: 'Error: Owner Address is Exists',
        balanceRemain: 'Remaining Balance',
        balanceCurrent: 'Current Balance'
    }
};
export default en;