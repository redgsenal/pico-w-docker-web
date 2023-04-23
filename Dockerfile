FROM ubuntu/apache2:latest

ARG DEBIAN_FRONTEND=noninteractive
RUN apt-get update &&\
	apt-get install -y --no-install-recommends vim &&\
	apt-get install -y --no-install-recommends nano &&\
	apt-get install -y --no-install-recommends openjdk-18-jdk ca-certificates-java &&\
    apt-get install -y --no-install-recommends ant &&\
	apt-get install -y --no-install-recommends git-all

RUN curl -sL https://deb.nodesource.com/setup_18.x | bash - &&\
    apt-get update && \
    apt-get install -y nodejs && \
	apt-get install -y npm

RUN	rm -rf /var/lib/apt/lists/* && \
    apt clean

RUN mkdir -p /home/projects

RUN ln -sf /usr/share/zoneinfo/Asia/Singapore /etc/localtime

COPY /projects/web_apps /var/www/html

WORKDIR /home/projects

# Expose Port for the Application 
EXPOSE 80 443 8000

CMD ["/usr/sbin/apachectl", "-D", "FOREGROUND"]