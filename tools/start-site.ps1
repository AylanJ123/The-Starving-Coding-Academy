param(
    [int]$Port = 8000
)

$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent $PSScriptRoot
$pidFile = Join-Path $repoRoot ".site-server.pid"

if (Test-Path $pidFile) {
    $existingPid = (Get-Content $pidFile -Raw).Trim()
    if ($existingPid -and (Get-Process -Id $existingPid -ErrorAction SilentlyContinue)) {
        Write-Host "Site is already running at http://localhost:$Port/ with PID $existingPid"
        exit 0
    }
}

$pythonCommand = Get-Command python -ErrorAction SilentlyContinue
if ($pythonCommand) {
    $filePath = $pythonCommand.Source
    $arguments = @("-m", "http.server", "$Port")
} else {
    $pythonCommand = Get-Command py -ErrorAction SilentlyContinue
    if (-not $pythonCommand) {
        Write-Error "Could not find Python. Install Python or run another static server from this folder."
        exit 1
    }

    $filePath = $pythonCommand.Source
    $arguments = @("-3", "-m", "http.server", "$Port")
}

$server = Start-Process `
    -FilePath $filePath `
    -ArgumentList $arguments `
    -WorkingDirectory $repoRoot `
    -WindowStyle Hidden `
    -PassThru

Set-Content -Path $pidFile -Value $server.Id

Write-Host "Site started at http://localhost:$Port/"
Write-Host "PID: $($server.Id)"
Write-Host "Stop it with: .\STOP_SITE.bat"
