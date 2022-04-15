package siso.sys.web;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import siso.cmmn.ComPageInfoVO;
import siso.cmmn.cmm.SpringMessageSource;
import siso.cmmn.cmm.service.SpringPageInitService;

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
public class MainController {

	/** EgovSampleService */
	protected SpringMessageSource springMessageSource;
    
	@Autowired
	protected SpringPageInitService springPageInitService;
    
	private static final Logger logger = LoggerFactory.getLogger(MainController.class);
	

	/**
	 * 메인 화면을 호출한다. 
	 * @param model
	 * @return "/"
	 * @exception Exception
	 */
	@RequestMapping(value = {"/", "/main"})
	public String mainHtml(HttpServletRequest request, ModelMap model) throws Exception {
		
		String pageUrl = "/main";
		
		try {
			ComPageInfoVO comPageInfoVO = (ComPageInfoVO) springPageInitService.mainMenuInfo();
			model.addAttribute("menuInfo", comPageInfoVO);
			model.addAttribute("mainMenuSize", comPageInfoVO.getMainMenu().size());
			
			logger.debug(pageUrl + " 호출 ");								
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return pageUrl;
	}
}
