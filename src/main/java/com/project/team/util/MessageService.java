package com.project.team.util;

import java.util.HashMap;
import java.util.List;

import org.json.simple.JSONObject;
import org.springframework.stereotype.Service;

import net.nurigo.java_sdk.api.Message;
import net.nurigo.java_sdk.exceptions.CoolsmsException;

@Service("messageService")
public class MessageService {

	public List<Object> sendMessage(List<Object> sendSmsInfo) throws CoolsmsException {
		
		
		String api_key = "NCSIVMVHMVUMBAO1";
		String api_secret = "KWJLTZ04XXGQQWWBRUBU4F6F7YOEHKA7";
		
		Message coolsms = new Message(api_key, api_secret);
		
		HashMap<String, String> params = new HashMap<String,String>();
		
		params.put("to", "01045441661"); // 수신전화번호 (직접 입력해도된다. String 형태)
		params.put("from", "01090964193");
		params.put("type", "SMS"); // 문자 타입
		params.put("text", "[한별투어] ㅇㅇㅇ님 구매하신 여행 상품 예약이 확정되었습니다."); // 입력할 내용
		params.put("app_version", "JAVA SDK v2.2");
		
		try {
			JSONObject obj = (JSONObject) coolsms.send(params);
			System.out.println(obj.toString());
		} catch (CoolsmsException e) {
			System.out.println(e.getMessage());
			System.out.println(e.getCode());
		}
		
		coolsms.send(params);
		
		return sendSmsInfo;
		
	}
}
