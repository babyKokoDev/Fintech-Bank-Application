
let allBankers = JSON.parse(localStorage.getItem('bankers'))
let userIndex = JSON.parse(localStorage.getItem('userIndex'))

let myBank = allBankers[userIndex]
let myTransaction = allBankers[userIndex].transactionHistory
let myDebit = allBankers[userIndex].debitTrans
let myNotification = allBankers[userIndex].news
firstName.innerHTML = `${myBank.firstname} ${myBank.lastname}`
accNumber.innerHTML = `${myBank.accNumber}`
// myBank.Balance = parseFloat(12000)
// localStorage.setItem('bankers', JSON.stringify(allBankers))
// let bal = myBank.Balance


// Reference Receipt
function genHexString(len) {
    const hex = "ABC345627892763787DEF637383"
    let output = "";
    for (let i = 0; i < len; i++) {
        output += hex.charAt(Math.floor(Math.random() * hex.length));
    }
    return output
}
;

let receiptReference = genHexString(20)

// Notification Bar
let notiBar = JSON.parse(localStorage.getItem('noti'))
notibar.innerHTML = notiBar

let addAmount = allBankers[userIndex].transfer
let transferAmount = Number(0)
for (let i = 0; i < addAmount.length; i++) {
    transferAmount += parseFloat(addAmount[i].amount)
}
console.log(transferAmount)


balance1.innerHTML = `$ ${myBank.Balance + transferAmount}`
balance2.innerHTML = `$ ${myBank.Balance + transferAmount}`
naira.innerHTML = `₦ ${myBank.naira}`
euro.innerHTML = `₤ ${myBank.euro}`
pound.innerHTML = `£ ${myBank.pounds}`
jpyen.innerHTML = `$ ${myBank.Yen}`

// Fund Account Session
modalBody.innerHTML = `<div id="myModal" class="modal fade" role="dialog" tabindex="-1" aria-labelledby = "myModalLabel" aria-hidden = "true">
<div class="modal-dialog">
<!-- Modal content-->
<div class="modal-content">
    <div class="modal-header">
    <h4 class="modal-title fs-5" id = "myModalLabel">Deposit Money</h4>
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label = "Close"></button>
    </div>
    <div class="modal-body">
      <div class="input-group mb-3">
    <span class="input-group-text">$</span>
    <input type="number" class="form-control" placeholder="Enter the Amount you want to deposit"  
    id = "dePosit">
      </div>
      <input type="text" class="form-control" placeholder="Enter your transaction pin"  
      id = "transPin">
    </div>
    <div class="modal-footer">
    <button onclick = "depositMoney()" type="button" class="btn btn-primary" data-bs-dismiss="modal">Deposit</button>
    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
    </div>
</div>
</div>
</div>`

let depositMoney = () => {
    if (transPin.value == myBank.pIN){

    let depositPrice = parseFloat(dePosit.value)
    myBank.Balance = parseFloat(myBank.Balance) + parseFloat(depositPrice)
    let transacObject = {
        amount: depositPrice,
        sender: "World Bank",
        purpose: "Deposit",
        beneficiaryName: `${myBank.firstname} ${myBank.lastname}`,
        date: `${new Date().toLocaleDateString()}, ${new Date().toLocaleTimeString()}`,
        beneficiaryBank: "Fintech Bank",
        beneficiaryAccount: myBank.accNumber,
        transactionCategory: "Credit Transaction",
        reference: receiptReference
    }
    myTransaction.push(transacObject)

    let notiObject = {
        title: "Credit Transaction",
        message: "World Bank just credited you with an amount",
        date: `${new Date().toLocaleDateString()}, ${new Date().toLocaleTimeString()}`
    }

    myNotification.push(notiObject)

    localStorage.setItem('bankers', JSON.stringify(allBankers))
    balance1.innerHTML = `$ ${myBank.Balance + transferAmount}`
    balance2.innerHTML = `$ ${myBank.Balance + transferAmount}`
    dePosit.value = ""
    transPin.value = ""
    setTimeout(() => {
        Swal.fire(
            'Transaction Successful',
            'Click the button below to exit',
            'success',
          )
    }, 300);

}else {
    setTimeout(() => {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Incorrect Transaction Pin',
          })
    }, 150);
}
}
modalBody2.innerHTML = `<div id="myModal2" class="modal fade" role="dialog" tabindex="-1" aria-labelledby = "myModalLabel" aria-hidden = "true">
    <div class="modal-dialog">
    <!-- Modal content-->
    <div class="modal-content">
        <div class="modal-header">
        <h4 class="modal-title fs-5" id = "myModalLabel">Transfer Money</h4>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label = "Close"></button>
        </div>
        <div class="modal-body">
        <input type="text" class="form-control" placeholder="Enter the Receipent account number"  
        id = "accNumBer">
        <p id = "accountName" class = "text-danger"></p>
        <input type="number" class="form-control mt-4" placeholder="Enter the amount you want to transfer"  
        id = "amount"> 
        <input type="text" class="form-control mt-4" placeholder="Enter your transaction pin"  
        id = "transsPin"> 
        </div>
        <div class="modal-footer">
        <button onclick = "transferMoney()" type="button" class="btn btn-primary" data-bs-dismiss="modal">Transfer</button>
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
    </div>
    </div>
    </div>`

