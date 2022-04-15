package siso.exp.individual.web;

import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
import siso.cmmn.ComPageInfoVO;
import siso.cmmn.cmm.service.SpringPageInitService;
import siso.cmmn.util.SpringUserDetailsHelper;
import siso.exp.individual.service.IndividualService;
import siso.exp.individual.service.IndividualVO;
import siso.sys.service.LoginVO;

import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * @Class Name : IndividualController.java
 * @Description : IndividualController Class
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
public class IndividualController {

	/** IndividualService */
	@Autowired
	private IndividualService individualService;	
		
	@Autowired
	protected SpringPageInitService springPageInitService;
	
	private LoginVO loginVO;
	
	//private static final Logger logger = LoggerFactory.getLogger(IndividualController.class);
	
	/**
	 * 글 목록을 조회한다.
	 * @param searchVO - 목록  정보가 담긴 VO
	 * @param model
	 * @param request
	 * @return "/exp/individual/individualStatus"
	 * @exception Exception
	 */
	@RequestMapping(value = "/exp/individual/individualStatus")
	public String IndividualURL(@ModelAttribute("searchVO") IndividualVO searchVO, ModelMap model, HttpServletRequest request) throws Exception {
		
		String pageUrl = "/exp/individual/individualStatus";
		
		//디폴트 년 설정
		Calendar calendar = Calendar.getInstance();
		
		//기본 년월
		String sh_expanse_year = Integer.toString(calendar.get(Calendar.YEAR));
		
		//년도 검색 유무 확인후 기본 년도 값 저장
		if(!searchVO.getSh_expanse_year().equals("")) sh_expanse_year = searchVO.getSh_expanse_year();
		
		//좌측, 우측 메뉴정보
		ComPageInfoVO comPageInfoVO = (ComPageInfoVO) springPageInitService.controllPageInfo(request, pageUrl);
		model.addAttribute("menuInfo", comPageInfoVO);
		
		searchVO.setSh_expanse_year(sh_expanse_year);
		
		//검색조건을 vo에 담는다.
		model.addAttribute("params", searchVO);
		
		return pageUrl;
	}
	
	/**
	 * 글 목록을 조회한다.
	 * @param searchVO - 목록  정보가 담긴 VO
	 * @param model
	 * @param request
	 * @param response
	 * @return "/exp/individual/individualList"
	 * @exception Exception
	 */
	@RequestMapping(value = "/exp/individual/individualList")
	public void individualList(@ModelAttribute("searchVO") IndividualVO searchVO, ModelMap model, HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		String str_resData = "";
		
		//회원정보
		loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();		
		int login_id       =  loginVO.getUser_id();
		
		//검색
		searchVO.setExpanse_year(searchVO.getSh_expanse_year());
		searchVO.setCreator(login_id);
		
		//리스트
		List<IndividualVO> userList = individualService.individualSelectList(searchVO);
		
		ObjectMapper om = new ObjectMapper();
	    str_resData = om.writeValueAsString(userList);
		
		response.setContentType("text/html; charset=utf-8");
	    PrintWriter pw = response.getWriter();
		pw.print(str_resData);
		pw.flush();
	}
	
	/**
	 * 품목리스트를 엑셀파일로 출력한다.
	 * @param searchVO 검색조건
	 * @return 엑셀파일
	 * @throws Exception
	 */
	@RequestMapping("/exp/individual/excelDownload")
	public ModelAndView excelDownload(@ModelAttribute("searchVO") IndividualVO searchVO) throws Exception {
		
		//시트명
		String excelSheetName = "개인경비현황";
		
		//타이틀
		List<String> excelHeaderList  = new ArrayList<String>();
		excelHeaderList.add(0, "월");
		excelHeaderList.add(1, "개인법인");
		excelHeaderList.add(2, "개인신용");
		excelHeaderList.add(3, "개인현금");
		excelHeaderList.add(4, "공통법인");
		excelHeaderList.add(5, "마일리지");
		excelHeaderList.add(6, "진행상황");
		
		//회원정보
		loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();		
		int login_id       =  loginVO.getUser_id();
		
		//검색
		searchVO.setExpanse_year(searchVO.getSh_expanse_year());
		searchVO.setCreator(login_id);
		
		//리스트
		List<IndividualVO> excelList = individualService.individualSelectExcelList(searchVO);
		
		List<List<String>> excelBodyList  = new ArrayList<List<String>>();
		
		for(int i = 0; i < excelList.size(); i ++) {
		
			List<String> excelBodySubList  = new ArrayList<String>();
			
			String expanse_month = excelList.get(i).getMonth_name();
			String expanse_302 = excelList.get(i).getText1();
			String expanse_301 = excelList.get(i).getText2();
			String expanse_303 = excelList.get(i).getText3();
			String expanse_304 = excelList.get(i).getText4();
			String expanse_mileage = excelList.get(i).getText5();
			String expanse_status = excelList.get(i).getStatus_cd_name();
			
			excelBodySubList.add(expanse_month);
			excelBodySubList.add(expanse_302);
			excelBodySubList.add(expanse_301);
			excelBodySubList.add(expanse_303);
			excelBodySubList.add(expanse_304);
			excelBodySubList.add(expanse_mileage);
			excelBodySubList.add(expanse_status);
			
			excelBodyList.add(excelBodySubList);
		}
		
		//
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("excelSheetName", excelSheetName);
		//map.put("excelHeaderList", excelHeaderList);
		//map.put("excelList", excelList);
		map.put("excelList", excelBodyList);
		
		return new ModelAndView("listExcelView", map);
	}
		
}
