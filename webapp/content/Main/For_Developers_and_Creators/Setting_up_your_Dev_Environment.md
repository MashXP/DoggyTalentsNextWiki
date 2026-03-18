---
title: Setting up your Dev Environment
---



> *To get started modding or working on the source code, a crucial part is to set up a good dev environment so that you can utilize its features and tools to better assist in the code.*
> 
> ***- DashieDev -***

----**Difficulty:** 🦴🦴🦴🦴

##### **Required Installation:**
- [Visual Studio Code](https://code.visualstudio.com/download)
- [Github for Desktop](https://desktop.github.com/)
- [Java Development Kit](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html)  (for Windows, it's recommended to install the MSI Installer).
- [Git](https://git-scm.com/downloads)

##### **Required Knowledge:**
- Need to have basic/advanced coding knowledge.
- Need to know how to push/pull commits, and pull requests from your fork on GitHub.
----

## Initialization

### GitHub for Desktop

#### Initialization
1. Download the necessary installations and proceed.
1. Log in to your GitHub account (create one if you don't have one).

#### Cloning Repository
1. After you log in to Github for Desktop, you can start **Cloning repository**.
1. Click on **URL Tab:**
1. *First box: <code><nowiki>https://github.com/DashieDev/DoggyTalentsNext</nowiki></code>
1. *Second box: Make an **empty folder** (make sure the folder is named properly in English). That'll be the location for the project.
1. Click on **Current branch -> New branch.** Then, choose your version. 
1. *The name should reflect which version you're on (optionally your name) and what you're trying to do. (eg. 1.20-master$MashXP-Testing)
1. *Note that if you're using **our branch** to test your changes, you **cannot push your changes** there since you don't have write access. And for that reason, we recommend you to **locally clone** one of our branches as stated above.
1. Open in **VSC**.

### Visual Studio Code

#### Initial Build
1. After you click **Yes** on the **Trust the Authors confirmation**. VSC will recommend you install these extensions:
1. ***Extension Pack for Java. (mandatory)**
1. *GitHub Pull Requests and Issues (Optional)
1. *Gitlens (Optional).
1. Open Terminal (Ctrl + `). Type <code>./gradlew build</code>, enter, and let it finish.
```batch

Deprecated Gradle features were used in this build, making it incompatible with...
...
BUILD SUCCESSFUL in...

```*If you encounter this error: Follow [this instruction](https://stackoverflow.com/questions/64359564/error-java-home-is-not-set-and-no-java-command-could-be-found-in-your-flutter)*```bat

ERROR: JAVA_HOME is not set and no 'java' command could be found in your PATH.

```*If you did it correctly, there should be a <code>.vscode</code> folder in your project.*

#### Reload and Execute
1. Go to **settings.json** (shortcut <code>Ctrl+P</code>)
1. Add the line <code>"java.gradle.buildServer.enabled": "off"</code>. *Remember to add a comma at the end of the line above*
1. Reload your project. *(a notification board should pop up at the bottom right corner.)*
1. <code>Ctrl+P</code> + <code>> Java: Clean Java Language Server Workspace</code>.
1. Run *<code>./gradlew runClient</code>*
1. After this you should see Minecraft along with DTN boot up.
From here on you can experiment with DTN.

## Extra
If you want to runClient or Build via the f5 button and have the log outputted in the Terminal follow these steps:

(For later versions, Switch back to *<code>1.20-master</code>* branch, to temporarily generate the launch.json):

1. Run this command in the Terminal: *<code>./gradlew genVSCodeRuns</code>* . (Then, return to your desired branch)
1. Run or *<code>./gradlew runClient</code>*  *(Builds, depending on the task)*
  1. If it fails, press *<code>Windows+R</code>* , paste *<code>%USERPROFILE%\.gradle\</code>* and delete the *<code>caches</code>*  folder.
  1. Run *<code>./gradlew build</code>*
  1. Then again *<code>./gradlew runClient</code>*
  1. After this you should see Minecraft Boot up. If not contact us and we'll provide assistance.

#### Documented Errors:

1. *Exception in thread "main" java.lang.IllegalStateException:* *Module named org.objectweb.asm.tree.analysis was already on the JVMs module path loaded from C:\Users\reals\.gradle\caches\modules-2\files-2.1\org.ow2.asm\asm-analysis\9.7\e4a258b7eb96107106c0599f0061cfc1832fe07a\asm-analysis-9.7.jar but class-path contains it at location **C:\Users\reals\.gradle\caches\modules-2\files-2.1\org.ow2.asm\asm-analysis**\9.5\490bacc77de7cbc0be1a30bb3471072d705be4a4\asm-analysis-9.5.jar* : Solution - Delete the consequent 9.5 folders located in the **bold-text** directory until it works.

*Continue...*

1. Then run: *<code>./gradlew vscodePrintRunClient</code>* . or *(Builds, depending on the task)*
1. In the Terminal there will be an output that looks similar to this:```bat

> Task :vscodePrintRunClient
vmArgs:
-p C:\Users\reals\.gradle\caches\modules-2\files-2.1\cpw.mods\bootstraplauncher\2.0.2\1a2d076cbc33b0520cbacd591224427b2a20047d\bootstraplauncher-2.0.2.jar;C:\Users\reals\.gradle\caches\modules-2\files-2.1\cpw.mods\securejarhandler\3.0.8\c0ef95cecd8699a0449053ac7d9c160748d902cd\securejarhandler-3.0.8.jar;C:\Users\reals\.gradle\caches\modules-2\files-2.1\org.ow2.asm\asm-commons\9.7\e86dda4696d3c185fcc95d8d311904e7ce38a53f\asm-commons-9.7.jar;C:\Users\reals\.gradle\caches\modules-2\files-2.1\org.ow2.asm\asm-util\9.7\c0655519f24d92af2202cb681cd7c1569df6ead6\asm-util-9.7.jar;C:\Users\reals\.gradle\caches\modules-2\files-2.1\org.ow2.asm\asm-analysis\9.7\e4a258b7eb96107106c0599f0061cfc1832fe07a\asm-analysis-9.7.jar;C:\Users\reals\.gradle\caches\modules-2\files-2.1\org.ow2.asm\asm-tree\9.7\e446a17b175bfb733b87c5c2560ccb4e57d69f1a\asm-tree-9.7.jar;C:\Users\reals\.gradle\caches\modules-2\files-2.1\org.ow2.asm\asm\9.7\73d7b3086e14beb604ced229c302feff6449723\asm-9.7.jar;C:\Users\reals\.gradle\caches\modules-2\files-2.1\net.neoforged\JarJarFileSystems\0.4.1\78f59f89defcd032ed788b151ca6a0d40ace796a\JarJarFileSystems-0.4.1.jar --add-modules ALL-MODULE-PATH --add-opens java.base/java.util.jar=cpw.mods.securejarhandler --add-opens java.base/java.lang.invoke=cpw.mods.securejarhandler --add-exports java.base/sun.security.util=cpw.mods.securejarhandler --add-exports jdk.naming.dns/com.sun.jndi.dns=java.naming -XX:HeapDumpPath=MojangTricksIntelDriversForPerformance_javaw.exe_minecraft.exe.heapdump -Dforge.logging.console.level=debug -Dneoforge.enableGameTest=true -DlegacyClassPath.file=D:\DoggyTalentsNext\Repositories\DTN\DoggyTalentsNext\.gradle\configuration\neoForm\neoFormJoined1.21.1-20240808.144430\steps\writeMinecraftClasspathClient\classpath.txt -DignoreList=securejarhandler-3.0.8.jar,asm-9.7.jar,asm-commons-9.7.jar,asm-tree-9.7.jar,asm-util-9.7.jar,asm-analysis-9.7.jar,bootstraplauncher-2.0.2.jar,JarJarFileSystems-0.4.1.jar,mixinextras-neoforge-0.4.1.jar,client-extra,neoforge- -Dfml.gameLayerLibraries -DmergeModules=jna-5.10.0.jar,jna-platform-5.10.0.jar -Djava.net.preferIPv6Addresses=system -Dfml.pluginLayerLibraries
##### ========================
args:
--launchTarget forgeclientuserdev --version 21.1.62 --assetIndex asset-index --assetsDir C:\Users\reals\.gradle\caches\minecraft\assets\1.21.1 --gameDir . --fml.neoForgeVersion 21.1.62 --fml.fmlVersion 4.0.24 --fml.mcVersion 1.21.1 --fml.neoFormVersion 20240808.144430
##### ========================

.........

```
1. Now copy the contents of vmArgs and args, then escape it with this [website](https://dolitools.com/text-tools/escape-unescape-string/). 
1. Copy the escaped string, and paste it into the respective content of the launch.json.
1. Press <code>f5</code>.
1. After this step, you should see Minecraft boots up along with DTN.

## Acknowledgment

### VSC
Coding with Visual Studio Code (VSCode) offers several benefits that make it a popular choice among developers:

- **Multi-Language Support**: VSCode provides support for hundreds of programming languages, making it versatile for different types of projects.
- **Cross-Platform**: It is available on macOS, Linux, and Windows, so you can work on your projects regardless of the operating system.
- **IntelliSense**: This feature offers intelligent code completion, suggestions, and rich semantic code understanding, which can significantly speed up coding and reduce errors.
- **Interactive Debugging**: VSCode includes an interactive debugger that allows you to step through code, inspect variables, view call stacks, and execute commands in the console.
- **Customization**: You can customize every feature to your liking and install third-party extensions to enhance functionality. (Use dark theme if you're a true coder >:3)
- **Git Integration**: It has built-in support for Git, allowing you to work with source control without leaving the editor.
- **Extension Marketplace**: A vast ecosystem of extensions is available to add functionalities for different tools, programming languages, and services.

These features contribute to a productive coding environment, whether you’re working on web development, data science, or other software projects.

*Disclaimer: You can also use other source-code editors like IntelliJ IDEA to work with DTN but we won't be able to aid you with IDE-related issues.* 

### GitHub
Coding with GitHub offers several advantages: 

- **Version Control**: GitHub uses Git, a distributed version control system, allowing developers to **track and manage changes** to their codebase efficiently.
- **Collaboration**: It facilitates collaboration among team members, enabling multiple developers to work on the same project simultaneously with minimal conflicts.
- **Open Source Contribution**: GitHub is a hub for open-source projects, providing a platform for developers to contribute to public repositories and collaborate with the global developer community.
- **Recovery Options**: With GitHub, you can revert to previous versions of your code if something goes wrong, ensuring that mistakes can be corrected easily.

These features make GitHub a powerful tool for both individual developers and teams working on complex projects. Remember, it’s important to have basic to advanced coding knowledge and understand how to use Git for commits and pull requests.
----I hope you find this guide helpful, feel free to ask any questions during the process (or maybe later on, i don't mind xD).

**Good luck!!! がんばってね〜！(⁠｡⁠•̀⁠ᴗ⁠-⁠)⁠✧**![](/images/code_dogs.png)