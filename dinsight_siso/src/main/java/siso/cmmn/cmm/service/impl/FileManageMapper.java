package siso.cmmn.cmm.service.impl;

import java.util.List;
import org.springframework.stereotype.Component;

import siso.cmmn.util.FileVO;

/**
 * @Class Name : FileManageMapper.java
 * @Description : 파일정보 관리를 위한 데이터 처리 클래스
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


@Component
public interface FileManageMapper {   
    
	public void insertFileMaster(FileVO vo) throws Exception;
    
    public void insertFileDetail(FileVO vo) throws Exception; 
    
    public void deleteFileDetail(FileVO vo) throws Exception;
    
    public List<FileVO> selectFileList(FileVO vo) throws Exception;
    
    public FileVO selectFileInf(FileVO fvo) throws Exception;
    
    public int getMaxFileSN(FileVO fvo) throws Exception;

    public void deleteCOMTNFILE(FileVO fvo) throws Exception;
    
    public List<FileVO> selectFileListByFileNm(FileVO fvo) throws Exception;

    public int selectFileListCntByFileNm(FileVO fvo) throws Exception;

    public List<FileVO> selectImageFileList(FileVO vo) throws Exception;
}
