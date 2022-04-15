package siso.exp.reference.web;

import java.io.PrintWriter;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;
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
import siso.cmmn.cmm.service.SpringCmmUseService;
import siso.cmmn.cmm.service.SpringPageInitService;
import siso.cmmn.util.SpringFileMngUtil;
import siso.cmmn.util.SpringUserDetailsHelper;
import siso.cmmn.util.SFTPUtil;
import siso.exp.reference.service.ReferenceService;
import siso.exp.reference.service.ReferenceVO;
import siso.sys.service.LoginVO;

import com.fasterxml.jackson.databind.ObjectMapper;


/**
 * @Class Name : ApprovalController.java
 * @Description : ApprovalController Class
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
//@SessionAttributes(types = ExpanseAdminVO.class)
public class ReferenceController {
	
	/** ReferenceService */
	@Autowired
	private ReferenceService referenceService;

	@Autowired
	protected SpringPageInitService springPageInitService;	
    
	@Autowired
    protected SpringCmmUseService springCmmUseService;      
	
	private SpringFileMngUtil fileUtil;	
    private LoginVO loginVO;
    
	//private static final Logger logger = LoggerFactory.getLogger(ExpanseController.class);
    
	/**
	 * 자료실 목록 조회
	 * @param searchVO - 조회할 정보가 담긴 ReferenceVO
	 * @param model
	 * @param response
	 * @return "/exp/reference/referenceList"
	 * @exception Exception
	 */
	@RequestMapping(value = "/exp/reference/referenceListAjax")
	public void selectReferenceListAjax(@ModelAttribute("searchVO") ReferenceVO searchVO, ModelMap model, HttpServletResponse response) throws Exception {
		
		String str_resData = "";
				
		//회원정보
		loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();
		//int login_id       =  loginVO.getUserId();
		
		//자료실목록 조회
		List<ReferenceVO> refList = referenceService.selectReferenceList(searchVO);
		
		String isMng="N";
		if(loginVO.getGrant_id() != null){
			String[] ArrGrantId = loginVO.getGrant_id().split(",");
			
			for(int i=0; i<ArrGrantId.length; i++){
				if(Integer.parseInt(ArrGrantId[i]) == 2) {
					isMng="Y"; //관리자 이면
					continue;
				}
			}
		}else{
			isMng="N";
		}		
		
		HashMap<String,Object> rtnMap = new HashMap<String,Object>();
		rtnMap.put("isMng", isMng);
		rtnMap.put("refList", refList);
		
		ObjectMapper om = new ObjectMapper();
	    str_resData = om.writeValueAsString(rtnMap);
		
		response.setContentType("text/html; charset=utf-8");
	    PrintWriter pw = response.getWriter();
		pw.print(str_resData);
		pw.flush();
	}
	
	/**
	 * 자료실 파일 다운로드
	 * @param searchVO (reference_room_id - 파일 고유 id)
	 * @param model
	 * @param response
	 * @exception Exception
	 */
	@RequestMapping(value = "/exp/reference/referenceDownloadAjax")
	@ResponseBody
	public void referenceDownloadAjax(@ModelAttribute("searchVO") ReferenceVO searchVO
						, ModelMap model
						, HttpServletRequest request
						, HttpServletResponse response
						, Map<String, String> commandMap) throws Exception {
		response.setContentType("text/html; charset=utf-8");
		String str_resData = "";
		Map<String, Object> map = new HashMap<String, Object>();
		loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();
		int login_id       =  loginVO.getUser_id();
		searchVO.setCreator(login_id);
		searchVO.setModifier(login_id);
		
		try {
			ReferenceVO referenceFile = new ReferenceVO();
			referenceFile = referenceService.selectReferenceFiledown(searchVO);
			request.setAttribute("downFilePath", referenceFile.getReference_file_path());
			request.setAttribute("downFile", referenceFile.getReference_file_id());
			request.setAttribute("orgFileName", referenceFile.getReference_file_name());
			fileUtil.downFile(request, response);
		} catch (Exception ex) {
			str_resData = ex.toString();
		}
	}
	
	/**
	 * 자료실 파일 저장
	 */
	@RequestMapping(value = "/exp/reference/saveReferenceAjax")
	@ResponseBody
	public void saveReferenceAjax(@ModelAttribute("searchVO") ReferenceVO searchVO
						, ModelMap model
						, HttpServletRequest request
						, HttpServletResponse response
						, Map<String, String> commandMap) throws Exception {
						 
		response.setContentType("text/html; charset=utf-8");
	    PrintWriter pw = response.getWriter();
		String str_resData = "";
		Map<String, Object> map = new HashMap<String, Object>();
		loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();
		int login_id       =  loginVO.getUser_id();
		searchVO.setCreator(login_id);
		searchVO.setModifier(login_id);
				
		//파일 업로드
	    MultipartHttpServletRequest mptRequest = (MultipartHttpServletRequest)request;
	    
	    Map<String, MultipartFile> files = mptRequest.getFileMap();
	    Iterator<Entry<String, MultipartFile>> fileIter = files.entrySet().iterator();
	    
	    String pattern = "yyyyMMddhhmmssSSS";
	    SFTPUtil sftpUtil = new SFTPUtil();
	    sftpUtil.init();
	    while (fileIter.hasNext()) {
            Entry<String, MultipartFile> entry = fileIter.next();
            MultipartFile mFile = entry.getValue();

            if (mFile.getSize() > 0) {

            	SimpleDateFormat sdfCurrent = new SimpleDateFormat(pattern, Locale.KOREA);
            	Timestamp ts = new Timestamp(System.currentTimeMillis());
           	    String rtnStr = sdfCurrent.format(ts.getTime());

           	    // SFTPUtil 클래스사용(느려. 네트웍문제인가?)
           	    sftpUtil.upload(mFile, rtnStr, "/home/rnt/APP/repository/upload/reference/");
            	searchVO.setReference_file_id(rtnStr);
				searchVO.setReference_file_path("/home/rnt/APP/repository/upload/reference/");
				searchVO.setReference_file_name(mFile.getOriginalFilename());
            	
				// EgovFileMngUtil 클래스사용(이것도느려. 네트웍문제인가?)
//		    	 HashMap _map = fileUtil.uploadFile(mFile, "reference");
//		    	//아래 코드 대신에 데이터베이스에 저장하기 위해서 Map에 담는 코드를 넣으면 된다.
//		        System.out.println("[ "+Globals.FILE_PATH+" : "+_map.get(Globals.FILE_PATH)+" ]");
//			    System.out.println("[ "+Globals.FILE_SIZE+" : "+_map.get(Globals.FILE_SIZE)+" ]");
//			    System.out.println("[ "+Globals.ORIGIN_FILE_NM+" : "+_map.get(Globals.ORIGIN_FILE_NM)+" ]");
//			    System.out.println("[ "+Globals.UPLOAD_FILE_NM+" : "+_map.get(Globals.UPLOAD_FILE_NM)+" ]");
//			    System.out.println("[ "+Globals.FILE_EXT+" : "+_map.get(Globals.FILE_EXT)+" ]");
//			    searchVO.setReference_file_id((String)_map.get(Globals.UPLOAD_FILE_NM));
//				searchVO.setReference_file_path((String)_map.get(Globals.FILE_PATH));
//				searchVO.setReference_file_name((String)_map.get(Globals.ORIGIN_FILE_NM));
	    	}
	    }
	    
	    sftpUtil.disconnection();
	    try {
	    	referenceService.saveReference(searchVO);
		} catch (Exception ex) {
			str_resData = ex.toString();
			pw.print("fail");
			pw.flush();
		}
		map.put("status", "success");
		ObjectMapper om = new ObjectMapper();
		str_resData = om.writeValueAsString(map);
		
		pw.print(str_resData);
		pw.flush();
	}
	
	/**
	 * 자료실 파일 삭제
	 */
	@RequestMapping(value = "/exp/reference/deleteReferenceAjax")
	@ResponseBody
	public void deleteReferenceAjax(@ModelAttribute("searchVO") ReferenceVO searchVO
			, ModelMap model, HttpServletResponse response) throws Exception {
		String str_resData 			=	"";
		HashMap<String, Object> resultMap = new HashMap<String, Object>();
		
		try {
			
			//로그인정보
			loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();
			int login_id       		=	loginVO.getUser_id();
			
			searchVO.setModifier(login_id);
			
			/*List<ReferenceVO> inputListVO = new ArrayList<ReferenceVO>();
			
			for(int cnt=0; cnt < searchVO.getReference_room_ids().length; cnt++) {
				
				ReferenceVO referenceVO = new ReferenceVO();
				
				referenceVO.setReference_room_id(searchVO.getReference_room_ids()[cnt]);
				referenceVO.setModifier(login_id);
			
				inputListVO.add(referenceVO);
			}*/
			
			referenceService.deleteReference(searchVO);
			resultMap.put("resultCode", "success");
		} catch(Exception ex) {
			ex.printStackTrace();
			str_resData = "fail";
		}
		
		ObjectMapper om = new ObjectMapper();
	    str_resData = om.writeValueAsString(resultMap);
		
		response.setContentType("text/html; charset=utf-8");
	    PrintWriter pw = response.getWriter();
		pw.print(str_resData);
		pw.flush();
	}
}
