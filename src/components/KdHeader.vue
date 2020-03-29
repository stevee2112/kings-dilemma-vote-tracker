<template>
	<div class="alert alert-warning" role="alert">
		<div>
		  <div class="row">
			<div class="col-2">
			  <h2>Leader</h2>
			</div>
			<div class="col-2">
			  <h2>Player</h2>
			</div>
			<div class="col-4">
			  <h2>Vote</h2>
			</div>
			<div class="col-2">
			  <h2>Power</h2>
			</div>
			<div class="col-2">
			  <h2>Moderator</h2>
			</div>
		  </div>
		</div>
	</div>
</template>

<script>
export default {
  name: 'kdHeader',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
