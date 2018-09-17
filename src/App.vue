<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
* {
	font-family: 'Montserrat', sans-serif;
	margin: 0;
}
*::selection {
	background: #F5D76E; /* WebKit/Blink Browsers */
}
*::-moz-selection {
	background: #F5D76E; /* Gecko Browsers */
}
body {
	background: #eee;
	margin: 0;
	padding: 0;
	min-height: 100vh;
	overflow:hidden;
}
</style>
