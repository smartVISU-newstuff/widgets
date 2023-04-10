<?php

// unzip allowed files form scr archive to dst
function unzip($src, $dst, $allowedfiletypes)
{
    $fileskiplist = [];
    mkdir($dst, recursive: true);
    $zip = new ZipArchive;
    if ($zip->open($src) === true) {

        for ($i = 0; $i < $zip->numFiles; $i++) {
            $fileName = $zip->getNameIndex($i);
            $filePath = $zip->statIndex($i)["name"];

            if ($filePath[strlen($filePath) - 1] == "/") {
                mkdir($dst . "/" . $filePath, recursive: true);
            } else {
                $fileExt = pathinfo($fileName, PATHINFO_EXTENSION);
                if (in_array($fileExt, $allowedfiletypes)) {
                    copy('zip://' . $src . '#' . $fileName, $dst . "/" . $filePath);
                } else
                    $fileskiplist[] = $filePath;
            }
        }
        $zip->close();
    }
    return $fileskiplist;
}

// zip scr directories or files to dest archive, exclude directories or files form exclude list
function zip($sourcelist, $destination, $excludelist = [])
{
    mkdir(pathinfo($destination, PATHINFO_DIRNAME), recursive: true);

    if (file_exists($destination)) {
        unlink($destination);
    }

    $zip = new ZipArchive();
    if (!$zip->open($destination, ZIPARCHIVE::CREATE)) {
        return false;
    }
    foreach ($sourcelist as $source) {
        $source = realpath($source);
        if (is_dir($source) === true) {

            $files = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($source), RecursiveIteratorIterator::SELF_FIRST);

            $zip->addEmptyDir(explode("/", $source)[-1]);
            $source = substr($source, 0, strrpos($source, "/"));

            foreach ($files as $file) {
                // Ignore "." and ".." folders
                if (in_array(substr($file, strrpos($file, '/') + 1), array('.', '..')))
                    continue;

                $skip = false;
                foreach ($excludelist as $exclude) {
                    if (str_starts_with($file, realpath($exclude))) {
                        $skip = true;
                        break;
                    }
                }
                if ($skip)
                    continue;

                $file = realpath($file);
                if (is_dir($file) === true) {
                    $zip->addEmptyDir(str_replace($source . '/', '', $file . '/'));
                } else if (is_file($file) === true) {
                    $zip->addFromString(str_replace($source . '/', '', $file), file_get_contents($file));
                }
            }
        } else if (is_file($source) === true) {
            $skip = false;
            foreach ($excludelist as $exclude) {
                if (str_starts_with($source, realpath($exclude))) {
                    $skip = true;
                    break;
                }
            }
            if (!$skip)
                $zip->addFromString(basename($source), file_get_contents($source));
        }
    }
    return $zip->close();
}

// recursive rm function
function rrm($dir)
{
    if (is_dir($dir)) {
        $objects = scandir($dir);
        foreach ($objects as $object) {
            if ($object != "." && $object != "..") {
                if (is_dir($dir . DIRECTORY_SEPARATOR . $object) && !is_link($dir . "/" . $object))
                    rrm($dir . DIRECTORY_SEPARATOR . $object);
                else
                    unlink($dir . DIRECTORY_SEPARATOR . $object);
            }
        }
        rmdir($dir);
    }
}

// recoursive cp function
function rcp($src, $dst)
{
    $dir = opendir($src);
    mkdir($dst, recursive: true);
    while (false !== ($file = readdir($dir))) {
        if (($file != '.') && ($file != '..')) {
            if (is_dir($src . '/' . $file)) {
                rcp($src . '/' . $file, $dst . '/' . $file);
            } else {
                copy($src . '/' . $file, $dst . '/' . $file);
            }
        }
    }
    closedir($dir);
}

