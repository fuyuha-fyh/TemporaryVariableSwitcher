//=============================================================================
// TemporaryVariableSwitcher.js
//=============================================================================

/*:
 * @plugindesc マップごとに一時変数を切り替えるやつ
 * @author 冬派
 *
 * @param tempVariablesIds
 * @text 一時変数として扱う変数番号
 * @desc 一時変数として扱う変数の番号を指定します
 * @type string[]
 * @default ["1", "2", "3"]
 *
 */

$tvsData = {};
(function ($) {
	$.params = PluginManager.parameters("TemporaryVariableSwitcher") || {};
	$.tempVariablesIds = JSON.parse($.params["tempVariablesIds"]) || [];
	$.mapData = $.mapData || {};

	const _Game_Player_performTransfer = Game_Player.prototype.performTransfer;
	Game_Player.prototype.performTransfer = function () {
		$.tempVariablesIds.forEach((num) => {
			let id = parseInt(num);
			if (!isNaN(id)) {
				let variableValue = $gameVariables.value(id);
				if (variableValue) {
					if (!$.mapData[$gameMap.mapId()]) $.mapData[$gameMap.mapId()] = {};
					$.mapData[$gameMap.mapId()][id] = variableValue;
				}
			}
		});

		let newMapData = $.mapData[this._newMapId];
		$.tempVariablesIds.forEach((num) => {
			let id = parseInt(num);
			if (!isNaN(id)) {
				if (newMapData) {
					if (newMapData[id]) $gameVariables.setValue(id, newMapData[id]);
					else $gameVariables.setValue(id, 0);
				} else {
					$gameVariables.setValue(id, 0);
				}
			}
		});

		_Game_Player_performTransfer.call(this);
	};

	const _DataManager_makeSaveContents = DataManager.makeSaveContents;
	DataManager.makeSaveContents = function () {
		let contents = _DataManager_makeSaveContents.call(this);
		contents.tvsMapData = $.mapData || {};
		return contents;
	};

	const _DataManager_extractSaveContents = DataManager.extractSaveContents;
	DataManager.extractSaveContents = function (contents) {
		_DataManager_extractSaveContents.call(this, contents);
		$.mapData = contents.tvsMapData || {};
	};

	$.clearVariable = function (mapId) {
		let mapData = $.mapData[mapId];
		if (mapData) $.mapData[mapId] = {};
	};

	$.clearAllVariable = function () {
		$.mapData = {};
	};

	$.setVariable = function (mapId, variableId, variableValue) {
		let mapData = $.mapData[mapId];
		if (mapData) {
			variableId = parseInt(variableId);
			if (!isNaN(variableId) && mapData[variableId])
				mapData[variableId] = variableValue;
		}
	};
})($tvsData);
