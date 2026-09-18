#requires -Version 5.1
<#
.SYNOPSIS
    Crea un nuovo progetto React a partire da questo template.

.DESCRIPTION
    Copia i file del template (escludendo node_modules, dist, .git, package-lock.json)
    in una nuova cartella fratello a questo template. Aggiorna il campo "name" in
    package.json con il nome del progetto.

.PARAMETER Name
    Nome del nuovo progetto (verra creata la cartella ../<Name>/).

.EXAMPLE
    .\bin\new-project.ps1 -Name "react-todo-app"
#>
param(
  [Parameter(Mandatory = $true)]
  [string]$Name
)

$ErrorActionPreference = 'Stop'

$templateRoot = Split-Path -Parent $PSScriptRoot
$templateParent = Split-Path -Parent $templateRoot
$target = Join-Path $templateParent $Name

if (Test-Path -LiteralPath $target) {
  Write-Error "La cartella di destinazione esiste gia: $target"
  exit 1
}

$exclude = @('node_modules', 'dist', '.git', 'package-lock.json', '.DS_Store')

function Test-Excluded {
  param([string]$ItemName)
  foreach ($e in $exclude) { if ($ItemName -eq $e) { return $true } }
  return $false
}

Write-Host "Creazione progetto: $target" -ForegroundColor Cyan
New-Item -ItemType Directory -Path $target -Force | Out-Null

Get-ChildItem -LiteralPath $templateRoot -Force | Where-Object {
  -not (Test-Excluded $_.Name)
} | ForEach-Object {
  $dest = Join-Path $target $_.Name
  if ($_.PSIsContainer) {
    Copy-Item -LiteralPath $_.FullName -Destination $dest -Recurse -Force
  } else {
    Copy-Item -LiteralPath $_.FullName -Destination $dest -Force
  }
}

# Post-cleanup: rimuove bin/ dal nuovo progetto (lo script non serve piu)
$targetBin = Join-Path $target 'bin'
if (Test-Path -LiteralPath $targetBin) {
  Remove-Item -LiteralPath $targetBin -Recurse -Force
}

# Aggiorna package.json con il nuovo nome
$pkgPath = Join-Path $target 'package.json'
$pkg = Get-Content -LiteralPath $pkgPath -Raw | ConvertFrom-Json
$pkg.name = $Name
($pkg | ConvertTo-Json -Depth 10) | Set-Content -LiteralPath $pkgPath

Write-Host ""
Write-Host "Progetto creato in: $target" -ForegroundColor Green
Write-Host ""
Write-Host "Prossimi passi:" -ForegroundColor Yellow
Write-Host "  cd `"$target`""
Write-Host "  npm install"
Write-Host "  npm run dev"
