
import React from 'react' 
import { useEffect,useState, useRef } from 'react';
import { ViewportList } from 'react-viewport-list';

 
 
//import { getFolderList } from "../../api/apiClient.js"  

import { FolderBar } from "../FolderBar/index";
import { IRowItem } from "../Base/RowItem" 

export  const FolderList = ({
  items,
  onPickRow,
  isDoc,
}: {
  items: IRowItem[];
  onPickRow:(row:Object) => void;
  isDoc: boolean;
}) => {
  const ref = useRef(null);
  const listRef = useRef(null); 
  const [dataSet, setDataSet] = useState<IRowItem[]>([]);

  // const fetchFolders = async () => { 
  //   const res : Response = await getFolderList();
  //   const response = await res.json();
  //   setDataSet(response.data);
  // }
 
    //invoke get folders api
  useEffect(() => {  
    console.log('🔥 useEffect->fetchFolders')  
     
      setDataSet(items);
    
    return () => {};
  }, []);
 

  // ui effect
  // useEffect(
  //   () => () => {
 
  //     if (!listRef || !listRef.current){
  //       return ;
  //     }
  //     window.sessionStorage.setItem(
  //       'lastScrollPosition',
  //       JSON.stringify(
  //         listRef.current.getScrollPosition(),
  //       ),
  //     );
  //   },[]);

  
   const handlePickRow = React.useCallback((rowData:any) => { 
      onPickRow(rowData);
    
    },[onPickRow]); 

  return (
    <div className='folder-list-page'>
    <div className='files scroll-container' ref={ref}>
        <ViewportList
          ref={listRef}
          viewportRef={ref}
          items={dataSet}
        >
          {(item) => ( 
            // <div key={item.id} className="item">
            //   {item.title}🔥
            // </div>
             
              <FolderBar key={item.id} documentId={item.id} rowData= {item} onPickRow={handlePickRow} >
                <div >debug:{JSON.stringify(item.items)}</div> 
                { 
                  item.items ? (
                    <div>
                      items here 
                      <FolderList items={item.items} onPickRow={handlePickRow} isDoc={true}/> 
                    </div>
                    
                  ):(<div> no items </div>)
                }
               
              </FolderBar> 
            
          )}
        </ViewportList>
      
    </div>     
    </div>
  );
};
 