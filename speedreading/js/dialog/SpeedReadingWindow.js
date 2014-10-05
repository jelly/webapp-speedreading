Ext.namespace('Zarafa.plugins.squirt.dialogs');

/**
 * @class Zarafa.plugins.squirt.dialogs.SpeedReadingWindow
 * @extends Zarafa.core.ui.ContentPanel
 *
 * The content panel which asks the user for his passphrase and verifies if it's correct.
 * @xtype smime.passphrasewindow
 */
Zarafa.plugins.squirt.dialogs.SpeedReadingWindow = Ext.extend(Zarafa.core.ui.ContentPanel, {
	/**
	 * cfg {Ext.Record} record the email record
	 */
	record : undefined,

	/**
	 * @constructor
	 * @param config Configuration structure
	 */
	constructor : function(config) {
		config = config || {};

		this.record = config.record;

		Ext.applyIf(config, {
			layout : 'form',
			modal: true,
			width: 300,
			height: 300,
			title : _('Speed Reading Window'),
			xtype: 'squirt.speedreadingwindow',
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
		Zarafa.plugins.squirt.dialogs.SpeedReadingWindow.superclass.constructor.call(this, config);
	},
	
	/**
	 *
	 * @param {Ext.button} button submit button of the form
	 */
	startSpeedReading : function(button) {
	}
});