document.getElementById('accNumBer').addEventListener('keyup', () => {
    let userFound = false
    let transferIndex = 0
    for (let i = 0; i < allBankers.length; i++) {
        if (allBankers[i].accNumber == accNumBer.value) {
            userFound = true
            transferIndex = i
            break;
        }
    }
    if (userFound == true) {
        accountName.innerHTML = `<p class = "text-success mt-1">${allBankers[transferIndex].firstname} ${allBankers[transferIndex].lastname}</p>`
    } else if (userFound == false) {
        accountName.innerHTML = "acccount not found"
    }
})

let transferMoney = () => {
    if(accNumBer.value == myBank.accNumber){
        setTimeout(() => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Inconsistencies in value',
              })
        }, 150);
    }
    else if (transsPin.value == myBank.pIN){
    let depositPrice = parseFloat(amount.value)
    myBank.Balance = parseFloat(myBank.Balance) - parseFloat(depositPrice)
    balance1.innerHTML = `$ ${myBank.Balance + transferAmount}`
    balance2.innerHTML = `$ ${myBank.Balance + transferAmount}`
    let transferIndex = 0
    for (let i = 0; i < allBankers.length; i++) {
        if (allBankers[i].accNumber == accNumBer.value) {
            userFound = true
            transferIndex = i
            break;
        }
    }
    transsPin.value = ""
    setTimeout(() => {
        Swal.fire(
            'Transaction Successful',
            'Click the button below to exit',
            'success',
          )
    }, 300);

    transferObject = {
        from: `${myBank.firstname} ${myBank.lastname}`,
        towho: `${allBankers[transferIndex].firstname} ${allBankers[transferIndex].lastname}`,
        amount: amount.value,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString()
    }
    allBankers[transferIndex].transfer.push(transferObject)

    transactionObject = {
        amount: depositPrice,
        sender: `${myBank.firstname} ${myBank.lastname}`,
        purpose: "Deposit",
        beneficiaryName: `${allBankers[transferIndex].firstname} ${allBankers[transferIndex].lastname}`,
        date: `${new Date().toLocaleDateString()}, ${new Date().toLocaleTimeString()}`,
        beneficiaryBank: "Fintech Bank",
        beneficiaryAccount: allBankers[transferIndex].accNumber,
        transactionCategory: "Credit Transaction",
        reference: receiptReference
    }
    allBankers[transferIndex].transactionHistory.push(transactionObject)

    let notiObjectTransfer = {
        title: "Credit Transaction",
        message: "An amount of money has just been sent to you",
        date: `${new Date().toLocaleDateString()}, ${new Date().toLocaleTimeString()}`
    }

    allBankers[transferIndex].news.push(notiObjectTransfer)

    let debitObject = {
        amount: depositPrice,
        sender: `${myBank.firstname} ${myBank.lastname}`,
        purpose: "Debit",
        beneficiaryName: `${allBankers[transferIndex].firstname} ${allBankers[transferIndex].lastname}`,
        date: `${new Date().toLocaleDateString()}, ${new Date().toLocaleTimeString()}`,
        beneficiaryBank: "Fintech Bank",
        beneficiaryAccount: allBankers[transferIndex].accNumber,
        transactionCategory: "Debit Transaction",
        reference: receiptReference
    }
    myTransaction.push(debitObject)

    let notiObject = {
        title: "Debit Transaction",
        message: "You just transfered money out",
        date: `${new Date().toLocaleDateString()}, ${new Date().toLocaleTimeString()}`
    }

    myNotification.push(notiObject)

    localStorage.setItem('bankers', JSON.stringify(allBankers))

    
}else{
    setTimeout(() => {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Inconsistencies in value',
          })
    }, 150);
}
    accountName.innerHTML = ""
    amount.value = ""
    accNumBer.value = ""
}

