<template>
	<div class="alert" v-bind:class="{
		'alert-secondary': vote == '',
		'alert-danger' : vote == 'nay',
		'alert-primary' : vote == 'aye',
		'alert-light' : vote == 'passPower',
		'alert-light' : vote == 'passModerator',
	}" role="alert">
		<div class="container">
		  <div class="row">
			<div class="col">
			  <h1>{{ leader ? "X" : "" }}</h1>
			</div>
			<div class="col">
			  <h1>{{ displayName }}</h1>
			</div>
			<div class="col">
			  <h1><span :hidden="active == true">{{ displayVote }}</span></h1>
			  <button type="button" class="btn btn-primary" data-toggle="modal" :data-target="this.makeIdRef('voteModal')" :hidden="(vote != '') || (active == false)">Vote</button>
			  <button type="button" class="btn btn-primary" data-toggle="modal" :data-target="this.makeIdRef('voteModal')" :hidden="(vote == '') || (active == false)">Add Power</button>
			</div>
			<div class="col">
			  <h1>{{ power > 0 ? power : ""  }}</h1>
			</div>
			<div class="col">
			  <h1>{{ moderator ? "X" : ""}}</h1>
			</div>
		  </div>
		</div>
	<div class="modal fade" :id="this.makeId('voteModal')" ref="voteModal" tabindex="-1" role="dialog" aria-labelledby="voteModalLabel" aria-hidden="true">
	  <div class="modal-dialog" role="document">
		<div class="modal-content">
		  <div class="modal-header">
			<h5 class="modal-title" id="voteModalLabel">Vote</h5>
			<button type="button" class="close" data-dismiss="modal" aria-label="Close">
			  <span aria-hidden="true">&times;</span>
			</button>
		  </div>
		  <div class="modal-body">
			<form>
			  <fieldset class="form-group" :hidden="vote != ''">
				<div class="row">
				  <div class="col-sm-10">
					<div class="form-check">
					  <input class="form-check-input" type="radio" name="gridRadios" :id="this.makeId('gridRadios1')" v-model="inputVote" value="aye">
					  <label class="form-check-label" :for="this.makeId('gridRadios1')">
						Aye
					  </label>
					</div>
					<div class="form-check">
					  <input class="form-check-input" type="radio" name="gridRadios" :id="this.makeId('gridRadios2')" v-model="inputVote" value="nay">
					  <label class="form-check-label" :for="this.makeId('gridRadios2')">
						Nye
					  </label>
					</div>
					<div class="form-check">
					  <input class="form-check-input" type="radio" name="gridRadios" :id="this.makeId('gridRadios3')" v-model="inputVote" value="passPower">
					  <label class="form-check-label" :for="this.makeId('gridRadios3')">
						Pass and Gather Power
					  </label>
					</div>
					<div class="form-check">
					  <input class="form-check-input" type="radio" name="gridRadios" :id="this.makeId('gridRadios4')" v-model="inputVote" value="passModerator">
					  <label class="form-check-label" :for="this.makeId('gridRadios4')">
						Pass and Become Moderator
					  </label>
					</div>
				  </div>
				</div>
			  </fieldset>			
			  <div class="form-group row" :hidden="inputVote == 'passPower' || inputVote == 'passModerator'">
				<label for="inputName" class="col-sm-2 col-form-label">Power</label>
				<div class="col-sm-10" hid>
				  <input type="text" class="form-control" :id="this.makeId('powerInput')" v-model="inputPower" placeholder="Power">
				</div>
			  </div>
			</form>
		  </div>
		  <div class="modal-footer">
			<button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
			<button type="button" class="btn btn-primary" v-on:click="submitVote">Vote</button>
		  </div>
		</div>
	  </div>
	</div>

	</div>
</template>

<script>
import { v4 as uuid } from 'uuid';
import $ from 'jquery'

export default {
  name: 'kdVoteTracker',
  props: {
	  playerIndex: Number,
	  leader: Boolean,
      name: String,
	  vote: String,
	  power: Number,
	  moderator: Boolean,
	  active: Boolean,
  },
  data: function() {
	return {
		uuid:  uuid(),
		inputVote: this.vote,
		inputPower: "",
		
	}
  },
  computed: {
	displayName: function() {
		return this.name + (this.active ? " is up" : "");
	},
	displayVote: function() {
		var voteDisplayMap = {
			"": "",
			"aye": "Aye",
			"nay": "Nay",
			"passPower": "Pass and Gather Power",
			"passModerator": "Pass and Become Moderator",
		}

		return voteDisplayMap[this.vote];
	}
  },
  methods: {
	makeIdRef: function(id) {
		return "#" + this.makeId(id);
	},
	makeId: function(id) {
		return id + this.uuid;
	},
	submitVote: function() {
		this.$emit('voted', {
			player: this.playerIndex,
			vote: this.inputVote,
			power: parseInt(this.inputPower)
		});
		$(this.makeIdRef("voteModal")).modal('hide');
	}
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
