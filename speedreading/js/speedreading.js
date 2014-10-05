Ext.namespace('Zarafa.plugins.speedreading');

/**
 * Speed-reading plugin which speed reads emails in the WebApp
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

		Zarafa.core.data.SharedComponentType.addProperty('plugin.speedreading.dialog.speedreadingwindow');

		Zarafa.plugins.speedreading.Speedreading.superclass.initPlugin.apply(this, arguments);
	},

	/**
	 * Button in the previewpanel
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
	 * Click handler for speed-reading button, opens speed-reading window
	 *
	 * @param {Ext.Button} btn The button which was clicked
	 */
	showSpeedReading : function(btn)
	{
		record = btn.record;
		Zarafa.core.data.UIFactory.openLayerComponent(Zarafa.core.data.SharedComponentType['plugin.speedreading.dialog.speedreadingwindow'], btn, {
			manager: Ext.WindowMgr,
			record: record
		});
	},

	/**
	 * Bid for the type of shared component and the given record.
	 * This will bid on plugin.speedreading.dialog.speedreadingwindow
	 *
	 * @param {Zarafa.core.data.SharedComponentType} type Type of component a context can bid for.
	 * @param {Ext.data.Record} record Optionally passed record.
	 * @return {Number} The bid for the shared component
	 * @private
	 */
	bidSharedComponent: function (type, record) {
		var bid = -1;

		switch (type) {
			case Zarafa.core.data.SharedComponentType['plugin.speedreading.dialog.speedreadingwindow']:
				bid = 1;
				break;
		}
		return bid;
	},

	/**
	 * Will return the reference to the shared component that is requested
	 *
	 * @param {Zarafa.core.data.SharedComponentType} type Type of component a context can bid for.
	 * @param {Ext.data.Record} record Optionally passed record.
	 * @return {Ext.Component} Component
	 * @private
	 */
	getSharedComponent: function (type, record) {
		var component;

		switch (type) {
			case Zarafa.core.data.SharedComponentType['plugin.speedreading.dialog.speedreadingwindow']:
				component = Zarafa.plugins.speedreading.dialogs.SpeedReadingContentPanel;
				break;
		}

		return component;
	}
});

Zarafa.onReady(function() {
	container.registerPlugin(new Zarafa.core.PluginMetaData({
		name : 'speedreading',
		displayName : _('Speed-reading Plugin'),
		pluginConstructor : Zarafa.plugins.speedreading.Speedreading
	}));
});
