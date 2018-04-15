package com.inaing.dtdjzx.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.inaing.dtdjzx.model.SubjectInfo;

@Mapper
public interface SubjectInfoMapper {
    int deleteByPrimaryKey(Long id);

    Long insert(SubjectInfo record);

    int insertSelective(SubjectInfo record);

    SubjectInfo selectByPrimaryKey(Long id);
    
    SubjectInfo selectBySubjectTitle(String title);
    
    List<SubjectInfo> selectBySubjectTitles(String title);

    int updateByPrimaryKeySelective(SubjectInfo record);

    int updateByPrimaryKey(SubjectInfo record);
    
    List<SubjectInfo> selectByPartTitle(String partTitle);

	SubjectInfo getUsersSubject();
    
}