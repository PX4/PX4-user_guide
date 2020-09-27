// .vuepress/get_sidebar.js

const englishSidebar = require('./english_sidebar.js');

const path = require('path');
const fs = require('fs');
const readline = require('readline');

module.exports = {
   sidebar: function(lang) {
      summaryfile_path=path.resolve(__dirname, '..',lang,'SUMMARY.md')
      console.log('HAMISH: summaryfile_path? ' + summaryfile_path);
      

      let indent_divider=0;
      let lines;

      try {
          // read contents of the file
          const data = fs.readFileSync(summaryfile_path, 'UTF-8');
          // split the contents by new line
          lines = data.split(/\r?\n/);
          //add dummy entry at the end. 
          //This does not get included but forces all collections to be added to final output. 
          lines.push('* [DUMMY1 SHOULD NOT APPEAR IN OUTPUT](DUMMY.md)');
    
      } catch (err) {
          //console.error(err);
          return [ ['/'+lang+'/','SIDEBAR  DEFINITION NOT FOUND'],]
      }


      let module_sidebar = new Array();

try {


    // print all lines
    lastlevel=0;
    parents=[];
    parents.push(module_sidebar);
    
    let last_item={};
    let first_iteration = true;
    
    lines.forEach((line) => {
        console.log(line);
        

        let regex = /(\s*?)\*\s\[(.*?)\]\((.*?)\)/g;

        try {
        
            //console.log('DEBUG: Lastitem at start: '+ last_item);
            let match = regex.exec(line)
            //console.log('0: '+ match[0])
            indent_level=match[1].length;
            link_title = match[2];
            link_url = match[3].trim();
                
            if (link_url.endsWith('README.md')) {
                link_url=link_url.replace('README.md', '');
            }
            if (link_url.endsWith('.md')) {
                link_url=link_url.replace('.md', '')
            }
            if (!link_url.startsWith('http')) {
                link_url = '/'+lang+'/'+link_url;
            }
            
            //set indent_divider level (easier to think in levels, numbers of zero prefixes)            
            if (indent_divider == 0 & indent_level > 0.0) {
                indent_divider=indent_level;
            
            }
            if (indent_divider > 0) {
                indent_level= indent_level/indent_divider;
            }
            

            //First iteration skips rest of processing except for saving the line.
            // We process lines on the next iteration, because it is the next item which tells us if 
            // this line has children or whatever. 
            if (first_iteration == true) 
                {
                first_iteration = false;
                }
            else{

                //Process the last line, based on whehter it is a parent, peer or child

                //console.log(' DEBUG: HANDLING (last):' + last_item.title + 'last_item.level:' + last_item.level)
                //console.log('  DEBUG indent_level: '+ indent_level);
                if (indent_level > lastlevel) {
                    //console.log('  NEST: (child)'+ lastlevel+'/'+ indent_level)
                    //The parent of this is a new child group. So we need to create it as such and make it a parent.
                    let new_parent = {};
                    new_parent.title = last_item.title;
                    new_parent.path = last_item.path;
                    new_parent.sidebarDepth = 1;
                    new_parent.children = [];
                    console.log('  Adding new_parent: ' + new_parent.title)
                    parents.push(new_parent)
                }
                else if (indent_level < lastlevel) {
                    do {

                    //we have gone up at least one level with new line
                    //Last line needs to be added to its parent.
                
                    finished_collection = parents.pop();
                    let entry = new Array(last_item.path,last_item.title);
                    //console.log('   - DEBUG: Current_parent: '+ finished_collection.title)
                    //console.log('   - DEBUG: Current_parent.children: '+ finished_collection.children)
                    if (typeof finished_collection.children !== 'undefined') {
                        //console.log('   - DEBUG: Add to group (has child var)' + finished_collection.title);
                        finished_collection.children.push(entry);
                    }
                    else {
                        //parent is array
                        console.log('   - DEBUG: Add to top level');
                        finished_collection.push(entry);
                    }
                    //Then need to pop current parent and add it as complete thingy to its parent
                
                    //console.log('  - DEBUG: Group Finished:'+ lastlevel+'/'+ indent_level + ': ' + finished_collection.title)
                    current_parent = parents.pop();
                    if (typeof current_parent.children !== 'undefined') {
                        //console.log('  DEBUG: Add finished_collection to its parent (group)' + current_parent.title);
                        current_parent.children.push(finished_collection);
                    }
                    else {
                        //parent is array
                        //console.log('  DEBUG: Add finished_collection to top level:' + current_parent);
                        current_parent.push(finished_collection);
                    }
                    parents.push(current_parent); //Add back the parent.
                    //add parent to its parent.
                
                    //console.log('  DEBUG: current parent pop debug:'+current_parent)
                    lastlevel--;
                    }
                    while (indent_level < lastlevel)
                    }
                else {
                    //console.log('  - DEBUG: Same level item - just add to the current parent - indent:'+ indent_level)
                    let entry = new Array(last_item.path,last_item.title);
                    current_parent = parents.pop();
                    //console.log('   - DEBUG: Current_parent: '+ current_parent.title)
                    //console.log('   - DEBUG: Current_parent.children: '+ current_parent.children)
                    if (typeof current_parent.children !== 'undefined') {
                        //console.log('   - DEBUG: Add to group (has child var)' + current_parent.title);
                        current_parent.children.push(entry);
                    }
                    else {
                        //parent is array
                        //console.log('   - DEBUG: Add to top level');
                        current_parent.push(entry);
                    }
                    parents.push(current_parent); //Add back the parent.
                }            
            
            } //end of check on first_iterations
            
            //Save this item; it gets processed in the next round, when we know if is a parent or a child.
            last_item.path=link_url;
            last_item.title=link_title;       
            last_item.level=indent_level;
            
            lastlevel=indent_level; //reset
            }
        catch (err) {
            console.log(err)
            console.log("SOME TERRIBLE PROBLEM")
        }
        
        
    });
} catch (err) {
    console.error(err);
}


      return module_sidebar;
   }
}

