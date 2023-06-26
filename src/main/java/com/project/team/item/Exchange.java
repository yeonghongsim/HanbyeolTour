package com.project.team.item;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Exchange {

    private static final String url = "https://www.kita.net/cmmrcInfo/ehgtGnrlzInfo/rltmEhgt.do";

    public Map<String,List<String>> getExchange() throws IOException {

        Document doc = Jsoup.connect(url).get();

        Elements ele = doc.select("#contents > div.boardArea > div.tableSt.st4.alc > table > tbody > tr");

        //객체생성
        Map<String,List<String>> result = new HashMap<>();

        StringBuilder sb = new StringBuilder();
        for(Element element : ele){
            String area = "";

            for (Element uTag : element.select("a")) {
                if(!uTag.text().equals("바로가기")){

                    area = uTag.text();

                }
            }

            Elements td = element.select("td");

            List<String> list = new ArrayList<>();

            String[] aaa = area.split(" ");

            list.add(aaa[0]);
            list.add(td.get(0).text());
            result.put(aaa[1], list);

        }
        return result;
    }
}
