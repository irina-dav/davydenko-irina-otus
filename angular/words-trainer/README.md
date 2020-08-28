# ДЗ: Приложение для запоминания иностранных слов

В этом приложении пользователь сможет добавлять слова для изучения, проходить тесты для запоминания слов.
Это Single Page Application состоит из 3 страниц:
- Последние добавленные слова (Recently Added).
- Упражнениями (Go).
- Настройки (Settings).
На главном экране, на странице Recently Added пользователь видит список последних добавленных слов, может добавить новое слово в словарь.

На странице упражнений пользователь занимается тестированием своих знаний. Ему показывается слово на одном языке, и он должен написать его перевод на другой язык. Если перевод правильный, слово засчитывается, иначе показываем ошибку. Мы начнем с двух языков - русского и английского, будем расширять возможности приложения по мере написания программы.

На странице настроек пользователь выбирает языки, количество слов в упражнении, отводимое на упражнение время.

Навигация по страницам происходит с помощью ссылок в верхней части страниц, каждой странице соответствует отдельный url.

### Задание

Декомпозировать приложение для запоминания иностранных слов.
Создать структуру и компоненты контейнеры приложения.

### Реализация

1. Создано простое `SPA` с использованием `Angular`.
2. Разработаны основные компоненты согласно заданию.
3. Добавлен минимальный routing для навигации.
4. Для оформления используется UI-framework `Bootstrap`.
5. Список слов пока загружается из файла, настройки не сохраняются. Реализация - по плану в следующем ДЗ.

### Демо
 
https://words-trainer.netlify.app/