// accept only post requests
if ($_SERVER['REQUEST_METHOD'] == "POST") {
    if (isset($_POST['exportBackup'])) {
        $tempdir = "../temp/backup/";
        $backupfile = $tempdir . "export.zip";
        $backuplist = ["../pages/", "../dropins/", "../config.ini"];
        $backupexcludelist = ["../pages/base/", "../pages/_template/", "../pages/example1.smarthome/",
            "../pages/example2.knxd/", "../pages/example3.graphic/", "../pages/docu/", "../pages/kurzanleitung/"];

        // create zip archive
        zip($backuplist, $backupfile, $backupexcludelist);

        include_once "includes.php";
        $filename = $GLOBALS['config']['title'] . "_" . config_visu . "_v" . config_version_full . "_config_backup_" .
            date("Y-m-d_H-i-s") . ".zip";

        // send file headers
        header("Content-type: application/octet-stream");
        header("Content-Disposition: attachment;filename=" . $filename);
        header("Access-Control-Expose-Headers:Content-Disposition");
        header("Content-Transfer-Encoding: binary");
        header('Pragma: no-cache');
        header('Expires: 0');

        // send the file contents.
        set_time_limit(0);
        ob_clean();
        flush();
        readfile($backupfile);

        // delete temp directory
        rrm($tempdir);


    } else if (isset($_POST['restoreBackup'])) {
        if ($_FILES["restoreBackupFile"]["error"] == 0) {
            $tempdir = "../temp/backup/";
            $unzipdir = $tempdir . "import/";
            $zipfile = $tempdir . "import.zip";

            //check type of uploaded file, if not zip return an error notify
            $mimes = array('application/x-zip-compressed', 'application/zip');
            if (!in_array($_FILES['restoreBackupFile']['type'], $mimes)) {
                header("HTTP/1.0 650 smartVISU Backup Error");
                header('Content-Type: application/json');
                echo json_encode(array('title' => 'Backup', 'text' => 'Wrong file type, only zip allowed.'));
                exit;
            }
            //check size of uploaded file, if larger than 10MB return an error notify
            if ($_FILES["restoreBackupFile"]["size"] > 10 * 1000000) {
                header("HTTP/1.0 650 smartVISU Backup Error");
                header('Content-Type: application/json');
                echo json_encode(array('title' => 'Backup', 'text' => 'File too large. Are you sure its the correct one?'));
                exit;
            }

            // create temp directory
            mkdir($tempdir, recursive: true);
            if (move_uploaded_file($_FILES["restoreBackupFile"]["tmp_name"], $zipfile)) {

                $allowedfiletypes = array("mp3", "wav", "mp4", "jpg", "png", "gif", "doc", "docx", "pdf", "txt", "xsl",
                    "xlsx", "html", "htm", "css", "js", "xml", "sql", "db", "sys", "svg", "csv", "ini", "md", "gitkeep",
                    "gitignore", "json");

                // unzip allowed files form archive to temp
                $fileskiplist = unzip($zipfile, $unzipdir, $allowedfiletypes);

                // delete all directories and files which are going to be replaced by the import
                // This does not work properly directly from php, so it has to be a shell command
                $pagesdirlist = scandir($unzipdir . "pages/");
                $pagesdirstring = "";
                foreach ($pagesdirlist as $dir) {
                    if ($dir == '.' or $dir == '..')
                        continue;
                    $pagesdirstring .= " pages/" . $dir . "/";
                }
                shell_exec('cd ..; rm -r dropins/ config.ini' . $pagesdirstring);

                // copy imported directories and files in correct place
                rcp($unzipdir . "pages/", "../pages/");
                rcp($unzipdir . "dropins/", "../dropins/");
                copy($unzipdir . "config.ini", "../config.ini");

                // clear cache and remove temp directory
                rrm("../temp/pagecache/");
                rrm("../temp/twigcache/");
                rrm($tempdir);

                // run the smartVISU shell script to set permissions.
                //This does not work properly directly from php, so it has to be a shell command.
                shell_exec('cd ..; bash setpermissions;');

                // create the success message for notify, containing the command to change the ownership
                // if files with a forbidden file extension where found, list them in notify
                $user = posix_getpwuid(stat("../")["uid"])["name"];
                $chownCmd = "sudo chown -R " . $user . " " . realpath("../") . "/";
                header('Content-Type: application/json');
                if (count($fileskiplist) == 0) {
                    echo json_encode(array('title' => 'Backup', 'text' => 'Config successfully imported.<br>Please run this terminal command to set the correct ownership of the imported files:<br><br>' . $chownCmd));
                } else {
                    $fileskipstring = "";
                    foreach ($fileskiplist as $fileskip) {
                        $fileskipstring .= $fileskip . "<br>";
                    }
                    echo json_encode(array('title' => 'Backup', 'text' => 'Config successfully imported.<br>Please run this terminal command to set the correct ownership of the imported files:<br><br>' . $chownCmd . '<br><br><br>The following files were <b>not imported</b> due to security risks, please add them manually.<br><br>' . $fileskipstring));
                }
                exit;
            } else {
                // if something went wrong on file save, remove the temp directory and return an error notify
                rrm($tempdir);
                header("HTTP/1.0 650 smartVISU Backup Error");
                header('Content-Type: application/json');
                echo json_encode(array('title' => 'Backup', 'text' => 'File could not be saved on the server.'));
                exit;
            }
        }
        // if something went wrong on file upload return an error notify
        header("HTTP/1.0 650 smartVISU Backup Error");
        header('Content-Type: application/json');
        echo json_encode(array('title' => 'Backup', 'text' => 'Faulty backup file, please retry.'));
        exit;
    }
    // if the comamnd is not backup or restore return an error notify
    header("HTTP/1.0 650 smartVISU Backup Error");
    header('Content-Type: application/json');
    echo json_encode(array('title' => 'Backup', 'text' => 'Unknown command'));
    exit;
}
?>
