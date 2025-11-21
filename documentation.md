# Техническая документация CMake Simple Builder

```


const vscode = require('vscode');
const { exec } = require('child_process');


  Активирует расширение при загрузке VS Code
  
   activate:
  вход {vscode.ExtensionContext} context - Контекст расширения для управления жизненным циклом и подписками
  возвращает {void}
  
  пример:
  // Вызывается автоматически VS Code при активации расширения
  activate(context);
  
  описание:
  Функция инициализирует расширение, регистрирует команды и настраивает обработчики.
  Является точкой входа для расширения VS Code.
 
function activate(context) {
    console.log('CMake Simple Builder activated');

    
      Регистрирует и настраивает основную команду плагина
      Команда выполняет полный цикл сборки и тестирования CMake проекта
      
      вход: {vscode.Disposable}
     
    let command = vscode.commands.registerCommand('cmake-simple-builder.buildAndTest', function () {
        
          Проверка наличия открытой рабочей области
          вход: {readonly vscode.WorkspaceFolder[]}
         
        const workspaceFolders = vscode.workspace.workspaceFolders;
        
        if (!workspaceFolders) {
            vscode.window.showErrorMessage('No workspace open');
            return;
        }

        
          Получение пути к рабочей директории
          вход: {string}
         
        const workspacePath = workspaceFolders[0].uri.fsPath;
        
        
          Создание и отображение панели для вывода информации
          вход: {vscode.OutputChannel}
         
        const outputChannel = vscode.window.createOutputChannel('CMake Simple Builder');
        outputChannel.show();

        // Начало процесса сборки
        outputChannel.appendLine('=== Starting CMake Build and Test ===\n');

        
          Этап 1: Конфигурация CMake проекта
          Выполняет команду: cmake -B build
         
        outputChannel.appendLine('1. Executing: cmake -B build');
        
        
          Выполняет команду CMake конфигурации
          принимает: {string} 'cmake -B build' - Команда для конфигурации проекта
          принимает: {Object} options - Опции выполнения команды
          принимает: {string} options.cwd - Рабочая директория
          принимает: {Function} callback - Функция обратного вызова при завершении
         
        exec('cmake -B build', { cwd: workspacePath }, (error, stdout, stderr) => {
            if (error) {
                outputChannel.appendLine(`Error: ${error}`);
                return;
            }
            outputChannel.appendLine('✓ cmake -B build completed\n');

            
              Этап 2: Сборка проекта
              Выполняет команду: cmake --build build
             
            outputChannel.appendLine('2. Executing: cmake --build build');
            
            
              Выполняет команду сборки CMake проекта
              принимает: {string} 'cmake --build build' - Команда для сборки проекта
              принимает: {Object} options - Опции выполнения команды
              принимает: {string} options.cwd - Рабочая директория
              принимает: {Function} callback - Функция обратного вызова при завершении
             
            exec('cmake --build build', { cwd: workspacePath }, (error, stdout, stderr) => {
                if (error) {
                    outputChannel.appendLine(`Error: ${error}`);
                    return;
                }
                outputChannel.appendLine('✓ cmake --build build completed\n');

                
                  Этап 3: Запуск тестов
                  Выполняет команду: ctest -V в директории build
                 
                outputChannel.appendLine('3. Executing: cd build && ctest -V');
                
                
                  Выполняет команду тестирования CTest
                  принимает: {string} 'ctest -V' - Команда для запуска тестов с подробным выводом
                  принимает: {Object} options - Опции выполнения команды
                  принимает: {string} options.cwd - Рабочая директория (папка build)
                  принимает: {Function} callback - Функция обратного вызова при завершении
                 
                exec('ctest -V', { cwd: workspacePath + '/build' }, (error, stdout, stderr) => {
                    if (error) {
                        outputChannel.appendLine(`Error: ${error}`);
                        return;
                    }
                    outputChannel.appendLine('✓ ctest -V completed\n');
                    outputChannel.appendLine('=== All commands completed successfully ===');
                    
                    
                      Показывает информационное сообщение об успешном завершении
                      принимает: {vscode.Disposable}
                     
                    vscode.window.showInformationMessage('CMake build and test completed!');
                });
            });
        });
    });

    
      Регистрация команды для корректного управления памятью
      Добавляет команду в подписки контекста для автоматической очистки
     
    context.subscriptions.push(command);
}


module.exports = {
    activate
};
```
