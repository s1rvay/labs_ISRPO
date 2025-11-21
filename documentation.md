# Техническая документация CMake Simple Builder

```

function activate(context):
        вход {vscode.ExtensionContext} context - Контекст расширения для управления жизненным циклом и подписками
        возвращает {void}
  
  описание:
        Функция инициализирует расширение, регистрирует команды и настраивает обработчики.
        Является точкой входа для расширения VS Code.


vscode.workspace.workspaceFolders:
          Проверка наличия открытой рабочей области
          вход: {readonly vscode.WorkspaceFolder[]}
         


workspaceFolders[0].uri.fsPath:
          Получение пути к рабочей директории
          вход: {string}
       
vscode.window.createOutputChannel('CMake Simple Builder'):
          Создание и отображение панели для вывода информации
          вход: {vscode.OutputChannel}

         
        
 exec('cmake -B build', { cwd: workspacePath }, (error, stdout, stderr)}:
          Выполняет команду CMake конфигурации
          принимает: {string} 'cmake -B build' - Команда для конфигурации проекта
          принимает: {Object} options - Опции выполнения команды
          принимает: {string} options.cwd - Рабочая директория
          принимает: {Function} callback - Функция обратного вызова при завершении
             
            
exec('cmake --build build', { cwd: workspacePath }, (error, stdout, stderr)}:
              Выполняет команду: cmake --build build
              принимает: {string} 'cmake --build build' - Команда для сборки проекта
              принимает: {Object} options - Опции выполнения команды
              принимает: {string} options.cwd - Рабочая директория
              принимает: {Function} callback - Функция обратного вызова при завершении

                
 exec('ctest -V', { cwd: workspacePath + '/build' }, (error, stdout, stderr):
                  Выполняет команду: ctest -V в директории build
                  принимает: {string} 'ctest -V' - Команда для запуска тестов с подробным выводом
                  принимает: {Object} options - Опции выполнения команды
                  принимает: {string} options.cwd - Рабочая директория (папка build)
                  принимает: {Function} callback - Функция обратного вызова при завершении
                    
vscode.window.showInformationMessage('CMake build and test completed!'):
                      Показывает информационное сообщение об успешном завершении
                      принимает: {vscode.Disposable}

```
