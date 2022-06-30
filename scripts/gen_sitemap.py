#! /usr/bin/python

"""

"""

#import lxml.etree as ET
#import requests
#from bs4 import BeautifulSoup as bs
import re
import os # for walk, evironment vars
import subprocess #so I can use git to get the modified dates.
import argparse



dir_name='.'
#git log -1 --format="%as" -- .\zh\uavcan\notes.md

include_dirs = set(['en','zh','ko']) #update for new language builds.

my_parser = argparse.ArgumentParser(description='Generate sitemap for all markdown files in directory (default to main for output)')
# Add the arguments                      
my_parser.add_argument('-v',
                       '--version',
                       action='store',
                       type=str,
                       #nargs=1,
                       default='main')
my_parser.add_argument('-d',
                       '--date',
                       action='store_true',
                       help='generate date information')
my_parser.add_argument('-o',
                       '--output',
                       action='store',
                       type=str,
                       #nargs=1,
                       default='./.vuepress/dist/')

# Execute the parse_args() method
args = my_parser.parse_args()
build_version = args.version

#Get build version from process env by preference.
BRANCH_NAME = os.getenv('BRANCH_NAME')
if BRANCH_NAME:
    build_version=BRANCH_NAME
    
url_prefix = 'https://docs.px4.io/%s' % build_version

sitemapitems=[]

for subdir, dirs, files in os.walk(dir_name, topdown=True):
    dirs[:] = [d for d in dirs if d in include_dirs]

    for file in files:
        sitemapitem = dict()
        sitemapitem['changefreq']='daily'
        if not file.endswith('.md'): #only process md files.
           #print("Skip not md: %s" % file)
           continue
        originalfile=subdir+'\\'+file
        dir_name=subdir[2:].replace('\\','/')
        orig_file_forwardslash=originalfile.replace('\\','/')
        #git log -1 --format="%as" -- .\zh\uavcan\notes.md
        if args.date:
            modified_datestamp = subprocess.run(["git", "log", "-1", '--format="%as"', "--", "%s" % orig_file_forwardslash],capture_output=True).stdout.decode('UTF-8')
            sitemapitem['modified']=modified_datestamp.strip().strip('"')
            #print("XX %s" % modified_datestamp)
        file_name=file[:-3]+'.html'
        if file_name.startswith('README'):
            file_name=''
        url="%s/%s/%s" % (url_prefix, dir_name,file_name)
        sitemapitem['url']=url


        if subdir == '.':
            #print("RootFile: %s" % originalfile)
            #Handle a root file.
            continue

        #print("OrigFile: %s" % originalfile)
        #print("dir_name: %s" % dir_name)
        #print("Subdir: %s" % subdir )
        #print("file_name: %s" % file_name)
        #print(sitemapitem['url'])
        
        sitemapitems.append(sitemapitem)
        
        
        
# Generate the sitemap from the sitemapitems
urltext=''
for item in sitemapitems:
   urltext+='  <url>\n'
   urltext+=f"    <loc>{item['url']}</loc>\n"
   urltext+=f"    <changefreq>{item['changefreq']}</changefreq>\n"
   if args.date:
       urltext+=f"    <lastmod>{item['modified']}</lastmod>\n"
   urltext+='  </url>\n'
   
   urltext+=urltext


sitemaptext = '''<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
%s</urlset>
''' % urltext

# Write the sitemap to file
outputfile=args.output+'sitemap.xml'
with open(outputfile,"w") as f: 
    f.write(sitemaptext)

print("Sitemap generated to: %s" % outputfile)


#print("BRANCH_NAME: %s" % BRANCH_NAME)
#print("Build version: %s" % build_version)