let cardSection = () => {
    window.location.href = "myCards.html"
}




modalBody3.innerHTML = `<div id="myModal3" class="modal fade" role="dialog" tabindex="-1" aria-labelledby = "myModalLabel" aria-hidden = "true">
                <div class="modal-dialog">
                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header">
                    <h4 class="modal-title fs-5" id = "myModalLabel">Exchange Money</h4>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label = "Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group mb-3">
                    <label for="currency">Pick the currency you want to change to</label>
                    <select name="currency" id="selectValue" class="form-control">
                        <option selected disabled value = "DEF">Select Currency</option>
                        <option value="NGN">NGN</option>
                        <option value="EUR">EUR</option>
                        <option value="GBP">GBP</option>
                        <option value="CAD">CAD</option>
                    </select>
                </div>
                    <input type="number" class="form-control mb-3" placeholder="Enter the amount of dollars you want to exchange"  
                    id = "dollarAmount">

                     <div id = "displayCurrency" class = "text-center text-success fs-5"></div>
                    </div>
                    <div class="modal-footer">
                    <button onclick = "exchangeValue()" type="button" class="btn btn-primary" data-bs-dismiss="modal">Exchange</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
                </div>
                </div>`

let fetchApi = fetch("https://api.freecurrencyapi.com/v1/latest?apikey=FctY8K6NLvHleB448t2P4wD4EewNm8DfHmYPvBD1")
fetchApi.then((response) => response.json().then((convertedResponse) => {

    document.getElementById('dollarAmount').addEventListener('keyup', () => {
        if (selectValue.value == "NGN") {
            displayCurrency.innerHTML = `₦ ${(dollarAmount.value * 750).toFixed(2)}`
        }
        else if (selectValue.value == "CAD") {
            displayCurrency.innerHTML = `$ ${(dollarAmount.value * convertedResponse.data.CAD).toFixed(2)}`
        }
        else if (selectValue.value == "EUR") {
            displayCurrency.innerHTML = `₤ ${(dollarAmount.value * convertedResponse.data.EUR).toFixed(2)}`
        }
        else if (selectValue.value == "GBP") {
            displayCurrency.innerHTML = `£ ${(dollarAmount.value * convertedResponse.data.GBP).toFixed(2)}`
        }
    })
}))

