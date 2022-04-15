package siso.cmmn.cmm.web;

import java.io.PrintWriter;
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
import siso.cmmn.cmm.service.CmmnDetailCode;
import siso.cmmn.cmm.service.ComDefaultCodeVO;
import siso.cmmn.cmm.service.SpringCmmUseService;
import siso.cmmn.cmm.service.SpringPageInitService;
import siso.cmmn.cmm.service.ZipCodeService;
import siso.cmmn.cmm.service.ZipCodeVO;

import com.fasterxml.jackson.databind.ObjectMapper;


/**
 * @Class Name : ZipCodeController.java
 * @Description : ZipCode Controller Class
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2015.05.16           최초생성
 *
 * @author 주소검색
 * @since 2015.05.16
 * @version 1.0
 * @see
 *
 *  Copyright (C) by MOPAS All right reserved.
 */
@Controller
//@SessionAttributes(types = ZipCodeVO.class)
public class ZipCodeController {
	
	/** ZipCodeService */
	@Autowired
	private ZipCodeService zipcodeService;   

	@Autowired
	protected SpringPageInitService springPageInitService;
	    
	@Autowired
	protected SpringCmmUseService springCmmUseService;    
	
	@RequestMapping(value = "/cmm/ZipcodeSearch")
	@ResponseBody
	public void selectZipCodeList(@ModelAttribute("ZipCodeVO") ZipCodeVO searchVO
			                      , ModelMap model, HttpServletRequest request
			                      , HttpServletResponse response) throws Exception {				
		String str_resData = null;		
		try {			
			List<ZipCodeVO> zipcodeList = zipcodeService.selectZipCodeList(searchVO);
			int totCnt = zipcodeService.selectZipCodeListTotCnt(searchVO);
			
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("zipcodeList", zipcodeList);
			map.put("totCnt", totCnt);
			
			ObjectMapper om = new ObjectMapper();
		    str_resData = om.writeValueAsString(map);
			
		} catch(Exception ex) {
			ex.printStackTrace();			
			str_resData = "fail";
		}
		
		response.setContentType("text/html; charset=utf-8");
	    PrintWriter pw = response.getWriter();
		pw.print(str_resData);
		pw.flush();		
	}
	
	@RequestMapping(value = "/cmm/ZipcodeSearchRoad")
	@ResponseBody
	public void selectZipCodeListRoad(@ModelAttribute("ZipCodeVO") ZipCodeVO searchVO
			                      , ModelMap model, HttpServletRequest request
			                      , HttpServletResponse response) throws Exception {
		String str_resData = null;
		try {
			List<ZipCodeVO> zipcodeListRoad = zipcodeService.selectZipCodeListRoad(searchVO);
			int totCnt = zipcodeService.selectZipCodeListTotCntRoad(searchVO);			
			
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("zipcodeListRoad", zipcodeListRoad);
			map.put("totCnt", totCnt);
			
			ObjectMapper om = new ObjectMapper();
		    str_resData = om.writeValueAsString(map);
			
		} catch(Exception ex) {
			ex.printStackTrace();			
			str_resData = "fail";
		}
		response.setContentType("text/html; charset=utf-8");
	    PrintWriter pw = response.getWriter();
		pw.print(str_resData);
		pw.flush();	
	}
	
	@RequestMapping(value = "/cmm/ZipcodeSearchBunji")
	@ResponseBody
	public void selectZipCodeListBunji(@ModelAttribute("ZipCodeVO") ZipCodeVO searchVO
			                      , ModelMap model, HttpServletRequest request
			                      , HttpServletResponse response) throws Exception {
		String str_resData = null;
		try {
			List<ZipCodeVO> zipcodeListBunji = zipcodeService.selectZipCodeListBunji(searchVO);
			int totCnt = zipcodeService.selectZipCodeListTotCntBunji(searchVO);			
			
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("zipcodeListBunji", zipcodeListBunji);
			map.put("totCnt", totCnt);
			
			ObjectMapper om = new ObjectMapper();
		    str_resData = om.writeValueAsString(map);
			
		} catch(Exception ex) {
			ex.printStackTrace();			
			str_resData = "fail";
		}
		response.setContentType("text/html; charset=utf-8");
	    PrintWriter pw = response.getWriter();
		pw.print(str_resData);
		pw.flush();	
	}
	
	@RequestMapping(value = "/cmm/ZipCodeAjax")
	@ResponseBody
	public void selectZipCode(@ModelAttribute("ZipCodeVO") ZipCodeVO searchVO
			                      , ModelMap model, HttpServletRequest request
			                      , HttpServletResponse response) throws Exception {
				
		String str_resData = null;
		
		try {
			
			ComDefaultCodeVO inputVO = new ComDefaultCodeVO();
			// 시/도 명
			inputVO.setGroup_id("142");
			List<CmmnDetailCode> sidoList = springCmmUseService.selectCmnCodeCombo(inputVO);
			// 시군구 명
			inputVO.setGroup_id("143");
			List<CmmnDetailCode> sigunguList = springCmmUseService.selectCmnCodeCombo(inputVO);

			//int totCnt = zipcodeService.selectZipCodeListTotCnt(searchVO);
						
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("sidoList", sidoList);
			map.put("sigunguList", sigunguList);
			
			ObjectMapper om = new ObjectMapper();
		    str_resData = om.writeValueAsString(map);
			
		} catch(Exception ex) {
			ex.printStackTrace();			
			str_resData = "fail";
		}
		
		response.setContentType("text/html; charset=utf-8");
	    PrintWriter pw = response.getWriter();
		pw.print(str_resData);
		pw.flush();	
		
	}
}
