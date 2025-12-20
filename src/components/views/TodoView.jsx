import React, { useState, useEffect, useRef } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { 
  Plus, 
  MoreHorizontal, 
  Calendar, 
  Trash2,
  FileText,
  Loader2,
  CheckCircle,
} from 'lucide-react';
import { getTodos, addTodo as addTodoDB, updateTodo as updateTodoDB, deleteTodo as deleteTodoDB } from '../../services/db';
import { useToast } from '../../contexts/ToastContext';
import NoteModal from '../NoteModal';
import MarkdownEditor from '../MarkdownEditor';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Helper for tailwind classes
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// --- HIERARCHY-AWARE COLORS ---
const COLUMNS = {
  upcoming: { id: 'upcoming', title: 'Belum dimulai', color: 'bg-zinc-500' },
  in_progress: { id: 'in_progress', title: 'Sedang berlangsung', color: 'bg-blue-600' },
  done: { id: 'done', title: 'Selesai', color: 'bg-emerald-600' }
};

const PRIORITY_COLORS = {
  Low: 'text-zinc-500 bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400',
  Medium: 'text-orange-600 bg-orange-100 dark:bg-orange-900/30 dark:text-orange-300',
  High: 'text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-300',
};

const PRIORITIES = ['Low', 'Medium', 'High'];

// --- EDITABLE CONTENT COMPONENT for In-Card Editing ---
const EditableContent = ({ initialValue, onSave, placeholder, className }) => {
  const [isEditing, setIsEditing] = useState(false);
  const divRef = useRef(null);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    const newText = divRef.current.innerText;
    if (newText.trim() === '') {
        if (initialValue !== '') onSave('');
    } else if (newText !== initialValue) {
      onSave(newText);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.currentTarget.blur();
    }
  };

  useEffect(() => {
    if (isEditing && divRef.current) {
      divRef.current.focus();
      const range = document.createRange();
      const sel = window.getSelection();
      range.selectNodeContents(divRef.current);
      range.collapse(false);
      sel.removeAllRanges();
      sel.addRange(range);
    }
  }, [isEditing]);
  
  const showPlaceholder = !initialValue && !isEditing;

  return (
    <div
      ref={divRef}
      onDoubleClick={handleDoubleClick}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      contentEditable={isEditing}
      suppressContentEditableWarning
      className={cn("focus:outline-none rounded -m-1 p-1 relative", className, isEditing && "bg-zinc-100 dark:bg-zinc-800")}
    >
      {showPlaceholder ? (
        <span className="text-zinc-400 dark:text-zinc-600 italic pointer-events-none">{placeholder}</span>
      ) : (
        initialValue
      )}
    </div>
  );
};


