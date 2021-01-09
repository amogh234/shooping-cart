


add_cart();
display_cart();
input_changer();

function remove_cart()  {

    let button_selector = document.querySelectorAll(".details button");
    for (let i=0; i<button_selector.length; i++) {
        let button = button_selector[i];
        button.addEventListener("click", (event)=> {

            let button_target = event.target;
            let parent_element = button_target.parentElement.remove();
            update_cart();
    })


}
}

function input_changer() {
    
 let input_selector = document.querySelectorAll('.details input');
    for (i=0; i<input_selector.length; i++) {
        let inputs = input_selector[i];
        console.log(inputs);
        inputs.addEventListener('change', (event)=> {
        let input = event.target;
        let input_value = input.value;
        if ( Number.isInteger(input_value)=="false" || input_value <= 0) {
            location.reload();
            input_value = 1;

        }
        update_cart();

        })
    }

}

    
    




    



function getitemcart(event) {

    let button = event.target;
    let button_target =  button.parentElement; 
    let image_select  = button_target.querySelectorAll('img')[0].src;
    let image_selected = image_select.split('/').slice(-2).join('/');
    let name_selected = button_target.querySelectorAll('.name')[0].innerText;
    let input_selector = button_target.querySelectorAll('input')[0].value;
    let price_selector = button_target.querySelectorAll('.price')[0].innerText
    let select =  [

          {

           name:name_selected,
           image:image_selected,
           quantity: input_selector,
           price:price_selector

          }

        ]

        let  selected = select[0];
        let items = localStorage.getItem("product");
        items = JSON.parse(items);
       if (items != null) {
        items = {
            [selected.name]:selected,
            ...items,    
        }
       }

        else {
       items = {
                [selected.name]: selected,

            }

        }
        localStorage.setItem("product", JSON.stringify(items));
    }


    function display_cart() {

        let cart_shop = document.querySelector('.cartcontainer .cartdetails');
        
        if (cart_shop) {

         
        let get_cart = JSON.parse(localStorage.getItem("product"));
        if (get_cart!== null) {
        let shop = Object.values(get_cart);
        cart_shop.innerHTML = '  ';
         Object.values(get_cart).map(get_cart => {
            let detail =  `<div class="details">
                <img src= "${get_cart.image}">
                <input type="number"  value=${get_cart.quantity}>
                <h2 class="price">${get_cart.price}</h2>
                <button>Remove</button> 
                </div>`;
    
            cart_shop.innerHTML += detail;
            update_cart();    
         });
        }
         
         remove_cart();
      }

    }

     
function add_cart() {
    let adding_button = document.querySelectorAll(".cloth .cart");
    for(let i=0; i<adding_button.length; i++) {

        let button = adding_button[i];
    
        button.addEventListener('click', getitemcart);

    }
}

function update_cart () {

    let total = 0;
    let details_selector = document.querySelectorAll(".details");
    let total_selector = document.querySelector('.cartcontainer h1')
  
    for (i=0; i < details_selector.length; i++ ) {

        let specific_details = details_selector[i];
        let quantity = specific_details.querySelectorAll('input')[0].value;
        let price =specific_details.querySelectorAll('.price')[0].innerText;
        let intprice = parseInt(price.replace('price:$', '  '));
        console.log(intprice);
        total = total +(quantity*intprice);
        total_selector.innerHTML = `Total:$${total}`;
    }
    if (details_selector.length == 0) {
        total = 0;
        total_selector.innerHTML = `Total$${total}`;
        localStorage.clear();
    }
    
}







    

    








    


