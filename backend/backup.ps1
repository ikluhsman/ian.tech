$date = Get-Date -Format "yyyyddMM"
$dest = "C:\Users\ik\src\_backup\ian.tech\backend\$date"
if (!(Test-Path -PathType container $dest)) {
    New-Item -ItemType Directory -Path $dest
}
Copy-Item "./.env" -Destination $dest -Confirm
Copy-Item "./.tmp" -Destination $dest -Recurse -Confirm
Copy-Item "./config" -Destination $dest -Recurse -Confirm
