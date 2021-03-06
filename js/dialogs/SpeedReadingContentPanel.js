Ext.namespace('Zarafa.plugins.speedreading.dialogs');

/**
 * @class Zarafa.plugins.speedreading.dialogs.SpeedReadingContentPanel
 * @extends Zarafa.core.ui.ContentPanel
 *
 * The content panel which asks the user for his passphrase and verifies if it's correct.
 * @xtype smime.passphrasewindow
 */
Zarafa.plugins.speedreading.dialogs.SpeedReadingContentPanel = Ext.extend(Ext.Panel, {
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

		Ext.applyIf(config, {
			modal: true,
			width: 600,
			height: 200,
			layout: {
				type: 'vbox',
				align: 'stretch'
			},
			border: false,
			bodyStyle: 'padding: 5px; background-color: inherit;',
			xtype: 'speedreading.speedreadingwindow',
			items: [{
				xtype: 'box',
				autoEl : {
				html: '<div id="spray_container"><div id="guide_top">――――――――――<span id="notch">ф</span>―――――――――――</div><div id="spray_result">&nbsp;</div><div id="guide_bottom">――――――――――――――――――――――</div></div>'
				}
			}],
			buttons: [{
				xtype: 'combo',
				name: 'Words per minute',
				ref: '../wpm',
				store: [100, 200, 300, 400, 500],
				autoSelect: true,
				triggerAction: 'all',
				buttonAlign:'left',
				mode: 'local',
				width: 100,
				editable: false,
				value: 100 

			},{
				xtype: 'button',
				text:  _('Start'),
				handler: this.startSpeedReading,
				width: 100,
				buttonAlign:'left',
				scope: this
			},{
				xtype: 'button',
				text:  _('Stop'),
				handler: this.stopSpeedReading,
				width: 100,
				buttonAlign:'left',
				scope: this
			}]
		});
		Zarafa.plugins.speedreading.dialogs.SpeedReadingContentPanel.superclass.constructor.call(this, config);
	},

	/**
	 * Button which starts the spray-reader
	 *
	 * @param {Ext.button} button to start the spray-reader
	 */
	startSpeedReading : function(button) {
		var body = record.get('body');
		this.sprayReader = new SprayReader('#spray_result');
		this.sprayReader.setWpm(this.wpm.getValue());
		this.sprayReader.setInput(body);
		this.sprayReader.start();
	},

	/**
	 * Button which stops the spray-reader
	 *
	 * @param {Ext.button} button to stop the spray-reader
	 */
	stopSpeedReading : function(button) {
		this.sprayReader.stop();
	}
});

Ext.reg('speedreading.window', Zarafa.plugins.speedreading.dialogs.SpeedReadingContentPanel);
