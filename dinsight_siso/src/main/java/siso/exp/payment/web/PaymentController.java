package siso.exp.payment.web;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringEscapeUtils;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
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
import siso.cmmn.util.SpringStringUtil;
import siso.cmmn.util.SpringUserDetailsHelper;
import siso.exp.payment.service.PaymentService;
import siso.exp.payment.service.PaymentVO;
import siso.sys.service.LoginVO;

import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * @Class Name : PaymentController.java
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
public class PaymentController {

	/** PaymentService */
	@Autowired
	private PaymentService paymentService;	
	
	/** EgovPageInitService */
	@Autowired
	protected SpringPageInitService springPageInitService;
	
	/** EgovMessageSource */
	@Autowired
    protected SpringCmmUseService springCmmUseService;
	
	private LoginVO loginVO;
	
	//private static final Logger logger = LoggerFactory.getLogger(PaymentController.class);
	
	/**
	 * 결재선 조회
	 * @param searchVO - 목록  정보가 담긴 VO
	 * @param model
	 * @param request
	 * @return "/exp/payment/paymentAdmin"
	 * @exception Exception
	 */
	@RequestMapping(value = "/exp/payment/paymentAdmin")
	public String paymentAdminList(@ModelAttribute("searchVO") PaymentVO searchVO, ModelMap model, HttpServletRequest request) throws Exception {
		
		String pageUrl = "/exp/payment/paymentAdmin";
		
		//결제 요청구분
		String defaultSearch = "01";
		
		if(!searchVO.getSh_payment_type().equals("")) defaultSearch = searchVO.getSh_payment_type();
		
		//좌측, 우측 메뉴정보
		ComPageInfoVO comPageInfoVO = (ComPageInfoVO) springPageInitService.controllPageInfo(request, pageUrl);
		model.addAttribute("menuInfo", comPageInfoVO);
		
		searchVO.setSh_payment_type(defaultSearch);
					
		//검색조건을 vo에 담는다.
		model.addAttribute("params", searchVO);
		
		return pageUrl;
	}
	
	/**
	 * 부서, 직원, 결재선 리스트
	 * @param searchVO - 목록  정보가 담긴 VO
	 * @param response
	 * @exception Exception
	 */
	@RequestMapping("/exp/payment/paymentTotalSearch")
	public void paymentTotalSearch(@ModelAttribute("searchVO") PaymentVO searchVO, HttpServletResponse response) throws Exception {
		
		String str_resData = "";
		
		//로그인정보
		loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();
		
		int login_id       =  loginVO.getUser_id();
		
		//파라미터 정의
		searchVO.setSh_division_cd(searchVO.getSh_division_cd());
		searchVO.setSh_user_name(searchVO.getSh_user_name());
		searchVO.setCreator(login_id);
		searchVO.setSh_payment_type(searchVO.getSh_payment_type());
		
		//부서검색
		List<PaymentVO> divisionList = paymentService.selectPaymentDivision(searchVO);
		
		//직원 검색
		searchVO.setDelete_yn("0");
		searchVO.setActivate_yn("1");
		List<PaymentVO> userList = paymentService.selectUserList(searchVO);
		
		//결재선 데이터
		List<PaymentVO> paymentList = paymentService.selectPaymentInfoList(searchVO);
		
		searchVO.setLogin_id("emadmin");
		
		//수신자 데이터
		List<PaymentVO> receiveList = paymentService.selectReceiveList(searchVO);
		
		//공통
		ComDefaultCodeVO inputVo = new ComDefaultCodeVO();
	
		//결제요청구분
		inputVo.setGroup_id("122");
		List<CmmnDetailCode> paymentTypeList = springCmmUseService.selectCmnCodeCombo(inputVo);
		
		//
		Map<String, Object> map_d = new HashMap<String, Object>();
		map_d.put("divisionList", divisionList);
		map_d.put("userList", userList);
		map_d.put("paymentList", paymentList);
		map_d.put("receiveList", receiveList);
		map_d.put("paymentTypeList", paymentTypeList);
		
		ObjectMapper om = new ObjectMapper();
	    str_resData = om.writeValueAsString(map_d);
		
		response.setContentType("text/html; charset=utf-8");
	    PrintWriter pw = response.getWriter();
		pw.print(str_resData);
		pw.flush();
	}
	

