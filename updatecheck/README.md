## New versioning systematics in smartvisu

Until v2.9 only a 2-digit version number was implemented in smartVISU. To introduce a standard 3-digit versioning
without breaking existing code, the file `version-info.php` has been extended with 3 variables for major, minor and revision. 
After v2.9.1, these variables will be evaluated in smartVISU.

## New update checker

Until v2.9.1 smartVISU retrieved update information by sending the actual local version number to a script on smartvisu.de.
After v2.9.1 smartVISU will read the file version-info.php on github master branch directly in order to check for updates.

## Installing update checker

You can download the new version handling for testing purposes here. To install it, just exchange the existing files - exept README.md - in your
smartVISU installation with the files provided in the `updatecheck` folder. Folder names correspond to those in your installation.  
