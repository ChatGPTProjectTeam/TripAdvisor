package com.tripper.Tripper;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

// application.properties에 DB 정보 설정 안하여 임시적으로 넣음
@SpringBootApplication(exclude={DataSourceAutoConfiguration.class})
public class TripperApplication {

	public static void main(String[] args) {
		SpringApplication.run(TripperApplication.class, args);
	}

}