<template>
    <div>
        <ul>
            <li v-for='(order,index) in datapacket' :key='index'>
                <p v-for='(dish,index2) in order.orderList' :key='index2'>
                    {{dish}}
                    <br><br>
                    <input type="number" :id=index2 placeholder="0" min="0">
                </p>
                <button v-on:click='updateOrder()'> Update Order</button>
            </li>
        </ul>
    </div>
</template>
<script>
import database from '../firebase.js'
export default {
    methods : {
        fetchItems:function() {
            database.collection('orders').doc(this.$route.params.docId).get().then(doc => {
            this.datapacket.push(doc.data())
                });
        },

        updateOrder:function() {
            var datapacket2 = this.datapacket;
            for (let i = 0; i < this.datapacket[0].orderList.length; i++) {
                var newQuantity = document.getElementById(i.toString()).value;
                if (newQuantity != "" && newQuantity != null) {
                datapacket2[0].orderList[i] = this.menu[i] + " : " + newQuantity
                }
            } 
            database.collection('orders').doc(this.$route.params.docId).update({orderList: datapacket2[0].orderList}).then(() => this.$router.push({path: '/orders'}))
        }
    },
    data () {
        return {
            datapacket : [

            ],
             menu : ["Prawn omelette", "Dry Beef Hor Fun", "Sambal Kangkung", "Pork Fried Rice", "Mapo Tofu", "Cereal Prawn"]
        }
    },
    created:function() {
        this.fetchItems();
    }
}
</script>
<style scoped>
ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}
button {
  width: 100px;
  height: 50px;
  background-color: #f7cac9;
  border-radius: 10px;
  border-width: 1px;
}


</style>