	/**
	 * 부서 검색
	 * @param searchVO - 목록  정보가 담긴 VO
	 * @param response
	 * @exception Exception
	 */
	@RequestMapping("/exp/payment/paymentDivisionSearch")
	public void paymentDivisionSearch(@ModelAttribute("searchVO") PaymentVO searchVO, HttpServletResponse response) throws Exception {
		
		String str_resData = "";
		
		//검색
		searchVO.setSh_division_cd(searchVO.getSh_division_cd());
		
		List<PaymentVO> divisionList = paymentService.selectPaymentDivision(searchVO);
		
		ObjectMapper om = new ObjectMapper();
	    str_resData = om.writeValueAsString(divisionList);
		
		response.setContentType("text/html; charset=utf-8");
	    PrintWriter pw = response.getWriter();
		pw.print(str_resData);
		pw.flush();
	}
	
	/**
	 * 검색
	 * @param searchVO - 목록  정보가 담긴 VO
	 * @param response
	 * @exception Exception
	 */
	@RequestMapping("/exp/payment/paymentDivisionUserSearch")
	public void paymentDivisionUserSearch(@ModelAttribute("searchVO") PaymentVO searchVO, HttpServletResponse response) throws Exception {
		
		String str_resData = "";
		
		//로그인정보
		loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();
		
		int login_id       =  loginVO.getUser_id();
		
		//검색
		searchVO.setSh_division_cd(searchVO.getSh_division_cd());
		searchVO.setSh_user_name(searchVO.getSh_user_name());
		searchVO.setCreator(login_id);
		searchVO.setActivate_yn("1");
		
		List<PaymentVO> userList = paymentService.selectUserList(searchVO);
		
		ObjectMapper om = new ObjectMapper();
	    str_resData = om.writeValueAsString(userList);
		
		response.setContentType("text/html; charset=utf-8");
	    PrintWriter pw = response.getWriter();
		pw.print(str_resData);
		pw.flush();
	}
	
