<template>
  <div>
   <p style='font-size:28px;'> Menu:</p>
   <ul style='padding-left:26px;'>
       <li id = "menuItem" v-for="(item,index) in selected" :key='index'>
         {{item[0] + " x " + item[1]}} 
       </li>
   </ul>
   <br>
   <button id="sendOrder" v-on:click="sendOrder()">Add Order</button>
  </div>
</template>

<script>
import database from '../firebase.js';
export default {
    data () {
        return {
        show:false,
        menu : ["Prawn omelette", "Dry Beef Hor Fun", "Sambal KangKung", "Pork Fried Rice", "Mapo Tofu", "Cereal Prawn"]
        }
    },
    methods: {
        sendOrder:function() {
            var order = new Array();
            for (var i = 0; i < this.menu.length; i++) {
                var currDish = this.menu[i];
                var index = this.selected.findIndex(dish => dish[0] == currDish);
                if (index != -1) {
                order.push(this.selected[index][0] + " : " + this.selected[index][1])
                } else {
                    order.push(currDish + " : 0")
                }
            }
                database.collection('orders').add({
                    orderList : order
                }).then(() => location.reload());
        }
    },
    props : {
        selected: {
            type: Array
        }
    },
}
</script>

<style scoped>
#sendOrder {
    background-color: orange;
    width: 200px;
    font-size: 22px;
    border-radius: 20px;
}

#menuItem {
    border: none;
    list-style-type: disc;
    font-size: 24px;
    flex-grow: initial;
    flex-basis: initial;
    padding: 0px;
}

#totals {
    font-size: 24px;
}
</style>