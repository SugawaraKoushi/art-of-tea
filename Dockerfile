# Используем официальный образ PHP с Apache
FROM php:8.2-apache

# Устанавливаем зависимости
RUN apt-get update && apt-get install -y \
    libzip-dev \
    zip \
    unzip \
    && docker-php-ext-install pdo pdo_mysql zip

# Включаем mod_rewrite для Apache
RUN a2enmod rewrite

# Копируем файлы проекта в контейнер
COPY . /var/www/html/

# Устанавливаем рабочую директорию
WORKDIR /var/www/html

# Устанавливаем права
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html

# Порт, который будет слушать Apache
EXPOSE 80