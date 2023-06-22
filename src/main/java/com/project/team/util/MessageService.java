package com.project.team.util;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.json.simple.JSONObject;
import org.springframework.stereotype.Service;

import net.nurigo.java_sdk.api.Message;
import net.nurigo.java_sdk.exceptions.CoolsmsException;
import net.nurigo.sdk.message.exception.NurigoMessageNotReceivedException;
import net.nurigo.sdk.message.response.MultipleDetailMessageSentResponse;

@Service("messageService")
public class MessageService {

	/*public MultipleDetailMessageSentResponse sendMany() {
	
	 * ArrayList<Message> messageList = new ArrayList<>();
	 * 
	 * for (int i = 0; i < 3; i++) { Message message = new Message(); // 발신번호 및
	 * 수신번호는 반드시 01012345678 형태로 입력되어야 합니다. message.setFrom("발신번호 입력");
	 * message.setTo("수신번호 입력");
	 * message.setText("한글 45자, 영자 90자 이하 입력되면 자동으로 SMS타입의 메시지가 추가됩니다." + i);
	 * 
	 * // 메시지 건건 마다 사용자가 원하는 커스텀 값(특정 주문/결제 건의 ID를 넣는등)을 map 형태로 기입하여 전송 후 확인해볼 수
	 * 있습니다! HashMap<String, String> map = new HashMap<>();
	 * 
	 * map.put("키 입력", "값 입력"); message.setCustomFields(map);
	 * 
	 * messageList.add(message); }
	 * 
	 * try { // send 메소드로 단일 Message 객체를 넣어도 동작합니다! // 세 번째 파라미터인 showMessageList 값을
	 * true로 설정할 경우 MultipleDetailMessageSentResponse에서 MessageList를 리턴하게 됩니다!
	 * MultipleDetailMessageSentResponse response =
	 * this.messageService.send(messageList, false, true);
	 * 
	 * // 중복 수신번호를 허용하고 싶으실 경우 위 코드 대신 아래코드로 대체해 사용해보세요!
	 * //MultipleDetailMessageSentResponse response =
	 * this.messageService.send(messageList, true);
	 * 
	 * System.out.println(response);
	 * 
	 * return response; } catch (NurigoMessageNotReceivedException exception) {
	 * System.out.println(exception.getFailedMessageList());
	 * System.out.println(exception.getMessage()); } catch (Exception exception) {
	 * System.out.println(exception.getMessage()); } return null; }
	 */

	public List<String> sendMessage(List<String> memDTellList, List<String> memNameList) throws CoolsmsException {

		// memDTellslist 하나의 문자열로 바꾸기
		StringBuilder memDTellString = new StringBuilder();
		for (int i = 0; i < memDTellList.size(); i++) {

			memDTellString.append(memDTellList.get(i));
			if (i != memDTellList.size() - 1) {
				memDTellString.append(", ");
			}
		}

		String memDTellStringResult = memDTellString.toString();

		String api_key = "NCSIVMVHMVUMBAO1";
		String api_secret = "KWJLTZ04XXGQQWWBRUBU4F6F7YOEHKA7";

		Message coolsms = new Message(api_key, api_secret);

		HashMap<String, String> params = new HashMap<String, String>();

		params.put("to", memDTellStringResult); // 수신전화번호 (직접 입력해도된다. String 형태)
		params.put("from", "01090964193");
		params.put("type", "SMS"); // 문자 타입
		params.put("text", "[한별투어] 구매하신 여행 상품이 예약 확정되었습니다."); // 입력할 내용
		params.put("app_version", "JAVA SDK v2.2");

		try {
			JSONObject obj = (JSONObject) coolsms.send(params);
			System.out.println(obj.toString());
		} catch (CoolsmsException e) {
			System.out.println(e.getMessage());
			System.out.println(e.getCode());
		}

		coolsms.send(params);

		return memDTellList;
	}
}