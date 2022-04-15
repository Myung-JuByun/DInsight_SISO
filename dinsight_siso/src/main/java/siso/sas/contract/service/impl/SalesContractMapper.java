package siso.sas.contract.service.impl;

import java.util.List;


import org.springframework.stereotype.Component;
import siso.sas.contract.service.SalesContractSearchVO;
import siso.sas.contract.service.SalesContractVO;

/**
 * @Class Name : ProjectAdminDAO.java
 * @Description : ProjectAdminDAO Class
 * @Modification Information 2009.03.16 최초생성
 * 
 * @author 개발프레임웍크 실행환경 개발팀
 * @since 2009. 03.16
 * @version 1.0
 * @see Copyright (C) by MOPAS All right reserved.
 */


@Component
public interface SalesContractMapper{
	
	public List<SalesContractVO> selectSalesContractSearchList(SalesContractSearchVO vo) throws Exception;
	
	public List<SalesContractVO> selectSalesContractRivisionList(SalesContractSearchVO vo) throws Exception;
	
	public SalesContractVO selectCountSalesContract(SalesContractSearchVO vo) throws Exception;
	
	public void saveSalesContract(SalesContractSearchVO vo) throws Exception;
	
	public SalesContractVO selectContractFiledown(SalesContractSearchVO vo) throws Exception;
}
