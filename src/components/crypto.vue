<template>
  <div class="wrapper">
		<span class="title">
		<h3> What if the coin/token hits $... dollars? </h3>
		</span>
		<div class="flex-container">
			<div class="wallet">
				<h3>Fill the fields in</h3>
				<p>Invested money <input  class="dollar" type="number" min="0.01" name="wallet" v-model="invested"></p>
				<p v-if="toggleHandler == false">
          Price per coin/token before <input  class="dollar" type="number" name="wallet"  v-model="tokenBefore">
        </p>
        <p v-else>
            <select v-model="selectedValue">
              <option v-for="crypto in cryptos" :key="crypto.id" :value="crypto.quotes.USD.price">{{ crypto.name }} - {{ crypto.symbol }}</option>
            </select>
            <span class="box " style="background-color:#fad390">
             ${{ properToken }}
            </span>
        </p>

				<p>Price per coin/token after <input  class="dollar" type="number" name="wallet" value="10" v-model="tokenAfter"></p>
        <p>
          <toggle-button :value="false"
               :labels="{checked: 'Crypto Price', unchecked: 'Custom Price'}" :sync="true" :width='110' :change="toggleHandler" v-model="toggleValue"/>
        </p>
			</div>
			<div class="wallet_future">
				<h3>Estimated results</h3>
			  <p>New balance <span class="box dollar">{{ newBalance | round | currency}}</span></p>
				<p>Coins/Tokens <span class="box dollar">{{ tokens | round }}</span></p>
				<div class="winloss">
					<p>Profit <span class="box green dollar">{{ profit | round | currency }}</span></p>
					<p>Multiplier <span class="box green">{{ multiplier | round }}x</span></p>
					<p>Percent <span class="box green">{{ percent | round }}%</span></p> 
				</div>
			</div>
			<div class="warning">
				<small> <i class="em-svg em-chart_with_upwards_trend" style="margin-top:-5px;"></i> This is a tool to see how much money you'd make if your coin/token hits a certain dollar.</small>
			</div>
		</div>
			<footer>
			This is a non-profit (no ads). <br>Please donate some crypto to show some love <i class="em-svg em-revolving_hearts"></i> !<br>
				
				<br>
				<b>Bitcoin:</b> 159ScA6oHS8YriEG5LvczDrC7NBziUxXho<br>
				<b>Ethereum:</b> 0x16b0fb05a2fea8698ab7b9c0beadba40f35ed9c5 <br>
			</footer>
		
	</div>

</template>

<script>
import axios from 'axios'


export default {

  name: 'Calculate',
  data () {
    return {
      cryptos: [],
      invested: '100',
      tokenBefore: '1',
      tokenAfter: '10',
      toggleValue: false,
      selectedValue:  null
    }
  },
  created() {
    axios.get('https://api.coinmarketcap.com/v2/ticker/')
    .then( res => {
      this.cryptos = res.data.data;
    })
    .catch( function(error) {

    });
  },
  methods: {
     rounded (value, decimals) {
        if(!value) {
          value = 0;
        }

        if(!decimals) {
          decimals = 0;
        }

        value = Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
        return value;
      },
  },
   computed: {
    newBalance: function(){
      // updates the new balance
      var updateNewbalance = (this.tokenAfter/this.properToken)*this.invested;
      return updateNewbalance;
    },
    tokens: function() {
      // updates the tokens
      var updateTokens = this.invested / this.properToken;
      return updateTokens;
    },
    profit: function() {
      // shows how much profit you made
      var updateProfit = this.newBalance - this.invested;
      return updateProfit;
    },
    multiplier: function() {
      // show how much you've multiplied your money
      var updateMultiplier = this.tokenAfter/this.properToken;
      return updateMultiplier;
    },
    percent: function() {
      // shows your percentage
      var updatePercent = this.multiplier * 10;
      return updatePercent;
    },
    toggleHandler: function() {
      return this.toggleValue;
    },
    properToken: function() {
        if(this.toggleHandler == false) {
          return this.tokenBefore;
         } else {
          return this.rounded(this.selectedValue, 3);
        }
    }
  }
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
p {
	margin: 10px;
	display:block;
	 flex: 1 0 220px;
}
.wrapper {
	width:100%;
	max-width:960px;
	margin:10px auto;
}
.flex-container {
	padding:20px 0px 20px 20px;
	display:flex;
	flex-wrap:wrap;
	background-color:#fff;
	height:auto;
	box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
}
.box {
  text-align:right;
  width:90%;
  height:20px;
  background:#fafafa;
  padding:5px 10px;
  font-size:13px;
  display:block;
      box-shadow: 0 2px 2px 0 rgba(0,0,0,0.16), 0 0 0 1px rgba(0,0,0,0.08);
    transition: box-shadow 200ms cubic-bezier(0.4, 0.0, 0.2, 1);
    cursor:pointer;
}
.green {
  background: rgb(200, 247, 197, 1);
}
.warning {
	position:relative;
	bottom:0;
	right:0;
	font-size:12px;
	color:grey;
}
.wallet {
	 flex-grow:1;
}
.wallet_future {
	 flex-grow:2;
}
.wallet_future input {
	 background-color:#F2F1EF;
	 cursor:default;
}
.winloss #profit{
	background-color:#C8F7C5;
}
.winloss #x{
	background-color:#C8F7C5;
}
.winloss #percent{
	background-color:#C8F7C5;
}
input {
	width:90%;
	height:10px;
	padding:10px;
	text-align:end;
	border:1px solid #ccc;
	box-shadow: 0 1px 1px rgba(0,0,0,0.06), 0 1px 1px rgba(0,0,0,0.06);
}
select {
  width:94%;
	height:15px;
	padding:15px;
	text-align:end;
  cursor:pointer;
	border:1px solid #ccc;
	box-shadow: 0 1px 1px rgba(0,0,0,0.06), 0 1px 1px rgba(0,0,0,0.06);
}
input.disabled {
	cursor:default;
}
.dollar {
	  background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' version='1.1' height='23px' width='85px'><text x='5' y='20' fill='black' font-size='16' font-weight='500' font-family='Montserrat, sans-serif'>$</text></svg>") no-repeat;
}
h3 {
	font-weight:400;
}
span.title {
	text-transform: uppercase;
	padding:20px;
}
footer {
	display:block;
	padding:25px;
	font-size:12px;
	text-align:center;
	color:grey;
}
@media screen and (max-width: 780px) {
    body {
		overflow:scroll;
	}
	span.title {
		display:none;
	}
	.wrapper {
	width:100%;
	max-width:960px;
	margin:-10px auto;
}
}
</style>
