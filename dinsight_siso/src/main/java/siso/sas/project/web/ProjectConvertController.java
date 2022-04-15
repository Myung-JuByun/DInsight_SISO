package siso.sas.project.web;

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
import org.springframework.web.bind.annotation.ResponseBody;
import siso.cmmn.ComPageInfoVO;
import siso.cmmn.cmm.service.CmmnDetailCode;
import siso.cmmn.cmm.service.ComDefaultCodeVO;
import siso.cmmn.cmm.service.SpringCmmUseService;
import siso.cmmn.cmm.service.SpringPageInitService;
import siso.cmmn.util.SpringStringUtil;
import siso.cmmn.util.SpringUserDetailsHelper;
import siso.cmmn.util.Globals;
import siso.sam.pcode.service.ProjectCodeService;
import siso.sam.pcode.service.ProjectCodeVO;
import siso.sys.service.LoginVO;

import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * @Class Name : ProjectConvertController.java
 * @Description : ProjectConvertController Class
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
public class ProjectConvertController {

	/** ProjectCodeService */
	@Autowired
	private ProjectCodeService projectCodeService;
	
	@Autowired
	protected SpringPageInitService springPageInitService;
		
	@Autowired
    protected SpringCmmUseService springCmmUseService;
	
	private LoginVO loginVO;
		
	//private static final Logger logger = LoggerFactory.getLogger(IndividualController.class);
	
	/**
	 * 페이지 로딩
	 * @param searchVO - 목록  정보가 담긴 VO
	 * @param model
	 * @param request
	 * @return "/sas/project/prjcodeConvert"
	 * @exception Exception
	 */
	@RequestMapping(value = "/sas/project/prjcodeConvert")
	public String prjcodeConvertURL(@ModelAttribute("searchVO") ProjectCodeVO searchVO, ModelMap model, HttpServletRequest request) throws Exception {
		
		String pageUrl = "/sas/project/prjcodeConvert";
		
		try {
		
			//디폴트 년,월 설정
			Calendar calendar = Calendar.getInstance();
			
			//기본 년월
			String defaultExpanseYear  = Integer.toString(calendar.get(Calendar.YEAR));
			String defaultExpanseMonth = String.format("%02d",calendar.get(Calendar.MONTH)+1);
			
			//년월 검색 유무 확인후 기본 년월 값 저장
			if(!searchVO.getSh_sales_project_year().equals("")) defaultExpanseYear = searchVO.getSh_sales_project_year();
			if(!searchVO.getSh_sales_project_month().equals("")) defaultExpanseMonth = searchVO.getSh_sales_project_month();
			
			searchVO.setSh_sales_project_year(defaultExpanseYear);
			searchVO.setSh_sales_project_month(defaultExpanseMonth);
			
			//검색조건을 vo에 담는다.
			model.addAttribute("params", searchVO);
			
			//좌측, 우측 메뉴정보
			ComPageInfoVO comPageInfoVO = (ComPageInfoVO) springPageInitService.controllPageInfo(request, pageUrl);
			model.addAttribute("menuInfo", comPageInfoVO);
		
		} catch(Exception ex) {
			ex.printStackTrace();
			return "redirect:" + Globals.MAIN_PAGE;
		}
		
		return pageUrl;
	}
	
