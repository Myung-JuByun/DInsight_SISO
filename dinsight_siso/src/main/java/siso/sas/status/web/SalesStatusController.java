package siso.sas.status.web;

import java.util.List;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import siso.cmmn.ComPageInfoVO;
import siso.cmmn.cmm.service.CmmnDetailCode;
import siso.cmmn.cmm.service.ComDefaultCodeVO;
import siso.cmmn.cmm.service.SpringCmmUseService;
import siso.cmmn.cmm.service.SpringPageInitService;
import siso.sas.status.service.SalesStatusInfoVO;
import siso.sas.status.service.SalesStatusSearchVO;
import siso.sas.status.service.SalesStatusService;
import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;

/**
 * @Class Name : ExpanseController.java
 * @Description : EgovSample Controller Class
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2009.03.16           최초생성
 *
 * @author 개발프레임웍크 실행환경 개발팀
 * @since 2009. 03.16
 * @version 1.0
 * @see
 *
 *  Copyright (C) by MOPAS All right reserved.
 */
@Controller
public class SalesStatusController {

	/** EgovSampleService */
	@Autowired
	private SalesStatusService salesStatusService;
	
	@Autowired
	protected SpringPageInitService springPageInitService;
	
	@Autowired
	protected SpringCmmUseService springCmmUseService;
		
	/**
	 * 글 목록을 조회한다. (pageing)
	 * @param searchVO - 조회할 정보가 담긴 SampleDefaultVO
	 * @param model
	 * @return "/usr/selectUserList"
	 * @exception Exception
	 */
	@RequestMapping(value = "/sas/status/salesStatus")
	public String selectSampleList(@ModelAttribute("searchVO") SalesStatusSearchVO searchVO, ModelMap model, HttpServletRequest request) throws Exception {
		
		String pageUrl = "/sas/status/salesStatus";
		
		ComDefaultCodeVO inputVo = new ComDefaultCodeVO();
		
		ComPageInfoVO comPageInfoVO = (ComPageInfoVO) springPageInitService.controllPageInfo(request, pageUrl);
		model.addAttribute("menuInfo", comPageInfoVO);
		
		/** 부서명 */
		inputVo.setGroup_id("109");
		List<CmmnDetailCode> divisionList = springCmmUseService.selectCmnCodeCombo(inputVo);
		model.addAttribute("divisionList", divisionList);
		
		/** 담당영업 */
		List<SalesStatusInfoVO> userList = salesStatusService.selectSalesUserList();
		model.addAttribute("userList", userList);
		
		/** 영업 status */
		inputVo.setGroup_id("115");
		List<CmmnDetailCode> statusList = springCmmUseService.selectCmnCodeCombo(inputVo);
		model.addAttribute("statusList", statusList);
		
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
		
		List<SalesStatusInfoVO> salesStatusList = salesStatusService.selectSalesList(searchVO);
		model.addAttribute("resultList_status", salesStatusList);

		int totCnt = salesStatusService.selectSalesListTotCnt(searchVO);
		paginationInfo.setTotalRecordCount(totCnt);
		model.addAttribute("paginationInfo", paginationInfo);
		
		System.out.println(salesStatusList);

		return pageUrl;
	}
}
