#! /usr/bin/python

"""

"""

#import lxml.etree as ET
#import requests
#from bs4 import BeautifulSoup as bs
import re
import os # for walk
import subprocess #so I can use git to get the modified dates.

dir_name='.'
build_version = 'master'
url_prefix = 'https://docs.px4.io/%s' % build_version
#git log -1 --format="%as" -- .\zh\uavcan\notes.md

exclude = set(['node_modules', '.git', '.vuepress', 'assets','.github','de','ja','ru','tr'])
for subdir, dirs, files in os.walk(dir_name, topdown=True):
    dirs[:] = [d for d in dirs if d not in exclude]
    print('X: %s' % subdir)

    for file in files:
        if not file.endswith('.md'): #only process md files.
           #print("Skip not md: %s" % file)
           continue
        originalfile=subdir+'\\'+file
        dir_name=subdir[2:].replace('\\','/')
        orig_file_forwardslash=originalfile.replace('\\','/')
        #git log -1 --format="%as" -- .\zh\uavcan\notes.md
        modified_datestamp = subprocess.run(["git", "log", "-1", '--format="%as"', "--", "%s" % orig_file_forwardslash],capture_output=True).stdout.decode('UTF-8')
        print("XX %s" % modified_datestamp)
        file_name=file[:-3]+'.html'
        if file_name.startswith('README'):
            file_name=''
        print("file_name: %s" % file_name)
        print("dir_name: %s" % dir_name)
        targetfile="%s/%s/%s" % (url_prefix, dir_name,file_name)
        print("file: %s" % file)
        print("targetfile: %s" % targetfile)





        if subdir == '.':
            print("RootFile: %s" % originalfile)
            #Handle a root file.
            continue

        print("OrigFile: %s" % originalfile)
        #print("Subdir: %s" % subdir )
        
        redirect_file_text="""<!DOCTYPE HTML>
<html data-proofer-ignore>
<head>
<meta charset='UTF-8'>
<title>Redirecting to latest version of documentation</title>
<link rel='canonical' href='%s'>
<meta http-equiv=refresh content='0; url=%s'>
</head>
<body>
<h1>Document moved to PX4 User Guide. Redirecting.</h1>
<p><a href='%s'>Click here if you are not redirected</a></p>
<script>window.location.href='%s';</script>
</body></html>
""" % (targetfile,targetfile,targetfile,targetfile)
        #print("redirect_file_text: %s" % redirect_file_text)
        pass
        
        #write the file
        #with open(originalfile, 'w') as content_file:
        #    content_file.write(redirect_file_text)
        #    pass

print("COMPLETED")
