``` bash
git clone https://github.com/swp-unikat/Einschreibesystem.git
vagrant up
vagrant ssh
cd /var/www/

mkdir -p app/var/jwt
openssl genrsa -out app/var/jwt/private.pem -aes256 4096
openssl rsa -pubout -in app/var/jwt/private.pem -out app/var/jwt/public.pem

php composer.phar install

```
