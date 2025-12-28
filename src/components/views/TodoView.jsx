import React, { useState, useEffect, useRef } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { 
  Plus, 
  Calendar, 
  Trash2,
  ArrowDownWideNarrow,
  Tags,
  CheckCircle,
  Clock,
  Loader2,
  X,
  ArrowUpNarrowWide,
  CalendarDays,
  ListTodo,
  AlertCircle,
  Maximize2 // <-- Import Maximize2
} from 'lucide-react';
import { getTodos, addTodo as addTodoDB, updateTodo as updateTodoDB, deleteTodo as deleteTodoDB } from '../../services/db';
import { useToast } from '../../contexts/ToastContext';
import { useConfirm } from '../../contexts/DialogContext';
import NoteModal from '../NoteModal';
import MarkdownEditor from '../MarkdownEditor';
import { getCategoryColor } from '../../utils/colors';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Helper to format date for datetime-local input
const formatForDateTimeInput = (dateString) => {
    if (!dateString) return '';
    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return '';
        
        const pad = (n) => String(n).padStart(2, '0');
        
        return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
    } catch (e) {
        return '';
    }
};

// --- CONSTANTS ---
const COLUMNS = {
  upcoming: { id: 'upcoming', title: 'Belum mulai', color: 'bg-zinc-500' },
  in_progress: { id: 'in_progress', title: 'Berlangsung', color: 'bg-blue-600' },
  done: { id: 'done', title: 'Selesai', color: 'bg-emerald-600' }
};

const PRIORITY_LEVELS = { High: 3, Medium: 2, Low: 1 };
const PRIORITIES = ['Low', 'Medium', 'High'];

const PRIORITY_STYLES = {
  Low: 'text-zinc-500 bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400',
  Medium: 'text-orange-600 bg-orange-100 dark:bg-orange-900/30 dark:text-orange-300',
  High: 'text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-300',
};

