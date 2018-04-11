package com.inaing.dtdjzx.model;

public class OptionInfo {
    private Long id;

    private Long subjectid;

    private String optiontitle;

    private Integer isright;

    private String optiontype;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getSubjectid() {
        return subjectid;
    }

    public void setSubjectid(Long subjectid) {
        this.subjectid = subjectid;
    }

    public String getOptiontitle() {
        return optiontitle;
    }

    public void setOptiontitle(String optiontitle) {
        this.optiontitle = optiontitle == null ? null : optiontitle.trim();
    }

    public Integer getIsright() {
        return isright;
    }

    public void setIsright(Integer isright) {
        this.isright = isright;
    }

    public String getOptiontype() {
        return optiontype;
    }

    public void setOptiontype(String optiontype) {
        this.optiontype = optiontype == null ? null : optiontype.trim();
    }
}