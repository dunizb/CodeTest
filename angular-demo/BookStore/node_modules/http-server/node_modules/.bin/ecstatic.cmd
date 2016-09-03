@IF EXIST "%~dp0\node.exe" (
  "%~dp0\node.exe"  "%~dp0\..\ecstatic\lib\ecstatic.js" %*
) ELSE (
  node  "%~dp0\..\ecstatic\lib\ecstatic.js" %*
)