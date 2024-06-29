import React  from 'react' 
import { Collapse } from '@kunukn/react-collapse'

//import '../../../browser/widget/FolderBar/styles.css';

import { DirectoryArrowSVG } from '../../../../land/icons/index.js';
import { IRowItem } from '../Base/RowItem.js';
 
 
import OverlayTrigger from 'react-bootstrap/cjs/OverlayTrigger.js';
import Tooltip from 'react-bootstrap/cjs/Tooltip.js';

//import { Tooltip, OverlayTrigger } from '../../bootstrap.js';
//import TableView from 'react-table-view'
import { JsonToTable } from "react-json-to-table";
//import '../../../browser/style/json-table.css';

const trimHolderInfo=(title: string)=>{ 
    title = title.replace('/Users/icoco','')
    title = title.replace('/WorkSpace/2024/prj/odoo/odoo-space-17','')
    title = title.replace('/WorkSpace/2024/prj/odoo/kit/git','/WorkSpace')
    return title;
}
    
export const FolderBar =  (
  {key,documentId,rowData,onPickRow,children}:
  {key:string, documentId: string;rowData:IRowItem;  onPickRow:(row:any|Object)=>void;  children?: React.ReactNode;}
  )=> {
  const [isOpen, setIsOpen] = React.useState(false)
  const onToggle = () => setIsOpen((s) => !s)
  
  
  
  const handlePickRow = React.useCallback((e: React.MouseEvent) => {
    e?.stopPropagation();
    onPickRow(rowData);
  }, [rowData, onPickRow]);
 
  
   
  const myJson = {
    Analyst: { name: "Jack", email: "jack@xyz.com" },
    "Loaded by": "Jills", 
    "Jira Ticket": "Foo-1",
    "Confluence URL": "http://myserver/wxyz",
    "Study sponsors": [
      { name: "john", email: "john@@xyz.com" },
      { name: "jane", email: "jane@@xyz.com" }
    ]
  };
   
  let title = ''; 
  let docPath:string = ''; 
  let titleContentClass = 'title-content-short';
  if ( rowData){
    if (!rowData.data){
       rowData.data = myJson;
    }
    

    title = rowData.name;
    
    docPath  = rowData.path; 
     
  }else{
    // titleContentClass = 'title-content-full';
    // const response  = docHandler.getDocInfoById().read(); 
    // if (response && response.data){
    //   title = response.data.path;
    //   docPath =  response.data.path;
    // }
  }
  //@step
  title = trimHolderInfo(title); 
  docPath = trimHolderInfo(docPath);

  //console.debug('repeat ~ render FolderBar ⚡️')
 
  return (
          
    <div key={documentId} className="folder-bar ">
     
      <div className='name title-row' onClick={onToggle}>
        <div
          className="arrow-wrapper"
          style={{
            transform: `rotate(${isOpen ? 90 : 0}deg)`,
          }}
        >
          <DirectoryArrowSVG />
        </div>
       
        <div className={titleContentClass}> AAA {title} </div>
        {
          rowData && !rowData.items?
          (
            
            // <div className='selecteBox' data-tooltip-id="my-tooltip" data-tooltip-content="Open folder" >
              
            //   <input className='rightButton' type="checkbox" name="" 
            //   id={documentId} checked={isChecked} onChange={handlePickRow}   /> 
             
            //   <Tooltip id="my-tooltip" ></Tooltip>
            // </div>
           
            <div className='selecte-box'   >
             
              <OverlayTrigger
                placement="left"
                overlay={
                  <Tooltip id="open-settings-tooltip">
                    Open folder
                  </Tooltip>
                }
              >
              <i
                onClick={handlePickRow}
                className="icon-button icon-button-dark"
                >
                <span className='rightButton emoj-buttion'>✓</span> 
              </i>
            </OverlayTrigger> 
            
          </div>
          ):null
        }

      </div> 
      <Collapse isOpen={isOpen} transition=" height 300ms cubic-bezier(0.4, 0, 0.2, 1)"> 
        <div className='detail-card'>
          <div className='detail-card-content'>
            <p>
            path: {docPath}  
            </p> 
            {
              rowData && rowData.data?( 
                <div className="jtable">
                 <JsonToTable json={rowData.data} /> 
                 </div>
              ):null
            }
          </div> 
          {children}
        </div> 
      </Collapse> 

    </div>
  )
}

 