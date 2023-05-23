package com.project.team.util;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;


import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service("mailService")
public class MailService {
	
	//메일 전송해주는 객체 
	@Autowired
	private JavaMailSender javaMailSender;
	
	//html 전송 가능 
	@Autowired
	private SpringTemplateEngine templateEngine;
	
	//단순 문자 메일 보내기 
	public void sendSimpleEmail(MailVO mailVO) {
		//단순 문자 메일을 보낼 수 있는 객체 생성 
		SimpleMailMessage message = new SimpleMailMessage();
		
		message.setSubject(mailVO.getTitle()); //메일 제목 설정 
		//message.setTo(mailVO.getRecipient());//수신자 설정 - 1 (두 개 있는데, 하나는 한명, 나머지는 배열 들어가서 여러명 가능)
		//수신자 설정 - 2 
		//리스트를 배열로 바꾸기 
		message.setTo(mailVO.getRecipientList().toArray(new String[mailVO.getRecipientList().size()])); //setTo의 자료형은 문자열 배열 
		//toArray(new 원하는 자료형)
		//배열은 항상 [] 안에 몇개의 길이인지 정해주기! 
		
		//임시 비밀번호 설정은 컨트롤러에서 이미 작업했음. 그걸 내용으로 받아오기만 하면 됨.
		message.setText(mailVO.getContent()); //메일 본문
		
		javaMailSender.send(message);
	
	}
	
	//HTML 메일 보내기 
	public void sendHTMLEmail() {
		MimeMessage message = javaMailSender.createMimeMessage();
		String password = "111111"; //임시 비밀번호 ( 나중에는 정말 랜덤 비밀번호로 설정해주기 ) 
		
		try {
			message.setSubject("임시 제목");  // 제목 설정 
			message.setText(setContext(password), "UTF-8", "html"); // 내용 설정 ( HTML ) // 111111 => password => 아래의 메소드로 간다. => 내용이 저장됨 //인코딩, html 파일형식 
			message.addRecipients(MimeMessage.RecipientType.TO,""); //(MimeMessage.RecipientType.TO, 수신자 주소) //뒤에오는게 여려명인 경우 addresss[]로 해줘야함 
			javaMailSender.send(message);
			
		} catch (MessagingException e) {
			e.printStackTrace();
			
		}
		
	}
	
	//6자리의 랜덤 비밀번호 생성 
	public String createRandomPw_origin() {
		//문자 0~9 , A~Z 까지 들어있는 배열 
        String[] charSet = new String[]{ //데이터 n개 -> 인덱스 n-1개  
        		"0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
                "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N",
                "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
                "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n",
                "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"
                };
        
        //임시비밀번호 저장할 변수 
        String temporaryPw = "";
        
        //배열 길이 - 1 : 인덱스 구하기 
        //랜덤으로 6글자 빼내기 (charSet.length: 데이터가 들어간 갯수)
        for(int i = 0; i < 6; i++) {
        	   int randIndex = (int)(Math.random() * charSet.length); // 0 <= x < charSet.length 실수리턴 -> 정수로 변환 
        	   temporaryPw += charSet[randIndex];
        }
        
        return temporaryPw;
	}
	
	

	public String createRandomPw() {
	    // 사용 가능한 문자 범위
	    String upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	    String lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";
	    String specialCharacters = "!@#$%^&*()";
	    String numbers = "0123456789";

	    // 임시 비밀번호를 저장할 리스트
	    List<Character> temporaryPw = new ArrayList<>();

	    // 최소 1개씩 포함하여 각각 랜덤 문자 생성
	    Random random = new Random();

	    temporaryPw.add(upperCaseLetters.charAt(random.nextInt(upperCaseLetters.length())));
	    temporaryPw.add(lowerCaseLetters.charAt(random.nextInt(lowerCaseLetters.length())));
	    temporaryPw.add(specialCharacters.charAt(random.nextInt(specialCharacters.length())));
	    temporaryPw.add(numbers.charAt(random.nextInt(numbers.length())));

	    // 나머지 자리 랜덤 문자 생성
	    for (int i = 4; i < 8; i++) {
	        String combinedChars = upperCaseLetters + lowerCaseLetters + specialCharacters + numbers;
	        temporaryPw.add(combinedChars.charAt(random.nextInt(combinedChars.length())));
	    }

	    // 임시 비밀번호를 문자열로 변환하여 반환
	    StringBuilder stringBuilder = new StringBuilder(temporaryPw.size());
	    for (Character character : temporaryPw) {
	        stringBuilder.append(character);
	    }

	    return stringBuilder.toString();
	}

	
	
	
	//HTML을 메일로 전송할 때 그 메일의 내용 세팅 
	public String setContext(String password) {
		Context context = new Context();
		context.setVariable("password", password); //password라는 이름으로 넘어온 매개변수를 html에 있는 password에 데이터를 넣을수 있다. 
		return templateEngine.process("mail", context); //타임리프로 mail.html을 다루겠다는 의미 
		//mail.html 은  templates 패키지 안에 있어서 가능. 다른폴더라면 폴더명도 넣어줘야함 
		//mail.html을 리턴해서 보낼건데, 그안에 password 변수가 있는데, 그 안에 password 데이터를 넣을거고
		//그리고 이걸 내용으로 쓸거다. 
		// 위에가서 내용부분에 이걸 넣어주기 
		
	}
	
	
	
	
	
	
}
