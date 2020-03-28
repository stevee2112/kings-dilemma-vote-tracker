<template>
  <div id="app">
    <KdHeader/>
	<KdVoter v-for="player in players"
			v-bind:key="player.position"
			v-bind:playerIndex="player.position"
			v-bind:leader="player.leader"
			v-bind:name="player.name"
			v-bind:vote="player.vote"
			v-bind:power="player.power"
			v-bind:moderator="player.moderator"
			v-bind:active="player.active"
			v-on:voted="handleVote"
	/>
	<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#addPlayerModal">
		Add Player
	</button>
	<button type="button" class="btn btn-primary" v-on:click="changeLeader">Change Leader</button>
	<button type="button" class="btn btn-primary" v-on:click="changeModerator">Change Moderator</button>
	<button type="button" class="btn btn-danger" v-on:click="newVote">New Vote</button>

	<div class="modal fade" id="addPlayerModal" ref="addPlayerModal" tabindex="-1" role="dialog" aria-labelledby="addPlayerModalLabel" aria-hidden="true">
	  <div class="modal-dialog" role="document">
		<div class="modal-content">
		  <div class="modal-header">
			<h5 class="modal-title" id="addPlayerModalLabel">Add Player</h5>
			<button type="button" class="close" data-dismiss="modal" aria-label="Close">
			  <span aria-hidden="true">&times;</span>
			</button>
		  </div>
		  <div class="modal-body">
			<form>
			  <div class="form-group row">
				<label for="inputName" class="col-sm-2 col-form-label">Name</label>
				<div class="col-sm-10">
				  <input type="text" class="form-control" id="inputName" placeholder="Name">
				</div>
			  </div>
			  <div class="form-group row">
				<label for="inputPower" class="col-sm-2 col-form-label">Power</label>
				<div class="col-sm-10">
				  <input type="text" class="form-control" id="inputPower" placeholder="Power">
				</div>
			  </div>
			</form>
		  </div>
		  <div class="modal-footer">
			<button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
			<button type="button" class="btn btn-primary" v-on:click="addPlayer">Add</button>
		  </div>
		</div>
	  </div>
	</div>
  </div>
</template>

<script>
import KdVoter from './components/KdVoter.vue'
import KdHeader from './components/KdHeader.vue'
import $ from 'jquery'

export default {
  name: 'App',
  data : function () {
	return {
		currentLeader: 0,
		currentModerator: 1,
		currentPlayer: 0,
		players: [
			{
				position: 0,
				name: "Steve",
				power: 0,
				leader: true,
				moderator: false,
				active: true,
				vote: "",
			},
			{
				position: 1,
				name: "Megan",
				power: 0,
				leader: false,
				moderator: true,
				active: false,
				vote: "",
			}
		]
	}
  },
  components: {
    KdHeader,
    KdVoter
  },
  methods: {
	getNext: function() {
		return (this.currentPlayer + 1) % this.players.length;
	},
	handleVote: function(voteData) {
		this.$set(this.players[voteData.player], "power", this.players[voteData.player].power + voteData.power)
		this.$set(this.players[voteData.player], "vote", voteData.vote)
		this.$set(this.players[voteData.player], "active", false)

		var nextPlayer = this.getNext();
		this.currentPlayer = nextPlayer;
		this.$set(this.players[nextPlayer], "active", true)
	},
	newVote: function() {
		for (var i = 0; i < this.players.length;i++) {
			this.$set(this.players[i], "power", 0);
			this.$set(this.players[i], "vote", "");
		}
	},
    changeLeader: function() {
		this.$set(this.players[this.currentLeader], "leader", false)
		
		this.currentLeader++;
		if (this.currentLeader >= this.players.length) {
			this.currentLeader = 0;
		}

		this.$set(this.players[this.currentLeader], "leader", true)
	},
    changeModerator: function() {
		this.$set(this.players[this.currentModerator], "moderator", false)
		
		this.currentModerator++;
		if (this.currentModerator >= this.players.length) {
			this.currentModerator = 0;
		}

		this.$set(this.players[this.currentModerator], "moderator", true)
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
		$('#addPlayerModal').modal('hide')
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

.btn {
	margin-left: 10px;
	margin-right: 10px;
}
</style>
