# Используйте образ Node.js последней версии
FROM node:latest

# Установите рабочий каталог
WORKDIR /usr/src/app

# Создайте символическую ссылку на Bash, если ее нет
RUN if [ ! -e /bin/bash ]; then ln -s /bin/sh /bin/bash; fi

# Копируйте и установите зависимости, используя кэш npm install
COPY package*.json ./
RUN npm install

# Копируйте файлы приложения и конфигурацию TypeORM
COPY . .

# Запустите приложение в режиме разработки после ожидания готовности базы данных
CMD ["npm", "run", "start:dev"]
