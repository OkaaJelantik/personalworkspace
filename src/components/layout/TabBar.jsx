import React from 'react';
import Tab from './Tab';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const TabBar = ({ tabs, activeTabId, onSelectTab, onCloseTab, onReorderTabs }) => {
  const onDragEnd = (result) => {
    if (!result.destination) return;
    
    const reorderedTabs = Array.from(tabs);
    const [removed] = reorderedTabs.splice(result.source.index, 1);
    reorderedTabs.splice(result.destination.index, 0, removed);
    
    onReorderTabs(reorderedTabs);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="tabs-list" direction="horizontal">
        {(provided) => (
          <div 
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 overflow-x-auto scrollbar-hide"
          >
            {tabs.map((tab, index) => (
              <Draggable key={tab.id} draggableId={tab.id.toString()} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      ...provided.draggableProps.style,
                      opacity: snapshot.isDragging ? 0.8 : 1,
                    }}
                  >
                    <Tab
                      tab={tab}
                      isActive={tab.id === activeTabId}
                      onSelect={() => onSelectTab(tab.id)}
                      onClose={() => onCloseTab(tab.id)}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TabBar;
