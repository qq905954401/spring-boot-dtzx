package com.inaing.dtdjzx.service.impl;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.inaing.dtdjzx.dao.OptionInfoMapper;
import com.inaing.dtdjzx.dao.SubjectInfoMapper;
import com.inaing.dtdjzx.model.OptionInfo;
import com.inaing.dtdjzx.model.SubjectInfo;
import com.inaing.dtdjzx.service.ISubjectInfoService;
import com.inaing.dtdjzx.util.ObjectUtils;

@Service
public class SubjectInfoServiceImpl implements ISubjectInfoService{

	@Autowired
	private SubjectInfoMapper subjectInfoMapper;
	@Autowired
	private OptionInfoMapper optionInfoMapper;
	
	@Override
	public Optional<SubjectInfo> selectById(Long id) {
		return Optional.ofNullable(subjectInfoMapper.selectByPrimaryKey(id));
	}

	@Override
	public void saveSubjectInfo(Map<String, Object> params) {	
		//如果没有该题目，则储存
		if(!ObjectUtils.isEmpty(params.get("subjectTitle"))) {
			String subjectTitle = params.get("subjectTitle").toString();
			subjectTitle = subjectTitle.replaceAll("\r|\n", "");
			if(!checkIsSubjectExist(subjectTitle)) {
				SubjectInfo subjectInfo = new SubjectInfo();
				if(!ObjectUtils.isEmpty(params.get("answer"))) {
					subjectInfo.setAnswer((String) params.get("answer"));
				}
				if(!ObjectUtils.isEmpty(params.get("chapterId"))) {
					subjectInfo.setChapterid((String) params.get("chapterId"));
				}
				if(!ObjectUtils.isEmpty(params.get("createTime"))) {
					SimpleDateFormat format = new SimpleDateFormat("yyyy-M-dd HH:mm:ss"); 
					try {
						subjectInfo.setCreatetime(format.parse(params.get("createTime").toString()));
					} catch (Exception e) {
						// TODO: handle exception
					}
				}
				if(!ObjectUtils.isEmpty(params.get("difficultyLevel"))) {
					subjectInfo.setDifficultylevel(Integer.parseInt((String) params.get("difficultyLevel")));
				}
				if(!ObjectUtils.isEmpty(params.get("examFlag"))) {
					subjectInfo.setExamflag(Integer.parseInt((String) params.get("examFlag")));
				}
				if(!ObjectUtils.isEmpty(params.get("orderId"))) {
					subjectInfo.setOrderid(Long.parseLong((String) params.get("orderId")));
				}
				if(!ObjectUtils.isEmpty(params.get("roundId"))) {
					subjectInfo.setRoundid((String) params.get("roundId"));
				}
				if(!ObjectUtils.isEmpty(params.get("roundOnlyId"))) {
					subjectInfo.setRoundonlyid((String) params.get("roundOnlyId"));
				}
				if(!ObjectUtils.isEmpty(params.get("status"))) {
					subjectInfo.setStatus(Integer.parseInt((String) params.get("status")));
				}
				if(!ObjectUtils.isEmpty(params.get("subjectId"))) {
					subjectInfo.setSubjectid(Long.parseLong((String) params.get("subjectId")));
				}
				if(!ObjectUtils.isEmpty(subjectTitle)) {
					subjectInfo.setSubjecttitle(subjectTitle);
				}
				if(!ObjectUtils.isEmpty(params.get("subjectType"))) {
					subjectInfo.setSubjecttype(Integer.parseInt((String) params.get("subjectType")));
				}
				if(!ObjectUtils.isEmpty(params.get("totalRight"))) {
					subjectInfo.setTotalright(Integer.parseInt((String) params.get("totalRight")));
				}
				if(!ObjectUtils.isEmpty(params.get("totalWrong"))) {
					subjectInfo.setTotalwrong(Integer.parseInt((String) params.get("totalWrong")));
				}
				subjectInfoMapper.insert(subjectInfo);
				Long id = subjectInfo.getId();
				if(!ObjectUtils.isEmpty(params.get("optionLength"))) {
					int optionLength = Integer.parseInt(params.get("optionLength").toString());
					int i;
					String optionTitle;
					String isRight;
					String optionType;
					for(i = 0; i < optionLength; i++)
					{
						optionTitle = "optionInfoList[";
						optionTitle += i;
						optionTitle += "][optionTitle]";
						isRight = "optionInfoList[";
						isRight += i;
						isRight += "][isRight]";
						optionType = "optionInfoList[";
						optionType += i;
						optionType += "][optionType]";
						OptionInfo optionInfo = new OptionInfo();
						optionInfo.setSubjectid(id);
						if(!ObjectUtils.isEmpty(params.get(optionTitle))) {
							optionInfo.setOptiontitle((String) params.get(optionTitle));
						}
						if(!ObjectUtils.isEmpty(params.get(optionType))) {
							optionInfo.setOptiontype((String) params.get(optionType));
						}
						if(!ObjectUtils.isEmpty(params.get(isRight))) {
							optionInfo.setIsright(Integer.parseInt((String) params.get(isRight)));
						}
						optionInfoMapper.insert(optionInfo);	
					}		
				}
			}else {
				return;
			}
		}	
	}
	
