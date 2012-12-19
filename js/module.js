$(function(){
	/*
	 * Använd JSON från loopbox för att testa med 
	 */
	Item = Backbone.Model.extend({});

	List = Backbone.Collection.extend({
		url: '/service/getsnapshot.json',
		model: Item
	});

	/** ------------------------------------
	 * List View
	 * -------------------------------------*/ 
	ListView = Backbone.View.extend({
		initialize: function(){
			_.bindAll(this,'render', 'addAll', 'addOne', 'addNewLine');
			this.template = _.template($('#template_row').html());
			this.render();

			this.collection.on('reset', this.addAll);

			this.newColl = new List();

			this.collection.fetch();

			this.noOfColumn = 16;
			this.noOfRows = 12;
			this.rowNo = 1;
			this.rowClass = ".row";
			this.row = this.rowClass + this.rowNo;

		},

		addNewLine: function(r){
			this.currentRow = this.rowClass + r;
			this.nextRow = "<li><ul class='row" + (r + 1) + "'>";

			this.$el.find(this.currentRow).parent().after(this.nextRow);
		},

		addAll: function(){

			for (var i = 1; i < this.noOfRows +1; i++) {

				this.rowNo = i;

				this.newColl.reset(this.collection.first(this.noOfColumn));
				this.newColl.each(this.addOne);

				this.addNewLine(i);
				
				this.newColl.remove(this.collection.first(this.noOfColumn));
				this.collection.remove(this.collection.first(this.noOfColumn));
			};
		},

		addOne: function(model){
			var itemView = new ItemView({
				model: model
			});
			this.row = this.rowClass + this.rowNo;

			this.$el.find(this.row).append(itemView.render().$el);
		},

		render: function(){
			this.$el.html(this.template());
			return this;
		}
	});
	/** ------------------------------------
	 * Row View
	 * -------------------------------------*/ 
	ItemView = Backbone.View.extend({
		tagName: 'li',
		initialize: function(){
			_.bindAll(this, 'render');
			this.template = _.template($('#template_item').html());
		},

		render: function(){
			this.$el.html(this.template({
				model: this.model.toJSON()
			}));
			return this;
		}
	});
});
/*

		rita upp från 1 - 10
		Row -> model=li:3  li:32 2 1 1 12 2 1
		2  21 2 1 1 1 2 21

*/