Einschreibesystem
================

Install for development
-----------------------

1) Load from git
```bash
git clone https://github.com/swp-unikat/Einschreibesystem.git
cd Einschreibesystem
vagrant up
```

2) connect to vm
```bash
vagrant ssh
```

3) create User
```bash
cd /var/www/
php app/console fos:user:create
```

Install for production
-----------------------
1) Clone Repository and remove Vagrant files
```bash
git clone https://github.com/swp-unikat/Einschreibesystem.git
cd Einschreibesystem
rm Vagrantfile`
rm install.sh
rm apache.conf
```
2) Create a database

3) Configure JWT

```bash
cd Einschreibesystem
mkdir -p app/var/jwt
openssl genrsa -out app/var/jwt/private.pem -aes256 4096
openssl rsa -pubout -in app/var/jwt/private.pem -out app/var/jwt/public.pem
```
4) Install
```bash
php composer install
```
5) Load default data
```bash
php app/console doctrine:fixtures:load
```

6) Create first admin
```bash
php app/console fos:user:create
```

Developer Documentation
------------------------
You will find our developer documentation [here](https://github.com/swp-unikat/Einschreibesystem/wiki).

Licence
------------------------

Copyright (c) 2016 Valentin Schaefer, Andreas Ifland, Leon Bergmann (l.bergmann@sky-lab.de), Ahmet Durak, Marco Hanisch,
Martin Griebel, Mohammad Ahmed Jaafar Hamdar, Stefan Heringklee

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy,
modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