let exchangeValue = () => {
    let fetchApi = fetch("https://api.freecurrencyapi.com/v1/latest?apikey=FctY8K6NLvHleB448t2P4wD4EewNm8DfHmYPvBD1")
    fetchApi.then((response) => response.json().then((convertedResponse) => {
        if (selectValue.value == "NGN") {
            myBank.Balance = parseFloat(myBank.Balance) - parseFloat(dollarAmount.value)
            myBank.naira = parseFloat(myBank.naira) + parseFloat((dollarAmount.value * 750).toFixed(2))
            naira.innerHTML = `₦ ${myBank.naira.toFixed(2)}`
            let notiObject = {
                title: "Debit Transaction",
                message: "You just exchanged Dollar to Naira",
                date: `${new Date().toLocaleDateString()}, ${new Date().toLocaleTimeString()}`
            }
        
            myNotification.push(notiObject)      
        }
        else if (selectValue.value == "CAD") {
            myBank.Balance = parseFloat(myBank.Balance) - parseFloat(dollarAmount.value)
            myBank.Yen = parseFloat(myBank.Yen) + parseFloat((dollarAmount.value * convertedResponse.data.CAD).toFixed(2))
            jpyen.innerHTML = `$ ${myBank.Yen.toFixed(2)}`

            let notiObject = {
                title: "Debit Transaction",
                message: "You just exchanged Dollar to Canadian Dollar",
                date: `${new Date().toLocaleDateString()}, ${new Date().toLocaleTimeString()}`
            }
        
            myNotification.push(notiObject) 

        }
        else if (selectValue.value == "EUR") {
            myBank.Balance = parseFloat(myBank.Balance) - parseFloat(dollarAmount.value)
            myBank.euro = parseFloat(myBank.euro) + parseFloat((dollarAmount.value * convertedResponse.data.EUR).toFixed(2))
            euro.innerHTML = `₤ ${myBank.euro.toFixed(2)}`
            let notiObject = {
                title: "Debit Transaction",
                message: "You just exchanged Dollar to Euro",
                date: `${new Date().toLocaleDateString()}, ${new Date().toLocaleTimeString()}`
            }
        
            myNotification.push(notiObject) 

        }
        else if (selectValue.value == "GBP") {
            myBank.Balance = parseFloat(myBank.Balance) - parseFloat(dollarAmount.value)
            myBank.pounds = parseFloat(myBank.pounds) + parseFloat((dollarAmount.value * convertedResponse.data.GBP).toFixed(2))
            pound.innerHTML = `£ ${myBank.pounds.toFixed(2)}`

            let notiObject = {
                title: "Debit Transaction",
                message: "You just exchanged Dollar to Pounds",
                date: `${new Date().toLocaleDateString()}, ${new Date().toLocaleTimeString()}`
            }
        
            myNotification.push(notiObject) 

        }
        
        
        
        
        balance1.innerHTML = `$ ${myBank.Balance + transferAmount}`
        balance2.innerHTML = `$ ${myBank.Balance + transferAmount}`
        
        localStorage.setItem('bankers', JSON.stringify(allBankers))
        dollarAmount.value = ""
        displayCurrency.innerHTML = ""
        selectValue.value = "DEF"
        setTimeout(() => {
            Swal.fire(
                'Exchange Made Successfully',
                'Click the button below to exit',
                'success',
              )
        }, 300);
    }))
}

modalBody4.innerHTML = `<div id="myModal4" class="modal fade" role="dialog" tabindex="-1" aria-labelledby = "myModalLabel" aria-hidden = "true">
                <div class="modal-dialog">
                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header">
                    <h4 class="modal-title fs-5" id = "myModalLabel">Pay your monthly bills</h4>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label = "Close"></button>
                    </div>
                    <div class="modal-body">
                        <h5 class = "text-danger">Are you sure you want to pay your $14 Prime Monthly Subscription</h5>
                    </div>
                    <div class="modal-footer">
                    <button onclick = "payBills()" type="button" class="btn btn-primary" data-bs-dismiss="modal">PayBill</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
                </div>
                </div>`

let payBills = () => {
    myBank.Balance = parseFloat(myBank.Balance) - 14
    balance1.innerHTML = `$ ${myBank.Balance + transferAmount}`
    balance2.innerHTML = `$ ${myBank.Balance + transferAmount}`
    let notiObject = {
        title: "Debit Transaction",
        message: "You just paid your $14 prime monthly subscription",
        date: `${new Date().toLocaleDateString()}, ${new Date().toLocaleTimeString()}`
    }
    myNotification.push(notiObject)
    localStorage.setItem('bankers', JSON.stringify(allBankers))
    setTimeout(() => {
        alert("Monthly Payment made Successfully")
    }, 500);
}