	/**
	 * 결재선 지정 저장(파라미터 명이 있을경우)
	 * @param searchVO - 목록  정보가 담긴 VO
	 * @param response
	 * @exception Exception
	 */
	@RequestMapping("/exp/payment/paymentAdminInsert")
	public void paymentAdminInsert(HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		String str_resData = "";
		
		String sh_payment_type = "";
		String approval_owner_id = "";
		String owner_id = "";
		String expanse_appoint_cd = "";
		
		int cnt = 0;		
		
		//파라미터명
		String data = request.getParameter("data");
		
		//이스케이프 처리된 파라미터 데이터 복원
		String escapedJson = StringEscapeUtils.unescapeHtml(data);
		
		//json 파서
		JSONParser jsonParser = new JSONParser();
		JSONObject jsonObject = (JSONObject) jsonParser.parse(escapedJson);

		//로그인정보
		loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();
		
		int login_id       =  loginVO.getUser_id();
		
		//저장 및 업데이트 처리
		List<PaymentVO> inputListVo  = new ArrayList<PaymentVO>();

		//결재요청구분
		sh_payment_type = (String) jsonObject.get("type");

		//기안자 정보(오브젝트 형태로 넘어옴)
		JSONObject selfObj= (JSONObject) jsonObject.get("self");
		//System.out.println("self is: " + selfObj);
		
		PaymentVO searchInfoSelfVO = new PaymentVO();		
		
		approval_owner_id = (String) selfObj.get("approval_owner_id");
		owner_id = (String) selfObj.get("owner_id");
		expanse_appoint_cd = "00"; //기안자 코드번호
		
		if (SpringStringUtil.isEmpty(approval_owner_id)) {
			approval_owner_id = null;
		}				
		
		searchInfoSelfVO.setSource_type_cd(sh_payment_type);
		searchInfoSelfVO.setApproval_owner_id(approval_owner_id);
		searchInfoSelfVO.setUser_id(String.valueOf(login_id));
		searchInfoSelfVO.setOwner_id(owner_id);
		searchInfoSelfVO.setExpanse_appoint_cd(expanse_appoint_cd);
		searchInfoSelfVO.setOrder_seq(String.valueOf(cnt));
		searchInfoSelfVO.setCreator(login_id);
		searchInfoSelfVO.setModifier(login_id);				
		
		inputListVo.add(searchInfoSelfVO);
		
		cnt++;

		//검토자 리스트 정보(Array형태로 넘어옴)
		JSONArray exArr= (JSONArray) jsonObject.get("ex");
		//System.out.println("ex is: " + exArr);
		
		Iterator<?> ex = exArr.iterator();

		while (ex.hasNext()) {
			PaymentVO searchInfoVO = new PaymentVO();
			
			JSONObject innerObj = (JSONObject) ex.next();
			
			approval_owner_id = (String) innerObj.get("approval_owner_id");
			owner_id = (String) innerObj.get("owner_id");
			expanse_appoint_cd = "01"; //검토자 코드번호
			
			if (SpringStringUtil.isEmpty(approval_owner_id)) {
				approval_owner_id = null;
			}				
			
			searchInfoVO.setSource_type_cd(sh_payment_type);
			searchInfoVO.setApproval_owner_id(approval_owner_id);
			searchInfoVO.setUser_id(String.valueOf(login_id));
			searchInfoVO.setOwner_id(owner_id);
			searchInfoVO.setExpanse_appoint_cd(expanse_appoint_cd);
			searchInfoVO.setOrder_seq(String.valueOf(cnt));
			searchInfoVO.setCreator(login_id);
			searchInfoVO.setModifier(login_id);				
			
			inputListVo.add(searchInfoVO);
			
			cnt++;
		}
		
		//승인자 리스트 정보(Array형태로 넘어옴)
		JSONArray okArr= (JSONArray) jsonObject.get("ok");
		//System.out.println("ok is: " + okArr);
		
		Iterator<?> ok = okArr.iterator();

		while (ok.hasNext()) {
			PaymentVO searchInfoVO = new PaymentVO();			
			JSONObject innerObj = (JSONObject) ok.next();
			
			approval_owner_id = (String) innerObj.get("approval_owner_id");
			owner_id = (String) innerObj.get("owner_id");
			expanse_appoint_cd = "02"; //승인자 코드번호
			
			if (SpringStringUtil.isEmpty(approval_owner_id)) {
				approval_owner_id = null;
			}				
			
			searchInfoVO.setSource_type_cd(sh_payment_type);
			searchInfoVO.setApproval_owner_id(approval_owner_id);
			searchInfoVO.setUser_id(String.valueOf(login_id));
			searchInfoVO.setOwner_id(owner_id);
			searchInfoVO.setExpanse_appoint_cd(expanse_appoint_cd);
			searchInfoVO.setOrder_seq(String.valueOf(cnt));
			searchInfoVO.setCreator(login_id);
			searchInfoVO.setModifier(login_id);				
			
			inputListVo.add(searchInfoVO);
			
			cnt++;
		}
		
		//수신자 리스트 정보(Array형태로 넘어옴)
		JSONArray rcArr= (JSONArray) jsonObject.get("rc");
		//System.out.println("rc is: " + rcArr);
		
		Iterator<?> rc = rcArr.iterator();

		while (rc.hasNext()) {
			PaymentVO searchInfoVO = new PaymentVO();
			
			JSONObject innerObj = (JSONObject) rc.next();
			
			approval_owner_id = (String) innerObj.get("approval_owner_id");
			owner_id = (String) innerObj.get("owner_id");
			expanse_appoint_cd = "03"; //수신자 코드번호
			
			if (SpringStringUtil.isEmpty(approval_owner_id)) {
				approval_owner_id = null;
			}				
			
			searchInfoVO.setSource_type_cd(sh_payment_type);
			searchInfoVO.setApproval_owner_id(approval_owner_id);
			searchInfoVO.setUser_id(String.valueOf(login_id));
			searchInfoVO.setOwner_id(owner_id);
			searchInfoVO.setExpanse_appoint_cd(expanse_appoint_cd);
			searchInfoVO.setOrder_seq(String.valueOf(cnt));
			searchInfoVO.setCreator(login_id);
			searchInfoVO.setModifier(login_id);				
			
			inputListVo.add(searchInfoVO);
		}
		
		if(inputListVo.size() > 0) {
			
			try
			{
				PaymentVO searchVO = new PaymentVO();				
				searchVO.setSource_type_cd(sh_payment_type);
				searchVO.setCreator(login_id);
				
				//저장하기전 모든 데이터 삭제처리
				paymentService.paymentDelete(searchVO);
				
				//결재선 저장
				paymentService.paymentInsert(inputListVo);
				
				str_resData = "success";
			}
			catch(Exception ex1)
			{
				str_resData = ex1.toString();					
			}
			
		} else {
			
			str_resData = "false";
		}
		
		response.setContentType("text/html; charset=utf-8");
	    PrintWriter pw = response.getWriter();
		pw.print(str_resData);
		pw.flush();

	}
	