// --- CARD COMPONENT ---
const TaskCard = ({ task, index, onOpenNote, onDelete, onUpdate }) => {
  const dateInputRef = useRef(null);

  const getDeadlineBadge = (deadline, status) => {
    if (status === 'done') {
      return (
        <div className="flex items-center gap-1.5 text-[11px] font-medium whitespace-nowrap text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30 px-1.5 py-0.5 rounded">
          <CheckCircle size={12} />
          <span>Selesai</span>
        </div>
      );
    }

    const isValidDate = deadline && !isNaN(new Date(deadline).getTime());

    if (isValidDate) {
      const date = new Date(deadline);
      const now = new Date();
      const diffMs = date - now;
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      const isOverdue = diffMs < 0;
      const isToday = date.toDateString() === now.toDateString();
      
      if (isOverdue) {
        return <div className="flex items-center gap-1.5 text-[11px] font-medium whitespace-nowrap text-red-600 bg-red-100 dark:bg-red-900/30 px-1.5 py-0.5 rounded"><Calendar size={12} /><span>{`${Math.abs(diffDays)}h lalu`}</span></div>;
      }
      if (isToday) {
        return <div className="flex items-center gap-1.5 text-[11px] font-medium whitespace-nowrap text-orange-600 bg-orange-100 dark:bg-orange-900/30 px-1.5 py-0.5 rounded"><Calendar size={12} /><span>Hari ini</span></div>;
      }
      return <div className="flex items-center gap-1.5 text-[11px] font-medium whitespace-nowrap text-zinc-600 dark:text-zinc-300 bg-zinc-200 dark:bg-zinc-700 px-1.5 py-0.5 rounded"><Calendar size={12} /><span>{`${diffDays}h lagi`}</span></div>;
    }

    return null;
  };

  const handleDateClick = () => {
    dateInputRef.current?.showPicker();
  };
  
  const handleCyclePriority = () => {
    const currentIndex = PRIORITIES.indexOf(task.priority);
    const nextIndex = (currentIndex + 1) % PRIORITIES.length;
    onUpdate(task.id, { priority: PRIORITIES[nextIndex] });
  };
  
  const formattedSetDate = task.deadline ? new Date(task.deadline).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : 'Set Date';

  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={cn(
            "group relative mb-3 p-3 rounded-lg border border-transparent dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm hover:border-zinc-300 dark:hover:border-zinc-700 transition-all cursor-grab active:cursor-grabbing",
            snapshot.isDragging ? "shadow-lg ring-2 ring-blue-500/50 rotate-2 z-50" : ""
          )}
          style={provided.draggableProps.style}
        >
          <div className="flex justify-between items-start gap-2 mb-2">
            <div className="w-5/6">
              <EditableContent 
                initialValue={task.title || ''}
                onSave={(newTitle) => onUpdate(task.id, { title: newTitle })}
                placeholder="Nama Tugas (double click untuk edit...)"
                className="text-lg font-medium text-zinc-800 dark:text-zinc-200"
              />
               <EditableContent 
                initialValue={task.description || ''}
                onSave={(newDesc) => onUpdate(task.id, { description: newDesc })}
                placeholder="Berikan deskripsi (double click untuk edit...)"
                className="text-sm text-zinc-500 dark:text-zinc-400 mt-1"
              />
            </div>
            <div className="flex gap-1 text-zinc-400">
              <button onClick={() => onOpenNote(task)} className="p-1 hover:text-blue-500" title="Open Note"><FileText size={14} /></button>
              <button onClick={() => onDelete(task.id)} className="p-1 hover:text-red-500" title="Delete"><Trash2 size={14} /></button>
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-4 pt-2 border-t border-zinc-100 dark:border-zinc-800 relative">
            <div className="flex items-center gap-2">
              {getDeadlineBadge(task.deadline, task.status)}
              <button onClick={handleCyclePriority} className={cn("text-[10px] px-1.5 py-0.5 rounded border border-transparent font-medium transition-transform hover:scale-110", PRIORITY_COLORS[task.priority])}>
                {task.priority}
              </button>
            </div>
            
            <div onClick={handleDateClick} className="relative z-10 cursor-pointer text-xs text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 flex items-center gap-1">
              <span>{formattedSetDate}</span>
            </div>
            <input 
              ref={dateInputRef}
              type="datetime-local"
              className="sr-only"
              value={task.deadline || ''}
              onChange={(e) => onUpdate(task.id, { deadline: e.target.value })}
            />
          </div>
        </div>
      )}
    </Draggable>
  );
};

