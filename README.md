# Tools used
- AssetStudio.net for extracting bundles
- `grep -lr "Whatever"` to find specific things

# Notable Files To Extract
- `localization-assets-shared_assets_all.bundle` Shared Data (ID <-> Localization Mapping)
- `localization-string-tables-english(en)_assets_all.bundle` Locale Data
- `dc45330cf35da75eac71f243c0f8c2fd.bundle` Data Tables (includes enemy params)
  - This can be found by `grep -lr "Excel"` - it may change in patches.

# Setup
- Copy `DataTables` to root of project
- Copy `localization_en` to root of project
- Copy `localization_en_shared` to root of project

These files are gitignored to:

- keep 'proprietary information' from being publicly exposed
- keep the clone speed sensible.

# How it works

The script loads 3 files:
- ./localization_en_shared/CharacterName Shared Data.json
- ./localization_en/MonoBehaviour/CharacterName_en.json
- ./DataTables/EnemyParamTable.json

Enemy param table uses its internal naming, for example `en_0123`, unfortunately the locale table in CharacterName_en uses a different id which is mapped to this naming in the `Shared Data` file.

So to get names of things you'll need to:
- take the stringified version of the name: `"en_0123"` and 
- array.find for that the Shared Data to get the locale id (`m_Id`)
- array.find for the locale id (`m_Id` in the shared file)  and resolve the name `m_Localized`

This should work for all things when generating csv files.
