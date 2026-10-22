# Genera las imagenes Open Graph (public/og/*.png), el favicon.ico y las
# copias publicas de las capturas de proyecto (public/images/projects/*.png).
#
# Requiere PowerShell en Windows (usa System.Drawing).
# Ejecutar desde la raiz del proyecto: .\scripts\generate-og-images.ps1

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent $PSScriptRoot
$ogDir = Join-Path $root 'public\og'
$projDir = Join-Path $root 'public\images\projects'
New-Item -ItemType Directory -Force -Path $ogDir | Out-Null
New-Item -ItemType Directory -Force -Path $projDir | Out-Null

function New-OgImage([string]$file, [string]$title) {
	$w = 1200; $h = 630
	$bmp = New-Object System.Drawing.Bitmap($w, $h)
	$g = [System.Drawing.Graphics]::FromImage($bmp)
	$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
	$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

	$rect = New-Object System.Drawing.Rectangle(0, 0, $w, $h)
	$bgBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
		$rect,
		[System.Drawing.Color]::FromArgb(255, 13, 14, 23),
		[System.Drawing.Color]::FromArgb(255, 49, 46, 129),
		45.0)
	$g.FillRectangle($bgBrush, $rect)

	$decFont = New-Object System.Drawing.Font('Consolas', 130, [System.Drawing.FontStyle]::Bold)
	$decBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(30, 165, 180, 252))
	$g.DrawString('</>', $decFont, $decBrush, 850.0, 230.0)

	$badgeBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 79, 70, 229))
	$g.FillRectangle($badgeBrush, 72, 68, 64, 64)
	$badgeFont = New-Object System.Drawing.Font('Consolas', 26, [System.Drawing.FontStyle]::Bold)
	$sf = New-Object System.Drawing.StringFormat
	$sf.Alignment = [System.Drawing.StringAlignment]::Center
	$sf.LineAlignment = [System.Drawing.StringAlignment]::Center
	$badgeRectF = New-Object System.Drawing.RectangleF(72, 68, 64, 64)
	$g.DrawString('SG', $badgeFont, [System.Drawing.Brushes]::White, $badgeRectF, $sf)

	$nameFont = New-Object System.Drawing.Font('Segoe UI', 34, [System.Drawing.FontStyle]::Bold)
	$g.DrawString('Santiago Greco', $nameFont, [System.Drawing.Brushes]::White, 72.0, 170.0)

	$titleFont = New-Object System.Drawing.Font('Segoe UI', 46, [System.Drawing.FontStyle]::Bold)
	$maxWidth = 940.0
	$words = $title -split ' '
	$lines = New-Object System.Collections.ArrayList
	$current = ''
	foreach ($word in $words) {
		$test = if ($current) { "$current $word" } else { $word }
		$size = $g.MeasureString($test, $titleFont)
		if ($size.Width -le $maxWidth) {
			$current = $test
		} else {
			[void]$lines.Add($current)
			$current = $word
		}
	}
	if ($current) { [void]$lines.Add($current) }
	if ($lines.Count -gt 2) {
		$joined = ($lines[0..($lines.Count - 2)] -join ' ')
		$last = $lines[$lines.Count - 1]
		$lines.Clear()
		[void]$lines.Add($joined)
		[void]$lines.Add($last)
	}
	$y = 310.0
	foreach ($line in $lines) {
		$g.DrawString($line, $titleFont, [System.Drawing.Brushes]::White, 72.0, $y)
		$y += 78.0
	}

	$domFont = New-Object System.Drawing.Font('Consolas', 22)
	$domBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 165, 180, 252))
	$g.DrawString('grecodev.vercel.app', $domFont, $domBrush, 72.0, 540.0)

	$outPath = Join-Path $ogDir $file
	$bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)

	$decFont.Dispose(); $decBrush.Dispose(); $badgeBrush.Dispose(); $badgeFont.Dispose()
	$nameFont.Dispose(); $titleFont.Dispose(); $domFont.Dispose(); $domBrush.Dispose()
	$bgBrush.Dispose(); $sf.Dispose(); $g.Dispose(); $bmp.Dispose()
}

$images = @(
	@('home-es.png', 'Desarrollador de software - TypeScript - Big Data e IA'),
	@('home-en.png', 'Software developer - TypeScript - Big Data & AI'),
	@('projects-es.png', 'Proyectos'),
	@('projects-en.png', 'Projects'),
	@('about-es.png', 'Sobre mi'),
	@('about-en.png', 'About'),
	@('stack-es.png', 'Tecnologias'),
	@('stack-en.png', 'Stack'),
	@('contact-es.png', 'Contacto'),
	@('contact-en.png', 'Contact'),
	@('default-es.png', 'Santiago Greco'),
	@('default-en.png', 'Santiago Greco')
)
foreach ($img in $images) {
	New-OgImage $img[0] $img[1]
}

# favicon.ico (64x64)
$icoBmp = New-Object System.Drawing.Bitmap(64, 64)
$gi = [System.Drawing.Graphics]::FromImage($icoBmp)
$gi.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$path = New-Object System.Drawing.Drawing2D.GraphicsPath
$r = 14
$d = $r * 2
$path.AddArc(0, 0, $d, $d, 180, 90)
$path.AddArc(64 - $d, 0, $d, $d, 270, 90)
$path.AddArc(64 - $d, 64 - $d, $d, $d, 0, 90)
$path.AddArc(0, 64 - $d, $d, $d, 90, 90)
$path.CloseFigure()
$indigo = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 79, 70, 229))
$gi.FillPath($indigo, $path)
$icoFont = New-Object System.Drawing.Font('Consolas', 24, [System.Drawing.FontStyle]::Bold)
$sf2 = New-Object System.Drawing.StringFormat
$sf2.Alignment = [System.Drawing.StringAlignment]::Center
$sf2.LineAlignment = [System.Drawing.StringAlignment]::Center
$gi.DrawString('SG', $icoFont, [System.Drawing.Brushes]::White, (New-Object System.Drawing.RectangleF(0, 2, 64, 64)), $sf2)
$hIcon = $icoBmp.GetHicon()
$icon = [System.Drawing.Icon]::FromHandle($hIcon)
$fsIco = [System.IO.File]::Create((Join-Path $root 'public\favicon.ico'))
$icon.Save($fsIco)
$fsIco.Close()
$gi.Dispose(); $icoBmp.Dispose(); $icon.Dispose(); $indigo.Dispose(); $icoFont.Dispose(); $sf2.Dispose(); $path.Dispose()

# copias publicas de capturas (og:image con URL estable)
$src = Join-Path $root 'src\assets\images\projects'
Copy-Item (Join-Path $src 'umbrachat.png') (Join-Path $projDir 'umbrachat.png') -Force
Copy-Item (Join-Path $src 'knowmeet.png') (Join-Path $projDir 'knowmeet.png') -Force
Copy-Item (Join-Path $src 'k2.png') (Join-Path $projDir 'k2-studio.png') -Force

Write-Output 'Assets generados: public/og/*.png, public/favicon.ico, public/images/projects/*.png'
