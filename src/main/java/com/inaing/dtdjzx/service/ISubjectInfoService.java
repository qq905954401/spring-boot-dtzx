package com.inaing.dtdjzx.service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.inaing.dtdjzx.model.SubjectInfo;

public interface ISubjectInfoService {
	
	Optional<SubjectInfo> selectById(Long id);
	
	void saveSubjectInfo(Map<String,Object> params);
	
	Boolean checkIsSubjectExist(String subjectTitle);
	
	Map<String, Object> getTitleAndAnswerByTitle(String subjectTitle);
	
	List<String> getTitleByPartTitle(String partTitle);

	Map<String, Object> getUsersSubject();

	void changeSubjectInfo(Map<String, Object> params);

}
