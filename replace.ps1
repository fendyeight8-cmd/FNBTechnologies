$files = Get-ChildItem -Path 'lumiere-frontend\src' -Recurse -File
foreach ($f in $files) {
    $content = Get-Content -Path $f.FullName -Raw
    $original = $content
    $content = $content -replace 'Premium Bento', 'Nam-Nams Bento Choices'
    $content = $content -replace 'premium bento', 'Nam-Nams Bento Choices'
    $content = $content -replace 'PREMIUM BENTO', 'NAM-NAMS BENTO CHOICES'
    $content = $content -replace '/images/bento_corporate.png', '/images/nam_nams_bento.jpg'
    $content = $content -replace '/images/hero3.png', '/images/nam_nams_bento.jpg'
    if ($content -cne $original) {
        Set-Content -Path $f.FullName -Value $content -NoNewline
    }
}
