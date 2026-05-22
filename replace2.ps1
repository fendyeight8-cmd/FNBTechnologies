$files = Get-ChildItem -Path 'lumiere-frontend\src' -Recurse -File
foreach ($f in $files) {
    $content = Get-Content -Path $f.FullName -Raw
    $original = $content
    $content = $content -replace 'Nam-Nams Bento Choices', 'Assorted Bento'
    $content = $content -replace 'NAM-NAMS BENTO CHOICES', 'ASSORTED BENTO'
    if ($content -cne $original) {
        Set-Content -Path $f.FullName -Value $content -NoNewline
    }
}
