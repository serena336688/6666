import React, { useState, useEffect, useRef } from "react";
import {
  Home as HomeIcon,
  Smile,
  Dumbbell,
  Utensils,
  User,
  Heart,
  Bell,
  MessageCircle,
  Check,
  X,
  Send,
  Plus,
  Minus,
  ArrowRight,
  Sparkles,
  Award,
  Calendar,
  AlertCircle,
  Coffee,
  RotateCcw,
  Edit2
} from "lucide-react";
import { Message, Task, MoodEntry, StretchWorkout, UserStats } from "./types";

// Static Workout Data with original image hotlinks
const WORKOUTS: StretchWorkout[] = [
  {
    id: "desk-stretch",
    title: "3分钟 课间活动",
    subtitle: "简单的伸展，释放学习压力。",
    duration: 180,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDOB-DIaz-lQJ98nnV3Aa8VIHRWt7jIjr5h9nYm2wY2akfg2tf_dAvQGS5xzYrLV2A8qJPvLpx_BnNEOVo27gVWBgKnuk4C21hjWFFdf6OdV8AaqIehw1ynnOhs7jo2E6wG9u7wR5gQ1ksnCS482tBMOclDDrtPafyGTqn_bqE55CQ6jhO30XgyZ1DTqniNlsLiGpBtE4JU3-Mn5ovAU2sDeKDt8NRVI1mZN7l0g5ExlXRxhByHv8Xf5eSUHawot5gkmOJ4kdSwZ1c",
    energyBoost: 10,
    description: "专为久坐的书桌、课桌场景设计的舒缓伸展，能有效激活僵硬的肌肉，缓解压力。",
    steps: [
      "舒服地坐正，双手交叉向上伸展，深吸气拉长脊柱",
      "保持拉伸，缓缓向左侧轻轻弯曲，深呼气，恢复后换右侧",
      "肩膀向上耸起，然后顺时针、逆时针向后慢慢画大圈",
      "将双手托在脑后，胸腔微微向上挺起，做2次深呼吸"
    ]
  },
  {
    id: "neck-stretch",
    title: "5分钟 颈部放松",
    subtitle: "缓解久坐带来的肩颈不适。",
    duration: 300,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCHfkrz68f8es1foYsvk8T7jtxYmK--VLI5htc0E1avatobiQzBpkWW0yXhd6kXgzaiOamblGFevoAZpX_JuXAUvuDezvrlyiWl6DCC6PFduuMcYVz9fToCysy_BjRlF-5d0RKQdRRXL1WvKeY5ahs4sJnkZyGwdMpuABQ5yI7w8K8I8u2TrdOjz3xpLKZ8OejL445WAX5se1_LMP-bnuPJdQFQhZzBjaMpJSR_LXyLDEjSXiOxBQVDKpTJaSWqzH-f06XPtSND7R4",
    energyBoost: 15,
    description: "针对长期低头看书、看手机导致的颈部肌肉酸痛。动作轻柔、深长，切忌剧烈发力。",
    steps: [
      "放松双肩，下巴慢慢寻找锁骨，感受脖子后侧肌群的拉展",
      "头部慢慢向左歪，左耳贴向左肩，右手向斜下方用力延伸，静置10秒",
      "缓缓抬头，换另一侧进行同样的拉伸",
      "用下巴在胸前空中轻轻画半圆，呼吸均匀，放松后颈"
    ]
  },
  {
    id: "cardio-fatburn",
    title: "8分钟 低强度燃脂",
    subtitle: "轻松动起来，唤醒身体活力。",
    duration: 480,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDp_ceG_VuVMW-Xtn4QexjDUGX51Gahw3pl71zZ4Y6wW7kGmiJHCNtOApiOHZh-D3OKYYcrsClL0w-tXeT6U_83BjJaIXP0MgrNGag7wPTobOAaF5dGG7k3t1nj6omKUFzVPCQKzrQ8EWZCtQT71Lz9oYFHHuAL-4El0NE1_YxLRwKqFcitJc3Xz-AruOevTcrS2fIDFR5MAWSmqnQZh0ABRKDXFEZaZWhUSCMxM6j9LV-5amdfbBK_0EuqRmi-FcWY3VeDegK7VCY",
    energyBoost: 25,
    description: "无跳跃、轻量级的活力韵律运动。适合在饭后半小时、学习疲惫时跟着节奏活动全身。",
    steps: [
      "原地踏步：双手自然前后摆动，配合小腹微收，微笑着深呼吸",
      "侧步点地：左右交替点地，双臂配合开合拉展胸背肌肉",
      "提膝击掌：抬起左膝，双手在膝盖下方轻拍；换右膝交替进行",
      "吐故纳新：双手合十吸气，向两侧画圆呼气，重复三次"
    ]
  }
];

// Initial Tasks
const DEFAULT_TASKS: Task[] = [
  {
    id: "water-task",
    title: "喝一杯水",
    subtitle: "给身体补充能量",
    icon: "water_drop",
    completed: false,
    category: "water",
    points: 10
  },
  {
    id: "stretch-task",
    title: "3分钟颈部拉伸",
    subtitle: "放松一下肩膀",
    icon: "self_improvement",
    completed: false,
    category: "exercise",
    points: 15
  },
  {
    id: "mood-task",
    title: "记录心情",
    subtitle: "了解今天的自己",
    icon: "mood",
    completed: false,
    category: "mood",
    points: 10
  }
];

