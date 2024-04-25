# Setup
- Copy `DataTables` to root of probject
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
