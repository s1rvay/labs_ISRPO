// CMake Simple Builder - VS Code Extension
// Автоматическая сборка и тестирование CMake проектов

const vscode = require('vscode');
const { exec } = require('child_process');

// Активирует расширение при загрузке VS Code

function activate(context) {
    console.log('CMake Simple Builder activated');

    // Регистрирует и настраивает основную команду плагина
    // Команда выполняет полный цикл сборки и тестирования CMake проекта

    let command = vscode.commands.registerCommand('cmake-simple-builder.buildAndTest', function () {
        // Проверка наличия открытой рабочей области
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders) {
            vscode.window.showErrorMessage('No workspace open');
            return;
        }

        // Получение пути к рабочей директории
        const workspacePath = workspaceFolders[0].uri.fsPath;
        
        // Создание и отображение панели для вывода информации
        const outputChannel = vscode.window.createOutputChannel('CMake Simple Builder');
        outputChannel.show();

        // Начало процесса сборки
        outputChannel.appendLine('=== Starting CMake Build and Test ===\n');

        // Этап 1: Конфигурация CMake проекта
        outputChannel.appendLine('1. Executing: cmake -B build');
        exec('cmake -B build', { cwd: workspacePath }, (error, stdout, stderr) => {
            if (error) {
                outputChannel.appendLine(`Error: ${error}`);
                return;
            }
            outputChannel.appendLine('✓ cmake -B build completed\n');

            // Этап 2: Сборка проекта
            outputChannel.appendLine('2. Executing: cmake --build build');
            exec('cmake --build build', { cwd: workspacePath }, (error, stdout, stderr) => {
                if (error) {
                    outputChannel.appendLine(`Error: ${error}`);
                    return;
                }
                outputChannel.appendLine('✓ cmake --build build completed\n');

                // Этап 3: Запуск тестов
                outputChannel.appendLine('3. Executing: cd build && ctest -V');
                exec('ctest -V', { cwd: workspacePath + '/build' }, (error, stdout, stderr) => {
                    if (error) {
                        outputChannel.appendLine(`Error: ${error}`);
                        return;
                    }
                    outputChannel.appendLine('✓ ctest -V completed\n');
                    outputChannel.appendLine('=== All commands completed successfully ===');
                    vscode.window.showInformationMessage('CMake build and test completed!');
                });
            });
        });
    });

    // Регистрация команды для корректного управления памятью
    context.subscriptions.push(command);
}

// Экспорт функций для VS Code
module.exports = {
    activate,
};
