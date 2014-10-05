Ext.namespace('Zarafa.plugins.speedreading.dialogs');

/**
 * @class Zarafa.plugins.speedreading.dialogs.SpeedReadingContentPanel
 * @extends Zarafa.core.ui.ContentPanel
 *
 * The content panel which asks the user for his passphrase and verifies if it's correct.
 * @xtype smime.passphrasewindow
 */
Zarafa.plugins.speedreading.dialogs.SpeedReadingContentPanel = Ext.extend(Zarafa.core.ui.ContentPanel, {
	/**
	 * cfg {Ext.Record} record the email record
	 */
	record : undefined,

	/**
	 * cfg {Object} sprayReader object
	 */
	sprayReader: undefined,

	/**
	 * @constructor
	 * @param config Configuration structure
	 */
	constructor : function(config) {
		config = config || {};
//
		Ext.applyIf(config, {
			layout : 'form',
			modal: true,
			width: 300,
			height: 300,
			title : _('Speed Reading Window'),
			xtype: 'speedreading.speedreadingwindow',
			// TODO: implement real speedreading field
			items: [{
				xtype: 'displayfield',
				id: 'spray_result',
				ref: 'speedreader',
				displayField : '<div id="spray_result">&nbsp;</div>',
				scope: this,
			 	style: {
			          'font-size' : '32px!important'
			        },
				labelStyle: {
				  'font-size' : '32px!important'
				}
			},{
				xtype: 'combo',
				name: 'Words per minute',
				ref: 'wpm',
				store: [100, 200, 300, 400, 500],
				//lazyInit: false,
				//autoSelect : true,
				//forceSelection: true,
				editable: false
			},{
				xtype: 'button',
				text:  _('Start'),
				handler: this.startSpeedReading,
				scope: this
			},{
				xtype: 'button',
				text:  _('Stop'),
				handler: this.stopSpeedReading,
				scope: this
			}]
		});
		Zarafa.plugins.speedreading.dialogs.SpeedReadingContentPanel.superclass.constructor.call(this, config);
	},

	/**
	 *
	 * @param {Ext.button} button to start the sprayReader
	 */
	startSpeedReading : function(button) {
		var body = record.get('body');
		this.sprayReader = new SprayReader('#spray_result');
		this.sprayReader.setWpm(this.wpm.getValue());
		this.sprayReader.setInput(body);
		this.sprayReader.start();
	},

	/**
	 *
	 * @param {Ext.button} button to start the sprayReader
	 */
	stopSpeedReading : function(button) {
		this.sprayReader.stop();
	}
});

Ext.reg('speedreading.window', Zarafa.plugins.speedreading.dialogs.SpeedReadingContentPanel);
