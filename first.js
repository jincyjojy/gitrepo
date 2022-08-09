//Create an HTML table
var tableElem = window.document.getElementById('your_portfolio');
var tableElemName = 'your_portfolio';
var tableBody = tableElem.getElementsByTagName("tbody").item(0);
let stocks_count = tableBody.rows.length;

//calculating prev portfolio
let prev_cash = window.document.getElementById("prev_cash");
prev_cash = parseFloat(prev_cash.textContent.replace(/\$|,/g,''));
let total_prev_value = ComputeTableColumnTotal(tableBody, 1, stocks_count, prev_cash);
let totalPrevValueElem = window.document.getElementById("Total_Prev_Value");
let total_prev_value_$ = "$"+total_prev_value
totalPrevValueElem.innerHTML = total_prev_value_$;
let footTrElem = tableBody.rows[7];
footTrElem.cells[1].textContent = total_prev_value_$;

//store historical values in a list
/*var pre_hist_list = [];
pre_hist_list[0] = parseFloat(tableBody.rows[2].cells[3].textContent.replace(/\$|,/g,'')); 
pre_hist_list[1] = parseFloat(tableBody.rows[3].cells[3].textContent.replace(/\$|,/g,''));
pre_hist_list[2] = parseFloat(tableBody.rows[4].cells[3].textContent.replace(/\$|,/g,''));
pre_hist_list[3] = parseFloat(tableBody.rows[5].cells[3].textContent.replace(/\$|,/g,''));
pre_hist_list[4] = parseFloat(tableBody.rows[6].cells[3].textContent.replace(/\$|,/g,''));
console.log(pre_hist_list);*/

//calculating total New Value
let newCashElem = window.document.getElementsByClassName("new_cash_value");
let total_new_value = ComputeTableColumnTotal(tableBody, 6, stocks_count, prev_cash);
let totalCurrValueElem = window.document.getElementById("total_new_value");
total_new_value = "$"+total_new_value
totalCurrValueElem.innerHTML = total_new_value;
footTrElem.cells[6].textContent = total_new_value;

//add values to the editable column
function update_new_values(row_ID){
    let tableElem = window.document.getElementById('your_portfolio');
    let tableBody = tableElem.getElementsByTagName("tbody").item(0);
    let totalPrevValueElem = window.document.getElementById("total_new_value");
    let total_prev_value_$ = totalPrevValueElem.innerHTML;
    let total_prev_value = parseFloat(total_prev_value_$.replace(/\$|,/g,''));
    let thisTrElem = tableBody.rows[row_ID];                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
    //let prev_qty_hist= parseFloat(thisTrElem.cells[5].textContent.replace(/\$|,/g,''));
    // let currQnty = thisTrElem.insertCell[4];
    let new_price = parseFloat(thisTrElem.cells[4].textContent.replace(/\$|,/g,'')); // need to be converted into float
    let new_qty = thisTrElem.cells[5].getElementsByClassName("new_qty")[0].valueAsNumber;
    let prev_qty_hist = parseFloat(thisTrElem.cells[3].textContent.replace(/\$|,/g,''));                                                                                                                           
    thisTrElem.cells[6].textContent = "$"+ new_price * new_qty;     
        //calculating New Value                     
    let new_cash_updated = ComputeCash(tableBody, 6, stocks_count, total_prev_value);
    if(new_cash_updated<=0){
        document.getElementById("new_qty_id").value = prev_qty_hist;
        thisTrElem.cells[6].textContent = "$"+ new_price * prev_qty_hist;
        new_cash_updated = ComputeCash(tableBody, 6, stocks_count, total_prev_value);
        window.alert("Your cash value is not enough to buy this stock. Please change the quantity!!!");
    } else{
        prev_qty_hist = new_qty;
        document.getElementById("new_qty_id").value = prev_qty_hist;
    } 
    let newCashUpdatedElem = window.document.getElementsByClassName("new_cash_value");
    let new_cash_updated_$ = "$"+new_cash_updated;
    newCashUpdatedElem.innerHTML = new_cash_updated_$;
    let FirstTrElem = tableBody.rows[1];
    FirstTrElem.cells[6].textContent = new_cash_updated_$;
}

function ComputeTableColumnTotal(tableBody, colNumber, stocks_count, prev_cash){
    let sum_of_cash = prev_cash;
    let i, obj;
    for(i=2; i<(stocks_count-1); i++){
        let thisTrElem = tableBody.rows[i];
        let thisTdElem = thisTrElem.cells[colNumber];
        let thisTextNode = thisTdElem.childNodes.item(0);
        obj = parseFloat(thisTextNode.data.replace(/\$|,/g, ''));
        sum_of_cash += obj;
    }
    return sum_of_cash;
}
function ComputeCash(tableBody, colNumber, stocks_count, total_prev_value){
    let sum_of_cash = 0, curr_cash=0;
    let i, obj;
    for(i=2; i<(stocks_count-1); i++){
        let thisTrElem = tableBody.rows[i];
        let thisTdElem = thisTrElem.cells[colNumber];
        let thisTextNode = thisTdElem.childNodes.item(0);
        obj = parseFloat(thisTextNode.data.replace(/\$|,/g, ''));
        sum_of_cash += obj;
    }
    curr_cash=total_prev_value-sum_of_cash;
    return curr_cash;
}