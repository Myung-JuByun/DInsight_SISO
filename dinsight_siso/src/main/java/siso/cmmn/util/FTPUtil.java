package siso.cmmn.util;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.IOException;
import java.io.InputStream;

import javax.servlet.http.HttpServletResponse;

import org.apache.commons.net.ftp.FTP;
import org.apache.commons.net.ftp.FTPClient;
import org.apache.commons.net.ftp.FTPReply;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

/**
 * 서버와 연결하여 파일을 업로드하고, 다운로드한다.
 *
 * @author jsh
 * @since 2015-09-14
 *
 */
@Component
public class FTPUtil{
	
	private FTPClient ftp = null;
	
	/**
     * 서버와의 연결
     */
	public void init() {
		
		String ip = SpringProperties.getProperty("globals.fileStoreUrl");
    	String port = SpringProperties.getProperty("globals.fileStorePort");
    	String id = SpringProperties.getProperty("globals.fileStoreId");
    	String password = SpringProperties.getProperty("globals.fileStorePw");
        
        int reply;
        
        try {
            ftp = new FTPClient();
            ftp.setControlEncoding("UTF-8");
            ftp.connect(ip, Integer.parseInt(port));
            //System.out.println("Connected to " + ip + " on "+ftp.getRemotePort());
            
            // After connection attempt, you should check the reply code to verify
            // success.
            reply = ftp.getReplyCode();
            if (!FTPReply.isPositiveCompletion(reply)) {
                ftp.disconnect();
                System.err.println("FTP server refused connection.");
                System.exit(1);
            }
            
            if(!ftp.login(id, password)) {
                ftp.logout();
                throw new Exception("ftp 서버에 로그인하지 못했습니다.");
            }
            
            ftp.setFileType(FTP.BINARY_FILE_TYPE);
            ftp.enterLocalPassiveMode();
            
        } catch (Exception e) {
            e.printStackTrace();
        }
		
	}
	
	public boolean upload(MultipartFile file, String newName, 
    		String stordFilePath) {
		
		boolean isSuccess = false;
		InputStream stream = null;
        
        try {

            ftp.makeDirectory(stordFilePath);
            ftp.changeWorkingDirectory(stordFilePath);
            
            stream = file.getInputStream();
        	
            try {
                System.out.println(newName + " : 전송시작 = >");
                isSuccess = ftp.storeFile(newName, stream);
                System.out.println(newName + " : 전송결과 = >" + isSuccess);
            } catch(IOException e) {
                e.printStackTrace();
                isSuccess = false;
            } finally {
                if (stream != null) {
                    try {stream.close(); } catch(IOException e) {}
                }
            }//end try
            
            //ftp.logout();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
        	//this.disconnection();
        	try {
        		stream.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return isSuccess;
    }
	
	public BufferedInputStream download(String dir, String newName, HttpServletResponse response) {
		
		InputStream in = null;
    	BufferedInputStream fin = null;
    	BufferedOutputStream outs = null;
    	byte[] buffer = new byte[2048];
    	 
        try {
        	ftp.changeWorkingDirectory(dir);
           
            in = ftp.retrieveFileStream(dir+"/"+newName);
            fin = new BufferedInputStream(in);
            
            outs = new BufferedOutputStream(response.getOutputStream());
    	    int read = 0;
    	    int contentLength = 0; 
    		while ((read = fin.read(buffer)) != -1) {
    		    outs.write(buffer, 0, read);
    		    contentLength += read;
    		}
    		
    		outs.flush();
    	    response.setContentLength(contentLength);
    	    
        } catch (IOException ex) {
            System.out.println("Error: " + ex.getMessage());
            ex.printStackTrace();
        }finally {
        	try {
        		in.close();
        		fin.close();
        		this.disconnection();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        
        return fin;
	}
	
	public BufferedInputStream connectDownload(String ip, int port, String id, String password, 
			String dir, String newName, HttpServletResponse response) {
		
		InputStream in = null;
    	BufferedInputStream fin = null;
    	BufferedOutputStream outs = null;
    	byte[] buffer = new byte[2048];
    	
    	int reply;
 	 
        try {
        	ftp = new FTPClient();
            ftp.setControlEncoding("UTF-8");
            ftp.connect(ip, port);
            //System.out.println("Connected to " + ip + " on "+ftp.getRemotePort());
            
            // After connection attempt, you should check the reply code to verify
            // success.
            reply = ftp.getReplyCode();
            if (!FTPReply.isPositiveCompletion(reply)) {
                ftp.disconnect();
                System.err.println("FTP server refused connection.");
                System.exit(1);
            }
            
            if(!ftp.login(id, password)) {
                ftp.logout();
            }
            
            ftp.setFileType(FTP.BINARY_FILE_TYPE);
            ftp.enterLocalPassiveMode();
            
        	ftp.changeWorkingDirectory(dir);
           
            in = ftp.retrieveFileStream(dir+"/"+newName);
            fin = new BufferedInputStream(in);
            
            outs = new BufferedOutputStream(response.getOutputStream());
    	    int read = 0;
    	    int contentLength = 0; 
    		while ((read = fin.read(buffer)) != -1) {
    		    outs.write(buffer, 0, read);
    		    contentLength += read;
    		}
    		
    		outs.flush();
    	    response.setContentLength(contentLength);
    	    
        } catch (IOException ex) {
            System.out.println("Error: " + ex.getMessage());
            ex.printStackTrace();
        }finally {
        	try {
        		in.close();
        		fin.close();
        		this.disconnection();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        
        return fin;
	}
	
	/**
     * 서버와의 연결을 끊는다.
     */
    public void disconnection() {
    	if (ftp != null && ftp.isConnected()) {
            try { ftp.disconnect(); } catch (IOException e) {}
        }
    }
}
