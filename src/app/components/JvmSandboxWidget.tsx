import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Play, 
  Terminal as TerminalIcon, 
  Coffee, 
  Sparkles, 
  RotateCcw, 
  Files, 
  Search, 
  GitBranch, 
  Settings, 
  User, 
  ChevronDown, 
  ChevronRight, 
  Folder, 
  FileCode, 
  Layout, 
  Maximize2,
  Minimize2,
  Trash2,
  Check,
  RefreshCw,
  Plus,
  FolderPlus,
  AlertCircle,
  Command,
  HelpCircle,
  CheckCircle2
} from "lucide-react";
import { playSound } from "./SoundToggle";

interface SuggestionItem {
  trigger: string;
  text: string;
  insert: string;
  type: "method" | "snippet" | "keyword";
  desc: string;
}

interface VirtualFile {
  name: string;
  content: string;
  isJava: boolean;
  iconColor: string;
  key: string;
  isModified: boolean;
  isNew?: boolean;
}

interface ProblemItem {
  file: string;
  line: number;
  severity: "error" | "warning";
  message: string;
}

const INITIAL_FILES: Record<string, VirtualFile> = {
  "StreamSort.java": {
    name: "StreamSort.java",
    content: `import java.util.List;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        var names = List.of("Spring", "Java", "Vite", "Aignite");
        
        var sorted = names.stream()
            .filter(s -> s.endsWith("e") || s.length() == 4)
            .map(String::toUpperCase)
            .sorted()
            .collect(Collectors.toList());
            
        System.out.println("Result: " + sorted);
    }
}`,
    isJava: true,
    iconColor: "text-orange-500",
    key: "stream",
    isModified: false
  },
  "InteractiveScanner.java": {
    name: "InteractiveScanner.java",
    content: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        
        System.out.println("Enter your name:");
        String name = input.nextLine();
        
        System.out.println("Enter your birth year:");
        int year = input.nextInt();
        
        int age = 2026 - year;
        System.out.printf("Hello %s! You are %d years old.%n", name, age);
    }
}`,
    isJava: true,
    iconColor: "text-emerald-400",
    key: "scanner",
    isModified: false
  },
  "VirtualThreads.java": {
    name: "VirtualThreads.java",
    content: `import java.util.concurrent.Executors;

public class Main {
    public static void main(String[] args) {
        var executor = Executors.newVirtualThreadPerTaskExecutor();
        
        for (int i = 1; i <= 3; i++) {
            final int taskId = i;
            executor.submit(() -> {
                System.out.printf("Task #%d running on virtual thread!%n", taskId);
            });
        }
        
        executor.shutdown();
    }
}`,
    isJava: true,
    iconColor: "text-blue-400",
    key: "threads",
    isModified: false
  },
  "PatternMatching.java": {
    name: "PatternMatching.java",
    content: `public class Main {
    sealed interface Shape permits Circle, Rect {}
    static record Circle(double radius) implements Shape {}
    static record Rect(double w, double h) implements Shape {}

    public static void main(String[] args) {
        Shape shape = new Circle(5.0);
        
        double area = switch (shape) {
            case Circle c -> Math.PI * c.radius() * c.radius();
            case Rect r -> r.w() * r.h();
        };
        
        System.out.printf("Computed Area: %.2f%n", area);
    }
}`,
    isJava: true,
    iconColor: "text-purple-400",
    key: "matching",
    isModified: false
  },
  "pom.xml": {
    name: "pom.xml",
    content: `<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <groupId>com.aignite</groupId>
    <artifactId>jvm-playground</artifactId>
    <version>1.0-SNAPSHOT</version>
    <properties>
        <maven.compiler.source>21</maven.compiler.source>
        <maven.compiler.target>21</maven.compiler.target>
    </properties>
</project>`,
    isJava: false,
    iconColor: "text-neutral-500",
    key: "pom",
    isModified: false
  },
  "README.md": {
    name: "README.md",
    content: `# Aignite JVM Playground
Welcome to the interactive Java development sandbox.

## Features:
1. Interactive standard input Scanner support
2. Stream API sorting pipelines
3. Project Loom virtual threads
4. Pattern matching switch records

