package com.lgsurvey.DevGuide.config;

import org.h2.tools.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.sql.SQLException;


@Configuration
public class H2ServerConfig {

  @Bean(destroyMethod = "stop")
  public Server h2TcpServer() throws SQLException {
    // 9092 포트로 외부 접속을 허용하는 TCP 서버 시작
    return Server.createTcpServer("-tcp", "-tcpAllowOthers", "-tcpPort", "9092").start();
  }
}
