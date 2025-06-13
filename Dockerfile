FROM ubuntu:latest

RUN apt-get update && apt-get install -y \
    apache2 \
    python3 \
    python3-pip \
    python3-venv \
    libapache2-mod-wsgi-py3

COPY . /var/www/html/
WORKDIR /var/www/html/

RUN python3 -m venv /var/www/html/venv
ENV PATH="/var/www/html/venv/bin:$PATH"


RUN pip install --no-cache-dir -r requirements.txt


RUN a2enmod wsgi
RUN a2enmod proxy
RUN a2enmod proxy_http


COPY apache-conf/000-default.conf /etc/apache2/sites-available/000-default.conf

EXPOSE 80

CMD ["/usr/sbin/apache2ctl", "-D", "FOREGROUND"]