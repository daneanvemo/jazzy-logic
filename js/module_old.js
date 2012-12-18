$(function(){
	/*
	 * Använd JSON från loopbox för att testa med 
	 */
	Item = Backbone.Model.extend({
		initialize: function(){
			console.log("model init");

		},

		defaults: {
			"xPos:" : "12",
			"yPos" : "33"
		},
		xPos: "89",
		yPos: "77",

		

	});

	List = Backbone.Collection.extend({
		//url: 'http://www.cynapps.se/dev/service/gettabledata.php',
		//url: 'http://localhost/service/json_ex.php',
		//url: 'http://localhost/service/try.json',	
		url: '/service/getsnapshot.json',
		model: Item
	});
	/** ------------------------------------
	 * List View
	 * -------------------------------------*/ 
	ListView = Backbone.View.extend({
		initialize: function(){
			_.bindAll(this,'render', 'addAll', 'addOne');
			this.template = _.template($('#template_list').html());
			this.render();

			this.collection.on('reset', this.addAll);
			this.collection.fetch();
		},
		addAll: function(){
			this.collection.each(this.addOne);
		},
		addOne: function(model){


			var itemView = new ItemView({
				model: model
			});
			this.$el.find('.rows').append(itemView.render().$el);
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
			this.template = _.template($('#template_row').html());
		},
		render: function(){
			this.$el.html(this.template({
				model: this.model.toJSON()
			}));
			return this;

		}
	});
});