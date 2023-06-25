package com.project.team.review.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ReveiwVO {

    private String reviewCode;
    private String posPercent;
    private String nagPercent;
    private String posWord;
    private String nagWord;
    private int maxLenght;
    private String avgLenght;
    private String regDate;
}