// --- CARD COMPONENT ---
const TaskCard = ({ task, index, onClick, onDelete, isMobile }) => {
  const getRelativeBadge = (deadline, status) => {
    if (status === 'done') {
        return (
          <div className="flex items-center gap-1.5 text-[10px] font-medium whitespace-nowrap text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30 px-1.5 py-0.5 rounded">
            <CheckCircle size={10} />
            <span>Selesai</span>
          </div>
        );
    }

    const isValidDate = deadline && !isNaN(new Date(deadline).getTime());
    if (!isValidDate) return null;

    const date = new Date(deadline);
    const now = new Date();
    const diffMs = date - now;
    const diffHours = Math.floor(Math.abs(diffMs) / (1000 * 60 * 60));
    const diffDays = Math.floor(Math.abs(diffMs) / (1000 * 60 * 60 * 24));
    
    // OVERDUE
    if (diffMs < 0) {
      const label = diffHours < 24 ? `${diffHours}j lalu` : `${diffDays}h lalu`;
      return <div className="flex items-center gap-1.5 text-[10px] font-medium whitespace-nowrap text-red-600 bg-red-100 dark:bg-red-900/30 px-1.5 py-0.5 rounded"><Clock size={10} /><span>{label}</span></div>;
    }
    
    // UPCOMING
    if (diffHours < 24) {
      return <div className="flex items-center gap-1.5 text-[10px] font-medium whitespace-nowrap text-orange-600 bg-orange-100 dark:bg-orange-900/30 px-1.5 py-0.5 rounded"><Clock size={10} /><span>{`${diffHours}j lagi`}</span></div>;
    }
    
    if (diffDays <= 7) {
        return <div className="flex items-center gap-1.5 text-[10px] font-medium whitespace-nowrap text-zinc-600 dark:text-zinc-300 bg-zinc-200 dark:bg-zinc-700 px-1.5 py-0.5 rounded"><Clock size={10} /><span>{`${diffDays}h lagi`}</span></div>;
    }
    
    return null;
  };

  const absoluteDate = task.deadline 
    ? new Date(task.deadline).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) 
    : null;

  const categoryColorClass = getCategoryColor(task.category);

  const subtaskProgress = task.subtasks && task.subtasks.length > 0 ? (
    <div className="flex items-center gap-1.5 text-[10px] font-medium whitespace-nowrap text-blue-600 bg-blue-100 dark:bg-blue-900/30 px-1.5 py-0.5 rounded">
      <ListTodo size={10} />
      <span>{`${task.subtasks.filter(s => s.completed).length}/${task.subtasks.length} Selesai`}</span>
    </div>
  ) : null;

      return (
        <Draggable draggableId={task.id.toString()} index={index} isDragDisabled={isMobile}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              onClick={() => onClick(task)}
              className={cn(
                "group relative mb-3 p-3 rounded-lg border border-transparent dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm hover:border-zinc-300 dark:hover:border-zinc-700 transition-all cursor-grab",
                snapshot.isDragging ? "shadow-lg ring-2 ring-blue-500/50 rotate-2 z-50 cursor-grabbing" : "",
                isMobile ? "cursor-default" : ""
              )}
              style={provided.draggableProps.style}
            >
              {/* MAIN CONTENT ROW */}
              <div className="flex justify-between items-start gap-4 mb-2">
                              {/* LEFT: Title & Description */}
                              <div className="flex-1 min-w-0">
                                 <h4 className={cn("text-sm md:text-base font-medium text-zinc-800 dark:text-zinc-200 leading-tight break-words mb-1", task.status === 'done' && 'line-through text-zinc-400')}>{task.title}</h4>
                                 {task.description && (
                                     <p className="text-[11px] md:text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">{task.description}</p>
                                 )}
                              </div>    
                 {/* RIGHT: Date & Actions Stack */}
                 <div className="flex flex-col items-end gap-2 flex-shrink-0">
                     {/* Top Right: Date */}
                     {absoluteDate ? (
                        <div className="flex items-center gap-1 bg-zinc-50 dark:bg-zinc-800/50 px-1.5 py-0.5 rounded border border-zinc-100 dark:border-zinc-800 text-[10px] text-zinc-400 dark:text-zinc-500 font-medium">
                            <Calendar size={10} />
                            <span className="whitespace-nowrap">{absoluteDate}</span>
                        </div>
                     ) : <div className="h-5" />} {/* Spacer if no date */}
    
                     {/* Bottom Right (Below Date): Actions */}
                     <div className="flex items-center gap-1">
                        <button 
                            onClick={(e) => { e.stopPropagation(); onClick(task); }} 
                            className="p-1.5 text-zinc-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors"
                            title="Buka Detail"
                        >
                           <Maximize2 size={14} />
                        </button>
                        <button 
                            onClick={(e) => { e.stopPropagation(); onDelete(task.id); }} 
                            className="p-1.5 text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                            title="Hapus"
                        >
                           <Trash2 size={14} />
                        </button>
                    </div>
                 </div>
              </div>
    
              <div className="border-t border-zinc-100 dark:border-zinc-800 my-2"></div>
    
              {/* FOOTER ROW: Badges Only */}
              <div className="flex flex-wrap items-center gap-2">
                    {task.status !== 'done' && (
                        <span className={cn("text-[10px] px-1.5 py-0.5 rounded border flex-shrink-0", PRIORITY_STYLES[task.priority])}>
                        {task.priority}
                        </span>
                    )}
                    {getRelativeBadge(task.deadline, task.status)}
                    {subtaskProgress}
                    {task.status !== 'done' && task.category && (
                        <span className={cn("text-[10px] px-1.5 py-0.5 rounded border flex-shrink-0", categoryColorClass)}>
                            {task.category}
                        </span>
                    )}
              </div>
            </div>
          )}
        </Draggable>
      );
    };// Helpers for split date/time inputs
const getDatePart = (dateString) => {
    if (!dateString) return '';
    const d = new Date(dateString);
    return isNaN(d.getTime()) ? '' : d.toISOString().split('T')[0];
};