// --- MAIN VIEW COMPONENT ---
const TodoView = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [selectedTodoForNote, setSelectedTodoForNote] = useState(null);
  
  const { showToast } = useToast();

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const data = await getTodos();
      const formattedData = data.map(t => ({
        ...t,
        status: t.status || (t.completed ? 'done' : 'upcoming'),
        description: t.description || '', // Ensure description field exists
      }));
      setTodos(formattedData);
    } catch (err) {
      console.error(err);
      showToast('Gagal memuat data', 'error');
    } finally {
      setLoading(false);
    }
  };

  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const movedTodoId = parseInt(draggableId);
    const newStatus = destination.droppableId;

    const updatedTodos = todos.map(t => t.id === movedTodoId ? { ...t, status: newStatus } : t);
    setTodos(updatedTodos);

    try {
      const todoToUpdate = todos.find(t => t.id === movedTodoId);
      if (todoToUpdate) await updateTodoDB({ ...todoToUpdate, status: newStatus });
    } catch (err) {
      console.error(err);
      showToast('Gagal menyimpan posisi', 'error');
      fetchTodos();
    }
  };

  const handleAddTodo = async (e) => {
    if (e.key === 'Enter' && newTodoTitle.trim()) {
      const newTodo = {
        id: Date.now(),
        title: newTodoTitle,
        status: 'upcoming',
        tags: [],
        note: '',
        deadline: null,
        priority: 'Medium',
        description: '',
      };
      
      try {
        await addTodoDB(newTodo);
        setTodos(prev => [...prev, newTodo]);
        setNewTodoTitle('');
        setIsAdding(false);
      } catch (err) {
        showToast('Gagal menambah tugas', 'error');
      }
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Hapus tugas ini?')) {
      try {
        await deleteTodoDB(id);
        setTodos(prev => prev.filter(t => t.id !== id));
        showToast('Tugas dihapus');
      } catch (err) {
        showToast('Gagal menghapus', 'error');
      }
    }
  };

  const handleUpdate = async (id, fields) => {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, ...fields } : t));
    try {
      const todo = todos.find(t => t.id === id);
      await updateTodoDB({ ...todo, ...fields });
    } catch (err)
 {
      console.error(err);
    }
  };
  
  const handleNoteUpdate = async (content) => {
    if (selectedTodoForNote) {
      setSelectedTodoForNote(prev => ({ ...prev, note: content }));
      setTodos(prev => prev.map(t => t.id === selectedTodoForNote.id ? { ...t, note: content } : t));
      const todo = todos.find(t => t.id === selectedTodoForNote.id);
      await updateTodoDB({ ...todo, note: content });
    }
  };

  const getTasksByStatus = (status) => {
    return todos
      .filter(t => t.status === status)
      .sort((a, b) => {
        if (a.deadline && b.deadline) return new Date(a.deadline) - new Date(b.deadline);
        if (a.deadline) return -1;
        if (b.deadline) return 1;
        return b.id - a.id;
      });
  };

  if (loading) return <div className="flex h-full items-center justify-center"><Loader2 className="animate-spin text-zinc-500" /></div>;

  return (
    <div className="h-full flex flex-col bg-transparent p-6 overflow-hidden">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-zinc-800 dark:text-zinc-100 mb-1">LIST TUGAS</h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm">Kelola proyek dan tugas kuliahmu.</p>
        </div>
        <button onClick={() => setIsAdding(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors shadow-sm"><Plus size={16} /> Baru</button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-6 h-full overflow-x-auto pb-4 scrollbar-hide">
          {Object.values(COLUMNS).map((column) => (
            <div key={column.id} className="flex-1 min-w-[300px] flex flex-col h-full">
              <div className="flex items-center justify-between mb-4 px-1">
                <div className="flex items-center gap-2">
                  <span className={cn("px-2 py-0.5 rounded text-xs font-medium text-white shadow-sm", column.color)}>{getTasksByStatus(column.id).length}</span>
                  <h3 className="font-semibold text-zinc-700 dark:text-zinc-200">{column.title}</h3>
                </div>
                <div className="flex gap-1">
                   <button className="p-1 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded text-zinc-400 transition-colors" onClick={() => { setIsAdding(true); }}><Plus size={14} /></button>
                </div>
              </div>

              <Droppable droppableId={column.id}>
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={cn("flex-1 overflow-y-auto pr-2 -mr-2 transition-colors rounded-lg scrollbar-hide", snapshot.isDraggingOver ? "bg-zinc-300/30 dark:bg-zinc-800/30" : "")}
                  >
                    {column.id === 'upcoming' && isAdding && (
                      <div className="mb-3 bg-white dark:bg-zinc-900 border border-blue-500 rounded-lg p-3 shadow-sm">
                        <input
                          autoFocus
                          type="text"
                          placeholder="Nama tugas..."
                          className="w-full bg-transparent text-sm text-zinc-800 dark:text-zinc-200 placeholder:text-zinc-500 focus:outline-none"
                          value={newTodoTitle}
                          onChange={(e) => setNewTodoTitle(e.target.value)}
                          onKeyDown={handleAddTodo}
                          onBlur={() => { if(!newTodoTitle) setIsAdding(false); }}
                        />
                        <div className="mt-2 flex justify-end gap-2 text-xs">
                           <span className="text-zinc-400">Tekan Enter untuk simpan</span>
                        </div>
                      </div>
                    )}

                    {getTasksByStatus(column.id).map((task, index) => (
                      <TaskCard key={task.id} task={task} index={index} onOpenNote={setSelectedTodoForNote} onDelete={handleDelete} onUpdate={handleUpdate} />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>

      {selectedTodoForNote && (
        <NoteModal isOpen={true} onClose={() => setSelectedTodoForNote(null)}>
          <div className="flex flex-col h-full bg-transparent">
            <div className="mb-4">
               <h2 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100">
                 {selectedTodoForNote.title}
               </h2>
               <p className="text-sm text-zinc-500">{selectedTodoForNote.description || 'No description'}</p>
            </div>
            <div className="flex-1 -m-4">
              <MarkdownEditor
                content={selectedTodoForNote.note}
                onUpdate={handleNoteUpdate}
              />
            </div>
          </div>
        </NoteModal>
      )}
    </div>
  );
};

export default TodoView;