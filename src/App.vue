<template>
  <div id="app">
	<div class="alert alert-info" role="alert" :hidden="this.voting == true">
		<h3>Voting Over - Aye Votes: {{ this.totalAye }}, Nay Votes: {{ this.totalNay }}</h3>
	</div>
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
	<div>
		<div class="row">
			<div class="col-3">
				<h2  :hidden="!started"><span class="badge badge-primary">Aye Votes: {{ this.totalAye }}</span></h2>
			</div>
			<div class="col-6">
				<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#addPlayerModal" :hidden="started">
					Add Player
				</button>
				<button type="button" class="btn btn-success" v-on:click="start" :hidden="started">Start</button>
				<button type="button" class="btn btn-primary" v-on:click="changeLeader">Change Leader</button>
				<button type="button" class="btn btn-primary" v-on:click="changeModerator">Change Moderator</button>
				<button type="button" class="btn btn-danger" v-on:click="newVote" :hidden="!started">New Vote</button>
			</div>
			<div class="col-3">
				<h2 :hidden="!started"><span class="badge badge-danger">Nay Votes: {{ this.totalNay }}</span></h2>
			</div>
		</div>
	</div>

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
			<form @submit.prevent>
			  <div class="form-group row">
				<label for="inputName" class="col-sm-2 col-form-label">Name</label>
				<div class="col-sm-10">
				  <input type="text" class="form-control" id="inputName" ref="inputName" placeholder="Name" v-model="inputName" v-on:keyup.enter="addPlayer">
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
		voting: true,
		started: false,
		currentLeader: 0,
		currentModerator: 0,
		currentPlayer: 0,
		inputName: "",
		highestVote: 0,
		totalAye: 0,
		totalNay: 0,
		players: [],
	}
  },
  components: {
    KdHeader,
    KdVoter
  },
  mounted() {
    $(this.$refs.addPlayerModal).on("shown.bs.modal", this.setNameFocus)
  },
  methods: {
	start: function() {
		this.started = true;
		this.currentPlayer = this.currentLeader;
		this.$set(this.players[this.currentLeader], "active", true)
	},
	setNameFocus: function() {
		this.$refs.inputName.focus();
	},
	getNext: function() {
		var start = this.currentPlayer;
		var at = this.currentPlayer + 1;
		while (true) {
			var next = at % this.players.length;

			// back at beginning
			if (next == start) {
				return next;	
			}

			if (this.players[next].vote == "passModerator" || this.players[next].vote == "passPower") {
				at = next + 1;
			} else {
				return next;
			}
		}
	},
	handleVote: function(voteData) {
		var totalVoted = this.players[voteData.player].power + voteData.power
		this.$set(this.players[voteData.player], "power", totalVoted)
		this.$set(this.players[voteData.player], "vote", voteData.vote)
		this.$set(this.players[voteData.player], "active", false)

		if (voteData.vote == "aye") {
			this.totalAye += voteData.power;
		}

		if (voteData.vote == "nay") {
			this.totalNay += voteData.power;
		}

		// Move leader token
		if (totalVoted > this.highestVote) {
			this.highestVote = totalVoted;
			this.$set(this.players[this.currentLeader], "leader", false);
			this.$set(this.players[voteData.player], "leader", true);
			this.currentLeader = voteData.player;
		}

		//Move leader token
		if (voteData.vote == "passModerator") {
			this.$set(this.players[this.currentModerator], "moderator", false);
			this.$set(this.players[voteData.player], "moderator", true);
			this.currentModerator = voteData.player;
		}

 		var nextPlayer = this.getNext();

		if (nextPlayer == this.currentLeader || nextPlayer == this.currentPlayer) {
			this.voting = false;
		} else {
			this.currentPlayer = nextPlayer;
			this.$set(this.players[nextPlayer], "active", true)
		}
	},
	newVote: function() {
		this.totalAye = 0;
		this.totalNay = 0;
		this.highestVote = 0;
		this.voting = true;
		this.currentPlayer = this.currentLeader;
		for (var i = 0; i < this.players.length;i++) {
			this.$set(this.players[i], "power", 0);
			this.$set(this.players[i], "vote", "");
			this.$set(this.players[i], "active", (i == this.currentLeader));
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
    addPlayer: function() {
		var nextPlayerPosition = this.players.length;
		this.$set(this.players, nextPlayerPosition, {
			position: nextPlayerPosition,
			name: this.inputName,
			power: 0,
			vote: "",
			leader: (nextPlayerPosition  == 0),
			moderator: (nextPlayerPosition == 0),
			active: false,			
		});

		this.inputName = "";
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
