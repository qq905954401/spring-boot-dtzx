package com.inaing.dtdjzx.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.inaing.dtdjzx.model.OptionInfo;

@Mapper
public interface OptionInfoMapper {
    int deleteByPrimaryKey(Long id);

    int insert(OptionInfo record);

    int insertSelective(OptionInfo record);

    OptionInfo selectByPrimaryKey(Long id);
    
    List<OptionInfo> selectBySubjectId(Long id);

    int updateByPrimaryKeySelective(OptionInfo record);

    int updateByPrimaryKey(OptionInfo record);
}