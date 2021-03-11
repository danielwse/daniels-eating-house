import { Line } from 'vue-chartjs'
import axios from 'axios'

export default {
  extends: Line,
  data: function () {
    return {
        datacollection: {
            labels: [],
            datasets: [{ 
                data: [],
                fill: false,
                label: 'west',
                borderColor: 'Blue'
            },
            {
                data: [],
                fill: false,
                label : 'national',
                borderColor: 'Green'
            },
            {
                data: [],
                fill : false,
                label : 'east',
                borderColor: 'Yellow'
            },
            {
                data: [],
                fill : false,
                label : 'central',
                borderColor: 'Red'
            },
            {
                data: [],
                fill : false,
                label : 'south',
                borderColor: 'Orange'
            },
            {
                data: [],
                fill: false,
                label : 'north',
                borderColor: 'Violet'
            }

        ]
        },
        options: {
            legend: { display: true},
            title: {
              display: true,
              text: 'PSI Twenty Four Hourly (By Region)'
            },
            responsive: true,
            maintainAspectRatio: false
        }
    }
  },
  methods: {
    fetchItems: function () {
        axios.get(`https://api.data.gov.sg/v1/environment/psi?date=2021-02-23`)
        .then(response => {
            response.data.items.forEach(data => { 
              var i = 0;
                this.datacollection.labels.push(data["timestamp"])              
                Object.values(data["readings"]["psi_twenty_four_hourly"]).forEach(location => {
                    this.datacollection.datasets[i].data.push(location)
                  i++;
                })
            })
            this.renderChart(this.datacollection, this.options)
        })
    }
  },
  created () {
    this.fetchItems()
  }
}
