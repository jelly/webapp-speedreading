Ext.namespace('Zarafa.plugins.speedreading');

/**
 *
 * @class Zarafa.plugins.speedreading.Speedreading
 * @extends Zarafa.core.Plugin
 * 
 */
Zarafa.plugins.speedreading.Speedreading = Ext.extend(Zarafa.core.Plugin, {
	/**
	 * Constructor
	 * @protected
	 */
	constructor : function(config) {
		config = config || {};
		
		Zarafa.plugins.speedreading.Speedreading.superclass.constructor.call(this, config);
	},

	initPlugin : function()
	{
		this.registerInsertionPoint('previewpanel.toolbar.right', this.showSpeedReadingFromPreviewButton, this);

		Zarafa.plugins.speedreading.Speedreading.superclass.initPlugin.apply(this, arguments);
	},

	/**
	 *
	 * @return {Ext.Button} Button instance
	 */
	showSpeedReadingFromPreviewButton : function()
	{
		return {
			xtype : 'button',
			tooltip : _('Spreed reading'),
			overflowText : _('Speed reading'),
			iconCls : '',
			handler : this.showSpeedReading,
			scope : this,
			plugins : ['zarafa.recordcomponentupdaterplugin'],
			update : function(record, contentReset) {
				this.record = record;
			}
		};
	},

	/**
	 *
	 * @param {Ext.Button} btn The button which was clicked
	 */
	showSpeedReading : function(btn)
	{
		record = btn.record;

		var myForm = new Ext.Window({
			layout : 'form',
			modal: true,
			width: 300,
			height: 200,
			title: 'Speed readig',
			items: [{
				xtype: 'displayfield',
				id: 'spray_result',
				ref: 'speedreader',
				displayField : '<div id="spray_result">&nbsp;</div>',
				scope: this,
			},{
				xtype: 'button',
				text:  _('Read'),
				handler: function(button) {
					var body = record.get('body');
					var sprayReader = new SprayReader('#spray_result');
					sprayReader.setWpm(200);
					sprayReader.setInput(body);
					sprayReader.start();
				},
				scope: this
			}]
		});
		myForm.show();

		// Opemwindnmw
		// Draw start/stop button
		// setWPM
		//
		//var '<div id="spray_result">&nbsp;</div>';

	}
});

Zarafa.onReady(function() {
	container.registerPlugin(new Zarafa.core.PluginMetaData({
		name : 'speedreading',
		displayName : _('Speed-reading Plugin'),
		pluginConstructor : Zarafa.plugins.speedreading.Speedreading
	}));
});
