package siso.cmmn.util;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;

import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.jcraft.jsch.Channel;
import com.jcraft.jsch.ChannelSftp;
import com.jcraft.jsch.JSch;
import com.jcraft.jsch.JSchException;
import com.jcraft.jsch.Session;
import com.jcraft.jsch.SftpATTRS;
import com.jcraft.jsch.SftpException;

/**
 * 서버와 연결하여 파일을 업로드하고, 다운로드한다.
 *
 * @author jsh
 * @since 2015-09-14
 *
 */

@Component
public class SFTPUtil{
    private Session session = null;

    private Channel channel = null;

    private ChannelSftp channelSftp = null;
    
    /**
     * 서버와 연결에 필요한 값들을 가져와 초기화 시킴
     *
     * @param host
     *            서버 주소
     * @param userName
     *            접속에 사용될 아이디
     * @param password
     *            비밀번호
     * @param port
     *            포트번호
     */
    public void init() {
        JSch jsch = new JSch();
    	String ip = SpringProperties.getProperty("Globals.fileStoreUrl");
    	String port = SpringProperties.getProperty("Globals.fileStorePort");
    	String id = SpringProperties.getProperty("Globals.fileStoreId");
    	String password = SpringProperties.getProperty("Globals.fileStorePw");
    	
        try {
            session = jsch.getSession(id, ip, Integer.parseInt(port));
            session.setPassword(password);

            java.util.Properties config = new java.util.Properties();
            config.put("StrictHostKeyChecking", "no");
            session.setConfig(config);
            session.connect();

            channel = session.openChannel("sftp");
            channel.connect();
        } catch (JSchException e) {
            e.printStackTrace();
        }

        channelSftp = (ChannelSftp) channel;
    }

    /**
     * 하나의 파일을 업로드 한다.
     *
     * @param dir
     *            저장시킬 주소(서버)
     * @param file
     *            저장할 파일
     */
    public void upload(MultipartFile file, String newName, String stordFilePath) {
    	String uploadPath = SpringProperties.getProperty("Globals.fileStorePath");
        InputStream in = null;
		
        try {
        	String stordFilePathDiff = stordFilePath.replace(uploadPath, "");
        	
        	String[] folders = stordFilePathDiff.split("/");
        	channelSftp.cd(uploadPath);
        	
        	for(String folder : folders){
        		String currentDirectory=channelSftp.pwd();
        		
            	String dir=folder;
            	SftpATTRS attrs=null;
            	
        		if(!dir.equals("") && dir != null){
        			try {
                	    attrs = channelSftp.stat(currentDirectory+"/"+dir);
                	} catch (Exception e) {
                	    System.out.println(currentDirectory+"/"+dir+" not found");
                	}

                	if (attrs != null) {
                	    System.out.println("Directory exists IsDir="+attrs.isDir());
                	    channelSftp.cd(dir);
                	} else {
                	    System.out.println("Creating dir "+dir);
                	    channelSftp.mkdir(dir);
                	    channelSftp.cd(dir);
                	}
        		}
        	}
            
            channelSftp.cd(stordFilePath);
            in = file.getInputStream();
            channelSftp.put(in, newName);
        } catch (SftpException e) {
            e.printStackTrace();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (Exception e) {
        	e.printStackTrace();
        }finally {
            try {
                in.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    /**
     * 하나의 파일을 다운로드 한다.
     *
     * @param dir
     *            저장할 경로(서버)
     * @param downloadFileName
     *            다운로드할 파일
     * @param path
     *            저장될 공간
     */
    public void download(String dir, String downloadFileName, String path) {
        InputStream in = null;
        FileOutputStream out = null;
        try {
            channelSftp.cd(dir);
            in = channelSftp.get(downloadFileName);
        } catch (SftpException e) {
            e.printStackTrace();
        }

        try {
            out = new FileOutputStream(new File(channelSftp.lpwd()));
            int i;

            while ((i = in.read()) != -1) {
                out.write(i);
            }
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
            	in.close();
                out.close();
                this.disconnection();
            } catch (IOException e) {
                e.printStackTrace();
            }

        }

    }
    
    public BufferedInputStream downloadStream(String dir
    		, String downloadFileName
    		, HttpServletResponse response) throws IOException {
    	InputStream in = null;
    	BufferedInputStream fin = null;
    	BufferedOutputStream outs = null;
    	 byte[] buffer = new byte[4096];
    	 
        try {
            channelSftp.cd(dir);
           
            in = channelSftp.get(downloadFileName);
            fin = new BufferedInputStream(in);
            
            outs = new BufferedOutputStream(response.getOutputStream());
    	    int read = 0;
    	    //int contentLength = 0; 
    		while ((read = fin.read(buffer)) != -1) {
    		    outs.write(buffer, 0, read);
    		    //contentLength += read;
    		}
    		
    		outs.flush();
    	    //response.setContentLength(contentLength);
    	    
        } catch (SftpException e) {
            e.printStackTrace();
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
    
    public void delete(String dir, String downloadFileName) {
    	this.init();
        
        try {
        	channelSftp.cd(dir);
        	channelSftp.rm(downloadFileName);
        } catch (SftpException e) {
            e.printStackTrace();
        } finally {
        	this.disconnection();
        }
    }

    /**
     * 서버와의 연결을 끊는다.
     */
    public void disconnection() {
        channelSftp.quit();
    }
}
