/*package siso.exp.web;

import java.io.InputStream;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springmodules.validation.commons.DefaultBeanValidator;

import siso.cmmn.ComDefaultVO;
import siso.cmmn.ComPageInfoVO;
import siso.cmmn.cmm.EgovMessageSource;
import siso.cmmn.cmm.service.EgovCmmUseService;
import siso.cmmn.cmm.service.EgovPageInitService;
import siso.cmmn.util.EgovStringUtil;
import siso.cmmn.util.EgovUserDetailsHelper;
import siso.cmmn.util.Globals;
import siso.exp.service.ExpSearchVO;
import siso.exp.service.ExpanseInfoVO;
import siso.exp.service.ExpanseService;
import siso.sample.service.SampleVO;
import siso.sys.service.LoginVO;

import com.fasterxml.jackson.databind.ObjectMapper;

import egovframework.rte.fdl.property.EgovPropertyService;

*//**
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
 *//*
@Controller
@SessionAttributes(types = SampleVO.class)
public class ExpanseController {

		*//** EgovSampleService *//*
		@Resource(name = "expanseService")
		private ExpanseService expanseService;

		@Resource(name = "egovPageInitService")
		protected EgovPageInitService egovPageInitService;
		
	    
	    *//** EgovMessageSource *//*
	    @Resource(name="egovCmmUseService")
	    protected EgovCmmUseService egovCmmUseService;
	    
	    *//** EgovMessageSource *//*
		@Resource(name = "egovMessageSource")
		private EgovMessageSource egovMessageSource;
	    
	    private LoginVO loginVO;
	    
		private static final Logger logger = LoggerFactory.getLogger(ExpanseController.class);

		*//**
		 * 글 목록을 조회한다. (pageing)
		 * @param searchVO - 조회할 정보가 담긴 SampleDefaultVO
		 * @param model
		 * @return "/sample/egovSampleList"
		 * @exception Exception
		 *//*
		@RequestMapping(value = "/exp/expanseAdmin")
		public String selectExpanseHtml(HttpServletRequest request, ModelMap model) throws Exception {
			 화면 정보 조회 
			
            String pageUrl = "/exp/expanseAdmin";
			
            try {
				ComPageInfoVO comPageInfoVO = (ComPageInfoVO) egovPageInitService.controllPageInfo(request, pageUrl);
				model.addAttribute("menuInfo", comPageInfoVO);
			} catch(Exception ex) {
				ex.printStackTrace();
				return "redirect:" + Globals.MAIN_PAGE;
			}
			
			return pageUrl;
		}
		
		@RequestMapping(value = "/exp/selectExpanseAdmin")
		@ResponseBody
		public void selectExpanseAdmin(Model model , HttpServletRequest request ,HttpServletResponse response ) throws Exception {
		   logger.debug("selectExpanseAdmin 컨트롤러 호출 ");
		   ExpSearchVO expSearchVO = new ExpSearchVO();
		   String str_resData = "";	
		   String return_msg               = "";  
		    
		   try
		   {			
		      String expanseYear        =  request.getParameter("expanseYear");
		      String expanseMonth       =  request.getParameter("expanseMonth");
		      
		      ComDefaultVO comDefaultVO = egovPageInitService.controllPageIngInfo(request);
		      
		      loginVO = (LoginVO) EgovUserDetailsHelper.getAuthenticatedUser();

			  int userId       =  loginVO.getUserId();
			  expSearchVO.setExpanseYear(expanseYear);
			  expSearchVO.setExpanseMonth(expanseMonth);
			  expSearchVO.setUserId(userId);
			  expSearchVO.setPageingYn("Y");
			  expSearchVO.setFirstIndex(comDefaultVO.getFirstIndex());
			  
			  logger.debug("expanseYear {}", expanseYear);
			  logger.debug("expanseMonth {}", expanseMonth);
				 
			  List<ExpanseInfoVO> expanseList = expanseService.selectExpanseList(expSearchVO);
				 
			  Map<String, Object> map_d = new HashMap<String, Object>();
			  map_d.put(Globals.AJAX_JSON_DATA_NAME, expanseList);
			  map_d.put(Globals.AJAX_JSON_DATA_COUNT, expanseList.size());
			  map_d.put(Globals.AJAX_JSON_ERROR_YN ,false);
		      map_d.put(Globals.AJAX_JSON_RETURN_MSG,return_msg);
				 
		      ObjectMapper om = new ObjectMapper();
		      str_resData = om.writeValueAsString(map_d);
		   }
		   catch(Exception ex)
		   {
		      return_msg = ex.toString();
		      
		      System.out.println(this.getClass().toString() + " Exception : " + return_msg);
		      Map<String, Object> map_d = new HashMap<String, Object>();
		      map_d.put(Globals.AJAX_JSON_DATA_NAME, "Error : " + return_msg);
		      map_d.put(Globals.AJAX_JSON_ERROR_YN,true);
		      map_d.put(Globals.AJAX_JSON_RETURN_MSG,"Error : " + return_msg);
		    	 
		      ObjectMapper om = new ObjectMapper();
		      str_resData = om.writeValueAsString(map_d);
		   }
		   
		   response.setContentType("text/html; charset=utf-8");
	       PrintWriter pw = response.getWriter();
	       pw.print(str_resData);
	       pw.flush();    
	  }
		
		@RequestMapping(value = "/exp/insertExcelExpanseAdmin")
		public String insertExcelExpanseAdmin(HttpServletRequest request, ModelMap model) throws Exception {
		   logger.debug("insertExcelExpanseAdmin 컨트롤러 호출 ");
		   ExpSearchVO expSearchVO = new ExpSearchVO();
		   String pageUrl = "/exp/expanseAdmin";
		   
		   String str_resData = "";	
		   String return_msg  = "";  
		    
		   
			   //List<InputStream> fileList = EgovExcelUtil.fileCheck(request);
			   
			   
				
			    List fileList = new ArrayList();
				System.out.println("fileCheck start");
			    try {
			    	//MultipartRequest multipart = request.getp
			    	//MultipartFile fileNm = multipart.getFile("fileNm");
			    	System.out.println("fileNm = " + request.getParameter("fileNm"));
				   final MultipartHttpServletRequest multiRequest = (MultipartHttpServletRequest) request;
				   System.out.println("file open1");
				   final Map<String, MultipartFile> files = multiRequest.getFileMap();
				   System.out.println("file open2");
				   InputStream fis = null; // 2011.11.1 보안점검 후속조치
			       Iterator<Entry<String, MultipartFile>> itr = files.entrySet().iterator();
			       System.out.println("file open3");
				   MultipartFile file;
				   System.out.println("file open");
				   while (itr.hasNext()) {
				      Entry<String, MultipartFile> entry = itr.next();

					  file = entry.getValue();
					  
					  System.out.println("file.getOriginalFilename() = " + file.getOriginalFilename());
					  if (!"".equals(file.getOriginalFilename())) {
					     // 2011.10.07 업로드 파일에 대한 확장자를 체크
						 if (file.getOriginalFilename().endsWith(".xls")
						     || file.getOriginalFilename().endsWith(".xlsx")
							 || file.getOriginalFilename().endsWith(".XLS")
							 || file.getOriginalFilename().endsWith(".XLSX")) {
						    try {
						    	System.out.println("file.getInputStream() ");
							  fis = file.getInputStream();
							  expanseService.insertExcelExpanseAdmin(fis);
							  
							} catch(Exception e) {
								System.out.println("Exception e = " + e.getMessage());
							   throw e;
							} finally {
							   if (fis != null)	// 2011.11.1 보안점검 후속조치
							      fis.close();
							}
						} else {
							new Exception("errors.excel.fileType");
						}
					  }
				   }
				} catch (Exception e) {
				    e.printStackTrace();
				    throw new RuntimeException(e);	// 2011.10.10 보안점검 후속조치
				}
				
			    
			  
			   Map<String, Object> map_d = new HashMap<String, Object>();
			   map_d.put(Globals.AJAX_JSON_DATA_NAME, "");
			   map_d.put(Globals.AJAX_JSON_DATA_COUNT, 1);
			   map_d.put(Globals.AJAX_JSON_ERROR_YN,false);
			   map_d.put(Globals.AJAX_JSON_RETURN_MSG,return_msg);
					 
			   ObjectMapper om = new ObjectMapper();
			   str_resData = om.writeValueAsString(map_d);
			   
			  model.addAttribute(Globals.AJAX_JSON_ERROR_YN, true);
				return pageUrl;
		   }
		
		   catch(Exception ex)
		   {
		      return_msg = ex.toString();
		      
		      if ("errors.excel.fileType".equals(return_msg)) {
		    	  return_msg = egovMessageSource.getMessage(return_msg);
		      }
		      System.out.println(this.getClass().toString() + " Exception : " + return_msg);
		      Map<String, Object> map_d = new HashMap<String, Object>();
		      map_d.put(Globals.AJAX_JSON_DATA_NAME, "Error : " + return_msg);
		      map_d.put(Globals.AJAX_JSON_ERROR_YN,true);
		      map_d.put(Globals.AJAX_JSON_RETURN_MSG,"Error : " + return_msg);
		    	 
		      ObjectMapper om = new ObjectMapper();
		      str_resData = om.writeValueAsString(map_d);
		   }
		   /*
		   response.setContentType("text/html; charset=utf-8");
	       PrintWriter pw = response.getWriter();
	       pw.print(str_resData);
	       pw.flush();  
	        
	  }  
		
		
	  @RequestMapping(value = "/exp/insertExpanseAdmin")
	  @ResponseBody
	  public void insertExpanseAdmin(Model model , HttpServletRequest request ,HttpServletResponse response ) throws Exception {
	     logger.debug("insertExpanseAdmin 컨트롤러 호출 ");
		 
	     String str_resData = "";	
		 String return_msg  = "";  
		 	 
			 Map<String, Object> map_d = new HashMap<String, Object>();
			 
			 try
			 {			
				 logger.debug("-----> ");
				 String[] dataModeList    = (String[]) request.getParameterValues("dataMode");
				 String[] expanseIdList   = (String[]) request.getParameterValues("expanseId");
				 String[] payDayList      = (String[]) request.getParameterValues("payDay");
				 String[] expanseTypeList = (String[]) request.getParameterValues("expanseType");
				 String[] categoryIdList  = (String[]) request.getParameterValues("categoryId");
				 String[] paymentList     = (String[]) request.getParameterValues("payment");
				 String[] expanseNameList = (String[]) request.getParameterValues("expanseName");
				 
				 logger.debug("dataModeList.size = " + dataModeList.length);
				 
				 Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
				 
				 if (!isAuthenticated) {
					 return_msg = egovMessageSource.getMessage("errors.login");
					 map_d.put(Globals.AJAX_JSON_DATA_NAME, "Error : " + return_msg);
			    	 map_d.put(Globals.AJAX_JSON_ERROR_YN,true);
			    	 map_d.put(Globals.AJAX_JSON_RETURN_MSG,"Error : " + return_msg);
			    	 map_d.put(Globals.AJAX_JSON_MOVE_URL,Globals.MAIN_PAGE);
			    	 
				 } else {
					 loginVO = (LoginVO) EgovUserDetailsHelper.getAuthenticatedUser();
						
					 int userId       =  loginVO.getUserId();
					 
					 List inputListVo  = new ArrayList();
					 
					 ExpanseInfoVO expanseInfoVO;
					 
					 for (int i=0;i<dataModeList.length;i++) {

						 expanseInfoVO   = new ExpanseInfoVO();
						 String dataMode = dataModeList[i];
						 int expanseId   = 0;
						 int payment     = 0;
						 int categoryId  = 0;
						 
						 if (!EgovStringUtil.isEmpty(expanseIdList[i])) {
							 expanseId = Integer.parseInt(expanseIdList[i]);
						 }
						 
						 if (!EgovStringUtil.isEmpty(paymentList[i])) {
							 payment =  Integer.parseInt(paymentList[i]);
						 }
						 
						 if (!EgovStringUtil.isEmpty(categoryIdList[i])) {
							 categoryId =  Integer.parseInt(categoryIdList[i]);
						 }
						 
						 expanseInfoVO.setDataMode(dataMode);
						 expanseInfoVO.setExpanseId(expanseId);
						 expanseInfoVO.setExpanseName(expanseNameList[i]);
						 expanseInfoVO.setExpanseType(expanseTypeList[i]);
						 expanseInfoVO.setPayment(payment);
						 expanseInfoVO.setPayDay(payDayList[i]);
						 expanseInfoVO.setCategoryId(categoryId);
						 expanseInfoVO.setExpanseYear(payDayList[i].substring(0,4));
						 expanseInfoVO.setExpanseMonth(payDayList[i].substring(4,6));
						 expanseInfoVO.setDivisionCd(loginVO.getDivisionCd());
						 expanseInfoVO.setStatusCd(Globals.EXP_IMSI_SAVE_STATUS_CD);
						 expanseInfoVO.setUserId(userId);
						 
						 if (!EgovStringUtil.isEmpty(dataMode)) {
							 inputListVo.add(expanseInfoVO);
						 } 
					 }
					 
					 expanseService.inputExpanseAdmin(inputListVo);
					 
					 return_msg = egovMessageSource.getMessage("result.save.ok");
					 
					 map_d.put(Globals.AJAX_JSON_DATA_NAME, "");
					 map_d.put(Globals.AJAX_JSON_DATA_COUNT, "");
					 map_d.put(Globals.AJAX_JSON_ERROR_YN,false);
			    	 map_d.put(Globals.AJAX_JSON_RETURN_MSG,return_msg); 
			    	 map_d.put(Globals.AJAX_JSON_MOVE_URL,"");
				 }
				 
		    	 ObjectMapper om = new ObjectMapper();
		    	 str_resData = om.writeValueAsString(map_d);
			 }
			 catch(Exception ex)
			 {
                return_msg = ex.toString();
				 
				 System.out.println(this.getClass().toString() + " Exception : " + return_msg);
				 ex.printStackTrace();
				 
				 map_d.put(Globals.AJAX_JSON_DATA_NAME, "Error : " + return_msg);
				 map_d.put(Globals.AJAX_JSON_DATA_COUNT, "");
				 map_d.put(Globals.AJAX_JSON_ERROR_YN,true);
		    	 map_d.put(Globals.AJAX_JSON_RETURN_MSG,"Error : " + return_msg);
		    	 map_d.put(Globals.AJAX_JSON_MOVE_URL,"");
		    	 
		    	 ObjectMapper om = new ObjectMapper();
		    	 str_resData = om.writeValueAsString(map_d);
			 }
			 response.setContentType("text/html; charset=utf-8");
	    	 PrintWriter pw = response.getWriter();
	    	 pw.print(str_resData);
	    	 pw.flush();     
		 }
		
}
*/