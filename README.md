## ���� �����
������������� ���� �����, �� ����� ���������� ���� ����� �� ��� ���� � ������������ ��������.
����� ���� ���������� ������������, �� �� ������ ����� ���������� �����, ���������� ��� �� �������� ��������.

***

## ��������� �������� �����:
>./src/app/page.tsx - [������� ������� �����, �� ����������� �� ����� �����](http://localhost:3000)
>
>./src/app/api/*/route.ts - �������� ������� �����
>
>./src/app/blogs/edit_blog/page.tsx - [������� ����� ��� ����������� ����� (��� ���� ����� ���������� �������������)](http://localhost:3000/edit_blog/[id])
>
>./src/app/blogs/new_blog/page.tsx - [������� ����� ��� (��� ���� ����� ���������� �������������)](http://localhost:3000/new_blog)
>
>./src/app/log_in/page.tsx - [������� ����� ��� �����������](http://localhost:3000/log_in)
>
>./src/app/sign_in/page.tsx - [������� ����� ��� ��������������](http://localhost:3000/sign_un)
>
>./src/app/[_id]/page.tsx - [������� ����� ��� ����������� ���� ��������� �����. ��������������� �������� ������� �������� �����](http://localhost:3000/[_id])
>
>./src/common/utils.ts - ���� � ��� ����� ������ ����������, ���� �� ������ ������������ ��������������� � ����� ����� �������
>
>./src/components/.tsx - � ��� ����� �� �������� ����������, �� ������ ��������������� ������ ���� � ����� ����� �������
>
>./src/lib/dbConnect.ts - ϳ�������� mongoose ��� ������ � ����� ����� MongoDB � ���'����� �� �� ��������� ��������� MONGODB_URI
>
>./src/lib/http.ts - ��� �� �������� ���� ������ � ����� �� �������
>
>./src/models/ - ��� �� ��������� ����� ���� �����
>
>./src/service/ - ��� ����������� ���������� � ������� mongoose ��� ������ � ����� ����� 
>
>./src/types/ - ��� �� �������� ���� TypeScript
>
>./src/validation/ - �������� Joi �������� ��� ������ �� ������ �������
>
>./src/constants.ts - � ����� ���� �� �������� labels
>
>./.prettier.js - ������� ������� ������������ ����
>
>./.eslintrc.json  - ������� ������� �������� ����
>
>[XML ������ ����� / RSS Feed](http://localhost:3000/api/rss)

***

## ����������� NPM ������
* [next](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) ��� ���������� �� ��������� [`npm create-next-app`]
* [typescript](https://www.npmjs.com/package/typescript) ��� �������� ��������
* [bcrypt](https://www.npmjs.com/package/bcrypt) ������ ������, ��� ����� ����������� ��� ���������
* [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) ��� ��������� ��� ������
* [mongoose](https://www.npmjs.com/package/mongoose)Mongoose - �� ���������� ��'������� ����������� MongoDB, ����������� ��� ������ � ������������ ����������.
* [react](https://www.npmjs.com/package/react) ��� ��������� ������������� ����������.
* [react-icons](https://www.npmjs.com/package/react-icons) ������ �������� ������ � ���� React-�������
* [rss](https://www.npmjs.com/package/rss) RSS Feed ���������.
* [joi](https://www.npmjs.com/package/joi) ��� �������� ������.
* [tailwindcss](https://www.npmjs.com/package/tailwindcss) CSS framework
* [prettier](https://www.npmjs.com/package/prettier) �� �������� ����
* [eslint](https://www.npmjs.com/package/eslint) ESLint �������� ������ ��� ���, ��� ������ ��������� ��������

***

## ���� �����
[����������������� ������� ���� ����� MongoDB](https://cloud.mongodb.com)

***

## �������

1. ������� ������
```sh
	npm run dev 
```

2. ������� ESlint ��� �������� �� �������
```sh
	npm run lint 
```

3. ������� Prettier ��� ������������ ����
```sh
	npm run prettier 
```
