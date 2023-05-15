package com.project.team.util;

import java.util.Calendar;

public class DateUtil {
	
	// 오늘 날짜를 문자열로 리턴
	public static String getNowDateToString() {
		Calendar cal = Calendar.getInstance();
		
													// 2023.04.12			Ex)
		int year = cal.get(Calendar.YEAR); 			// 오늘 날짜의 '년' 추출	2023
		int month = cal.get(Calendar.MONTH) + 1; 	// 오늘 날짜의 '월' 추출	4 / 기본값이 -1값이 나와서 +1 해줘야 한다
		int date = cal.get(Calendar.DATE); 			// 오늘 날짜의 '일' 추출	12
		
		return year + "-" + String.format("%02d", month) + "-" + String.format("%02d", date);
	}

	// 오늘 날짜를 문자열로 리턴
	public static String getNowDateToString(String seperator) {
		Calendar cal = Calendar.getInstance();
		
		// 2023.04.12			Ex)
		int year = cal.get(Calendar.YEAR); 			// 오늘 날짜의 '년' 추출	2023
		int month = cal.get(Calendar.MONTH) + 1; 	// 오늘 날짜의 '월' 추출	4 / 기본값이 -1값이 나와서 +1 해줘야 한다
		int date = cal.get(Calendar.DATE); 			// 오늘 날짜의 '일' 추출	12
		
		return year + seperator + String.format("%02d", month) + seperator + String.format("%02d", date);
	}

	// 해당 1일 문자열로 리턴
	public static String getFirstDateOfMonth() {
		
		return getNowDateToString().substring(0, 8) + "01";
	}
	
	public static int getYear() {
		Calendar cal = Calendar.getInstance();
		
		return cal.get(Calendar.YEAR);
		
	}
	
	
	
	
	
	
}

// 싱글톤 패턴의 한 종류
class AAA {
	static AAA a = new AAA();
	
	private AAA() {}
	
	public static AAA getAAA() {
		if(a == null) {
			return new AAA();
		} else {
			return a;
		}
	}
	
}