	/**
	 * Project Code 리스트 출력
	 * @param searchVO - 목록  정보가 담긴 VO
	 * @param model
	 * @param request
	 * @param response
	 * @return "/sas/project/prjcodeConvertList"
	 * @exception Exception
	 */
	@RequestMapping(value = "/sas/project/prjcodeConvertList")
	public void prjcodeConvertList(@ModelAttribute("searchVO") ProjectCodeVO searchVO, ModelMap model, HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		String str_resData = "";
		
		//회원정보
		loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();		
		int login_id       	=	loginVO.getUser_id();
		
		List<String> divisionChild = projectCodeService.projectDivisionChildList(loginVO);
		
		//검색
		searchVO.setSales_project_year(searchVO.getSh_sales_project_year());
		searchVO.setSales_project_month(searchVO.getSh_sales_project_month());
		searchVO.setCompany_name(searchVO.getSh_company_name());
		searchVO.setSales_type_cd(searchVO.getSh_sales_type_cd());
		searchVO.setSales_status_cd(searchVO.getSh_sales_status_cd());
		searchVO.setBrand_cd(searchVO.getSh_brand_cd());
		if (SpringStringUtil.isEmpty(searchVO.getSh_user_id())) {
			searchVO.setDivision_child_list(divisionChild);
		} else {
			searchVO.setUser_id(searchVO.getSh_user_id());
		}
		searchVO.setCreator(login_id);
		searchVO.setModifier(login_id);
		
		//리스트
		List<ProjectCodeVO> pCodeList = projectCodeService.projectCodeList(searchVO);
		
		ComDefaultCodeVO inputVO = new ComDefaultCodeVO();
		
		//구분
		inputVO.setGroup_id("116");
		List<CmmnDetailCode> salesTypeList = springCmmUseService.selectCmnCodeCombo(inputVO);
		
		//brand
		inputVO.setGroup_id("117");		
		List<CmmnDetailCode> brandList = springCmmUseService.selectCmnCodeCombo(inputVO);
		
		//영업 status
		inputVO.setGroup_id("115");		
		List<CmmnDetailCode> salesStatusList = springCmmUseService.selectCmnCodeCombo(inputVO);
		
		//담당영업
		List<ProjectCodeVO> divisionUsers = projectCodeService.projectDivisionUserList(searchVO);
		
		//담당부서
		List<ProjectCodeVO> division = projectCodeService.projectDivisionList(searchVO);
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("pCodeList", pCodeList);
		map.put("salesTypeList", salesTypeList);
		map.put("brandList", brandList);
		map.put("salesStatusList", salesStatusList);
		map.put("divisionUsers", divisionUsers);
		map.put("division", division);
		
		ObjectMapper om = new ObjectMapper();
	    str_resData = om.writeValueAsString(map);
		
		response.setContentType("text/html; charset=utf-8");
	    PrintWriter pw = response.getWriter();
		pw.print(str_resData);
		pw.flush();
	}
	
	/**
	 * 계약관리 Project Code 전환
	 * @param searchVO - 목록  정보가 담긴 VO
	 * @param model
	 * @param response
	 * @exception Exception
	 */
	@RequestMapping("/sas/project/projectCodeSuccess")
	@ResponseBody
	public void projectCodeSuccess(@ModelAttribute("searchVO") ProjectCodeVO searchVO, ModelMap model, HttpServletResponse response) throws Exception {		
		String str_resData 			=	"";		
		String sales_project_id 	=	"";
		
		try {		
			//로그인정보
			loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();			
			int login_id       		=	loginVO.getUser_id();			
			List<ProjectCodeVO> inputListVO = new ArrayList<ProjectCodeVO>();
			
			for(int cnt=0; cnt < searchVO.getIn_sales_project_id().length; cnt++) {				
				ProjectCodeVO projectCodeVO = new ProjectCodeVO();
				
				sales_project_id	=	searchVO.getIn_sales_project_id()[cnt];				
				projectCodeVO.setSales_project_id(sales_project_id);
				projectCodeVO.setModifier(login_id);
				projectCodeVO.setSales_status_cd("01");
			
				inputListVO.add(projectCodeVO);
			}
			
			//Success 전환
			projectCodeService.projectCodeSuccess(inputListVO);			
			str_resData = "success";			
		} catch(Exception ex) {			
			str_resData = "fail";			
		}
		
		response.setContentType("text/html; charset=utf-8");
	    PrintWriter pw = response.getWriter();
		pw.print(str_resData);
		pw.flush();

	}
		
}
