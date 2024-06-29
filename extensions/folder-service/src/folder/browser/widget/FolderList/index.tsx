
import React from 'react' 
import { useEffect,useState, useRef } from 'react';
import { ViewportList } from 'react-viewport-list';
 

import { FolderBar } from "../FolderBar/index";
import { IRowItem } from "../Base/RowItem" 
import { Reacts } from 'src/land';



export  const FolderList = ({
  items,
  onPickRow,
  observer
}: {
  items: IRowItem[];
  onPickRow:(row:Object) => void;
  observer?: Reacts.IObserver;
}) => {
  const ref = useRef(null);
  const listRef = useRef(null); 
  const [dataSet, setDataSet] = useState<IRowItem[]>([]);

 
  useEffect(() => {   
    setDataSet(items);
    if (observer){
      observer.lisenter = {
          update(sender, val) {
            setDataSet(val);
          }
      }   
    }
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
                {/* <div >debug:{JSON.stringify(item.items)}</div>  */}
                { 
                  item.items ? (
                    <div>
                      <FolderList items={item.items} onPickRow={handlePickRow}/> 
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
 