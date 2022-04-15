package siso.prd.web;

import java.io.InputStream;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import siso.cmmn.ComPageInfoVO;
import siso.cmmn.cmm.service.SpringCmmUseService;
import siso.cmmn.cmm.service.SpringPageInitService;
import siso.prd.service.PrdService;
import siso.prd.service.PrdVO;

import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * @Class Name : AlcAdminController.java
 * @Description : AlcAdminController Class
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
public class PrdController {

	/** prdService */
	@Autowired
	private PrdService prdService;
	
	@Autowired
	protected SpringPageInitService springPageInitService;
		
	@Autowired
	protected SpringCmmUseService springCmmUseService;	
		
	/**
	 * 페이지 접속
	 * @param searchVO
	 * @param model
	 * @return "/prd/product"
	 * @exception Exception
	 */
	@RequestMapping(value = "/prd/product")
	public String alcAdminHTML(ModelMap model, HttpServletRequest request) throws Exception {
		
		String pageUrl = "/prd/product";
		
		ComPageInfoVO comPageInfoVO = (ComPageInfoVO) springPageInitService.controllPageInfo(request, pageUrl);
		model.addAttribute("menuInfo", comPageInfoVO); //좌측 메뉴

		return pageUrl;
	}
	
	/**
	 * 메인리스트(검색)
	 * @param searchVO - 목록  정보가 담긴 VO
	 * @param model
	 * @param response
	 * @return "/prd/prdSearchList"
	 * @exception Exception
	 */
	@RequestMapping("/prd/prdSearchList")
	public void prdSearchList(@ModelAttribute("searchVO") PrdVO searchVO, HttpServletResponse response) throws Exception {
		
		String str_resData = "";
		
		try {
			//
			List<PrdVO> prdMainList = prdService.prdMainList(searchVO);
			
			Map<String, Object> map_d = new HashMap<String, Object>();
			map_d.put("prdMainList", prdMainList);
						
			ObjectMapper om = new ObjectMapper();
		    str_resData = om.writeValueAsString(map_d);
		
		} catch(Exception ex) {
			
			ex.printStackTrace();
			
			str_resData = "fail";
		}
	    
		response.setContentType("text/html; charset=utf-8");
	    PrintWriter pw = response.getWriter();
		pw.print(str_resData);
		pw.flush();
	}
	
	/**
	 * 제품 상세리스트(검색)
	 * @param searchVO - 목록  정보가 담긴 VO
	 * @param model
	 * @param response
	 * @return "/prd/prdDetailList"
	 * @exception Exception
	 */
	@RequestMapping("/prd/prdDetailList")
	public void prdDetailList(@ModelAttribute("searchVO") PrdVO searchVO, HttpServletResponse response) throws Exception {
		
		String str_resData = "";
		
		try {
			//
			List<PrdVO> prdDetailList = prdService.prdDetailList(searchVO);
			List<PrdVO> prdDetailAllList = prdService.prdDetailAllList(searchVO);
			
			
			Map<String, Object> map_d = new HashMap<String, Object>();
			map_d.put("prdDetailList", prdDetailList);
			map_d.put("prdDetailAllList", prdDetailAllList);
						
			ObjectMapper om = new ObjectMapper();
		    str_resData = om.writeValueAsString(map_d);
		
		} catch(Exception ex) {
			
			ex.printStackTrace();
			
			str_resData = "fail";
		}
	    
		response.setContentType("text/html; charset=utf-8");
	    PrintWriter pw = response.getWriter();
		pw.print(str_resData);
		pw.flush();
	}
	
	/**
	 * 자료올리기 년도 확인
	 * @param searchVO - 목록  정보가 담긴 VO
	 * @param model
	 * @param response
	 * @return "/prd/prdYearCheck"
	 * @exception Exception
	 */
	@RequestMapping("/prd/prdYearCheck")
	public void prdYearCheck(@ModelAttribute("searchVO") PrdVO searchVO, HttpServletResponse response) throws Exception {
		
		String str_resData = "";
		
		try {
			//
			String prdYearCheck = prdService.prdYearCheck(searchVO);
			
			Map<String, Object> map_d = new HashMap<String, Object>();
			map_d.put("prdYearCheck", prdYearCheck);
						
			ObjectMapper om = new ObjectMapper();
		    str_resData = om.writeValueAsString(map_d);
		
		} catch(Exception ex) {
			
			ex.printStackTrace();
			
			str_resData = "fail";
		}
	    
		response.setContentType("text/html; charset=utf-8");
	    PrintWriter pw = response.getWriter();
		pw.print(str_resData);
		pw.flush();
	}
	
	/**
	 * 엑셀업로드
	 * @param searchVO - 목록  정보가 담긴 VO
	 * @param model
	 * @param response
	 * @exception Exception
	 */
	@RequestMapping("/prd/prdExcelUpload")
	@ResponseBody
	public void prdExcelUpload(HttpServletRequest request, ModelMap model, HttpServletResponse response) throws Exception {
		PrdVO prdVO = new PrdVO();
		String str_resData = "";
		String sh_year=request.getParameter("sh_year");
		
		//선언
		final MultipartHttpServletRequest multiRequest = (MultipartHttpServletRequest) request;
		
		//extract files
		final Map<String, MultipartFile> files = multiRequest.getFileMap();
		InputStream fis = null;
		
		//process files
		Iterator<Entry<String, MultipartFile>> itr = files.entrySet().iterator();		
		MultipartFile file;
		while (itr.hasNext()) {
			Entry<String, MultipartFile> entry = itr.next();
			
			file = entry.getValue();			
			if (!file.getOriginalFilename().equals("")) {
				
				//업로드 파일에 대한 확장자를 체크
				if (file.getOriginalFilename().endsWith(".xls") || file.getOriginalFilename().endsWith(".XLS")) {

					try {
						fis = file.getInputStream();
						prdVO.setSh_year(sh_year);
						prdService.insertExcelGoods(fis,prdVO);//List<Map<String, Object>> exList = prdService.insertExcelGoods(fis);
						
						ObjectMapper om = new ObjectMapper();
					    str_resData = om.writeValueAsString("success");
						
					} catch (Exception e) {
						throw e;
					} finally {
						if (fis != null) {
							fis.close();
						}
					}

				} else if (file.getOriginalFilename().endsWith(".xlsx") || file.getOriginalFilename().endsWith(".XLSX")) {
					try {
						fis = file.getInputStream();
						prdVO.setSh_year(sh_year);
						prdService.insertExcelPOIGoods(fis,prdVO); //List<Map<String, Object>> exList = prdService.insertExcelPOIGoods(fis);
						
						ObjectMapper om = new ObjectMapper();
					    str_resData = om.writeValueAsString("success");
						
						
					} catch (Exception e) {
						throw e;
					} finally {
						if (fis != null) {
							fis.close();
						}
					}
					
				} else {
					new Exception("errors.excel.fileType");
				}
			}			
		}		
		response.setContentType("text/html; charset=utf-8");
	    PrintWriter pw = response.getWriter();
		pw.print(str_resData);
		pw.flush();
	}
}
