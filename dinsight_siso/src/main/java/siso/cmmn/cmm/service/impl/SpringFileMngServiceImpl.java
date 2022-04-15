package siso.cmmn.cmm.service.impl;

import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import siso.cmmn.cmm.service.SpringFileMngService;
import siso.cmmn.util.FileVO;

/**
 * @Class Name : SpringFileMngServiceImpl.java
 * @Description : 파일정보의 관리를 위한 구현 클래스
 * @Modification Information
 *
 *    수정일       수정자         수정내용
 *    -------        -------     -------------------
 *    2009. 3. 25.     이삼섭    최초생성
 *
 * @author 공통 서비스 개발팀 이삼섭
 * @since 2009. 3. 25.
 * @version
 * @see
 *
 */
@Service
public class SpringFileMngServiceImpl implements SpringFileMngService {
	
	@Autowired
	public SqlSession sqlSession;	
	public FileManageMapper fileManageMapper;    
    public static final Logger LOGGER = Logger.getLogger(SpringFileMngServiceImpl.class.getName());
    
    public SpringFileMngServiceImpl(SqlSession sqlSession) {
    	this.sqlSession = sqlSession;
    	this.fileManageMapper = sqlSession.getMapper(FileManageMapper.class);
    }

    /**
     * 여러 개의 파일을 삭제한다.
     * 
     */
    @Override
    @SuppressWarnings("rawtypes")
	public void deleteFileInfs(List fvoList) throws Exception {
    	Iterator iter = fvoList.iterator();
    	FileVO vo = new FileVO();
    	while (iter.hasNext()) {
    	    vo = (FileVO)iter.next();    	    
    	    fileManageMapper.deleteFileDetail(vo);
    	}    	
    }

    /**
     * 하나의 파일에 대한 정보(속성 및 상세)를 등록한다.
     * 
     */
    @Override
    public String insertFileInf(FileVO fvo) throws Exception {
		String atchFileId = fvo.getAtchFileId();		
		fileManageMapper.insertFileMaster(fvo);
		fileManageMapper.insertFileDetail(fvo);
		return atchFileId;
    }

    /**
     * 여러 개의 파일에 대한 정보(속성 및 상세)를 등록한다.
     * 
     */
    @Override
    @SuppressWarnings("rawtypes")
	public String insertFileInfs(List fvoList) throws Exception {
		String atchFileId = "";
		
		if (fvoList.size() != 0) {
			FileVO vo = (FileVO)fvoList.get(0);
			atchFileId = vo.getAtchFileId();
			
			fileManageMapper.insertFileMaster(vo);

			Iterator iter = fvoList.iterator();
			while (iter.hasNext()) {
			    vo = (FileVO)iter.next();
			    fileManageMapper.insertFileDetail(vo);
			}
		}		    
		
		if(atchFileId == "")
			atchFileId = null;
		
		return atchFileId;
    }

    /**
     * 파일에 대한 목록을 조회한다.
     * 
     */
    @Override
    public List<FileVO> selectFileInfs(FileVO fvo) throws Exception {
    	return fileManageMapper.selectFileList(fvo);
    }

    /**
     * 여러 개의 파일에 대한 정보(속성 및 상세)를 수정한다.
     *  
     */
    @Override
    @SuppressWarnings("rawtypes")
	public void updateFileInfs(List fvoList) throws Exception {
    	FileVO vo = new FileVO();
    	Iterator iter = fvoList.iterator();
    	while (iter.hasNext()) {
    	    vo = (FileVO)iter.next();
    	    fileManageMapper.insertFileDetail(vo);
    	}    	    	
    }

    /**
     * 하나의 파일을 삭제한다.
     * 
     */
    @Override
    public void deleteFileInf(FileVO fvo) throws Exception {
    	fileManageMapper.deleteFileDetail(fvo);
    }

    /**
     * 파일에 대한 상세정보를 조회한다.
     *    
     */
    @Override
    public FileVO selectFileInf(FileVO fvo) throws Exception {
    	return fileManageMapper.selectFileInf(fvo);
    }

    /**
     * 파일 구분자에 대한 최대값을 구한다.
     *  
     */
    @Override
    public int getMaxFileSN(FileVO fvo) throws Exception {
    	return fileManageMapper.getMaxFileSN(fvo);
    }

    /**
     * 전체 파일을 삭제한다.
     * 
     */
    @Override
    public void deleteAllFileInf(FileVO fvo) throws Exception {
    	fileManageMapper.deleteCOMTNFILE(fvo);
    }

    /**
     * 파일명 검색에 대한 목록을 조회한다.
     *  
     */
    @Override
    public Map<String, Object> selectFileListByFileNm(FileVO fvo) throws Exception {
		List<FileVO>  result = fileManageMapper.selectFileListByFileNm(fvo);
		int cnt = fileManageMapper.selectFileListCntByFileNm(fvo);
	
		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put("resultList", result);
		map.put("resultCnt", Integer.toString(cnt));
	
		return map;
    }

    /**
     * 이미지 파일에 대한 목록을 조회한다.
     *  
     */
    @Override
    public List<FileVO> selectImageFileList(FileVO vo) throws Exception {
    	return fileManageMapper.selectImageFileList(vo);
    }
}
