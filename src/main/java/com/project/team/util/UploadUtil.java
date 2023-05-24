package com.project.team.util;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.web.multipart.MultipartFile;

import com.project.team.admin.vo.ImgVO;

public class UploadUtil {
	//static : 전역변수, 객체 생성없이 클래스명.메소드로 호출 가능!
	
	//단일 파일 업로드 메소드
	public static ImgVO uploadFile(MultipartFile img, String path) {
		//imgVO 리턴하기 위해 선언(controller에서 첨부된 파일 정보 사용하기 위함)
		ImgVO imgVO = null;
		
		//첨부 됐으면(true) 파일 업로드 코드 실행.
		if (!img.isEmpty()) {
			imgVO = new ImgVO(); //첨부파일이 있으면 imgVO 객체 생성

			// 원본파일명 받아오기
			String itemImgOriginName = img.getOriginalFilename();

			// 서버에 올라갈(첨부될) 파일명 생성(파일명이 중복되지 않게)
			// UUID : 중복X 랜덤한 문자열을 생성
			String uuid = UUID.randomUUID().toString();

			// 원본파일명이 abc.jpg > 랜덤문자열.jpg의 형식으로 첨부될 파일명을 생성
			// 첨부된 파일의 확장자 추출
			String extension = itemImgOriginName.substring(itemImgOriginName.lastIndexOf(".")); // 마지막 "."문자에서 끝까지

			// 서버에 올릴(첨부될) 파일명
			String itemImgAttachedName = uuid + extension;

			System.out.println("원본파일명 : " + itemImgOriginName);
			System.out.println("첨부될 파일명 : " + itemImgAttachedName);
			
			// 파일 업로드
			try { // 경로\\이미지명.확장자로 나와야 함. \\필요 > 경로 변수 마지막에 \\추가
				File file = new File(path + itemImgAttachedName);
				img.transferTo(file); //실제 이미지 업로드
				
				//imgVO에 이미지 정보 저장
				imgVO.setItemImgOriginName(itemImgOriginName);
				imgVO.setItemImgAttachedName(itemImgAttachedName);
				imgVO.setIsMain("Y"); //메인 이미지 : Y **subImg 넣을 때도 메소드 사용하기 때문에 subImg에서는 N로 바꿔줘야함
				
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return imgVO; //이미지 정보 리턴
	}
	
	//참고
	/*String str = "abcab.jpg";
	str.indexOf("c"); //2
	str.indexOf("a"); //0 찾고자 하는 글자가 몇번째 있는지 찾아줌 문자가 중복이면 가장 처음 것의 위치 알려줌
	str.lastIndexOf("a"); //3 문자 중복 시 가장 마지막 것의 위치
	originFileName.substring(0, 4); //인자가 하나인 경우 인자부터 끝까지 */
	
	
	//다중 파일 업로드 메소드
	public static List<ImgVO> multiFileUpload(MultipartFile[] imgs,String path) {
		//첨부된 파일 정보를 다 담을 수 있는 통
		List<ImgVO> result = new ArrayList<>();
		
			for(MultipartFile img : imgs) {
				ImgVO vo = uploadFile(img, path); //매개변수로 첨부파일 하나 들어올 때 업로드 시켜주는 메소드
					if(vo != null) {
						vo.setIsMain("N");
						result.add(vo); 
					}
			}
		
		return result;
	}

}
