export const versions = [
{label:"Java 1.0 / 1.1",year:"1996–97",badge:"Origin",color:"#38bdf8",
summary:"The birth of Java — OOP, threading, and a vision of write once, run anywhere.",
topics:[
{icon:"🏛️",name:"OOP Basics",tag:"Classes & objects",
ex:"Think of Java as a <strong>blueprint system</strong>. A <strong>class</strong> is the blueprint for a Car, and an <strong>object</strong> is a real car built from it. <strong>Inheritance</strong> lets a child class reuse everything from its parent — a Dog class automatically knows how to eat because Animal already defined that. <strong>Polymorphism</strong> means one method name can behave differently depending on the object type.",
pts:["A class is a blueprint; an object is a real instance built from it","Inheritance: Dog extends Animal and gets all its features for free","Polymorphism: one method name, different behavior per subclass","Encapsulation: keep internals private, expose only what's needed"],
code:`<span class="kw">class</span> Animal {
  String name;
  <span class="kw">void</span> speak() { System.out.println(<span class="str">"..."</span>); }
}
<span class="kw">class</span> Dog <span class="kw">extends</span> Animal {
  <span class="kw">void</span> speak() { System.out.println(<span class="str">"Woof!"</span>); }
}
Dog d = <span class="kw">new</span> Dog();
d.speak(); <span class="cmt">// → Woof!</span>`},
{icon:"🔢",name:"Primitive Types",tag:"int, double, boolean…",
ex:"Java has <strong>8 built-in simple types</strong> that store raw values directly in memory — no overhead, ultra fast. Think of them as the <strong>atoms of Java data</strong>. Everything more complex (like a String or an ArrayList) is built on top of these. Mixing up the types causes compile errors, which is a feature — it catches mistakes early.",
pts:["int / long / short / byte → whole numbers (no decimal point)","float / double → numbers with decimals (double is more precise)","char → exactly one character, like 'A' or '9'","boolean → only true or false, nothing else"],
code:`<span class="kw">int</span>     age     = <span class="num">25</span>;
<span class="kw">double</span>  price   = <span class="num">9.99</span>;
<span class="kw">boolean</span> isValid = <span class="kw">true</span>;
<span class="kw">char</span>    grade   = <span class="str">'A'</span>;
<span class="kw">long</span>    bigNum  = <span class="num">9_000_000_000L</span>;`},
{icon:"🧵",name:"Threads",tag:"Do multiple things at once",
ex:"A <strong>thread</strong> is like a separate worker inside your program. By default Java runs on one thread — one cashier. With threads you can have <strong>many cashiers at once</strong>: one downloading a file, another updating the UI, another processing data. The tricky part is making sure they don't <strong>clash when sharing data</strong> — that's what <code>synchronized</code> handles.",
pts:["Extend Thread or implement Runnable to define a task","start() launches the thread; run() has the actual work","synchronized prevents two threads writing the same data at once","sleep(ms) pauses a thread for a given number of milliseconds"],
code:`<span class="kw">class</span> Worker <span class="kw">extends</span> Thread {
  <span class="kw">public void</span> run() {
    System.out.println(<span class="str">"Running in background!"</span>);
  }
}
<span class="kw">new</span> Worker().start(); <span class="cmt">// launches alongside main code</span>`},
{icon:"🖼️",name:"AWT (GUI)",tag:"Desktop windows & buttons",
ex:"AWT (Abstract Window Toolkit) gave Java its first real desktop UI. It used the <strong>operating system's own native widgets</strong> — so a Java button on Windows looked exactly like a Windows button, and on macOS it looked like a Mac button. It was the first step, but had limited controls and inconsistent look. Swing replaced it later.",
pts:["Frame = the main application window","Button, Label, TextField, TextArea are the basic controls","ActionListener / MouseListener handle user interactions","Platform-native look — looked different on each OS"],
code:`Frame f = <span class="kw">new</span> Frame(<span class="str">"My App"</span>);
Button b = <span class="kw">new</span> Button(<span class="str">"Click Me"</span>);
b.addActionListener(e ->
  System.out.println(<span class="str">"Clicked!"</span>));
f.add(b);
f.setSize(<span class="num">300</span>, <span class="num">150</span>);
f.setVisible(<span class="kw">true</span>);`},
{icon:"🌐",name:"Applets",tag:"Java programs in the browser",
ex:"Applets were Java programs that ran <strong>inside a web browser</strong> — the original \"interactive web\" before JavaScript took over. You'd visit a page and a full Java program would execute right in the browser tab. Revolutionary in 1996 when web pages were mostly static. Killed by security concerns and the rise of JavaScript. <strong>Removed entirely in Java 11</strong>.",
pts:["Extend Applet class and override init() and paint()","Browser handled the lifecycle: init, start, stop, destroy","paint(Graphics g) is where you drew to the screen","Deprecated in Java 9, fully removed in Java 11"],
code:`<span class="kw">import</span> java.applet.Applet;
<span class="kw">import</span> java.awt.Graphics;
<span class="kw">public class</span> Hello <span class="kw">extends</span> Applet {
  <span class="kw">public void</span> paint(Graphics g) {
    g.drawString(<span class="str">"Hello World!"</span>, <span class="num">20</span>, <span class="num">30</span>);
  }
}`}
]},
{label:"Java 1.2 – 1.4",year:"1998–2002",badge:"Maturity",color:"#4ade80",
summary:"Java got serious — collections, real GUIs, database connectivity, and proper error handling.",
topics:[
{icon:"📦",name:"Collections API",tag:"Lists, Maps, Sets — organized",
ex:"Before Collections, managing groups of objects was painful and inconsistent. The <strong>Collections Framework</strong> gave us a unified system: <strong>ArrayList</strong> is a list that grows as you add items (like a shopping list). <strong>HashMap</strong> is a dictionary — key maps to value (\"Alice\" → 95). <strong>HashSet</strong> is a bag that silently drops duplicates. All share a common interface, so you can swap them without rewriting logic.",
pts:["ArrayList: grows automatically, fast random access by index","HashMap: key → value storage, O(1) lookup speed","HashSet: only stores unique values, duplicates silently dropped","Iterator / for-each: loop over any collection the same way"],
code:`List&lt;String&gt; names = <span class="kw">new</span> ArrayList&lt;&gt;();
names.add(<span class="str">"Alice"</span>); names.add(<span class="str">"Bob"</span>);

Map&lt;String, Integer&gt; scores = <span class="kw">new</span> HashMap&lt;&gt;();
scores.put(<span class="str">"Alice"</span>, <span class="num">95</span>);
scores.get(<span class="str">"Alice"</span>); <span class="cmt">// → 95</span>

Set&lt;String&gt; unique = <span class="kw">new</span> HashSet&lt;&gt;(names);`},
{icon:"🪟",name:"Swing",tag:"Rich cross-platform GUI",
ex:"Swing fixed AWT's problem: instead of using the OS's native widgets (which looked different everywhere), Swing <strong>draws every pixel itself</strong>. Your app looks identical on Windows, Mac, and Linux. Think of AWT as a basic HTML form vs Swing as a fully styled React app — same idea, completely different quality. Still used in enterprise desktop apps today.",
pts:["JFrame = window, JButton = button, JLabel = text label","Fully cross-platform — pixel-perfect same look on all OS","Supports Look and Feel themes to change the visual style","Layout managers (BorderLayout, GridLayout) control positioning"],
code:`JFrame frame = <span class="kw">new</span> JFrame(<span class="str">"My App"</span>);
JButton btn = <span class="kw">new</span> JButton(<span class="str">"Click!"</span>);
btn.addActionListener(e ->
  JOptionPane.showMessageDialog(
    frame, <span class="str">"Hello!"</span>));
frame.add(btn);
frame.pack();
frame.setVisible(<span class="kw">true</span>);`},
{icon:"🗄️",name:"JDBC",tag:"Connect to databases",
ex:"<strong>JDBC (Java Database Connectivity)</strong> is how Java talks to databases. Think of it as a <strong>universal adapter plug</strong> — one standard interface that works with MySQL, PostgreSQL, Oracle, SQLite, and almost any other database. You swap the driver JAR file to switch databases without changing your Java code. Every enterprise Java app uses JDBC, directly or through a layer like Hibernate.",
pts:["DriverManager.getConnection() opens the database connection","Statement or PreparedStatement to run SQL queries","ResultSet holds the rows your query returned","PreparedStatement prevents SQL injection attacks"],
code:`Connection con = DriverManager.getConnection(
  <span class="str">"jdbc:mysql://localhost/mydb"</span>, <span class="str">"user"</span>, <span class="str">"pass"</span>);

PreparedStatement ps = con.prepareStatement(
  <span class="str">"SELECT * FROM users WHERE id = ?"</span>);
ps.setInt(<span class="num">1</span>, userId);
ResultSet rs = ps.executeQuery();

<span class="kw">while</span> (rs.next())
  System.out.println(rs.getString(<span class="str">"name"</span>));`},
{icon:"⚠️",name:"Exceptions",tag:"Handle errors without crashing",
ex:"Exceptions are Java's structured crash-prevention system. Without them, one bug crashes your entire program. With try-catch, you <strong>anticipate what might fail, catch the specific error, and handle it gracefully</strong> — like a pilot with emergency protocols. Java distinguishes <strong>checked exceptions</strong> (must handle or declare) from <strong>unchecked exceptions</strong> (optional to handle).",
pts:["try: wrap the code that might fail here","catch: runs if the specific exception occurs","finally: always runs — great for cleanup like closing files","throw / throws: trigger an exception yourself or declare it"],
code:`<span class="kw">try</span> {
  <span class="kw">int</span> result = <span class="num">10</span> / <span class="num">0</span>; <span class="cmt">// ArithmeticException!</span>
} <span class="kw">catch</span> (ArithmeticException e) {
  System.out.println(<span class="str">"Caught: "</span> + e.getMessage());
} <span class="kw">finally</span> {
  System.out.println(<span class="str">"Always runs"</span>);
}`},
{icon:"🔭",name:"Reflection",tag:"Inspect classes at runtime",
ex:"Reflection lets your code <strong>examine and interact with itself</strong> while running. At runtime you can ask any object: \"what methods do you have? what fields? what's your class name?\" — and even call methods dynamically by name without knowing them at compile time. This powers IDE autocomplete, Spring's dependency injection, JUnit test discovery, and almost every Java framework.",
pts:["Class.forName('name') loads any class by its string name","getMethods() / getFields() list all accessible members","invoke() calls a method you know only by name at runtime","getDeclaredFields() accesses private fields (use carefully!)"],
code:`Class&lt;?&gt; cls = Class.forName(<span class="str">"java.lang.String"</span>);
System.out.println(cls.getName());

<span class="cmt">// Call a method dynamically by name</span>
Method m = cls.getMethod(<span class="str">"length"</span>);
Object result = m.invoke(<span class="str">"Hello!"</span>);
System.out.println(result); <span class="cmt">// → 6</span>

<span class="cmt">// List all methods</span>
Arrays.stream(cls.getMethods())
  .map(Method::getName)
  .forEach(System.out::println);`}
]},
{label:"Java 5",year:"2004",badge:"Leap",color:"#f59e0b",
summary:"The biggest single upgrade in Java history — Generics, Enums, Annotations, and for-each.",
topics:[
{icon:"🧬",name:"Generics",tag:"Type-safe containers",
ex:"Before Generics, a <code>List</code> could hold <strong>anything</strong>, and you'd only discover a type mismatch at runtime when the program crashed. Generics are like <strong>labeling a box</strong>: \"this box holds only Strings\". The compiler enforces it — try to put an Integer in a <code>List&lt;String&gt;</code> and your code won't even compile. This eliminates an entire class of runtime bugs.",
pts:["<T> is the type parameter — filled in when you use the class","List<String> only accepts Strings — enforced at compile time","Wildcard <?> means any type is acceptable","Bounded types: <T extends Number> restricts to numbers only"],
code:`<span class="cmt">// Without Generics — risky</span>
List list = <span class="kw">new</span> ArrayList();
list.add(<span class="str">"hello"</span>);
String s = (String) list.get(<span class="num">0</span>); <span class="cmt">// might crash!</span>

<span class="cmt">// With Generics — safe & clean</span>
List&lt;String&gt; names = <span class="kw">new</span> ArrayList&lt;&gt;();
names.add(<span class="str">"Alice"</span>);
String name = names.get(<span class="num">0</span>); <span class="cmt">// no cast needed</span>`},
{icon:"🏷️",name:"Enums",tag:"Type-safe named constants",
ex:"Before Enums, constants were plain integers: <code>int MONDAY = 1</code>. The problem? <strong>Nothing stops you from passing 999 as a day</strong>. Enums are a fixed, named set of values — think of them as a <strong>multiple-choice field on a form</strong>. Only the listed options are valid, and the compiler enforces it. Enums can also carry data and methods, making them surprisingly powerful.",
pts:["enum keyword defines a closed set of named constants","Passing an invalid value is a compile error — caught early","Each enum constant can have fields and methods","Works perfectly with switch — compiler warns on missing cases"],
code:`<span class="kw">enum</span> Day {
  MON, TUE, WED, THU, FRI, SAT, SUN
}

Day today = Day.FRI;

<span class="kw">switch</span> (today) {
  <span class="kw">case</span> FRI: System.out.println(<span class="str">"TGIF! 🎉"</span>); <span class="kw">break</span>;
  <span class="kw">default</span>:  System.out.println(<span class="str">"Keep going…"</span>);
}`},
{icon:"📎",name:"Annotations",tag:"Metadata for your code",
ex:"Annotations are <strong>labels you stick on your code</strong> that carry information — for the compiler, for build tools, or for frameworks. <code>@Override</code> tells the compiler \"I'm intentionally overriding a parent method — warn me if I mistyped the name\". <code>@Deprecated</code> flags old APIs. Spring and JPA use dozens of annotations like <code>@Bean</code>, <code>@Entity</code>, <code>@Autowired</code> to configure everything without XML files.",
pts:["@Override: ensures you're actually overriding, typo protection","@Deprecated: IDE shows strikethrough and a warning to callers","Custom annotations: create your own with @interface keyword","Retention policy: RUNTIME = available via reflection"],
code:`<span class="kw">class</span> Dog <span class="kw">extends</span> Animal {

  @Override <span class="cmt">// typo protection!</span>
  <span class="kw">public void</span> speak() {
    System.out.println(<span class="str">"Woof!"</span>);
  }

  @Deprecated <span class="cmt">// shows strikethrough in IDEs</span>
  <span class="kw">public void</span> oldMethod() { <span class="cmt">/* don't use */</span> }
}`},
{icon:"↔️",name:"Autoboxing",tag:"int ↔ Integer auto-conversion",
ex:"Java has both primitives (<code>int</code>, fast, no overhead) and object wrappers (<code>Integer</code>, needed for collections). Before Java 5, you had to manually convert between them — tedious. <strong>Autoboxing converts automatically</strong> in both directions. One gotcha: unboxing a <code>null</code> Integer throws a NullPointerException, so watch out when working with nullable values.",
pts:["int → Integer wrapping happens automatically (boxing)","Integer → int unwrapping also automatic (unboxing)","Lets you put primitives directly into Collections","Warning: unboxing a null reference = NullPointerException"],
code:`<span class="cmt">// Manual wrapping (old way)</span>
Integer x = Integer.valueOf(<span class="num">42</span>);
<span class="kw">int</span> y = x.intValue();

<span class="cmt">// Autoboxing (Java 5+)</span>
Integer a = <span class="num">42</span>;   <span class="cmt">// auto-boxed</span>
<span class="kw">int</span>     b = a;   <span class="cmt">// auto-unboxed</span>

List&lt;Integer&gt; nums = <span class="kw">new</span> ArrayList&lt;&gt;();
nums.add(<span class="num">7</span>); <span class="cmt">// int 7 auto-boxed to Integer</span>`},
{icon:"🔄",name:"For-Each Loop",tag:"Cleaner iteration",
ex:"The old loop — <code>for(int i=0; i&lt;list.size(); i++)</code> — is verbose and easy to get wrong (off-by-one errors are extremely common). The enhanced for-each says what you actually mean: <strong>\"for every item in this collection, do this\"</strong>. No index variable, no boundary check, no possibility of going out of bounds. Cleaner, shorter, and safer.",
pts:["Works with any array or Iterable (List, Set, Map.entrySet)","No index variable — can't have off-by-one errors","Slightly less code, much more readable intent","Use traditional for loop only if you need the index"],
code:`String[] fruits = {<span class="str">"Apple"</span>, <span class="str">"Mango"</span>, <span class="str">"Banana"</span>};

<span class="cmt">// Old way</span>
<span class="kw">for</span> (<span class="kw">int</span> i = <span class="num">0</span>; i &lt; fruits.length; i++)
  System.out.println(fruits[i]);

<span class="cmt">// For-each — clean!</span>
<span class="kw">for</span> (String fruit : fruits)
  System.out.println(fruit);`},
{icon:"📌",name:"Varargs",tag:"Variable number of arguments",
ex:"Varargs lets a method accept <strong>any number of arguments</strong> of the same type — zero, one, or a hundred. Before varargs, you'd have to bundle them into an array and pass that. Think of ordering a pizza: instead of saying \"I want an array containing pepperoni and mushroom\", you just say <strong>\"I want pepperoni, mushroom\"</strong> and the method figures out the grouping.",
pts:["Syntax: Type... name — the ... means zero or more","Inside the method, varargs is just a regular array","Must be the last parameter if combined with others","Classic example: System.out.printf(format, arg1, arg2, ...)"],
code:`<span class="kw">static void</span> print(String... items) {
  <span class="kw">for</span> (String item : items)
    System.out.println(item);
}

print(<span class="str">"one"</span>);
print(<span class="str">"a"</span>, <span class="str">"b"</span>, <span class="str">"c"</span>);
print(); <span class="cmt">// zero args is valid too</span>`}
]},
{label:"Java 7",year:"2011",badge:"Polish",color:"#f87171",
summary:"Focused, practical improvements — less boilerplate, safer resource management.",
topics:[
{icon:"💎",name:"Diamond Operator <>",tag:"Stop repeating the type",
ex:"When you write <code>Map&lt;String, List&lt;Integer&gt;&gt; map = new HashMap&lt;String, List&lt;Integer&gt;&gt;()</code>, you're writing the type twice — and the compiler already knows the type from the left side. The <strong>diamond operator</strong> just says <strong>\"compiler, you already know this — fill it in\"</strong>. A tiny change that feels surprisingly satisfying after using Java without it.",
pts:["<> on the right side infers the type from the left","Still fully type-checked at compile time — same safety","Only valid for local variable declarations","Not just cosmetic — reduces errors from type mismatches on long generics"],
code:`<span class="cmt">// Before Java 7 — type written twice</span>
List&lt;String&gt; a = <span class="kw">new</span> ArrayList&lt;String&gt;();
Map&lt;String,List&lt;Integer&gt;&gt; b =
  <span class="kw">new</span> HashMap&lt;String,List&lt;Integer&gt;&gt;();

<span class="cmt">// Java 7+ — diamond infers type</span>
List&lt;String&gt; a = <span class="kw">new</span> ArrayList&lt;&gt;();
Map&lt;String,List&lt;Integer&gt;&gt; b = <span class="kw">new</span> HashMap&lt;&gt;();`},
{icon:"🛡️",name:"Try-with-resources",tag:"Auto-close files & connections",
ex:"Whenever you open a file, database connection, or network socket, you <strong>must close it</strong> when done — or the program leaks resources and eventually crashes. Remembering to close in the right order in every possible code path is error-prone. Try-with-resources is like a <strong>self-closing door</strong> — whatever you declare in the <code>try()</code> parentheses is automatically closed when the block exits, even if an exception occurred.",
pts:["Resource must implement AutoCloseable or Closeable","close() is called automatically on exit, even on exceptions","Eliminates the need for try/finally just to close resources","Multiple resources in one try: semicolon-separated"],
code:`<span class="cmt">// Old — easy to forget close()</span>
FileReader fr = <span class="kw">new</span> FileReader(<span class="str">"data.txt"</span>);
<span class="kw">try</span> { <span class="cmt">/* use fr */</span> }
<span class="kw">finally</span> { fr.close(); } <span class="cmt">// must not forget!</span>

<span class="cmt">// Java 7 — auto-closed!</span>
<span class="kw">try</span> (FileReader fr = <span class="kw">new</span> FileReader(<span class="str">"data.txt"</span>)) {
  System.out.println(fr.read());
} <span class="cmt">// fr.close() called here automatically</span>`},
{icon:"📁",name:"NIO.2 Files API",tag:"Modern file I/O",
ex:"The old <code>java.io.File</code> class was a mess — error messages were vague, methods had inconsistent names, and it couldn't do many things without third-party libraries. <strong>NIO.2 introduced Path and Files</strong> — a clean, expressive API where reading a whole file is one line, copying is one line, and errors tell you exactly what went wrong.",
pts:["Path is the new way to represent a file location","Files.readAllLines() reads an entire file into a List<String>","Files.copy(), move(), delete() are clear and concise","WatchService watches a folder for file create/modify/delete events"],
code:`Path src = Paths.get(<span class="str">"notes.txt"</span>);

<span class="cmt">// Read entire file in one line</span>
List&lt;String&gt; lines = Files.readAllLines(src);

<span class="cmt">// Copy, move, delete</span>
Files.copy(src, Paths.get(<span class="str">"backup.txt"</span>));
Files.move(src, Paths.get(<span class="str">"archive/notes.txt"</span>));
Files.delete(Paths.get(<span class="str">"old.txt"</span>));`},
{icon:"🔀",name:"Switch on Strings",tag:"Text in switch statements",
ex:"Before Java 7, switch only worked with numbers, chars, and enums — not Strings. If you wanted to route based on a command string, you had to write a long chain of <code>if-else if</code> blocks. Now you can use <strong>switch directly on String values</strong>, which is more compact and lets the compiler optimize it. One gotcha: passing <code>null</code> will throw NullPointerException.",
pts:["case \"value\": works exactly like with integers","Internally uses .equals() for comparison","Much cleaner than nested if-else for multiple String options","null input throws NullPointerException — check first if needed"],
code:`String cmd = <span class="str">"start"</span>;

<span class="kw">switch</span> (cmd) {
  <span class="kw">case</span> <span class="str">"start"</span>:
    System.out.println(<span class="str">"Starting!"</span>); <span class="kw">break</span>;
  <span class="kw">case</span> <span class="str">"stop"</span>:
    System.out.println(<span class="str">"Stopping!"</span>); <span class="kw">break</span>;
  <span class="kw">default</span>:
    System.out.println(<span class="str">"Unknown command"</span>);
}`}
]},
{label:"Java 8",year:"2014",badge:"Revolution",color:"#a78bfa",
summary:"The most impactful Java release ever. Lambdas and Streams fundamentally changed how Java is written.",
topics:[
{icon:"⚡",name:"Lambdas",tag:"Functions as values",
ex:"Before lambdas, passing behavior as an argument meant creating an anonymous inner class — verbose and noisy. A lambda is a <strong>concise function you pass around like a value</strong>. Instead of 6 lines of anonymous class boilerplate to sort a list, you write one line. Lambdas unlocked <strong>functional programming</strong> patterns in Java — treating functions the way you'd treat any other object.",
pts:["Syntax: (parameters) -> expression or { statements }","Replaces verbose anonymous class implementations entirely","Works with functional interfaces (interfaces with one method)","Used everywhere: Streams, comparators, event listeners, threads"],
code:`<span class="cmt">// Anonymous class — 7 lines for a simple sort</span>
list.sort(<span class="kw">new</span> Comparator&lt;String&gt;() {
  <span class="kw">public int</span> compare(String a, String b) {
    <span class="kw">return</span> a.compareTo(b);
  }
});

<span class="cmt">// Lambda — 1 line!</span>
list.sort((a, b) -> a.compareTo(b));

<span class="cmt">// Method reference — even cleaner</span>
list.sort(String::compareTo);`},
{icon:"🌊",name:"Stream API",tag:"Data pipelines in one chain",
ex:"Streams let you describe data transformations as a <strong>pipeline of steps</strong>: filter out what you don't want, transform what remains, then collect the results. Think of a <strong>factory assembly line</strong> — raw parts go in, pass through each station, and finished products come out. Streams are <strong>lazy</strong> — nothing runs until you call a terminal operation like <code>collect()</code>.",
pts:["filter(): keep only items matching a condition","map(): transform each item into something else","collect(): gather all results into a List, Set, or Map","Lazy evaluation: steps only execute when a result is needed"],
code:`List&lt;String&gt; names =
  List.of(<span class="str">"Alice"</span>, <span class="str">"Bob"</span>, <span class="str">"Anna"</span>, <span class="str">"Charlie"</span>);

names.stream()
  .filter(n -> n.startsWith(<span class="str">"A"</span>))   <span class="cmt">// keep A-names</span>
  .map(String::toUpperCase)          <span class="cmt">// uppercase</span>
  .sorted()                          <span class="cmt">// alphabetical</span>
  .forEach(System.out::println);
<span class="cmt">// → ALICE, ANNA</span>`},
{icon:"🤔",name:"Optional",tag:"Null-safe containers",
ex:"<code>null</code> is the single most common source of crashes in Java (NullPointerException). <strong>Optional is a box that's either full or empty</strong>. Instead of returning <code>null</code> when a user isn't found, return <code>Optional&lt;User&gt;</code>. The type system now forces callers to acknowledge the possibility of emptiness before they can use the value — you literally <em>can't</em> forget to check.",
pts:["Optional.of(x) wraps a non-null value safely","Optional.empty() represents a missing value explicitly","orElse('default') provides a fallback if empty","map() and flatMap() chain operations only if a value is present"],
code:`<span class="cmt">// Risky — crashes if null</span>
String name = findUser(<span class="num">42</span>);
System.out.println(name.toUpperCase());

<span class="cmt">// Safe with Optional</span>
Optional&lt;String&gt; name = findUser(<span class="num">42</span>);
String result = name
  .map(String::toUpperCase)
  .orElse(<span class="str">"Unknown"</span>);`},
{icon:"📅",name:"Date / Time API",tag:"java.time — finally a good one",
ex:"Java's original <code>Date</code> and <code>Calendar</code> classes were notoriously bad — mutable (dangerous), month numbering started at 0 (confusing), and timezone handling was broken. The new <code>java.time</code> API, inspired by Joda-Time, is <strong>immutable, clear, and correct</strong>. <code>LocalDate</code> is just a date. <code>LocalDateTime</code> adds time. <code>ZonedDateTime</code> handles timezones.",
pts:["LocalDate: just a date — no time, no timezone confusion","LocalDateTime: date + time, still no timezone","ZonedDateTime: full date + time + timezone (e.g. Asia/Kolkata)","Period (date gap) and Duration (time gap) for differences"],
code:`LocalDate today = LocalDate.now();
LocalDate bday  = LocalDate.of(<span class="num">2000</span>, <span class="num">6</span>, <span class="num">15</span>);
Period   age   = Period.between(bday, today);
System.out.println(age.getYears() + <span class="str">" years"</span>);

LocalDateTime now = LocalDateTime.now();
LocalDateTime future = now.plusDays(<span class="num">7</span>).plusHours(<span class="num">3</span>);
System.out.println(future);`},
{icon:"🔗",name:"Default Methods",tag:"Interface method bodies",
ex:"Problem: you have an interface implemented by 1000 classes. You want to add a new method. <strong>Every single class breaks</strong>. Default methods solve this: you add the method to the interface with a default implementation. All existing classes <strong>automatically inherit it</strong>. They can still override if they want custom behavior. This is how Java 8 could add dozens of methods to <code>List</code> and <code>Map</code> without breaking old code.",
pts:["default keyword in an interface provides a fallback body","All implementing classes inherit it automatically, free","Classes can still override default methods if needed","Enabled Java 8 to extend List, Iterable, Map safely"],
code:`<span class="kw">interface</span> Greeter {
  String getName();

  <span class="cmt">// Free default — no need to override</span>
  <span class="kw">default void</span> greet() {
    System.out.println(
      <span class="str">"Hello, I'm "</span> + getName());
  }
}
<span class="kw">class</span> Person <span class="kw">implements</span> Greeter {
  <span class="kw">public</span> String getName() { <span class="kw">return</span> <span class="str">"Alice"</span>; }
  <span class="cmt">// greet() inherited for free!</span>
}`},
{icon:"🎯",name:"Method References",tag:"Shorthand for lambdas",
ex:"A method reference is a <strong>compressed lambda that calls exactly one existing method</strong>. Instead of <code>n -> System.out.println(n)</code>, write <code>System.out::println</code>. Same result, less noise. The <code>::</code> operator says \"give me a reference to this method\". There are four kinds: static method, instance method on a specific object, instance method on any instance, and constructor.",
pts:["ClassName::staticMethod — references a static method","instance::method — references a method on one specific object","ClassName::method — takes the instance as the first argument","ClassName::new — constructor reference, creates new instances"],
code:`List&lt;String&gt; names =
  List.of(<span class="str">"Alice"</span>, <span class="str">"Bob"</span>, <span class="str">"Charlie"</span>);

<span class="cmt">// Lambda</span>
names.forEach(n -> System.out.println(n));

<span class="cmt">// Method reference — same thing, cleaner</span>
names.forEach(System.out::println);

names.stream()
  .map(String::toUpperCase) <span class="cmt">// per-instance method</span>
  .forEach(System.out::println);`}
]},
{label:"Java 9 – 11",year:"2017–18",badge:"LTS",color:"#ec4899",
summary:"Modules, var keyword, a real HTTP client, and JShell for interactive exploration.",
topics:[
{icon:"📦",name:"Module System",tag:"Project Jigsaw",
ex:"As codebases hit millions of lines, the old package system wasn't enough — any code could access any other code. <strong>Modules are like access-controlled buildings</strong>. Each module declares exactly what it makes public (<code>exports</code>) and what it depends on (<code>requires</code>). Everything else is locked away. This also enables building custom, minimal JRE images — important for containerized microservices.",
pts:["module-info.java at project root declares the module","exports com.myapp.api: lets others use this package","requires java.sql: declares a dependency on another module","Enables smaller, leaner JVM distributions for containers"],
code:`<span class="cmt">// module-info.java</span>
<span class="kw">module</span> com.myapp {
  <span class="kw">requires</span> java.sql;
  <span class="kw">requires</span> java.logging;

  <span class="kw">exports</span> com.myapp.api;
  <span class="cmt">// com.myapp.internal → hidden</span>
}`},
{icon:"🔮",name:"var Keyword",tag:"Local type inference",
ex:"<code>var</code> lets the compiler infer the type of a local variable from context. When you write <code>var list = new ArrayList&lt;String&gt;()</code>, the compiler can clearly see it's an <code>ArrayList&lt;String&gt;</code>. <strong>You still have full type safety</strong> — it's not like JavaScript's dynamic typing. It's purely syntactic sugar that removes redundant type declarations on the left side.",
pts:["Only for local variables — not fields, parameters, or return types","Fully type-checked at compile time — no runtime surprise","Especially helpful with long generic types (Map<String, List<Int>>)","Cannot be used with null — compiler can't infer a type from null"],
code:`<span class="cmt">// Verbose, type declared twice</span>
HashMap&lt;String, List&lt;Integer&gt;&gt; m =
  <span class="kw">new</span> HashMap&lt;String, List&lt;Integer&gt;&gt;();

<span class="cmt">// var — type inferred once</span>
<span class="kw">var</span> m    = <span class="kw">new</span> HashMap&lt;String, List&lt;Integer&gt;&gt;();
<span class="kw">var</span> name = <span class="str">"Alice"</span>;  <span class="cmt">// String</span>
<span class="kw">var</span> n    = <span class="num">42</span>;       <span class="cmt">// int</span>`},
{icon:"🌐",name:"HTTP Client",tag:"Built-in modern HTTP",
ex:"<code>HttpURLConnection</code>, Java's original HTTP client, was so painful to use that virtually every project added OkHttp or Apache HttpClient instead. Java 11 shipped a <strong>modern, fluent HTTP client</strong> as a standard library — supports HTTP/1.1, HTTP/2, WebSocket, sync and async modes. Now you can make HTTP calls without adding any third-party dependency.",
pts:["HttpClient.newHttpClient() creates a reusable client","HttpRequest.newBuilder() builds the request fluently","BodyHandlers.ofString() converts the response body to String","sendAsync() returns CompletableFuture for non-blocking calls"],
code:`HttpClient client = HttpClient.newHttpClient();

HttpRequest req = HttpRequest.newBuilder()
  .uri(URI.create(<span class="str">"https://api.example.com/data"</span>))
  .header(<span class="str">"Accept"</span>, <span class="str">"application/json"</span>)
  .GET()
  .build();

HttpResponse&lt;String&gt; res =
  client.send(req, BodyHandlers.ofString());
System.out.println(res.body());`},
{icon:"💻",name:"JShell",tag:"Interactive Java REPL",
ex:"Every other major language had an interactive prompt for years — Python, Ruby, Node.js. Java finally got one. <strong>JShell is a Read-Eval-Print Loop</strong> — type a Java expression, press Enter, see the result instantly. No class, no main method, no compile step. Perfect for <strong>learning Java, testing ideas quickly, or verifying API behavior</strong> without creating a full project.",
pts:["Type any Java expression and see the result immediately","No class or main() required — just code directly","/list shows all entered snippets, /vars shows variables","Tab completion helps explore APIs you don't know yet"],
code:`$ jshell
|  Welcome to JShell -- Version 11

jshell&gt; <span class="num">2</span> * <span class="num">21</span>
$<span class="num">1</span> ==&gt; <span class="num">42</span>

jshell&gt; <span class="str">"hello"</span>.toUpperCase()
$<span class="num">2</span> ==&gt; <span class="str">"HELLO"</span>

jshell&gt; var list = List.of(<span class="num">1</span>, <span class="num">2</span>, <span class="num">3</span>)`},
{icon:"🚿",name:"Stream Enhancements",tag:"takeWhile, dropWhile, ofNullable",
ex:"Java 9 added useful new methods to Streams. <strong>takeWhile</strong> is like reading a sorted list and stopping the moment an item doesn't qualify — \"take while the number is less than 10, stop at the first one that isn't\". <strong>dropWhile</strong> is the mirror: skip while the condition holds, then take everything after. <code>ofNullable</code> safely wraps a value that might be null.",
pts:["takeWhile(pred): keep elements until the first one fails — then stop","dropWhile(pred): skip elements until one fails — then take the rest","Stream.ofNullable(x): empty stream if null, one-element stream otherwise","iterate(seed, pred, step): create a bounded generated stream"],
code:`<span class="cmt">// takeWhile: stops at first failure</span>
Stream.of(<span class="num">1</span>,<span class="num">2</span>,<span class="num">3</span>,<span class="num">9</span>,<span class="num">4</span>)
  .takeWhile(n -> n &lt; <span class="num">5</span>)
  .forEach(System.out::print); <span class="cmt">// 1 2 3</span>

<span class="cmt">// dropWhile: skips until first failure</span>
Stream.of(<span class="num">1</span>,<span class="num">2</span>,<span class="num">3</span>,<span class="num">9</span>,<span class="num">4</span>)
  .dropWhile(n -> n &lt; <span class="num">5</span>)
  .forEach(System.out::print); <span class="cmt">// 9 4</span>`}
]},
{label:"Java 14 – 17",year:"2020–21",badge:"Modern",color:"#4ade80",
summary:"Records, sealed classes, pattern matching, text blocks — Java got concise and expressive.",
topics:[
{icon:"🗂️",name:"Records",tag:"Immutable data classes in one line",
ex:"Defining a simple data holder in Java used to require 40–60 lines: fields, constructor, getters, <code>equals()</code>, <code>hashCode()</code>, <code>toString()</code>. Records replace all that with <strong>one line</strong>. The compiler auto-generates everything. Records are <strong>immutable by design</strong> — perfect for data transfer objects, value types, and modeling domain data. Used everywhere with pattern matching.",
pts:["record Person(String name, int age) {} — that's the whole class","Constructor, accessors (name(), age()), equals, hashCode, toString — all generated","Immutable: fields are final, no setters generated","Can implement interfaces and add custom methods"],
code:`<span class="cmt">// Old — 50 lines of boilerplate</span>
<span class="kw">class</span> Person {
  <span class="kw">private final</span> String name;
  <span class="kw">private final int</span> age;
  <span class="cmt">// constructor, getters, equals, hashCode, toString…</span>
}

<span class="cmt">// Record — 1 line!</span>
<span class="kw">record</span> Person(String name, <span class="kw">int</span> age) {}

Person p = <span class="kw">new</span> Person(<span class="str">"Alice"</span>, <span class="num">30</span>);
p.name();       <span class="cmt">// → "Alice"</span>
p.toString();   <span class="cmt">// → Person[name=Alice, age=30]</span>`},
{icon:"🔒",name:"Sealed Classes",tag:"Controlled type hierarchies",
ex:"Normally any class can extend any other class — the hierarchy is open to the world. <strong>Sealed classes lock the permitted subclasses</strong> to an explicit list. This is powerful when modeling closed domains: a <code>Shape</code> can only be a <code>Circle</code>, <code>Rectangle</code>, or <code>Triangle</code> — no surprises. Combined with pattern matching switch, the compiler can verify you've handled every possible case.",
pts:["sealed keyword + permits lists exactly who can extend","Subclasses must be final, sealed, or non-sealed","Enables exhaustive type checks — compiler ensures you handle all cases","Models closed algebraic types like Result<T> (Success | Failure)"],
code:`<span class="kw">sealed interface</span> Shape
  <span class="kw">permits</span> Circle, Rect, Triangle {}

<span class="kw">record</span> Circle(<span class="kw">double</span> r)        <span class="kw">implements</span> Shape {}
<span class="kw">record</span> Rect(<span class="kw">double</span> w, <span class="kw">double</span> h) <span class="kw">implements</span> Shape {}
<span class="kw">record</span> Triangle(<span class="kw">double</span> b, <span class="kw">double</span> h) <span class="kw">implements</span> Shape {}

<span class="cmt">// No other Shape is possible!</span>`},
{icon:"🧩",name:"Pattern Matching",tag:"instanceof without the cast",
ex:"The old instanceof workflow had two steps: check the type, then immediately cast — a pointless repetition. <strong>Pattern matching merges both into one</strong>: check the type AND bind it to a variable simultaneously. If the check passes, the variable is in scope. This is the beginning of Java's pattern matching story, which expanded significantly in Java 21.",
pts:["if (obj instanceof String s) — checks type AND binds variable in one step","The binding variable s is in scope only within the if block","Eliminates the redundant explicit cast after instanceof","Foundation for the more powerful switch patterns in Java 21"],
code:`Object obj = <span class="str">"Hello, Java!"</span>;

<span class="cmt">// Old — redundant two-step</span>
<span class="kw">if</span> (obj <span class="kw">instanceof</span> String) {
  String s = (String) obj; <span class="cmt">// we JUST checked!</span>
  System.out.println(s.length());
}

<span class="cmt">// Pattern matching — one step</span>
<span class="kw">if</span> (obj <span class="kw">instanceof</span> String s) {
  System.out.println(s.length()); <span class="cmt">// s is ready!</span>
}`},
{icon:"📝",name:"Text Blocks",tag:"Multi-line strings that just work",
ex:"Writing a JSON string, SQL query, or HTML snippet inside Java code meant escaping every double quote and manually inserting <code>\\n</code> everywhere — ugly, error-prone, and hard to maintain. <strong>Text blocks use triple-quote delimiters</strong> and let you write the string exactly as you'd naturally format it. Indentation is trimmed intelligently — the compiler figures out the baseline.",
pts:["Start: \"\"\" on its own line after the opening quote","End: \"\"\" on its own line, indentation controls margin","No need to escape double quotes inside a text block","stripIndent() applied automatically to remove common leading spaces"],
code:`<span class="cmt">// Old — escaping nightmare</span>
String s = <span class="str">"{\"name\":\"Alice\",\"age\":30}"</span>;

<span class="cmt">// Text block — reads naturally</span>
String json = <span class="str">"""
  {
    "name": "Alice",
    "age":  30,
    "city": "Chennai"
  }
  """</span>;`},
{icon:"🔀",name:"Switch Expressions",tag:"Switch as a value, not a statement",
ex:"The classic switch statement was a <em>statement</em> — it executed code but didn't produce a value. Switch expressions upgrade it to an <em>expression</em> that <strong>evaluates to a value you can assign</strong>. The arrow (<code>-></code>) syntax eliminates fall-through bugs and removes the need for <code>break</code>. The compiler also verifies that all cases are covered.",
pts:["-> arrow cases: no fall-through, expression on the right is the result","yield keyword: used inside block cases to return a value","Exhaustiveness: compiler enforces all cases are handled","Switch expressions work for assignment, return, and method arguments"],
code:`<span class="kw">int</span> day = <span class="num">5</span>;

String name = <span class="kw">switch</span> (day) {
  <span class="kw">case</span> <span class="num">1</span> -> <span class="str">"Monday"</span>;
  <span class="kw">case</span> <span class="num">2</span> -> <span class="str">"Tuesday"</span>;
  <span class="kw">case</span> <span class="num">3</span> -> <span class="str">"Wednesday"</span>;
  <span class="kw">case</span> <span class="num">4</span> -> <span class="str">"Thursday"</span>;
  <span class="kw">case</span> <span class="num">5</span> -> <span class="str">"Friday 🎉"</span>;
  <span class="kw">default</span> -> <span class="str">"Weekend"</span>;
};`}
]},
{label:"Java 18 – 21",year:"2022–23",badge:"Future",color:"#38bdf8",
summary:"Virtual threads change everything for servers. Pattern switch and record patterns mature the type system.",
topics:[
{icon:"🧵",name:"Virtual Threads",tag:"Project Loom",
ex:"Traditional Java threads are <strong>OS threads</strong> — creating 10,000 of them would exhaust memory. This forced server developers into callback hell or reactive frameworks (hard to write, hard to debug). <strong>Virtual threads are JVM-managed, ultra-cheap threads</strong>. You can create a million of them. Each one costs a few hundred bytes. Blocking on I/O suspends the virtual thread without blocking the OS thread beneath — perfect for high-throughput servers.",
pts:["Thread.ofVirtual().start(task) creates a virtual thread","Millions of concurrent virtual threads on a normal JVM heap","Uses the same Thread API — no code changes in your logic","Blocking calls (JDBC, HTTP) automatically park the virtual thread"],
code:`<span class="cmt">// Old — limited thread pool</span>
<span class="kw">var</span> pool = Executors.newFixedThreadPool(<span class="num">200</span>);

<span class="cmt">// Virtual — scales to millions!</span>
<span class="kw">var</span> exec =
  Executors.newVirtualThreadPerTaskExecutor();

<span class="cmt">// Or directly</span>
Thread.ofVirtual().start(() -> {
  System.out.println(<span class="str">"I'm virtual! 🚀"</span>);
});`},
{icon:"🔍",name:"Pattern Switch",tag:"Type dispatch in switch",
ex:"Pattern matching arrived in switch in Java 21 — now you can <strong>switch on the type of an object</strong>, binding the value as you go. When combined with sealed classes, the compiler performs <strong>exhaustiveness checking</strong>: it knows every possible subtype of a sealed interface, so it can warn you if you forgot to handle one. This replaces long if-else instanceof chains with readable, safe code.",
pts:["case Circle c -> ... checks type and binds to c in one step","when guard: case Circle c when c.r() > 10 adds extra conditions","Compiler enforces exhaustiveness for sealed hierarchies","null case: case null -> ... handles null explicitly"],
code:`<span class="kw">double</span> area = <span class="kw">switch</span> (shape) {
  <span class="kw">case</span> Circle c ->
    Math.PI * c.r() * c.r();
  <span class="kw">case</span> Rect r ->
    r.w() * r.h();
  <span class="kw">case</span> Triangle t ->
    <span class="num">0.5</span> * t.b() * t.h();
  <span class="cmt">// compiler verifies all cases covered!</span>
};`},
{icon:"📋",name:"Sequenced Collections",tag:"Unified first/last access",
ex:"Java collections are inconsistent about accessing first and last elements: <code>List</code> uses <code>get(0)</code> and <code>get(list.size()-1)</code>, <code>Deque</code> uses <code>peekFirst()</code>, <code>SortedSet</code> uses <code>first()</code>. Java 21 added <strong>SequencedCollection</strong> — a common interface with <code>getFirst()</code>, <code>getLast()</code>, and <code>reversed()</code> that all ordered collections implement.",
pts:["getFirst() and getLast(): consistent across List, Deque, SortedSet","addFirst() and addLast(): add to either end uniformly","reversed(): returns a reversed view of the collection without copying","removeFirst() / removeLast(): remove from either end"],
code:`List&lt;String&gt; list = <span class="kw">new</span> ArrayList&lt;&gt;(
  List.of(<span class="str">"Java"</span>, <span class="str">"is"</span>, <span class="str">"cool"</span>));

list.getFirst(); <span class="cmt">// → "Java"</span>
list.getLast();  <span class="cmt">// → "cool"</span>

<span class="cmt">// Reversed view — no copy made!</span>
list.reversed().forEach(System.out::println);
<span class="cmt">// cool → is → Java</span>`},
{icon:"🏗️",name:"Record Patterns",tag:"Destructure in patterns",
ex:"Record patterns extend pattern matching to <strong>destructure a record's fields directly inside the pattern</strong>. Instead of matching the type and then calling each accessor, you can extract all the fields in one go. This is like JavaScript destructuring but with Java's full compile-time type safety. Nesting works too — <code>case Box(Point(int x, int y))</code> drills into nested records.",
pts:["case Point(int x, int y) extracts both fields at once","Nested: case Box(Point(int x, int y)) for deep decomposition","Works in instanceof and switch patterns","Compiler verifies the pattern structure matches the record definition"],
code:`<span class="kw">record</span> Point(<span class="kw">int</span> x, <span class="kw">int</span> y) {}

Object obj = <span class="kw">new</span> Point(<span class="num">3</span>, <span class="num">4</span>);

<span class="kw">if</span> (obj <span class="kw">instanceof</span> Point(<span class="kw">int</span> x, <span class="kw">int</span> y)) {
  <span class="cmt">// x and y extracted directly!</span>
  double dist = Math.hypot(x, y);
  System.out.println(<span class="str">"Distance: "</span> + dist);
}`},
{icon:"✏️",name:"String Templates",tag:"Embed values in strings (Preview)",
ex:"<code>\"Hello \" + name + \", you are \" + age</code> gets ugly fast. <strong>String templates embed expressions directly inside a string literal</strong>, like template literals in JavaScript but safer — a template processor can validate or sanitize the interpolated values before producing the string. <code>STR</code> is the basic processor that just substitutes. Custom processors can produce SQL, JSON, or HTML safely.",
pts:["STR.\"Hello \\{name}!\" substitutes the variable inline","Any expression: \\{user.getName()}, \\{a + b}, \\{list.size()}","Custom processors can sanitize input to prevent injection","Preview in Java 21 — expected to finalize in a future LTS"],
code:`String name = <span class="str">"Alice"</span>;
<span class="kw">int</span> age = <span class="num">30</span>;

<span class="cmt">// Old — noisy concatenation</span>
String s = <span class="str">"Hi "</span> + name +
           <span class="str">", age: "</span> + age;

<span class="cmt">// Template — clean! (Preview)</span>
String s = STR.<span class="str">"Hi \{name}, age: \{age}"</span>;

<span class="cmt">// Expression in template</span>
String s = STR.<span class="str">"2+2=\{2+2}"</span>; <span class="cmt">// "2+2=4"</span>`}
]},
{label:"Java 22 – 24",year:"2024–25",badge:"Stepping Stones",color:"#fb923c",
summary:"Three rapid releases bridging 21 and 25 — unnamed variables, stream gatherers, foreign memory API, and more.",
topics:[
{icon:"_️",name:"Unnamed Variables ( _ )",tag:"Ignore what you don't need",
ex:"Ever written <code>catch (Exception e) { }</code> and felt annoyed that you had to name <code>e</code> just to satisfy the compiler? Or looped with <code>for (var x : list)</code> when you didn't use <code>x</code>? Java 22 finalised <strong>unnamed variables using underscore</strong>. You write <code>_</code> instead of a name to say <em>\"I don't care about this value\"</em> — cleaner, and the compiler won't warn you about unused variables.",
pts:["_ marks a variable you intentionally ignore","Works in catch blocks, for-each loops, lambda params, patterns","Multiple _ in the same scope is allowed (unlike named variables)","Makes intent explicit: readers know the value is purposely unused"],
code:`<span class="cmt">// catch block — don't care about exception details</span>
<span class="kw">try</span> {
  riskyOperation();
} <span class="kw">catch</span> (IOException _) {
  System.out.println(<span class="str">"Failed, retrying..."</span>);
}

<span class="cmt">// for-each — only care about index, not element</span>
<span class="kw">int</span> count = <span class="num">0</span>;
<span class="kw">for</span> (<span class="kw">var</span> _ : list) count++;

<span class="cmt">// lambda — only use second param</span>
map.forEach((_, value) -> process(value));`},
{icon:"🌊",name:"Stream Gatherers",tag:"Custom intermediate stream ops",
ex:"Java 8 gave us <code>filter()</code>, <code>map()</code>, <code>sorted()</code> — but what if you need something those don't cover? <strong>Stream Gatherers (Java 24 final)</strong> let you write your own intermediate operations. Think of it as the ability to add a custom station to the factory assembly line. You define exactly how elements flow through: one-to-one, one-to-many, stateful, or stateless. Opens up a whole class of transformations that were previously awkward.",
pts:["Gatherer<T,A,R> has initializer, integrator, combiner, finisher","Stream.gather(myGatherer) plugs it into any stream pipeline","Built-in gatherers: windowFixed(), windowSliding(), scan(), fold()","Enables stateful intermediate ops like running totals or batching"],
code:`<span class="cmt">// Sliding window of size 3</span>
List.of(<span class="num">1</span>,<span class="num">2</span>,<span class="num">3</span>,<span class="num">4</span>,<span class="num">5</span>).stream()
  .gather(Gatherers.windowSliding(<span class="num">3</span>))
  .forEach(System.out::println);
<span class="cmt">// [1,2,3]  [2,3,4]  [3,4,5]</span>

<span class="cmt">// Running total (scan)</span>
List.of(<span class="num">1</span>,<span class="num">2</span>,<span class="num">3</span>,<span class="num">4</span>).stream()
  .gather(Gatherers.scan(()->0, Integer::sum))
  .forEach(System.out::println);
<span class="cmt">// 1  3  6  10</span>`},
{icon:"🔗",name:"Foreign Function & Memory API",tag:"Call native code safely",
ex:"Before this, calling C libraries from Java required JNI — notoriously dangerous and verbose. The <strong>Foreign Function & Memory API (final in Java 22)</strong> gives you a safe, expressive way to call native functions and work with off-heap memory without JNI. It's how Java can now directly call <code>strlen</code> from libc, access GPU memory, or integrate with native libraries like OpenSSL — all without writing a line of C.",
pts:["MemorySegment represents a region of memory (heap or native)","MethodHandles.lookup() + Linker.nativeLinker() calls C functions","Arena manages lifetime of native memory — auto-closes when done","Replaces unsafe sun.misc.Unsafe and error-prone JNI"],
code:`<span class="cmt">// Call C's strlen from Java!</span>
<span class="kw">try</span> (Arena arena = Arena.ofConfined()) {
  Linker linker = Linker.nativeLinker();
  SymbolLookup stdlib = linker.defaultLookup();

  MethodHandle strlen = linker.downcallHandle(
    stdlib.find(<span class="str">"strlen"</span>).get(),
    FunctionDescriptor.of(JAVA_LONG, ADDRESS)
  );

  MemorySegment str =
    arena.allocateFrom(<span class="str">"Hello, native!"</span>);
  <span class="kw">long</span> len = (long) strlen.invoke(str);
  System.out.println(len); <span class="cmt">// 14</span>
}`},
{icon:"🏛️",name:"Class-File API",tag:"Read & write .class files officially",
ex:"Java compiles to <code>.class</code> bytecode files. For years, frameworks like Spring, Hibernate, and testing tools had to use third-party libraries (ASM, ByteBuddy) to read and modify these files at runtime. Java 24 <strong>finalized an official Class-File API</strong> — a standard way to parse, generate, and transform class files without external dependencies. This makes framework internals simpler and faster, since they no longer need to bundle ASM.",
pts:["ClassFile.of().parse(bytes) reads a .class file into a model","CodeBuilder lets you generate bytecode programmatically","Transformations: modify methods, add fields, inject instrumentation","JDK itself uses this API internally — replaces internal ASM dependency"],
code:`<span class="cmt">// Read a class file and list its methods</span>
<span class="kw">byte</span>[] bytes = Files.readAllBytes(
  Path.of(<span class="str">"MyClass.class"</span>));

ClassModel cm = ClassFile.of().parse(bytes);

cm.methods().forEach(method ->
  System.out.println(
    method.methodName() + <span class="str">" : "</span> +
    method.methodTypeSymbol()));`},
{icon:"🔒",name:"Synchronized Virtual Threads",tag:"No more thread pinning",
ex:"Virtual threads (Java 21) had one annoying limitation: if a virtual thread hit a <code>synchronized</code> block, it would <strong>pin</strong> — it couldn't yield the carrier thread while waiting. This defeated the purpose for code heavy in <code>synchronized</code>. <strong>Java 24 fixed this</strong>: virtual threads can now park and unpark inside synchronized blocks, releasing the carrier thread to do other work. Existing code gets the benefit automatically with no changes.",
pts:["Virtual threads no longer pin when blocking in synchronized blocks","Carrier thread is released, free to run other virtual threads","No code changes needed — existing synchronized code just works better","Critical for frameworks like Spring, JDBC drivers that use synchronized"],
code:`<span class="cmt">// Before Java 24 — this would PIN the carrier thread</span>
<span class="cmt">// Now it parks the virtual thread and frees the carrier</span>
<span class="kw">class</span> SafeCounter {
  <span class="kw">private int</span> count = <span class="num">0</span>;

  <span class="kw">synchronized void</span> increment() {
    count++; <span class="cmt">// virtual threads now yield here!</span>
  }

  <span class="kw">synchronized int</span> get() { <span class="kw">return</span> count; }
}

<span class="cmt">// Safe to use with millions of virtual threads</span>
<span class="kw">var</span> exec = Executors.newVirtualThreadPerTaskExecutor();`}
]},
{label:"Java 25",year:"Sept 2025",badge:"LTS ⭐",color:"#f43f5e",
summary:"The newest LTS — finalized compact source files, scoped values, flexible constructors, and primitive patterns.",
topics:[
{icon:"📄",name:"Compact Source Files",tag:"No class or main() needed",
ex:"For 30 years, every Java beginner had to write <code>public class Hello { public static void main(String[] args) { ... } }</code> just to print \"Hello World\". <strong>Java 25 finalizes Compact Source Files</strong>: you can just write the code directly — no class declaration, no <code>static</code>, no <code>String[] args</code>. Perfect for learning, scripts, and quick demos. The class is inferred from the filename. Under the hood it's still Java — just with less ceremony.",
pts:["No class declaration needed — file name becomes the class name","main() can be instance method with no parameters","No need for public static void — just void main() works","Great for beginners, scripting, and prototypes — full Java under the hood"],
code:`<span class="cmt">// HelloWorld.java — that's ALL you need in Java 25!</span>
<span class="kw">void</span> <span class="fn">main</span>() {
  System.out.println(<span class="str">"Hello, World!"</span>);
}

<span class="cmt">// No class, no public static, no String[] args</span>
<span class="cmt">// $ java HelloWorld.java  → Hello, World!</span>

<span class="cmt">// Still full Java — can import, use streams, etc.</span>
<span class="kw">import</span> java.util.List;
<span class="kw">void</span> <span class="fn">main</span>() {
  List.of(<span class="str">"Java"</span>, <span class="str">"25"</span>, <span class="str">"rocks"</span>)
    .forEach(System.out::println);
}`},
{icon:"🔭",name:"Scoped Values",tag:"Safe immutable context sharing",
ex:"<code>ThreadLocal</code> lets you attach data to a thread — but it's mutable, can leak memory, and behaves badly with virtual threads and thread pools. <strong>Scoped Values (finalized Java 25)</strong> are a better replacement: immutable context data shared between a caller and its callees, for a well-defined scope. Like passing a value through every method call without actually changing every signature. Once the scope ends, the value is gone — no leaks, no stale data.",
pts:["ScopedValue.newInstance() creates the holder","where(SCOPE, value).run(() -> ...) sets context for that block","SCOPE.get() retrieves the value from anywhere in that call tree","Immutable — cannot be changed after binding; prevents accidental mutation"],
code:`<span class="kw">class</span> RequestHandler {
  <span class="kw">static final</span> ScopedValue&lt;User&gt; CURRENT_USER =
    ScopedValue.newInstance();

  <span class="kw">void</span> handleRequest(User user, Request req) {
    <span class="cmt">// Bind user for the scope of this request</span>
    ScopedValue.where(CURRENT_USER, user)
      .run(() -> processRequest(req));
  }

  <span class="kw">void</span> processRequest(Request req) {
    <span class="cmt">// Deep inside — no need to pass user as param!</span>
    User u = CURRENT_USER.get();
    System.out.println(<span class="str">"User: "</span> + u.name());
  }
}`},
{icon:"🏗️",name:"Flexible Constructor Bodies",tag:"Code before super() — finally!",
ex:"Java had a strict rule: the very first statement in a constructor <strong>must be</strong> <code>super()</code> or <code>this()</code>. This forced awkward workarounds — static helper methods just to validate before calling super. <strong>Java 25 finalizes Flexible Constructor Bodies</strong>: you can now write validation, calculations, and field initialization <em>before</em> calling <code>super()</code>. The restriction was <em>fail fast</em> before expensive allocation — now the language supports it natively.",
pts:["Statements before super() or this() are now allowed","Cannot reference 'this' (object not yet constructed) before super()","Can initialize fields and throw exceptions before super()","Makes validation-before-construction patterns much cleaner"],
code:`<span class="kw">class</span> PositiveInt {
  <span class="kw">final int</span> value;

  PositiveInt(<span class="kw">int</span> n) {
    <span class="cmt">// Validate BEFORE super() — Java 25!</span>
    <span class="kw">if</span> (n &lt;= <span class="num">0</span>)
      <span class="kw">throw new</span> IllegalArgumentException(
        <span class="str">"Must be positive: "</span> + n);
    <span class="kw">super</span>(); <span class="cmt">// called after validation</span>
    <span class="kw">this</span>.value = n;
  }
}

<span class="cmt">// Old way required ugly static helper:</span>
<span class="cmt">// super(validate(n))  ← couldn't throw easily</span>`},
{icon:"🔢",name:"Primitive Patterns (Preview)",tag:"instanceof and switch for int, double…",
ex:"Pattern matching used to work only with <strong>reference types</strong> (objects). But Java has primitives too — <code>int</code>, <code>double</code>, <code>boolean</code>. <strong>Java 25 previews primitive type patterns</strong>: you can use <code>instanceof int i</code> to check and bind, or <code>case int i</code> in switch. This completes the uniformity of the type system — primitives are now first-class citizens in pattern matching, with safe narrowing checks built in.",
pts:["case int i -> works in switch on Object or Number","instanceof int i checks if value fits safely (no info loss)","Automatic safe narrowing: byte b only matches if value fits in byte","Unifies primitive and reference types in pattern expressions"],
code:`Object obj = <span class="num">42</span>;

<span class="cmt">// Primitive pattern in switch (Preview)</span>
String result = <span class="kw">switch</span> (obj) {
  <span class="kw">case</span> <span class="kw">Integer</span> i <span class="kw">when</span> i &lt; <span class="num">0</span>  -> <span class="str">"negative"</span>;
  <span class="kw">case</span> <span class="kw">Integer</span> i              -> <span class="str">"positive int"</span>;
  <span class="kw">case</span> <span class="kw">Long</span> l                 -> <span class="str">"long"</span>;
  <span class="kw">case</span> <span class="kw">Double</span> d               -> <span class="str">"double"</span>;
  <span class="kw">default</span>                      -> <span class="str">"other"</span>;
};

<span class="cmt">// Safe narrowing with instanceof</span>
<span class="kw">long</span> big = <span class="num">42L</span>;
<span class="kw">if</span> (big <span class="kw">instanceof</span> <span class="kw">byte</span> b) {
  System.out.println(<span class="str">"Fits in byte: "</span> + b);
}`},
{icon:"📦",name:"Module Import Declarations",tag:"Import a whole module in one line",
ex:"Normally to use Java's standard libraries, you import each package separately: <code>import java.util.*</code>, <code>import java.io.*</code>, etc. <strong>Java 25 finalizes Module Imports</strong>: <code>import module java.base</code> imports <em>every package exported by that module</em> in one line. Especially useful in compact source files, JShell, and quick prototypes where managing imports is overhead. IDEs will still manage them, but it's great for learning.",
pts:["import module java.base imports all packages java.base exports","import module java.sql adds JDBC, import module java.net.http adds HTTP","Reduces import boilerplate especially in compact source files and JShell","No runtime cost — just a compile-time shortcut for import declarations"],
code:`<span class="cmt">// Import the entire java.base module</span>
<span class="kw">import module</span> java.base;   <span class="cmt">// replaces ~20 imports</span>
<span class="kw">import module</span> java.sql;    <span class="cmt">// adds all JDBC types</span>

<span class="cmt">// Now use anything from those modules freely</span>
<span class="kw">void</span> <span class="fn">main</span>() {
  <span class="kw">var</span> list = <span class="kw">new</span> ArrayList&lt;String&gt;();
  <span class="kw">var</span> map  = <span class="kw">new</span> HashMap&lt;String, Integer&gt;();
  <span class="kw">var</span> path = Path.of(<span class="str">"data.txt"</span>);
  <span class="cmt">// All available — no individual imports needed!</span>
}`}
]}
];

export const dsaCategories = [
{label:'Linear Structures',color:'#38bdf8',badge:'Core',topics:[
{icon:'📊',name:'Arrays',sub:'Index-based sequential storage',diff:'e',color:'#38bdf8',
ex:`An <strong>array is the most fundamental data structure</strong> — contiguous memory, numbered slots. Jump to any element in O(1). Insert/delete in the middle is O(n) — everything shifts. Two core techniques: <strong>two pointers</strong> (converge from both ends, great for sorted arrays and palindromes) and <strong>sliding window</strong> (expand/shrink a window boundary to maintain a constraint). These two alone solve the majority of array problems.`,
pts:['Access O(1) — direct memory offset','Insert/delete O(n) — elements must shift','Two-pointer: converge for pairs, palindromes, sorted conditions','Sliding window: maintain window invariant, move L/R boundaries'],
code:`<span class="cmt">// Sliding window — max sum subarray of size k</span>
<span class="kw">int</span> maxSumK(<span class="kw">int</span>[] a, <span class="kw">int</span> k) {
  <span class="kw">int</span> sum=<span class="num">0</span>;
  <span class="kw">for</span>(<span class="kw">int</span> i=<span class="num">0</span>;i&lt;k;i++) sum+=a[i];
