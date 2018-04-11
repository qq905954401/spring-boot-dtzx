package com.inaing.dtdjzx;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.inaing.dtdjzx.dao.SubjectInfoMapper;
import com.inaing.dtdjzx.model.OptionInfo;
import com.inaing.dtdjzx.service.ISubjectInfoService;

@RunWith(SpringRunner.class)
@SpringBootTest
public class SubjectInfoTests {

	@Autowired
	private ISubjectInfoService iSubjectInfoService;
	@Autowired
	private SubjectInfoMapper subjectInfoMapper;
	
	/*@Test
	public void getSubById() {
		System.out.println("first");
		System.out.println(iSubjectInfoService.selectById(0L));
	}*/
	
	/*@Test
	public void isExist() {
		System.out.println("second'/");
		String subjectTitle = "中国秉持共商共建共享的全球治理观，倡导（）民主化，坚持国家不分大小、强弱、贫富一律平等，支持联合国发挥积极作用，支持扩大发展中国家在国际事务中的代表性和发言权。";
		System.out.println(iSubjectInfoService.checkIsSubjectExist(subjectTitle));
	}*/
	
	@Test
	public void selectBySubjectTitles() {
		String a = "123\n22";
		System.out.println("ssssssssssss");
		System.out.println(a);
		System.out.println("ssssssssssss");
		
		OptionInfo optionInfo = new OptionInfo();
		optionInfo.setOptiontitle(a);
		System.out.println(optionInfo.getOptiontitle());
		System.out.println("ssssssssssss");
		/*System.out.println("3333'/");
		String subjectTitle = "中国秉持共商共建共享的全球治理观，倡导（）民主化，坚持国家不分大小、强弱、贫富一律平等，支持联合国发挥积极作用，支持扩大发展中国家在国际事务中的代表性和发言权。";
		System.out.println(subjectInfoMapper.selectBySubjectTitles(subjectTitle));*/
	}
}
