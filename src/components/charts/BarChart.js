import { Bar } from 'vue-chartjs'
import database from '../../firebase.js'
export default {
  extends: Bar,
  data: function () {
    return {
        datacollection: {
            labels: ["Prawn omelette", "Dry Beef Hor Fun", "Sambal KangKung", "Pork Fried Rice", "Mapo Tofu", "Cereal Prawn"],
            datasets: [{
                label: "Quantity Ordered",
                backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
                data: []
              }]
        },
        options: {
            legend: { display: false },
            title: {
              display: true,
              text: 'Total Number of Each Dish'
            },
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                yAxes: [
                  {
                    ticks: {
                      min: 0,
                      stepSize : 1
                    },
                  }
                ]
             }
            }
        }     
  },
  methods: {
      fetchItems: function () {
        var quantityDishes = [0,0,0,0,0,0];
      database.collection('orders').get().then(querySnapShot => {
        querySnapShot.forEach(doc => { 
          var i = 0;
            doc.data().orderList.forEach(dish => {
              quantityDishes[i] += parseInt(dish.slice(dish.length-2,dish.length));
              i++;
            })
        })
        quantityDishes.forEach(dish => {
              this.datacollection.datasets[0].data.push(dish)
            }) 
        this.renderChart(this.datacollection, this.options)
      })
    }
  },
  mounted () {
    this.renderChart(this.datacollection, this.options)
  },
  created () {
      this.fetchItems()
  }
    }
