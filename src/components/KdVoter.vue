<template>
	<div class="alert alert-secondary" role="alert">
		<div class="container">
		  <div class="row">
			<div class="col">
			  <h1>{{ leader ? "X" : "" }}</h1>
			</div>
			<div class="col">
			  <h1>{{ name }}</h1>
			</div>
			<div class="col">
			  <h1>{{ vote }}</h1>
			</div>
			<div class="col">
			  <h1>{{ power }}</h1>
			</div>
			<div class="col">
			  <h1>{{ moderator ? "X" : ""}}</h1>
			</div>
		  </div>
		</div>
	</div>
</template>

<script>
export default {
  name: 'kdVoteTracker',
  props: {
	  leader: Boolean,
      name: String,
	  vote: String,
	  power: Number,
	  moderator: Boolean
  }
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
