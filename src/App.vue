<template>
  <div id="app">
    <KdHeader/>
	<KdVoter v-for="player in players"
			v-bind:key="player.position"
			v-bind:leader="player.leader"
			v-bind:name="player.name"
			v-bind:power="player.power"
			v-bind:moderator="player.moderator"
	/>
	<button type="button" class="btn btn-primary" v-on:click="changeLeader">Change Leader</button>
  </div>
</template>

<script>
import KdVoter from './components/KdVoter.vue'
import KdHeader from './components/KdHeader.vue'

export default {
  name: 'App',
  data : function () {
	return {
		globalPower: 3,
		players: [
			{
				position: 0,
				name: "Steve",
				power: 2,
				leader: true,
				moderator: false
			},
			{
				position: 1,
				name: "Megan",
				power: 6,
				isLeader: false,
				moderator: true
			}
		]
	}
  },
  components: {
    KdHeader,
    KdVoter
  },
  methods: {
    changeLeader: function() {
		this.$set(this.players[0], "leader", false)
		var nextPlayerPosition = this.players.length;
	},
    addPlayer: function() { // TODO
		this.$set(this.players[0], "leader", false)
		var nextPlayerPosition = this.players.length;
		this.$set(this.players, nextPlayerPosition, {
			position: nextPlayerPosition,
			name: "Megan",
			power: 6,
			isLeader: false,
			moderator: true
		});
	},
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
