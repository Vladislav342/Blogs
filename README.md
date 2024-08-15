## Сайт новин
Інформаційний сайт новин, де кожен користувач може зайти на цей сайт і поцікавитись новинами.
Також якщо користувач авторизується, то він отримає змогу редагувати блоги, створювати нові та видаляти непотрібні.

***

## Структура каталогів файлів:
>./src/app/page.tsx - [Головна сторінка сайту, де розміщуються усі статті новин](http://localhost:3000)
>
>./src/app/api/*/route.ts - Серверна частина сайту
>
>./src/app/blogs/edit_blog/page.tsx - [Сторінка сайту для редагування блогу (але якщо тільки користувач авторизований)](http://localhost:3000/edit_blog/[id])
>
>./src/app/blogs/new_blog/page.tsx - [Сторінка сайту для (але якщо тільки користувач авторизований)](http://localhost:3000/new_blog)
>
>./src/app/log_in/page.tsx - [Сторінка сайту щоб залогінитися](http://localhost:3000/log_in)
>
>./src/app/sign_in/page.tsx - [Сторінка сайту щоб авторизуватись](http://localhost:3000/sign_un)
>
>./src/app/[_id]/page.tsx - [Сторінка сайту для відображення однієї конкретної статті. Використовується динамічна вставка айдішника блогу](http://localhost:3000/[_id])
>
>./src/common/utils.ts - Саме в цій папці пишемо функціонал, який ми можемо багаторазово використовувати у різних місцях проекту
>
>./src/components/.tsx - В цій папці ми зберігаємо компоненти, які можемо використовувати багато разів у різних місцях проекту
>
>./src/lib/dbConnect.ts - Підключаємо mongoose для роботи з базою даних MongoDB і пов'язуємо їх за допомогою посилання MONGODB_URI
>
>./src/lib/http.ts - Тут ми зберігаємо наші запити з сайту до сервера
>
>./src/models/ - Тут ми створюємо моделі бази даних
>
>./src/service/ - Тут знаходиться функціонал і команди mongoose для роботи з базою даних 
>
>./src/types/ - Тут ми зберігаємо типи TypeScript
>
>./src/validation/ - Створили Joi валідацію для запитів на стороні сервера
>
>./src/constants.ts - У цьому файлі ми зберігаємо labels
>
>./.prettier.js - Вказуємо правила форматування коду
>
>./.eslintrc.json  - Вказуємо правила перевірки коду
>
>[XML формат блогів / RSS Feed](http://localhost:3000/api/rss)

***

## Встановленні NPM пакети
* [next](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) був встановлен за допомогою [`npm create-next-app`]
* [typescript](https://www.npmjs.com/package/typescript) для контролю типізації
* [bcrypt](https://www.npmjs.com/package/bcrypt) хешуємо пароль, але назад розхешувати вже неможливо
* [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) для генерації веб токена
* [mongoose](https://www.npmjs.com/package/mongoose)Mongoose - це інструмент об'єктного моделювання MongoDB, призначений для роботи в асинхронному середовищі.
* [react](https://www.npmjs.com/package/react) для створення інтерактивних інтерфейсів.
* [react-icons](https://www.npmjs.com/package/react-icons) включає популярні іконки у ваші React-проекти
* [rss](https://www.npmjs.com/package/rss) RSS Feed генератор.
* [joi](https://www.npmjs.com/package/joi) для валідації запитів.
* [tailwindcss](https://www.npmjs.com/package/tailwindcss) CSS framework
* [prettier](https://www.npmjs.com/package/prettier) це форматер коду
* [eslint](https://www.npmjs.com/package/eslint) ESLint статично аналізує ваш код, щоб швидко знаходити проблеми

***

## База даних
[Використовувалася облачна база даних MongoDB](https://cloud.mongodb.com)

***

## Команди

1. Запускає сервер
```sh
	npm run dev 
```

2. Запускає ESlint для перевірки на помилки
```sh
	npm run lint 
```

3. Запускає Prettier для форматування коду
```sh
	npm run prettier 
```