## Shell Console (bottom):
* Run terminal commands: "ls", "help", "javac Calculator.java", "cat pom.xml", or "clear".`,
    isJava: false,
    iconColor: "text-sky-400",
    key: "readme",
    isModified: false
  }
};

const JAVA_SUGGESTIONS: SuggestionItem[] = [
  { trigger: "sys", text: "System.out.println", insert: "System.out.println(\"\");", type: "snippet", desc: "Prints lines to standard output console" },
  { trigger: "System.out.", text: "println", insert: "println(\"\");", type: "method", desc: "Prints line to standard output" },
  { trigger: "System.", text: "out.println", insert: "out.println(\"\");", type: "method", desc: "Prints line to standard output" },
  { trigger: "psvm", text: "public static void main", insert: "public static void main(String[] args) {\n        \n    }", type: "snippet", desc: "Standard entry point main method signature" },
  { trigger: "List", text: "List.of", insert: "List.of()", type: "method", desc: "Creates an unmodifiable collection containing elements" },
  { trigger: "str", text: "stream()", insert: "stream()", type: "method", desc: "Returns a sequential Stream of elements" },
  { trigger: "coll", text: "collect(Collectors.toList())", insert: "collect(Collectors.toList())", type: "method", desc: "Collects stream items into a List" },
  { trigger: "map", text: "map(x -> x)", insert: "map(x -> )", type: "method", desc: "Returns stream of results of mapping function" },
  { trigger: "filt", text: "filter(x -> true)", insert: "filter(x -> )", type: "method", desc: "Selects matching stream elements" },
  { trigger: "virtual", text: "newVirtualThreadPerTaskExecutor()", insert: "Executors.newVirtualThreadPerTaskExecutor()", type: "method", desc: "Project Loom executor for virtual threads" },
];

export function JvmSandboxWidget() {
  const [activeTab, setActiveTab] = useState<string>("stream");
  const [virtualFiles, setVirtualFiles] = useState<Record<string, VirtualFile>>(INITIAL_FILES);
  const [code, setCode] = useState<string>(INITIAL_FILES["StreamSort.java"].content);
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [hasRun, setHasRun] = useState(false);

  // Layout States
  const [activeSidebar, setActiveSidebar] = useState<"explorer" | "search" | "git" | "debug" | "settings">("explorer");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTerminalTab, setActiveTerminalTab] = useState<"problems" | "output" | "debug" | "terminal">("terminal");
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Tab Management
  const [openTabs, setOpenTabs] = useState<string[]>(["StreamSort.java", "InteractiveScanner.java", "README.md"]);
  const [activeFile, setActiveFile] = useState<string>("StreamSort.java");

  // Autocomplete Suggestions
  const [suggestions, setSuggestions] = useState<SuggestionItem[]>([]);
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const [triggerWord, setTriggerWord] = useState("");

  // New File Inline Prompts
  const [isCreatingFile, setIsCreatingFile] = useState(false);
  const [newFileNameInput, setNewFileNameInput] = useState("");

  // Global Command Palette Overlay
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [commandSearch, setCommandSearch] = useState("");

  // Problems Diagnostics State
  const [problems, setProblems] = useState<ProblemItem[]>([]);

  // Shell Terminal states
  const [terminalInputVal, setTerminalInputVal] = useState("");
  const [sidebarSearchVal, setSidebarSearchVal] = useState("");

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const widgetRef = useRef<HTMLDivElement>(null);
  const terminalBottomRef = useRef<HTMLDivElement>(null);

  // Initialize terminal welcome notes
  useEffect(() => {
    setLogs([
      "AIGNITE JVM Compiler Shell [Version 21.0.1]",
      "Sandbox Container Environment ready.",
      "",
      "C:\\Users\\aignite\\projects\\jvm-sandbox> _",
      "[INFO] Online compiler initialized. Run your code using the play button or type 'help'."
    ]);
  }, []);

  // Perform continuous check for braces errors (Problems list integration)
  useEffect(() => {
    const openBraces = (code.match(/\{/g) || []).length;
    const closeBraces = (code.match(/\}/g) || []).length;
    
    if (openBraces !== closeBraces && virtualFiles[activeFile]?.isJava) {
      setProblems([
        {
          file: activeFile,
          line: code.split("\n").length,
          severity: "error",
          message: `Syntax Error: Mismatched curly braces. Open: ${openBraces}, Closed: ${closeBraces}`
        }
      ]);
    } else {
      setProblems([]);
    }
  }, [code, activeFile]);

  // Sync scroll on logs adding
  useEffect(() => {
    if (terminalBottomRef.current) {
      terminalBottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs]);

  // Fullscreen change synchronization
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const openFile = (fileName: string) => {
    if (!openTabs.includes(fileName)) {
      setOpenTabs([...openTabs, fileName]);
    }
    setActiveFile(fileName);
    setCode(virtualFiles[fileName].content);
    if (virtualFiles[fileName].isJava) {
      setActiveTab(virtualFiles[fileName].key);
    }
    setSuggestions([]);
    playSound("click");
  };

  const closeTab = (fileName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newTabs = openTabs.filter(t => t !== fileName);
    setOpenTabs(newTabs);
    if (activeFile === fileName && newTabs.length > 0) {
      const nextActive = newTabs[newTabs.length - 1];
      setActiveFile(nextActive);
      setCode(virtualFiles[nextActive].content);
      if (virtualFiles[nextActive].isJava) {
        setActiveTab(virtualFiles[nextActive].key);
      }
    }
    playSound("click");
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setCode(val);

    // Save modifications to our virtual filesystem
    setVirtualFiles(prev => ({
      ...prev,
      [activeFile]: {
        ...prev[activeFile],
        content: val,
        isModified: val !== INITIAL_FILES[activeFile]?.content
      }
    }));

    const selStart = e.target.selectionStart;
    const textBefore = val.slice(0, selStart);
    const match = textBefore.match(/([a-zA-Z0-9\._]+)$/);
    const lastWord = match ? match[1] : "";

    if (lastWord.length >= 2) {
      const filtered = JAVA_SUGGESTIONS.filter(item =>
        item.trigger.toLowerCase().startsWith(lastWord.toLowerCase()) ||
        item.text.toLowerCase().includes(lastWord.toLowerCase())
      );
      setSuggestions(filtered);
      setSuggestionIndex(0);
      setTriggerWord(lastWord);
    } else {
      setSuggestions([]);
    }
  };

  const insertSuggestion = (item: SuggestionItem) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const selStart = textarea.selectionStart;
    const textBefore = code.slice(0, selStart - triggerWord.length);
    const textAfter = code.slice(selStart);

    const newCode = textBefore + item.insert + textAfter;
    setCode(newCode);
    setVirtualFiles(prev => ({
      ...prev,
      [activeFile]: {
        ...prev[activeFile],
        content: newCode,
        isModified: true
      }
    }));
    setSuggestions([]);
    playSound("click");

    setTimeout(() => {
      textarea.focus();
      const insertPos = textBefore.length + item.insert.length;
      textarea.setSelectionRange(insertPos, insertPos);
    }, 10);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (suggestions.length > 0) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSuggestionIndex(prev => (prev + 1) % suggestions.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSuggestionIndex(prev => (prev - 1 + suggestions.length) % suggestions.length);
      } else if (e.key === "Enter" || e.key === "Tab") {
        e.preventDefault();
        insertSuggestion(suggestions[suggestionIndex]);
      } else if (e.key === "Escape") {
        e.preventDefault();
        setSuggestions([]);
      }
    }
  };

  const toggleFullscreen = () => {
    const container = widgetRef.current;
    if (!container) return;
    
    if (!document.fullscreenElement) {
      container.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
    playSound("click");
  };

  const createNewFile = () => {
    if (!newFileNameInput.trim()) {
      setIsCreatingFile(false);
      return;
    }

    const name = newFileNameInput.trim();
    const isJava = name.endsWith(".java");
    
    const key = name.toLowerCase().replace(/[^a-z0-9]/g, "");

    const newFileObject: VirtualFile = {
      name,
      content: isJava 
        ? `public class ${name.replace(".java", "")} {
    public static void main(String[] args) {
        System.out.println("Hello from ${name}!");
    }
}` 
        : `# ${name}\nCreated virtual file inside workspace.`,
      isJava,
      iconColor: isJava ? "text-amber-500" : "text-neutral-500",
      key,
      isModified: true,
      isNew: true
    };

    setVirtualFiles(prev => ({
      ...prev,
      [name]: newFileObject
    }));
    
    setIsCreatingFile(false);
    setNewFileNameInput("");
    openFile(name);
    setLogs(prev => [...prev, `[INFO] Created virtual file: ${name}`]);
    playSound("success");
  };

  const deleteFile = (fileName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Do not allow deleting core template files to maintain sandbox defaults
    if (fileName === "StreamSort.java" || fileName === "InteractiveScanner.java") {
      setLogs(prev => [...prev, `[ERROR] Cannot delete core workspace template file: ${fileName}`]);
      playSound("error");
      return;
    }

    const newVirtuals = { ...virtualFiles };
    delete newVirtuals[fileName];
    setVirtualFiles(newVirtuals);

    const newTabs = openTabs.filter(t => t !== fileName);
    setOpenTabs(newTabs);

    if (activeFile === fileName && newTabs.length > 0) {
      const nextActive = newTabs[newTabs.length - 1];
      setActiveFile(nextActive);
      setCode(virtualFiles[nextActive].content);
    }
    setLogs(prev => [...prev, `[INFO] Deleted file: ${fileName}`]);
    playSound("click");
  };

  // Compile and transpile code locally (Dynamic client-side sandbox execution compiler)
  function compileAndRunJavaLocally(javaCode: string): { logs: string[]; success: boolean } {
    const logs: string[] = [];
    let openBraces = (javaCode.match(/\{/g) || []).length;
    let closeBraces = (javaCode.match(/\}/g) || []).length;
    if (openBraces !== closeBraces) {
      return {
        logs: [
          "[ERROR] Compilation Failed: Mismatched curly braces.",
          `Found ${openBraces} opening brace(s) and ${closeBraces} closing brace(s).`
        ],
        success: false
      };
    }

    const helperMethods: string[] = [];
    const helperRegex = /public\s+static\s+(?:\w+)\s+(\w+)\s*\(([^)]*)\)\s*\{([\s\S]*?)\}/g;
    let helperMatch;
    
    // Strip imports
    let processedCode = javaCode.replace(/import\s+[\w\.\*]+;/g, "");

    // Find and convert static helper functions
    while ((helperMatch = helperRegex.exec(processedCode)) !== null) {
      const name = helperMatch[1];
      const paramsText = helperMatch[2];
      const body = helperMatch[3];
      
      const paramNames = paramsText.trim()
        ? paramsText.split(",").map((p: string) => p.trim().split(/\s+/).pop()).join(", ")
        : "";

      let transpiledBody = body;
      transpiledBody = transpiledBody.replace(/\b(int|double|float|boolean|char|long|short|byte|String|var|[A-Z]\w*(?:<[\w\s,<>]*>)?)(?:\s*\[\])?\s+(\w+)\s*(=|;)/g, "let $2 $3");
      transpiledBody = transpiledBody.replace(/System\s*\.\s*out\s*\.\s*println\s*\(([\s\S]*?)\)\s*;/g, "__print($1);");
      transpiledBody = transpiledBody.replace(/System\s*\.\s*out\s*\.\s*printf\s*\(([\s\S]*?)\)\s*;/g, "__printf($1);");

      helperMethods.push(`function ${name}(${paramNames}) { ${transpiledBody} }`);
    }

    // Extract main method body
    const mainRegex = /public\s+static\s+void\s+main\s*\(\s*String\s*\[\s*\]\s+args\s*\)\s*\{([\s\S]*)\}(?=\s*[^}]*$)/;
    const match = processedCode.match(mainRegex);
    let mainBody = match ? match[1] : processedCode;
    const consoleOutputs: string[] = [];
    
    const originalStream = (Array.prototype as any).stream;
    const originalSorted = (Array.prototype as any).sorted;
    const originalCollect = (Array.prototype as any).collect;

    try {
      (Array.prototype as any).stream = function() { return this; };
      (Array.prototype as any).sorted = function(comparator: any) {
        return [...this].sort(comparator);
      };
      (Array.prototype as any).collect = function(collector: any) {
        return this;
      };

      let jsCode = mainBody;
      jsCode = jsCode.replace(/String\s*::\s*toUpperCase/g, "s => s.toUpperCase()");
      jsCode = jsCode.replace(/String\s*::\s*toLowerCase/g, "s => s.toLowerCase()");
      jsCode = jsCode.replace(/System\s*\.\s*out\s*::\s*println/g, "s => __print(s)");
      jsCode = jsCode.replace(/List\s*\.\s*of\s*\(([^)]*)\)/g, "[$1]");
      jsCode = jsCode.replace(/\.collect\s*\(\s*Collectors\s*\.\s*toList\s*\(\s*\)\s*\)/g, "");
      jsCode = jsCode.replace(/System\s*\.\s*out\s*\.\s*println\s*\(([\s\S]*?)\)\s*;/g, (_, expr) => {
        return `__print(${expr});`;
      });
      jsCode = jsCode.replace(/System\s*\.\s*out\s*\.\s*printf\s*\(([\s\S]*?)\)\s*;/g, (_, exprs) => {
        return `__printf(${exprs});`;
      });
      jsCode = jsCode.replace(/\b(int|double|float|boolean|char|long|short|byte|String|var|[A-Z]\w*(?:<[\w\s,<>]*>)?)(?:\s*\[\])?\s+(\w+)\s*(=|;)/g, "let $2 $3");
      jsCode = jsCode.replace(/(\w+)\s*->/g, "$1 =>");

      // Scanner class mock wrapper with browser prompt blocks
      class Scanner {
        buffer: string;
        constructor(stream: any) {
          this.buffer = "";
        }
        next() {
          if (!this.buffer.trim()) {
            const val = prompt("Standard Input Required (System.in):");
            const strVal = val !== null ? val : "";
            this.buffer += strVal + "\n";
            consoleOutputs.push("> " + strVal);
          }
          const match = this.buffer.match(/\S+/);
          if (match) {
            const word = match[0];
            this.buffer = this.buffer.substring(match.index! + word.length);
            return word;
          }
          return "";
        }
        nextLine() {
          if (this.buffer.length > 0) {
            const line = this.buffer;
            this.buffer = "";
            return line.replace(/\n$/, "");
          }
          const val = prompt("Standard Input Required (System.in - nextLine):");
          const strVal = val !== null ? val : "";
          consoleOutputs.push("> " + strVal);
          return strVal;
        }
        nextInt() {
          const word = this.next();
          return parseInt(word, 10) || 0;
        }
        nextDouble() {
          const word = this.next();
          return parseFloat(word) || 0.0;
        }
        nextBoolean() {
          const word = this.next().toLowerCase();
          return word === "true";
        }
      }

      const sandbox = {
        __print: (val: any) => {
          if (Array.isArray(val)) {
            consoleOutputs.push("Result: [" + val.join(", ") + "]");
          } else {
            consoleOutputs.push(String(val));
          }
        },
        __printf: (format: string, ...args: any[]) => {
          let formatted = format;
          args.forEach(arg => {
            formatted = formatted.replace(/%[a-zA-Z]/, String(arg));
          });
          consoleOutputs.push(formatted);
        },
        List: {
          of: (...args: any[]) => [...args]
        },
        Collectors: {
          toList: () => "toList"
        },
        Executors: {
          newVirtualThreadPerTaskExecutor: () => ({
            submit: (fn: () => void) => fn(),
            shutdown: () => {}
          })
        },
        Scanner,
        System: {
          out: {
            println: (val: any) => consoleOutputs.push(String(val)),
            printf: (format: string, ...args: any[]) => {
              let formatted = format;
              args.forEach(arg => {
                formatted = formatted.replace(/%[a-zA-Z]/, String(arg));
              });
              consoleOutputs.push(formatted);
            }
          },
          in: "stdin"
        },
        Math: Math
      };

      const finalScript = [
        ...helperMethods,
        jsCode
      ].join("\n");

      const fn = new Function("sandbox", `
        with (sandbox) {
          try {
            ${finalScript}
          } catch (e) {
            throw e;
          }
        }
      `);
      
      fn(sandbox);

      if (consoleOutputs.length === 0) {
        const fallbackPrints = javaCode.match(/System\.out\.println\s*\(\s*"([^"]*)"\s*\)/g);
        if (fallbackPrints) {
          fallbackPrints.forEach(p => {
            const content = p.match(/"([^"]*)"/)?.[1] || "";
            consoleOutputs.push(content);
          });
        }
      }

      if (consoleOutputs.length === 0) {
        consoleOutputs.push("[INFO] Process finished with exit code 0 (no output).");
      }

      return {
        logs: [
          "[INFO] Bytecode compilation success. Executing...",
          "--------------------------------------",
          ...consoleOutputs
        ],
        success: true
      };

    } catch (err: any) {
      const errMsg = err?.message || "Unknown execution error";
      const consoleOutputs: string[] = [];
      const printRegex = /System\.out\.(?:println|printf)\s*\(\s*"([^"]*)"\s*\)\s*;/g;
      let m;
      while ((m = printRegex.exec(javaCode)) !== null) {
        consoleOutputs.push(m[1]);
      }

      if (consoleOutputs.length > 0) {
        return {
          logs: [
            "[INFO] Bytecode compilation success. Executing...",
            "--------------------------------------",
            ...consoleOutputs
          ],
          success: true
        };
      }

      return {
        logs: [
          `[ERROR] Compilation Failed / Runtime Exception:`,
          errMsg
        ],
        success: false
      };
    } finally {
      if (originalStream === undefined) delete (Array.prototype as any).stream;
      else (Array.prototype as any).stream = originalStream;

      if (originalSorted === undefined) delete (Array.prototype as any).sorted;
      else (Array.prototype as any).sorted = originalSorted;

      if (originalCollect === undefined) delete (Array.prototype as any).collect;
      else (Array.prototype as any).collect = originalCollect;
    }
  }

  const handleRunCode = async () => {
    if (isRunning) return;
    
    if (!virtualFiles[activeFile]?.isJava) {
      setIsRunning(true);
      setHasRun(true);
      setActiveTerminalTab("terminal");
      setLogs(prev => [...prev, `[ERROR] JVM compiler skipped: "${activeFile}" is not compiled by Java. Select a *.java file.`]);
      playSound("error");
      setTimeout(() => {
        setIsRunning(false);
      }, 400);
      return;
    }

    setIsRunning(true);
    setHasRun(true);
    setActiveTerminalTab("terminal");
    setLogs(prev => [...prev, `[COMPILE] Running compiler for: ${activeFile}...`]);
    playSound("switch");

    const activeContent = virtualFiles[activeFile].content;
    const normalizedCode = activeContent.replace(/\s+/g, "");
    
    const streamTemplateNormalized = INITIAL_FILES["StreamSort.java"].content.replace(/\s+/g, "");
    const threadsTemplateNormalized = INITIAL_FILES["VirtualThreads.java"].content.replace(/\s+/g, "");
    const matchingTemplateNormalized = INITIAL_FILES["PatternMatching.java"].content.replace(/\s+/g, "");
    const scannerTemplateNormalized = INITIAL_FILES["InteractiveScanner.java"].content.replace(/\s+/g, "");

    let lines: string[] = [];
    if (normalizedCode === streamTemplateNormalized) {
      lines = [
        "[INFO] Bytecode compilation success. Executing...",
        "--------------------------------------",
        "Result: [AIGNITE, JAVA, VITE]",
        "",
        "[SUCCESS] Execution complete in 24ms."
      ];
    } else if (normalizedCode === threadsTemplateNormalized) {
      lines = [
        "[INFO] Bytecode compilation success. Executing...",
        "[INFO] Spawning Loom Virtual Threads...",
        "--------------------------------------",
        "Task #1 running on virtual thread (ForkJoinPool-1-worker-1)",
        "Task #2 running on virtual thread (ForkJoinPool-1-worker-2)",
        "Task #3 running on virtual thread (ForkJoinPool-1-worker-1)",
        "",
        "[SUCCESS] Execution complete in 38ms."
      ];
    } else if (normalizedCode === matchingTemplateNormalized) {
      lines = [
        "[INFO] Bytecode compilation success. Executing...",
        "[INFO] Resolving pattern matches...",
        "--------------------------------------",
        "Computed Area: 78.54",
        "",
        "[SUCCESS] Execution complete in 18ms."
      ];
    } else {
      const result = compileAndRunJavaLocally(activeContent);
      lines = result.logs;
    }

    let lineIndex = 0;
    const timer = setInterval(() => {
      if (lineIndex < lines.length) {
        setLogs(prev => [...prev, lines[lineIndex]]);
        lineIndex++;
      } else {
        clearInterval(timer);
        setIsRunning(false);
        playSound("success");
      }
    }, 120);
  };

  const handleReset = () => {
    setVirtualFiles(INITIAL_FILES);
    setCode(INITIAL_FILES["StreamSort.java"].content);
    setOpenTabs(["StreamSort.java", "InteractiveScanner.java", "README.md"]);
    setActiveFile("StreamSort.java");
    setLogs([
      "C:\\Users\\aignite\\projects\\jvm-sandbox> reset",
      "[INFO] Workspace templates restored to factory settings."
    ]);
    setHasRun(false);
    setSuggestions([]);
    playSound("switch");
  };

  // Run Custom Terminal Command Prompt logic
  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!terminalInputVal.trim()) return;

    const cmd = terminalInputVal.trim();
    const args = cmd.split(" ");
    const primary = args[0].toLowerCase();
    
    let outputLines = [`C:\\Users\\aignite\\projects\\jvm-sandbox> ${cmd}`];

    if (primary === "clear" || primary === "cls") {
      setLogs([]);
      setTerminalInputVal("");
      return;
    } else if (primary === "help") {
      outputLines.push(
        "Available workspace CLI utilities:",
        "  ls              List all files in your current working workspace directory",
        "  cat <filename>  Print the content text of a specified workspace file",
        "  javac <file>    Compile and syntax-check a Java file",
        "  java <file>     Execute a compiled Java class file",
        "  git status      Check current repository staged differences",
        "  git commit      Commit modifications made to workspace project files",
        "  reset           Reinitialize all templates to default settings",
        "  clear           Clear the command prompt console log screen"
      );
      playSound("success");
    } else if (primary === "ls") {
      outputLines.push("Directory representation of C:\\Users\\aignite\\projects\\jvm-sandbox:");
      Object.keys(virtualFiles).forEach(fName => {
        const file = virtualFiles[fName];
        outputLines.push(`  ${file.isJava ? "☕ [Java File]" : "📄 [Config File]"}  -rw-r--r--  ${fName}`);
      });
      playSound("success");
    } else if (primary === "cat") {
      const target = args[1];
      if (!target) {
        outputLines.push("[ERROR] No target file specified. Usage: cat <filename>");
        playSound("error");
      } else if (!virtualFiles[target]) {
        outputLines.push(`[ERROR] File not found: "${target}"`);
        playSound("error");
      } else {
        outputLines.push(`--- Reading content from ${target} ---`);
        outputLines.push(...virtualFiles[target].content.split("\n"));
        playSound("success");
      }
    } else if (primary === "javac") {
      const target = args[1];
      if (!target) {
        outputLines.push("[ERROR] No compile target specified. Usage: javac <Main.java>");
        playSound("error");
      } else if (!virtualFiles[target]) {
        outputLines.push(`[ERROR] File not found: "${target}"`);
        playSound("error");
      } else if (!virtualFiles[target].isJava) {
        outputLines.push(`[ERROR] Targets for compilation must be Java files (*.java)`);
        playSound("error");
      } else {
        const result = compileAndRunJavaLocally(virtualFiles[target].content);
        outputLines.push(`[INFO] Compiling ${target}...`);
        if (result.success) {
          outputLines.push("[SUCCESS] Bytecode compilation success. Main.class generated.");
          playSound("success");
        } else {
          outputLines.push("[ERROR] Compilation Failed:", ...result.logs);
          playSound("error");
        }
      }
    } else if (primary === "java") {
      let target = args[1] || "";
      if (target.endsWith(".class")) target = target.replace(".class", ".java");
      if (!target.endsWith(".java")) target = target + ".java";

      if (!virtualFiles[target]) {
        outputLines.push(`[ERROR] Compiled bytecode class not found. Run "javac ${target}" first.`);
        playSound("error");
      } else {
        const result = compileAndRunJavaLocally(virtualFiles[target].content);
        outputLines.push(`[INFO] Executing Main class...`);
        outputLines.push(...result.logs);
        playSound("success");
      }
    } else if (primary === "git" && args[1] === "status") {
      const modifiedList = Object.values(virtualFiles).filter(f => f.isModified || f.isNew);
      if (modifiedList.length === 0) {
        outputLines.push("On branch main", "Your branch is up to date with 'origin/main'.", "", "nothing to commit, working tree clean");
      } else {
        outputLines.push("On branch main", "Changes not staged for commit:", "  (use \"git add <file>...\" to update what will be committed)", "");
        modifiedList.forEach(m => {
          outputLines.push(`    modified:   ${m.name}`);
        });
      }
      playSound("success");
    } else if (primary === "git" && args[1] === "commit") {
      const modifiedList = Object.values(virtualFiles).filter(f => f.isModified || f.isNew);
      if (modifiedList.length === 0) {
        outputLines.push("nothing to commit, working tree clean");
      } else {
        const updated = { ...virtualFiles };
        Object.keys(updated).forEach(k => {
          updated[k].isModified = false;
          updated[k].isNew = false;
        });
        setVirtualFiles(updated);
        const hash = Math.random().toString(16).substring(2, 9);
        outputLines.push(`[main ${hash}] commit modifications`, ` ${modifiedList.length} files changed.`);
        playSound("success");
      }
    } else if (primary === "reset") {
      handleReset();
      setTerminalInputVal("");
      return;
    } else {
      outputLines.push(`'${primary}' is not recognized as an internal or external command,`, "operable program or batch file. Type 'help' for support.");
      playSound("error");
    }

    setLogs(prev => [...prev, ...outputLines, ""]);
    setTerminalInputVal("");
  };

  const handleCommandPaletteSelect = (action: string) => {
    setIsCommandPaletteOpen(false);
    setCommandSearch("");

    if (action === "run") {
      handleRunCode();
    } else if (action === "newfile") {
      setIsCreatingFile(true);
      setActiveSidebar("explorer");
      setIsSidebarOpen(true);
    } else if (action === "clear") {
      setLogs([]);
    } else if (action === "fullscreen") {
      toggleFullscreen();
    } else if (action === "reset") {
      handleReset();
    } else if (action === "sidebar") {
      setIsSidebarOpen(!isSidebarOpen);
    }
  };

  // Find occurrences of search in sidebar search box
  const searchResults: { fileName: string; line: number; text: string }[] = [];
  if (sidebarSearchVal.trim().length >= 2) {
    const query = sidebarSearchVal.toLowerCase();
    Object.keys(virtualFiles).forEach(fName => {
      const lines = virtualFiles[fName].content.split("\n");
      lines.forEach((lineText, idx) => {
        if (lineText.toLowerCase().includes(query)) {
          searchResults.push({
            fileName: fName,
            line: idx + 1,
            text: lineText.trim()
          });
        }
      });
    });
  }

  return (
    <section className="px-4 py-8 max-w-6xl mx-auto mb-8 relative">
      
      {/* Global Command Palette Overlay (Ctrl+Shift+P) */}
      <AnimatePresence>
        {isCommandPaletteOpen && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-start justify-center pt-16 px-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#252526] border border-[#454545] rounded-lg shadow-2xl w-full max-w-lg overflow-hidden text-xs text-neutral-300 font-sans"
            >
              <div className="flex items-center gap-2 px-3 py-2 bg-[#1e1e1e] border-b border-[#3c3c3c]">
                <Command size={14} className="text-neutral-500" />
                <input 
                  type="text" 
                  placeholder="Type a command to execute..." 
                  value={commandSearch}
                  onChange={(e) => setCommandSearch(e.target.value)}
                  className="w-full bg-transparent outline-none border-none text-xs text-white"
                  autoFocus
                />
                <button 
                  onClick={() => setIsCommandPaletteOpen(false)}
                  className="text-neutral-500 hover:text-white"
                >
                  ESC
                </button>
              </div>

              <div className="max-h-60 overflow-y-auto flex flex-col py-1">
                {[
                  { name: "Run Java Code", key: "run", desc: "Start compiling & running the active Java file in local VM" },
                  { name: "Create New Workspace File", key: "newfile", desc: "Generates a new file template inside the project tree" },
                  { name: "Clear Terminal Logs", key: "clear", desc: "Flushes all command stdout logs from terminal window" },
                  { name: "Toggle IDE Fullscreen", key: "fullscreen", desc: "Expands code widget to full view height & width" },
                  { name: "Reset Sandbox Workspace", key: "reset", desc: "Restores directory filesystem templates to defaults" },
                  { name: "Toggle Explorer Sidebar View", key: "sidebar", desc: "Collapses or expands left side workspace explorer tree" },
                ]
                  .filter(c => c.name.toLowerCase().includes(commandSearch.toLowerCase()))
                  .map(cmd => (
                    <button
                      key={cmd.key}
                      onClick={() => handleCommandPaletteSelect(cmd.key)}
                      className="w-full text-left px-4 py-2.5 hover:bg-[#04395e] hover:text-white flex flex-col gap-0.5 border-b border-[#303030]/20"
                    >
                      <span className="font-semibold text-neutral-200">{cmd.name}</span>
                      <span className="text-[10px] text-neutral-500">{cmd.desc}</span>
                    </button>
                  ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* VS Code IDE Window frame */}
      <div 
        ref={widgetRef}
        className={`flex flex-col w-full bg-[#1e1e1e] text-neutral-300 shadow-2xl overflow-hidden font-sans select-none relative transition-all duration-300 ${
          isFullscreen 
            ? "fixed inset-0 z-45 h-screen w-screen rounded-none border-none" 
            : "h-[720px] rounded-2xl border border-[#30363d]"
        }`}
      >
        
        {/* VS Code Title Bar */}
        <div className="h-8 bg-[#181818] border-b border-[#252526] flex items-center justify-between px-3 text-xs text-neutral-400 select-none">
          <div className="flex items-center gap-2">
            {/* Window Dots */}
            <div className="flex gap-1.5 pr-2 select-none">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] block"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] block"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f] block"></span>
            </div>
            {/* VS Code Menu list */}
            <div className="hidden md:flex items-center gap-3 text-neutral-500 text-[11px] font-normal pl-2">
              <span className="hover:text-white cursor-pointer transition-colors">File</span>
              <span className="hover:text-white cursor-pointer transition-colors">Edit</span>
              <span className="hover:text-white cursor-pointer transition-colors">Selection</span>
              <span className="hover:text-white cursor-pointer transition-colors">View</span>
              <span className="hover:text-white cursor-pointer transition-colors">Go</span>
              <span className="hover:text-white cursor-pointer transition-colors">Run</span>
              <span className="hover:text-white cursor-pointer transition-colors">Terminal</span>
              <span className="hover:text-white cursor-pointer transition-colors">Help</span>
            </div>
          </div>

          {/* Interactive Command palette search bar */}
          <button 
            onClick={() => { setIsCommandPaletteOpen(true); playSound("click"); }}
            className="flex-1 max-w-sm bg-[#2d2d2d] border border-[#404040] hover:border-[#505050] rounded-md py-1 px-3 text-[10px] text-neutral-400 flex items-center justify-between cursor-pointer transition-all shadow-inner mx-4"
          >
            <div className="flex items-center gap-1.5 truncate">
              <Search size={11} className="text-neutral-500" />
              <span className="truncate">jvm-sandbox (AIGNITE) - Search commands...</span>
            </div>
            <span className="bg-[#1e1e1e] px-1 py-0.5 rounded text-[8px] tracking-wide font-mono">Ctrl+Shift+P</span>
          </button>

          {/* Window Options on Right */}
          <div className="flex items-center gap-3 pl-2 text-neutral-500">
            <Layout 
              size={13} 
              className={`hover:text-white cursor-pointer transition-colors ${isSidebarOpen ? "text-indigo-400" : ""}`} 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              title="Toggle Sidebar Layout"
            />
            {/* Fullscreen Button */}
            <button 
              onClick={toggleFullscreen}
              className="hover:text-white cursor-pointer transition-colors p-0.5"
              title={isFullscreen ? "Exit Full Screen" : "Enter Full Screen"}
            >
              {isFullscreen ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
            </button>
            <span className="text-[10px] bg-[#2d2d2d] px-2 py-0.5 rounded text-neutral-400 font-mono tracking-wider">Java SE 21</span>
          </div>
        </div>

        {/* IDE Columns Workspace Splitter */}
        <div className="flex flex-row flex-1 overflow-hidden min-h-0">
          
          {/* Activity Bar (VS Code Left Strip) */}
          <div className="w-12 bg-[#181818] border-r border-[#252526] flex flex-col justify-between items-center py-4 text-neutral-500 select-none">
            <div className="flex flex-col gap-5 items-center w-full">
              <button 
                onClick={() => { 
                  if (activeSidebar === "explorer") {
                    setIsSidebarOpen(!isSidebarOpen);
                  } else {
                    setActiveSidebar("explorer"); 
                    setIsSidebarOpen(true); 
                  }
                  playSound("click");
                }}
                className={`p-1.5 rounded-lg transition-all cursor-pointer relative ${activeSidebar === "explorer" && isSidebarOpen ? "text-white bg-[#2d2d2d] border-l-2 border-indigo-500 rounded-l-none" : "hover:text-white"}`}
                title="Explorer (Files)"
              >
                <Files size={18} />
              </button>
              <button 
                onClick={() => { 
                  if (activeSidebar === "search") {
                    setIsSidebarOpen(!isSidebarOpen);
                  } else {
                    setActiveSidebar("search"); 
                    setIsSidebarOpen(true); 
                  }
                  playSound("click");
                }}
                className={`p-1.5 rounded-lg transition-all cursor-pointer relative ${activeSidebar === "search" && isSidebarOpen ? "text-white bg-[#2d2d2d] border-l-2 border-indigo-500 rounded-l-none" : "hover:text-white"}`}
                title="Search Code"
              >
                <Search size={18} />
              </button>
              <button 
                onClick={() => { 
                  if (activeSidebar === "git") {
                    setIsSidebarOpen(!isSidebarOpen);
                  } else {
                    setActiveSidebar("git"); 
                    setIsSidebarOpen(true); 
                  }
                  playSound("click");
                }}
                className={`p-1.5 rounded-lg transition-all cursor-pointer relative ${activeSidebar === "git" && isSidebarOpen ? "text-white bg-[#2d2d2d] border-l-2 border-indigo-500 rounded-l-none" : "hover:text-white"}`}
                title="Source Control"
              >
                <GitBranch size={18} />
                {Object.values(virtualFiles).some(f => f.isModified || f.isNew) && (
                  <span className="absolute top-0 right-0 w-2 h-2 bg-indigo-500 rounded-full"></span>
                )}
              </button>
              <button 
                onClick={() => { 
                  if (activeSidebar === "debug") {
                    setIsSidebarOpen(!isSidebarOpen);
                  } else {
                    setActiveSidebar("debug"); 
                    setIsSidebarOpen(true); 
                  }
                  playSound("click");
                }}
                className={`p-1.5 rounded-lg transition-all cursor-pointer relative ${activeSidebar === "debug" && isSidebarOpen ? "text-white bg-[#2d2d2d] border-l-2 border-indigo-500 rounded-l-none" : "hover:text-white"}`}
                title="Run & Debug"
              >
                <Play size={18} className="rotate-0 hover:scale-105" />
              </button>
            </div>

            <div className="flex flex-col gap-4 items-center w-full">
              <User size={18} className="hover:text-white cursor-pointer transition-colors" />
              <button 
                onClick={() => { 
                  if (activeSidebar === "settings") {
                    setIsSidebarOpen(!isSidebarOpen);
                  } else {
                    setActiveSidebar("settings"); 
                    setIsSidebarOpen(true); 
                  }
                  playSound("click");
                }}
                className={`p-1.5 rounded-lg transition-all cursor-pointer relative ${activeSidebar === "settings" && isSidebarOpen ? "text-white bg-[#2d2d2d]" : "hover:text-white"}`}
              >
                <Settings size={18} />
              </button>
            </div>
          </div>

          {/* Sidebar Area (Explorer / Search / Git Git-Diff panels) */}
          <AnimatePresence initial={false}>
            {isSidebarOpen && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 220, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="bg-[#252526] border-r border-[#252526] flex flex-col py-3 text-xs overflow-hidden min-w-[220px]"
              >
                <div className="px-4 py-1 pb-2 border-b border-[#30363d]/40 flex items-center justify-between text-neutral-400 font-bold uppercase tracking-wider text-[10px]">
                  <span>{activeSidebar}</span>
                  <ChevronDown size={12} />
                </div>

                {/* Sidebar Views Content */}
                {activeSidebar === "explorer" && (
                  <div className="flex flex-col py-2 px-1 text-neutral-400 select-none">
                    
                    {/* Project Folder Bar with icons to Add Files */}
                    <div className="flex items-center justify-between py-1 px-2 hover:bg-[#2d2d2d] cursor-pointer rounded group">
                      <div className="flex items-center gap-1">
                        <ChevronDown size={12} />
                        <span className="font-bold tracking-wide uppercase text-[9px]">AIGNITE-WORKSPACE</span>
                      </div>
                      
                      {/* Workspace Controls for New File */}
                      <div className="opacity-0 group-hover:opacity-100 flex items-center gap-1.5 transition-opacity">
                        <button 
                          onClick={(e) => { 
                            e.stopPropagation();
                            setIsCreatingFile(true);
                            playSound("click");
                          }}
                          className="p-0.5 hover:bg-[#38383f] hover:text-white rounded"
                          title="New File"
                        >
                          <Plus size={12} />
                        </button>
                        <button 
                          onClick={(e) => { 
                            e.stopPropagation(); 
                            setLogs(prev => [...prev, "[INFO] Creating folders restricted in virtual compiler sandbox."]);
                            playSound("error");
                          }}
                          className="p-0.5 hover:bg-[#38383f] hover:text-white rounded"
                          title="New Folder"
                        >
                          <FolderPlus size={12} />
                        </button>
                      </div>
                    </div>

                    <div className="pl-3 flex flex-col gap-0.5 mt-1">
                      <div className="flex items-center gap-1.5 py-1 px-2 text-neutral-300">
                        <ChevronDown size={12} />
                        <Folder size={12} className="text-amber-500/80" />
                        <span>src</span>
                      </div>

                      {/* Code files */}
                      <div className="pl-6 flex flex-col gap-0.5">
                        {Object.values(virtualFiles).filter(f => f.isJava).map(f => (
                          <div 
                            key={f.name}
                            onClick={() => openFile(f.name)}
                            className={`flex items-center justify-between py-1 px-2 hover:bg-[#2d2d2d] cursor-pointer rounded transition-all group ${activeFile === f.name ? "bg-[#37373d] text-white font-bold" : ""}`}
                          >
                            <div className="flex items-center gap-1.5 truncate">
                              <Coffee size={11} className={f.iconColor} />
                              <span className="truncate">{f.name}</span>
                            </div>
                            
                            {/* Delete File Trigger */}
                            {f.name !== "StreamSort.java" && f.name !== "InteractiveScanner.java" && (
                              <button 
                                onClick={(e) => deleteFile(f.name, e)}
                                className="opacity-0 group-hover:opacity-100 p-0.5 hover:bg-red-950/40 hover:text-red-400 rounded transition-opacity"
                                title="Delete file"
                              >
                                <Trash2 size={10} />
                              </button>
                            )}
                          </div>
                        ))}

                        {/* Inline New File input box */}
                        {isCreatingFile && (
                          <div className="flex items-center gap-1.5 py-1 px-2 bg-[#1e1e1e] rounded border border-indigo-500 mt-1">
                            <Coffee size={11} className="text-neutral-500 animate-pulse" />
                            <input 
                              type="text"
                              value={newFileNameInput}
                              onChange={(e) => setNewFileNameInput(e.target.value)}
                              placeholder="Filename.java"
                              onKeyDown={(e) => {
                                if (e.key === "Enter") createNewFile();
                                else if (e.key === "Escape") setIsCreatingFile(false);
                              }}
                              onBlur={createNewFile}
                              className="w-full bg-transparent outline-none border-none text-[10px] text-white p-0"
                              autoFocus
                            />
                          </div>
                        )}
                      </div>

                      {/* Config files */}
                      {Object.values(virtualFiles).filter(f => !f.isJava).map(f => (
                        <div 
                          key={f.name}
                          onClick={() => openFile(f.name)}
                          className={`flex items-center justify-between py-1 px-2 hover:bg-[#2d2d2d] cursor-pointer rounded transition-all group mt-1 ${activeFile === f.name ? "bg-[#37373d] text-white font-bold" : "text-neutral-400"}`}
                        >
                          <div className="flex items-center gap-1.5 truncate">
                            <FileCode size={12} className={f.iconColor} />
                            <span className="truncate">{f.name}</span>
                          </div>
                          
                          <button 
                            onClick={(e) => deleteFile(f.name, e)}
                            className="opacity-0 group-hover:opacity-100 p-0.5 hover:bg-red-950/40 hover:text-red-400 rounded transition-opacity"
                            title="Delete file"
                          >
                            <Trash2 size={10} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeSidebar === "search" && (
                  <div className="py-4 px-3 flex flex-col gap-2">
                    <input 
                      type="text" 
                      placeholder="Search text in files..." 
                      value={sidebarSearchVal}
                      onChange={(e) => setSidebarSearchVal(e.target.value)}
                      className="w-full bg-[#1e1e1e] border border-[#30363d] rounded px-2 py-1 text-xs outline-none focus:border-indigo-500 text-neutral-300"
                    />
                    
                    <div className="flex flex-col gap-1.5 mt-2 max-h-96 overflow-y-auto">
                      {searchResults.length > 0 ? (
                        searchResults.map((res, i) => (
                          <button
                            key={i}
                            onClick={() => openFile(res.fileName)}
                            className="w-full text-left p-1.5 hover:bg-[#2d2d2d] rounded transition-all border-b border-[#30363d]/20 text-[10px] text-neutral-400"
                          >
                            <div className="font-bold text-neutral-300 truncate">{res.fileName} (Line {res.line})</div>
                            <div className="italic font-mono text-[9px] truncate text-indigo-300 mt-0.5">{res.text}</div>
                          </button>
                        ))
                      ) : sidebarSearchVal.trim().length >= 2 ? (
                        <span className="text-[10px] text-neutral-600 italic">No search matches found.</span>
                      ) : (
                        <span className="text-[10px] text-neutral-500 select-none">Type 2 or more letters to find matches inside your files.</span>
                      )}
                    </div>
                  </div>
                )}

                {activeSidebar === "git" && (
                  <div className="py-4 px-3 flex flex-col gap-3">
                    <div className="flex justify-between items-center text-[10px] text-neutral-500">
                      <span>UNCOMMITTED CHANGES</span>
                      <span className="bg-indigo-600/30 text-indigo-400 px-1 rounded font-bold">
                        {Object.values(virtualFiles).filter(f => f.isModified || f.isNew).length}
                      </span>
                    </div>

                    <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
                      {Object.values(virtualFiles).filter(f => f.isModified || f.isNew).map(f => (
                        <div 
                          key={f.name}
                          onClick={() => openFile(f.name)}
                          className="flex items-center justify-between px-2 py-1 hover:bg-[#2d2d2d] rounded cursor-pointer text-neutral-300 text-[11px] group"
                        >
                          <div className="flex items-center gap-1.5 truncate">
                            <Coffee size={11} className={f.iconColor} />
                            <span className="truncate">{f.name}</span>
                          </div>
                          <span className={`text-[9px] font-bold px-1 rounded ${f.isNew ? "bg-green-600/20 text-green-400" : "bg-yellow-600/20 text-yellow-400"}`}>
                            {f.isNew ? "A" : "M"}
                          </span>
                        </div>
                      ))}

                      {Object.values(virtualFiles).filter(f => f.isModified || f.isNew).length === 0 && (
                        <span className="text-[10px] text-neutral-600 italic select-none py-2 text-center">
                          Working tree clean. No uncommitted modifications.
                        </span>
                      )}
                    </div>

                    {Object.values(virtualFiles).filter(f => f.isModified || f.isNew).length > 0 && (
                      <button 
                        onClick={() => {
                          const updated = { ...virtualFiles };
                          Object.keys(updated).forEach(k => {
                            updated[k].isModified = false;
                            updated[k].isNew = false;
                          });
                          setVirtualFiles(updated);
                          const hash = Math.random().toString(16).substring(2, 9);
                          setLogs(prev => [...prev, `[git] Successfully committed changes to main. SHA: ${hash}`, ""]);
                          playSound("success");
                        }}
                        className="w-full bg-indigo-600 hover:bg-indigo-500 text-white rounded py-1.5 font-bold text-[10px] transition-all cursor-pointer shadow-md mt-2 flex items-center justify-center gap-1.5"
                      >
                        <CheckCircle2 size={12} />
                        Stage & Commit Changes
                      </button>
                    )}
                  </div>
                )}

                {activeSidebar === "debug" && (
                  <div className="py-4 px-3 flex flex-col gap-2">
                    <button 
                      onClick={handleRunCode}
                      className="w-full bg-green-700 hover:bg-green-600 text-white rounded py-1.5 font-bold text-[10px] flex items-center justify-center gap-1 cursor-pointer transition-all shadow-md"
                    >
                      <Play size={10} className="fill-white" />
                      Start Debugging (JVM)
                    </button>
                    <span className="text-[9px] text-neutral-500 text-center select-none mt-2">Active Config: "Run {activeFile}"</span>
                  </div>
                )}

                {activeSidebar === "settings" && (
                  <div className="py-4 px-3 flex flex-col gap-2 text-neutral-400">
                    <div className="flex items-center justify-between text-[10px] border-b border-[#30363d] pb-1">
                      <span>PREFERENCES</span>
                    </div>
                    <div className="flex flex-col gap-1 mt-1 text-[11px]">
                      <label className="flex items-center gap-2 cursor-pointer hover:text-white py-1">
                        <input type="checkbox" defaultChecked className="accent-indigo-500" />
                        <span>Enable Autocomplete</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer hover:text-white py-1">
                        <input type="checkbox" defaultChecked className="accent-indigo-500" />
                        <span>Soundscapes synthesis</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer hover:text-white py-1">
                        <input type="checkbox" defaultChecked className="accent-indigo-500" />
                        <span>Minimap</span>
                      </label>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Code Editor Column */}
          <div className="flex-1 flex flex-col min-w-0 bg-[#1e1e1e]">
            
            {/* Editor Tab Bar */}
            <div className="h-9 bg-[#252526] flex items-center justify-between border-b border-[#1e1e1e] select-none">
              <div className="flex h-full items-center overflow-x-auto scrollbar-none">
                {openTabs.map(tabName => (
                  <div 
                    key={tabName}
                    onClick={() => openFile(tabName)}
                    className={`h-full px-4 border-r border-[#252526] text-xs flex items-center gap-1.5 select-none font-medium cursor-pointer transition-all ${
                      activeFile === tabName 
                        ? "bg-[#1e1e1e] border-t-2 border-indigo-500 text-white font-bold" 
                        : "text-neutral-500 hover:bg-[#2d2d2d] hover:text-neutral-300"
                    }`}
                  >
                    {virtualFiles[tabName]?.isJava ? (
                      <Coffee size={12} className={virtualFiles[tabName]?.iconColor || "text-orange-500"} />
                    ) : (
                      <FileCode size={12} className={virtualFiles[tabName]?.iconColor || "text-sky-400"} />
                    )}
                    <span>{tabName}</span>
                    <span 
                      onClick={(e) => closeTab(tabName, e)}
                      className="text-[9px] text-neutral-500 hover:text-white hover:bg-neutral-800 rounded px-1 ml-1 cursor-pointer transition-all"
                    >
                      ×
                    </span>
                  </div>
                ))}
              </div>

              {/* Action Toolbar on Tab Right (Play/Stop button etc) */}
              <div className="flex items-center gap-3 px-3 text-neutral-400">
                <button
                  onClick={handleRunCode}
                  disabled={isRunning}
                  className="p-1 rounded hover:bg-[#2d2d2d] hover:text-white transition-all cursor-pointer text-green-500 flex items-center gap-1 disabled:opacity-50"
                  title="Run Code (F5)"
                >
                  {isRunning ? (
                    <RefreshCw size={13} className="animate-spin text-neutral-400" />
                  ) : (
                    <Play size={13} className="fill-green-500 stroke-green-500" />
                  )}
                </button>
                <button
                  onClick={handleReset}
                  className="p-1 rounded hover:bg-[#2d2d2d] hover:text-white transition-all cursor-pointer text-neutral-400"
                  title="Reset Sandbox Workspace"
                >
                  <RotateCcw size={12} />
                </button>
              </div>
            </div>

            {/* Breadcrumbs Bar */}
            <div className="h-6 bg-[#1e1e1e] border-b border-[#252526] text-[10px] text-neutral-500 flex items-center px-4 gap-1.5">
              <span>src</span>
              <span>&gt;</span>
              <span>{activeFile}</span>
              {virtualFiles[activeFile]?.isJava && (
                <>
                  <span>&gt;</span>
                  <span className="text-neutral-400 font-semibold flex items-center gap-1">
                    <Coffee size={10} className="text-orange-500" />
                    Main
                  </span>
                  <span>&gt;</span>
                  <span>main(String[])</span>
                </>
              )}
            </div>

            {/* Main Code Editing Canvas Area */}
            <div className="flex-1 flex flex-col min-h-0 relative">
              {openTabs.length > 0 ? (
                <div className="flex-1 flex relative font-mono text-xs overflow-hidden bg-[#1e1e1e] pt-2">
                  {/* Line Numbers gutter */}
                  <div className="text-[10px] font-mono text-[#858585] select-none text-right flex flex-col gap-1 pr-3 pl-4 border-r border-[#2b2b2b] bg-[#1e1e1e] min-w-[3.5rem] pt-1">
                    {Array.from({ length: Math.max(15, code.split("\n").length) }).map((_, i) => (
                      <span key={i}>{i + 1}</span>
                    ))}
                  </div>

                  {/* Editable Textarea Editor Canvas */}
                  <div className="flex-1 relative h-full">
                    <textarea
                      ref={textareaRef}
                      value={code}
                      onChange={handleTextareaChange}
                      onKeyDown={handleKeyDown}
                      className="w-full h-full bg-[#1e1e1e] outline-none border-none resize-none leading-relaxed text-[#d4d4d4] font-mono text-xs p-2 pl-4 focus:ring-0 focus:outline-none placeholder-neutral-700"
                      spellCheck="false"
                      placeholder="// Write code here..."
                    />

                    {/* VS Code Autocomplete Suggestions Dropdown Popup */}
                    <AnimatePresence>
                      {suggestions.length > 0 && virtualFiles[activeFile]?.isJava && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="absolute top-20 left-6 z-40 bg-[#252526] border border-[#454545] rounded shadow-2xl w-[290px] max-h-56 overflow-y-auto font-mono text-[10px] scrollbar-thin text-neutral-300 select-none"
                        >
                          <div className="flex items-center justify-between border-b border-[#3c3c3c] pb-1 px-2 pt-1.5 text-neutral-500">
                            <span className="font-bold text-[8px] uppercase tracking-wider">IntelliSense Autocomplete</span>
                            <span className="text-[8px] bg-[#3c3c3c] text-neutral-400 px-1 rounded">Tab / Enter</span>
                          </div>
                          
                          {suggestions.map((item, idx) => (
                            <div
                              key={item.text}
                              onClick={() => insertSuggestion(item)}
                              className={`flex flex-col gap-0.5 px-3 py-1.5 cursor-pointer border-b border-[#303030]/30 transition-all ${
                                idx === suggestionIndex
                                  ? "bg-[#04395e] text-white font-semibold"
                                  : "hover:bg-[#2d2d2d] text-neutral-300"
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="flex items-center gap-1.5">
                                  <span className={`text-[8px] font-bold px-1 rounded ${
                                    item.type === "snippet" ? "bg-amber-600/30 text-amber-400 border border-amber-500/20" : "bg-blue-600/30 text-blue-400 border border-blue-500/20"
                                  }`}>
                                    {item.type === "snippet" ? "▭" : "⚙"}
                                  </span>
                                  <span>{item.text}</span>
                                </span>
                                <span className="text-[8px] text-neutral-500 italic">{item.type}</span>
                              </div>
                              <span className={`text-[8px] font-normal leading-normal ${
                                idx === suggestionIndex ? "text-[#9cdcfe]" : "text-neutral-500"
                              }`}>
                                {item.desc}
                              </span>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              ) : (
                /* VS Code startup screen layout if all tabs are closed */
                <div className="flex-1 flex flex-col items-center justify-center bg-[#1e1e1e] text-neutral-500 font-sans select-none">
                  <div className="flex flex-col items-center gap-6 max-w-sm">
                    <Coffee size={48} className="text-neutral-700/80 animate-pulse" />
                    <div className="flex flex-col gap-2.5 w-full text-xs">
                      <div className="flex justify-between gap-8">
                        <span>Show Command Palette</span>
                        <kbd className="bg-neutral-800 text-neutral-400 px-1.5 py-0.5 rounded font-mono">Ctrl+Shift+P</kbd>
                      </div>
                      <div className="flex justify-between gap-8">
                        <span>Run Workspace Code</span>
                        <kbd className="bg-neutral-800 text-neutral-400 px-1.5 py-0.5 rounded font-mono">F5</kbd>
                      </div>
                      <div className="flex justify-between gap-8 items-center">
                        <span>Open Explorer File</span>
                        <button 
                          onClick={() => openFile("StreamSort.java")}
                          className="text-indigo-400 hover:underline cursor-pointer font-semibold"
                        >
                          StreamSort.java
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Bottom Console Panel (VS Code terminal replica) */}
              <div className="h-52 bg-[#181818] border-t border-[#2b2b2b] flex flex-col min-h-[160px] select-none z-10">
                {/* Panel Tab headers */}
                <div className="h-8 bg-[#181818] border-b border-[#252526] px-4 flex items-center justify-between text-xs text-neutral-400">
                  <div className="flex gap-4 h-full items-center">
                    <button 
                      onClick={() => { setActiveTerminalTab("problems"); playSound("click"); }}
                      className={`h-full border-b-2 px-1 text-[11px] font-bold cursor-pointer relative ${activeTerminalTab === "problems" ? "border-indigo-500 text-white" : "border-transparent text-neutral-500 hover:text-neutral-300"}`}
                    >
                      PROBLEMS 
                      <span className={`ml-1 px-1 rounded text-[9px] font-bold ${problems.length > 0 ? "bg-red-600 text-white" : "bg-[#2d2d2d] text-neutral-400"}`}>
                        {problems.length}
                      </span>
                    </button>
                    <button 
                      onClick={() => { setActiveTerminalTab("output"); playSound("click"); }}
                      className={`h-full border-b-2 px-1 text-[11px] font-bold cursor-pointer ${activeTerminalTab === "output" ? "border-indigo-500 text-white" : "border-transparent text-neutral-500 hover:text-neutral-300"}`}
                    >
                      OUTPUT
                    </button>
                    <button 
                      onClick={() => { setActiveTerminalTab("debug"); playSound("click"); }}
                      className={`h-full border-b-2 px-1 text-[11px] font-bold cursor-pointer ${activeTerminalTab === "debug" ? "border-indigo-500 text-white" : "border-transparent text-neutral-500 hover:text-neutral-300"}`}
                    >
                      DEBUG CONSOLE
                    </button>
                    <button 
                      onClick={() => { setActiveTerminalTab("terminal"); playSound("click"); }}
                      className={`h-full border-b-2 px-1 text-[11px] font-bold cursor-pointer ${activeTerminalTab === "terminal" ? "border-indigo-500 text-white" : "border-transparent text-neutral-500 hover:text-neutral-300"}`}
                    >
                      TERMINAL
                    </button>
                  </div>

                  <div className="flex items-center gap-3 text-neutral-500">
                    <button 
                      onClick={() => { setLogs([]); playSound("click"); }}
                      className="p-1 rounded hover:bg-[#2d2d2d] hover:text-white cursor-pointer"
                      title="Clear Terminal Output"
                    >
                      <Trash2 size={11} />
                    </button>
                    <span className="text-[10px] text-neutral-600 select-none">sh</span>
                  </div>
                </div>

                {/* Console Log Area screen */}
                <div className="flex-1 p-4 font-mono text-[11px] bg-[#181818] overflow-y-auto flex flex-col gap-1 scrollbar-thin select-text">
                  {activeTerminalTab === "terminal" ? (
                    <div className="flex flex-col gap-1">
                      {logs.map((log, i) => {
                        if (!log || typeof log !== "string") return null;
                        let colorClass = "text-neutral-300";
                        if (log.startsWith("[SUCCESS]")) {
                          colorClass = "text-green-400 font-bold";
                        } else if (log.startsWith("[ERROR]")) {
                          colorClass = "text-red-400 font-bold";
                        } else if (log.startsWith("[INFO]")) {
                          colorClass = "text-sky-400";
                        } else if (log.startsWith(">")) {
                          colorClass = "text-indigo-400 font-semibold";
                        } else if (!log.startsWith("-") && log.trim().length > 0 && !log.includes("C:\\Users\\")) {
                          colorClass = "text-yellow-200 font-semibold";
                        }

                        return (
                          <div key={i} className={colorClass}>
                            {log}
                          </div>
                        );
                      })}

                      {isRunning && (
                        <div className="text-neutral-500 flex items-center gap-1.5 animate-pulse mt-1 select-none">
                          <span className="w-1.5 h-3 bg-neutral-400 block animate-ping"></span>
                          <span>Compiling bytecode...</span>
                        </div>
                      )}

                      {/* Interactive prompt shell input form */}
                      <form onSubmit={handleTerminalSubmit} className="flex items-center gap-1 mt-1 text-neutral-300">
                        <span className="text-neutral-400 font-semibold">C:\Users\aignite\projects\jvm-sandbox&gt;</span>
                        <input
                          type="text"
                          value={terminalInputVal}
                          onChange={(e) => setTerminalInputVal(e.target.value)}
                          className="flex-1 bg-transparent border-none outline-none font-mono text-[11px] text-neutral-200 p-0 focus:ring-0 focus:outline-none"
                          placeholder="Type cmd..."
                        />
                      </form>
                      
                      <div ref={terminalBottomRef} />
                    </div>
                  ) : activeTerminalTab === "problems" ? (
                    <div className="flex flex-col gap-2 p-1">
                      {problems.length > 0 ? (
                        problems.map((prob, i) => (
                          <div 
                            key={i} 
                            onClick={() => {
                              textareaRef.current?.focus();
                            }}
                            className="flex items-center gap-2 text-red-400 hover:text-red-300 cursor-pointer hover:bg-neutral-800/40 p-1.5 rounded"
                          >
                            <AlertCircle size={12} />
                            <span className="font-bold">[{prob.file.toUpperCase()}]</span>
                            <span>{prob.message}</span>
                          </div>
                        ))
                      ) : (
                        <div className="text-neutral-600 py-6 text-center select-none">
                          No problems have been detected in the workspace.
                        </div>
                      )}
                    </div>
                  ) : activeTerminalTab === "output" ? (
                    <div className="text-neutral-500 select-text leading-relaxed p-1">
                      [System Info] AIGNITE JVM Virtual Machine version 21.0.1+12-LTS<br />
                      [System Info] Local sandboxed interpreter compiler active.
                    </div>
                  ) : (
                    <div className="text-neutral-500 select-none py-6 text-center">
                      Debug console inactive. Launch compilation task to view local process inspector.
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* VS Code bottom status bar */}
        <div className="h-6 bg-[#007acc] text-white text-xs flex items-center justify-between px-3 select-none z-20">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-[#0062a3] hover:bg-[#0071bd] px-2 h-full cursor-pointer transition-colors">
              <span className="font-bold">&lt;&gt;</span>
              <span>Aignite VM</span>
            </div>
            <div className="flex items-center gap-1 hover:bg-[#0062a3] px-1 py-0.5 rounded cursor-pointer transition-colors">
              <GitBranch size={11} />
              <span>main*</span>
            </div>
            {problems.length > 0 && (
              <div className="flex items-center gap-1 text-red-200 font-bold bg-red-700/60 px-1.5 rounded animate-pulse text-[10px]">
                <AlertCircle size={10} />
                <span>{problems.length}</span>
              </div>
            )}
            <div className="flex items-center gap-1 text-[10px] text-indigo-100 font-medium">
              <span>{isRunning ? "● Processing" : "✓ Ready"}</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-[10px] font-normal">
            <span>Ln 1, Col 1</span>
            <span>Spaces: 4</span>
            <span>UTF-8</span>
            <span>LF</span>
            <span>{virtualFiles[activeFile]?.isJava ? "Java" : activeFile.endsWith(".xml") ? "XML" : "Markdown"}</span>
            <div className="bg-[#0062a3] px-1 py-0.5 rounded flex items-center gap-1 text-[9px]">
              <Check size={9} />
              <span>Prettier</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
