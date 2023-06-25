package com.project.team.review;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.team.AirLine.AirLineController;
import com.project.team.admin.service.AdminService;
import com.project.team.review.vo.ReveiwVO;
import jakarta.annotation.Resource;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.jsoup.Jsoup;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/review")
public class ReviewController {
    @Resource(name = "adminService")
    private AdminService adminService;
    @Autowired
    private ObjectMapper mapper;

    @PostMapping("/reviewAJAX")
    @ResponseBody
    public void review(ReveiwVO reveiwVO) throws JsonProcessingException {
        //List<String> list = adminService.getReviewList();

        //테스트데이터생성
        List<String> list = new ArrayList<>();
        for(int i = 0; i < 3; i++){

            list.add("최악이였다");
            list.add("기분좋은 여행이였다");
            list.add("가성비가 안 좋다");
            list.add("가성비가 최고");
            list.add("재미없다");
            list.add("환상적인 여행");
            list.add("가이드가 친절하고 좋은 여행이였따");
        }
        //json변환
        ObjectMapper mapper = new ObjectMapper();
        mapper.writeValueAsString(list);
        //get요청할 url 세팅
        String url = "http://localhost:5001/predictTest?sentences=" + mapper.writeValueAsString(list);

        RestTemplate restTemplate = new RestTemplate();
        //url로 요청후 응답결과 reponse에 저장
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
        //내용을 string 으로 받기
        String jsonData = response.getBody();
        //응답데이터 가공
        DataObject dataObject = mapper.readValue(jsonData, DataObject.class);

        // 데이터를 활용하여 자바 코드 작성
        List<Integer> label =  dataObject.getGoodorbad().getLabel();
        List<String> percent =  dataObject.getGoodorbad().getPercent();

        int posCnt = 0;
        int nagCnt = 0;
        double totalPosPercent = 0.00;
        double totalNagPercent = 0.00;

        for(int i = 0; i < label.size(); i++){

            if ((label.get(i)) == 1) {
                posCnt += 1;
                totalPosPercent += Double.parseDouble(percent.get(i).split("%")[0]);
            }
            else {
                nagCnt += 1;
                totalNagPercent += Double.parseDouble(percent.get(i).split("%")[0]);
            }
        }

        double posResult = (((double) posCnt / (posCnt + nagCnt)) * 100);
        double nagResult = ((double) nagCnt / (posCnt + nagCnt)) * 100;
        //데이터세팅
        reveiwVO.setPosPercent(String.valueOf(posResult));
        reveiwVO.setNegPercent(String.valueOf(nagResult));
        reveiwVO.setPosWord(dataObject.getWord().getPos_words().toString().replace("{", "").replace("}",""));
        reveiwVO.setNegWord(dataObject.getWord().getNeg_words().toString().replace("{", "").replace("}",""));
        reveiwVO.setMaxLenght(dataObject.getWord().getReview_length_max());
        reveiwVO.setAvgLenght(String.valueOf(dataObject.getWord().getReview_length_avg()));

        adminService.setReviewData(reveiwVO);
    }


}

@Getter
@Setter
@ToString
class DataObject {
    @JsonProperty
    private GoodOrBad goodorbad;
    @JsonProperty
    private WordObject word;

    // Getter, Setter, 생성자
}
@Getter
@Setter
@ToString
class GoodOrBad {
    @JsonProperty("document")
    private List<String> document;
    @JsonProperty("label")
    private List<Integer> label;
    @JsonProperty("percent")
    private List<String> percent;

    // Getter, Setter, 생성자
}
@Getter
@Setter
@ToString
class WordObject {
    @JsonProperty("pos_words")
    private Map<String, Integer> pos_words;
    @JsonProperty("neg_words")
    private Map<String, Integer> neg_words;
    @JsonProperty("word_length")
    private int word_length;
    @JsonProperty("unique_words")
    private List<Integer> unique_words;
    @JsonProperty("unique_words_size")
    private double unique_words_size;
    @JsonProperty("unique_words_show")
    private double unique_words_show;
    @JsonProperty("review_length_max")
    private int review_length_max;
    @JsonProperty("review_length_avg")
    private double review_length_avg;

    // Getter, Setter, 생성자
}
