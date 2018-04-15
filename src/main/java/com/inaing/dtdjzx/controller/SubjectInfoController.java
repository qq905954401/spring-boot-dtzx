package com.inaing.dtdjzx.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.util.JSONPObject;
import com.inaing.dtdjzx.service.ISubjectInfoService;
import com.inaing.dtdjzx.util.ObjectUtils;

@Controller
@RequestMapping("/subject")
public class SubjectInfoController {
	
	@Autowired
	private ISubjectInfoService iSubjectInfoService;
	
	@RequestMapping(value="/saveSubjectInfo", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public @ResponseBody  Object loadOrders(@RequestParam Map<String,Object> params, HttpServletRequest request){
		iSubjectInfoService.saveSubjectInfo(params);
		return null;
	}
	
	@RequestMapping(value="/saveSubjectInfo", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public @ResponseBody  Object loadOrders2(@RequestParam Map<String,Object> params, HttpServletRequest request){
		iSubjectInfoService.saveSubjectInfo(params);
		return null;
	}
	
	@RequestMapping(value="/changeSubjectInfo", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public @ResponseBody  Object changeSubjectInfo(@RequestParam Map<String,Object> params, HttpServletRequest request){
		iSubjectInfoService.changeSubjectInfo(params);
		return null;
	}
	
	@RequestMapping(value="/getTitleAndAnswerByTitle", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public @ResponseBody  Object getTitleAndAnswerByTitle(@RequestParam Map<String,Object> params, HttpServletRequest request){
		if(ObjectUtils.isEmpty(params.get("subjectTitle"))) {
			return null;
		}
		String subjectTitle = params.get("subjectTitle").toString();
		return iSubjectInfoService.getTitleAndAnswerByTitle(subjectTitle);
	}
	
	@RequestMapping(value="/getTitleAndAnswerByTitle", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public @ResponseBody JSONPObject getTitleAndAnswerByTitleGet(@RequestParam Map<String,Object> params, HttpServletRequest request){

		if(ObjectUtils.isEmpty(params.get("subjectTitle"))) {
			return null;
		}
		String jsonpCallback = "";
		if(!ObjectUtils.isEmpty(params.get("callback"))) {
			jsonpCallback = params.get("callback").toString();
		}
		String subjectTitle = params.get("subjectTitle").toString();
		return new JSONPObject(jsonpCallback, iSubjectInfoService.getTitleAndAnswerByTitle(subjectTitle));
	}
	
	@RequestMapping(value="/getTitleByPartTitle", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public @ResponseBody  Object getTitleByPartTitle(@RequestParam Map<String,Object> params, HttpServletRequest request){
		if(ObjectUtils.isEmpty(params.get("partTitle"))) {
			return null;
		}
		String partTitle = params.get("partTitle").toString();
		return iSubjectInfoService.getTitleByPartTitle(partTitle);
	}
	
	@RequestMapping(value="/getUsersSubject", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public @ResponseBody  Object getUsersSubject(@RequestParam Map<String,Object> params, HttpServletRequest request){
		return iSubjectInfoService.getUsersSubject();
	}
}
