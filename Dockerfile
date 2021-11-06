FROM openjdk:8
COPY ./target/store-0.0.1-SNAPSHOT.jar store-0.0.1-SNAPSHOT.jar
CMD ["java","-jar","store-0.0.1-SNAPSHOT.jar"]