	@Override
	public void changeSubjectInfo(Map<String, Object> params) {	
		if(!ObjectUtils.isEmpty(params.get("subjectTitle"))) {
			String subjectTitle = params.get("subjectTitle").toString();
			SubjectInfo subjectInfo = subjectInfoMapper.selectBySubjectTitle(subjectTitle);
			if(!ObjectUtils.isEmpty(params.get("subjectType"))) {
				subjectInfo.setSubjecttype(Integer.parseInt((String) params.get("subjectType")));
			}
			subjectInfoMapper.updateByPrimaryKeySelective(subjectInfo);
			Long id = subjectInfo.getId();
			if(!ObjectUtils.isEmpty(params.get("optionLength"))) {
				int optionLength = Integer.parseInt(params.get("optionLength").toString());
				int i;
				String optionTitle;
				String isRight;
				List<OptionInfo> optionInfos = optionInfoMapper.selectBySubjectId(id);
				for(i = 0; i < optionLength; i++)
				{
					optionTitle = "optionInfoList[";
					optionTitle += i;
					optionTitle += "][optionTitle]";
					isRight = "optionInfoList[";
					isRight += i;
					isRight += "][isRight]";
					String eleTitle = (String) params.get(optionTitle);
					for(OptionInfo optionInfo : optionInfos) {
						if(optionInfo.getOptiontitle().toString().equals(eleTitle)) {
							optionInfo.setIsright(Integer.parseInt(params.get(isRight).toString()));
							optionInfoMapper.updateByPrimaryKeySelective(optionInfo);
						}
					}
				}		
			}		
		}	
	}

	@Override
	public Boolean checkIsSubjectExist(String subjectTitle) {
		if(!ObjectUtils.isEmpty(subjectTitle)) {
			subjectTitle = subjectTitle.replaceAll("\r|\n", "");
			if(!ObjectUtils.isEmpty(subjectInfoMapper.selectBySubjectTitles(subjectTitle))) {
				return true;
			} else {
				return false;
			}
		}
		return null;
	}

	@Override
	public Map<String, Object> getTitleAndAnswerByTitle(String subjectTitle) {
		subjectTitle = subjectTitle.replaceAll("\r|\n", "");
		if(ObjectUtils.isEmpty(subjectTitle)) {
			return null;
		}
		if(!checkIsSubjectExist(subjectTitle)) {
			return null;
		}
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("subjectTitle", subjectTitle);
		SubjectInfo subjectInfo = subjectInfoMapper.selectBySubjectTitle(subjectTitle);
		Long subjectId = subjectInfo.getId();
		int subjectType = subjectInfo.getSubjecttype();
		result.put("subjectType", subjectType);
		String answer = subjectInfo.getAnswer();
		result.put("answer", answer);
		List<OptionInfo> optionInfoList = optionInfoMapper.selectBySubjectId(subjectId);
		List<String> optionStringList = new ArrayList<String>();
		for(OptionInfo o : optionInfoList) {
			if(ObjectUtils.isEmpty(o.getIsright())) {
				continue;
			}
			if(1 == o.getIsright()) {
				optionStringList.add(o.getOptiontitle());
			}
		}
		result.put("optionStringList", optionStringList);
		return result;
	}
	
	@Override
	public Map<String, Object> getUsersSubject() {
		Map<String, Object> result = new HashMap<String, Object>();
		SubjectInfo subjectInfo = subjectInfoMapper.getUsersSubject();
		result.put("subjectTitle", subjectInfo.getSubjecttitle());
		Long subjectId = subjectInfo.getId();
		int subjectType = subjectInfo.getSubjecttype();
		result.put("subjectType", subjectType);
		List<OptionInfo> optionInfoList = optionInfoMapper.selectBySubjectId(subjectId);
		result.put("optionInfoList", optionInfoList);
		return result;
	}

	@Override
	public List<String> getTitleByPartTitle(String partTitle) {
		partTitle = partTitle.replaceAll("\r|\n", "");
		List<String> resList = new ArrayList<String>();
		List<SubjectInfo> subList = subjectInfoMapper.selectByPartTitle(partTitle);
		for(SubjectInfo s : subList) {
			if(!ObjectUtils.isEmpty(s.getSubjecttitle())) {
				resList.add(s.getSubjecttitle());
			}
		}
		return resList;
	}

}
