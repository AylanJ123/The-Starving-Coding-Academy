$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent $PSScriptRoot
$pidFile = Join-Path $repoRoot ".site-server.pid"

if (-not (Test-Path $pidFile)) {
    Write-Host "No saved site server PID found."
    exit 0
}

$serverPid = (Get-Content $pidFile -Raw).Trim()
if (-not $serverPid) {
    Remove-Item -LiteralPath $pidFile -Force
    Write-Host "Saved site server PID was empty. Cleaned it up."
    exit 0
}

$server = Get-Process -Id $serverPid -ErrorAction SilentlyContinue
if (-not $server) {
    Remove-Item -LiteralPath $pidFile -Force
    Write-Host "Saved site server was not running anymore. Cleaned it up."
    exit 0
}

Stop-Process -Id $serverPid -Force
Remove-Item -LiteralPath $pidFile -Force

Write-Host "Stopped site server with PID $serverPid."
