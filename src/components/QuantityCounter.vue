<template>
  <div>
      <button v-on:click='decrement()'> - </button>
      <label> {{ counter }} </label>
      <button v-on:click='increment()'> + </button>
  </div>
</template>

<script>
export default {
    name: 'QuantityCounter',
    data () {
        return {
            counter : 0
        }
    },
    props: {
        foods: {
            type : Object
    }
    },
    methods: {
        increment:function() {
            if (this.counter == 10) {
                alert("You cannot buy more than 10 items.")
            } else {
                this.counter++;
                this.$emit('counter', this.foods, this.counter)
            }
            
        },

        decrement:function() {
            if (this.counter == 0) {
                return
            } else {
                this.counter--;
                this.$emit('counter', this.foods, this.counter)
            }
            
        }
    }
  
}
</script>

<style scoped>
button {
    background-color : lightblue;
    border-radius: 10px;
    font-size: 40px;
    width: 54px;
}
label {
    font-size: 36px;
}

</style>