modalBody5.innerHTML = `<div id="myModal5" class="modal fade" role="dialog" tabindex="-1" aria-labelledby = "myModalLabel" aria-hidden = "true">
                <div class="modal-dialog">
                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header">
                    <h4 class="modal-title fs-5" id = "myModalLabel">Pay your monthly bills</h4>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label = "Close"></button>
                    </div>
                    <div class="modal-body">
                        <h5 class = "text-danger">Are you sure you want to pay your $9 Music Monthly Subscription</h5>
                    </div>
                    <div class="modal-footer">
                    <button onclick = "payBillss()" type="button" class="btn btn-primary" data-bs-dismiss="modal">PayBill</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
                </div>
                </div>`

let payBillss = () => {
    myBank.Balance = parseFloat(myBank.Balance) - 9
    balance1.innerHTML = `$ ${myBank.Balance + transferAmount}`
    balance2.innerHTML = `$ ${myBank.Balance + transferAmount}`
    let notiObject = {
        title: "Debit Transaction",
        message: "You just paid your $9 Music Monthly subscription",
        date: `${new Date().toLocaleDateString()}, ${new Date().toLocaleTimeString()}`
    }
    myNotification.push(notiObject)
    localStorage.setItem('bankers', JSON.stringify(allBankers))
    setTimeout(() => {
        Swal.fire(
            'Monthly Payment made Successfully',
            'Click the button below to exit',
            'success',
          )
    }, 300);
}

modalBody6.innerHTML = `<div id="myModal6" class="modal fade" role="dialog" tabindex="-1" aria-labelledby = "myModalLabel" aria-hidden = "true">
                <div class="modal-dialog">
                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header">
                    <h4 class="modal-title fs-5" id = "myModalLabel">Pay your monthly bills</h4>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label = "Close"></button>
                    </div>
                    <div class="modal-body">
                        <h5 class = "text-danger">Are you sure you want to pay your $299 Groceries Monthly Subscription</h5>
                    </div>
                    <div class="modal-footer">
                    <button onclick = "payBillsss()" type="button" class="btn btn-primary" data-bs-dismiss="modal">PayBill</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
                </div>
                </div>`

let payBillsss = () => {
    myBank.Balance = parseFloat(myBank.Balance) - 299
    balance1.innerHTML = `$ ${myBank.Balance + transferAmount}`
    balance2.innerHTML = `$ ${myBank.Balance + transferAmount}`
    let notiObject = {
        title: "Debit Transaction",
        message: "You just paid your $299 Groceries monthly subscription",
        date: `${new Date().toLocaleDateString()}, ${new Date().toLocaleTimeString()}`
    }
    myNotification.push(notiObject)
    localStorage.setItem('bankers', JSON.stringify(allBankers))
    setTimeout(() => {
        Swal.fire(
            'Monthly Payment made Successfully',
            'Click the button below to exit',
            'success',
          )
    }, 300);
}

modalBody7.innerHTML = `<div id="myModal7" class="modal fade" role="dialog" tabindex="-1" aria-labelledby = "myModalLabel" aria-hidden = "true">
                <div class="modal-dialog">
                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header">
                    <h4 class="modal-title fs-5" id = "myModalLabel">Pay your monthly bills</h4>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label = "Close"></button>
                    </div>
                    <div class="modal-body">
                        <h5 class = "text-danger">Are you sure you want to pay your $962 Credit card statement</h5>
                    </div>
                    <div class="modal-footer">
                    <button onclick = "payBillssss()" type="button" class="btn btn-primary" data-bs-dismiss="modal">PayBill</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
                </div>
                </div>`

let payBillssss = () => {
    myBank.Balance = parseFloat(myBank.Balance) - 962
    balance1.innerHTML = `$ ${myBank.Balance + transferAmount}`
    balance2.innerHTML = `$ ${myBank.Balance + transferAmount}`
    let notiObject = {
        title: "Debit Transaction",
        message: "You just paid your $962 Credit Card Statement",
        date: `${new Date().toLocaleDateString()}, ${new Date().toLocaleTimeString()}`
    }
    myNotification.push(notiObject)
    localStorage.setItem('bankers', JSON.stringify(allBankers))
    setTimeout(() => {
        Swal.fire(
            'Monthly Payment made Successfully',
            'Click the button below to exit',
            'success',
          )
    }, 300);
}









