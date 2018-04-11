package com.inaing.dtdjzx.model;

import java.util.Date;

public class SubjectInfo {
    private Long id;

    private String roundid;

    private String roundonlyid;

    private String chapterid;

    private String subjecttitle;

    private Integer subjecttype;

    private Integer status;

    private String answer;

    private Integer totalright;

    private Integer totalwrong;

    private Integer difficultylevel;

    private Date createtime;

    private Integer examflag;

    private Long subjectid;
    
    private Long orderid;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRoundid() {
        return roundid;
    }

    public void setRoundid(String roundid) {
        this.roundid = roundid == null ? null : roundid.trim();
    }

    public String getRoundonlyid() {
        return roundonlyid;
    }

    public void setRoundonlyid(String roundonlyid) {
        this.roundonlyid = roundonlyid == null ? null : roundonlyid.trim();
    }

    public String getChapterid() {
        return chapterid;
    }

    public void setChapterid(String chapterid) {
        this.chapterid = chapterid == null ? null : chapterid.trim();
    }

    public String getSubjecttitle() {
        return subjecttitle;
    }

    public void setSubjecttitle(String subjecttitle) {
        this.subjecttitle = subjecttitle == null ? null : subjecttitle.trim();
    }

    public Integer getSubjecttype() {
        return subjecttype;
    }

    public void setSubjecttype(Integer subjecttype) {
        this.subjecttype = subjecttype;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer == null ? null : answer.trim();
    }

    public Integer getTotalright() {
        return totalright;
    }

    public void setTotalright(Integer totalright) {
        this.totalright = totalright;
    }

    public Integer getTotalwrong() {
        return totalwrong;
    }

    public void setTotalwrong(Integer totalwrong) {
        this.totalwrong = totalwrong;
    }

    public Integer getDifficultylevel() {
        return difficultylevel;
    }

    public void setDifficultylevel(Integer difficultylevel) {
        this.difficultylevel = difficultylevel;
    }

    public Date getCreatetime() {
        return createtime;
    }

    public void setCreatetime(Date createtime) {
        this.createtime = createtime;
    }

    public Integer getExamflag() {
        return examflag;
    }

    public void setExamflag(Integer examflag) {
        this.examflag = examflag;
    }

    public Long getSubjectid() {
        return subjectid;
    }

    public void setSubjectid(Long subjectid) {
        this.subjectid = subjectid;
    }

	public Long getOrderid() {
		return orderid;
	}

	public void setOrderid(Long orderid) {
		this.orderid = orderid;
	}
    
}