FROM adoptopenjdk/openjdk11:latest
ARG JAR_FILE=target/app.jar
ADD ${JAR_FILE} app.jar
RUN mvn -f pom.xml clean package
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app.jar"]