export default function App() {
  // Navigation & Page routing
  const [activeTab, setActiveTab] = useState<"home" | "mood" | "exercise" | "diet" | "profile">("home");

  // Local Storage states
  const [stats, setStats] = useState<UserStats>(() => {
    const saved = localStorage.getItem("nuanya_stats");
    return saved
      ? JSON.parse(saved)
      : {
          name: "Jamie",
          streak: 3,
          vitality: 65,
          totalWaterCups: 0,
          completedWorkoutsCount: 0,
          moodEntriesCount: 0,
          focusMessage: "深深呼吸，让绿意在心中悄悄萌芽吧。"
        };
  });

  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem("nuanya_tasks");
    return saved ? JSON.parse(saved) : DEFAULT_TASKS;
  });

  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>(() => {
    const saved = localStorage.getItem("nuanya_mood_history");
    return saved ? JSON.parse(saved) : [];
  });

  // Water Intake state
  const [waterCups, setWaterCups] = useState<number>(() => {
    const saved = localStorage.getItem("nuanya_water_cups");
    return saved ? parseInt(saved, 10) : 0;
  });

  // Checkbox goals state for Diet page
  const [breakfastChecked, setBreakfastChecked] = useState<boolean>(() => {
    const saved = localStorage.getItem("nuanya_breakfast_checked");
    return saved ? saved === "true" : false;
  });
  const [veggiesChecked, setVeggiesChecked] = useState<boolean>(() => {
    const saved = localStorage.getItem("nuanya_veggies_checked");
    return saved ? saved === "true" : false;
  });
  const [sugarChecked, setSugarChecked] = useState<boolean>(() => {
    const saved = localStorage.getItem("nuanya_sugar_checked");
    return saved ? saved === "true" : false;
  });

  // Save states to localStorage when updated
  useEffect(() => {
    localStorage.setItem("nuanya_stats", JSON.stringify(stats));
  }, [stats]);

  useEffect(() => {
    localStorage.setItem("nuanya_tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("nuanya_mood_history", JSON.stringify(moodHistory));
  }, [moodHistory]);

  useEffect(() => {
    localStorage.setItem("nuanya_water_cups", waterCups.toString());
  }, [waterCups]);

  useEffect(() => {
    localStorage.setItem("nuanya_breakfast_checked", breakfastChecked.toString());
  }, [breakfastChecked]);

  useEffect(() => {
    localStorage.setItem("nuanya_veggies_checked", veggiesChecked.toString());
  }, [veggiesChecked]);

  useEffect(() => {
    localStorage.setItem("nuanya_sugar_checked", sugarChecked.toString());
  }, [sugarChecked]);

  // Chat with Yaya (芽芽) states
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "嗨，我是芽芽！今天过得怎么样呀？不管开心还是疲惫，我都在这里温温暖暖地陪着你喔。要不要跟我聊聊天？🌱",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // One-tap Comfort state
  const [comfortModalOpen, setComfortModalOpen] = useState(false);
  const [comfortQuote, setComfortQuote] = useState("");
  const [comfortLoading, setComfortLoading] = useState(false);

  // Workout active timer states
  const [activeWorkout, setActiveWorkout] = useState<StretchWorkout | null>(null);
  const [timerOpen, setTimerOpen] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Mood selection form states
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);
  const [selectedEmojiName, setSelectedEmojiName] = useState<string>("");
  const [moodIntensity, setMoodIntensity] = useState<number>(3);
  const [selectedCauses, setSelectedCauses] = useState<string[]>([]);
  const [moodNote, setMoodNote] = useState<string>("");
  const [moodSavedToast, setMoodSavedToast] = useState(false);

  // Emotional Eating popup state
  const [dietCheckInResult, setDietCheckInResult] = useState<{ type: "hunger" | "stress"; text: string } | null>(null);

  // Scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Handle active workout timer ticks
  useEffect(() => {
    if (timerRunning && secondsLeft > 0) {
      timerRef.current = setTimeout(() => {
        setSecondsLeft((prev) => prev - 1);
        // Slowly advance step indices throughout the duration
        if (activeWorkout) {
          const totalSteps = activeWorkout.steps.length;
          const stepDuration = activeWorkout.duration / totalSteps;
          const elapsed = activeWorkout.duration - secondsLeft + 1;
          const stepIdx = Math.min(Math.floor(elapsed / stepDuration), totalSteps - 1);
          setCurrentStepIndex(stepIdx);
        }
      }, 1000);
    } else if (secondsLeft === 0 && timerRunning) {
      handleWorkoutComplete();
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [timerRunning, secondsLeft]);

  // Helper: Trigger custom Notification
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState("");

  const triggerNotification = (msg: string) => {
    setNotificationMsg(msg);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 4500);
  };

  // Toggle Task Completion
  const toggleTask = (taskId: string) => {
    setTasks(prev =>
      prev.map(t => {
        if (t.id === taskId) {
          const newCompleted = !t.completed;
          if (newCompleted) {
            triggerNotification(`🎉 完成任务“${t.title}”！活力值 +${t.points}`);
            setStats(s => ({
              ...s,
              vitality: Math.min(100, s.vitality + t.points)
            }));
          } else {
            setStats(s => ({
              ...s,
              vitality: Math.max(0, s.vitality - t.points)
            }));
          }
          return { ...t, completed: newCompleted };
        }
        return t;
      })
    );
  };

  // Log water intake
  const handleWaterClick = (change: number) => {
    setWaterCups(prev => {
      const newVal = Math.max(0, Math.min(4, prev + change));
      if (newVal === 4 && prev < 4) {
        triggerNotification("💦 喝足水分啦！完成了今日水分目标！活力值 +10");
        setStats(s => ({
          ...s,
          totalWaterCups: s.totalWaterCups + 1,
          vitality: Math.min(100, s.vitality + 10)
        }));
        // Auto check water task
        setTasks(t => t.map(item => item.id === "water-task" ? { ...item, completed: true } : item));
      }
      return newVal;
    });
  };

  // Start workout timer
  const startWorkout = (workout: StretchWorkout) => {
    setActiveWorkout(workout);
    setSecondsLeft(workout.duration);
    setCurrentStepIndex(0);
    setTimerRunning(true);
    setTimerOpen(true);
  };

  const handleWorkoutComplete = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setTimerRunning(false);
    setTimerOpen(false);
    if (activeWorkout) {
      triggerNotification(`🌸 完成“${activeWorkout.title}”！深深呼吸，身体感觉棒极了！活力值 +${activeWorkout.energyBoost}`);
      setStats(s => ({
        ...s,
        completedWorkoutsCount: s.completedWorkoutsCount + 1,
        vitality: Math.min(100, s.vitality + activeWorkout.energyBoost)
      }));

      // Check the stretch task if active
      if (activeWorkout.id === "desk-stretch" || activeWorkout.id === "neck-stretch") {
        setTasks(t => t.map(item => item.id === "stretch-task" ? { ...item, completed: true } : item));
      }
    }
    setActiveWorkout(null);
  };

  // Get Quote from Yaya on demand
  const handleGetComfortQuote = async () => {
    setComfortLoading(true);
    setComfortModalOpen(true);
    try {
      const response = await fetch("/api/comfort");
      const data = await response.json();
      setComfortQuote(data.quote || "深深地吸一口气，把小肩膀放轻松，你已经很棒啦！芽芽在默默给你打气喔🌱");
    } catch (err) {
      console.error(err);
      setComfortQuote("无论今天完成了多少事情，你本身就是一个闪闪发光的存在呀！慢慢来，不要着急喔🌱");
    } finally {
      setComfortLoading(false);
    }
  };

  // Handle Quick Mood picker
  const handleQuickMood = (emoji: string, name: string) => {
    setSelectedEmoji(emoji);
    setSelectedEmojiName(name);
    // Switch to mood tab to fill causes if they want
    setActiveTab("mood");
    triggerNotification(`已选择“${name}”心情，来写写原因吧！`);
  };

  // Save detailed Mood Entry
  const handleSaveMoodEntry = () => {
    if (!selectedEmoji) return;
    const newEntry: MoodEntry = {
      id: Math.random().toString(36).substring(7),
      emoji: selectedEmoji,
      name: selectedEmojiName,
      intensity: moodIntensity,
      causes: selectedCauses,
      note: moodNote.trim() || undefined,
      timestamp: new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMoodHistory(prev => [newEntry, ...prev]);
    setStats(s => ({
      ...s,
      moodEntriesCount: s.moodEntriesCount + 1,
      vitality: Math.min(100, s.vitality + 10)
    }));

    // Auto check mood task
    setTasks(t => t.map(item => item.id === "mood-task" ? { ...item, completed: true } : item));

    setMoodSavedToast(true);
    triggerNotification("📝 心情记录成功！活力值 +10");
    setTimeout(() => setMoodSavedToast(false), 3000);

    // Reset mood input form partially
    setMoodNote("");
  };

  // Send message to Gemini server
  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isTyping) return;
    const userMsgText = inputMessage.trim();
    setInputMessage("");

    const userMsg: Message = {
      id: Math.random().toString(36).substring(7),
      role: "user",
      content: userMsgText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    try {
      const convoHistory = [...messages, userMsg].map(m => ({
        role: m.role,
        content: m.content
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: convoHistory })
      });

      const data = await res.json();
      const assistantMsg: Message = {
        id: Math.random().toString(36).substring(7),
        role: "assistant",
        content: data.reply || "芽芽有点犯困了，但深深吸一口气，还是会陪在你的身边喔！🌱",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      console.error(err);
      const assistantMsg: Message = {
        id: Math.random().toString(36).substring(7),
        role: "assistant",
        content: "咕噜噜……芽芽刚才好像打了个哈欠，网络悄悄开小差了呢。不过没关系，只要你愿意，芽芽一直都会是你贴心的小萌芽喔。❤️",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, assistantMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  // Profile Edit Modal
  const [profileEditOpen, setProfileEditOpen] = useState(false);
  const [editName, setEditName] = useState(stats.name);
  const [editFocus, setEditFocus] = useState(stats.focusMessage);

  const saveProfileEdit = () => {
    setStats(prev => ({
      ...prev,
      name: editName.trim() || "Jamie",
      focusMessage: editFocus.trim() || "深深呼吸，让绿意在心中悄悄萌芽吧。"
    }));
    setProfileEditOpen(false);
    triggerNotification("👤 个人资料修改成功！");
  };

  return (
    <div className="font-sans antialiased bg-background min-h-screen text-on-background relative flex flex-col pb-24 md:pb-0 overflow-x-hidden">
      
      {/* Background Ambience elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[10%] -right-[10%] w-[60vw] h-[60vw] bg-primary-container/15 organic-shape-1 blur-3xl"></div>
        <div className="absolute top-[35%] -left-[20%] w-[70vw] h-[70vw] bg-secondary-container/15 organic-shape-2 blur-3xl"></div>
      </div>

      {/* Header Notification Toast */}
      {showNotification && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md bg-white rounded-2xl shadow-xl border border-primary/20 p-4 flex items-start gap-3 animate-bounce">
          <div className="w-8 h-8 rounded-full bg-primary-container/30 flex items-center justify-center text-primary shrink-0">
            <Sparkles className="w-4.5 h-4.5" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-primary-fixed-dim bg-primary/10 px-2 py-0.5 rounded-full inline-block text-[11px] mb-1">
              暖芽成长广播
            </p>
            <p className="text-xs text-on-surface font-medium">{notificationMsg}</p>
          </div>
          <button onClick={() => setShowNotification(false)} className="text-on-surface-variant hover:text-on-surface">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Top App Bar Web (Hidden on mobile) */}
      <header className="hidden md:flex bg-white/75 backdrop-blur-md sticky top-0 z-40 justify-between items-center px-10 py-4 border-b border-surface-variant/30">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-primary/20">
            <img
              alt="Jamie Avatar"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjQfZzBPCwMLfsEa8QHTlbSxOBW6l8YZckG__okJ71VsWPeuUuvQoa8KgkUgBSE6LCaK3lkNmyTHWqRzmS9YYUfbncG-e0vo7bNzgfFtvH4pNj_ibrfoctTLxNg3gE7Dx8lVP8vAB8tnA85QX5sEniNq45_3FW6s7fT3dAUp8_Km1xMGwlDu9NWaClnPt89f2u6rMvkjtYWW9CFvo6Qa6lqEGesUNuwoA4EWV6Om0S0utW1nBPh-9VVYuE6E2v1AhPPzkeK8Y9z5g"
            />
          </div>
          <div>
            <h1 className="font-headline font-bold text-lg text-primary">Good morning, {stats.name}</h1>
            <p className="text-[11px] text-on-surface-variant">今日活力值：{stats.vitality}% • 连续打卡：{stats.streak}天</p>
          </div>
        </div>

        <nav className="flex gap-1 items-center">
          <button
            onClick={() => setActiveTab("home")}
            className={`flex flex-col items-center px-4 py-2 rounded-xl transition-all ${
              activeTab === "home" ? "bg-primary/10 text-primary font-semibold" : "text-on-surface-variant hover:bg-surface-container"
            }`}
          >
            <HomeIcon className="w-5 h-5 mb-0.5" />
            <span className="text-xs">首页</span>
          </button>
          <button
            onClick={() => setActiveTab("mood")}
            className={`flex flex-col items-center px-4 py-2 rounded-xl transition-all ${
              activeTab === "mood" ? "bg-primary/10 text-primary font-semibold" : "text-on-surface-variant hover:bg-surface-container"
            }`}
          >
            <Smile className="w-5 h-5 mb-0.5" />
            <span className="text-xs">心情</span>
          </button>
          <button
            onClick={() => setActiveTab("exercise")}
            className={`flex flex-col items-center px-4 py-2 rounded-xl transition-all ${
              activeTab === "exercise" ? "bg-primary/10 text-primary font-semibold" : "text-on-surface-variant hover:bg-surface-container"
            }`}
          >
            <Dumbbell className="w-5 h-5 mb-0.5" />
            <span className="text-xs">运动</span>
          </button>
          <button
            onClick={() => setActiveTab("diet")}
            className={`flex flex-col items-center px-4 py-2 rounded-xl transition-all ${
              activeTab === "diet" ? "bg-primary/10 text-primary font-semibold" : "text-on-surface-variant hover:bg-surface-container"
            }`}
          >
            <Utensils className="w-5 h-5 mb-0.5" />
            <span className="text-xs">饮食</span>
          </button>
          <button
            onClick={() => setActiveTab("profile")}
            className={`flex flex-col items-center px-4 py-2 rounded-xl transition-all ${
              activeTab === "profile" ? "bg-primary/10 text-primary font-semibold" : "text-on-surface-variant hover:bg-surface-container"
            }`}
          >
            <User className="w-5 h-5 mb-0.5" />
            <span className="text-xs">个人</span>
          </button>
        </nav>

        <button
          onClick={() => triggerNotification("🔔 愿你今天被温柔以待，深呼吸，和烦恼说拜拜喔。")}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-variant transition-colors text-primary border border-primary/20"
        >
          <Bell className="w-4.5 h-4.5" />
        </button>
      </header>

      {/* Top App Bar Mobile */}
      <header className="md:hidden bg-white/80 backdrop-blur-md flex justify-between items-center px-6 py-3 sticky top-0 z-40 border-b border-surface-variant/30">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full overflow-hidden border border-primary/20">
            <img
              alt="Jamie Avatar"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjQfZzBPCwMLfsEa8QHTlbSxOBW6l8YZckG__okJ71VsWPeuUuvQoa8KgkUgBSE6LCaK3lkNmyTHWqRzmS9YYUfbncG-e0vo7bNzgfFtvH4pNj_ibrfoctTLxNg3gE7Dx8lVP8vAB8tnA85QX5sEniNq45_3FW6s7fT3dAUp8_Km1xMGwlDu9NWaClnPt89f2u6rMvkjtYWW9CFvo6Qa6lqEGesUNuwoA4EWV6Om0S0utW1nBPh-9VVYuE6E2v1AhPPzkeK8Y9z5g"
            />
          </div>
          <div>
            <h1 className="font-headline font-bold text-sm text-primary">Good morning, {stats.name}</h1>
          </div>
        </div>
        <button
          onClick={() => triggerNotification("🔔 每天都是全新的开始，慢慢来，芽芽一直陪着你呢。")}
          className="w-8.5 h-8.5 flex items-center justify-center rounded-full bg-surface-container text-primary"
        >
          <Bell className="w-4 h-4" />
        </button>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-6 md:py-10 relative z-10 flex flex-col gap-8">
        
        {/* TAB 1: HOME */}
        {activeTab === "home" && (
          <div className="flex flex-col gap-8 animate-fade-in">
            
            {/* Greeting and Yaya Buddy Character representation */}
            <section className="flex flex-col items-center justify-center gap-6 relative min-h-[300px] text-center pt-4">
              <div>
                <p className="font-headline font-semibold text-lg md:text-xl text-on-surface">
                  你好 {stats.name}，今天我们一起成长！
                </p>
                <div className="inline-flex items-center gap-1.5 bg-primary/10 text-primary font-medium text-xs px-3 py-1 rounded-full mt-2 border border-primary/20">
                  <Heart className="w-3.5 h-3.5 fill-current" />
                  <span>今日照顾 • 小树芽状态</span>
                </div>
              </div>

              {/* Sprout Buddy representation */}
              <div className="relative w-48 h-48 flex items-center justify-center bg-white/40 rounded-full shadow-lg border border-white/20">
                {/* Ambient dynamic pulse */}
                <div className="absolute inset-0 bg-primary-fixed-dim/20 rounded-full animate-pulse blur-xl"></div>
                <img
                  alt="Yaya the Sprout Buddy"
                  className="w-32 h-32 object-contain relative z-10 drop-shadow-md hover:scale-105 transition-transform duration-300 cursor-pointer"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBszP3YwEr1Sa-6RmwnQFC2WDJBPnoVRE359SVyR0jhDs_eUH1CWbMFOy0trWBAYhsHnGmZJVS7jCemE2ckAO4LMk7bT7_N60D09vMgn6AABkqDpgTUDOHHpraPrSbNRZsJo-hAn2HqtHB2dv30G-NbJGRokflj0mZ81loJFWrtQUlIABYlizd2SYfKQBa45wfKwtIyjcErLIhoyXEv6ONpOokf3B0viNC318YpeSZq3pq6W9Y0OSxZEZ0j_NVJr88ogv-ukqFrIYA"
                  onClick={() => {
                    setChatOpen(true);
                    triggerNotification("💬 “嗨！你摸了我一下，是要和我说说话吗？”");
                  }}
                />
              </div>

              {/* Dynamic status bubble from Yaya */}
              <div className="bg-white/95 rounded-2xl px-5 py-3 border border-primary-container max-w-sm shadow-sm relative text-xs text-on-surface font-medium italic">
                <span className="relative z-10">“{stats.focusMessage}”</span>
                <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45 border-r border-b border-primary-container"></div>
              </div>

              {/* Quick Mood Selector inside home */}
              <div className="flex flex-col gap-2 items-center w-full max-w-md mt-2">
                <p className="text-[11px] font-semibold text-on-surface-variant tracking-wider uppercase">今天感觉如何？快捷打卡</p>
                <div className="flex justify-center gap-3 bg-white/75 p-2 rounded-full border border-surface-variant/40 shadow-sm w-full">
                  <button onClick={() => handleQuickMood("😊", "开心")} className="w-10 h-10 rounded-full hover:scale-115 transition-transform flex items-center justify-center text-xl bg-secondary-container/50 text-on-secondary-container">😊</button>
                  <button onClick={() => handleQuickMood("😌", "平静")} className="w-10 h-10 rounded-full hover:scale-115 transition-transform flex items-center justify-center text-xl bg-primary-container/30 text-on-primary-container">😌</button>
                  <button onClick={() => handleQuickMood("😠", "烦躁")} className="w-10 h-10 rounded-full hover:scale-115 transition-transform flex items-center justify-center text-xl bg-red-100 text-red-600">😠</button>
                  <button onClick={() => handleQuickMood("😰", "焦虑")} className="w-10 h-10 rounded-full hover:scale-115 transition-transform flex items-center justify-center text-xl bg-blue-100 text-blue-600">😰</button>
                  <button onClick={() => handleQuickMood("😢", "难过")} className="w-10 h-10 rounded-full hover:scale-115 transition-transform flex items-center justify-center text-xl bg-purple-100 text-purple-600">😢</button>
                </div>
              </div>
            </section>

            {/* Today's 3 Light Tasks */}
            <section className="flex flex-col gap-4">
              <h2 className="font-headline font-bold text-base md:text-lg text-on-surface">今日 3 个轻量任务</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className={`bg-white rounded-2xl p-5 flex items-center gap-4 border shadow-sm relative overflow-hidden transition-all duration-300 ${
                      task.completed ? "border-primary/30 opacity-75" : "border-surface-variant/40 hover:border-primary/30"
                    }`}
                  >
                    <div
                      className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${
                        task.completed ? "bg-primary/20 text-primary" : "bg-primary-container/20 text-primary"
                      }`}
                    >
                      <span className="material-symbols-outlined text-[20px]">{task.icon}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className={`text-sm font-semibold text-on-surface ${task.completed ? "line-through text-on-surface-variant" : ""}`}>
                        {task.title}
                      </h3>
                      <p className="text-[11px] text-on-surface-variant mt-0.5">{task.subtitle}</p>
                    </div>
                    <button
                      onClick={() => toggleTask(task.id)}
                      className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all ${
                        task.completed
                          ? "bg-primary border-primary text-white"
                          : "border-outline-variant hover:border-primary text-transparent"
                      }`}
                    >
                      <Check className="w-3.5 h-3.5 stroke-[3px]" />
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* TAB 2: MOOD RECORDING */}
        {activeTab === "mood" && (
          <div className="flex flex-col gap-8 animate-fade-in">
            <section className="text-center flex flex-col gap-2">
              <h2 className="font-headline font-bold text-xl md:text-2xl text-primary">你现在感觉怎么样？</h2>
              <p className="text-on-surface-variant text-xs md:text-sm">深呼吸，选择最符合你当下的情绪表情。</p>
            </section>

            {/* Emoji Selector */}
            <section className="grid grid-cols-4 md:grid-cols-7 gap-3 mt-2">
              {[
                { emoji: "😊", name: "开心" },
                { emoji: "😌", name: "平静" },
                { emoji: "😠", name: "烦躁" },
                { emoji: "😰", name: "焦虑" },
                { emoji: "😢", name: "难过" },
                { emoji: "🤕", name: "受伤" },
                { emoji: "😶", name: "空白" }
              ].map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    setSelectedEmoji(item.emoji);
                    setSelectedEmojiName(item.name);
                  }}
                  className={`flex flex-col items-center gap-1.5 p-4 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all border ${
                    selectedEmoji === item.emoji
                      ? "border-primary bg-primary-fixed/20 shadow-lg scale-105"
                      : "border-surface-variant/30 hover:border-primary-container"
                  }`}
                >
                  <span className="text-3xl transition-transform hover:scale-110">{item.emoji}</span>
                  <span className="text-xs font-semibold text-on-surface">{item.name}</span>
                </button>
              ))}
            </section>

            {/* Intensity Slider */}
            <section className="bg-white/80 rounded-2xl p-6 border border-surface-variant/30 flex flex-col gap-5 shadow-sm">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold text-on-surface flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  感受有多强烈？
                </h3>
                <span className="text-xs font-bold text-primary bg-primary-container/20 px-3 py-1 rounded-full">
                  程度: {moodIntensity}
                </span>
              </div>
              <div className="px-2 pt-2">
                <input
                  className="w-full cursor-pointer accent-primary"
                  max="5"
                  min="1"
                  type="range"
                  value={moodIntensity}
                  onChange={(e) => setMoodIntensity(parseInt(e.target.value, 10))}
                />
                <div className="flex justify-between mt-3 text-on-surface-variant text-[11px] font-medium">
                  <span>很轻微 (1)</span>
                  <span>一点点 (2)</span>
                  <span>中等 (3)</span>
                  <span>比较强 (4)</span>
                  <span>非常强烈 (5)</span>
                </div>
              </div>
            </section>

            {/* Causes selection */}
            <section className="flex flex-col gap-4">
              <h3 className="text-sm font-bold text-on-surface text-center">是什么让你有这种感觉？</h3>
              <div className="flex flex-wrap justify-center gap-2.5">
                {["学习", "家庭", "朋友", "身体", "睡眠", "饮食", "不清楚"].map((cause) => {
                  const isSelected = selectedCauses.includes(cause);
                  return (
                    <button
                      key={cause}
                      onClick={() => {
                        setSelectedCauses(prev =>
                          isSelected ? prev.filter((c) => c !== cause) : [...prev, cause]
                        );
                      }}
                      className={`px-5 py-2 rounded-full border text-xs font-medium transition-all ${
                        isSelected
                          ? "bg-secondary-container border-transparent text-on-secondary-container shadow-sm scale-105"
                          : "border-outline-variant hover:bg-surface-container text-on-surface-variant"
                      }`}
                    >
                      {cause}
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Self-writing Note & Submit Button */}
            <section className="bg-white/80 rounded-2xl p-6 border border-surface-variant/30 shadow-sm flex flex-col gap-4">
              <label htmlFor="mood-textarea" className="text-xs font-bold text-on-surface">添加碎碎念（今日心情备忘）</label>
              <textarea
                id="mood-textarea"
                rows={3}
                placeholder="在暖芽这里，你可以说任何话。比如学业上的烦恼、遇到的开心小事，或者今天只是单纯觉得很累..."
                className="w-full text-xs p-3 rounded-xl border border-surface-variant bg-background focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-on-background placeholder-on-surface-variant/60 resize-none"
                value={moodNote}
                onChange={(e) => setMoodNote(e.target.value)}
              />
              <button
                onClick={handleSaveMoodEntry}
                disabled={!selectedEmoji}
                className={`w-full py-3 px-6 rounded-full font-semibold text-xs tracking-wider uppercase shadow-md transition-all duration-300 ${
                  selectedEmoji
                    ? "bg-primary text-white hover:bg-primary/95 hover:shadow-lg active:scale-98"
                    : "bg-surface-container text-on-surface-variant cursor-not-allowed"
                }`}
              >
                保存心情打卡
              </button>
            </section>

            {/* Interactive Chat trigger section */}
            <section className="flex flex-col items-center mt-4">
              <div className="bg-surface-container rounded-3xl p-6 w-full max-w-md relative overflow-hidden shadow-sm flex flex-col items-center text-center gap-4 border border-surface-variant/50">
                <div className="absolute -top-10 -right-10 w-28 h-28 bg-secondary-container/40 rounded-full opacity-50 blur-xl"></div>
                <div className="w-14 h-14 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center shadow-sm z-10">
                  <span className="material-symbols-outlined text-[28px]">psychology</span>
                </div>
                <div className="z-10 flex flex-col items-center gap-3">
                  <p className="text-xs text-on-surface font-semibold">“我在听，如果你愿意，可以跟我多说说。”</p>
                  <button
                    onClick={() => setChatOpen(true)}
                    className="bg-primary text-white font-medium text-xs px-6 py-3 rounded-full shadow-md hover:bg-primary/95 transition-all flex items-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    和芽芽聊聊
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* TAB 3: EXERCISE */}
        {activeTab === "exercise" && (
          <div className="flex flex-col gap-8 animate-fade-in">
            <div className="flex flex-col gap-2">
              <h2 className="font-headline font-bold text-xl md:text-2xl text-on-surface">跟着芽芽动一动</h2>
              <p className="text-on-surface-variant text-xs md:text-sm">学习累了，或感到焦虑紧张？抽出几分钟，跟着芽芽舒缓全身吧。</p>
            </div>

            {/* Vitality Energy Bar */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border border-surface-variant/30 flex items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="text-sm font-bold text-on-surface">今日身体活力值 (Vitality)</h3>
                  <span className="text-xs font-bold text-primary">{stats.vitality}/100</span>
                </div>
                <div className="h-4.5 w-full bg-surface-variant rounded-full overflow-hidden">
                  <div
                    className="h-full energy-bar-fill rounded-full transition-all duration-1000"
                    style={{ width: `${stats.vitality}%` }}
                  ></div>
                </div>
              </div>
              <div className="w-14 h-14 bg-secondary-container text-on-secondary-container rounded-full flex items-center justify-center shrink-0 shadow-sm animate-pulse">
                <span className="material-symbols-outlined text-[28px]">eco</span>
              </div>
            </section>

            {/* Stretch Workout Cards */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {WORKOUTS.map((workout) => (
                <div
                  key={workout.id}
                  className="bg-white rounded-2xl p-5 border border-surface-variant/30 shadow-sm flex flex-col h-full hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="h-36 rounded-xl bg-surface-container-low mb-4 overflow-hidden relative flex items-center justify-center">
                    <img
                      alt={workout.title}
                      className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-85"
                      src={workout.image}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low/70 to-transparent"></div>
                  </div>
                  <h3 className="text-sm font-bold text-on-surface mb-1">{workout.title}</h3>
                  <p className="text-[11px] text-on-surface-variant flex-grow mb-5">{workout.subtitle}</p>
                  <button
                    onClick={() => startWorkout(workout)}
                    className="w-full bg-primary hover:bg-primary/95 text-white font-semibold text-[11px] tracking-wider uppercase py-2.5 px-4 rounded-full shadow transition-all duration-200"
                  >
                    开始拉伸
                  </button>
                </div>
              ))}
            </section>
          </div>
        )}

        {/* TAB 4: DIET */}
        {activeTab === "diet" && (
          <div className="flex flex-col gap-8 animate-fade-in">
            <div className="flex flex-col gap-2">
              <h2 className="font-headline font-bold text-xl md:text-2xl text-on-surface">给身体补充能量</h2>
              <p className="text-on-surface-variant text-xs md:text-sm">关注食物带来的真实力量。滋养身体，也是滋养心灵的一部分喔。</p>
            </div>

            {/* Hero Image Section */}
            <section className="relative w-full h-48 rounded-2xl overflow-hidden shadow-sm border border-surface-variant/30">
              <img
                alt="Yaya in Kitchen"
                className="w-full h-full object-cover opacity-85 mix-blend-multiply"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfV-HqN00H0VbZj0u-VoL7C6cAyk761hB5hnehPP3sAsJFIMbzjeNbFLOoYusOMq1usO3uqdP5iJlkVv3Zw4-4YKwJlzVjGyab-3yK8TJv2XJ26S4rIF44CcSzkixtrZOvTzatwaEnEjECTV9ASSh3hwYxcONh6uYY-ZLuoURQlc7DqBazNuvIqiljE2vG4C3I7DeP9LdH9Rrbt4UceYa7oCfPoceSW21Z65FAn4I4zkNyZxo9uH2wtLw24D1muJx0urM_N8axD7E"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 p-4 glass-panel rounded-xl">
                <p className="text-xs font-semibold text-on-surface leading-relaxed">
                  “饮食是我们能量的源泉。让我们关注吃进去的东西带来的感受。”
                </p>
              </div>
            </section>

            {/* Bento Grid Daily Goals */}
            <section className="flex flex-col gap-4">
              <h3 className="text-sm font-bold text-on-surface flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                今日小目标
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Water Logger card */}
                <div className="bg-white rounded-2xl p-6 border border-surface-variant/30 flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shadow-sm shrink-0">
                      <span className="material-symbols-outlined text-[22px]">water_drop</span>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-on-surface">喝足水分</p>
                      <p className="text-[10px] text-on-surface-variant mt-0.5">滋润身体的每个细胞</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Visual cups */}
                    <div className="flex gap-1.5">
                      {[1, 2, 3, 4].map((cup) => (
                        <div
                          key={cup}
                          className={`w-4 h-4 rounded-full transition-all ${
                            cup <= waterCups ? "bg-blue-500 scale-110 shadow-sm" : "bg-blue-200/40"
                          }`}
                        ></div>
                      ))}
                    </div>
                    <div className="flex items-center gap-1 bg-surface-container px-2.5 py-1 rounded-full border border-surface-variant/20">
                      <button onClick={() => handleWaterClick(-1)} className="text-on-surface-variant hover:text-primary">
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-xs font-bold text-blue-600 min-w-[24px] text-center">{waterCups}/4</span>
                      <button onClick={() => handleWaterClick(1)} className="text-on-surface-variant hover:text-primary">
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Breakfast Goal */}
                <div
                  onClick={() => {
                    const newVal = !breakfastChecked;
                    setBreakfastChecked(newVal);
                    if (newVal) {
                      triggerNotification("🍳 棒！吃顿营养早餐，给全新的一天充满电喔！活力值 +5");
                      setStats(s => ({ ...s, vitality: Math.min(100, s.vitality + 5) }));
                    } else {
                      setStats(s => ({ ...s, vitality: Math.max(0, s.vitality - 5) }));
                    }
                  }}
                  className={`rounded-2xl p-5 border flex items-center justify-between cursor-pointer transition-all duration-300 ${
                    breakfastChecked ? "bg-secondary-container/10 border-secondary/30" : "bg-white border-surface-variant/30 hover:border-secondary-container"
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-full bg-secondary-container/60 text-on-secondary-container flex items-center justify-center shadow-sm">
                      <span className="material-symbols-outlined text-[20px]">bakery_dining</span>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-on-surface">吃顿好早餐</p>
                      <p className="text-[10px] text-on-surface-variant mt-0.5">唤醒新的一天</p>
                    </div>
                  </div>
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      breakfastChecked ? "bg-secondary border-secondary text-white" : "border-outline-variant text-transparent"
                    }`}
                  >
                    <Check className="w-3 h-3 stroke-[3px]" />
                  </div>
                </div>

                {/* Veggies Goal */}
                <div
                  onClick={() => {
                    const newVal = !veggiesChecked;
                    setVeggiesChecked(newVal);
                    if (newVal) {
                      triggerNotification("🥦 太棒了！摄入了丰富的微量元素！活力值 +5");
                      setStats(s => ({ ...s, vitality: Math.min(100, s.vitality + 5) }));
                    } else {
                      setStats(s => ({ ...s, vitality: Math.max(0, s.vitality - 5) }));
                    }
                  }}
                  className={`rounded-2xl p-5 border flex items-center justify-between cursor-pointer transition-all duration-300 ${
                    veggiesChecked ? "bg-primary-container/10 border-primary/30" : "bg-white border-surface-variant/30 hover:border-primary-container"
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-full bg-primary-container/60 text-on-primary-container flex items-center justify-center shadow-sm">
                      <span className="material-symbols-outlined text-[20px]">nutrition</span>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-on-surface">彩虹蔬菜</p>
                      <p className="text-[10px] text-on-surface-variant mt-0.5">丰富的微量元素</p>
                    </div>
                  </div>
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      veggiesChecked ? "bg-primary border-primary text-white" : "border-outline-variant text-transparent"
                    }`}
                  >
                    <Check className="w-3 h-3 stroke-[3px]" />
                  </div>
                </div>

                {/* Sugar Goal */}
                <div
                  onClick={() => {
                    const newVal = !sugarChecked;
                    setSugarChecked(newVal);
                    if (newVal) {
                      triggerNotification("🍀 赞！控糖让今天的能量更平稳，头脑更清爽喔！活力值 +5");
                      setStats(s => ({ ...s, vitality: Math.min(100, s.vitality + 5) }));
                    } else {
                      setStats(s => ({ ...s, vitality: Math.max(0, s.vitality - 5) }));
                    }
                  }}
                  className={`rounded-2xl p-5 border flex items-center justify-between cursor-pointer transition-all duration-300 ${
                    sugarChecked ? "bg-surface-variant/10 border-outline-variant" : "bg-white border-surface-variant/30 hover:border-outline-variant"
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-full bg-surface-variant/80 text-on-surface-variant flex items-center justify-center shadow-sm">
                      <span className="material-symbols-outlined text-[20px]">icecream</span>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-on-surface">减少额外糖分</p>
                      <p className="text-[10px] text-on-surface-variant mt-0.5">保持能量平稳</p>
                    </div>
                  </div>
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      sugarChecked ? "bg-on-surface-variant border-on-surface-variant text-white" : "border-outline-variant text-transparent"
                    }`}
                  >
                    <Check className="w-3 h-3 stroke-[3px]" />
                  </div>
                </div>
              </div>
            </section>

            {/* Emotional Eating Check-in Section */}
            <section className="bg-primary-container/10 rounded-2xl p-6 border border-primary-container/30 flex flex-col gap-5 items-center text-center relative overflow-hidden shadow-sm">
              <div className="absolute -top-12 -left-12 w-32 h-32 bg-primary-fixed-dim/10 rounded-full blur-xl pointer-events-none"></div>
              <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-secondary-container/10 rounded-full blur-xl pointer-events-none"></div>
              
              <div className="w-14 h-14 rounded-full growth-orb flex items-center justify-center relative z-10 shadow-sm animate-pulse">
                <span className="material-symbols-outlined text-[28px] text-on-primary-fixed">psychology</span>
              </div>
              <div className="z-10 max-w-sm">
                <h3 className="text-sm font-bold text-on-surface mb-1">情绪饮食打卡</h3>
                <p className="text-[11px] text-on-surface-variant italic">“我现在是真饿了，还是压力大？”</p>
              </div>

              <div className="flex gap-3 w-full max-w-md z-10">
                <button
                  onClick={() => {
                    setDietCheckInResult({
                      type: "hunger",
                      text: "真肚子饿的时候，请大大方方、香香甜甜地饱餐一顿喔！身体得到温柔滋养，心情也会变得暖洋洋。芽芽建议你选择热腾腾的面食、新鲜的水果，或者坚果作为能量补充喔。🥣"
                    });
                  }}
                  className="flex-1 bg-white hover:bg-slate-50 py-3 px-4 rounded-full font-semibold text-xs text-on-surface shadow-sm hover:shadow border border-surface-variant/40 flex items-center justify-center gap-1.5 transition-all"
                >
                  <span className="material-symbols-outlined text-tertiary text-sm">restaurant_menu</span>
                  肚子饿了
                </button>
                <button
                  onClick={() => {
                    setDietCheckInResult({
                      type: "stress",
                      text: "原来是觉得烦闷或者有压力呀。摸摸头！如果现在吃东西，只是想要填补烦躁的心情，那我们可以先试着喝一杯暖呼呼的白开水，或者做一个两分钟的吸气吐气小练习。你也可以点击下方的【和芽芽聊聊】，把烦恼写下来，芽芽会一直听着的。🌱"
                    });
                  }}
                  className="flex-1 bg-white hover:bg-slate-50 py-3 px-4 rounded-full font-semibold text-xs text-on-surface shadow-sm hover:shadow border border-surface-variant/40 flex items-center justify-center gap-1.5 transition-all"
                >
                  <span className="material-symbols-outlined text-secondary text-sm">sentiment_dissatisfied</span>
                  只是有点烦
                </button>
              </div>

              {/* Emotional eating check-in dialog */}
              {dietCheckInResult && (
                <div className="bg-white rounded-2xl p-4.5 border border-primary-container/40 text-left w-full mt-3 flex flex-col gap-3 relative z-10 animate-fade-in text-xs leading-relaxed text-on-surface">
                  <div className="flex justify-between items-center pb-2 border-b border-surface-variant/30">
                    <span className="font-bold flex items-center gap-1.5 text-primary">
                      {dietCheckInResult.type === "hunger" ? "🥣 芽芽温和提醒" : "🌱 芽芽给你抱抱"}
                    </span>
                    <button onClick={() => setDietCheckInResult(null)} className="text-on-surface-variant hover:text-on-surface p-1 rounded-full hover:bg-surface-container">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p>{dietCheckInResult.text}</p>
                </div>
              )}
            </section>
          </div>
        )}

        {/* TAB 5: PROFILE */}
        {activeTab === "profile" && (
          <div className="flex flex-col gap-8 animate-fade-in">
            {/* User card header */}
            <section className="bg-white rounded-2xl p-6 border border-surface-variant/30 shadow-sm flex flex-col md:flex-row items-center gap-5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary-container/10 rounded-bl-full pointer-events-none"></div>
              
              <div className="w-18 h-18 rounded-full overflow-hidden shrink-0 border-2 border-primary/20">
                <img
                  alt="Jamie Profile Avatar"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjQfZzBPCwMLfsEa8QHTlbSxOBW6l8YZckG__okJ71VsWPeuUuvQoa8KgkUgBSE6LCaK3lkNmyTHWqRzmS9YYUfbncG-e0vo7bNzgfFtvH4pNj_ibrfoctTLxNg3gE7Dx8lVP8vAB8tnA85QX5sEniNq45_3FW6s7fT3dAUp8_Km1xMGwlDu9NWaClnPt89f2u6rMvkjtYWW9CFvo6Qa6lqEGesUNuwoA4EWV6Om0S0utW1nBPh-9VVYuE6E2v1AhPPzkeK8Y9z5g"
                />
              </div>

              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center gap-2 mb-1 justify-center md:justify-start">
                  <h2 className="font-headline font-bold text-lg text-primary">{stats.name} 的暖芽日记</h2>
                  <button
                    onClick={() => {
                      setEditName(stats.name);
                      setEditFocus(stats.focusMessage);
                      setProfileEditOpen(true);
                    }}
                    className="inline-flex items-center gap-1 bg-surface-container hover:bg-surface-container-high px-2 py-1 rounded text-[10px] font-semibold text-primary-fixed-dim shrink-0 transition-colors self-center"
                  >
                    <Edit2 className="w-3 h-3" />
                    修改资料
                  </button>
                </div>
                <p className="text-xs text-on-surface-variant italic leading-relaxed">“{stats.focusMessage}”</p>
              </div>
            </section>

            {/* Achievement Statistics badges */}
            <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-2xl p-4.5 border border-surface-variant/30 text-center shadow-sm flex flex-col items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-secondary-container/50 text-on-secondary-container flex items-center justify-center">
                  <Calendar className="w-4.5 h-4.5" />
                </div>
                <p className="text-[10px] font-semibold text-on-surface-variant">连续打卡</p>
                <p className="text-lg font-bold text-secondary">{stats.streak} 天</p>
              </div>

              <div className="bg-white rounded-2xl p-4.5 border border-surface-variant/30 text-center shadow-sm flex flex-col items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">water_drop</span>
                </div>
                <p className="text-[10px] font-semibold text-on-surface-variant">今日喝水</p>
                <p className="text-lg font-bold text-blue-600">{waterCups}/4 杯</p>
              </div>

              <div className="bg-white rounded-2xl p-4.5 border border-surface-variant/30 text-center shadow-sm flex flex-col items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-primary-container/30 text-primary flex items-center justify-center">
                  <Dumbbell className="w-4.5 h-4.5" />
                </div>
                <p className="text-[10px] font-semibold text-on-surface-variant">舒缓拉伸</p>
                <p className="text-lg font-bold text-primary">{stats.completedWorkoutsCount} 次</p>
              </div>

              <div className="bg-white rounded-2xl p-4.5 border border-surface-variant/30 text-center shadow-sm flex flex-col items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
                  <Smile className="w-4.5 h-4.5" />
                </div>
                <p className="text-[10px] font-semibold text-on-surface-variant">心情记录</p>
                <p className="text-lg font-bold text-purple-600">{stats.moodEntriesCount} 次</p>
              </div>
            </section>

            {/* Mood entries history log */}
            <section className="flex flex-col gap-4">
              <h3 className="text-sm font-bold text-on-surface flex items-center gap-2">
                <Award className="w-4 h-4 text-primary" />
                历史心情足迹
              </h3>

              {moodHistory.length === 0 ? (
                <div className="bg-white/50 rounded-2xl p-8 border border-dashed border-surface-variant text-center text-xs text-on-surface-variant leading-relaxed">
                  <p>这里还没有足迹呢。回到【心情】标签，打卡第一个今日情绪，给芽芽浇浇水吧🌱</p>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {moodHistory.map((entry) => (
                    <div key={entry.id} className="bg-white rounded-2xl p-5 border border-surface-variant/30 shadow-sm flex flex-col gap-2.5">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2.5">
                          <span className="text-2xl">{entry.emoji}</span>
                          <div>
                            <span className="text-xs font-bold text-on-surface bg-surface-container px-2.5 py-0.5 rounded-full inline-block">
                              {entry.name}
                            </span>
                            <span className="text-[10px] font-bold text-primary bg-primary-container/15 px-2 py-0.5 rounded-full ml-1.5">
                              强烈度: {entry.intensity}
                            </span>
                          </div>
                        </div>
                        <span className="text-[10px] text-on-surface-variant font-medium">{entry.timestamp}</span>
                      </div>
                      
                      {entry.causes.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {entry.causes.map((c) => (
                            <span key={c} className="text-[9px] font-semibold text-on-secondary-container bg-secondary-container/40 px-2 py-0.5 rounded">
                              #{c}
                            </span>
                          ))}
                        </div>
                      )}

                      {entry.note && (
                        <p className="text-xs text-on-surface bg-surface-container-low/40 p-3 rounded-xl border border-surface-variant/20 italic leading-relaxed">
                          “{entry.note}”
                        </p>
                      )}
                    </div>
                  ))}
                  
                  <button
                    onClick={() => {
                      if (window.confirm("确定要清空历史心情足迹吗？（不可恢复）")) {
                        setMoodHistory([]);
                        setStats(s => ({ ...s, moodEntriesCount: 0 }));
                        triggerNotification("🧹 历史心情已安全清空。");
                      }
                    }}
                    className="self-end text-[10px] font-semibold text-red-500 hover:text-red-700 hover:underline"
                  >
                    清空足迹
                  </button>
                </div>
              )}
            </section>
          </div>
        )}

      </main>

      {/* FLOATING ACTION BUTTON: One-tap Comfort */}
      <div className="fixed bottom-[100px] right-6 z-40 md:bottom-12 md:right-12">
        <button
          onClick={handleGetComfortQuote}
          className="bg-primary hover:bg-primary/95 text-white rounded-[2rem] px-5 py-3.5 flex items-center gap-1.5 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300"
        >
          <Heart className="w-4.5 h-4.5 fill-current text-white animate-pulse" />
          <span className="text-[11px] font-bold tracking-wider uppercase whitespace-nowrap">一键安慰</span>
        </button>
      </div>

      {/* BOTTOM NAV BAR (Mobile only) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-40 flex justify-around items-center px-4 pb-6 pt-2 bg-white/90 backdrop-blur-md border-t border-surface-variant/30 rounded-t-2xl shadow-lg">
        <button
          onClick={() => setActiveTab("home")}
          className={`flex flex-col items-center justify-center px-4 py-1.5 rounded-xl transition-all ${
            activeTab === "home" ? "bg-secondary-container text-on-secondary-container font-bold scale-105" : "text-on-surface-variant"
          }`}
        >
          <HomeIcon className="w-5 h-5" />
          <span className="text-[10px] font-semibold mt-0.5">首页</span>
        </button>

        <button
          onClick={() => setActiveTab("mood")}
          className={`flex flex-col items-center justify-center px-4 py-1.5 rounded-xl transition-all ${
            activeTab === "mood" ? "bg-secondary-container text-on-secondary-container font-bold scale-105" : "text-on-surface-variant"
          }`}
        >
          <Smile className="w-5 h-5" />
          <span className="text-[10px] font-semibold mt-0.5">心情</span>
        </button>

        <button
          onClick={() => setActiveTab("exercise")}
          className={`flex flex-col items-center justify-center px-4 py-1.5 rounded-xl transition-all ${
            activeTab === "exercise" ? "bg-secondary-container text-on-secondary-container font-bold scale-105" : "text-on-surface-variant"
          }`}
        >
          <Dumbbell className="w-5 h-5" />
          <span className="text-[10px] font-semibold mt-0.5">运动</span>
        </button>

        <button
          onClick={() => setActiveTab("diet")}
          className={`flex flex-col items-center justify-center px-4 py-1.5 rounded-xl transition-all ${
            activeTab === "diet" ? "bg-secondary-container text-on-secondary-container font-bold scale-105" : "text-on-surface-variant"
          }`}
        >
          <Utensils className="w-5 h-5" />
          <span className="text-[10px] font-semibold mt-0.5">饮食</span>
        </button>

        <button
          onClick={() => setActiveTab("profile")}
          className={`flex flex-col items-center justify-center px-4 py-1.5 rounded-xl transition-all ${
            activeTab === "profile" ? "bg-secondary-container text-on-secondary-container font-bold scale-105" : "text-on-surface-variant"
          }`}
        >
          <User className="w-5 h-5" />
          <span className="text-[10px] font-semibold mt-0.5">个人</span>
        </button>
      </nav>

      {/* DIALOG 1: CHAT DRAWER WITH YAYA */}
      {chatOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-background h-full flex flex-col shadow-2xl relative animate-slide-left">
            
            {/* Chat header */}
            <div className="bg-white border-b border-surface-variant/40 p-4 flex items-center justify-between sticky top-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-container/20 flex items-center justify-center overflow-hidden">
                  <img
                    alt="Yaya the sprout"
                    className="w-8.5 h-8.5 object-contain"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBszP3YwEr1Sa-6RmwnQFC2WDJBPnoVRE359SVyR0jhDs_eUH1CWbMFOy0trWBAYhsHnGmZJVS7jCemE2ckAO4LMk7bT7_N60D09vMgn6AABkqDpgTUDOHHpraPrSbNRZsJo-hAn2HqtHB2dv30G-NbJGRokflj0mZ81loJFWrtQUlIABYlizd2SYfKQBa45wfKwtIyjcErLIhoyXEv6ONpOokf3B0viNC318YpeSZq3pq6W9Y0OSxZEZ0j_NVJr88ogv-ukqFrIYA"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-primary flex items-center gap-1">
                    和芽芽聊天中...
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
                  </h3>
                  <p className="text-[10px] text-on-surface-variant">温暖治愈的小树芽伙伴一直都在喔</p>
                </div>
              </div>
              <button
                onClick={() => setChatOpen(false)}
                className="w-8.5 h-8.5 rounded-full hover:bg-surface-container flex items-center justify-center text-on-surface-variant transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Messages flow */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-end gap-2.5 max-w-[85%] ${
                    msg.role === "user" ? "self-end flex-row-reverse" : "self-start"
                  }`}
                >
                  {msg.role === "assistant" && (
                    <div className="w-7.5 h-7.5 rounded-full bg-primary-container/20 overflow-hidden flex items-center justify-center shrink-0 border border-primary/10">
                      <img
                        alt="Yaya micro"
                        className="w-6 h-6 object-contain"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBszP3YwEr1Sa-6RmwnQFC2WDJBPnoVRE359SVyR0jhDs_eUH1CWbMFOy0trWBAYhsHnGmZJVS7jCemE2ckAO4LMk7bT7_N60D09vMgn6AABkqDpgTUDOHHpraPrSbNRZsJo-hAn2HqtHB2dv30G-NbJGRokflj0mZ81loJFWrtQUlIABYlizd2SYfKQBa45wfKwtIyjcErLIhoyXEv6ONpOokf3B0viNC318YpeSZq3pq6W9Y0OSxZEZ0j_NVJr88ogv-ukqFrIYA"
                      />
                    </div>
                  )}
                  <div className="flex flex-col gap-0.5">
                    <div
                      className={`rounded-2xl px-4 py-3 text-xs leading-relaxed shadow-sm ${
                        msg.role === "user"
                          ? "bg-primary text-white rounded-br-none"
                          : "bg-white border border-primary-container/40 text-on-surface rounded-bl-none"
                      }`}
                    >
                      {msg.content}
                    </div>
                    <span className="text-[8px] text-on-surface-variant/70 self-end px-1">{msg.timestamp}</span>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-end gap-2.5 self-start max-w-[85%]">
                  <div className="w-7.5 h-7.5 rounded-full bg-primary-container/20 overflow-hidden flex items-center justify-center shrink-0">
                    <img
                      alt="Yaya micro typing"
                      className="w-6 h-6 object-contain"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBszP3YwEr1Sa-6RmwnQFC2WDJBPnoVRE359SVyR0jhDs_eUH1CWbMFOy0trWBAYhsHnGmZJVS7jCemE2ckAO4LMk7bT7_N60D09vMgn6AABkqDpgTUDOHHpraPrSbNRZsJo-hAn2HqtHB2dv30G-NbJGRokflj0mZ81loJFWrtQUlIABYlizd2SYfKQBa45wfKwtIyjcErLIhoyXEv6ONpOokf3B0viNC318YpeSZq3pq6W9Y0OSxZEZ0j_NVJr88ogv-ukqFrIYA"
                    />
                  </div>
                  <div className="bg-white border border-primary-container/30 rounded-2xl rounded-bl-none px-4 py-3 text-xs shadow-sm flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Chat Input section */}
            <div className="bg-white p-4 border-t border-surface-variant/40 flex items-center gap-2.5 sticky bottom-0">
              <input
                type="text"
                placeholder="对芽芽说说心里话..."
                className="flex-1 text-xs p-3.5 rounded-xl border border-surface-variant focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-on-background placeholder-on-surface-variant/60"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                className={`w-11 h-11 rounded-full flex items-center justify-center shadow transition-all ${
                  inputMessage.trim() && !isTyping
                    ? "bg-primary text-white hover:bg-primary/95 hover:shadow-md"
                    : "bg-surface-container text-on-surface-variant cursor-not-allowed"
                }`}
              >
                <Send className="w-4.5 h-4.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DIALOG 2: ONE-TAP COMFORT QUOTE MODAL */}
      {comfortModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 border border-primary-container shadow-2xl relative overflow-hidden flex flex-col items-center text-center gap-5 animate-scale-up">
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-primary-container/25 rounded-full blur-2xl"></div>
            
            <button
              onClick={() => setComfortModalOpen(false)}
              className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface p-1 rounded-full hover:bg-surface-container transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-16 h-16 rounded-full growth-orb flex items-center justify-center shadow-sm">
              <Heart className="w-7 h-7 text-white fill-current animate-pulse" />
            </div>

            <div className="z-10 flex flex-col gap-3">
              <h3 className="font-headline font-bold text-base text-primary">芽芽给你的温柔陪伴</h3>
              
              {comfortLoading ? (
                <div className="py-8 flex flex-col items-center gap-3">
                  <div className="w-8 h-8 rounded-full border-4 border-primary/20 border-t-primary animate-spin"></div>
                  <p className="text-[11px] text-on-surface-variant">芽芽正在悄悄酝酿心里话喔...</p>
                </div>
              ) : (
                <div className="py-4 px-2">
                  <p className="text-sm text-on-surface leading-relaxed font-medium italic">
                    “{comfortQuote}”
                  </p>
                </div>
              )}
            </div>

            <div className="w-full flex gap-3 mt-2">
              <button
                onClick={handleGetComfortQuote}
                className="flex-1 py-2.5 px-4 rounded-full border border-primary/30 hover:bg-primary-container/20 font-semibold text-[11px] text-primary transition-all flex items-center justify-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                换一句安慰
              </button>
              <button
                onClick={() => setComfortModalOpen(false)}
                className="flex-1 py-2.5 px-4 rounded-full bg-primary hover:bg-primary/95 font-semibold text-[11px] text-white shadow-md transition-all"
              >
                收下好心情
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DIALOG 3: WORKOUT TIMER PROGRESS MODAL */}
      {timerOpen && activeWorkout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 border border-primary-container shadow-2xl relative flex flex-col items-center text-center gap-5 animate-scale-up">
            <button
              onClick={() => {
                if (window.confirm("确定要放弃当前的拉伸练习吗？")) {
                  setTimerRunning(false);
                  setTimerOpen(false);
                  setActiveWorkout(null);
                }
              }}
              className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface p-1 rounded-full hover:bg-surface-container transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-full flex flex-col items-center gap-1.5 mt-2">
              <span className="text-[10px] font-bold text-primary bg-primary-container/20 px-3 py-1 rounded-full uppercase tracking-wider">
                舒缓练习中
              </span>
              <h3 className="font-headline font-bold text-base text-on-surface">{activeWorkout.title}</h3>
            </div>

            {/* Dynamic visual timer dial */}
            <div className="relative w-36 h-36 flex items-center justify-center rounded-full bg-surface-container">
              {/* Outer stroke indicator */}
              <div className="absolute inset-2 rounded-full border-4 border-primary/20"></div>
              {/* Spinning active ring */}
              <div className="absolute inset-2 rounded-full border-4 border-transparent border-t-primary animate-spin"></div>
              <div className="text-center z-10">
                <p className="text-2xl font-black text-on-surface">
                  {Math.floor(secondsLeft / 60)}:{(secondsLeft % 60).toString().padStart(2, "0")}
                </p>
                <p className="text-[9px] font-semibold text-on-surface-variant mt-0.5">剩余时间</p>
              </div>
            </div>

            {/* Current Step Instruction with responsive animation */}
            <div className="bg-surface-container-low/70 rounded-2xl p-4 w-full border border-surface-variant/20 min-h-[90px] flex flex-col justify-center animate-pulse">
              <p className="text-[10px] font-bold text-primary mb-1">当前动作 ({currentStepIndex + 1}/{activeWorkout.steps.length})</p>
              <p className="text-xs text-on-surface font-semibold leading-relaxed">
                {activeWorkout.steps[currentStepIndex]}
              </p>
            </div>

            <div className="w-full flex gap-3 mt-2">
              <button
                onClick={() => setTimerRunning(!timerRunning)}
                className={`flex-1 py-2.5 px-4 rounded-full font-semibold text-[11px] border tracking-wider transition-all ${
                  timerRunning
                    ? "border-amber-300 text-amber-700 hover:bg-amber-50"
                    : "border-primary text-primary hover:bg-primary-container/20"
                }`}
              >
                {timerRunning ? "暂停" : "继续"}
              </button>
              <button
                onClick={handleWorkoutComplete}
                className="flex-1 py-2.5 px-4 rounded-full bg-primary hover:bg-primary/95 text-white font-semibold text-[11px] tracking-wider uppercase shadow-md transition-all"
              >
                提前完成
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DIALOG 4: PROFILE EDIT MODAL */}
      {profileEditOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 border border-primary-container shadow-2xl relative flex flex-col gap-4 animate-scale-up">
            <div className="flex justify-between items-center pb-2 border-b border-surface-variant/40">
              <h3 className="font-headline font-bold text-base text-primary">修改个人资料</h3>
              <button onClick={() => setProfileEditOpen(false)} className="text-on-surface-variant hover:text-on-surface p-1 rounded-full hover:bg-surface-container">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col gap-3.5 mt-2">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="edit-name-input" className="text-xs font-bold text-on-surface">你的名字</label>
                <input
                  id="edit-name-input"
                  type="text"
                  maxLength={15}
                  className="text-xs p-3 rounded-xl border border-surface-variant focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-on-background"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="edit-focus-input" className="text-xs font-bold text-on-surface">今日照顾寄语 (Yaya对你说的心情话)</label>
                <textarea
                  id="edit-focus-input"
                  rows={3}
                  maxLength={100}
                  className="text-xs p-3 rounded-xl border border-surface-variant focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-on-background resize-none"
                  value={editFocus}
                  onChange={(e) => setEditFocus(e.target.value)}
                />
              </div>
            </div>

            <div className="flex gap-3 w-full mt-4">
              <button
                onClick={() => setProfileEditOpen(false)}
                className="flex-1 py-2.5 px-4 rounded-full border border-surface-variant/40 hover:bg-surface-container font-semibold text-[11px] text-on-surface-variant transition-colors"
              >
                取消
              </button>
              <button
                onClick={saveProfileEdit}
                className="flex-1 py-2.5 px-4 rounded-full bg-primary hover:bg-primary/95 font-semibold text-[11px] text-white shadow-md transition-colors"
              >
                保存资料
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
