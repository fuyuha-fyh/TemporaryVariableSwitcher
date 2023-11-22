# TemporaryVariableSwitcher
マップごとに一時変数を切り替えるRPGツクールMV用プラグイン。  
マップ移動時に一時変数が記録されます。  
セーブ時に、記録した一時変数がセーブデータに書き込まれるので、次にロードする時に記録した一時変数を引き継げます。

## Functions
- **clearVariable(mapId)**: 特定のマップの記録を削除します。
- **clearAllVariable()**: すべてのマップの記録を削除します。
- **setVariable(mapId, variableId, variableValue)**: 特定のマップの記録を新しい記録（variableValue）に変更します。
