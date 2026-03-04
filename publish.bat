@echo off
chcp 65001 > nul
echo ============================================
echo   AI All — Публикация на GitHub
echo ============================================
echo.

cd /d "C:\Users\usere\ai\ai-all"

where git >nul 2>&1
if errorlevel 1 (
    echo [ОШИБКА] Git не найден в PATH!
    echo Попробуем найти Git вручную...
    if exist "C:\Program Files\Git\cmd\git.exe" (
        set "PATH=%PATH%;C:\Program Files\Git\cmd"
        echo Найден: C:\Program Files\Git\cmd\git.exe
    ) else if exist "C:\Program Files (x86)\Git\cmd\git.exe" (
        set "PATH=%PATH%;C:\Program Files (x86)\Git\cmd"
        echo Найден: C:\Program Files (x86)\Git\cmd\git.exe
    ) else (
        echo Git не найден. Убедись что Git установлен.
        echo Скачай с: https://git-scm.com/download/win
        pause
        exit /b 1
    )
)

echo [OK] Git найден: 
git --version
echo.

REM Инициализируем репо если нет
if not exist ".git" (
    echo [1/5] Инициализация git репозитория...
    git init
    git branch -M main
) else (
    echo [1/5] Git репо уже существует
)

REM Настройка автора если не настроен
git config user.name >nul 2>&1
if errorlevel 1 (
    echo Введи своё имя для git:
    set /p GIT_NAME="Имя: "
    git config --global user.name "%GIT_NAME%"
    echo Введи свой email:
    set /p GIT_EMAIL="Email: "
    git config --global user.email "%GIT_EMAIL%"
)

echo [2/5] Добавление файлов...
git add .
echo.

echo [3/5] Создание коммита...
git commit -m "🚀 Initial commit — AI All PWA"
echo.

echo ============================================
echo Теперь нужно указать адрес твоего GitHub репо.
echo.
echo 1. Зайди на https://github.com/new
echo 2. Создай репо с именем: ai-all
echo 3. Скопируй HTTPS ссылку (пример):
echo    https://github.com/ТВОЙ_ЛОГИН/ai-all.git
echo ============================================
echo.
set /p REPO_URL="Вставь ссылку на репо: "

echo [4/5] Подключение к GitHub...
git remote remove origin >nul 2>&1
git remote add origin "%REPO_URL%"
echo.

echo [5/5] Отправка на GitHub...
git push -u origin main
echo.

if errorlevel 0 (
    echo ============================================
    echo SUCCESS! Проект опубликован на GitHub!
    echo.
    echo Теперь включи GitHub Pages:
    echo 1. Открой репо на GitHub
    echo 2. Settings - Pages
    echo 3. Source: Deploy from branch - main - / root
    echo 4. Save
    echo.
    echo Через 2 минуты сайт будет доступен!
    echo ============================================
) else (
    echo [ОШИБКА] Не удалось отправить. 
    echo Возможно нужна авторизация — введи логин/пароль GitHub.
)

pause
