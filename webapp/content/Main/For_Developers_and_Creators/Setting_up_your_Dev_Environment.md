---
title: Setting up your Dev Environment
---

> To get started modding or working on the source code, a crucial part is to set up a good dev environment so that you can utilize its features and tools to better assist in the code.
> 
> ***- DashieDev -***

**Difficulty:** 🦴🦴🦴🦴

##### **Required Installation:**
- [Visual Studio Code](https://code.visualstudio.com/download)
- [GitHub for Desktop](https://desktop.github.com/)
- [Java Development Kit 17](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html) (for Windows, it's recommended to install the MSI Installer).
- [Git](https://git-scm.com/downloads)

##### **Required Knowledge:**
- Basic/advanced coding knowledge.
- Familiarity with pushing/pulling commits and pull requests from a fork on GitHub.

---

## Initialization

### GitHub for Desktop

1. Download the necessary installations and proceed.
2. Log in to your GitHub account.
3. After logging in, you can start **Cloning the repository**.
4. Click on the **URL Tab** and enter: `https://github.com/DashieDev/DoggyTalentsNext`
5. Choose an **empty folder** (ensure the path has no special characters or spaces).
6. Click on **Current branch -> New branch.** Then, choose your version.
   - The name should reflect the version you're on and your task (e.g., `1.20-master$MashXP-Testing`).
   - Note: If you're using our branch to test changes, you **cannot push** directly. We recommend you **locally clone** one of our branches.
7. Open the folder in **VS Code**.

### Visual Studio Code

#### Initial Build
1. After clicking **Yes** on the **Trust the Authors** confirmation, VS Code will recommend these extensions:
   - **Extension Pack for Java** (Mandatory)
   - GitHub Pull Requests and Issues (Optional)
   - GitLens (Optional)
2. Open the Terminal (`Ctrl + \``). Type `./gradlew build` and wait for it to finish.
   ```batch
   BUILD SUCCESSFUL in...
   ```
   
*If you encounter a `JAVA_HOME` error, ensure your Java installation is correctly added to your system's PATH.*

#### Reload and Execute
1. Go to `settings.json` (`Ctrl + P` then type `settings.json`).
2. Add the line: `"java.gradle.buildServer.enabled": "off"` (ensure you add a comma to the previous line).
3. Reload your project.
4. Run: `Ctrl + Shift + P` -> `Java: Clean Java Language Server Workspace`.
5. Run: `./gradlew runClient`
   - Minecraft should boot up with Doggy Talents Next loaded.

## Extra
To run `runClient` or Build via `F5` and have logs in the Terminal:

1. Run: `./gradlew genVSCodeRuns`
2. Run: `./gradlew runClient`
   - If it fails, delete the `.gradle/caches` folder in your user profile and try again.
3. Run: `./gradlew vscodePrintRunClient`
   - This will output `vmArgs` and `args` in the terminal.
4. Copy the `vmArgs` and `args` content, then use an escape tool if needed to paste them into your `launch.json`.
5. Press `F5` to start debugging.

#### Documented Errors:
- **Module Conflict Error:** If you see `java.lang.IllegalStateException: Module named org.objectweb.asm.tree.analysis was already on the JVMs module path...`, delete the conflicting older version folders in your `.gradle/caches` directory.

---

## Acknowledgment

### VS Code
- **Multi-Language Support:** Hundreds of languages supported.
- **Cross-Platform:** Available on macOS, Linux, and Windows.
- **IntelliSense:** Smart code completion and suggestions.
- **Interactive Debugging:** Step through code and inspect variables.
- **Git Integration:** Built-in source control.

### GitHub
- **Version Control:** Track and manage changes efficiently.
- **Collaboration:** Multiple developers can work simultaneously.
- **Open Source:** Hub for global community contribution.
- **Recovery:** Easily revert to previous versions.

---

I hope you find this guide helpful! Feel free to ask any questions.

**Good luck!!! がんばってね〜！(⁠｡⁠•̀⁠ᴗ⁠-⁠)⁠✧**

<img src="/images/code_dogs.png" width="100%" />