const getTimePart = (dateString) => {
    if (!dateString) return '';
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return '';
    return d.toTimeString().slice(0, 5); // Returns HH:mm
};

const handleSplitDateTimeChange = (id, currentDeadline, part, value, handleUpdate) => {
    let datePart = getDatePart(currentDeadline) || new Date().toISOString().split('T')[0];
    let timePart = getTimePart(currentDeadline) || "00:00";

    if (part === 'date') datePart = value;
    if (part === 'time') timePart = value;

    if (datePart) {
        handleUpdate(id, { deadline: `${datePart}T${timePart}` });
    }
};

// --- MAIN VIEW COMPONENT ---
const TodoView = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [activeTab, setActiveTab] = useState('detail');
  const [newSubtaskInput, setNewSubtaskInput] = useState('');
  const [mobileActiveColumn, setMobileActiveColumn] = useState('upcoming');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const confirm = useConfirm();

  const handleAddSubtask = () => {
    if (!newSubtaskInput.trim()) return;
    const newSubtask = { id: Date.now(), title: newSubtaskInput.trim(), completed: false };
    const currentSubtasks = selectedTodo.subtasks || [];
    handleUpdate(selectedTodo.id, { subtasks: [...currentSubtasks, newSubtask] });
    setNewSubtaskInput('');
  };
  
  // INDEPENDENT COLUMN SORTING STATE
  const [columnSorts, setColumnSorts] = useState({
    upcoming: 'created',
    in_progress: 'created',
    done: 'created'
  });
  
  // Track which column's dropdown is open
  const [openSortDropdown, setOpenSortDropdown] = useState(null); // 'upcoming' | 'in_progress' | 'done' | null
  
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const { showToast } = useToast();

  const uniqueCategories = [...new Set(todos.map(t => t.category).filter(Boolean))];

  useEffect(() => {
    fetchTodos();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowCategoryDropdown(false);
      }
      // Close column sort dropdowns if clicked outside BOTH the btn and the menu
      if (openSortDropdown && !event.target.closest('.column-sort-btn') && !event.target.closest('.sort-menu-container')) {
        setOpenSortDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef, openSortDropdown]);

  const fetchTodos = async () => {
    try {
      const data = await getTodos();
      setTodos(data.map(t => ({
        ...t,
        status: t.status || (t.completed ? 'done' : 'upcoming'),
        description: t.description || '',
        category: t.category || '',
        priority: t.priority || 'Medium',
      })));
    } catch (err) {
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

    setTodos(prev => prev.map(t => t.id === movedTodoId ? { ...t, status: newStatus } : t));
    if (selectedTodo && selectedTodo.id === movedTodoId) {
        setSelectedTodo(prev => ({ ...prev, status: newStatus }));
    }

    try {
      const todo = todos.find(t => t.id === movedTodoId);
      await updateTodoDB({ ...todo, status: newStatus });
    } catch (err) {
      fetchTodos();
    }
  };

  const handleAddTodo = async (e) => {
    if (e.key === 'Enter' && newTodoTitle.trim()) {
      const newTodo = { id: Date.now(), title: newTodoTitle, status: 'upcoming', priority: 'Medium', description: '', category: '', note: '' };
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

  const handleUpdate = async (id, fields) => {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, ...fields } : t));
    if (selectedTodo && selectedTodo.id === id) {
        setSelectedTodo(prev => ({ ...prev, ...fields }));
    }
    try {
      const currentTodo = todos.find(t => t.id === id);
      await updateTodoDB({ ...currentTodo, ...fields });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteCategory = async (categoryToDelete) => {
    if (await confirm({
        title: 'Hapus Kategori?',
        message: `Hapus kategori "${categoryToDelete}" dari semua tugas?`,
        confirmText: 'Hapus Kategori'
    })) {
        const tasksToUpdate = todos.filter(t => t.category === categoryToDelete);
        const updatedTodos = todos.map(t => t.category === categoryToDelete ? { ...t, category: '' } : t);
        setTodos(updatedTodos);
        if (selectedTodo && selectedTodo.category === categoryToDelete) {
            setSelectedTodo(prev => ({ ...prev, category: '' }));
        }
        for (const task of tasksToUpdate) {
            await updateTodoDB({ ...task, category: '' });
        }
        showToast('Kategori dihapus');
    }
  };

  // --- NEW: COLUMN-SPECIFIC SORTING ---
  const handleColumnSort = (columnId, sortType) => {
    setColumnSorts(prev => ({ ...prev, [columnId]: sortType }));
    setOpenSortDropdown(null); // Close dropdown after selection
  };

  const getTasksByStatus = (status) => {
    // 1. Filter tugas berdasarkan status
    const filtered = todos.filter(t => t.status === status);
    const sortType = columnSorts[status]; // Ambil tipe sort untuk kolom ini

    // 2. Buat shallow copy [...] sebelum sort agar tidak memutasi state secara tidak sengaja
    return [...filtered].sort((a, b) => {
      if (sortType === 'priority') {
        const diff = PRIORITY_LEVELS[b.priority] - PRIORITY_LEVELS[a.priority];
        if (diff !== 0) return diff;
      }
      if (sortType === 'deadline') {
        // Deadline terdekat di atas. Tanpa deadline di paling bawah.
        if (!a.deadline) return 1; 
        if (!b.deadline) return -1;
        return new Date(a.deadline) - new Date(b.deadline);
      }
      // Default: 'created' (ID Descending - Terbaru di atas)
      return b.id - a.id;
    });
  };

  const getSortLabel = (type) => {
    switch(type) {
        case 'priority': return 'Prioritas';
        case 'deadline': return 'Deadline';
        default: return 'Terbaru';
    }
  };

  const getSortIcon = (type) => {
    switch(type) {
        case 'priority': return <AlertCircle size={14} />;
        case 'deadline': return <CalendarDays size={14} />;
        default: return <ArrowUpNarrowWide size={14} />;
    }
  };

  const handleOpenTodo = (todo) => {
    setSelectedTodo(todo);
    setActiveTab('detail');
  };

  if (loading) return <div className="flex h-full items-center justify-center"><Loader2 className="animate-spin text-zinc-500" /></div>;

  return (
    <div className="h-full flex flex-col bg-transparent p-3 md:p-6 overflow-hidden">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-3 md:mb-6 gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-zinc-800 dark:text-zinc-100 mb-0.5">LIST TUGAS</h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-xs md:text-sm">Kelola proyek dan tugas kuliahmu.</p>
        </div>
        
        {/* Mobile/Tablet Column Switcher */}
        <div className="flex p-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg lg:hidden">
            {Object.values(COLUMNS).map(col => (
                <button
                    key={col.id}
                    onClick={() => setMobileActiveColumn(col.id)}
                    className={cn(
                        "flex-1 py-1 text-[10px] font-medium rounded-md transition-all",
                        mobileActiveColumn === col.id 
                            ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-sm" 
                            : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300"
                    )}
                >
                    {col.title}
                </button>
            ))}
        </div>

        {/* Global Action Button */}
        <button onClick={() => setIsAdding(true)} className="hidden lg:flex bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium items-center gap-2 transition-colors shadow-sm"><Plus size={16} /> Baru</button>
        
        {/* Mobile/Tablet Button */}
         <button onClick={() => setIsAdding(true)} className="lg:hidden w-full bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-xs font-medium flex items-center justify-center gap-2 transition-colors shadow-sm"><Plus size={14} /> Tambah Tugas</button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex lg:gap-6 h-full overflow-hidden pb-4">
          {Object.values(COLUMNS).map((column) => (
            <div 
                key={column.id} 
                className={cn(
                    "flex-1 flex-col h-full min-w-0",
                    mobileActiveColumn === column.id ? "flex" : "hidden lg:flex",
                    // Apply max-width constraint for better tablet aesthetic in single-column mode
                    mobileActiveColumn === column.id && "max-w-2xl mx-auto w-full"
                )}
            >
              {/* COLUMN HEADER WITH SORT */}
              <div className="flex items-center justify-between mb-4 px-1">
                <div className="flex items-center gap-2">
                  <span className={cn("px-2 py-0.5 rounded text-xs font-medium text-white shadow-sm", column.color)}>{getTasksByStatus(column.id).length}</span>
                  <h3 className="font-semibold text-zinc-700 dark:text-zinc-200">{column.title}</h3>
                </div>
                
                {/* ACTIONS: SORT + ADD */}
                <div className="flex items-center gap-1 relative">
                    {/* Sort Dropdown Trigger */}
                    <button 
                        className="column-sort-btn p-1.5 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded text-zinc-500 dark:text-zinc-400 transition-colors flex items-center gap-1"
                        onClick={() => setOpenSortDropdown(openSortDropdown === column.id ? null : column.id)}
                        title={`Urutkan: ${getSortLabel(columnSorts[column.id])}`}
                    >
                        {getSortIcon(columnSorts[column.id])}
                    </button>

                    {/* Sort Menu */}
                    {openSortDropdown === column.id && (
                        <div className="sort-menu-container absolute top-full right-0 mt-1 w-32 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg shadow-xl z-50 overflow-hidden">
                            <button onClick={() => handleColumnSort(column.id, 'created')} className={cn("w-full text-left px-3 py-2 text-xs flex items-center gap-2 hover:bg-zinc-100 dark:hover:bg-zinc-700", columnSorts[column.id] === 'created' ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/10" : "text-zinc-700 dark:text-zinc-200")}>
                                <ArrowUpNarrowWide size={12} /> Terbaru
                            </button>
                            <button onClick={() => handleColumnSort(column.id, 'priority')} className={cn("w-full text-left px-3 py-2 text-xs flex items-center gap-2 hover:bg-zinc-100 dark:hover:bg-zinc-700", columnSorts[column.id] === 'priority' ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/10" : "text-zinc-700 dark:text-zinc-200")}>
                                <AlertCircle size={12} /> Prioritas
                            </button>
                            <button onClick={() => handleColumnSort(column.id, 'deadline')} className={cn("w-full text-left px-3 py-2 text-xs flex items-center gap-2 hover:bg-zinc-100 dark:hover:bg-zinc-700", columnSorts[column.id] === 'deadline' ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/10" : "text-zinc-700 dark:text-zinc-200")}>
                                <CalendarDays size={12} /> Deadline
                            </button>
                        </div>
                    )}

                    <button className="p-1.5 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded text-zinc-500 dark:text-zinc-400 transition-colors" onClick={() => { setIsAdding(true); }}>
                        <Plus size={14} />
                    </button>
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
                        <input autoFocus type="text" placeholder="Nama tugas..." className="w-full bg-transparent text-sm text-zinc-800 dark:text-zinc-200 placeholder:text-zinc-500 focus:outline-none" value={newTodoTitle} onChange={(e) => setNewTodoTitle(e.target.value)} onKeyDown={handleAddTodo} onBlur={() => { if(!newTodoTitle) setIsAdding(false); }} />
                      </div>
                    )}
                    {getTasksByStatus(column.id).map((task, index) => (
                      <TaskCard key={task.id} task={task} index={index} onClick={handleOpenTodo} isMobile={isMobile} onDelete={async (id) => { 
                        if(await confirm({
                            title: 'Hapus Tugas?',
                            message: 'Tindakan ini akan menghapus tugas secara permanen.',
                            confirmText: 'Hapus Tugas'
                        })) { 
                            deleteTodoDB(id); 
                            setTodos(prev => prev.filter(t => t.id !== id)); 
                        }
                      }} />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>

      {/* MODAL (No Change) */}
      {selectedTodo && (
        <NoteModal isOpen={true} onClose={() => setSelectedTodo(null)}>
          <div className="flex flex-col h-full bg-transparent">
            <input className="text-3xl font-bold bg-transparent border-none focus:outline-none w-full text-zinc-800 dark:text-zinc-100 placeholder:text-zinc-400 mb-4 py-2 leading-tight" value={selectedTodo.title} onChange={(e) => handleUpdate(selectedTodo.id, { title: e.target.value })} placeholder="Nama Tugas..." />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg border border-zinc-200 dark:border-zinc-800">
                <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-zinc-500 uppercase">Prioritas</label>
                    <div className="flex gap-2">
                        {PRIORITIES.map(p => (
                            <button key={p} onClick={() => handleUpdate(selectedTodo.id, { priority: p })} className={cn("px-2 py-1 text-xs rounded border transition-all", selectedTodo.priority === p ? PRIORITY_STYLES[p] + " border-transparent ring-1 ring-offset-1 ring-zinc-300 dark:ring-zinc-600" : "bg-white dark:bg-zinc-900 text-zinc-500 border-zinc-200 dark:border-zinc-700")}>{p}</button>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-zinc-500 uppercase">Status</label>
                    <select value={selectedTodo.status} onChange={(e) => handleUpdate(selectedTodo.id, { status: e.target.value })} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-sm rounded px-2 py-1 text-zinc-700 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-blue-500">
                        {Object.values(COLUMNS).map(col => <option key={col.id} value={col.id}>{col.title}</option>)}
                    </select>
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-zinc-500 uppercase">Deadline</label>
                    <div className="flex gap-2">
                        <input 
                            type="date" 
                            value={getDatePart(selectedTodo.deadline)} 
                            onChange={(e) => handleSplitDateTimeChange(selectedTodo.id, selectedTodo.deadline, 'date', e.target.value, handleUpdate)} 
                            className="flex-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-sm rounded px-2 py-1 text-zinc-700 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-blue-500" 
                        />
                        <input 
                            type="time" 
                            value={getTimePart(selectedTodo.deadline)} 
                            onChange={(e) => handleSplitDateTimeChange(selectedTodo.id, selectedTodo.deadline, 'time', e.target.value, handleUpdate)} 
                            className="w-[100px] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-sm rounded px-2 py-1 text-zinc-700 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-blue-500" 
                        />
                    </div>
                </div>
                
                {/* --- CUSTOM CATEGORY DROPDOWN --- */}
                <div className="flex flex-col gap-1 relative" ref={dropdownRef}>
                    <label className="text-xs font-semibold text-zinc-500 uppercase">Kategori</label>
                    <input 
                        type="text" 
                        placeholder="Ketik atau pilih..." 
                        value={selectedTodo.category || ''} 
                        onChange={(e) => {
                            handleUpdate(selectedTodo.id, { category: e.target.value });
                            setShowCategoryDropdown(true);
                        }}
                        onFocus={() => setShowCategoryDropdown(true)}
                        className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-sm rounded px-2 py-1 text-zinc-700 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-blue-500 w-full" 
                    />
                    
                    {/* DROPDOWN MENU */}
                    {showCategoryDropdown && uniqueCategories.length > 0 && (
                        <div className="absolute top-full left-0 right-0 mt-1 max-h-40 overflow-y-auto bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md shadow-lg z-50 scrollbar-hide">
                            {uniqueCategories.map(cat => (
                                <div key={cat} className="flex items-center justify-between px-2 py-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-700 group cursor-pointer">
                                    <span 
                                        className="flex-grow text-sm text-zinc-700 dark:text-zinc-200"
                                        onClick={() => {
                                            handleUpdate(selectedTodo.id, { category: cat });
                                            setShowCategoryDropdown(false);
                                        }}
                                    >
                                        {cat}
                                    </span>
                                    <button 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDeleteCategory(cat);
                                        }}
                                        className="p-1 text-zinc-400 hover:text-red-500 transition-colors"
                                        title="Hapus kategori dari semua tugas"
                                    >
                                        <X size={12} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="mb-6">
                <textarea className="w-full bg-transparent text-sm text-zinc-600 dark:text-zinc-300 resize-none focus:outline-none border-l-2 border-transparent focus:border-zinc-300 dark:focus:border-zinc-700 pl-2 transition-colors py-1 leading-relaxed" rows={2} placeholder="Tambahkan deskripsi singkat..." value={selectedTodo.description || ''} onChange={(e) => handleUpdate(selectedTodo.id, { description: e.target.value })} />
            </div>

            <div className="flex-1 flex flex-col min-h-0">
              {/* Tab Navigation (Always Visible) */}
              <div className="flex border-b border-zinc-200 dark:border-zinc-700 mb-4">
                <button onClick={() => setActiveTab('detail')} className={cn("px-4 py-2 text-sm font-medium", activeTab === 'detail' ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600" : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-200")}>
                  Detail
                </button>
                <button onClick={() => setActiveTab('subtasks')} className={cn("px-4 py-2 text-sm font-medium", activeTab === 'subtasks' ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600" : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-200")}>
                  Sub-tugas
                </button>
              </div>
              
              {/* Tab Content */}
              <div className="flex-1 overflow-hidden">
                {activeTab === 'detail' && (
                  <div className="flex-1 overflow-hidden h-full border border-zinc-200 dark:border-zinc-800 rounded-md">
                      <MarkdownEditor content={selectedTodo.note} onUpdate={(content) => handleUpdate(selectedTodo.id, { note: content })} />
                  </div>
                )}
                
                {activeTab === 'subtasks' && (
                  <div className="h-full flex flex-col">
                    <div className="flex-1 overflow-y-auto space-y-2 pr-2 scrollbar-hide">
                      {/* Existing Subtasks */}
                      {selectedTodo.subtasks && selectedTodo.subtasks.map((st) => (
                        <div key={st.id} className="flex items-center gap-3 group animate-in fade-in slide-in-from-left-2 duration-200">
                          <input 
                            type="checkbox" 
                            checked={st.completed} 
                            onChange={(e) => {
                              const newSubtasks = selectedTodo.subtasks.map(s => 
                                s.id === st.id ? { ...s, completed: e.target.checked } : s
                              );
                              handleUpdate(selectedTodo.id, { subtasks: newSubtasks });
                            }}
                            className="w-4 h-4 rounded border-zinc-300 dark:border-zinc-700 text-blue-600 focus:ring-blue-500 bg-white dark:bg-zinc-900 transition-colors"
                          />
                          <input 
                            type="text" 
                            value={st.title} 
                            onChange={(e) => {
                              const newSubtasks = selectedTodo.subtasks.map(s => 
                                s.id === st.id ? { ...s, title: e.target.value } : s
                              );
                              handleUpdate(selectedTodo.id, { subtasks: newSubtasks });
                            }}
                            placeholder="Judul subtugas..."
                            className={cn(
                              "flex-1 bg-transparent text-sm focus:outline-none transition-all py-1",
                              st.completed ? "text-zinc-400 line-through" : "text-zinc-700 dark:text-zinc-200"
                            )}
                          />
                          <button 
                            onClick={() => {
                              const newSubtasks = selectedTodo.subtasks.filter(s => s.id !== st.id);
                              handleUpdate(selectedTodo.id, { subtasks: newSubtasks });
                            }}
                            className="opacity-0 group-hover:opacity-100 p-1 text-zinc-400 hover:text-red-500 transition-opacity"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}

                      {/* Inline Add Input */}
                      <div className="flex items-center gap-3 py-1">
                        <div className="w-4 h-4 rounded border-2 border-dashed border-zinc-300 dark:border-zinc-700 flex-shrink-0" />
                        <input 
                          type="text"
                          value={newSubtaskInput}
                          onChange={(e) => setNewSubtaskInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              handleAddSubtask();
                            }
                          }}
                          onBlur={handleAddSubtask}
                          placeholder="Tambahkan subtugas baru..."
                          className="flex-1 bg-transparent text-sm text-zinc-500 dark:text-zinc-400 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none py-1"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </NoteModal>
      )}
    </div>
  );
};

export default TodoView;