	/**
	 * 결재선 지정 저장(파라미터 명이 없을경우)
	 * @param searchVO - 목록  정보가 담긴 VO
	 * @param response
	 * @exception Exception
	 */
	@RequestMapping("/exp/payment/paymentAdminInsert_backup")
	public void paymentAdminInsert_backup(HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		String str_resData = "";
		
		String sh_payment_type = "";
		String approval_owner_id = "";
		String owner_id = "";
		String expanse_appoint_cd = "";
		
		int cnt = 0;
		
		//json 처리
		String body = null;
		StringBuilder stringBuilder = new StringBuilder();
		BufferedReader bufferedReader = null;

		try {
			InputStream inputStream = request.getInputStream();
			if (inputStream != null) {
				bufferedReader = new BufferedReader(new InputStreamReader(inputStream));
				char[] charBuffer = new char[128];
				int bytesRead = -1;
				while ((bytesRead = bufferedReader.read(charBuffer)) > 0) {
					stringBuilder.append(charBuffer, 0, bytesRead);
				}
			}
		} catch (Exception ex) {
			throw ex;
		} finally {
			if (bufferedReader != null) {
				try {
					bufferedReader.close();
				} catch (Exception ex) {
					throw ex;
				}
			}
		}

		//json -> string 변환
		body = stringBuilder.toString();
		
		//System.out.println(body);

		//로그인정보
		loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();
		
		int login_id       =  loginVO.getUser_id();
		
		//저장 및 업데이트 처리
		List<PaymentVO> inputListVo  = new ArrayList<PaymentVO>();
		
		JSONParser jsonParser = new JSONParser();
		JSONObject jsonObject = (JSONObject) jsonParser.parse(body);

		//결재요청구분
		sh_payment_type = (String) jsonObject.get("type");

		//기안자 정보(오브젝트 형태로 넘어옴)
		JSONObject selfObj= (JSONObject) jsonObject.get("self");
		//System.out.println("self is: " + selfObj);
		
		PaymentVO searchInfoSelfVO = new PaymentVO();		
		
		approval_owner_id = (String) selfObj.get("approval_owner_id");
		owner_id = (String) selfObj.get("owner_id");
		expanse_appoint_cd = "00"; //기안자 코드번호
		
		if (SpringStringUtil.isEmpty(approval_owner_id)) {
			approval_owner_id = null;
		}				
		
		searchInfoSelfVO.setSource_type_cd(sh_payment_type);
		searchInfoSelfVO.setApproval_owner_id(approval_owner_id);
		searchInfoSelfVO.setUser_id(String.valueOf(login_id));
		searchInfoSelfVO.setOwner_id(owner_id);
		searchInfoSelfVO.setExpanse_appoint_cd(expanse_appoint_cd);
		searchInfoSelfVO.setOrder_seq(String.valueOf(cnt));
		searchInfoSelfVO.setCreator(login_id);
		searchInfoSelfVO.setModifier(login_id);				
		
		inputListVo.add(searchInfoSelfVO);
		
		cnt++;

		//검토자 리스트 정보(Array형태로 넘어옴)
		JSONArray exArr= (JSONArray) jsonObject.get("ex");
		//System.out.println("ex is: " + exArr);
		
		Iterator<?> ex = exArr.iterator();

		while (ex.hasNext()) {
			PaymentVO searchInfoVO = new PaymentVO();
			
			JSONObject innerObj = (JSONObject) ex.next();
			
			approval_owner_id = (String) innerObj.get("approval_owner_id");
			owner_id = (String) innerObj.get("owner_id");
			expanse_appoint_cd = "01"; //검토자 코드번호
			
			if (SpringStringUtil.isEmpty(approval_owner_id)) {
				approval_owner_id = null;
			}				
			
			searchInfoVO.setSource_type_cd(sh_payment_type);
			searchInfoVO.setApproval_owner_id(approval_owner_id);
			searchInfoVO.setUser_id(String.valueOf(login_id));
			searchInfoVO.setOwner_id(owner_id);
			searchInfoVO.setExpanse_appoint_cd(expanse_appoint_cd);
			searchInfoVO.setOrder_seq(String.valueOf(cnt));
			searchInfoVO.setCreator(login_id);
			searchInfoVO.setModifier(login_id);				
			
			inputListVo.add(searchInfoVO);
			
			cnt++;
		}
		
		//승인자 리스트 정보(Array형태로 넘어옴)
		JSONArray okArr= (JSONArray) jsonObject.get("ok");
		//System.out.println("ok is: " + okArr);
		
		Iterator<?> ok = okArr.iterator();

		while (ok.hasNext()) {
			PaymentVO searchInfoVO = new PaymentVO();
			
			JSONObject innerObj = (JSONObject) ok.next();
			
			approval_owner_id = (String) innerObj.get("approval_owner_id");
			owner_id = (String) innerObj.get("owner_id");
			expanse_appoint_cd = "02"; //승인자 코드번호
			
			if (SpringStringUtil.isEmpty(approval_owner_id)) {
				approval_owner_id = null;
			}				
			
			searchInfoVO.setSource_type_cd(sh_payment_type);
			searchInfoVO.setApproval_owner_id(approval_owner_id);
			searchInfoVO.setUser_id(String.valueOf(login_id));
			searchInfoVO.setOwner_id(owner_id);
			searchInfoVO.setExpanse_appoint_cd(expanse_appoint_cd);
			searchInfoVO.setOrder_seq(String.valueOf(cnt));
			searchInfoVO.setCreator(login_id);
			searchInfoVO.setModifier(login_id);				
			
			inputListVo.add(searchInfoVO);
			
			cnt++;
		}
		
		//수신자 리스트 정보(Array형태로 넘어옴)
		JSONArray rcArr= (JSONArray) jsonObject.get("rc");
		//System.out.println("rc is: " + rcArr);
		
		Iterator<?> rc = rcArr.iterator();

		while (rc.hasNext()) {
			PaymentVO searchInfoVO = new PaymentVO();
			
			JSONObject innerObj = (JSONObject) rc.next();
			
			approval_owner_id = (String) innerObj.get("approval_owner_id");
			owner_id = (String) innerObj.get("owner_id");
			expanse_appoint_cd = "03"; //수신자 코드번호
			
			if (SpringStringUtil.isEmpty(approval_owner_id)) {
				approval_owner_id = null;
			}				
			
			searchInfoVO.setSource_type_cd(sh_payment_type);
			searchInfoVO.setApproval_owner_id(approval_owner_id);
			searchInfoVO.setUser_id(String.valueOf(login_id));
			searchInfoVO.setOwner_id(owner_id);
			searchInfoVO.setExpanse_appoint_cd(expanse_appoint_cd);
			searchInfoVO.setOrder_seq(String.valueOf(cnt));
			searchInfoVO.setCreator(login_id);
			searchInfoVO.setModifier(login_id);				
			
			inputListVo.add(searchInfoVO);
		}
		
		if(inputListVo.size() > 0) {
			
			try
			{
				//System.out.println(inputListVo);
				
				PaymentVO searchVO = new PaymentVO();
				
				searchVO.setSource_type_cd(sh_payment_type);
				searchVO.setCreator(login_id);
				
				//저장하기전 모든 데이터 삭제처리
				paymentService.paymentDelete(searchVO);
				
				//결재선 저장
				paymentService.paymentInsert(inputListVo);
				
				str_resData = "success";
			}
			catch(Exception ex1)
			{
				str_resData = ex1.toString();					
			}
			
		} else {
			
			str_resData = "false";
		}
		
		response.setContentType("text/html; charset=utf-8");
	    PrintWriter pw = response.getWriter();
		pw.print(str_resData);
		pw.flush();

	}
		
}
