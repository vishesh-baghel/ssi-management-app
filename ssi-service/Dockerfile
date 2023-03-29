FROM openjdk:11
ADD ./target/ssi-service-0.0.1-SNAPSHOT.jar /usr/src/ssi-service-0.0.1-SNAPSHOT.jar
WORKDIR usr/src
ENTRYPOINT ["java","-jar", "ssi-service-0.0.1-SNAPSHOT.jar"]