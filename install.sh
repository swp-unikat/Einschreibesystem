#!/usr/bin/env bash

# change working directory
cd /var/www/

echo "--- Updating apt ---"
add-apt-repository ppa:ondrej/php -y > /var/www/vmbuild.log 2>&1
apt-get -q update >> /var/www/vmbuild.log 2>&1

echo "--- Installing software ---"
apt-get install -y nano wget python-software-properties htop npm git unzip >> /var/www/vmbuild.log 2>&1
ln -s /usr/bin/nodejs /usr/bin/node
# PHP7
apt-get install -y language-pack-en-base >> /var/www/vmbuild.log  2>&1
apt-get install -y php7.0-fpm php7.0-cli php7.0-common php7.0-json php7.0-opcache php7.0-mysql php7.0-phpdbg php7.0-gd php7.0-imap php7.0-ldap php7.0-pgsql php7.0-pspell php7.0-recode php7.0-snmp php7.0-tidy php7.0-dev php7.0-intl php7.0-gd php7.0-curl php7.0-zip snmp-mibs-downloader --force-yes >> /var/www/vmbuild.log  2>&1
# Apache
apt-get install -y apache2 apache2-mpm-worker >> /var/www/vmbuild.log 2>&1


#composer
echo "--- Installing composer ---"
php -r "eval('?>'.file_get_contents('https://getcomposer.org/installer'));" >> /var/www/vmbuild.log  2>&1
mv -f composer.phar /usr/local/bin/composer

#grunt
echo "--- Installing node packages ---"
npm install --quiet -g grunt-cli >> /var/www/vmbuild.log  2>&1
npm install --quiet -g karma-cli >> /var/www/vmbuild.log  2>&1
npm install --quiet -g bower >> /var/www/vmbuild.log  2>&1

#NPM Install
npm install --quiet --no-bin-links >> /var/www/vmbuild.log  2>&1

#Bower Install
bower install --quiet --allow-root >> /var/www/vmbuild.log 2>&1

#Apache
echo "--- Setting up apache and php ---"
echo "ServerName localhost" >> /etc/apache2/httpd.conf

# php fpm & apache config
cp /var/www/apache.conf /etc/apache2/sites-available/000-default.conf
a2enmod proxy_fcgi >> /var/www/vmbuild.log
a2enmod rewrite >> /var/www/vmbuild.log
sed -i "s/listen = \/run\/php\/php7.0-fpm.sock/listen = 127.0.0.1:9000/" /etc/php/7.0/fpm/pool.d/www.conf

# mysql
echo "--- Setting up mysql ---"
debconf-set-selections <<< 'mysql-server mysql-server/root_password password root'
debconf-set-selections <<< 'mysql-server mysql-server/root_password_again password root'
apt-get -y install mysql-server >> /var/www/vmbuild.log 2>&1
sed -i "s/^bind-address/#bind-address/" /etc/mysql/my.cnf
mysql -u root -proot -e "GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'root' WITH GRANT OPTION; FLUSH PRIVILEGES;" 2>&1

# File Setup
rm -rf html

# JWT
echo "--- Setting up JWT ---"
mkdir -p app/var/jwt
openssl genrsa -passout pass:unikat -out app/var/jwt/private.pem -aes256 4096 >> /var/www/vmbuild.log 2>&1
openssl rsa -passin pass:unikat -pubout -in app/var/jwt/private.pem -out app/var/jwt/public.pem >> /var/www/vmbuild.log 2>&1

#composer
echo "--- Installing composer packages ---"
composer install >> /var/www/vmbuild.log 2>&1

echo "--- Application setup ---"
#Doctrine
php app/console doctrine:database:create >> /var/www/vmbuild.log  2>&1
php app/console doctrine:schema:update --force >> /var/www/vmbuild.log  2>&1
php app/console doctrine:fixtures:load >> /var/www/vmbuild.log  2>&1
php app/console cache:clear --env=prod >> /var/www/vmbuild.log  2>&1

#restarts
echo "--- Restarting services ---"
service apache2 restart >> /var/www/vmbuild.log  2>&1
service mysql restart >> /var/www/vmbuild.log  2>&1
service php7.0-fpm restart >> /var/www/vmbuild.log  2>&1

echo "--- DONE ---"
