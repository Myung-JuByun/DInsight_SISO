package siso.usr.web;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttributes;
import siso.cmmn.ComPageInfoVO;
import siso.cmmn.cmm.service.SpringPageInitService;
import siso.usr.service.UserInfoVO;
import siso.usr.service.UserSearchVO;
import siso.usr.service.UserService;
import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;

/**
 * @Class Name : UserInfoController.java
 * @Description : EgovSample Controller Class
 * @Modification Information 2009.03.16 최초생성
 * 
 * @author 개발프레임웍크 실행환경 개발팀
 * @since 2009. 03.16
 * @version 1.0
 * @see Copyright (C) by MOPAS All right reserved.
 */
@Controller
@SessionAttributes(types = UserInfoVO.class)
public class UserInfoController {
	
	@Autowired
	private UserService userService;

	@Autowired
	protected SpringPageInitService springPageInitService;

	/**
	 * 글 목록을 조회한다. (pageing)
	 * @param searchVO - 조회할 정보가 담긴 SampleDefaultVO
	 * @param model
	 * @return "/usr/selectUserList"
	 * @exception Exception
	 */
	@RequestMapping(value = "/usr/userInfo")
	public String selectInfoList(@ModelAttribute("searchVO") UserSearchVO searchVO, ModelMap model, HttpServletRequest request) throws Exception {
		
		String pageUrl = "/usr/userInfo";
		
		ComPageInfoVO comPageInfoVO = (ComPageInfoVO) springPageInitService.controllPageInfo(request, pageUrl);
		model.addAttribute("menuInfo", comPageInfoVO);

		/** pageing */
		searchVO.setPageUnit(searchVO.getPageUnit());
		searchVO.setPageSize(searchVO.getPageSize());
		searchVO.setPageingYn("Y");

		/** pageing setting */
		PaginationInfo paginationInfo = new PaginationInfo();
		paginationInfo.setCurrentPageNo(searchVO.getPageIndex());
		paginationInfo.setRecordCountPerPage(searchVO.getPageUnit());
		paginationInfo.setPageSize(searchVO.getPageSize());

		searchVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
		searchVO.setLastIndex(paginationInfo.getLastRecordIndex());
		searchVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());
		
		List<UserInfoVO> userList = userService.selectUserList(searchVO);
		model.addAttribute("resultList", userList);

		int totCnt = userService.selectUserListTotCnt(searchVO);
		paginationInfo.setTotalRecordCount(totCnt);
		model.addAttribute("paginationInfo", paginationInfo);
		
		return pageUrl;
	}

}
