/**
 * JavaScript Shopping Cart
 */


 function documentReady() {
    let insertBtns = document.getElementsByClassName('product-button');
    for (let i = 0; i < insertBtns.length; i++) {
        let insertBtn = insertBtns[i];
        // var avail_itm=(avail_itms[i]-1);
        insertBtn.addEventListener("click", addItem);
    }

    let plusBtns = document.getElementsByClassName('plus');
    for (let i = 0; i < plusBtns.length; i++) {
        let plusBtn = plusBtns[i];
        plusBtn.addEventListener("click", plusQtt);
    }
// available itmes;
    let avail_itms = document.getElementsByClassName('avail_itm_num');
    // console.log(avail_itm);
    for (let i = 0; i <avail_itms.length; i++) {
        console.log(avail_itms[i]);
        var avail_itm = avail_itms[i];
        // plusBtn.addEventListener("click", plusQtt);
    }

    let minusBtns = document.getElementsByClassName('minus');
    for (let i = 0; i < minusBtns.length; i++) {
        let minusBtn = minusBtns[i];
        minusBtn.addEventListener("click", minusQtt);
    }
    let delItemBtns = document.getElementsByClassName('del');
    for (let i = 0; i < delItemBtns.length; i++) {
        let delBtn = delItemBtns[i];
        delBtn.addEventListener("click", delItem);
    }

    let btnPurchase = document.getElementById("btn-purchase");
    btnPurchase.addEventListener("click", purchase);
}
documentReady();


function addItem(e) {
    let item = e.target.parentElement.parentElement;
    let title = item.querySelector('.product-title').innerText;
    let price = item.querySelector('.product-price').innerText.replace("€", "");
    var num_itm = item.querySelector(".avail_itm_num").innerText;
     num_itm--;
    console.log(num_itm);
    
    //.replace("");
    let picSrc = item.querySelector('.product-image').src;
    // console.log(title, price, picSrc);
    rowCreate(title, price, picSrc,num_itm);
    updateTotal();

}

function rowCreate(title, price, picSrc,num_itm) {
    let cartItems = document.getElementById('cart-items');
    let cartItemsNames = cartItems.getElementsByClassName('cart-item-title');
    let cartItemQtt = cartItems.getElementsByClassName('cart-quantity');
    for (let i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerText == title) {
            alert("This item already exists in your cart");
            let qtt = Number(cartItemQtt[i].innerHTML);
            cartItemQtt[i].innerHTML = qtt + 1;
            console.log(qtt);
            updateTotal();
            return;//it will stop our script

        }

    }
    let item = `
    <div class="cart-row row d-flex ">
        <div class="cart-item col-6 my-3 ">
            <img class="cart-item-image" src="${picSrc}" width="100" height="100">
            <span class="cart-item-title h5 ">${title}</span>
            <span class="cart-avail-item h5 ">  ${num_itm}</span>
            
        </div>
        
        <span class="cart-price col-3 h4 my-3">€ ${price}</span>
       
        <div class="cart-qtty-action col-3 d-flex">            
            <i class="minus fa fa-minus-circle my-auto" ></i>            
            <div class="cart-quantity p-4 h4">1</div>            
            <i class="plus fa fa-plus-circle my-auto"></i>         
            <button class="del btn btn-danger rounded-circle  my-auto ms-3 fw-bold" type="button"> X </button>            
        </div>
    </div>`;
    let cart = document.getElementById('cart-items');
    cart.innerHTML += item;
    documentReady();
}

function updateTotal() {
    let cart = document.getElementById("cart-items");
    let cartRows = cart.getElementsByClassName("cart-row");
    let total = 0; // it will be calculated from zero each time it is updated
    for (let i = 0; i < cartRows.length; i++) {
        let cartRow = cartRows[i];
        let price = parseFloat(cartRow.getElementsByClassName("cart-price")[0].innerText.replace("€", ""));//we need the first one
        let qtt = Number(cartRow.getElementsByClassName("cart-quantity")[0].innerText);
        console.log(price, qtt);
    
       
        total += (price * qtt);


        if (total>=100){


            // total += (price * qtt);
            var discount= (total*0.1);
            console.log(discount);
            total=(total-discount);


            total = total.toFixed(2);//
            let totalElement = document.getElementById("total").querySelector('#price');
            // console.log(total);
            totalElement.innerHTML = "10% discount "+"€" + total;

         }
         else{

            // total = total.toFixed(2);//toFixed() will help rounding the number to 2 decimals
    let totalElement = document.getElementById("total").querySelector('#price');
    // console.log(total);
    totalElement.innerHTML = "€" + total;
         }
       
        console.log(total);
    }
    
}

function plusQtt(e) {
// let num_itm="";

let num_itm =Number(document.querySelector(".cart-avail-item").innerHTML);
if(num_itm >=1){
    let itemPlus = e.target.parentElement;
  
    let qtt = Number(itemPlus.querySelector('.cart-quantity').innerHTML);

    itemPlus.querySelector('.cart-quantity').innerHTML = qtt + 1;


     document.querySelector(".cart-avail-item").innerHTML=num_itm-1;
    }else{
        document.querySelector(".cart-avail-item").innerHTML="not available";
    }
   



    console.log(num_itm);
    // num_itm.value -=1;

    console.log(num_itm);//9
    console.log(qtt);
    updateTotal();
}

function minusQtt(e) {
    let itemMinus = e.target.parentElement.parentElement;
    let qtt = Number(itemMinus.querySelector('.cart-quantity').innerHTML);
    if (qtt == 1) {
        console.log("There shouldn't be 0 products in the cart");
        delItem(e);
    } else {
        itemMinus.querySelector('.cart-quantity').innerHTML = qtt - 1;
        console.log(qtt);
        updateTotal();
    }
}

function delItem(e) {
    let delBtnAction = e.target.parentElement.parentElement.remove();
    updateTotal();
}

function purchase() {
    alert("Thank you for buying with us.");
    let cartItems = document.getElementById('cart-items');
    console.log(cartItems);
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild);
    }
    // cartItems.innerHTML = "";
    updateTotal();
}
